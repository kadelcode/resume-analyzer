"use client";

import { useState } from "react";
import { extractTextFromPDF } from "@/lib/pdfParser";

export default function UploadPage() {
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
    <main className="min-h-screen bg-[url('/patterns/connecting-dots.svg')] bg-[length:80px_80px] bg-fixed">
      <div 
        className="backdrop-blur-xs py-12"
        style={{backdropFilter:'blur(4px)'}}
      >
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4">
            Supercharge Your <span className="text-blue-600">Job Search</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Get instant, AI-powered feedback on your resume to land your dream job faster.
          </p>
        </section>

        {/* Value Proposition Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-stone-900 p-6 rounded-lg shadow-md border border-gray-100">
            <div className="text-blue-500 mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-100 text-lg mb-2">ATS Optimization</h3>
            <p className="text-gray-500">
              See how well your resume performs against Applicant Tracking Systems used
              by 99% of Fortune 500 companies.
            </p>
          </div>

          <div className="bg-stone-900 p-6 rounded-lg shadow-md border border-gray-100">
            <div className="text-blue-500 mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-100 text-lg mb-2">Actionable Feedback</h3>
            <p className="text-gray-500">
              Get specific recommendations to improve your resume's impact, not just
              generic advice.
            </p>
          </div>

          <div className="bg-stone-900 p-6 rounded-lg shadow-md border border-gray-100">
            <div className="text-blue-500 mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Keyword Analysis</h3>
            <p className="text-gray-500">
              Discover missing keywords from job descriptions that could be holding you back.
            </p>
          </div> 

        </div>

        {}
      </div>
    </main>
  )
}