export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-0.5">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Memory<span className="text-blue-400">Lane</span>
          </h2>
          <p className="text-sm">
            Your AI-powered personal content organizer — recall, rediscover, and relive your digital moments effortlessly.
          </p>
        </div>

        {}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#features" className="hover:text-blue-400">Features</a></li>
            <li><a href="#privacy" className="hover:text-blue-400">Privacy Policy</a></li>
            <li><a href="#terms" className="hover:text-blue-400">Terms of Service</a></li>
            <li><a href="#contact" className="hover:text-blue-400">Contact Us</a></li>
          </ul>
        </div>

        {/* Social / Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Stay Connected</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" className="hover:text-blue-400">Twitter</a>
            <a href="#" className="hover:text-blue-400">LinkedIn</a>
            <a href="#" className="hover:text-blue-400">GitHub</a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MemoryLane. All rights reserved.
      </div>
    </footer>
  );
}
