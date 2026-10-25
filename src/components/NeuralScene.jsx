import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Faceted core + bounded node cloud with proximity edges. Pauses when off-screen or tab hidden.
export default function NeuralScene({ reduced }) {
  const host = useRef(null)
  useEffect(() => {
    const el = host.current
    let renderer
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' }) } catch { el.dataset.failed = '1'; return }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); el.appendChild(renderer.domElement)
    const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(45, 1, 0.1, 100); cam.position.z = 9
    const group = new THREE.Group(); scene.add(group)
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.6, 1), new THREE.MeshBasicMaterial({ color: 0x22d3ee, wireframe: true, transparent: true, opacity: 0.55 }))
    const inner = new THREE.Mesh(new THREE.OctahedronGeometry(0.9, 0), new THREE.MeshBasicMaterial({ color: 0xa78bfa, wireframe: true, transparent: true, opacity: 0.8 }))
    group.add(core, inner)
    const N = 90, pts = [], pos = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) { const r = 2.6 + Math.random() * 2.6, t = Math.random() * 6.283, p = Math.acos(2 * Math.random() - 1)
      const v = new THREE.Vector3(r * Math.sin(p) * Math.cos(t), r * Math.sin(p) * Math.sin(t) * 0.7, r * Math.cos(p)); pts.push(v); v.toArray(pos, i * 3) }
    const nodes = new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(pos, 3)), new THREE.PointsMaterial({ color: 0xffffff, size: 0.07, transparent: true, opacity: 0.9 }))
    const seg = []; for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) if (pts[i].distanceTo(pts[j]) < 1.7) seg.push(pts[i], pts[j])
    const edges = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(seg), new THREE.LineBasicMaterial({ color: 0x7c8cff, transparent: true, opacity: 0.22 }))
    group.add(nodes, edges)
    const ring = new THREE.Mesh(new THREE.TorusGeometry(3.4, 0.01, 8, 120), new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.5 })); ring.rotation.x = 1.2; group.add(ring)
    let mx = 0, my = 0, sy = 0, visible = true, raf = 0, last = 0
    const size = () => { const w = el.clientWidth, h = el.clientHeight; renderer.setSize(w, h); cam.aspect = w / h; cam.updateProjectionMatrix(); cam.position.z = w < 700 ? 12 : 9 }
    size(); const ro = new ResizeObserver(size); ro.observe(el)
    const move = e => { mx = (e.clientX / innerWidth - 0.5); my = (e.clientY / innerHeight - 0.5) }
    const scroll = () => { sy = Math.min(scrollY / innerHeight, 1) }
    addEventListener('pointermove', move, { passive: true }); addEventListener('scroll', scroll, { passive: true })
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) loop() }); io.observe(el)
    const draw = t => { core.rotation.y = t * 0.00012; core.rotation.x = t * 0.00007; inner.rotation.y = -t * 0.0002; ring.rotation.z = t * 0.00015
      group.rotation.y += ((mx * 0.8 + t * 0.00004) - group.rotation.y) * 0.05; group.rotation.x += ((my * 0.5 + sy * 0.6) - group.rotation.x) * 0.05
      group.position.y = sy * 1.5; group.scale.setScalar(1 - sy * 0.25); renderer.render(scene, cam) }
    function loop(t = 0) { cancelAnimationFrame(raf); if (!visible || document.hidden) return; raf = requestAnimationFrame(loop)
      if (t - last > 33) { last = t; draw(t) } } // ~30fps cap
    if (reduced) draw(8000); else loop()
    const vis = () => { if (!document.hidden && !reduced) loop() }; document.addEventListener('visibilitychange', vis)
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); removeEventListener('pointermove', move); removeEventListener('scroll', scroll); document.removeEventListener('visibilitychange', vis)
      scene.traverse(o => { o.geometry?.dispose(); o.material?.dispose() }); renderer.dispose(); renderer.domElement.remove() }
  }, [reduced])
  return <div ref={host} className="scene" aria-hidden="true" />
}
