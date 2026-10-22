import JsonLd from "./JsonLd";

const faqs = [
  {
    q: "What does F21 Studio do?",
    a: "F21 Studio is a Dubai-based AI agency. We build websites, automated daily content, SEO systems and custom AI agents for small businesses, then keep them running.",
  },
  {
    q: "How much does an AI website or growth system cost?",
    a: "Websites start from $1,500. A full AI growth system — website, daily content, SEO and social automation — ranges from $2,000 to $8,000 depending on scope.",
  },
  {
    q: "Do you work with clients outside Dubai?",
    a: "Yes. We work remotely with businesses in the UAE, Canada, the US, the UK and Europe.",
  },
  {
    q: "Can you build Persian (Farsi) or bilingual websites?",
    a: "Yes. We build right-to-left Persian sites and English/Persian bilingual sites, including Rahil Therapy and PulseAI.",
  },
  {
    q: "How fast can you launch?",
    a: "Most websites launch in one to two weeks. Full AI growth systems take two to four weeks.",
  },
];

export default function HomeFAQ() {
  return (
    <section id="faq" className="relative py-32 px-6 md:px-12 border-t border-white/5 bg-[#0a0a0a]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
      <div className="max-w-4xl mx-auto">
        <p className="text-[11px] font-black tracking-[0.45em] uppercase text-[#a855f7] mb-3">FAQ</p>
        <h2 className="text-4xl md:text-5xl font-black text-[#fafafa] uppercase tracking-[-0.03em] mb-12">Questions clients ask</h2>
        <div className="divide-y divide-white/5 border-y border-white/5">
          {faqs.map((f) => (
            <details key={f.q} className="group py-6">
              <summary className="cursor-pointer list-none flex justify-between gap-6 text-lg font-black text-[#fafafa]">
                <h3>{f.q}</h3>
                <span className="text-[#a855f7] text-2xl leading-none group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-[#a3a3a3]">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
