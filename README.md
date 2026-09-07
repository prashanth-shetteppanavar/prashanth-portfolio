# Prashanth Shetteppanavar — Portfolio

A 3D, animation-driven developer portfolio built with React, Vite, Three.js
(react-three-fiber), GSAP, and Framer Motion.

## Run it locally

```bash
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
```

Output goes to `dist/`. Preview the production build locally with:

```bash
npm run preview
```

## Deploy it (get a live link)

The easiest options, both free for a personal site:

### Vercel (recommended)
1. Push this folder to a GitHub repo.
2. Go to vercel.com -> "Add New Project" -> import the repo.
3. Framework preset: Vite. Leave build settings as default (`npm run build`, output `dist`).
4. Deploy. You'll get a live `https://your-project.vercel.app` URL, with a
   custom domain option if you want something like `prashanth.dev` later.

### Netlify
1. Push this folder to a GitHub repo.
2. Go to netlify.com -> "Add new site" -> "Import an existing project".
3. Build command: `npm run build`. Publish directory: `dist`.
4. Deploy.

Either way, every time you push a change to GitHub, the live site updates
automatically — no manual redeploy needed.

## Adding real project screenshots

Right now project cards show an animated placeholder. To swap in real media:

1. Drop a screenshot or short clip into `src/assets/projects/`.
2. Open `src/components/Projects.jsx`.
3. Import it at the top: `import mediSlotImg from "../assets/projects/medislot.png";`
4. Add `image: mediSlotImg` to that project's entry in the `PROJECTS` array.

## Project structure

```
src/
  components/     — one file per section (Hero, About, Skills, Projects, etc.)
  assets/         — photos, certificates, project media
public/
  Prashanth_Shetteppanavar_Resume.pdf  — downloadable resume
```
