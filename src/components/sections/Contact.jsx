import Button from "../common/Button";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../i18n/translations";

function Contact() {
  const { lang } = useLanguage();
  const t = translations[lang].contact;

  return (
    <section id="contact" className="contact-section">
      <div>
        <h2>{t.title}</h2>
      </div>
      <div className="contact-copy">
        <p>{t.copy}</p>
        <div className="contact-actions">
          <Button
            variant="primary"
            size="lg"
            href="https://github.com/ruthoropeza03"
            target="_blank"
            rel="noreferrer"
          >
            {t.github}
          </Button>
          <Button
            variant="primary"
            size="lg"
            href="https://wa.me/584145458943"
            target="_blank"
            rel="noreferrer"
          >
            {t.whatsapp}
          </Button>
          <Button variant="primary" size="lg" href="mailto:ruthoropeza30@gmail.com">
            {t.email}
          </Button>
          <Button variant="primary" size="lg" href="https://drive.google.com/file/d/1iBviXKS5zLzYOtP1gVOU8HVnAFO3VMBl/view?usp=sharing">
            {t.cv}
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Contact;
