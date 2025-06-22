export default function ValueProposition() {
    return (
        <div className="grid md:grid-cols-3 gap-6 mb-12 mx-6 md:mx-12">
          <div className="bg-stone-900 p-6 rounded-lg shadow-md border border-gray-100">
            <div className="text-blue-400 mb-4">
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
            <div className="text-blue-400 mb-4">
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
            <div className="text-blue-400 mb-4">
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
    )
}