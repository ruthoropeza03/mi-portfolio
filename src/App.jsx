import Layout from './components/layout/Layout'
import Hero from './components/sections/Hero'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Contact from './components/sections/Contact'
import { Suspense } from 'react'

function App() {
  return (
    <Layout>
      <Suspense fallback={<div>Cargando...</div>}>
      <Hero />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      </Suspense>
    </Layout>
  )
}

export default App