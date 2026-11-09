export type Service = {
  slug: string;
  title: string;
  /** One-sentence direct answer — shown first on the page (good for AI search). */
  answer: string;
  price: string;
  timeline: string;
  featured?: boolean;
  /** Label on featured cards; defaults to "★ Flagship Service". */
  badge?: string;
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
  {
    slug: "ai-audit-implementation",
    title: "AI Audit & Implementation",
    badge: "★ Start here",
    answer:
      "An AI audit and implementation is when an AI consultant studies how your business runs, finds the jobs AI can take over, then builds and installs those systems for you. F21 Studio does both parts, so you get working tools, not a report.",
    price: "$1,500–$10,000",
    timeline: "1–6 weeks",
    featured: true,
    includes: [
      "A one-week audit: interviews with you and your team about how work gets done today",
      "A map of every repeated task, with the hours and cost it takes",
      "A ranked list of what AI should take over first, with expected savings",
      "We build the top systems: agents, automations, content and reporting",
      "Training for your team and a month of support after launch",
    ],
    idealFor: ["Owners who know AI matters but don't know where to start", "Teams buried in manual admin", "Sourcing, sales and service businesses", "Companies that want a part-time head of AI"],
    faqs: [
      {
        q: "What is an AI audit?",
        a: "An AI audit is a short review of how your business works, done by an AI consultant. It lists the tasks that eat your team's time and shows which ones AI can do faster or cheaper, ranked by how much they save.",
      },
      {
        q: "What does an AI implementation consultant do?",
        a: "An AI implementation consultant goes into a business, finds where AI can help, then builds and installs the tools: for example an agent that searches suppliers, a bot that answers customers, or a system that writes and publishes content every day.",
      },
      {
        q: "Do I have to build everything you recommend?",
        a: "No. The audit is useful on its own. Most clients start with the one or two systems that save the most time, then add more once they see results.",
      },
      {
        q: "Can you be our part-time head of AI?",
        a: "Yes. After the first build, F21 Studio can stay on as a fractional AI officer for a monthly fee: we keep the systems running, watch new AI tools and add what's worth it.",
      },
      {
        q: "Is this only for big companies?",
        a: "No. It's built for small and medium businesses. Our own example is the Khodro Dubai sourcing desk: one AI system that searches 8 car marketplaces and handles thousands of dealer messages for a small team.",
      },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

// Words that tie a blog post to a service, so each post can link to the most relevant service pages.
const serviceKeywords: Record<string, string[]> = {
  "ai-growth-system": ["growth", "customer", "lead", "small business", "marketing", "signup", "sales"],
  "cinematic-websites": ["website", "web design", "landing page", "site", "brand", "browser"],
  "ai-content-automation": ["content", "blog", "article", "post", "social", "newsletter", "writing", "email"],
  "seo-growth-setup": ["seo", "search", "google", "ai mode", "ranking", "robots", "crawl", "overview", "perplexity"],
  "custom-ai-agents": ["agent", "bot", "assistant", "automat", "workflow", "api", "chatbot", "computer use", "login", "text message"],
  "ai-video-ads": ["video", "reel", "ads", "advert", "youtube", "tiktok", "campaign"],
  "ai-audit-implementation": ["audit", "consult", "implement", "strategy", "adopt", "roadmap", "your team", "company", "companies"],
  "ai-visual-content": ["image", "picture", "photo", "design", "canva", "gif", "visual", "illustration"],
};

export function relatedServices(post: { title: string; description: string; tags: string[] }, count = 2): Service[] {
  const title = post.title.toLowerCase();
  const tags = post.tags.join(" ").toLowerCase();
  const desc = post.description.toLowerCase();
  const scored = services
    .map((s) => ({
      s,
      score: (serviceKeywords[s.slug] ?? []).reduce((n, k) => {
        const word = new RegExp(`\\b${k}`); // match at word start, so "ads" doesn't hit "downloads"
        return n + (word.test(title) ? 3 : 0) + (word.test(tags) ? 2 : 0) + (word.test(desc) ? 1 : 0);
      }, 0),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.s);
  // Top up with the flagship services so every post shows `count` cards.
  const fallbacks = ["ai-growth-system", "custom-ai-agents"].map((slug) => services.find((s) => s.slug === slug)!);
  return [...scored, ...fallbacks].filter((s, i, all) => all.indexOf(s) === i).slice(0, count);
}
