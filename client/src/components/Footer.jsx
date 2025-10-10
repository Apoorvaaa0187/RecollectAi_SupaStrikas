export default function Footer() {
  return (
    <footer className="text-center py-6 text-gray-400 border-t border-cyan-400/10 mt-10 bg-zinc-950/30 backdrop-blur-md">
      © {new Date().getFullYear()}{" "}
      <span className="text-cyan-400 font-semibold">RecollectAI</span> — Designed for the Future.
    </footer>
  );
}
