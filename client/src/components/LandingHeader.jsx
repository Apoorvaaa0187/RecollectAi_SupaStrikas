import { Link, useLocation } from "react-router-dom";

export default function LandingHeader() {
  const { pathname } = useLocation();

  return (
    <header className="fixed top-0 left-0 w-full bg-black/30 backdrop-blur-md border-b border-cyan-400/10 z-50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        {/* Brand */}
        <h1 className="text-2xl font-bold text-cyan-400 glow">
          Recollect<span className="text-white">AI</span>
        </h1>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-gray-300 font-medium">
          <Link
            to="/"
            className={`hover:text-cyan-400 transition ${
              pathname === "/" ? "text-cyan-400" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/how-it-works"
            className={`hover:text-cyan-400 transition ${
              pathname === "/how-it-works" ? "text-cyan-400" : ""
            }`}
          >
            How It Works
          </Link>

          {/* Neon Login Button */}
          <Link
            to="/login"
            className="ml-6 relative inline-flex items-center justify-center px-6 py-2 text-black font-semibold bg-cyan-400 rounded-full transition-all duration-300 hover:bg-cyan-300 shadow-[0_0_25px_rgba(0,255,255,0.6)]"
          >
            <span className="relative z-10">Login</span>
            {/* subtle glowing ring */}
            <span className="absolute inset-0 rounded-full bg-cyan-400 blur-xl opacity-40 animate-pulse"></span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
