# Prashanth Shetteppanavar | Portfolio

Personal portfolio for Prashanth Shetteppanavar, a Java Full Stack Developer based in Bengaluru. The site presents backend-focused projects, experience, education, skills, public engineering profiles, and a downloadable resume.

## Stack

- React 19 and Vite
- Tailwind CSS
- Framer Motion, GSAP, and React Three Fiber for progressive visual enhancement
- Static assets with no runtime secrets or private API dependencies

## Local development

```bash
npm install
npm run dev
```

## Production checks

```bash
npm run lint
npm run build
npm run preview
```

The production output is written to `dist/`. The app is a static Vite SPA and can be deployed to Vercel with the default Vite settings: build command `npm run build`, output directory `dist`.

Source repository: https://github.com/prashanth-shetteppanavar/prashanth-portfolio

## Public site infrastructure

- `public/robots.txt` allows normal crawling and points to the sitemap.
- `public/sitemap.xml` lists the homepage and project case-study routes.
- `public/site.webmanifest` contains install metadata and theme color.
- `index.html` contains canonical, Open Graph, Twitter, and Person/ProfilePage/WebSite JSON-LD metadata.
- `public/Prashanth_Shetteppanavar_Resume.pdf` is the source resume asset.

## Case studies

Verified project pages are available at:

- `/projects/medislot`
- `/projects/decentralized-file-storage`
- `/projects/local-ai-chat`
- `/projects/vvisa-journey`

Project-specific repository and demo URLs are intentionally omitted until verified.
