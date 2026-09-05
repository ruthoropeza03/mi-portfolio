import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../i18n/translations";

function Footer() {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <footer className="site-footer">
      <span>Ruth Oropeza</span>
      <span className="footer-line" aria-hidden="true" />
      <span>
        {new Date().getFullYear()} / {t.footerPortfolio}
      </span>
    </footer>
  );
}

export default Footer;
