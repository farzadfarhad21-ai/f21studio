export type Service = {
  slug: string;
  title: string;
  /** One-sentence direct answer — shown first on the page (good for AI search). */
  answer: string;
  price: string;
  timeline: string;
  featured?: boolean;
  includes: string[];
  idealFor: string[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "ai-growth-system",
    title: "Full AI Growth System",
    answer:
      "An AI growth system is a website plus automated daily content, SEO and social posting that keeps bringing customers without you doing the work. F21 Studio builds and runs it for you.",
    price: "$2,000–$8,000",
    timeline: "2–4 weeks",
    featured: true,
    includes: [
      "Fast, search-optimised website with service and location pages",
      "Daily AI-written articles published to your site automatically",
      "Social posts and Telegram/Instagram content from the same topics",
      "Technical SEO, schema markup, sitemap and Google Business Profile",
      "Monthly report on traffic, rankings and leads",
    ],
    idealFor: ["Clinics and therapists", "Real estate and car dealers", "Consultants", "Local service businesses"],
    faqs: [
      {
        q: "What is included in an AI growth system?",
        a: "A website, a daily content pipeline that writes and publishes articles, social posting, full technical SEO and a Google Business Profile setup. It runs automatically after launch.",
      },
      {
        q: "Do I need to write anything myself?",
        a: "No. You approve the tone and topics once. After that the system writes, illustrates and publishes on its own, and you can review anything at any time.",
      },
      {
        q: "Have you done this for a real business?",
        a: "Yes. Rahil Therapy went from a PageSpeed SEO score of about 62 to 92 and now publishes a new article every day automatically.",
      },
    ],
  },
  {
    slug: "cinematic-websites",
    title: "Luxury Cinematic Websites",
    answer:
      "A cinematic website uses scroll-driven video, motion and editorial design to make a small brand feel premium — while staying fast and easy to find on Google.",
    price: "$1,500–$5,000",
    timeline: "1–2 weeks",
    includes: [
      "Custom design — no templates",
      "Scroll-synced video and smooth animation",
      "Mobile-first, Core Web Vitals optimised",
      "SEO setup and analytics from day one",
      "English, Persian (RTL) or bilingual",
    ],
    idealFor: ["Premium brands", "Restaurants and cafés", "Boutiques", "Personal brands"],
    faqs: [
      {
        q: "How long does a website take?",
        a: "Most sites launch in one to two weeks, depending on content and the number of pages.",
      },
      {
        q: "Will animations slow my site down?",
        a: "No. Video and motion are compressed and loaded smartly, and every site is tested against Google's Core Web Vitals before launch.",
      },
      {
        q: "Can you build Persian or bilingual websites?",
        a: "Yes. We build full right-to-left Persian sites and English/Persian bilingual sites, like Rahil Therapy and Training Matrix.",
      },
    ],
  },
  {
    slug: "ai-content-automation",
    title: "AI Content Automation",
    answer:
      "AI content automation means articles, social posts and Telegram updates are written by AI in your brand voice and published on a schedule — without anyone on your team doing it.",
    price: "$500–$3,000",
    timeline: "1–2 weeks",
    includes: [
      "Daily or weekly blog articles in your voice",
      "Matching images generated for every post",
      "Automatic posting to Telegram, Instagram captions and more",
      "Automatic sitemap updates so Google finds new pages fast",
    ],
    idealFor: ["Businesses with an existing site", "Busy owners", "Multi-language audiences"],
    faqs: [
      {
        q: "Will AI content hurt my Google ranking?",
        a: "Not when it is useful and accurate. We set a clear expert tone, choose real customer questions as topics and add proper structure and schema to every article.",
      },
      {
        q: "Which channels can you automate?",
        a: "Your website blog, Telegram channels, Instagram captions, YouTube Shorts and Instagram Reels, depending on the package.",
      },
    ],
  },
  {
    slug: "seo-growth-setup",
    title: "SEO & AI Search Setup",
    answer:
      "Our SEO setup makes your business easy for Google and AI assistants like ChatGPT and Perplexity to understand, trust and recommend.",
    price: "$800–$2,500",
    timeline: "1 week",
    includes: [
      "Meta tags, schema markup and sitemap",
      "Speed and Core Web Vitals fixes",
      "Service, location and FAQ pages written for search",
      "Google Search Console and Business Profile setup",
      "hreflang for multi-language sites",
    ],
    idealFor: ["Sites that don't show up on Google", "Local businesses", "Multi-language businesses"],
    faqs: [
      {
        q: "How quickly will I see SEO results?",
        a: "Technical fixes show in speed and audit scores right away. Rankings usually start moving within four to twelve weeks.",
      },
      {
        q: "Do you optimise for ChatGPT and AI search?",
        a: "Yes. We structure pages with direct answers, FAQs and schema so AI assistants can quote and recommend your business.",
      },
    ],
  },
  {
    slug: "custom-ai-agents",
    title: "Custom AI Agents & Bots",
    answer:
      "A custom AI agent is software that does a repeated job for you — researching, sourcing, replying or monitoring — around the clock.",
    price: "$1,000–$6,000",
    timeline: "1–3 weeks",
    includes: [
      "Telegram and WhatsApp bots",
      "Research and sourcing agents",
      "Data monitoring and alert systems",
      "Integrations with your existing tools",
    ],
    idealFor: ["Teams drowning in manual work", "Sourcing and trading businesses", "Customer support"],
    faqs: [
      {
        q: "What kind of tasks can an AI agent do?",
        a: "Searching marketplaces and summarising results, answering customer questions, writing research briefs, watching data and alerting you, and handing work between your tools.",
      },
      {
        q: "Do I need technical knowledge to use it?",
        a: "No. Most of our agents are used through Telegram, WhatsApp or a simple dashboard.",
      },
    ],
  },
  {
    slug: "ai-video-ads",
    title: "AI Video Ads & Reels",
    answer:
      "AI video ads are short, on-brand videos produced by AI pipelines in hours instead of weeks — ready for Reels, Shorts and paid ads.",
    price: "$500–$2,500",
    timeline: "3–7 days",
    includes: [
      "Scripts written for your audience",
      "AI-generated or code-rendered video",
      "Vertical formats for Reels, Shorts and TikTok",
      "Templates so you can produce more for every product",
    ],
    idealFor: ["Product launches", "Car and real estate listings", "E-commerce"],
    faqs: [
      {
        q: "Can every product get its own video automatically?",
        a: "Yes. Like Khodro Dubai, we can generate a reel for each new listing from its data and photos.",
      },
    ],
  },
  {
    slug: "ai-visual-content",
    title: "AI Visual Content",
    answer:
      "AI visual content is brand imagery, product scenes and social graphics created with AI and finished by a designer's eye.",
    price: "$300–$1,500",
    timeline: "2–5 days",
    includes: ["Hero and product imagery", "Social media graphics", "Consistent brand style across every image"],
    idealFor: ["New brands", "Social-first businesses", "Websites that need visuals"],
    faqs: [
      {
        q: "Do I own the images?",
        a: "Yes. You receive full usage rights for everything we create for you.",
      },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
