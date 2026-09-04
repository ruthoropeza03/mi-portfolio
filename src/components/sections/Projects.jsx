import { useState } from 'react'
import { projects } from '../../data/projects'
import Button from '../common/Button'
import Section from '../common/Section'

const Projects = () => {
  const [filter, setFilter] = useState('all')
  const tags = ['all', ...new Set(projects.flatMap(p => p.tags))]

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.tags.includes(filter))

  return (
    <Section id="projects" title="Proyectos que Resuelven Problemas" subtitle="Cada proyecto tiene un objetivo de negocio claro">
      {/* Filtros */}
      <div className="project-filters">
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            className={`filter-button
              ${filter === tag 
                ? 'is-active' 
                : ''}`}
          >
            {tag.charAt(0).toUpperCase() + tag.slice(1)}
          </button>
        ))}
      </div>

      {/* Grid de proyectos */}
      <div className="projects-grid">
        {filteredProjects.map(project => (
          <article key={project.id} className="project-card">
            <div className="project-image-wrap">
              <img 
                src={project.image} 
                alt={project.title}
                className="project-image"
                onError={(event) => {
                  event.currentTarget.style.display = 'none'
                }}
              />
              <span className="project-image-fallback" aria-hidden="true">Proyecto</span>
            </div>
            <div className="project-content">
              <h3>
                {project.title}
              </h3>
              <p>
                {project.description}
              </p>
              <div className="tag-list">
                {project.tags.map(tag => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              {project.results && (
                <div className="project-result">
                  <p>
                     {project.results}
                  </p>
                </div>
              )}
              <div className="project-actions">
                <Button variant="primary" size="sm" href={project.liveUrl}>
                  Ver demo
                </Button>
                <Button variant="outline" size="sm" href={project.githubUrl}>
                  Código
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}

export default Projects