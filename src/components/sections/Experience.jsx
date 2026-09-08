import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../i18n/translations";
import { useReveal } from "../../hooks/useReveal";

function Experience() {
  const { lang } = useLanguage();
  const t = translations[lang].experience;
  const revealRef = useReveal();

  return (
    <section ref={revealRef} id="experience" className="content-section quiet-section reveal">
      <div className="section-heading">
        <h2>{t.title}</h2>
        <p>{t.subtitle}</p>
      </div>
      {t.lines.map((line) => (
        <div key={line.label} className="experience-line">
          <strong>{line.label}</strong>
          <p>{line.text}</p>
        </div>
      ))}
    </section>
  );
}

export default Experience;
