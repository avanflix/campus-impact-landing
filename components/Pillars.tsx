const pillars = [
  {
    mark: 'WS Workshop',
    title: 'Workshop Day',
    desc: 'Individual registration. Pick any of the five tracks and spend a full day with industry pros. Select multiple tracks and pay ₹199 per track selected.',
    items: [
      '₹199 per track selected',
      'Any number of tracks',
      'Expert instructors on each discipline',
      'Official reel theme revealed at end of day',
      '7-day window to shoot and submit',
    ],
  },
  {
    mark: 'RC — Reel Competition',
    title: 'Reel Competition',
    desc: 'Team of 4 students. Open to absolutely everyone workshop attendees and non-attendees alike. Flat team entry fee of ₹399, with cash prizes and recognition for the top reels.',
    items: [
      '₹399 flat per team of 4',
      'Open to all students',
      '7-day submission window',
      'Cash prizes + certificates',
      'Jury judges on creativity, storytelling, impact',
    ],
  },
]

export default function Pillars() {
  return (
    <section className="pillars" id="pillars">
      <div>
        <span className="section-tag">Two ways to join</span>
        <h2 className="section-head">The core <em>pillars</em></h2>
        <div className="pillars-grid">
          {pillars.map((pillar) => (
            <div key={pillar.mark} className="pillar">
              <span className="pillar-mark">{pillar.mark}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.desc}</p>
              <ul className="pillar-list">
                {pillar.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
