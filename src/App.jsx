import { LanguageProvider } from "./context/LanguageContext";
import Layout from "./components/layout/Layout";
import Hero from "./components/sections/Hero";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Experience from "./components/sections/Experience";
import Certifications from "./components/sections/Certifications";
import Contact from "./components/sections/Contact";

function App() {
  return (
    <LanguageProvider>
      <Layout>
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </Layout>
    </LanguageProvider>
  );
}

export default App;
