import { useEffect, useRef, useState } from 'react'
import { projects } from '../data.js'
import { useReveal } from '../hooks/useReveal.js'

function ProjectCard({ project, onOpen }) {
  const ref = useReveal()

  return (
    <article className="project-card reveal" ref={ref}>
      <button
        className="project-card__media"
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`View details for ${project.title}`}
      >
        <img src={project.image} alt="" loading="lazy" />
      </button>

      <div className="project-card__body">
        <h3 className="project-card__title">
          <button type="button" onClick={() => onOpen(project)}>
            <span className="text-gradient">{project.title}</span>
          </button>
        </h3>

        <span className="project-card__tech-label">Tech Stack</span>
        <ul className="project-card__tags" aria-label={`${project.title} technology stack`}>
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}

function ProjectModal({ project, onClose }) {
  const closeButtonRef = useRef(null)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const previousActiveElement = document.activeElement
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      previousActiveElement?.focus()
    }
  }, [onClose])

  return (
    <div className="project-modal" role="presentation" onMouseDown={onClose}>
      <article
        className="project-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`project-modal-title-${project.id}`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          className="project-modal__close"
          type="button"
          onClick={onClose}
          aria-label="Close project details"
        >
          <span aria-hidden="true">×</span>
        </button>

        <div className="project-modal__media">
          <img src={project.image} alt={project.title} />
        </div>

        <div className="project-modal__content">
          <span className="project-card__category">{project.category}</span>
          <h3 id={`project-modal-title-${project.id}`} className="project-modal__title">
            <span className="text-gradient">{project.title}</span>
          </h3>
          <p className="project-modal__desc">{project.description}</p>

          {project.features && (
            <div className="project-modal__detail">
              <span className="project-modal__label">Core Features</span>
              <p>{project.features}</p>
            </div>
          )}

          {project.results && (
            <div className="project-modal__detail project-modal__detail--result">
              <span className="project-modal__label">Results</span>
              <p>{project.results}</p>
            </div>
          )}

          <span className="project-modal__label project-modal__tech-label">Tech Stack</span>
          <ul className="project-card__tags">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </article>
    </div>
  )
}

export default function Projects() {
  const ref = useReveal()
  const [activeProject, setActiveProject] = useState(null)

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div className="section__head reveal" ref={ref}>
          <span className="section__index">02</span>
          <h2 className="section__title"><span className="text-gradient">Selected Work</span></h2>
          <span className="section__en">SELECTED&nbsp;WORKS</span>
        </div>

        <div className="projects__list">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={setActiveProject} />
          ))}
        </div>
      </div>

      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </section>
  )
}
