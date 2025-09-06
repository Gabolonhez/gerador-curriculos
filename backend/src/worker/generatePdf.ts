// Use require to avoid TS declaration errors in dev where @types/pdfkit isn't available
const PDFDocument = require('pdfkit');
import { uploadPdfBuffer } from '../firestore';

export async function generatePdfFromResume(orderId: string, resumeData: unknown): Promise<string> {
	// Simple PDF generation using pdfkit for sandbox/dev.
	return new Promise<string>((resolve, reject) => {
		try {
			const doc = new PDFDocument({ size: 'A4', margin: 40 });
			const buffers: Buffer[] = [];
			doc.on('data', (chunk: Buffer) => buffers.push(Buffer.from(chunk)));
			doc.on('end', async () => {
				const buffer = Buffer.concat(buffers);
				try {
					const storagePath = await uploadPdfBuffer(orderId, buffer);
					resolve(storagePath);
				} catch (err) {
					reject(err);
				}
			});

			// Render a very basic resume for sandbox preview
			doc.fontSize(20).text('Generated Resume', { align: 'center' });
			doc.moveDown();
			doc.fontSize(12).text('Resume data (JSON):');
			doc.moveDown();
			doc.fontSize(10).text(JSON.stringify(resumeData, null, 2));

			doc.end();
		} catch (err) {
			reject(err);
		}
	});
}
