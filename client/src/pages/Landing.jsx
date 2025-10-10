import { Search, Brain, Heart, Sparkles, Clock, ShieldCheck } from "lucide-react"
import Header from '../component/Header.jsx'
import Footer from '../component/Footer.jsx'

export default function LandingPage() {
  return (
    <>
    <Header />
    <main className="bg-gray-950 text-white">
      {/* 🧠 Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-24 bg-gradient-to-b from-gray-900 to-gray-950">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          Remember Everything You Discover with{" "}
          <span className="text-blue-400">Recollect</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
          Your personal AI-powered content organizer — automatically capture,
          tag, and retrieve articles, videos, and images that inspire you.
        </p>
        <a
          href="#features"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-semibold flex items-center gap-2"
        >
          Explore Features
        </a>
      </section>

      {/* 💡 Features Section */}
      <section
        id="features"
        className="py-20 px-6 bg-gray-900 border-t border-gray-800"
      >
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-3">
            AI Features that Organize Your Digital Memory
          </h2>
          <p className="text-gray-400">
            From content capture to emotional search — everything happens
            automatically.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="p-8 bg-gray-800 rounded-2xl hover:shadow-lg transition">
            <div className="bg-blue-500 w-12 h-12 flex items-center justify-center rounded-xl mb-4">
              <Search size={26} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
            <p className="text-gray-400 text-sm">
              Instantly find what you read, watched, or saved — using keywords,
              emotions, or even image similarity.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 bg-gray-800 rounded-2xl hover:shadow-lg transition">
            <div className="bg-purple-500 w-12 h-12 flex items-center justify-center rounded-xl mb-4">
              <Brain size={26} />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Tagging</h3>
            <p className="text-gray-400 text-sm">
              Automatically summarizes and categorizes all your content with
              intelligent keyword and emotion tagging.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 bg-gray-800 rounded-2xl hover:shadow-lg transition">
            <div className="bg-pink-500 w-12 h-12 flex items-center justify-center rounded-xl mb-4">
              <Heart size={26} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Emotion Search</h3>
            <p className="text-gray-400 text-sm">
              Search by mood — like “funny,” “inspiring,” or “helpful.” Your
              emotions are part of your memory.
            </p>
          </div>
        </div>
      </section>

      {/* 🖼️ About Section */}
      <section
        id="about"
        className="py-24 px-6 bg-gray-950 border-t border-gray-800"
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Why Recollect?</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            In a world full of digital noise, Recollect helps you organize what truly matters.
            Whether it’s an inspiring article, a useful video, or a quote that moved you — 
            your AI assistant keeps it all neatly stored, context-aware, and easy to rediscover.
          </p>
          <a
            href="#benefits"
            className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl text-white font-semibold"
          >
            See How You Benefit
          </a>
        </div>
      </section>

      {/* 🌟 Benefits Section */}
      <section
        id="benefits"
        className="py-20 px-6 bg-gray-900 border-t border-gray-800"
      >
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-3">How You Benefit with Recollect</h2>
          <p className="text-gray-400 text-lg">
            Experience the power of AI that makes your content retrieval simple, smart, and personalized.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* Benefit 1 */}
          <div className="p-8 bg-gray-800 rounded-2xl hover:shadow-lg transition">
            <div className="bg-green-500 w-12 h-12 flex items-center justify-center rounded-xl mb-4">
              <Sparkles size={26} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Save Time</h3>
            <p className="text-gray-400 text-sm">
              No more scrolling through browser history or bookmarks. Find what
              you need instantly — anytime.
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="p-8 bg-gray-800 rounded-2xl hover:shadow-lg transition">
            <div className="bg-yellow-500 w-12 h-12 flex items-center justify-center rounded-xl mb-4">
              <Clock size={26} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Stay Organized Effortlessly</h3>
            <p className="text-gray-400 text-sm">
              Recollect automatically organizes your articles, videos, and notes —
              so you can focus on learning, not sorting.
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="p-8 bg-gray-800 rounded-2xl hover:shadow-lg transition">
            <div className="bg-blue-500 w-12 h-12 flex items-center justify-center rounded-xl mb-4">
              <ShieldCheck size={26} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Private and Secure</h3>
            <p className="text-gray-400 text-sm">
              Your data stays yours — processed locally or encrypted in the cloud,
              ensuring full privacy and control.
            </p>
          </div>
        </div>
      </section>
    </main>
    <Footer/>
    </>
  );
}
