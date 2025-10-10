import SearchBar from './SearchBar'

export default function DashboardPage({ onLogout }) {
  function handleSearch(q) {
    console.log('search:', q)
    // placeholder: perform search
  }

  return (
    <div className="min-h-screen bg-[#0f1011] text-white p-8">
      <header className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-4xl text-blue-400">Hello, Shlok</h1>
      </header>

      <main className="max-w-4xl mx-auto">
        <div className="bg-[#101214] rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-300">Ask Gemini</div>
            <div>
              <button onClick={onLogout} className="text-sm text-teal-300 underline">Logout</button>
            </div>
          </div>

          <SearchBar onSearch={handleSearch} />

          <div className="mt-6 flex gap-3">
            <button className="px-4 py-2 rounded-full bg-[#1f2426] text-gray-300">✨ Create Image</button>
            <button className="px-4 py-2 rounded-full bg-[#1f2426] text-gray-300">Write</button>
            <button className="px-4 py-2 rounded-full bg-[#1f2426] text-gray-300">Build</button>
            <button className="px-4 py-2 rounded-full bg-[#1f2426] text-gray-300">Deep Research</button>
            <button className="px-4 py-2 rounded-full bg-[#1f2426] text-gray-300">Learn</button>
          </div>
        </div>
      </main>
    </div>
  )
}
