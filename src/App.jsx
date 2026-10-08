import { Analytics } from '@vercel/analytics/react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Testimonials from './components/Testimonials.jsx'
import Contact from './components/Contact.jsx'
import CursorTrail from './components/CursorTrail.jsx'

export default function App() {
  return (
    <>
      <CursorTrail />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Testimonials />
        <Contact />
      </main>
      <Analytics />
    </>
  )
}
