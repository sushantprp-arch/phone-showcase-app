/**
 * Phone Showcase App device catalog.
 *
 * Photos are hosted on Wikimedia Commons (freely licensed product shots), so
 * the gallery ships with real phone photography instead of placeholders.
 * Every URL below is pinned to the 960px thumbnail size, which is the size
 * Wikimedia's CDN serves for hotlinks.
 */

export type PhoneBrand = "Apple" | "Samsung";

export interface Phone {
  id: string;
  name: string;
  brand: PhoneBrand;
  /** Short series label shown on the card. */
  series: string;
  released: number;
  /** Launch price, shown as a reference point only. */
  launchPrice: string;
  image: string;
  /** Accent used for the glow behind the device. */
  accent: string;
  blurb: string;
  highlights: string[];
  specs: {
    display: string;
    chip: string;
    camera: string;
    battery: string;
    storage: string;
    weight: string;
  };
  tags: string[];
}

const COMMONS = "https://upload.wikimedia.org/wikipedia/commons/thumb";

export const phones: Phone[] = [
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    series: "Pro",
    released: 2023,
    launchPrice: "$1,199",
    image: `${COMMONS}/4/42/Front_of_iPhone_15_Pro_Max.jpg/960px-Front_of_iPhone_15_Pro_Max.jpg`,
    accent: "#7c9cff",
    blurb:
      "Grade 5 titanium, the A17 Pro chip and a 5x tetraprism telephoto in the lightest Pro Max Apple has shipped.",
    highlights: [
      "Aerospace-grade titanium frame",
      "5x optical zoom tetraprism lens",
      "USB-C with 10Gbps transfers",
    ],
    specs: {
      display: '6.7" LTPO Super Retina XDR, 120Hz, 2000 nits',
      chip: "A17 Pro (3nm), 6-core GPU with ray tracing",
      camera: "48MP main + 12MP ultrawide + 12MP 5x tele",
      battery: "4441 mAh · 29h video playback",
      storage: "256GB / 512GB / 1TB",
      weight: "221 g",
    },
    tags: ["Flagship", "Camera", "Titanium"],
  },
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro",
    brand: "Apple",
    series: "Pro",
    released: 2023,
    launchPrice: "$999",
    image: `${COMMONS}/1/19/Apple_iPhone_15_Pro.jpg/960px-Apple_iPhone_15_Pro.jpg`,
    accent: "#8fb0ff",
    blurb:
      "The same A17 Pro platform and Pro camera stack in a genuinely one-hand-friendly 6.1-inch titanium body.",
    highlights: [
      "Action button replaces the mute switch",
      "48MP ProRAW and log video capture",
      "Contoured edges at 187 g",
    ],
    specs: {
      display: '6.1" LTPO Super Retina XDR, 120Hz, 2000 nits',
      chip: "A17 Pro (3nm)",
      camera: "48MP main + 12MP ultrawide + 12MP 3x tele",
      battery: "3274 mAh · 23h video playback",
      storage: "128GB / 256GB / 512GB / 1TB",
      weight: "187 g",
    },
    tags: ["Flagship", "Compact", "Titanium"],
  },
  {
    id: "iphone-15-pair",
    name: "iPhone 15 Pro & Pro Max",
    brand: "Apple",
    series: "Pro",
    released: 2023,
    launchPrice: "$999 – $1,199",
    image: `${COMMONS}/c/ca/IPhone_15_Pro_%26_iPhone_15_Pro_Max.jpg/960px-IPhone_15_Pro_%26_iPhone_15_Pro_Max.jpg`,
    accent: "#9db9ff",
    blurb:
      "The full Pro line side by side — the 6.1-inch balance or the 6.7-inch battery and zoom champion.",
    highlights: [
      "Both sizes share the A17 Pro platform",
      "Titanium rails, matte back glass",
      "The clearest way to see the size difference",
    ],
    specs: {
      display: '6.1" and 6.7" LTPO XDR, 120Hz',
      chip: "A17 Pro in both models",
      camera: "48MP main, 12MP ultrawide, 3x or 5x tele",
      battery: "3274 mAh / 4441 mAh",
      storage: "up to 1TB",
      weight: "187 g / 221 g",
    },
    tags: ["Compare", "Flagship"],
  },
  {
    id: "iphone-14-pro",
    name: "iPhone 14 Pro",
    brand: "Apple",
    series: "Pro",
    released: 2022,
    launchPrice: "$999",
    image: `${COMMONS}/3/37/Back_of_the_iPhone_14_Pro.jpg/960px-Back_of_the_iPhone_14_Pro.jpg`,
    accent: "#8f8fd8",
    blurb:
      "The first always-on display and Dynamic Island, with a 48MP sensor that still punches well above its price used.",
    highlights: [
      "Dynamic Island + always-on display",
      "48MP ProRAW main sensor",
      "Emergency SOS via satellite",
    ],
    specs: {
      display: '6.1" LTPO Super Retina XDR, 120Hz',
      chip: "A16 Bionic (4nm)",
      camera: "48MP main + 12MP ultrawide + 12MP 3x tele",
      battery: "3200 mAh · 23h video playback",
      storage: "128GB / 256GB / 512GB / 1TB",
      weight: "206 g",
    },
    tags: ["Camera", "Value"],
  },
  {
    id: "galaxy-s24-ultra",
    name: "Galaxy S24 Ultra",
    brand: "Samsung",
    series: "Ultra",
    released: 2024,
    launchPrice: "$1,299",
    image: `${COMMONS}/5/54/SAMSUNG_Galaxy_S24_Ultra_%284%29.jpg/960px-SAMSUNG_Galaxy_S24_Ultra_%284%29.jpg`,
    accent: "#c9a86a",
    blurb:
      "Titanium frame, a flat anti-reflective 6.8-inch panel and a 200MP main sensor — Samsung's do-everything flagship.",
    highlights: [
      "200MP main sensor with 2x in-sensor crop",
      "Built-in S Pen with flat-screen precision",
      "Galaxy AI: circle to search, live translate",
    ],
    specs: {
      display: '6.8" QHD+ Dynamic AMOLED 2X, 1–120Hz, 2600 nits',
      chip: "Snapdragon 8 Gen 3 for Galaxy",
      camera: "200MP + 50MP 5x + 10MP 3x + 12MP UW",
      battery: "5000 mAh · 45W wired",
      storage: "256GB / 512GB / 1TB",
      weight: "232 g",
    },
    tags: ["Flagship", "S Pen", "Zoom"],
  },
  {
    id: "galaxy-s24",
    name: "Galaxy S24",
    brand: "Samsung",
    series: "S",
    released: 2024,
    launchPrice: "$799",
    image: `${COMMONS}/4/46/Samsung_Galaxy_S24_%28webtekno%29_008.png/960px-Samsung_Galaxy_S24_%28webtekno%29_008.png`,
    accent: "#79b6d8",
    blurb:
      "A compact 6.2-inch flagship with a 120Hz LTPO panel, seven years of updates and the full Galaxy AI toolkit.",
    highlights: [
      "Snapdragon 8 Gen 3 performance",
      "7 years of OS and security updates",
      "Live translate and photo assist built in",
    ],
    specs: {
      display: '6.2" FHD+ AMOLED 2X, 1–120Hz, 2600 nits',
      chip: "Snapdragon 8 Gen 3 for Galaxy",
      camera: "50MP + 12MP UW + 10MP 3x tele",
      battery: "4000 mAh · 25W wired",
      storage: "128GB / 256GB / 512GB",
      weight: "167 g",
    },
    tags: ["Compact", "Value"],
  },
  {
    id: "galaxy-s23",
    name: "Galaxy S23",
    brand: "Samsung",
    series: "S",
    released: 2023,
    launchPrice: "$799",
    image: `${COMMONS}/7/79/Galaxy_S23.png/960px-Galaxy_S23.png`,
    accent: "#8fd0b8",
    blurb:
      "One of the best small Android phones ever made — flagship silicon, clean design and a night-mode camera that overdelivers.",
    highlights: [
      "Snapdragon 8 Gen 2 for Galaxy",
      "Nightography low-light capture",
      "Durable Gorilla Glass Victus 2",
    ],
    specs: {
      display: '6.1" FHD+ Dynamic AMOLED 2X, 48–120Hz',
      chip: "Snapdragon 8 Gen 2 for Galaxy",
      camera: "50MP + 12MP UW + 10MP 3x tele",
      battery: "3900 mAh · 25W wired",
      storage: "128GB / 256GB / 512GB",
      weight: "168 g",
    },
    tags: ["Compact", "Value"],
  },
  {
    id: "galaxy-s22-ultra",
    name: "Galaxy S22 Ultra",
    brand: "Samsung",
    series: "Ultra",
    released: 2022,
    launchPrice: "$1,199",
    image: `${COMMONS}/4/46/SAMSUNG_Galaxy_S22_Ultra_BLACK_%286%29.jpg/960px-SAMSUNG_Galaxy_S22_Ultra_BLACK_%286%29.jpg`,
    accent: "#b8a6e8",
    blurb:
      "The Note that never got called a Note — a 6.8-inch QHD+ canvas, silo-housed S Pen and 100x Space Zoom.",
    highlights: [
      "108MP main with 10x optical telephoto",
      "S Pen silo with 2.8ms latency",
      "Matte Gorilla Glass Victus+ finish",
    ],
    specs: {
      display: '6.8" QHD+ Dynamic AMOLED 2X, 1–120Hz',
      chip: "Snapdragon 8 Gen 1 (4nm)",
      camera: "108MP + 12MP UW + 10MP 10x + 10MP 3x",
      battery: "5000 mAh · 45W wired",
      storage: "128GB / 256GB / 512GB / 1TB",
      weight: "229 g",
    },
    tags: ["Zoom", "S Pen", "Flagship"],
  },
  {
    id: "galaxy-z-fold-4",
    name: "Galaxy Z Fold 4",
    brand: "Samsung",
    series: "Z Fold",
    released: 2022,
    launchPrice: "$1,799",
    image: `${COMMONS}/b/b2/Samsung_Galaxy_Z_Fold_4.jpg/960px-Samsung_Galaxy_Z_Fold_4.jpg`,
    accent: "#9fb2e0",
    blurb:
      "A pocket tablet that folds into a phone — multitasking with three apps at once on a 7.6-inch inner display.",
    highlights: [
      "7.6-inch folding AMOLED main display",
      "Taskbar and true multi-window split view",
      "PC-grade multitasking in a 263 g body",
    ],
    specs: {
      display: '7.6" inner AMOLED 2X 120Hz + 6.2" cover 120Hz',
      chip: "Snapdragon 8+ Gen 1",
      camera: "50MP + 12MP UW + 10MP 3x tele",
      battery: "4400 mAh · 25W wired",
      storage: "256GB / 512GB / 1TB",
      weight: "263 g",
    },
    tags: ["Foldable", "Productivity"],
  },
  {
    id: "galaxy-z-flip",
    name: "Galaxy Z Flip",
    brand: "Samsung",
    series: "Z Flip",
    released: 2020,
    launchPrice: "$1,380",
    image: `${COMMONS}/d/dc/Samsung_Galaxy_Z_Flip_-_4.jpg/960px-Samsung_Galaxy_Z_Flip_-_4.jpg`,
    accent: "#d8a0c0",
    blurb:
      "The clamshell that restarted the flip-phone trend — a full-size screen that folds down to fit a jeans pocket.",
    highlights: [
      "Foldable glass display with hideaway hinge",
      "Flex mode camera on the half-open hinge",
      "Compact footprint when folded",
    ],
    specs: {
      display: '6.7" foldable Dynamic AMOLED + 1.1" cover',
      chip: "Snapdragon 855+ (7nm)",
      camera: "12MP main + 12MP ultrawide",
      battery: "3300 mAh · 15W wired",
      storage: "256GB",
      weight: "183 g",
    },
    tags: ["Foldable", "Compact"],
  },
  {
    id: "galaxy-note-20",
    name: "Galaxy Note 20",
    brand: "Samsung",
    series: "Note",
    released: 2020,
    launchPrice: "$999",
    image: `${COMMONS}/e/ef/Samsung_Galaxy_Note_20_front_%28cropped%29.png/960px-Samsung_Galaxy_Note_20_front_%28cropped%29.png`,
    accent: "#d8b878",
    blurb:
      "The last of the classic Note line — big flat screen, S Pen in the silo and Samsung Notes sync across devices.",
    highlights: [
      "S Pen with 26ms latency and air actions",
      "Mystic Bronze and Mystic Green finishes",
      "Samsung DeX desktop mode",
    ],
    specs: {
      display: '6.7" FHD+ Super AMOLED Plus, 60Hz',
      chip: "Exynos 990 / Snapdragon 865+",
      camera: "12MP + 64MP 3x hybrid + 12MP UW",
      battery: "4300 mAh · 25W wired",
      storage: "128GB / 256GB",
      weight: "192 g",
    },
    tags: ["S Pen", "Classic"],
  },
];

export const brandFilters = ["All", "Apple", "Samsung"] as const;
export type BrandFilter = (typeof brandFilters)[number];

export function countByBrand(brand: PhoneBrand) {
  return phones.filter((phone) => phone.brand === brand).length;
}
