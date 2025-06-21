"use client";

import { useState } from "react";
import { extractTextFromPDF } from "@/lib/pdfParser";

export default function Upload() {
    const [file, setFile] = useState<File | null>(null);
    const [feedback, setFeedback] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleUpload = async () => {
        if (!file) return;

        try {
        setLoading(true);
        setError('');
        const buffer = await file.arrayBuffer();
        const resumeText = await extractTextFromPDF(buffer);

        const res = await fetch('/api/analyze', {
            method: 'POST',
            body: JSON.stringify({ resumeText }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) throw new Error('Analysis failed');

        const data = await res.json();
        setFeedback(data.result);
        } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknow error occurred');
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="bg-stone-900 text-gray-200 rounded-lg shadow-xl p-8 max-w-2xl mx-auto">
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

                </div>
            </div>
        </div>
    )

}