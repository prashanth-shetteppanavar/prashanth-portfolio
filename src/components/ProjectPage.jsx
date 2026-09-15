import { useEffect } from "react";
import { PROJECTS, getProject } from "../data/projects";

export default function ProjectPage({ slug }) {
  const project = getProject(slug);

  useEffect(() => {
    if (!project) return;
    document.title = `${project.title} | Prashanth Shetteppanavar`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", `${project.title}: ${project.desc}`);
    const pageTitle = `${project.title} | Prashanth Shetteppanavar`;
    const pageUrl = `https://prashanth-portfolio-plum.vercel.app/projects/${project.slug}`;
    const metadata = {
      'meta[property="og:title"]': pageTitle,
      'meta[property="og:description"]': project.desc,
      'meta[property="og:url"]': pageUrl,
      'meta[name="twitter:title"]': pageTitle,
      'meta[name="twitter:description"]': project.desc,
    };
    const previousMetadata = Object.entries(metadata).map(([selector, value]) => {
      const element = document.querySelector(selector);
      const previous = element?.getAttribute("content");
      element?.setAttribute("content", value);
      return [element, previous];
    });
    const canonical = document.querySelector('link[rel="canonical"]');
    const previousCanonical = canonical?.getAttribute("href");
    if (canonical) canonical.setAttribute("href", pageUrl);
    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.title,
      description: project.desc,
      url: pageUrl,
      creator: { "@type": "Person", name: "Prashanth Shetteppanavar", url: "https://prashanth-portfolio-plum.vercel.app/" },
      image: `https://prashanth-portfolio-plum.vercel.app${project.image}`,
    });
    const breadcrumbSchema = document.createElement("script");
    breadcrumbSchema.type = "application/ld+json";
    breadcrumbSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://prashanth-portfolio-plum.vercel.app/" },
        { "@type": "ListItem", position: 2, name: "Projects", item: "https://prashanth-portfolio-plum.vercel.app/#projects" },
        { "@type": "ListItem", position: 3, name: project.title, item: `https://prashanth-portfolio-plum.vercel.app/projects/${project.slug}` },
      ],
    });
    document.head.appendChild(schema);
    document.head.appendChild(breadcrumbSchema);
    return () => {
      document.title = "Prashanth Shetteppanavar | Java Full Stack Developer";
      if (description) description.setAttribute("content", "Prashanth Shetteppanavar is a Java Full Stack Developer in Bengaluru building backend systems, REST APIs, database-backed applications and React interfaces.");
      if (canonical && previousCanonical) canonical.setAttribute("href", previousCanonical);
      previousMetadata.forEach(([element, previous]) => element?.setAttribute("content", previous));
      schema.remove();
      breadcrumbSchema.remove();
    };
  }, [project]);

  if (!project) {
    return (
      <main className="min-h-screen bg-ink px-6 py-32 text-bone">
        <div className="mx-auto max-w-3xl">
          <p className="font-mono text-accent">404</p>
          <h1 className="mt-4 font-display text-4xl">Project not found</h1>
          <a className="mt-8 inline-block text-accent" href="/">Return to portfolio -&gt;</a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ink text-bone">
      <div className="mx-auto max-w-5xl px-6 pb-24 pt-32 md:pt-40">
        <nav aria-label="Breadcrumb" className="font-mono text-xs uppercase tracking-widest text-mute">
          <a href="/" className="hover:text-accent">Home</a>
          <span className="mx-2 text-line" aria-hidden="true">/</span>
          <a href="/#projects" className="hover:text-accent">Projects</a>
          <span className="mx-2 text-line" aria-hidden="true">/</span>
          <span className="text-accent2">{project.title}</span>
        </nav>
        <div className="mt-12 grid gap-12 md:grid-cols-[1.05fr_0.95fr] md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent2">{project.tag} / {project.number}</p>
            <h1 className="mt-5 font-display text-4xl leading-tight md:text-6xl">{project.title}</h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-mute">{project.desc}</p>
          </div>
          <img src={project.image} alt={`${project.title} interface preview`} className="w-full rounded-2xl border border-line" />
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          <CaseStudySection title="Overview" text={project.overview} />
          <CaseStudySection title="Problem" text={project.problem} />
          <CaseStudySection title="Approach" text={project.approach} />
        </div>

        <section className="mt-20 border-t border-line pt-10">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Architecture</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {project.architecture.map((item, index) => (
              <span key={item} className="font-mono text-xs text-mute">
                <span className="rounded border border-line px-3 py-2">{item}</span>
                {index < project.architecture.length - 1 && <span className="mx-3 text-accent2" aria-hidden="true">-&gt;</span>}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-8 border-t border-line pt-10 md:grid-cols-2">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Technology</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((item) => <span key={item} className="rounded-full border border-line px-3 py-1.5 font-mono text-xs text-mute">{item}</span>)}
            </div>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Engineering decisions</p>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-mute">
              {project.decisions.map((item) => <li key={item}>- {item}</li>)}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}

function CaseStudySection({ title, text }) {
  return <div><h2 className="font-display text-xl text-bone">{title}</h2><p className="mt-3 text-sm leading-relaxed text-mute">{text}</p></div>;
}

export function ProjectSlugs() {
  return PROJECTS.map((project) => project.slug);
}