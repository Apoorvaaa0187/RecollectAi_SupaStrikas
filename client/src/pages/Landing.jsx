import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center relative z-10 px-6">
      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-cyan-400 drop-shadow-[0_0_15px_rgba(0,255,255,0.4)]">
        Welcome to <span className="text-white">RecollectAI</span>
      </h2>
      <p className="text-gray-300 max-w-2xl mb-10">
        The next-generation AI platform that remembers everything for you.
        Seamlessly search, summarize, and rediscover your digital world.
      </p>
      <Link
        to="/how-it-works"
        className="bg-cyan-400 text-black font-semibold px-8 py-3 rounded-full shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:bg-cyan-300 transition"
      >
        How It Works
      </Link>
    </section>
  );
}
