import { useState, useEffect } from 'react'
import Button from '../common/Button'

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="hero" className={`hero-section ${isVisible ? 'is-visible' : ''}`}>
      <div className="hero-grid">
        {/* Columna izquierda - Texto */}
        <div className="hero-copy">
          <span className="availability">
            <span className="status-dot" aria-hidden="true" />
            Disponible para trabajar
          </span>
          <h1>
            Transformo sitios lentos en{' '}
            <span>plataformas que convierten</span>
          </h1>
          <p className="hero-description">
            Ingeniera de Sistemas con experiencia en React, Node.js y bases de datos. 
            He ayudado a empresas a optimizar su presencia digital.
          </p>
          <div className="hero-actions">
            <Button variant="primary" size="lg">
              Ver proyectos ↓
            </Button>
            <Button variant="outline" size="lg">
              Contactar
            </Button>
          </div>
          {/* Métricas rápidas */}
          <div className="hero-metrics">
            <div>
              <span className="block text-2xl font-bold text-primary">3+</span>
              <span className="text-sm text-gray-500">Proyectos desplegados</span>
            </div>
            <div>
              <span className="block text-2xl font-bold text-primary">2</span>
              <span className="text-sm text-gray-500">Años de experiencia</span>
            </div>
          </div>
        </div>
        
        {/* Columna derecha - Foto/Ilustración */}
        <div className="hero-visual">
          <div className="portrait-frame">
            <div className="portrait-glow" />
            <img 
              src="/images/profile/photo.jpg" 
              alt="Ruth Oropeza" 
              loading="lazy"
              width="800"
              height="450"
              className="portrait-image"
              onError={(event) => {
                event.currentTarget.style.display = 'none'
              }}
            />
            <span className="portrait-initials" aria-hidden="true">RO</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero