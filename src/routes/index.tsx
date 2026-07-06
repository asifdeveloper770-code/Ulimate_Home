import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useReveal } from "@/hooks/use-reveal";

import heroImg from "@/assets/hero.jpg";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import processImg from "@/assets/process.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

const projects = [
  { slug: "ridgeline-residence", title: "The Ridgeline Residence", location: "Aspen, CO", type: "Custom Estate", img: p3 },
  { slug: "marble-brass-kitchen", title: "Marble & Brass Kitchen", location: "Beverly Hills, CA", type: "Interior Design", img: p1 },
  { slug: "alpine-glass-house", title: "Alpine Glass House", location: "Park City, UT", type: "Architecture", img: p2 },
  { slug: "serenity-master-suite", title: "Serenity Master Suite", location: "Greenwich, CT", type: "Renovation", img: p4 },
];

const services = [
  { n: "01", title: "Custom Home Building", body: "Ground-up construction of one-of-a-kind residences, crafted around your life and land." },
  { n: "02", title: "Architectural Design", body: "In-house architects translate vision into buildable, timeless form and detail." },
  { n: "03", title: "Interior Design", body: "Curated materials, bespoke millwork, and finishes selected with an editor's eye." },
  { n: "04", title: "Estate Renovation", body: "Reimagining historic and contemporary homes with modern engineering and quiet luxury." },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/85 backdrop-blur-md border-b border-border" : "bg-transparent"}`}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="font-display text-2xl text-cream tracking-tight">Ultimate</span>
          <span className="font-display text-2xl gold-text italic">Pro</span>
          <span className="font-display text-2xl text-cream">Builders</span>
        </a>
        <nav className="hidden lg:flex items-center gap-10">
          <Link to="/portfolio" className="text-[11px] tracking-[0.28em] uppercase text-muted-foreground hover:text-gold transition-colors">Portfolio</Link>
          {["Services", "Process", "About", "Contact"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-[11px] tracking-[0.28em] uppercase text-muted-foreground hover:text-gold transition-colors">
              {l}
            </a>
          ))}
        </nav>
        <a href="#contact" className="hidden md:inline-flex border border-gold/60 px-5 py-2.5 text-[11px] tracking-[0.28em] uppercase text-gold hover:bg-gold hover:text-primary-foreground transition-colors">
          Start a Project
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative h-screen min-h-[720px] w-full overflow-hidden">
      <img src={heroImg} alt="Luxury custom home at dusk" width={1920} height={1200} className="ken-burns absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 hero-gradient" />
      <div className="pointer-events-none absolute -top-24 -right-24 w-[520px] h-[520px] rounded-full float-slow" style={{ background: "radial-gradient(closest-side, oklch(0.78 0.12 82 / 0.18), transparent 70%)" }} />
      <div className="relative z-10 h-full max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col justify-end pb-24 md:pb-32">
        <p className="eyebrow mb-6" data-reveal>Est. 2004 — Nationwide</p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl text-cream max-w-5xl leading-[0.95]" data-reveal data-reveal-delay="1">
          Homes built <span className="italic text-shimmer">around</span><br />
          the lives inside them.
        </h1>
        <p className="mt-8 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed" data-reveal data-reveal-delay="2">
          Ultimate Pro Builders is a full-service luxury construction firm designing and building bespoke residences, estates, and interiors across the country.
        </p>
        <div className="mt-10 flex flex-wrap gap-4" data-reveal data-reveal-delay="3">
          <Link to="/portfolio" className="shine gold-halo inline-flex items-center gap-3 bg-gold text-primary-foreground px-8 py-4 text-[11px] tracking-[0.3em] uppercase font-medium hover:bg-gold-soft transition-colors">
            View Portfolio
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <a href="#contact" className="underline-grow inline-flex items-center gap-3 border border-cream/30 text-cream px-8 py-4 text-[11px] tracking-[0.3em] uppercase hover:border-gold hover:text-gold transition-colors">
            Begin a Conversation
          </a>
        </div>
      </div>
      <div className="absolute bottom-8 right-6 md:right-12 z-10 flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
        <span className="w-10 h-px bg-gold animate-pulse" />
        Scroll
      </div>
    </section>
  );
}


