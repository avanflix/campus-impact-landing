const items = [
  'Direction', 'Acting', 'Photography', 'Videography', 'Modeling',
  'Reel Competition', 'Campus Impact', "Creating What's Next",
]

export default function Ticker() {
  // Duplicate for seamless loop
  const allItems = [...items, ...items]

  return (
    <div className="ticker">
      <div className="ticker-track">
        {allItems.map((item, i) => (
          <span key={i} className="ticker-item">{item}</span>
        ))}
      </div>
    </div>
  )
}
