import { Link } from "react-router-dom";

export default function HowItWorks() {
  const steps = [
    {
      title: "Browse Naturally",
      desc: "Install our extension. When you read or watch, our AI automatically captures key moments.",
    },
    {
      title: "AI Analyzes",
      desc: "Our AI tags, summarizes, and organizes your content contextually.",
    },
    {
      title: "Find Instantly",
      desc: "Search by keywords, emotions, or visuals — everything is rediscoverable.",
    },
  ];

  return (
    <section className="py-20 text-center relative z-10">
      <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-10">
        How It Works
      </h2>
      <div className="flex flex-wrap justify-center gap-8 px-6">
        {steps.map((step, i) => (
          <div
            key={i}
            className="bg-white/10 border border-cyan-400/30 backdrop-blur-lg p-6 rounded-xl w-72 shadow-[0_0_20px_rgba(0,255,255,0.1)] hover:scale-105 transition"
          >
            <h3 className="text-xl font-semibold mb-2 text-white">
              {i + 1}. {step.title}
            </h3>
            <p className="text-gray-300 text-sm">{step.desc}</p>
          </div>
        ))}
      </div>

      <Link
        to="/login"
        className="mt-12 inline-block bg-cyan-400 text-black font-semibold px-8 py-3 rounded-full shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:bg-cyan-300 transition"
      >
        Get Started
      </Link>
    </section>
  );
}
