import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <span className="footer-logo">✦ Campus Impact</span>
      <div className="footer-links">
        <Link href="#about">About</Link>
        <Link href="#tracks">Tracks</Link>
        <Link href="#roadmap">How it works</Link>
        <Link href="#prizes">Prizes</Link>
      </div>
      <span className="footer-copy">© 2025 Campus Impact</span>
    </footer>
  )
}
