import Button from "../common/Button";
import Section from "../common/Section";
import certifications from "../../data/certifications";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../i18n/translations";

function Certifications() {
  const { lang } = useLanguage();
  const t = translations[lang].certifications;

  return (
    <Section id="certifications" title={t.title} subtitle={t.subtitle}>
      {certifications.length > 0 ? (
        <div className="certifications-grid">
          {certifications.map((certification) => (
            <article key={certification.id} className="certification-card">
              <div className="certification-mark" aria-hidden="true">
                PDF
              </div>
              <div className="certification-content">
                <p className="certification-issuer">{certification.issuer}</p>
                <h3>{certification.title}</h3>
                <p className="certification-meta">{certification.year}</p>
                <Button
                  variant="outline"
                  size="sm"
                  href={certification.PDF}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.viewPdf}
                </Button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="certifications-empty">
          <span className="certification-mark" aria-hidden="true">
            PDF
          </span>
          <div>
            <h3>{t.emptyTitle}</h3>
            <p>{t.emptyText}</p>
          </div>
        </div>
      )}
    </Section>
  );
}

export default Certifications;
