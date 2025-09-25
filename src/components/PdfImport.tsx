import React, { useState } from 'react';
import { ResumeData } from '../types/resume';

interface Props {
  open: boolean;
  onClose: () => void;
  onImport: (data: Partial<ResumeData>) => void;
}

type ExperienceItem = { id: string; company: string; position: string; startDate: string; endDate: string; current: boolean; description: string };
type EducationItem = { id: string; institution: string; degree: string; field: string; startDate: string; endDate: string; current: boolean; description: string };
type ProjectItem = { id: string; name: string; description: string; technologies: string; link?: string; startDate: string; endDate: string; current: boolean };
type Preview = {
  personal: { name: string; email: string; phone: string };
  summary: string;
  skills: Array<{ id: string; name: string; level: string }>;
  experience: Array<ExperienceItem>;
  education: Array<EducationItem>;
  projects: Array<ProjectItem>;
};

// Minimal PDF import component using injected pdf.js (UMD) and main-thread parsing.
const PdfImport: React.FC<Props> = ({ open, onClose, onImport }) => {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<Preview | null>(null);

  const ensurePdfJs = async (): Promise<{
    GlobalWorkerOptions?: { workerSrc?: string };
    getDocument: (opts: { data: ArrayBuffer; disableWorker?: boolean }) => {
      promise: Promise<{
        numPages: number;
        getPage: (n: number) => Promise<{ getTextContent: () => Promise<{ items: Array<{ str?: string }> }> }>;
      }>;
    };
  }> => {
    const g = globalThis as unknown as { pdfjsLib?: unknown };
    if (g.pdfjsLib) return g.pdfjsLib as ReturnType<typeof ensurePdfJs>;
    const cdnUrl = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js';
    await new Promise<void>((resolve, reject) => {
      const s = document.createElement('script');
      s.src = cdnUrl;
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('Failed to load pdf.js from CDN'));
      document.head.appendChild(s);
    });
    const g2 = globalThis as unknown as { pdfjsLib?: unknown };
    if (g2.pdfjsLib) return g2.pdfjsLib as ReturnType<typeof ensurePdfJs>;
    throw new Error('pdf.js did not initialize');
  };

  const handleFile = async (file: File | null) => {
    if (!file) return;
    setProcessing(true);
    setError(null);
    setPreview(null);
    try {
      const pdfjsLib = await ensurePdfJs();
      try {
        pdfjsLib.GlobalWorkerOptions = pdfjsLib.GlobalWorkerOptions || {};
        pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsLib.GlobalWorkerOptions.workerSrc || '/pdf.worker.mjs';
      } catch (e) {
        // ignore
      }

      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer, disableWorker: true });
      const pdf = await loadingTask.promise;

      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const strings = (content.items || []).map((it: { str?: string }) => it.str || '');
        fullText += strings.join(' ') + '\n\n';
      }

      const lines = fullText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

      // Extract email
      const emailRegex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
      const emailMatch = fullText.match(emailRegex);

      // Extract phone
      const phoneRegex = /(?:\+?\d{1,3}[\s-]?)?(?:\(?\d{2,3}\)?[\s-]?)?\d{4,5}[\s-]?\d{4}/g;
      const phoneMatch = fullText.match(phoneRegex);

      // Detect name
      let detectedName = '';
      for (const ln of lines.slice(0, 6)) {
        if (ln.includes('@')) continue;
        if (/\d/.test(ln)) continue;
        const words = ln.split(/\s+/).filter(Boolean);
        if (words.length >= 2 && words.length <= 4 && words.every(w => /^[A-Za-zÀ-ÖØ-öø-ÿ''-]+$/.test(w))) {
          detectedName = ln;
          break;
        }
      }

      // Extract skills
      const skills: string[] = [];
      const skillsHeadingIdx = lines.findIndex(l => /^(skills|habilidades|competences|competências|skills:)/i.test(l));
      if (skillsHeadingIdx >= 0) {
        const heading = lines[skillsHeadingIdx];
        const after = heading.split(/[:–-]/).slice(1).join(':').trim();
        if (after) {
          const normalized = after.replace(/[\u002F\u005C\u007C\u002C\u003B\u2022\u00B7\u002D\u2013]/g, ',');
          skills.push(...normalized.split(',').map(s => s.trim()).filter(Boolean));
        } else {
          for (let j = skillsHeadingIdx + 1; j < Math.min(lines.length, skillsHeadingIdx + 8); j++) {
            const ln = lines[j];
            if (/^[A-Z-]{2,}$/.test(ln)) break;
            if (ln.length < 200) {
              const normalized = ln.replace(/[\u005C\u007C\u002C\u003B\u2022\u00B7\u002D\u2013\u002F]/g, ',');
              skills.push(...normalized.split(',').map(s => s.trim()).filter(Boolean));
            }
          }
        }
      } else {
        for (const ln of lines.slice(0, 12)) {
          if (/\b(JS|JavaScript|TypeScript|React|Node|Python|AWS|Docker|Kubernetes|SQL|HTML|CSS)\b/i.test(ln)) {
            const normalized = ln.replace(/[\u005C\u007C\u002C\u003B\u2022\u00B7\u002D\u2013\u002F]/g, ',');
            skills.push(...normalized.split(',').map(s => s.trim()).filter(Boolean));
            break;
          }
        }
      }

      // Extract experience, education and projects
      const experience: Array<ExperienceItem> = [];
      const education: Array<EducationItem> = [];
      const projects: Array<ProjectItem> = [];

      const expHeading = /^(?:experience|work experience|professional experience|experiencia|experiências)/i;
      const eduHeading = /^(?:education|academic|formação|educación|formacion)/i;
      const projHeading = /^(?:projects|projetos|proyectos|project)/i;

      for (let i = 0; i < lines.length; i++) {
        if (expHeading.test(lines[i])) {
          let j = i + 1;
          while (j < lines.length && j < i + 20) {
            const ln = lines[j];
            if (/\b(?:\d{4}|jan|feb|mar|abr|mai|jun|jul|ago|set|oct|nov|dez)\b/i.test(ln)) { j++; continue; }
            const parts = ln.split(/\s[-–—@]\s| - | – | — /);
            if (parts.length >= 2) {
              experience.push({ 
                id: Date.now().toString() + Math.random().toString(36).slice(2,8), 
                company: parts[0].slice(0,120), 
                position: parts[1].slice(0,120), 
                startDate: '', 
                endDate: '', 
                current: false, 
                description: '' 
              });
            }
            j++;
            if (experience.length >= 5) break;
          }
        }
        if (eduHeading.test(lines[i])) {
          let j = i + 1;
          while (j < lines.length && j < i + 20) {
            const ln = lines[j];
            if (/\b(?:\d{4})\b/.test(ln)) { j++; continue; }
            const parts = ln.split(/,| - | – | — /);
            if (parts.length >= 2) {
              education.push({ 
                id: Date.now().toString() + Math.random().toString(36).slice(2,8), 
                institution: parts[0].slice(0,120), 
                degree: parts[1].slice(0,120), 
                field: '', 
                startDate: '', 
                endDate: '', 
                current: false, 
                description: '' 
              });
            }
            j++;
            if (education.length >= 5) break;
          }
        }
        if (projHeading.test(lines[i])) {
          let j = i + 1;
          while (j < lines.length && j < i + 20) {
            const ln = lines[j];
            if (/\b(?:\d{4}|jan|feb|mar|abr|mai|jun|jul|ago|set|oct|nov|dez)\b/i.test(ln)) { j++; continue; }
            if (ln.length > 5 && ln.length < 100) {
              projects.push({ 
                id: Date.now().toString() + Math.random().toString(36).slice(2,8), 
                name: ln.slice(0,80), 
                description: '', 
                technologies: '',
                link: '',
                startDate: '', 
                endDate: '', 
                current: false
              });
            }
            j++;
            if (projects.length >= 5) break;
          }
        }
      }

      const summary = lines.slice(0, 3).join(' ').slice(0, 800);

      const importedPreview: Preview = {
        personal: {
          name: detectedName || '',
          email: emailMatch ? emailMatch[0] : '',
          phone: phoneMatch ? phoneMatch[0] : ''
        },
        summary,
        skills: Array.from(new Set(skills)).slice(0, 60).map(s => ({ id: Date.now().toString() + Math.random().toString(36).slice(2,8), name: s, level: '' })),
        experience,
        education,
        projects
      };

      setPreview(importedPreview);
    } catch (err: unknown) {
      console.error('PdfImport error:', err);
      const extractMessage = (e: unknown) => {
        if (!e) return String(e);
        if (typeof e === 'string') return e;
        if (typeof e === 'object' && e !== null && 'message' in e) {
          return (e as { message?: string }).message || String(e);
        }
        return String(e);
      };
      setError('Falha ao analisar o PDF. Certifique-se de que o arquivo possui texto selecionável (não uma imagem escaneada). Erro: ' + extractMessage(err));
    } finally {
      setProcessing(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-30" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-4">
        <h3 className="text-lg font-medium mb-2">Importar PDF</h3>
        <p className="text-sm text-gray-600 mb-4">Selecione um arquivo PDF com texto selecionável. Irei tentar extrair email, telefone, sumário, habilidades e projetos automaticamente.</p>
        <label className="block text-sm font-medium text-gray-700 mb-1">Arquivo PDF</label>
        <input aria-label="Arquivo PDF" type="file" accept="application/pdf" onChange={e => handleFile(e.target.files ? e.target.files[0] : null)} />
        {processing && <div className="mt-3 text-sm text-gray-600">Processando...</div>}
        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
        {preview && (
          <div className="mt-3 border rounded p-3 bg-gray-50">
            <h4 className="font-medium mb-2">Pré-visualização</h4>
            <label className="block text-sm">Email</label>
            <input aria-label="Email detectado" placeholder="email" className="w-full border p-1 mb-2" value={preview.personal.email} onChange={e => setPreview(p => p ? { ...p, personal: { ...p.personal, email: e.target.value } } : p)} />
            <label className="block text-sm">Telefone</label>
            <input aria-label="Telefone detectado" placeholder="telefone" className="w-full border p-1 mb-2" value={preview.personal.phone} onChange={e => setPreview(p => p ? { ...p, personal: { ...p.personal, phone: e.target.value } } : p)} />
            <label className="block text-sm">Sumário</label>
            <textarea aria-label="Sumário detectado" placeholder="sumário" className="w-full border p-1 mb-2" rows={3} value={preview.summary} onChange={e => setPreview(p => p ? { ...p, summary: e.target.value } : p)} />
            <label className="block text-sm">Habilidades (uma por linha)</label>
            <textarea aria-label="Habilidades detectadas" placeholder="uma habilidade por linha" className="w-full border p-1 mb-2" rows={4} value={preview.skills.map(s => s.name).join('\n')} onChange={e => setPreview(p => {
              if (!p) return p;
              const lines = e.target.value.split('\n');
              const newSkills = lines.map((ln, i) => ({ id: p.skills[i]?.id ?? (Date.now().toString() + i), name: ln.trim(), level: p.skills[i]?.level ?? '' })).filter(s => s.name);
              return { ...p, skills: newSkills };
            })} />
            <label className="block text-sm">Projetos ({preview.projects.length} detectados)</label>
            <div className="text-xs text-gray-500 mb-2">{preview.projects.map(p => p.name).join(', ') || 'Nenhum projeto detectado'}</div>
            <div className="flex justify-end gap-2">
              <button className="px-3 py-2 bg-gray-200 rounded" onClick={() => { setPreview(null); setError(null); }}>Cancelar</button>
              <button className="px-3 py-2 bg-blue-600 text-white rounded" onClick={() => {
                const final = {
                  personal: { name: preview.personal.name || '', desiredPosition: '', email: preview.personal.email || '', phone: preview.personal.phone || '', address: '', portfolio: '', linkedin: '', github: '' },
                  summary: preview.summary || '',
                  skills: preview.skills.map(s => ({ ...s })),
                  experience: preview.experience || [],
                  education: preview.education || [],
                  projects: preview.projects || [],
                  languages: [], certifications: []
                } as Partial<import('../types/resume').ResumeData>;
                setPreview(null);
                onImport(final);
              }}>Importar</button>
            </div>
          </div>
        )}
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="px-3 py-2 bg-gray-200 rounded mr-2">Fechar</button>
        </div>
      </div>
    </div>
  );
};

export default PdfImport;