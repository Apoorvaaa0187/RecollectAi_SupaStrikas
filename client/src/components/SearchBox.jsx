import React from 'react'


export default function SearchBox({ query, setQuery, onSend, onUploadClick, onVoiceClick }) {
return (
<div className="search-box glass neon-border">
<button className="search-upload-btn" title="Upload file" onClick={onUploadClick}>
<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><rect x="10" y="5" width="2" height="12" rx="1" fill="currentColor"/><rect x="5" y="10" width="12" height="2" rx="1" fill="currentColor"/></svg>
</button>
<input type="file" id="fileInput" multiple style={{ display: 'none' }} />


<input value={query} onChange={e => setQuery(e.target.value)} type="text" id="dashboardSearch" placeholder="Ask anything" />


<button className="search-voice-btn" title="Voice search" onClick={onVoiceClick}>
<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="8" y="4" width="6" height="10" rx="3" fill="currentColor"/><rect x="10" y="15" width="2" height="4" rx="1" fill="currentColor"/><rect x="7" y="19" width="8" height="2" rx="1" fill="currentColor"/></svg>
</button>


<button className="search-send-btn" title="Send" onClick={onSend}>
<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="11" fill="currentColor" opacity="0.13"/><path d="M7.5 11h5.17l-2.09-2.09L11.5 8l4 4-4 4-1.41-1.41L12.67 13H7.5v-2z" fill="currentColor"/></svg>
</button>
</div>
)
}