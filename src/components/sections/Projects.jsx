import { useState } from "react";
import { projects } from "../../data/projects";
import Button from "../common/Button";
import Section from "../common/Section";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../i18n/translations";
import { getGoogleDriveImageUrls } from "../../utils/googleDrive";

const ProjectVisual = ({ project, title, placeholderLabel, placeholderAction }) => {
  const imageUrls = getGoogleDriveImageUrls(project.image);
  const isPlaceholder = project.image?.startsWith("YOUR_");
  const [imageAttempt, setImageAttempt] = useState(0);
  const imageUrl = imageUrls[imageAttempt];
  const imageFailed = imageAttempt >= imageUrls.length;
  const hasImage = !isPlaceholder && Boolean(imageUrl) && !imageFailed;

  return (
    <div className={`project-visual project-visual-${project.id}`} aria-label={title}>
      {hasImage ? (
        <img
          className="project-image"
          src={imageUrl}
          alt={title}
          onError={() => setImageAttempt((attempt) => attempt + 1)}
        />
      ) : (
        <div className="project-placeholder" aria-hidden="true">
          <span>{placeholderLabel}</span>
          <strong>{placeholderAction}</strong>
        </div>
      )}
      {!hasImage && (
        <>
          <div className="project-window" aria-hidden="true">
            <span className="window-dots">
              <i />
              <i />
              <i />
            </span>
            <span className="window-line line-long" />
            <span className="window-line line-short" />
            <span className="window-grid">
              <i />
              <i />
              <i />
              <i />
            </span>
          </div>
          <span className="visual-orb" aria-hidden="true" />
        </>
      )}
    </div>
  );
};

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
            <ProjectVisual
              project={project}
              title={localized[project.id].title}
              placeholderLabel={t.imagePlaceholder}
              placeholderAction={t.imagePlaceholderAction}
            />
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
