import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent relative z-10 p-4">
      <div className="bg-white/5 border border-cyan-400/20 backdrop-blur-lg rounded-2xl p-8 w-full max-w-sm shadow-[0_0_25px_rgba(0,255,255,0.15)]">
        <h2 className="text-3xl font-semibold text-center mb-6 text-cyan-400 drop-shadow-[0_0_10px_rgba(0,255,255,0.4)]">
          Create Account
        </h2>
        <form className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-cyan-400/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 outline-none transition"
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-cyan-400/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 outline-none transition"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-cyan-400/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 outline-none transition"
            required
          />
          <button
            type="submit"
            className="w-full bg-cyan-400 text-black py-2 rounded-lg font-semibold hover:bg-cyan-300 shadow-[0_0_15px_rgba(0,255,255,0.4)] transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-400 text-sm mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-cyan-400 hover:text-cyan-300 font-semibold transition"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
