import * as pdfjsLib from 'pdfjs-dist';
// @ts-ignore
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.js';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
export async function extractTextFromPDF(buffer: ArrayBuffer): Promise<string> {
    const loadingTask = pdfjsLib.getDocument({ data: buffer });
    const pdf = await loadingTask.promise;

    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        fullText += content.items.map((item: any) =>
          'str' in item ? item.str : ''
        ).join(' ') + '\n';
    }

    return fullText;
}