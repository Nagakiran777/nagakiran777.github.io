// Original SVG/CSS illustrations. They are illustrations, NOT real model output or screenshots.
const bars = n => Array.from({ length: n }, (_, i) => 8 + Math.abs(Math.sin(i * 0.7) * 28 + Math.cos(i * 1.9) * 14))
function Wave() {
  return (<svg viewBox="0 0 400 200" role="img" aria-label="Illustration of layered speaker audio tracks">
    {[0, 1, 2].map(r => <g key={r} className={`track t${r}`}>{bars(46).map((h, i) => <rect key={i} x={10 + i * 8.5} y={36 + r * 55 - h / (r + 1.4) / 2} width="4" height={h / (r + 1.4)} rx="2" style={{ animationDelay: `${i * 40 + r * 200}ms` }} />)}</g>)}
    <text x="10" y="14" className="svgt">SPEAKER A · SPEAKER B · MUSIC</text></svg>)
}
function Xray({ regions = [] }) {
  return (<div className="xray" role="img" aria-label="Illustration of an X-ray style scan with seven anatomical regions listed">
    <svg viewBox="0 0 200 200"><g stroke="#cfe9ff" strokeWidth="5" strokeLinecap="round" fill="none" opacity=".75"><path d="M100 20v70M100 90l-22 34M100 90l22 34M72 130l-8 40M128 130l8 40M70 52h60" /></g><rect className="scan" x="0" y="0" width="200" height="6" /></svg>
    <ul className="chips">{regions.map(r => <li key={r}>{r}</li>)}</ul></div>)
}
function Graph({ steps = [] }) {
  return (<ol className="graph" aria-label="Workflow stages">{steps.map((s, i) => <li key={s} style={{ '--i': i }}><span className="mono">{String(i + 1).padStart(2, '0')}</span>{s}</li>)}</ol>)
}
function Leaf() { return <svg viewBox="0 0 120 80" role="img" aria-label="Leaf illustration"><path d="M20 60C30 10 90 5 100 20 95 60 55 75 20 60Z" fill="none" stroke="#22d3ee" strokeWidth="2"/><path d="M20 60L85 28M50 45l8-22M62 40l18 8" stroke="#a78bfa" fill="none"/></svg> }
function Lane() { return <svg viewBox="0 0 120 80" role="img" aria-label="Road lane lines illustration"><path d="M10 78L52 4M110 78L68 4" stroke="#22d3ee" strokeWidth="2.5" fill="none"/><path d="M60 78v-10M60 58v-10M60 38v-8" stroke="#fff" strokeWidth="2" fill="none"/></svg> }
function Thr() { return <svg viewBox="0 0 120 80" role="img" aria-label="Temperature threshold illustration"><path d="M5 60L25 40 40 55 60 15 80 30 95 12 115 50" stroke="#22d3ee" fill="none" strokeWidth="2"/><path d="M5 28H115" stroke="#f59e0b" strokeDasharray="4 3"/></svg> }
function Chat() { return <svg viewBox="0 0 120 80" role="img" aria-label="Chat bubbles illustration"><rect x="8" y="8" width="70" height="26" rx="10" fill="none" stroke="#22d3ee" strokeWidth="2"/><rect x="42" y="44" width="70" height="26" rx="10" fill="none" stroke="#a78bfa" strokeWidth="2"/></svg> }
function Store() { return <svg viewBox="0 0 120 80" role="img" aria-label="Product grid illustration"><g fill="none" strokeWidth="2"><rect x="10" y="10" width="45" height="28" rx="6" stroke="#22d3ee"/><rect x="65" y="10" width="45" height="28" rx="6" stroke="#a78bfa"/><rect x="10" y="46" width="45" height="24" rx="6" stroke="#a78bfa"/><rect x="65" y="46" width="45" height="24" rx="6" stroke="#22d3ee"/></g></svg> }
function Dflt() { return <svg viewBox="0 0 120 80" role="img" aria-label="Abstract node illustration"><g stroke="#7c8cff" fill="none"><path d="M20 55L50 20 85 50 100 18M50 20L85 50"/></g><g fill="#22d3ee"><circle cx="20" cy="55" r="4"/><circle cx="50" cy="20" r="4"/><circle cx="85" cy="50" r="4"/><circle cx="100" cy="18" r="4"/></g></svg> }
export default function Visual({ project: p }) {
  if (p.coverImage) return <img className="cover" src={p.coverImage} alt={`${p.title} cover`} loading="lazy" />
  switch (p.visualType) {
    case 'audio-waveform': return <Wave />
    case 'xray-scan': return <Xray regions={p.regions} />
    case 'workflow-graph': return <Graph steps={p.pipeline} />
    case 'leaf': return <Leaf />
    case 'lane': return <Lane />
    case 'threshold': return <Thr />
    case 'chat': return <Chat />
    case 'store': return <Store />
    default: return <Dflt />
  }
}
