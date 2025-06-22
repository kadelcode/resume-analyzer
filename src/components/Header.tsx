"use client";

export default function Header() {
  const scrollToAnalyzer = () => {
    const element = document.getElementById('resume-analyzer');
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
  };
  
  return (
    <header className="bg-stone/90 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {/*<span className="text-xl font-bold">RA</span>*/}
          <h1 className="text-xl font-bold text-blue-400">ResumeAnalyzer</h1>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-300 hover:text-blue-400 transition">Features</a>
          <a href="#" className="text-gray-300 hover:text-blue-400 transition">Examples</a>
          <a href="#" className="text-gray-300 hover:text-blue-400 transition">Pricing</a>
        </nav>
        <button onClick={scrollToAnalyzer} className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition">
          Get Started
        </button>
      </div>
    </header>
  );
}