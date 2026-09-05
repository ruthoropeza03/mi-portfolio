import Section from "../common/Section";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../i18n/translations";

const skillNames = [
  "React",
  "Next.js",
  "Node.js",
  "JavaScript",
  "Tailwind CSS",
  "PostgreSQL",
  "NeonDB",
  "Google Drive",
  "Astro",
  "Bootstrap",
  "bcrypt",
];

const Skills = () => {
  const { lang } = useLanguage();
  const t = translations[lang].skills;

  return (
    <Section id="skills" className="skills-section" title={t.title} subtitle={t.subtitle}>
      <div className="skill-strip" aria-label={t.aria}>
        {skillNames.map((skill) => (
          <span key={skill} className="skill-chip">
            {skill}
          </span>
        ))}
      </div>
    </Section>
  );
};

export default Skills;
