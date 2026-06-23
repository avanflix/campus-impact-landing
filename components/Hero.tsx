import Link from 'next/link'

const posterCells = [
  { num: '01', icon: '🎬', title: 'Direction', desc: 'Shot composition & storytelling' },
  { num: '02', icon: '🎭', title: 'Acting', desc: 'Emotion, presence & performance' },
  { num: '03', icon: '📸', title: 'Photography', desc: 'Light, frame & composition', noBorderRight: true },
  { num: '04', icon: '🎥', title: 'Videography', desc: 'Cinematic video & movement' },
  { num: '05', icon: '⭐', title: 'Modeling', desc: 'Presence, posing & confidence' },
  { num: '06', icon: '🏆', title: 'Reel Comp.', desc: 'Open to all students', noBorderRight: true },
]

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <span className="hero-eyebrow">Creative Media Workshop &amp; Reel Competition</span>
        <h1 className="hero-title">
          Campus<br /><em>Impact</em>
        </h1>
        <p className="hero-sub">
          A one-day hands-on workshop across 5 creative tracks Direction, Acting, Photography,
          Videography, and Modeling followed by a live Reel Competition open to all students.
        </p>
        <div className="hero-actions">
          <Link href="#contact" className="btn-lime">Reach out →</Link>
          <Link href="#about" className="btn-outline">Learn more</Link>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-poster-grid">
          {/* Row 1 & 2 */}
          {posterCells.map((cell) => (
            <div
              key={cell.num}
              className={`poster-cell${cell.noBorderRight ? ' no-border-right' : ''}`}
            >
              <span className="pc-num">{cell.num}</span>
              <div className="pc-icon">{cell.icon}</div>
              <div className="pc-title">{cell.title}</div>
              <div className="pc-desc">{cell.desc}</div>
            </div>
          ))}

          {/* Row 3 */}
          <div className="poster-cell event-block">
            <div className="pc-title">One day. Five crafts. One competition.</div>
            <div className="pc-desc">
              Workshop from ₹199 per track &nbsp;·&nbsp; Reel Competition ₹399 per team of 4<br />
              Theme revealed on the day &nbsp;·&nbsp; 7-day submission window
            </div>
          </div>
          <div className="poster-cell fee-block">
            <span className="pc-num" style={{ fontSize: '3rem' }}>₹</span>
            <div className="pc-title">Starting at</div>
            <div className="fee-amt">199</div>
          </div>
        </div>
      </div>
    </section>
  )
}
