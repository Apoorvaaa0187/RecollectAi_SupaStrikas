import ItemCard from './ItemCard'

const sample = [
  {
    id: 1,
    title: 'How to build a habit loop',
    source: 'medium.com',
    time: '2 days ago',
    sentiment: 'positive',
    summary: 'An article explaining triggers, routines, and rewards to form habits.',
    tags: ['productivity', 'habits']
  },
  {
    id: 2,
    title: 'React 19 new features',
    source: 'dev.to',
    time: '1 week ago',
    sentiment: 'neutral',
    summary: 'Overview of the new concurrent rendering APIs and hooks.',
    tags: ['react', 'frontend']
  }
]

export default function Dashboard({ items = sample }) {
  return (
    <div className="dashboard-grid">
      {items.map((it) => (
        <ItemCard key={it.id} item={it} />
      ))}
    </div>
  )
}