function Stats() {
  const items = [
    { k: "20+", l: "Years Building" },
    { k: "180", l: "Homes Delivered" },
    { k: "42", l: "Design Awards" },
    { k: "100%", l: "Client Referred" },
  ];
  return (
    <section className="border-y border-border py-16 md:py-20 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-40" style={{ background: "radial-gradient(ellipse at 50% 0%, oklch(0.78 0.12 82 / 0.10), transparent 60%)" }} />
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-10 relative">
        {items.map((i, idx) => (
          <div key={i.l} className="text-center md:text-left group" data-reveal data-reveal-delay={String(idx + 1)}>
            <div className="font-display text-5xl md:text-6xl gold-text transition-transform duration-500 group-hover:-translate-y-1">{i.k}</div>
            <div className="mt-2 text-[10px] tracking-[0.3em] uppercase text-muted-foreground">{i.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Marquee() {
  const words = ["Bespoke", "Timeless", "Considered", "Crafted", "Enduring", "Precise", "Quiet Luxury", "Site-Specific"];
  const loop = [...words, ...words];
  return (
    <section aria-hidden className="marquee py-8 border-b border-border overflow-hidden">
      <div className="marquee-track gap-16 whitespace-nowrap">
        {loop.map((w, i) => (
          <span key={i} className="flex items-center gap-16 font-display text-3xl md:text-4xl text-cream/60">
            {w}
            <span className="w-2 h-2 rounded-full bg-gold/70" />
          </span>
        ))}
      </div>
    </section>
  );
}


function Projects() {
  return (
    <section id="projects" className="py-24 md:py-36">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6" data-reveal>
          <div>
            <p className="eyebrow mb-5">Recent Projects</p>
            <h2 className="text-4xl md:text-6xl text-cream max-w-2xl leading-tight">
              A portfolio defined by <span className="italic text-shimmer">restraint,</span> craft, and light.
            </h2>
          </div>
          <Link to="/portfolio" className="underline-grow self-start text-[11px] tracking-[0.3em] uppercase text-gold hover:text-gold-soft">All Projects →</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {projects.map((p, i) => {
            const spans = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];
            const heights = ["h-[520px] md:h-[640px]", "h-[520px] md:h-[640px]", "h-[520px] md:h-[560px]", "h-[520px] md:h-[560px]"];
            return (
              <Link
                to="/portfolio/$slug"
                params={{ slug: p.slug }}
                key={p.title}
                data-reveal
                data-reveal-delay={String((i % 3) + 1)}
                className={`img-zoom shine group relative overflow-hidden ${spans[i]} ${heights[i]} block`}
              >
                <img src={p.img} alt={p.title} loading="lazy" width={1200} height={1500} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent transition-opacity duration-500 group-hover:from-ink/95" />
                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-px bg-gold transition-all duration-500 group-hover:w-16" />
                    <span className="text-[10px] tracking-[0.3em] uppercase text-gold">{p.type}</span>
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl text-cream transition-transform duration-500 group-hover:-translate-y-1">{p.title}</h3>
                  <div className="flex items-center justify-between mt-2 gap-4">
                    <p className="text-sm text-muted-foreground">{p.location}</p>
                    <span className="text-gold text-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="py-24 md:py-36 bg-card">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-20" data-reveal>
          <p className="eyebrow mb-5">What We Do</p>
          <h2 className="text-4xl md:text-6xl text-cream leading-tight">
            One firm. Every discipline of the <span className="italic text-shimmer">custom home.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-14">
          {services.map((s, i) => (
            <div
              key={s.title}
              data-reveal
              data-reveal-delay={String((i % 4) + 1)}
              className="group border-t border-border pt-8 flex gap-8 transition-colors duration-500 hover:border-gold cursor-default"
            >
              <div className="font-display text-3xl gold-text shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1">{s.n}</div>
              <div>
                <h3 className="text-2xl md:text-3xl text-cream mb-3 transition-colors duration-300 group-hover:text-gold">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

function Process() {
  const steps = [
    { n: "I", t: "Discovery", d: "We listen. Site, program, aspiration — every project starts with a long conversation." },
    { n: "II", t: "Design", d: "Architects and interior designers work in the same room, from first sketch to final specification." },
    { n: "III", t: "Build", d: "A single dedicated team, transparent pricing, and craftsmanship measured to the millimeter." },
    { n: "IV", t: "Legacy", d: "We stay involved after keys are handed over — because great homes are lived in for generations." },
  ];
  return (
    <section id="process" className="py-24 md:py-36 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative h-[500px] lg:h-[720px] order-2 lg:order-1 img-zoom group" data-reveal>
          <img src={processImg} alt="Architectural process" loading="lazy" width={1600} height={1000} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-tr from-ink/70 via-ink/20 to-transparent" />
          <div className="absolute bottom-8 left-8 flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="w-8 h-px bg-gold" /> On Site
          </div>
        </div>
        <div className="order-1 lg:order-2" data-reveal data-reveal-delay="1">
          <p className="eyebrow mb-5">The Process</p>
          <h2 className="text-4xl md:text-6xl text-cream leading-tight mb-14">
            A quieter, more <span className="italic text-shimmer">deliberate</span> way to build.
          </h2>
          <div className="space-y-10">
            {steps.map((s, i) => (
              <div
                key={s.n}
                data-reveal
                data-reveal-delay={String(i + 1)}
                className="group flex gap-6 border-l border-gold/40 pl-6 hover:border-gold transition-colors duration-500"
              >
                <div className="font-display text-xl text-gold w-8 transition-transform duration-500 group-hover:translate-x-1">{s.n}</div>
                <div>
                  <h3 className="text-xl text-cream mb-2 transition-colors group-hover:text-gold">{s.t}</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-md">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 md:py-36 bg-card relative overflow-hidden">
      <div className="pointer-events-none absolute -left-32 top-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full float-slow" style={{ background: "radial-gradient(closest-side, oklch(0.78 0.12 82 / 0.10), transparent 70%)" }} />
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative" data-reveal>
        <p className="eyebrow mb-6">About the Firm</p>
        <blockquote className="font-display text-3xl md:text-5xl text-cream leading-[1.15]">
          "We don't build houses. We build the <span className="italic text-shimmer">setting</span> for the moments that matter most — quietly, precisely, and with unwavering respect for craft."
        </blockquote>
        <div className="mt-12 flex items-center justify-center gap-6">
          <span className="w-16 h-px bg-gold" />
          <span className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">Marcus Vale, Founder</span>
          <span className="w-16 h-px bg-gold" />
        </div>
      </div>
    </section>
  );
}


function CTA() {
  return (
    <section id="contact" className="py-24 md:py-36">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="relative overflow-hidden border border-border p-10 md:p-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="eyebrow mb-6">Begin</p>
              <h2 className="text-4xl md:text-6xl text-cream leading-tight">
                Let's build something <span className="italic gold-text">extraordinary.</span>
              </h2>
              <p className="mt-6 text-muted-foreground max-w-lg leading-relaxed">
                Every commission begins with a conversation. Tell us about your site, your vision, and your timeline — we'll respond within one business day.
              </p>
              <div className="mt-10 space-y-3 text-sm text-muted-foreground">
                <div><span className="text-gold text-[10px] tracking-[0.3em] uppercase mr-4">Phone</span> (800) 555-0142</div>
                <div><span className="text-gold text-[10px] tracking-[0.3em] uppercase mr-4">Email</span> studio@ultimateprobuilders.com</div>
                <div><span className="text-gold text-[10px] tracking-[0.3em] uppercase mr-4">Studio</span> By appointment only</div>
              </div>
            </div>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              {[
                { l: "Full Name", t: "text" },
                { l: "Email Address", t: "email" },
                { l: "Project Location", t: "text" },
              ].map((f) => (
                <div key={f.l}>
                  <label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">{f.l}</label>
                  <input type={f.t} className="mt-2 w-full bg-transparent border-b border-border py-3 text-cream focus:outline-none focus:border-gold transition-colors" />
                </div>
              ))}
              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Tell us about your project</label>
                <textarea rows={4} className="mt-2 w-full bg-transparent border-b border-border py-3 text-cream focus:outline-none focus:border-gold transition-colors resize-none" />
              </div>
              <button type="submit" className="shine mt-4 w-full bg-gold text-primary-foreground py-4 text-[11px] tracking-[0.3em] uppercase font-medium hover:bg-gold-soft transition-colors">
                Send Inquiry
              </button>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
        <div>© {new Date().getFullYear()} Ultimate Pro Builders</div>
        <div className="font-display italic text-gold text-sm normal-case tracking-normal">Built around you.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-gold">Instagram</a>
          <a href="#" className="hover:text-gold">Journal</a>
          <a href="#" className="hover:text-gold">Privacy</a>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  useReveal();
  return (
    <main className="bg-background grain">
      <Nav />
      <Hero />
      <Stats />
      <Marquee />
      <Projects />
      <Services />
      <Process />
      <About />
      <CTA />
      <Footer />
    </main>
  );
}

