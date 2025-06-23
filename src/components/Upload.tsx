"use client";

import { useState, useEffect } from "react";

// Minimal type declarations for PDF.js objects
    type PDFDocumentProxy = {
        numPages: number;
        getPage: (pageNumber: number) => Promise<PDFPageProxy>;
    };

    type PDFPageProxy = {
        getTextContent: () => Promise<TextContent>;
    };

    type TextContent = {
        items: TextItem[];
    };

    type TextItem = {
        str: string;
    };


// Extend the Window interface to include pdfjsLib
declare global {
  interface Window {
    pdfjsLib?: {
      getDocument: (options: { data: ArrayBuffer }) => {
        promise: PDFDocumentProxy;
      };
      GlobalWorkerOptions: {
        workerSrc: string;
      };
    };
  }
}

// import { extractTextFromPDF } from "@/lib/pdfParser";

// Import the main PDF.js library
// import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';

// Import the PDF.js worker script (TypeScript ignore needed due to import type)
// import pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.js';
// import { TextItem } from 'pdfjs-dist/types/src/display/api';


// Configure PDF.js to use the worker for processing
// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default function Upload() {
    const [file, setFile] = useState<File | null>(null);
    const [feedback, setFeedback] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined' && !('pdfjsLib' in window)) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
        script.onload = () => {
            if (window.pdfjsLib) {
                window.pdfjsLib.GlobalWorkerOptions.workerSrc =
                  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            }
        };
        document.body.appendChild(script);
        }
    }, []);

    const extractTextFromPDF = async (file: File): Promise<string> => {
        const buffer = await file.arrayBuffer();
        if (!window.pdfjsLib) {
            throw new Error("PDF.js library is not loaded. Please try again in a moment.");
        }
        const pdf: PDFDocumentProxy = await window.pdfjsLib.getDocument({ data: buffer }).promise;
        let text = '';
        for (let i = 1; i <= pdf.numPages; i++) {
            const page: PDFPageProxy = await pdf.getPage(i);
            const content: TextContent = await page.getTextContent();
            text += content.items.map((item: TextItem) => item.str).join(' ') + '\n';
        }
        return text;
    };

    const handleUpload = async () => {
        if (!file) return;

        try {
        setLoading(true);
        setError('');
        const resumeText = await extractTextFromPDF(file);
        // const resumeText = await extractTextFromPDF(buffer);

        const res = await fetch('/api/analyze', {
            method: 'POST',
            body: JSON.stringify({ resumeText }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) throw new Error('Analysis failed');

        const data = await res.json();
        setFeedback(data.result);
        } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
        setLoading(false);
        }
    };

    return (
        <div id="resume-analyzer" className="bg-stone-900 text-gray-200 rounded-lg shadow-xl p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">
                Upload Your Resume for Instant Analysis
            </h2>

            <div className="space-y-6">
                {/* File Upload with Drag and Drop */}
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    !file ? 'border-gray-300 hover:border-blue-400' : 'border-blue-500'
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.add('border-blue-500')
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    if (!file) e.currentTarget.classList.remove('border-blue-500');
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    const droppedFile = e.dataTransfer.files[0];
                    if (droppedFile?.type === 'application/pdf') {
                        setFile(droppedFile);
                    }
                  }}
                >
                    <input
                      type="file"
                      id="resume-upload"
                      accept="application/pdf"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <label htmlFor="resume-upload" className="cursor-pointer">
                        <div className="flex flex-col items-center justify-center space-y-2">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p className="text-gray-600">
                                {file ? file.name : 'Drag & drop your resume PDF or click to browse'}
                            </p>
                            <p className="text-sm text-gray-500">Only PDF files are accepted</p>
                        </div>
                    </label>
                </div>

                {/* Analyze Button with Loading State */}
                <button
                  onClick={handleUpload}
                  disabled={loading || !file}
                  className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
                    loading || !file
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  } flex items-center justify-center cursor-pointer`}
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Analyzing...
                        </>
                    ) : (
                        'Get Your Free Resume Report'
                    )}
                </button>

                {/* Security Assurance */}
                <p className="text-center text-sm text-gray-500">
                    <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Your resume is processed securely and never stored
                </p>

                {/* Error Message */}
                {error && (
                    <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                        <p>{error}</p>
                    </div>
                )}

                {/* Feedback Section */}
                {feedback && (
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold text-gray-100 mb-4">
                            Your Personalized Resume Report
                        </h2>
                        <div className="bg-stone-900 rounded-lg p-6 border border-gray-200 whitespace-pre-wrap">
                            {feedback.replace(/\* /g, '• ')}
                        </div>
                        <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <p className="text-blue-700">
                                Based on your analysis, consider updating your resume and uploading again
                                to check your improvements!
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )

}