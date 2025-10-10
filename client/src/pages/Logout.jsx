import { Link } from "react-router-dom";
import logout from "../utils/logout.js";

export default function Logout() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#050510] via-[#0a0a1a] to-[#07343a] relative overflow-hidden">
      {/* Glowing ring effect in background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,255,255,0.15),_transparent_60%)] blur-2xl"></div>

      {/* Logout card */}
      <div className="relative z-10 bg-white/5 border border-cyan-400/20 backdrop-blur-lg rounded-2xl shadow-[0_0_25px_rgba(0,255,255,0.12)] p-10 w-full max-w-sm text-center">
        <h2 className="text-3xl font-semibold mb-4 text-cyan-400 drop-shadow-[0_0_10px_rgba(0,255,255,0.4)]">
          Logout
        </h2>
        <p className="text-gray-300 mb-8">
          Are you sure you want to log out of{" "}
          <span className="text-cyan-400 font-semibold">RecollectAI</span>?
        </p>

        {/* Logout button */}
        <form onSubmit={logout}>
          <button
            type="submit"
            className="relative w-full py-3 text-lg font-semibold text-black bg-cyan-400 rounded-full shadow-[0_0_20px_rgba(0,255,255,0.6)] hover:bg-cyan-300 transition-all duration-300"
          >
            <span className="relative z-10">Yes, Logout</span>
            <span className="absolute inset-0 bg-cyan-400 blur-xl opacity-40 animate-pulse rounded-full"></span>
          </button>
        </form>

        {/* Cancel link */}
        <Link
          to="/dashboard"
          className="inline-block mt-6 text-gray-400 hover:text-cyan-300 transition duration-300"
        >
          Cancel and go back
        </Link>
      </div>
    </div>
  );
}
