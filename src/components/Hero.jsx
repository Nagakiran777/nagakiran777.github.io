import { lazy, Suspense } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import cfg from '../data/siteConfig.js'
const NeuralScene = lazy(() => import('./NeuralScene.jsx'))
const ease = [0.22, 1, 0.36, 1]
export default function Hero() {
  const reduced = useReducedMotion()
  const line = (cls, text, i) => <span className="mask"><motion.span className={cls} initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease }}>{text}</motion.span></span>
  return (<section className="hero" id="top">
    <div className="hero-fallback" aria-hidden="true" />
    <Suspense fallback={null}><NeuralScene reduced={!!reduced} /></Suspense>
    <div className="wrap hero-copy">
      <p className="mono tag">{cfg.name} · Bengaluru</p>
      <h1>{line('solid', 'I BUILD', 0)}{line('outline', 'INTELLIGENT', 1)}{line('grad', 'SYSTEMS.', 2)}</h1>
      <p className="lede">{cfg.intro}</p>
      <div className="row"><a className="btn primary" href="#projects">Explore My Work</a><a className="btn" href="#contact">Get in touch</a></div>
      <p className="mono avail">B.Tech AI graduate · open to AI engineering opportunities</p>
    </div>
  </section>)
}
