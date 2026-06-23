const tracks = [
  {
    icon: '🎬',
    num: '01',
    name: 'Direction',
    sub: 'Shot composition, actor blocking, storyboarding, and turning a concept into a compelling visual sequence.',
  },
  {
    icon: '🎭',
    num: '02',
    name: 'Acting',
    sub: 'Camera presence, scene work, authentic emotion, and connecting powerfully with your on-screen audience.',
  },
  {
    icon: '📷',
    num: '03',
    name: 'Photography',
    sub: 'Light, composition, framing, and telling a complete story in a single still frame mobile to DSLR.',
  },
  {
    icon: '🎥',
    num: '04',
    name: 'Videography',
    sub: 'Camera movement, shot coverage, lighting for video, and how to shoot every scene for the final edit.',
  },
  {
    icon: '⭐',
    num: '05',
    name: 'Modeling',
    sub: 'Posing, expression, camera confidence, and building a professional presence in front of any lens.',
    noBorderRight: true,
  },
]

export default function Tracks() {
  return (
    <section className="tracks" id="tracks" style={{ paddingBottom: 0 }}>
      <span className="section-tag">What you&apos;ll learn</span>
      <h2 className="section-head">Workshop <em>tracks</em></h2>
      <p style={{ color: 'var(--muted)', fontSize: '.9rem', marginBottom: '2rem', maxWidth: '36rem' }}>
        Select one or more tracks — each is ₹199. Mix and match for a full creative day across multiple disciplines.
      </p>
      <div className="tracks-grid">
        {tracks.map((track) => (
          <div
            key={track.num}
            className={`track-card${track.noBorderRight ? ' no-border-right' : ''}`}
          >
            <div className="track-icon">{track.icon}</div>
            <div className="track-num">{track.num}</div>
            <div className="track-name">{track.name}</div>
            <div className="track-sub">{track.sub}</div>
            <span className="track-fee">₹199 / student</span>
          </div>
        ))}
      </div>
    </section>
  )
}
