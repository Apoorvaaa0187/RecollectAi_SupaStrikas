import SearchBar from './SearchBar'
import Dashboard from './Dashboard'

export default function Popup() {
  const handleSearch = (q) => {
    // placeholder - later wire to background script or local index
    console.log('search:', q)
  }

  return (
    <div className="popup-root">
      <div className="popup-header">
        <div className="logo">Memory Lane</div>
        <div className="text-sm text-gray-500">Snapshot</div>
      </div>

      <SearchBar onSearch={handleSearch} />

      <div className="popup-body">
        <Dashboard />
      </div>
    </div>
  )
}
