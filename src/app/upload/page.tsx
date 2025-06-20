"use client";

import { useState } from "react";
import { extractTextFromPDF } from "@/lib/pdfParser";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const buffer = await file.arrayBuffer();
    const resumeText = await extractTextFromPDF(buffer);

    const res = await fetch('/api/analyze', {
      method: 'POST',
      body: JSON.stringify({ resumeText }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    setFeedback(data.result);
    setLoading(false);
  };

  return (
    <main className="max-w-xl mx-auto mt-20">
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading || !file}
      >
        {loading ? 'Analyzing...' : 'Analyze Resume'}
      </button>
      {feedback && <pre className="mt-8 bg-gray-100 text-black p-4 whitespace-pre-wrap">{feedback}</pre>}
    </main>
  );
}