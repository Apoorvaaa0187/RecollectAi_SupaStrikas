import { useState } from 'react'
import SearchBar from './components/SearchBar'
import Dashboard from './components/Dashboard'
import PhoneCarousel from './components/PhoneCarousel'
import Footer from './components/Footer'
import AuthModal from './components/AuthModal'

export default function App() {
  const [showAuth, setShowAuth] = useState(false)

  return (
    <div className="min-h-screen bg-hero-pattern bg-cover text-gray-900">
      <header className="frosted-header">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 text-white" aria-hidden="true" focusable="false">
              <path fill="currentColor" d="M12 2C8.7 2 6 4.7 6 8c0 .9.2 1.8.6 2.6C6.2 11 6 11.5 6 12c0 .6.2 1.1.6 1.5-.1.5-.1 1-.1 1.5 0 3.3 2.7 6 6 6s6-2.7 6-6-2.7-6-6-6c-.5 0-1 .1-1.5.2C13.9 6.2 14 5.1 14 4c0-1.7-1.3-3-3-3z" />
            </svg>
            <div className="brand">RecollectAI</div>
          </div>

          {/* navigation removed per request */}

          <div className="controls hidden sm:flex items-center gap-4">
            <button className="btn-outline" onClick={() => setShowAuth(true)}>Sign In</button>
            <button className="btn-download">Download Extension</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8">
        <section className="grid lg:grid-cols-2 gap-8 items-start py-12">
          <div className="hero-left">
            <h1 className="hero-title">Recollect AI — remember everything<br/>you read, watch, and save</h1>
            <p className="mt-6 text-lg text-gray-100">Capture content from across the web, get AI summaries, tag by topic or mood, and search instantly by keyword or image.</p>
            {/* hero CTA circle with download button */}
            <div className="hero-cta-circle mt-8">
              <button className="btn-download-large" title="Download Extension">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" className="inline mr-2">
                  <path d="M12 3v10" stroke="#023" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 11l4 4 4-4" stroke="#023" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 21H3" stroke="#023" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Download Extension
              </button>
            </div>
          </div>

          <div className="hero-right">
            <div className="phone-mock">
              <div className="side-button side-button-left"></div>
              <div className="side-button side-button-right"></div>
              <div className="notch">
                <div className="speaker" />
                <div className="front-camera" />
              </div>
              <div className="phone-screen p-6">
                <div className="text-sm text-gray-100 mb-2">Good morning — here's a snapshot</div>
                <div className="flex-1 bg-transparent rounded-md p-0">
                  {/* Phone carousel */}
                  <PhoneCarousel />
                </div>
              </div>
              <div className="camera-pill" />
            </div>
          </div>
        </section>
        
        {/* How It All Happens - explanatory cards */}
  <section className="py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-light text-white">How It All Happens</h2>
            <p className="mt-3 text-teal-100">A simple guide to effortless content organization</p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            <div className="bg-white/95 rounded-xl p-8 shadow-md">
              <div className="text-4xl font-light text-teal-600">01</div>
              <h4 className="mt-4 text-2xl font-semibold text-teal-900">Browse Naturally</h4>
              <p className="mt-3 text-teal-700">Install the extension and browse content as usual. When you spend time on a reel, article, or PDF, our AI automatically captures it.</p>

              <div className="mt-6 bg-teal-50 rounded-lg p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-teal-200 flex items-center justify-center">⏱️</div>
                <div>
                  <div className="font-semibold text-teal-900">Time-based capture</div>
                  <div className="text-sm text-teal-700">Auto-saves after few seconds</div>
                </div>
              </div>
            </div>

            <div className="bg-white/95 rounded-xl p-8 shadow-md">
              <div className="text-4xl font-light text-orange-400">02</div>
              <h4 className="mt-4 text-2xl font-semibold text-teal-900">AI Analyzes</h4>
              <p className="mt-3 text-teal-700">Our AI processes each piece through intelligent tagging, sentiment analysis, and contextual understanding.</p>

              <div className="mt-6 bg-orange-50 rounded-lg p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">🧠</div>
                <div>
                  <div className="font-semibold text-teal-900">Smart processing</div>
                  <div className="text-sm text-teal-700">Tags, keywords, emotions</div>
                </div>
              </div>
            </div>

            <div className="bg-white/95 rounded-xl p-8 shadow-md">
              <div className="text-4xl font-light text-teal-600">03</div>
              <h4 className="mt-4 text-2xl font-semibold text-teal-900">Find Instantly</h4>
              <p className="mt-3 text-teal-700">Search by keywords, emotions, or visual cues. Access your entire content history organized and searchable.</p>

              <div className="mt-6 bg-teal-50 rounded-lg p-4">
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-sm">INSPIRING</span>
                  <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-sm">HELPFUL</span>
                  <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-sm">FUNNY</span>
                </div>
              </div>
            </div>
          </div>
  </section>

  <section className="py-12">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="text-3xl font-semibold">Our Services</h3>
              <p className="mt-4 text-gray-600">Discover a full range of memory services: visual search, AI summaries, timeline browsing, and privacy controls.</p>
              {/* demo button removed per request */}
            </div>
            <div>
              <div className="cards-rail">
                <div className="service-card">AI Summaries & Keywords</div>
                <div className="service-card">Visual Search & Embeddings</div>
                <div className="service-card">Emotion & Sentiment Tags</div>
                <div className="service-card">Local-first Privacy Controls</div>
              </div>
            </div>
          </div>
        </section>

          <Footer />
          <AuthModal show={showAuth} onClose={() => setShowAuth(false)} />
      </main>
    </div>
  )
}

