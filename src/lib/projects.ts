import p1 from "@/assets/WhatsApp Image 2026-07-08 at 10.27.09 PM (1).jpeg";
import p2 from "@/assets/WhatsApp Image 2026-07-08 at 10.22.30 PM (4).jpeg";
import p3 from "@/assets/WhatsApp Image 2026-07-08 at 10.22.31 PM.jpeg";
import p4 from "@/assets/WhatsApp Image 2026-07-08 at 10.22.42 PM (2).jpeg";
import p5 from "@/assets/WhatsApp Image 2026-07-08 at 10.22.37 PM (2).jpeg";
import p6 from "@/assets/WhatsApp Image 2026-07-08 at 10.27.08 PM.jpeg";
import p7 from "@/assets/WhatsApp Image 2026-07-08 at 10.27.09 PM.jpeg";
import p11 from "@/assets/WhatsApp Image 2026-07-08 at 10.26.58 PM (1).jpeg";
import p12 from "@/assets/WhatsApp Image 2026-07-08 at 10.26.48 PM (1).jpeg";
import p13 from "@/assets/WhatsApp Image 2026-07-08 at 10.26.48 PM.jpeg";
import p14 from "@/assets/WhatsApp Image 2026-07-08 at 10.26.54 PM (2).jpeg";
import p21 from "@/assets/WhatsApp Image 2026-07-08 at 10.22.27 PM (1).jpeg";
import p22 from "@/assets/WhatsApp Image 2026-07-08 at 10.22.27 PM (2).jpeg";
import p23 from "@/assets/WhatsApp Image 2026-07-08 at 10.22.28 PM.jpeg";
import p31 from "@/assets/WhatsApp Image 2026-07-08 at 10.22.33 PM.jpeg";
import p32 from "@/assets/WhatsApp Image 2026-07-08 at 10.22.35 PM (3).jpeg";
import p33 from "@/assets/WhatsApp Image 2026-07-08 at 10.22.35 PM (1).jpeg";
import p41 from "@/assets/WhatsApp Image 2026-07-08 at 10.26.43 PM.jpeg";
import p42 from "@/assets/WhatsApp Image 2026-07-08 at 10.26.45 PM (1).jpeg";
import p43 from "@/assets/WhatsApp Image 2026-07-08 at 10.26.45 PM (2).jpeg";
import p51 from "@/assets/WhatsApp Image 2026-07-08 at 10.22.35 PM.jpeg";
import p52 from "@/assets/WhatsApp Image 2026-07-08 at 10.27.08 PM (2).jpeg";
import p54 from "@/assets/WhatsApp Image 2026-07-08 at 10.22.37 PM (2).jpeg";
import p61 from "@/assets/WhatsApp Image 2026-07-08 at 10.22.35 PM (2).jpeg";
import p62 from "@/assets/WhatsApp Image 2026-07-08 at 10.27.09 PM (1).jpeg";
import p63 from "@/assets/WhatsApp Image 2026-07-08 at 10.27.09 PM.jpeg";
import p71 from "@/assets/WhatsApp Image 2026-07-08 at 10.26.22 PM.jpeg";
import p72 from "@/assets/WhatsApp Image 2026-07-08 at 10.22.26 PM (1).jpeg";
import p73 from "@/assets/WhatsApp Image 2026-07-08 at 10.27.36 PM.jpeg";

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
    title: "Cabinetry",
    location: "Aspen, CO",
    year: 2024,
    category: "Custom Homes",
    size: "12,400 sq ft",
    duration: "28 months",
    scope: ["Ground-up construction", "Architecture", "Interior design", "Landscape"],
    cover: p3,
    gallery: [p31, p32, p33],
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
    title: "Wood Works",
    location: "Beverly Hills, CA",
    year: 2024,
    category: "Interior Design",
    size: "1,800 sq ft",
    duration: "9 months",
    scope: ["Interior design", "Custom millwork", "Lighting design"],
    cover: p1,
    gallery: [p11, p12, p13, p14],
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
    title: "Kitchens",
    location: "Park City, UT",
    year: 2023,
    category: "Architecture",
    size: "8,900 sq ft",
    duration: "22 months",
    scope: ["Architectural design", "Construction management"],
    cover: p2,
    gallery: [p2, p21, p22, p23],
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
    title: "Remodels",
    location: "Greenwich, CT",
    year: 2023,
    category: "Renovation",
    size: "2,400 sq ft",
    duration: "11 months",
    scope: ["Interior renovation", "Custom joinery", "Bathroom design"],
    cover: p4,
    gallery: [p41, p42, p43],
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
    title: "Customs Homes",
    location: "Napa Valley, CA",
    year: 2024,
    category: "Custom Homes",
    size: "18,200 sq ft",
    duration: "34 months",
    scope: ["Ground-up construction", "Architecture", "Landscape"],
    cover: p5,
    gallery: [p51, p52, p54],
    summary:
      "A multi-generational estate arranged around a linear reflecting pool, designed to host large family gatherings without ever feeling large.",
    narrative: [
      "The program called for eight bedrooms without ever feeling like a hotel. We broke the massing into a village of small stone pavilions connected by covered walkways.",
      "Every pavilion has its own courtyard and its own view of the vineyards. The main hall is capped by a folded-plate ceiling in reclaimed oak.",
      "The house was completed on budget and delivered two weeks ahead of the client's youngest daughter's wedding — which was, in the end, the only deadline that mattered.",
    ],
  },
  //  "All",
  // "Custom Homes",
  // "Kitchens",
  // "Bathrooms",
  // "Millwork",
  // "Cabinetry",
  // "Remodels",
  // "Woodwork",
  {
    slug: "great-room-reimagined",
    title: "Millwork",
    location: "Lake Forest, IL",
    year: 2024,
    category: "Interior Design",
    size: "3,600 sq ft",
    duration: "7 months",
    scope: ["Interior design", "Art curation", "Custom furniture"],
    cover: p6,
    gallery: [p61, p62, p63],
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
    title: "Bathroom",
    location: "Malibu, CA",
    year: 2023,
    category: "Architecture",
    size: "6,700 sq ft",
    duration: "19 months",
    scope: ["Architectural design", "Construction management"],
    cover: p7,
    gallery: [p71, p72, p73],
    summary:
      "A cliffside residence organized around a single long terrace, engineered to withstand ocean weather without ever feeling armored.",
    narrative: [
      "Coastal work is unforgiving. Every fastener, every gasket, every piece of glass had to be selected for a 50-year design life in a salt-air marine environment.",
      "The primary living volume opens fully to a 90-foot terrace that appears to float above the tide line. Beneath the terrace, a discreet plunge pool is carved from the bedrock.",
      "The house is quiet, generous, and — because of the material choices — genuinely maintenance-free.",
    ],
  },
 
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
