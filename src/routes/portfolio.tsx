import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { CATEGORIES, PROJECTS } from "@/lib/projects";

const searchSchema = z.object({
  category: fallback(z.enum(CATEGORIES), "All").default("All"),
});


export const Route = createFileRoute("/portfolio")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Portfolio — Ultimate Pro Builders" },
      {
        name: "description",
        content:
          "Selected work from Ultimate Pro Builders: custom homes, interiors, architecture, and estate renovations across the country.",
      },
      { property: "og:title", content: "Portfolio — Ultimate Pro Builders" },
      {
        property: "og:description",
        content: "Selected custom homes, interiors, and renovations by Ultimate Pro Builders.",
      },
    ],
  }),
  component: PortfolioLayout,
});

function PortfolioLayout() {
  const { pathname } = useLocation();
  const isIndex = pathname === "/portfolio" || pathname === "/portfolio/";
  return (
    <main className="bg-background min-h-screen">
      <PortfolioNav />
      {isIndex ? <PortfolioIndex /> : <Outlet />}
    </main>
  );
}

function PortfolioNav() {
  return (
    <header className="border-b border-border">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-display text-2xl text-cream tracking-tight">Ultimate</span>
          <span className="font-display text-2xl gold-text italic">Pro</span>
          <span className="font-display text-2xl text-cream">Builders</span>
        </Link>
        <nav className="hidden md:flex gap-10 text-sm uppercase tracking-widest">
          <Link to="/" className="text-[11px] tracking-[0.28em] uppercase text-muted-foreground hover:text-gold">Home</Link>
          <Link to="/portfolio" className="text-[11px] tracking-[0.28em] uppercase text-gold">Portfolio</Link>
          <Link to="/gallery" className="text-[11px] tracking-[0.28em] uppercase text-muted-foreground hover:text-gold">Gallery</Link>
          <Link to="/" className="text-[11px] tracking-[0.28em] uppercase text-muted-foreground hover:text-gold">Contact</Link>
        </nav>
      </div>
    </header>
  );
}

function PortfolioIndex() {
  const { category } = Route.useSearch();
  const filtered = category === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === category);

  return (
    <>
      <section className="pt-24 md:pt-32 pb-16 md:pb-20">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <p className="eyebrow mb-6">Portfolio</p>
          <h1 className="text-5xl md:text-7xl text-cream max-w-4xl leading-[0.95]">
            A record of what we've <span className="italic gold-text">quietly built.</span>
          </h1>
          <p className="mt-8 max-w-xl text-base text-muted-foreground leading-relaxed">
            Selected residences, interiors, and renovations. Every project is a private commission — we've included only what our clients have permitted us to show.
          </p>
        </div>
      </section>

      <section className="border-y border-border">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-6 flex flex-wrap gap-3 md:gap-6 items-center">
          <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mr-2">Filter</span>
          {CATEGORIES.map((c) => {
            const active = c === category;
            return (
              <Link
                key={c}
                to="/portfolio"
                search={{ category: c }}
                className={`text-[11px] tracking-[0.28em] uppercase px-4 py-2 border transition-colors ${
                  active
                    ? "border-gold text-gold"
                    : "border-transparent text-muted-foreground hover:text-cream"
                }`}
              >
                {c}
                <span className="ml-2 text-[9px] opacity-60">
                  {c === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.category === c).length}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          {filtered.length === 0 ? (
            <p className="text-muted-foreground">No projects in this category yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filtered.map((p) => (
                <Link
                  key={p.slug}
                  to="/portfolio/$slug"
                  params={{ slug: p.slug }}
                  className="group block"
                >
                  <div className="relative overflow-hidden h-[420px] md:h-[480px]">
                    <img
                      src={p.cover}
                      alt={p.title}
                      loading="lazy"
                      width={1024}
                      height={1024}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                  </div>
                  <div className="pt-6 flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="w-6 h-px bg-gold" />
                        <span className="text-[10px] tracking-[0.3em] uppercase text-gold">{p.category}</span>
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl text-cream group-hover:text-gold transition-colors">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {p.location} · {p.year}
                      </p>
                    </div>
                    <span className="text-gold text-lg pt-1" aria-hidden>→</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
