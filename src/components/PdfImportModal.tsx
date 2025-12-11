import React, { useState, useEffect } from 'react';
import { X, Upload, AlertCircle, CheckCircle, FileText, Sparkles } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as pdfjsLib from 'pdfjs-dist';
import { ResumeData } from '../types/resume';
import Button from './ui/Button';

// Importar worker localmente usando Vite explicit URL import
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Configurar worker do PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

interface PdfImportModalProps {
    open: boolean;
    onClose: () => void;
    onImport: (data: Partial<ResumeData>) => void;
}

const PdfImportModal: React.FC<PdfImportModalProps> = ({ open, onClose, onImport }) => {
    const [file, setFile] = useState<File | null>(null);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [parsedData, setParsedData] = useState<Partial<ResumeData> | null>(null);
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;


    useEffect(() => {
        if (!open) {
            setFile(null);
            setError(null);
            setSuccess(false);
            setParsedData(null);
        }
    }, [open]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            setError(null);
        } else {
            setFile(null);
            setError('Por favor, selecione um arquivo PDF válido.');
        }
    };

    const processPdf = async () => {
        if (!file) return;

        setProcessing(true);
        setError(null);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

            let fullText = '';
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items
                    .map((item: any) => item.str)
                    .join(' ');
                fullText += pageText + '\n';
            }

            let extractedData;
            console.log('Full PDF Text Length:', fullText.length); // Debug text extraction

            if (apiKey) {
                try {
                    console.log('Attempting AI parsing...');
                    extractedData = await parseWithGemini(fullText);
                    console.log('AI Parsing Data:', extractedData); // Debug AI output
                } catch (aiError) {
                    console.warn("AI Parsing failed, falling back to heuristic", aiError);
                    extractedData = parseResumeText(fullText);
                    setError('Falha na IA. Usando método padrão. Verifique sua chave API.');
                }
            } else {
                console.log('No API Key, using heuristics...');
                extractedData = parseResumeText(fullText);
            }

            console.log('Final Extracted Data:', extractedData); // Debug final data
            setParsedData(extractedData);
            setSuccess(true);

            // Auto import after success or let user review?
            // For now, let's keep it manual confirmation via "Importar" button
        } catch (err) {
            console.error('Erro ao processar PDF:', err);
            setError('Falha ao ler o PDF. Verifique se o arquivo não está corrompido ou protegido por senha.');
        } finally {
            setProcessing(false);
        }
    };

    const parseWithGemini = async (text: string): Promise<Partial<ResumeData>> => {
        const genAI = new GoogleGenerativeAI(apiKey);
        // Switch to gemini-1.5-flash for faster and often more reliable free-tier access
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
        You are an expert Resume Parser. Your job is to extract EVERY piece of information from the resume below and structure it into a strict JSON format.
        
        CRITICAL RULES:
        1. Extract ALL available information. Do not skip details.
        2. If a field is not found, leave it as empty string "" or empty array [].
        3. For "current" roles, set "current": true and "endDate": "" or "Present".
        4. Match the specific "level" enum values for Skills and Languages exactly as requested.
        5. Return ONLY valid JSON. No markdown.

        Schema Structure:
        {
          "personal": {
            "name": "Full Name found in header",
            "email": "Email address",
            "phone": "Phone number",
            "address": "City, State, Country (if available)",
            "linkedin": "Full LinkedIn URL",
            "github": "Full GitHub URL",
            "portfolio": "Portfolio/Website URL",
            "desiredPosition": "Job Title/Role found in header or summary"
          },
          "summary": "Full professional summary (capture the entire text)",
          "experience": [
            {
              "company": "Company Name",
              "position": "Job Title",
              "startDate": "MM/YYYY or YYYY",
              "endDate": "MM/YYYY or YYYY or 'Present'",
              "current": boolean (true if currently working there),
              "description": "Full description of duties, including bullet points. Keep formatting if possible."
            }
          ],
          "education": [
            {
              "institution": "School/University Name",
              "degree": "Degree (Bachelors, Masters, etc.)",
              "field": "Field of study",
              "startDate": "YYYY",
              "endDate": "YYYY or 'Present'",
              "current": boolean,
              "description": "Any honors, GPA, or extra info"
            }
          ],
          "skills": [
            { 
              "name": "Specific Skill Name (e.g. React, Python, Project Management)", 
              "level": "One of: 'basic', 'intermediate', 'advanced', 'expert'"
            }
          ],
          "languages": [
            { 
              "name": "Language Name", 
              "level": "One of: 'basic', 'intermediate', 'advanced', 'fluent', 'native'" 
            }
          ],
           "projects": [
            {
              "name": "Project Name",
              "description": "Project Description",
              "technologies": "Comma separated list of tech used",
              "link": "Project URL",
              "startDate": "YYYY",
              "endDate": "YYYY",
              "current": boolean
            }
          ],
          "certifications": [
            {
              "name": "Certification Name",
              "issuer": "Issuing Organization",
              "date": "YYYY",
              "url": "Certificate URL",
              "description": "Extra details"
            }
          ]
        }

        RESUME TEXT TO PARSE:
        ${text}
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const textResponse = response.text();

        try {
            console.log('Gemini Raw Response:', textResponse); // Debug raw response
            const jsonString = textResponse.replace(/^```json\n|\n```$/g, '').trim();

            let data: Partial<ResumeData>;
            const firstOpen = jsonString.indexOf('{');
            const lastClose = jsonString.lastIndexOf('}');
            if (firstOpen !== -1 && lastClose !== -1) {
                data = JSON.parse(jsonString.substring(firstOpen, lastClose + 1));
            } else {
                data = JSON.parse(jsonString);
            }

            // Post-process to add IDs
            const addId = (item: any) => ({ ...item, id: crypto.randomUUID() });

            if (data.experience) data.experience = data.experience.map(addId);
            if (data.education) data.education = data.education.map(addId);
            if (data.skills) data.skills = data.skills.map(addId);
            if (data.languages) data.languages = data.languages.map(addId);
            if (data.projects) data.projects = data.projects.map(addId);
            if (data.certifications) data.certifications = data.certifications.map(addId);

            return data;
        } catch (e) {
            console.error("Failed to parse Gemini JSON", e);
            throw new Error("Failed to parse AI response");
        }
    };

    const parseResumeText = (text: string): Partial<ResumeData> => {
        const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

        const data: Partial<ResumeData> = {
            personal: {
                name: '',
                email: '',
                phone: '',
                address: '',
                linkedin: '',
                github: '',
                portfolio: ''
            },
            summary: '',
            experience: [],
            education: [],
            skills: [],
            languages: [],
            certifications: [],
            projects: []
        };

        // 1. Extração de Email
        const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/i;
        const emailMatch = text.match(emailRegex);
        if (emailMatch && data.personal) {
            data.personal.email = emailMatch[0].toLowerCase();
        }

        // 2. Extração de Telefone
        const phoneRegex = /(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))/g;
        const genericPhoneRegex = /(\+\d{1,3}[\s-]?)?\(?\d{2,3}\)?[\s-]?\d{3,5}[\s-]?\d{4}/g;

        const phoneMatch = text.match(phoneRegex) || text.match(genericPhoneRegex);
        if (phoneMatch && data.personal) {
            data.personal.phone = phoneMatch[0].trim();
        }

        // 3. Extração de Links
        const linkedinRegex = /linkedin\.com\/in\/([a-zA-Z0-9-]+)/i;
        const githubRegex = /github\.com\/([a-zA-Z0-9-]+)/i;

        const linkedinMatch = text.match(linkedinRegex);
        const githubMatch = text.match(githubRegex);

        if (data.personal) {
            if (linkedinMatch) {
                data.personal.linkedin = `linkedin.com/in/${linkedinMatch[1]}`;
            }
            if (githubMatch) {
                data.personal.github = `github.com/${githubMatch[1]}`;
            }
        }

        // 4. Extração de Nome (Heurística: Primeira linha válida que não seja email/link)
        for (const line of lines) {
            // Nome geralmente é curto (< 50 chars), não tem @, não tem números (geralmente)
            if (line.length > 3 && line.length < 50 && !line.includes('@') && !line.match(/\d/) && !line.includes('http')) {
                if (data.personal) {
                    data.personal.name = line;
                }
                break;
            }
        }

        // Helper para encontrar seções
        const findSectionStart = (keywords: string[], startIndex: number = 0): number => {
            for (let i = startIndex; i < lines.length; i++) {
                const line = lines[i].toLowerCase();
                // Verifica se a linha é curta o suficiente para ser um título e contém a keyword
                if (line.length < 40 && keywords.some(k => line.includes(k))) {
                    return i;
                }
            }
            return -1;
        };

        // 5. Tentativa de Resumo (Buscar por "Resumo", "Summary")
        const summaryIdx = findSectionStart(['resumo', 'summary', 'sobre', 'perfil']);

        if (summaryIdx !== -1) {
            let summaryText = '';
            for (let i = summaryIdx + 1; i < lines.length; i++) {
                // Stop if we hit another section
                if (findSectionStart(['experiência', 'experience', 'educação', 'education', 'skills', 'habilidades'], i) !== -1) break;
                summaryText += lines[i] + ' ';
            }
            if (data.summary !== undefined) data.summary = summaryText.trim().slice(0, 500);
        }

        // 6. Extração de Experiência (Simplificado)
        const expIdx = findSectionStart(['experiência', 'experience', 'histórico profissional']);
        if (expIdx !== -1) {
            let currentExp: any = {};
            for (let i = expIdx + 1; i < lines.length; i++) {
                if (findSectionStart(['educação', 'education', 'skills', 'habilidades', 'projetos'], i) !== -1) break;

                // Heurística básica: linhas com datas costumam iniciar uma nova entrada ou ser metadados
                // Mas aqui vamos apenas acumular texto na descrição por enquanto para não ficar vazio
                if (!currentExp.description) currentExp.description = "";
                currentExp.description += lines[i] + "\n";
            }
            // Adiciona um item genérico com o texto extraído
            if (currentExp.description) {
                data.experience?.push({
                    id: crypto.randomUUID(),
                    company: "Empresa detectada via texto",
                    position: "Cargo a definir",
                    startDate: "",
                    endDate: "",
                    current: false,
                    description: currentExp.description.slice(0, 500)
                });
            }
        }

        // 7. Extração de Educação (Simplificado)
        const eduIdx = findSectionStart(['educação', 'education', 'formação', 'acadêmico']);
        if (eduIdx !== -1) {
            let eduText = "";
            for (let i = eduIdx + 1; i < lines.length; i++) {
                if (findSectionStart(['skills', 'habilidades', 'idiomas', 'certificações'], i) !== -1) break;
                eduText += lines[i] + "\n";
            }
            if (eduText) {
                data.education?.push({
                    id: crypto.randomUUID(),
                    institution: "Instituição a definir",
                    degree: eduText.split('\n')[0] || "Grau a definir",
                    field: "",
                    startDate: "",
                    endDate: "",
                    current: false,
                    description: eduText.slice(0, 300)
                });
            }
        }

        // 8. Extração de Habilidades
        const skillsIdx = findSectionStart(['skills', 'habilidades', 'competências', 'tecnologias']);
        if (skillsIdx !== -1) {
            for (let i = skillsIdx + 1; i < lines.length; i++) {
                if (findSectionStart(['idiomas', 'languages', 'certificações'], i) !== -1) break;
                // Assume que skills podem ser separadas por vírgula ou uma por linha
                const possibleSkills = lines[i].split(/[,\u2022\-\|]/).map(s => s.trim()).filter(s => s.length > 2 && s.length < 30);
                possibleSkills.forEach(s => {
                    data.skills?.push({
                        id: crypto.randomUUID(),
                        name: s,
                        level: 'intermediate'
                    });
                });
            }
        }

        return data;
    };

    const handleConfirmImport = () => {
        if (parsedData) {
            onImport(parsedData);
            onClose();
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        Importar PDF
                    </h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    {!success ? (
                        <div className="space-y-4">
                            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer relative">
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    disabled={processing}
                                />
                                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {file ? file.name : 'Clique ou arraste um arquivo PDF aqui'}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Recomendado: PDFs exportados do LinkedIn
                                </p>
                            </div>

                            {/* Alert about AI availability */}
                            {!apiKey && (
                                <div className="text-xs text-center text-gray-500 dark:text-gray-400">
                                    Nota: Configure VITE_GEMINI_API_KEY para habilitar a análise via IA.
                                </div>
                            )}

                            {error && (
                                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
                                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                    <span>{error}</span>
                                </div>
                            )}

                            <Button
                                onClick={processPdf}
                                disabled={!file || processing}
                                className="w-full"
                            >
                                {processing ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <Sparkles className="w-4 h-4 animate-pulse" />
                                        {apiKey ? 'IA Analisando...' : 'Processando...'}
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        {apiKey ? <Sparkles className="w-4 h-4" /> : null}
                                        {apiKey ? 'Analisar com IA' : 'Analisar PDF'}
                                    </span>
                                )}
                            </Button>
                        </div>
                    ) : (
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <h4 className="text-lg font-medium text-gray-900 dark:text-white">Análise Concluída!</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                    Foram encontrados dados como email ({parsedData?.personal?.email || 'N/A'}) e contatos.
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <Button variant="secondary" onClick={() => setSuccess(false)} className="flex-1">
                                    Voltar
                                </Button>
                                <Button onClick={handleConfirmImport} className="flex-1">
                                    Importar Dados
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PdfImportModal;
