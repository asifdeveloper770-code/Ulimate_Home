import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { CATEGORIES, GALLERY } from "@/lib/gallery";

const searchSchema = z.object({
  category: fallback(z.enum(CATEGORIES), "All").default("All"),
});

const imageModules = import.meta.glob('../assets/*.{png,jpg,jpeg,svg}', { eager: true });
const imagesArray = Object.values(imageModules).map((mod: any) => mod.default);

export const Route = createFileRoute("/gallery")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Gallery — Ultimate Pro Builders" },
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
  const isIndex = pathname === "/gallery" || pathname === "/gallery/";
  return (
    <main className="bg-background min-h-screen">
      <GalleryNavbar />
      {isIndex ? <PortfolioIndex /> : <Outlet />}
    </main>
  );
} 

function GalleryNavbar() {
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
          <Link to="/portfolio" className="text-[11px] tracking-[0.28em] uppercase text-muted-foreground hover:text-gold">Portfolio</Link>
          <Link to="/gallery" className="text-[11px] tracking-[0.28em] uppercase text-gold">Gallery</Link>
          <Link to="/" hash="contact" className="text-[11px] tracking-[0.28em] uppercase text-muted-foreground hover:text-gold">Contact</Link>
        </nav>
      </div>
    </header>
  );
}

function PortfolioIndex() {
  const { category } = Route.useSearch();
  const filtered =
    category === "All"
      ? GALLERY
      : GALLERY.filter(
        (item) => item.category === category
      );
  return <>
    <section className="pt-24 md:pt-32 pb-16">

      <div className="max-w-[1600px] mx-auto px-6 md:px-12">

        <p className="eyebrow mb-6">
          Gallery
        </p>

        <h1 className="text-5xl md:text-7xl text-cream max-w-4xl leading-[0.95]">

          Spaces we've
          <span className="italic gold-text">
            {" "}crafted.
          </span>

        </h1>

        <p className="mt-8 max-w-xl text-muted-foreground">

          Browse our collection of luxury homes,
          custom interiors,
          cabinetry,
          millwork and renovations.

        </p>

      </div>

    </section>

    <section className="border-y border-border">

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-6 flex flex-wrap gap-4">

        {CATEGORIES.map((c) => {

          const active = c === category;

          return (

            <Link
              key={c}
              to="/gallery"
              search={{ category: c }}
              className={`px-4 py-2 border uppercase text-xs tracking-[0.25em]
${active
                  ? "border-gold text-gold"
                  : "border-transparent text-muted-foreground hover:text-cream"
                }`}
            >

              {c}

              {/* <span className="ml-2 opacity-60">

                (
                {c === "All"
                  ? GALLERY.length
                  : GALLERY.filter(x => x.category === c).length}

                )

              </span> */}

            </Link>

          );

        })}

      </div>

    </section>

    <section className="py-16 md:py-24">

      <div className="max-w-[1600px] mx-auto px-6 md:px-12">

        {filtered.length === 0 ? (
          <p className="text-muted-foreground">
            No projects in this category yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

          {imagesArray.map((src, index) => (
        <img key={index} src={src} alt={`Local asset ${index}`} />
      ))}
          </div>
        )}

      </div>

    </section>
  </>
} 
