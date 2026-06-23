import Link from 'next/link'

export default function Nav() {
  return (
    <nav>
      <span className="nav-logo">✦ Campus Impact</span>
      <ul className="nav-links">
        <li><Link href="#about">About</Link></li>
        <li><Link href="#tracks">Tracks</Link></li>
        <li><Link href="#roadmap">How it works</Link></li>
        <li><Link href="#prizes">Prizes</Link></li>
        <li><Link href="#contact" className="nav-cta">Contact</Link></li>
      </ul>
    </nav>
  )
}
