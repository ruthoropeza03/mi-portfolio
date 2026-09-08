import { useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../i18n/translations";

function Header() {
  const { lang, setLang } = useLanguage();
  const t = translations[lang];

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      document.documentElement.style.setProperty("--scroll-progress", progress);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <header className="site-header">
      <div className="scroll-progress" aria-hidden="true" />
      <div className="site-header-inner">
        <a className="brand" href="#hero" aria-label={t.brandAria}>
          <span className="brand-mark">R</span>
          {t.brand}
        </a>
        <div className="header-right">
          <nav className="site-nav" aria-label={t.navAria}>
            <a href="#skills">{t.nav.skills}</a>
            <a href="#projects">{t.nav.projects}</a>
            <a href="#experience">{t.nav.experience}</a>
            <a href="#certifications">{t.nav.certifications}</a>
            <a href="#contact">{t.nav.contact}</a>
          </nav>
          <div className="lang-switcher" role="group" aria-label="Language / Idioma">
            <button
              type="button"
              onClick={() => setLang("es")}
              className={lang === "es" ? "is-active" : ""}
              aria-pressed={lang === "es"}
            >
              ES
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={lang === "en" ? "is-active" : ""}
              aria-pressed={lang === "en"}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
