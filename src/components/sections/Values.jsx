import Section from "../common/Section";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../i18n/translations";

function Values() {
  const { lang } = useLanguage();
  const t = translations[lang].values;

  return (
    <Section id="values" className="values-section" title={t.title} subtitle={t.subtitle}>
      <div className="values-grid">
        {t.items.map((item) => (
          <article key={item.title} className="value-item">
            <span className="value-index" aria-hidden="true">
              {item.index}
            </span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

export default Values;
