import Section from "../common/Section";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../i18n/translations";

const skillNames = [
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "nextdotjs" },
  { name: "Node.js", icon: "nodedotjs" },
  { name: "JavaScript", icon: "javascript" },
  { name: "Tailwind CSS", icon: "tailwindcss" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "NeonDB", icon: "neon" },
  { name: "Google Drive", icon: "googledrive" },
  { name: "Astro", icon: "astro" },
  { name: "Bootstrap", icon: "bootstrap" },
  { name: "bcrypt", icon: "bcrypt" },
];

const Skills = () => {
  const { lang } = useLanguage();
  const t = translations[lang].skills;

  return (
    <Section id="skills" className="skills-section" title={t.title} subtitle={t.subtitle}>
      <div className="skill-strip" aria-label={t.aria}>
        {skillNames.map((skill) => (
          <span key={skill.name} className="skill-chip">
            <img
              className="skill-icon"
              src={`https://cdn.simpleicons.org/${skill.icon}`}
              alt=""
              aria-hidden="true"
            />
            <span>{skill.name}</span>
          </span>
        ))}
      </div>
    </Section>
  );
};

export default Skills;
