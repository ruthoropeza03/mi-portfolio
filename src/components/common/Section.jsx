import { useReveal } from "../../hooks/useReveal";

function Section({ children, id, title, subtitle, className = "" }) {
  const revealRef = useReveal();

  return (
    <section ref={revealRef} id={id} className={`content-section reveal ${className}`.trim()}>
      <div className="section-heading">
        {title && <h2>{title}</h2>}
        {subtitle && <p>{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

export default Section;
