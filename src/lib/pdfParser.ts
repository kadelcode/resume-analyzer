// Import the main PDF.js library
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';

// Import the PDF.js worker script (TypeScript ignore needed due to import type)
// @ts-ignore
import pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.js';
import { TextItem } from 'pdfjs-dist/types/src/display/api';

// Configure PDF.js to use the worker for processing
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

/**
 * Extracts text content from a PDF file
 * @param buffer - ArrayBuffer containing the PDF data
 * @returns Promise that resolves to the extracted text
 */
export async function extractTextFromPDF(buffer: ArrayBuffer): Promise<string> {
    // Create a PDF document loading task
    const loadingTask = pdfjsLib.getDocument({ data: buffer });

    // Load the PDF document and wait for it to be ready
    const pdf = await loadingTask.promise;

    let fullText = '';

    // Loop through each page of the PDF
    for (let i = 1; i <= pdf.numPages; i++) {
        // Get the current page
        const page = await pdf.getPage(i);

        // Extract text content from the page
        const content = await page.getTextContent();

        // Process all text items on the page:
        // 1. Map each item to its string content (if it has a 'str' property)
        // 2. Join all strings with spaces
        // 3. Add a newline at the end of each page's content
        fullText += content.items.map((item) =>
          'str' in item ? (item as TextItem).str : ''
        ).join(' ') + '\n';
    }

    return fullText;
}