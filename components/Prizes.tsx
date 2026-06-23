import Link from 'next/link'

export default function Prizes() {
  return (
    <section className="prizes" id="prizes">
      <span className="section-tag">Rewards</span>
      <h2 className="section-head">Impact for <em>everyone</em></h2>
      <div className="prizes-grid">
        <div className="prize-card">
          <h3>Workshop students</h3>
          <ul className="prize-items">
            <li>Expert-led full-day track sessions</li>
            <li>Official reel theme on the day</li>
            <li>7-day submission window</li>
            <li>Participation certificate</li>
            <li>Portfolio-ready project</li>
          </ul>
        </div>
        <div className="prize-card featured">
          <div className="prize-badge">Open to all</div>
          <h3>Top teams win</h3>
          <p>
            Cash prizes, certificates, and recognition whether you attended the workshop or not.
            Every team is judged equally on creativity, storytelling, and impact.
          </p>
          <Link
            href="#contact"
            className="btn-lime"
            style={{
              display: 'inline-block',
              marginTop: '1.5rem',
              fontFamily: 'var(--mono)',
              fontSize: '.7rem',
              fontWeight: 700,
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              padding: '.7rem 1.4rem',
            }}
          >
            Register your team →
          </Link>
        </div>
        <div className="prize-card">
          <h3>Competition teams</h3>
          <ul className="prize-items">
            <li>Exciting cash prizes for top reels</li>
            <li>Winner certificates</li>
            <li>Campus-wide recognition</li>
            <li>Industry visibility</li>
            <li>Your reel on the main stage</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
