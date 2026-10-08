import { useEffect, useState } from 'react'
import { profile } from '../data.js'
import HeroBackground from './HeroBackground.jsx'

const roles = [
  'AI Engineer',
  'Agent Developer',
  'RAG & Enterprise Solution Builder',
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [typedRole, setTypedRole] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentRole = roles[roleIndex]
    const isComplete = typedRole === currentRole
    const isEmpty = typedRole === ''

    const delay = isComplete && !isDeleting ? 2000 : isDeleting ? 42 : 72

    const timer = window.setTimeout(() => {
      if (!isDeleting && !isComplete) {
        setTypedRole(currentRole.slice(0, typedRole.length + 1))
        return
      }

      if (!isDeleting && isComplete) {
        setIsDeleting(true)
        return
      }

      if (isDeleting && !isEmpty) {
        setTypedRole(currentRole.slice(0, typedRole.length - 1))
        return
      }

      setIsDeleting(false)
      setRoleIndex((index) => (index + 1) % roles.length)
    }, delay)

    return () => window.clearTimeout(timer)
  }, [isDeleting, roleIndex, typedRole])

  return (
    <section id="home" className="hero">
      <div className="hero__media" aria-hidden="true">
        <HeroBackground />
        <div className="hero__grid" />
        <div className="hero__glow" />
        <div className="hero__overlay" />
        <div className="hero__vignette" />
      </div>

      <div className="hero__content container">
        <div className="hero__text">
          <p className="hero__kicker">
            <span className="hero__kicker-line" />
            {profile.handle} - {profile.location}
          </p>
          <h1 className="hero__title">
            <span className="text-gradient">Hello, I'm Jaqen HU</span>
          </h1>
          <p className="hero__role-line">
            <span className="hero__role-prefix text-gradient">A </span>
            <span className="hero__typed-role" aria-live="polite">
              {typedRole}
            </span>
            <span className="hero__type-cursor" aria-hidden="true">
              |
            </span>
          </p>
          <p className="hero__subtitle">
            Building AI agents and retrieval systems for enterprise workflows,
            combining system integration, evaluation, and practical deployment.
          </p>
          <div className="hero__actions">
            <a href="#projects" className="btn btn--solid">
              View Work
            </a>
            <a href="#contact" className="btn btn--outline">
              <span className="text-gradient">Get in Touch</span>
            </a>
          </div>
        </div>

        <div className="hero__portrait">
          <div className="hero__portrait-aura" aria-hidden="true" />
          <img
            src="/portrait.png"
            alt={`${profile.name} — ${profile.role}`}
            className="hero__portrait-img"
          />
        </div>
      </div>

      <div className="hero__scroll-hint" aria-hidden="true">
        <span>SCROLL</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  )
}
