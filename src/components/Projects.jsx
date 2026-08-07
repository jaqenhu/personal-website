import { projects } from '../data.js'
import { useReveal } from '../hooks/useReveal.js'

function ProjectCard({ project }) {
  const ref = useReveal()

  return (
    <article className="project-card reveal" ref={ref}>
      <div className="project-card__media">
        <img src={project.image} alt={project.title} loading="lazy" />
        <span className="project-card__index">{project.index}</span>
      </div>
      <div className="project-card__body">
        <span className="project-card__category">{project.category}</span>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.description}</p>
        {project.features && (
          <div className="project-card__detail">
            <span className="project-card__detail-label">Core Features</span>
            <p>{project.features}</p>
          </div>
        )}
        {project.results && (
          <div className="project-card__detail project-card__detail--result">
            <span className="project-card__detail-label">Results</span>
            <p>{project.results}</p>
          </div>
        )}
        <span className="project-card__tech-label">Tech Stack</span>
        <ul className="project-card__tags">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default function Projects() {
  const ref = useReveal()

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div className="section__head reveal" ref={ref}>
          <span className="section__index">02</span>
          <h2 className="section__title">Selected Work</h2>
          <span className="section__en">SELECTED&nbsp;WORKS</span>
        </div>

        <div className="projects__list">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
