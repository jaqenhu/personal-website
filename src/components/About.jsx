import { profile, stats } from '../data.js'
import { useReveal } from '../hooks/useReveal.js'

export default function About() {
  const ref = useReveal()

  return (
    <section id="about" className="section about">
      <div className="container reveal" ref={ref}>
        <div className="section__head">
          <span className="section__index">01</span>
          <h2 className="section__title"><span className="text-gradient">About</span></h2>
          <span className="section__en">WHO&nbsp;I&nbsp;AM</span>
        </div>

        <div className="about__grid">
          <div className="about__portrait">
            <div className="about__portrait-frame">
              <img
                src="/about-portrait.png"
                alt={`${profile.name} portrait`}
                loading="lazy"
              />
              <div className="about__portrait-glow" />
            </div>
            <div className="about__portrait-caption">
              <span>{profile.name}</span>
              <span>{profile.role}</span>
            </div>
          </div>

          <div className="about__body">
            <h3 className="about__lead">
              <span className="about__highlight text-gradient">Hi, I'm Jaqen Hu.</span>
            </h3>
            <p className="about__para">
              I’m an AI engineer focused on agents, retrieval systems, and
              workflow automation. My projects include privately deployed AI
              workflows, enterprise knowledge retrieval, and digital-twin
              training applications.
            </p>
            <p className="about__para">
              I focus on connecting models with tools and data, evaluating
              system behavior, and building practical applications around real
              workflows. I’m interested in forward-deployed AI engineering roles
              where I can develop these capabilities through close collaboration
              with users and engineering teams.
            </p>

            <ul className="about__meta">
              <li>
                <span className="about__meta-label">EMAIL</span>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </li>
              <li>
                <span className="about__meta-label">PHONE</span>
                <a href={`tel:${profile.phone.replaceAll('-', '')}`}>
                  {profile.phone}
                </a>
              </li>
              <li>
                <span className="about__meta-label">GITHUB</span>
                <a href={profile.github} target="_blank" rel="noreferrer">
                  {profile.handle}
                </a>
              </li>
              <li>
                <span className="about__meta-label">BASE</span>
                <span>{profile.location}</span>
              </li>
            </ul>

            <div className="about__stats">
              {stats.map((item) => (
                <div key={item.label} className="about__stat">
                  <span className="about__stat-value"><span className="text-gradient">{item.value}</span></span>
                  <span className="about__stat-label">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
