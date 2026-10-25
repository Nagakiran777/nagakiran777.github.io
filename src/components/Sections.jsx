import { useEffect, useState } from 'react'
import { motion, useScroll } from 'motion/react'
import cfg from '../data/siteConfig.js'
import skills from '../data/skills.js'
import experience from '../data/experience.js'
import { projects } from '../data/projects.js'

const reveal = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' }, transition: { duration: 0.6 } }
const links = [['about', 'About'], ['projects', 'Projects'], ['skills', 'Skills'], ['experience', 'Experience'], ['repos', 'Repos'], ['contact', 'Contact']]

export function Navbar() {
  const [active, setActive] = useState(''), [open, setOpen] = useState(false), { scrollYProgress } = useScroll()
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    links.forEach(([id]) => { const el = document.getElementById(id); el && io.observe(el) }); return () => io.disconnect()
  }, [])
  return (<header className="nav"><motion.div className="progress" style={{ scaleX: scrollYProgress }} />
    <div className="wrap nav-in"><a href="#top" className="logo" aria-label="K Nagakiran, back to top">KN</a>
      <button className="burger" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button>
      <nav id="menu" aria-label="Primary" className={open ? 'open' : ''}>{links.map(([id, l]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'true' : undefined} onClick={() => setOpen(false)}>{l}</a>)}</nav></div></header>)
}

export function About() {
  return (<section id="about" className="wrap section about"><motion.div {...reveal}><h2 className="h2">About</h2>
    <p className="big">{cfg.education.degree} at {cfg.education.school}. I like projects where a model or pipeline has to work end to end: data in, something useful out.</p>
    <p>My featured work covers speech AI (dubbing), medical-image classification, and workflow automation. Each project below links to its source code so you can judge it directly.</p></motion.div></section>)
}

export function Skills() {
  const [sel, setSel] = useState(null), titleOf = id => projects.find(p => p.id === id)?.title
  return (<section id="skills" className="wrap section"><h2 className="h2">Technical expertise</h2>
    <p className="muted">Grouped by area, not rated. Select a skill to see where it appears in my code.</p>
    <div className="skill-groups">{skills.map(g => <motion.div key={g.group} className="sg" {...reveal}><h3>{g.group}</h3><p className="muted">{g.blurb}</p>
      <ul>{g.items.map(s => <li key={s.name}><button aria-pressed={sel === s.name} onClick={() => setSel(sel === s.name ? null : s.name)}>{s.name}</button>
        {sel === s.name && <p className="why">{s.projects.length ? <>Used in: {s.projects.map(titleOf).filter(Boolean).join(', ')}</> : 'Used in coursework or internship work; no portfolio project linked yet.'}</p>}</li>)}</ul></motion.div>)}</div></section>)
}

export function Experience() {
  return (<section id="experience" className="wrap section"><h2 className="h2">Education and experience</h2>
    <ol className="timeline"><li><p className="mono">Education</p><h3>{cfg.education.degree}</h3><p>{cfg.education.school}</p></li>
      {experience.map(e => <motion.li key={e.role} {...reveal}><p className="mono">{e.dates}</p><h3>{e.role}</h3><p className="org">{e.org}</p><p>{e.note}</p></motion.li>)}</ol></section>)
}

export function Contact() {
  return (<section id="contact" className="wrap section contact"><h2 className="h2">Let's talk</h2>
    <p className="big">Looking for AI engineering opportunities? The fastest way to reach me is email.</p>
    <ul className="contact-list">
      <li><a href={`mailto:${cfg.email}`}>{cfg.email}</a></li>
      {cfg.showPhone && <li><a href={`tel:${cfg.phone.replace(/\s/g, '')}`}>{cfg.phone}</a></li>}
      <li><a href={cfg.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
      <li><a href={cfg.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
      <li>{cfg.location}</li></ul>
    {cfg.resumeAvailable && <a className="btn primary" href={cfg.resumePath} download>Download resume (PDF)</a>}</section>)
}

export function Footer() { return <footer className="wrap foot"><p>© {new Date().getFullYear()} {cfg.name}. Built with React, Three.js and Motion.</p></footer> }
