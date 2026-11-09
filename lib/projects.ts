export type Project = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  color: string;
  status: "Live client" | "Live product" | "Internal system";
  href?: string;
  /** Short line streamed in the hero console. */
  log: string;
  /** Bento tile size on the home grid. */
  size: "lg" | "wide" | "tall" | "sm";
  metrics: { label: string; value: string }[];
  challenge: string;
  solution: string[];
  results: string[];
  stack: string[];
  services: string[];
  /** Real screenshots shown on the case study page. */
  gallery?: { src: string; width: number; height: number; alt: string; caption: string }[];
};

export const projects: Project[] = [
  {
    slug: "rahil-therapy",
    name: "Rahil Therapy",
    category: "AI Growth System · Client",
    tagline:
      "A bilingual therapy practice that publishes, posts and ranks on its own — every single day.",
    color: "#a855f7",
    status: "Live client",
    href: "https://rahiltherapy.com",
    log: "Publishing today's article · rahiltherapy.com",
    size: "lg",
    metrics: [
      { label: "SEO score", value: "62 → 92" },
      { label: "Performance", value: "30 → 90" },
      { label: "Page weight", value: "33MB → 4.7MB" },
      { label: "Daily posts", value: "Automated" },
    ],
    challenge:
      "A Dubai-based Persian-speaking psychotherapist needed to reach the Persian diaspora worldwide, but had a slow site, weak search visibility and no time to create content.",
    solution: [
      "Rebuilt the site as a fast, right-to-left Persian experience with clear service pages for CBT, schema therapy, anxiety, depression, OCD and couples work.",
      "Built a daily AI pipeline: one clinical-tone article is written, illustrated, published, added to the sitemap and shared to Telegram every morning at 8am.",
      "Generated a weekly Instagram caption schedule from the same topics so every channel stays on message.",
      "Ran 13 SEO and performance passes in a single day, then set up the Google Business Profile as a service-area business.",
    ],
    results: [
      "PageSpeed SEO score from ~62 to 92, best practices 100.",
      "Largest Contentful Paint cut from 5.2s+ to 2.6s; images from 33MB to 4.7MB.",
      "A new search-optimised article every day with zero manual work.",
    ],
    stack: ["Claude API", "Vercel Cron", "Static HTML", "Telegram Bot", "Schema.org", "Google Business Profile"],
    services: ["ai-growth-system", "ai-content-automation", "seo-growth-setup", "ai-audit-implementation"],
  },
  {
    slug: "training-matrix",
    name: "Training Matrix",
    category: "Website + AI Client App · Sold",
    tagline:
      "We built a full AI fitness platform, then sold it to a Dubai personal trainer as his branded website and private client app, in English and Persian.",
    color: "#e8ff47",
    status: "Live client",
    href: "https://trainingmatrixdubai.com",
    log: "AI plan drafted for Ramin's review · training matrix",
    size: "tall",
    metrics: [
      { label: "Delivered", value: "Site + client app" },
      { label: "Languages", value: "EN / FA" },
      { label: "Website pages", value: "22" },
      { label: "Exercise videos", value: "200+" },
    ],
    challenge:
      "Ramin is an Active IQ Level 3 personal trainer coaching across Dubai in English and Persian. He needed a way to win new clients online and keep existing ones on track between sessions, without paying for a big agency or juggling five different apps.",
    solution: [
      "A bilingual public website at trainingmatrixdubai.com, fully right-to-left in Persian: coach profile, programs and prices, training guides and Dubai area pages, all built to rank on Google in both languages.",
      "A one-minute \"find your fit\" assessment that opens WhatsApp with the visitor's answers already filled in, so every lead arrives with context and Ramin can reply in seconds.",
      "A free first session offer front and centre, with packages from AED 2,000 shown clearly, and analytics that only run with the visitor's consent.",
      "Our own AI fitness platform, PulseAI, rebranded and handed over as Ramin's private client app at app.trainingmatrixdubai.com: his logo and colours, Ramin as the only coach, invite-only access for his active clients.",
      "Claude drafts each client's weekly plan from their real training history; Ramin reviews it, edits it or assigns his own program. Clients get 200+ exercise videos with an interactive body map.",
      "One-tap \"I did it\" workout logging with an effort rating and a weekly AI recap, so Ramin sees how every client is actually training, not just whether they showed up.",
    ],
    results: [
      "A product we built in-house became a sold, fully branded platform for a real Dubai business.",
      "Ramin runs his website, bookings and client coaching from one connected system, in two languages.",
      "Leads arrive on WhatsApp with their goals and experience already written out.",
      "Clients stay accountable between sessions, and Ramin's coaching scales without more hours in the day.",
    ],
    stack: ["Next.js", "Supabase", "Claude API", "Vercel", "WhatsApp", "EN / FA (RTL)"],
    services: ["cinematic-websites", "custom-ai-agents", "seo-growth-setup", "ai-growth-system"],
  },
  {
    slug: "khodro-dubai",
    name: "Khodro Dubai",
    category: "AI Growth System · Automotive",
    tagline:
      "A made-to-order Dubai → Iran car import brand: a 216-page Persian site, real car listings and an AI content engine, built around one promise — a refundable deposit.",
    color: "#f59e0b",
    status: "Live product",
    href: "https://khodrodubai.com",
    log: "Rendering short reel · Land Cruiser TXL · khodrodubai",
    size: "wide",
    metrics: [
      { label: "Pages generated", value: "216" },
      { label: "Brands · models", value: "13 · 96" },
      { label: "AI articles", value: "73" },
      { label: "Per car", value: "Page + reel + post" },
    ],
    challenge:
      "Importing a car from Dubai to Iran is a trust business. Buyers fear scams, need proof the car is real, and want to know exactly what happens to their money. Every car also needs its own page, photos and social content, which no small team can produce by hand.",
    solution: [
      "Designed a right-to-left Persian brand site around a refundable deposit and a 6-step process, so a buyer sees exactly what happens before paying anything.",
      "A site generator builds every page from one data file: 13 brand pages, 96 model pages, a page per real car with its photos, price in toman, mileage and plate type, plus the sitemap.",
      "A Telegram intake bot: the team drops a car's details and photos, and the listing page, a short video reel rendered in code (Remotion) and a social post come out the other side.",
      "A daily AI writer published 73 Persian buying guides (free-zone plates, avoiding scams, electric cars) to answer the questions buyers actually search.",
      "Cars found by our Sourcing Desk agent cross straight into the site, so sourcing and selling share one pipeline.",
    ],
    results: [
      "One input becomes a full content package for every car: page, reel and post.",
      "216 search-ready pages generated from a single data file — nothing to keep in sync by hand.",
      "Trust-first copy for a high-ticket purchase: refundable deposit, inspection report and real walkaround video for every car.",
    ],
    stack: ["Node.js site generator", "Remotion", "Claude API", "Telegram Bot", "Vercel", "GitHub Actions"],
    services: ["ai-growth-system", "ai-video-ads", "ai-content-automation", "ai-audit-implementation"],
    gallery: [
      {
        src: "/work/khodro-dubai/car-page.jpg", width: 1600, height: 1000,
        alt: "Khodro Dubai car page for an Infiniti QX80 with real photos, price in toman, mileage and plate type",
        caption: "Every real car gets its own page, generated automatically: real photos, price in toman, year, mileage and which plate it can take, with a one-tap WhatsApp enquiry.",
      },
      {
        src: "/work/khodro-dubai/process.jpg", width: 1600, height: 1000,
        alt: "Khodro Dubai process page explaining the refundable deposit and 6-step import process",
        caption: "The trust page: a 6-step process, a refundable deposit and a one-month delivery promise, explained before the buyer pays anything.",
      },
      {
        src: "/work/khodro-dubai/brands.jpg", width: 1600, height: 1000,
        alt: "Khodro Dubai catalogue with 13 importable brands and filters for plate type, brand and year",
        caption: "The catalogue: 13 brands that can legally be imported, 96 model pages, and filters by plate type, brand, condition and year.",
      },
      {
        src: "/work/khodro-dubai/mobile.jpg", width: 416, height: 900,
        alt: "Khodro Dubai homepage on a phone",
        caption: "Built mobile-first in Persian, right to left — most buyers arrive from Instagram and Telegram on their phones.",
      },
    ],
  },
  {
    slug: "khodro-sourcing-desk",
    name: "Sourcing Desk",
    category: "AI Agent · Automotive",
    tagline:
      "Ask for a car in plain words and the desk finds every matching listing across 8 UAE marketplaces, sorts them into one table, and handles the WhatsApp conversations with sellers.",
    color: "#f97316",
    status: "Internal system",
    log: "Scanning UAE listings · 140 matches found",
    size: "sm",
    metrics: [
      { label: "Cars tracked", value: "3,237" },
      { label: "Marketplaces", value: "8" },
      { label: "Client requests", value: "57" },
      { label: "Dealer messages", value: "3,596" },
    ],
    challenge:
      "Finding one specific car for a client meant hours across Dubizzle, DubiCars, YallaMotor and more, then comparing messy listings by hand, calling dealers one by one and remembering who said what.",
    solution: [
      "A scout agent: type a request the way a client says it (\"Land Cruiser VXR 2026, white\") and it sweeps 8 sources — DubiCars, Dubizzle, YallaMotor, OpenSooq, CarSwitch, AutoAE, Automall and Facebook Marketplace.",
      "Every result is cleaned, de-duplicated and put into one sortable table with price, landed cost, mileage, spec and whether the car can clear on the client's plate type in Iran.",
      "A trim and market guide built from the listings themselves: how many of each trim are for sale, the median price and which features each one really has.",
      "A WhatsApp assistant drafts a natural message to each seller, reads the replies, fills in missing details and keeps a permanent seller book. A human approves before anything is sent.",
      "Re-sweeps track price drops, relisted cars and cars that have sold, and finished picks go straight onto the Khodro Dubai site.",
    ],
    results: [
      "57 client requests worked, 3,237 cars tracked and 573 dealers in the seller book.",
      "Hours of searching per car became one request and one table.",
      "Every option side by side with its true landed cost, so the client decides in minutes.",
    ],
    stack: ["Python", "SQLite", "Chrome extension", "Claude API", "WhatsApp", "Telegram Bot"],
    services: ["custom-ai-agents", "ai-audit-implementation"],
    gallery: [
      {
        src: "/work/khodro-sourcing-desk/listings.jpg", width: 1600, height: 1000,
        alt: "Sourcing Desk table of 140 Toyota Land Cruiser 2026 listings with price, landed cost, spec, plate verdict and WhatsApp button",
        caption: "One request, \"Land Cruiser 2026\": 140 cars from 6 marketplaces in one table, with the median price, the best deal, landed cost, plate verdict and a WhatsApp button for each seller. Seller numbers are hidden here.",
      },
      {
        src: "/work/khodro-sourcing-desk/trim-guide.jpg", width: 1600, height: 1000,
        alt: "Sourcing Desk trim and market guide showing ads, median price and features per trim",
        caption: "The trim and market guide: the desk reads every ad and shows how many of each trim are for sale, the median price and which features each one really has. You can also ask it questions in plain words.",
      },
    ],
  },
  {
    slug: "deepdive",
    name: "Deepdive",
    category: "AI Research Agent",
    tagline:
      "A private research analyst: give it any topic and it returns one organised, sourced brief instead of a hundred tabs.",
    color: "#57a0e5",
    status: "Internal system",
    log: "Brief ready · 38 sources merged into 1",
    size: "sm",
    metrics: [
      { label: "Input", value: "Any topic" },
      { label: "Output", value: "One sourced brief" },
    ],
    challenge:
      "Staying on top of a fast-moving subject means reading the same story twenty times from slanted sources.",
    solution: [
      "Plans the research, searches the open web from several angles and fills gaps automatically.",
      "Collapses duplicate stories and scores each source.",
      "Writes one grouped brief with links, ready to act on.",
    ],
    results: [
      "Hours of reading turned into a single brief.",
      "Built with strict rules: no paywall scraping, and one failing source never stops a run.",
    ],
    stack: ["Python", "Claude API", "Search APIs", "Autonomous agents"],
    services: ["custom-ai-agents"],
  },
  {
    slug: "hyperliquid-bot",
    name: "HyperLiquid Bot",
    category: "Algorithmic Trading Agent",
    tagline:
      "A fully automated trading agent that scans, filters and executes every 60 seconds — with risk capped by design.",
    color: "#34d399",
    status: "Internal system",
    log: "Scan complete · 10 coins · 5 indicators · risk OK",
    size: "wide",
    metrics: [
      { label: "Cycle", value: "60s" },
      { label: "Indicators", value: "5 per coin" },
      { label: "Max open", value: "3 trades" },
    ],
    challenge:
      "Manual trading is slow and emotional. A system needed to watch the market every minute and stick to the rules.",
    solution: [
      "Scans the top 10 coins by volume and computes RSI, MACD, EMA, Bollinger Bands and volume.",
      "Filters signals against live news sentiment and whale activity.",
      "Places orders with automatic stop-loss and take-profit, and logs every trade.",
    ],
    results: [
      "Runs 24/7 on live markets without supervision.",
      "Low leverage, fixed position size and a cap on open trades keep risk controlled.",
    ],
    stack: ["Python", "HyperLiquid API", "News sentiment", "Risk engine"],
    services: ["custom-ai-agents"],
  },
  {
    slug: "flowcast",
    name: "FlowCast",
    category: "AI Content Pipeline",
    tagline:
      "Brief in, finished videos and images out. One approval, then everything lands in Google Drive.",
    color: "#ec4899",
    status: "Internal system",
    log: "Video approved · saved to Drive · flowcast",
    size: "wide",
    metrics: [
      { label: "Human steps", value: "1 approval" },
      { label: "Output", value: "Video + images" },
    ],
    challenge:
      "Producing video content for every product or post takes a team. Small businesses can't afford that.",
    solution: [
      "An n8n workflow where AI agents turn a short brief into scripts and prompts.",
      "Generates video with Kling and images, then asks for one approval on Telegram.",
      "Saves the approved files to Google Drive automatically.",
    ],
    results: [
      "End-to-end video generation working live.",
      "Used to create the exercise videos in the Training Matrix client app.",
    ],
    stack: ["n8n", "Claude API", "Kling", "Telegram", "Google Drive"],
    services: ["ai-video-ads", "ai-visual-content", "ai-content-automation"],
  },
  {
    slug: "ruflow",
    name: "RuFlow",
    category: "AI Development System",
    tagline:
      "Our in-house AI engineering setup — the reason we ship complete systems in days, not months.",
    color: "#c084fc",
    status: "Internal system",
    log: "Agents shipped 3 commits · ruflow",
    size: "wide",
    metrics: [
      { label: "Typical build", value: "Days" },
      { label: "Memory", value: "Per project" },
    ],
    challenge:
      "Building websites, bots and automations for many clients at once needs speed without losing quality.",
    solution: [
      "A coding agent setup with shared project memory, known-issues libraries and reusable skills.",
      "Every new project inherits fixes and patterns from the ones before it.",
    ],
    results: [
      "Every project on this page was built with it.",
      "Faster delivery and lower prices for clients.",
    ],
    stack: ["Claude Code", "Agent swarms", "Project memory"],
    services: ["custom-ai-agents"],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
