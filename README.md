# K Nagakiran – Portfolio

React + Vite + Three.js + Motion. All content lives in `src/data/`, so you rarely touch components.

## Run it
```
npm install
npm run dev      # local preview
npm run build    # validates project data, then builds to dist/
```
Open the address that `npm run dev` prints. Node 20.19+ or 22+ is required (Vite 8).

## 1. Add a project
Open `src/data/projects.js` and copy an existing entry to the end of the list. Required: `id` (unique), `title`, `description`, `category`, `section`. Everything else is optional. Save, and the project appears. `npm run validate` checks for mistakes (duplicate ids, bad URLs, wrong visual names).

## 2. Add a cover image
Put the image in `public/projects/`, then set `coverImage: 'projects/my-image.png'` (no leading slash). Without it, the built-in visual is used.

## 3. Built-in visuals
Set `visualType` to one of: `audio-waveform`, `xray-scan`, `workflow-graph`, `leaf`, `lane`, `default`. `xray-scan` uses the `regions` list, `workflow-graph` uses `pipeline`. These are illustrations, not real outputs.

## 4-6. Featured vs gallery, ordering
- Gallery to featured: change `section: 'gallery'` to `section: 'featured'` and add a unique number `featuredOrder: 4`.
- Featured to gallery: change `section` back to `'gallery'`.
- Reorder featured projects: change their `featuredOrder` numbers (lowest first).
A project never appears in both places.

## 7. Skills
Edit `src/data/skills.js`. Each skill can list `projects` (ids) where it is really used; leave it empty if there is no evidence.

## 8. Contact details
Edit `src/data/siteConfig.js`. Set `showPhone: false` to hide the phone number.

## 9. Resume
Copy your PDF to `public/resume.pdf` (replace it later the same way), then set `resumeAvailable: true` in `siteConfig.js`. Until then no download button is shown.

## 10. Deploy to GitHub Pages
1. For the URL `https://nagakiran777.github.io/`, create a repository named exactly `Nagakiran777.github.io`.
2. In this folder run `git init`, `git add .`, `git commit -m "Portfolio"`, `git branch -M main`.
3. Check the remote: `git remote -v`. Add it if missing: `git remote add origin https://github.com/Nagakiran777/Nagakiran777.github.io.git`
4. `git push -u origin main`
5. On GitHub: Settings > Pages > Source: **GitHub Actions**.
6. Open the Actions tab and wait for "Deploy to GitHub Pages" to turn green, then open the site.
7. To update later: edit, then `git add .`, `git commit -m "Update"`, `git push`.
`vite.config.js` uses `base: '/'` for the personal site URL `https://Nagakiran777.github.io/`. If you instead publish under a repository path such as `https://Nagakiran777.github.io/repo-name/`, change the base to `'/repo-name/'`.

## Extra fields
`highlights` (list of bullets), `limitations`, `links` (`[{label, url}]`), and `section: 'archive'` (shown only in the All repositories list, e.g. forks).

## Notes
- Gallery entries were written from reading each repository's code. The Punjabi transliteration tool has no repository on the profile, so it is not listed; add an entry when its repo exists.
- No metrics are shown for the MURA project. The notebooks contain validation numbers; add them to `details.results` once you are sure which run they belong to.
