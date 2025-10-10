import { useState } from "react";
import fetchSearchResults from '../utils/search'

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  // Calls backend through helper function
  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const data = await fetchSearchResults(query);
      setResults(data);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <section className="pt-24 pb-16 relative z-10 max-w-6xl mx-auto px-6">
      {/* Search Box */}
      <div className="glass neon-border flex items-center rounded-3xl h-14 px-2 max-w-2xl mx-auto shadow-[0_0_25px_rgba(0,255,255,0.12)]">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Search your memories..."
          className="flex-1 bg-transparent outline-none px-4 text-white placeholder-gray-400"
        />
        <button
          onClick={handleSearch}
          className="p-3 hover:text-cyan-400 transition"
          title="Search"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M2 2L20 11L2 20L6 11L2 2Z" fill="currentColor" />
          </svg>
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-400 mt-8">
          Fetching your memories...
        </p>
      )}

      {/* Results */}
      {!loading && results.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {results.map((item) => (
            <div
              key={item._id}
              className="glass neon-border rounded-xl p-5 cursor-pointer hover:scale-[1.03] transition shadow-[0_0_25px_rgba(0,255,255,0.08)]"
              onClick={() => setSelected(item)}
            >
              <h3 className="text-xl font-semibold text-cyan-400 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-300 text-sm line-clamp-3">
                {item.summary}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && results.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No results yet — try searching for something.
        </p>
      )}

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <div
            className="glass neon-border p-8 rounded-2xl w-[90%] max-w-2xl text-left text-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-semibold mb-4 text-cyan-400">
              {selected.title}
            </h3>

            {/* URL */}
            {selected.url && (
              <p className="mb-3">
                <span className="font-semibold text-cyan-300">URL: </span>
                <a
                  href={selected.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline break-all"
                >
                  {selected.url}
                </a>
              </p>
            )}

            {/* Summary */}
            {selected.summary && (
              <p className="mb-4 text-gray-300 leading-relaxed">
                {selected.summary}
              </p>
            )}

            {/* Tags */}
            {selected.tags?.length > 0 && (
              <div className="mb-3">
                <span className="font-semibold text-cyan-300">Tags:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selected.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-cyan-400/20 border border-cyan-400/40 text-cyan-300 px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Emotion */}
            {selected.emotion?.length > 0 && (
              <div className="mt-3">
                <span className="font-semibold text-cyan-300">Emotions:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selected.emotion.map((emo, i) => (
                    <span
                      key={i}
                      className="bg-pink-400/20 border border-pink-400/40 text-pink-300 px-3 py-1 rounded-full text-sm"
                    >
                      {emo}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="text-center mt-6">
              <button
                onClick={() => setSelected(null)}
                className="bg-cyan-400 text-black px-6 py-2 rounded-full font-semibold hover:bg-cyan-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
