import { useState } from 'react'

const slides = [
  {
    id: 1,
    title: 'AI summary: Habit loop',
    source: 'medium.com',
    snippet: 'Triggers, routines and rewards — quick 3-point summary.'
  },
  {
    id: 2,
    title: 'React 19 Notes',
    source: 'dev.to',
    snippet: 'Concurrent features, new hooks and migration tips.'
  },
  {
    id: 3,
    title: 'Inspiring design article',
    source: 'blog.xyz',
    snippet: 'Color systems, layouts and component-driven UI.'
  }
]

export default function PhoneCarousel() {
  const [index, setIndex] = useState(0)

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)
  const next = () => setIndex((i) => (i + 1) % slides.length)

  return (
    <div className="carousel h-full flex flex-col">
      <div className="carousel-frame flex-1 flex items-center justify-center">
        {slides.map((s, i) => (
          <div key={s.id} className={`carousel-slide ${i === index ? 'active' : ''}`}>
            <div className="text-sm text-gray-200">{s.source}</div>
            <div className="mt-2 font-semibold text-lg">{s.title}</div>
            <div className="mt-2 text-sm text-gray-300">{s.snippet}</div>
          </div>
        ))}
      </div>

      <div className="carousel-controls mt-3 flex items-center justify-between">
        <button className="px-3 py-1 rounded-md bg-white/10 text-white" onClick={prev}>Prev</button>
        <div className="dots">
          {slides.map((_, i) => (
            <button key={i} className={`dot ${i === index ? 'dot-active' : ''}`} onClick={() => setIndex(i)}></button>
          ))}
        </div>
        <button className="px-3 py-1 rounded-md bg-white/10 text-white" onClick={next}>Next</button>
      </div>
    </div>
  )
}
