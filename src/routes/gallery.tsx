import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";

// 1. Fetch all local asset references from the folder
const imageModules = import.meta.glob('../assets/*.{png,jpg,jpeg,svg}', { eager: true });

// 2. Format files into an accessible structured data array
const allImagesFromFolder = Object.entries(imageModules).map(([path, mod]: [string, any]) => {
  const fileName = path.split('/').pop() || '';
  
  // Clean up a clean title from the filename (e.g., "luxury-living-room.jpg" -> "Luxury Living Room")
  const title = fileName
    .replace(/\.[^/.]+$/, "") // Remove file extension
    .split(/[-_]/)            // Split on dashes/underscores
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    src: mod.default,
    fileName,
    title,
  };
});

export const Route = createFileRoute("/gallery")({
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
  return (
    <>
      <section className="pt-24 md:pt-32 pb-16">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <p className="eyebrow mb-6">Gallery</p>
          <h1 className="text-5xl md:text-7xl text-cream max-w-4xl leading-[0.95]">
            Spaces we've
            <span className="italic gold-text"> crafted.</span>
          </h1>
          <p className="mt-8 max-w-xl text-muted-foreground">
            Browse our complete collection of luxury homes, custom interiors, cabinetry, millwork and renovations.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 border-t border-border">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          {allImagesFromFolder.length === 0 ? (
            <p className="text-muted-foreground">No image files found in the source directory.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {allImagesFromFolder.map((img) => (
                <div key={img.fileName} className="overflow-hidden group border border-border/40 bg-muted/10">
                  <div className="overflow-hidden">
                    <img 
                      src={img.src} 
                      alt={img.title} 
                      className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
