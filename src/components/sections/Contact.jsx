import Button from "../common/Button";
import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../i18n/translations";
import { useSectionMotion } from "../../hooks/useSectionMotion";
import { getGoogleDriveDownloadUrl, getGoogleDrivePreviewUrl } from "../../utils/googleDrive";

const cvUrl = "https://docs.google.com/document/d/1bR_TP_LL2DWy61iIryyjKe8fdwHQIVME/edit?usp=sharing&ouid=106762493859465222525&rtpof=true&sd=true";

function Contact() {
  const { lang } = useLanguage();
  const t = translations[lang].contact;
  const motionRef = useSectionMotion();
  const [showCv, setShowCv] = useState(false);

  return (
    <section ref={motionRef} id="contact" className="contact-section section-motion-contact">
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
          <Button
            variant="primary"
            size="lg"
            onClick={() => setShowCv((isOpen) => !isOpen)}
            aria-expanded={showCv}
            aria-controls="cv-viewer"
          >
            {showCv ? t.cvClose : t.cv}
          </Button>
        </div>
        {showCv && (
          <div id="cv-viewer" className="cv-viewer">
            <div className="cv-viewer-heading">
              <div>
                <span className="cv-label">{t.cvLabel}</span>
                <h3>{t.cvTitle}</h3>
              </div>
              <a
                className="button button-outline button-sm"
                href={getGoogleDriveDownloadUrl(cvUrl)}
                download
              >
                {t.cvDownload}
              </a>
            </div>
            <iframe
              title={t.cvTitle}
              src={getGoogleDrivePreviewUrl(cvUrl)}
              className="cv-frame"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default Contact;
