import Nav from '@/components/Nav'
import Ticker from '@/components/Ticker'
import Hero from '@/components/Hero'
import AboutStrip from '@/components/AboutStrip'
import Pillars from '@/components/Pillars'
import Roadmap from '@/components/Roadmap'
import Tracks from '@/components/Tracks'
import Prizes from '@/components/Prizes'
import CtaBand from '@/components/CtaBand'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <Ticker />
      <Hero />
      <AboutStrip />
      <Pillars />
      <Roadmap />
      <Tracks />
      <Prizes />
      <CtaBand />
      <Contact />
      <Footer />
    </>
  )
}
