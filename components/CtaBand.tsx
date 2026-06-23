import Link from 'next/link'

export default function CtaBand() {
  return (
    <div className="cta-band" id="register">
      <h2>
        Ready to create<br /><em>what&apos;s next?</em>
      </h2>
      <div className="cta-actions">
        <Link href="#contact" className="btn-ink">Get in touch →</Link>
        <Link href="#about" className="btn-naked">Learn more first</Link>
      </div>
    </div>
  )
}
