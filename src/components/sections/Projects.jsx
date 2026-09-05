import { useState } from "react";
import { projects } from "../../data/projects";
import Button from "../common/Button";
import Section from "../common/Section";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../i18n/translations";

const Projects = () => {
  const { lang } = useLanguage();
  const t = translations[lang].projects;
  const localized = translations[lang].projectsData;

  const [filter, setFilter] = useState("all");
  const tags = ["all", ...new Set(projects.flatMap((p) => p.tags))];

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.tags.includes(filter));

  return (
    <Section id="projects" title={t.title} subtitle={t.subtitle}>
      <div className="project-filters">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            className={`filter-button
              ${filter === tag ? "is-active" : ""}`}
          >
            {tag === "all" ? t.all : tag.charAt(0).toUpperCase() + tag.slice(1)}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <article key={project.id} className="project-card">
            <div className="project-content">
              <h3>{localized[project.id].title}</h3>
              <p>{localized[project.id].description}</p>
              <div className="tag-list">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              {project.results && (
                <div className="project-result">
                  <p>{localized[project.id].results}</p>
                </div>
              )}
              <div className="project-actions">
                <Button
                  variant="primary"
                  size="sm"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.live}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.code}
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
};

export default Projects;
