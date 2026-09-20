import { useSectionMotion } from "../../hooks/useSectionMotion";

function Section({ children, id, title, subtitle, className = "" }) {
  const motionRef = useSectionMotion();

  return (
    <section
      ref={motionRef}
      id={id}
      className={`content-section section-motion-${id} ${className}`.trim()}
    >
      <div className="section-heading">
        {title && <h2>{title}</h2>}
        {subtitle && <p>{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

export default Section;
