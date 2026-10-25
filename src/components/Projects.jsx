import { useMemo, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { projects } from '../data/projects.js'
import Visual from './Visuals.jsx'

const reveal = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-80px' }, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
const Repo = ({ p }) => p.github ? <a className="btn primary" href={p.github} target="_blank" rel="noopener noreferrer">View code on GitHub <span aria-hidden>↗</span></a> : null

function Tilt({ children, className }) {
  const r = useRef(null)
  const move = e => { if (matchMedia('(prefers-reduced-motion: reduce)').matches || e.pointerType === 'touch') return
    const b = r.current.getBoundingClientRect(), x = (e.clientX - b.left) / b.width - .5, y = (e.clientY - b.top) / b.height - .5
    r.current.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)` }
  return <div ref={r} className={className} onPointerMove={move} onPointerLeave={() => { r.current.style.transform = '' }}>{children}</div>
}
const Extra = ({ p }) => p.links?.map(l => <a key={l.url} className="link" href={l.url} target="_blank" rel="noopener noreferrer">{l.label} ↗</a>)

function FeaturedProject({ p, n }) {
  const [open, setOpen] = useState(false), d = p.details || {}
  const rows = [['Problem', d.problem], ['Approach', d.approach], ['Implementation', d.implementation], ['Limitations', d.limitations], ['Results', d.results]].filter(r => r[1])
  return (<motion.article className={`feat v-${p.visualType} ${n % 2 ? 'flip' : ''}`} {...reveal}>
    <div className="feat-text">
      <p className="mono">{String(n + 1).padStart(2, '0')} · {p.category}</p>
      <h3>{p.title}</h3>{p.headline && <p className="headline">{p.headline}</p>}
      <p>{p.description}</p>
      <ul className="tags">{(p.technologies || []).map(t => <li key={t}>{t}</li>)}</ul>
      {p.status && <p className="status">Status: {p.status}</p>}
      <div className="row"><Repo p={p} />
        {p.liveDemo && <a className="btn" href={p.liveDemo} target="_blank" rel="noopener noreferrer">Live demo</a>}
        {rows.length > 0 && <button className="btn" aria-expanded={open} aria-controls={`d-${p.id}`} onClick={() => setOpen(!open)}>{open ? 'Hide' : 'Read'} technical details</button>}</div>
      {rows.length > 0 && <motion.dl id={`d-${p.id}`} className="details" initial={false} animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }} style={{ overflow: 'hidden' }} aria-hidden={!open}>
        {rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</motion.dl>}
    </div>
    <Tilt className="feat-visual"><Visual project={p} />
      {p.pipeline && p.visualType !== 'workflow-graph' && <ol className="pipe">{p.pipeline.map(s => <li key={s}>{s}</li>)}</ol>}
      <p className="note">Original illustration, not a project screenshot or model output.</p></Tilt>
  </motion.article>)
}

export function Featured() {
  const list = useMemo(() => projects.filter(p => p.section === 'featured').sort((a, b) => a.featuredOrder - b.featuredOrder), [])
  return (<section id="projects" className="wrap section"><h2 className="h2">Featured projects</h2>{list.map((p, i) => <FeaturedProject key={p.id} p={p} n={i} />)}</section>)
}

export function Gallery() {
  const list = useMemo(() => projects.filter(p => p.section === 'gallery'), [])
  const cats = useMemo(() => ['All', ...new Set(list.map(p => p.category))], [list])
  const [cat, setCat] = useState('All')
  const shown = list.filter(p => cat === 'All' || p.category === cat)
  if (!list.length) return null
  return (<section id="gallery" className="wrap section"><h2 className="h2">More projects</h2>
    <div className="filters" role="group" aria-label="Filter projects">{cats.map(c => <button key={c} className={c === cat ? 'on' : ''} aria-pressed={c === cat} onClick={() => setCat(c)}>{c}</button>)}</div>
    <div className="grid">{shown.map((p, i) => <motion.article layout key={p.id} className={`card ${i % 5 === 0 ? 'wide' : ''}`} {...reveal}>
      <div className="card-v"><Visual project={p} /></div><p className="mono">{p.category}</p><h3>{p.title}</h3><p>{p.description}</p>
      {p.technologies?.length > 0 && <ul className="tags">{p.technologies.map(t => <li key={t}>{t}</li>)}</ul>}
      {p.highlights && <ul className="hl">{p.highlights.map(h => <li key={h}>{h}</li>)}</ul>}{p.limitations && <p className="limit"><strong>Limits:</strong> {p.limitations}</p>}{p.status && <p className="status">Status: {p.status}</p>}<Extra p={p} />{p.github && <a className="link" href={p.github} target="_blank" rel="noopener noreferrer">Repository ↗</a>}</motion.article>)}</div></section>)
}

export function Repos() {
  const list = projects.filter(p => p.github)
  return (<section id="repos" className="wrap section"><h2 className="h2">All repositories</h2>
    <p className="muted">Every public repository on my GitHub profile, with a short note on what it holds.</p>
    <ul className="repo-list">{list.map(p => <li key={p.id}><a href={p.github} target="_blank" rel="noopener noreferrer"><strong>{p.title}</strong> ↗</a><span>{p.section === 'archive' ? 'Course fork' : p.category}</span></li>)}
      {list.flatMap(p => p.links || []).map(l => <li key={l.url}><a href={l.url} target="_blank" rel="noopener noreferrer"><strong>{l.label}</strong> ↗</a><span>Digital Bheem</span></li>)}</ul></section>)
}
