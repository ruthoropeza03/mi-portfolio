import { useScrollAnimation } from '../../hooks/useScrollAnimation'

const Skills = () => {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref} id="skills" className={`content-section skills-section ${isVisible ? 'is-visible' : ''}`}>
      <div className="section-heading">
        <h2>Habilidades</h2>
        <p>Agrega aquí tus tecnologías y competencias principales.</p>
      </div>
    </section>
  )
}

export default Skills