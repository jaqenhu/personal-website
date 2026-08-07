import { profile, stats } from '../data.js'
import { useReveal } from '../hooks/useReveal.js'

export default function About() {
  const ref = useReveal()

  return (
    <section id="about" className="section about">
      <div className="container reveal" ref={ref}>
        <div className="section__head">
          <span className="section__index">01</span>
          <h2 className="section__title">About</h2>
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
              <span className="about__highlight">Hi, I'm Jaqen Hu.</span>
            </h3>
            <p className="about__para">
              My work centers around AI and VR, with a focus on bringing
              cutting-edge technologies to life. Right now I'm building AI
              Agents and digital twin scenes.
            </p>
            <p className="about__para">
              I truly believe great tech products blend in-depth research and
              hands-on engineering. I'd love to connect for open-source
              collaboration, project work or tech talks, and build things
              alongside like-minded people.
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
                  <span className="about__stat-value">{item.value}</span>
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
