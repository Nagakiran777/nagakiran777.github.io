import { useEffect } from 'react'
import { projects } from './data/projects.js'
import { validateProjects } from './data/validateProjects.js'
import Hero from './components/Hero.jsx'
import { Featured, Gallery, Repos } from './components/Projects.jsx'
import { Navbar, About, Skills, Experience, Contact, Footer } from './components/Sections.jsx'

export default function App() {
  useEffect(() => { validateProjects(projects).forEach(e => console.warn('[projects.js]', e)) }, [])
  return (<>
    <a className="skip" href="#main">Skip to content</a>
    <Navbar />
    <main id="main"><Hero /><About /><Featured /><Gallery /><Repos /><Skills /><Experience /><Contact /></main>
    <Footer />
  </>)
}
