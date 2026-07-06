import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import p5 from "@/assets/project-5.jpg";
import p6 from "@/assets/project-6.jpg";
import p7 from "@/assets/project-7.jpg";
import p8 from "@/assets/project-8.jpg";

export const CATEGORIES = [
  "All",
  "Custom Homes",
  "Interior Design",
  "Architecture",
  "Renovation",
] as const;

export type Category = Exclude<(typeof CATEGORIES)[number], "All">;

export interface Project {
  slug: string;
  title: string;
  location: string;
  year: number;
  category: Category;
  size: string;
  duration: string;
  scope: string[];
  cover: string;
  gallery: string[];
  summary: string;
  narrative: string[];
}

export const PROJECTS: Project[] = [
  {
    slug: "ridgeline-residence",
    title: "The Ridgeline Residence",
    location: "Aspen, CO",
    year: 2024,
    category: "Custom Homes",
    size: "12,400 sq ft",
    duration: "28 months",
    scope: ["Ground-up construction", "Architecture", "Interior design", "Landscape"],
    cover: p3,
    gallery: [p3, p5, p6, p8],
    summary:
      "A mountain retreat carved into a south-facing ridge, framing the Elk range through walls of glass and hand-set stone.",
    narrative: [
      "Sited on a challenging 4-acre slope, Ridgeline required a structural system that could cantilever over grade while preserving century-old aspens. Our team engineered a steel and glulam frame clad in locally-quarried moss rock.",
      "The interior pairs European oak with plaster walls hand-troweled by artisans from Verona. A single 42-foot bronze pivot door opens the great room to an infinity pool that reads as a continuation of the horizon.",
      "Every mechanical run is concealed within the structure — no visible vents, no visible speakers. The house is silent in every sense that matters.",
    ],
  },
  {
    slug: "marble-brass-kitchen",
    title: "Marble & Brass Kitchen",
    location: "Beverly Hills, CA",
    year: 2024,
    category: "Interior Design",
    size: "1,800 sq ft",
    duration: "9 months",
    scope: ["Interior design", "Custom millwork", "Lighting design"],
    cover: p1,
    gallery: [p1, p6, p8, p4],
    summary:
      "A gut renovation of a 1927 kitchen and adjoining pantry, reimagined with book-matched Calacatta Viola and unlacquered brass.",
    narrative: [
      "The original layout was a warren of small service rooms. We opened the plan into a single volume anchored by a 14-foot island cut from a single slab.",
      "Cabinetry is rift-sawn white oak with hand-forged brass hardware from a small foundry in Kyoto. All appliances are integrated behind panels — the kitchen reads as a piece of furniture, not a workspace.",
      "The result is a room that will look better in twenty years than it does today.",
    ],
  },
  {
    slug: "alpine-glass-house",
    title: "Alpine Glass House",
    location: "Park City, UT",
    year: 2023,
    category: "Architecture",
    size: "8,900 sq ft",
    duration: "22 months",
    scope: ["Architectural design", "Construction management"],
    cover: p2,
    gallery: [p2, p5, p7, p3],
    summary:
      "A three-volume composition of blackened steel, rammed earth, and structural glass on a private mountain parcel.",
    narrative: [
      "The client asked for a house that would disappear in summer and glow like a lantern in winter. The three volumes step down the site, connected by glazed bridges that frame the changing seasons.",
      "The central volume houses the primary living spaces beneath a 24-foot ceiling of exposed douglas fir. Rammed earth walls, made from soil excavated on site, regulate temperature naturally.",
      "It is one of the first residential Passive House certifications in the state.",
    ],
  },
  {
    slug: "serenity-master-suite",
    title: "Serenity Master Suite",
    location: "Greenwich, CT",
    year: 2023,
    category: "Renovation",
    size: "2,400 sq ft",
    duration: "11 months",
    scope: ["Interior renovation", "Custom joinery", "Bathroom design"],
    cover: p4,
    gallery: [p4, p8, p6, p1],
    summary:
      "A full-floor renovation transforming a compartmented 1980s master into a serene, single-volume retreat.",
    narrative: [
      "We removed twelve walls and three chimneys to unify the floor, then re-introduced a single freestanding volume of quartered walnut to house the closet and bath.",
      "The bathroom is centered on a hand-carved limestone tub imported from a small quarry near Lecce. Underfloor radiant heat runs beneath honed Bianco Dolomiti throughout.",
      "The suite now feels like the top floor of a discreet European hotel — which is exactly what the clients asked for.",
    ],
  },
  {
    slug: "twilight-estate",
    title: "Twilight Estate",
    location: "Napa Valley, CA",
    year: 2024,
    category: "Custom Homes",
    size: "18,200 sq ft",
    duration: "34 months",
    scope: ["Ground-up construction", "Architecture", "Landscape"],
    cover: p5,
    gallery: [p5, p3, p7, p2],
    summary:
      "A multi-generational estate arranged around a linear reflecting pool, designed to host large family gatherings without ever feeling large.",
    narrative: [
      "The program called for eight bedrooms without ever feeling like a hotel. We broke the massing into a village of small stone pavilions connected by covered walkways.",
      "Every pavilion has its own courtyard and its own view of the vineyards. The main hall is capped by a folded-plate ceiling in reclaimed oak.",
      "The house was completed on budget and delivered two weeks ahead of the client's youngest daughter's wedding — which was, in the end, the only deadline that mattered.",
    ],
  },
  {
    slug: "great-room-reimagined",
    title: "The Great Room, Reimagined",
    location: "Lake Forest, IL",
    year: 2024,
    category: "Interior Design",
    size: "3,600 sq ft",
    duration: "7 months",
    scope: ["Interior design", "Art curation", "Custom furniture"],
    cover: p6,
    gallery: [p6, p1, p4, p8],
    summary:
      "A two-story great room refreshed with book-matched marble, warm walnut paneling, and a bespoke sculptural chandelier.",
    narrative: [
      "The bones of the room were extraordinary — 28-foot ceilings, a wall of lake-facing glass — but the finishes had aged into a beige monotony.",
      "We introduced walnut paneling to bring warmth and human scale, then anchored the room with a wall of Arabescato Corchia flanking the fireplace.",
      "The custom chandelier, developed with a studio in Milan, took eleven months to build. It is worth every day.",
    ],
  },
  {
    slug: "coastal-belvedere",
    title: "Coastal Belvedere",
    location: "Malibu, CA",
    year: 2023,
    category: "Architecture",
    size: "6,700 sq ft",
    duration: "19 months",
    scope: ["Architectural design", "Construction management"],
    cover: p7,
    gallery: [p7, p5, p3, p2],
    summary:
      "A cliffside residence organized around a single long terrace, engineered to withstand ocean weather without ever feeling armored.",
    narrative: [
      "Coastal work is unforgiving. Every fastener, every gasket, every piece of glass had to be selected for a 50-year design life in a salt-air marine environment.",
      "The primary living volume opens fully to a 90-foot terrace that appears to float above the tide line. Beneath the terrace, a discreet plunge pool is carved from the bedrock.",
      "The house is quiet, generous, and — because of the material choices — genuinely maintenance-free.",
    ],
  },
  {
    slug: "book-matched-bath",
    title: "The Book-Matched Bath",
    location: "New York, NY",
    year: 2024,
    category: "Renovation",
    size: "1,100 sq ft",
    duration: "6 months",
    scope: ["Bathroom renovation", "Millwork", "Lighting"],
    cover: p8,
    gallery: [p8, p1, p6, p4],
    summary:
      "A pre-war penthouse bathroom reimagined as a single sculptural volume in Grigio Carnico marble and hand-patinated bronze.",
    narrative: [
      "The client wanted a bathroom that felt like a private chapel. We stripped the space to the slab and rebuilt around a single continuous slab wall, book-matched across four elevations.",
      "The tubs — one carved from limestone, one from travertine — sit on a floor of honed Bianco Dolomiti with a hand-cut border in Nero Marquina.",
      "The lighting is entirely indirect: warm cove light at the ceiling, wall sconces from a small atelier in Barcelona, and nothing else.",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
