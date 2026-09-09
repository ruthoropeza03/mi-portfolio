import { useEffect, useState } from "react";
import Button from "../common/Button";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../i18n/translations";
import heroAsset from "../../assets/hero.png";

const Hero = () => {
  const { lang } = useLanguage();
  const t = translations[lang].hero;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="hero" className={`hero-section ${isVisible ? "is-visible" : ""}`}>
      <div className="hero-grid">
        <div className="hero-copy">
          <h1>
            {t.titleTop}
            <span>{t.titleHighlight}</span>
            {t.titleBottom}
          </h1>
          <p className="hero-description">{t.description}</p>
          <div className="hero-actions">
            <Button variant="primary" size="lg" href="#projects">
              {t.explore}
            </Button>
            <Button variant="outline" size="lg" href="#contact">
              {t.talk}
            </Button>
          </div>
          <div className="hero-proof" aria-label={t.proofAria}>
            <div className="proof-item">
              <strong>3+</strong>
              <span>{t.proofDeployed}</span>
            </div>
            <div className="proof-item">
              <strong>2</strong>
              <span>{t.proofYears}</span>
            </div>
            <div className="proof-item">
              <strong>1000+</strong>
              <span>{t.proofRequests}</span>
            </div>
          </div>
        </div>

        <div className="hero-visual" aria-label={t.visualAria}>
          <div className="hero-device">
            <img src={heroAsset} alt="" />
          </div>
          <div className="signal-board">
            <div className="board-topline">
              <span>{t.kicker}</span>
              <span>{t.systemsOnline}</span>
            </div>
            <div className="board-stack">
              <div className="board-row">
                <div>
                  <strong>{t.boardProj1}</strong>
                  <span>{t.boardProj1Stack}</span>
                </div>
                <span className="board-value">{t.boardValue1}</span>
              </div>
              <div className="board-row">
                <div>
                  <strong>{t.boardProj2}</strong>
                  <span>{t.boardProj2Stack}</span>
                </div>
                <span className="board-value">{t.boardValue2}</span>
              </div>
              <div className="board-row">
                <div>
                  <strong>{t.boardProj3}</strong>
                  <span>{t.boardProj3Stack}</span>
                </div>
                <span className="board-value">{t.boardValue3}</span>
              </div>
            </div>
            <div className="board-foot">{t.boardFoot}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
