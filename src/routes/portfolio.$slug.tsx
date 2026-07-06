import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProject, PROJECTS, type Project } from "@/lib/projects";

export const Route = createFileRoute("/portfolio/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Project not found — Ultimate Pro Builders" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { project } = loaderData;
    const title = `${project.title} — Ultimate Pro Builders`;
    return {
      meta: [
        { title },
        { name: "description", content: project.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: project.summary },
        { property: "og:image", content: project.cover },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: CaseStudy,
  notFoundComponent: ProjectNotFound,
});

function ProjectNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="eyebrow mb-4">Not found</p>
        <h1 className="text-4xl text-cream mb-6">This project is unavailable.</h1>
        <Link
          to="/portfolio"
          className="inline-flex border border-gold px-6 py-3 text-[11px] tracking-[0.3em] uppercase text-gold hover:bg-gold hover:text-primary-foreground transition-colors"
        >
          Back to Portfolio
        </Link>
      </div>
    </div>
  );
}

function CaseStudy() {
  const { project } = Route.useLoaderData() as { project: Project };
  const idx = PROJECTS.findIndex((p) => p.slug === project.slug);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  return (
    <article>
      <section className="relative h-[75vh] min-h-[560px] w-full overflow-hidden">
        <img
          src={project.cover}
          alt={project.title}
          width={1920}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative z-10 h-full max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col justify-end pb-16 md:pb-24">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-gold" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-gold">{project.category}</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-cream max-w-4xl leading-[1]">
            {project.title}
          </h1>
          <p className="mt-6 text-muted-foreground text-sm tracking-[0.2em] uppercase">
            {project.location} · {project.year}
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { l: "Location", v: project.location },
            { l: "Year", v: String(project.year) },
            { l: "Size", v: project.size },
            { l: "Duration", v: project.duration },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">{s.l}</div>
              <div className="text-cream text-lg">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-6">Scope</p>
            <ul className="space-y-3">
              {project.scope.map((s) => (
                <li key={s} className="text-cream border-t border-border pt-3">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-8">
            <p className="eyebrow mb-6">Overview</p>
            <p className="font-display text-3xl md:text-4xl text-cream leading-tight mb-10">
              {project.summary}
            </p>
            <div className="space-y-6 text-muted-foreground leading-relaxed max-w-2xl">
              {project.narrative.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {project.gallery.map((src, i) => (
            <div
              key={i}
              className={`relative overflow-hidden ${
                i % 3 === 0 ? "md:col-span-2 h-[560px] md:h-[720px]" : "h-[420px] md:h-[560px]"
              }`}
            >
              <img
                src={src}
                alt={`${project.title} — ${i + 1}`}
                loading="lazy"
                width={1600}
                height={1200}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border py-16 md:py-20">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <Link
            to="/portfolio"
            className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground hover:text-gold"
          >
            ← All Projects
          </Link>
          <Link
            to="/portfolio/$slug"
            params={{ slug: next.slug }}
            className="group text-right"
          >
            <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2">Next Project</div>
            <div className="font-display text-3xl md:text-4xl text-cream group-hover:text-gold transition-colors">
              {next.title} →
            </div>
          </Link>
        </div>
      </section>
    </article>
  );
}
