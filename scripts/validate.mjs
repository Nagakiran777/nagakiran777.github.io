import { projects } from '../src/data/projects.js'
import { validateProjects } from '../src/data/validateProjects.js'
const e = validateProjects(projects)
if (e.length) { console.error('Project data problems:\n- ' + e.join('\n- ')); process.exit(1) }
console.log(`Project data OK (${projects.length} projects)`)
