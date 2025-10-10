export default function ItemCard({ item }) {
  return (
    <div className="item-card">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-lg font-semibold">{item.title}</div>
          <div className="text-xs text-gray-500">{item.source} • {item.time}</div>
        </div>
        <div className="text-right">
          <div className={`sentiment ${item.sentiment === 'positive' ? 'text-green-600' : item.sentiment === 'negative' ? 'text-red-500' : 'text-yellow-600'}`}>
            {item.sentiment}
          </div>
        </div>
      </div>
      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{item.summary}</p>
      <div className="mt-2">
        {item.tags?.map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>
    </div>
  )
}
