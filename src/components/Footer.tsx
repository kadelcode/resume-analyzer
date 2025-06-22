export default function Footer() {
  return (
    <footer className="bg-stone-800/50 border-t border-gray-200 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">ResumeAnalyzer</h3>
            <p className="text-gray-300">AI-powered resume optimization for your job search success.</p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-500 hover:text-blue-600 transition">Features</a></li>
              <li><a href="#" className="text-gray-500 hover:text-blue-600 transition">Pricing</a></li>
              <li><a href="#" className="text-gray-500 hover:text-blue-600 transition">API</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-500 hover:text-blue-400 transition">About</a></li>
              <li><a href="#" className="text-gray-500 hover:text-blue-400 transition">Blog</a></li>
              <li><a href="#" className="text-gray-500 hover:text-blue-400 transition">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-500 hover:text-blue-400 transition">Privacy</a></li>
              <li><a href="#" className="text-gray-500 hover:text-blue-400 transition">Terms</a></li>
              <li><a href="#" className="text-gray-500 hover:text-blue-400 transition">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} ResumeAnalyzer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}