import { Link } from "react-router-dom";

export default function DashboardHeader() {
  return (
    <header className="fixed top-0 left-0 w-full bg-black/60 backdrop-blur-lg border-b border-cyan-400/30 z-50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-cyan-400 glow">Recollect<span className="text-white">AI</span></h1>

        <nav className="flex gap-5 text-gray-300">
          <Link to="/dashboard" className="hover:text-cyan-400">Dashboard</Link>
          <Link to="/profile" className="hover:text-cyan-400">Profile</Link>
          <Link to="/logout" className="hover:text-cyan-400">Logout</Link>
        </nav>
      </div>
    </header>
  );
}
