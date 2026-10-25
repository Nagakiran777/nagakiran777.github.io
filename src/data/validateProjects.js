const VISUALS = ['audio-waveform','xray-scan','workflow-graph','leaf','lane','threshold','chat','store','default']
export function validateProjects(list) {
  const errors = [], ids = new Set(), orders = new Set()
  list.forEach((p, i) => {
    const n = `projects[${i}] (${p.id || '?'})`
    for (const k of ['id','title','description','category','section']) if (!p[k]) errors.push(`${n}: missing "${k}"`)
    if (ids.has(p.id)) errors.push(`${n}: duplicate id`); ids.add(p.id)
    if (!['featured','gallery','archive'].includes(p.section)) errors.push(`${n}: section must be "featured", "gallery" or "archive"`)
    if (p.visualType && !VISUALS.includes(p.visualType)) errors.push(`${n}: unknown visualType "${p.visualType}"`)
    for (const k of ['github','liveDemo']) if (p[k]) { try { new URL(p[k]) } catch { errors.push(`${n}: ${k} is not a valid URL`) } }
    if (p.section === 'featured') {
      if (!Number.isFinite(p.featuredOrder)) errors.push(`${n}: featured needs numeric featuredOrder`)
      else if (orders.has(p.featuredOrder)) errors.push(`${n}: duplicate featuredOrder ${p.featuredOrder}`)
      orders.add(p.featuredOrder)
    }
  })
  return errors
}
