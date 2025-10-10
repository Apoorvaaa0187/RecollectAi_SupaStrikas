import { useState } from 'react'

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState('')

  return (
    <div className="search-row">
      <input
        className="w-full p-2 rounded-md border"
        placeholder="Search your memory... (keywords, feelings, urls)"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch?.(q)}
      />
    </div>
  )
}
