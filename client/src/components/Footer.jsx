export default function Footer() {
  return (
    <footer className="site-footer mt-16">
      <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="text-2xl font-bold mb-2">RecollectAI</div>
          <p className="text-sm text-gray-200">Your personal AI-powered memory assistant for digital content.</p>
        </div>

        <div>
          <h4 className="mb-3 font-semibold">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-200">
            <li>About Us</li>
            <li>How It Works</li>
            <li>Features</li>
            <li>Pricing</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-semibold">Resources</h4>
          <ul className="space-y-2 text-sm text-gray-200">
            <li>Documentation</li>
            <li>API Guide</li>
            <li>Blog</li>
            <li>Community</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-semibold">Support</h4>
          <ul className="space-y-2 text-sm text-gray-200">
            <li>Help Center</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
