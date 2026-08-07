import { useEffect, useRef, useState } from 'react'
import { skills } from '../data.js'
import { useReveal } from '../hooks/useReveal.js'

export default function Skills() {
  const headRef = useReveal()
  const sectionRef = useRef(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true)
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -24% 0px', threshold: 0.28 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="skills"
      className={`section skills ${isActive ? 'skills--active' : ''}`}
      ref={sectionRef}
    >
      <div className="container">
        <div className="section__head reveal" ref={headRef}>
          <span className="section__index">03</span>
          <h2 className="section__title">Skills</h2>
          <span className="section__en">TECH&nbsp;STACK</span>
        </div>

        <div className="skills__shell">
          <div className="skills__intro">
            <span className="skills__eyebrow">ENGINEERING RANGE</span>
            <p>
              Practical capabilities across AI engineering, agent workflows and
              immersive Unity / VR production.
            </p>
          </div>

          <div className="skills__list" aria-label="Technical skills">
            {skills.map((skill, index) => (
              <div
                className="skill-row"
                key={skill.name}
                style={{
                  '--skill-value': `${skill.value}%`,
                  '--skill-delay': `${index * 90}ms`,
                }}
              >
                <div className="skill-row__meta">
                  <span className="skill-row__name">{skill.name}</span>
                  <span className="skill-row__value">{skill.value}%</span>
                </div>
                <div
                  className="skill-row__track"
                  role="progressbar"
                  aria-label={skill.name}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-valuenow={isActive ? skill.value : 0}
                >
                  <span className="skill-row__bar" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
