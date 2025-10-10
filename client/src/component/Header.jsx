import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo / Brand */}
        <div className="text-2xl font-bold tracking-wide">
          Re<span className="text-blue-400">collect</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <a href="#features" className="hover:text-blue-400 transition">Features</a>
          <a href="#about" className="hover:text-blue-400 transition">About</a>
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white font-semibold"
          >
            Get Started
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-gray-300 hover:text-white"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 text-gray-200">
          <nav className="flex flex-col items-center py-4 space-y-3">
            <a href="#features" className="hover:text-blue-400">Features</a>
            <a href="#about" className="hover:text-blue-400">About</a>
            <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white font-semibold">
              Get Started
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
