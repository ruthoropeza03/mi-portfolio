function Section({ children, id, title, subtitle, className = '' }) {
  return (
    <section id={id} className={`content-section ${className}`.trim()}>
      <div className="section-heading">
        {title && <h2>{title}</h2>}
        {subtitle && <p>{subtitle}</p>}
      </div>
      {children}
    </section>
  )
}

export default Section
