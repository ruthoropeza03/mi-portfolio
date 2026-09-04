function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Ir al inicio">
        <span className="brand-mark">R</span>
        Mi Portafolio
      </a>
      <nav className="site-nav" aria-label="Navegación principal">
        <a href="#projects">Proyectos</a>
        <a href="#contact">Contacto</a>
      </nav>
    </header>
  )
}

export default Header
