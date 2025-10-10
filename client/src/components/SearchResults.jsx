import React from 'react'


export default function SearchResults({ results, onItemClick }) {
if (!results || results.length === 0) return <div className="search-results"><div style={{ padding: 32, textAlign: 'center', color: '#bbb' }}>No results found.</div></div>


return (
<div className="search-results">
{results.map((r, i) => (
<div className="search-result-item" key={i} onClick={() => onItemClick(i)}>
<div className="result-meta">
<div className="result-title">{r.title} <span className="result-type">{r.type}</span></div>
<div className="result-timestamp">{r.timestamp}</div>
<a className="result-url" href={r.url} target="_blank" rel="noreferrer">{r.url}</a>
</div>
</div>
))}
</div>
)
}