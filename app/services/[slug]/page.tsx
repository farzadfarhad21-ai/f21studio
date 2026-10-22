import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import JsonLd from "../../components/JsonLd";
import PageCTA from "../../components/PageCTA";
import { services, getService } from "@/lib/services";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

type Params = { params: { slug: string } };

export const generateStaticParams = () => services.map((s) => ({ slug: s.slug }));

export function generateMetadata({ params }: Params): Metadata {
  const s = getService(params.slug);
  if (!s) return {};
  const title = `${s.title} — Dubai & Worldwide`;
  return {
    title,
    description: s.answer,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title, description: s.answer, url: `/services/${s.slug}` },
  };
}

export default function ServicePage({ params }: Params) {
  const s = getService(params.slug);
  if (!s) notFound();
  const work = projects.filter((p) => p.services.includes(s.slug));

  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              name: s.title,
              description: s.answer,
              serviceType: s.title,
              url: `${site.url}/services/${s.slug}`,
              provider: { "@type": "Organization", name: site.name, url: site.url },
              areaServed: site.areaServed,
              offers: { "@type": "Offer", description: `${s.price} · ${s.timeline}` },
            },
            {
              "@type": "FAQPage",
              mainEntity: s.faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: site.url },
                { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/#services` },
                { "@type": "ListItem", position: 3, name: s.title, item: `${site.url}/services/${s.slug}` },
              ],
            },
          ],
        }}
      />
      <Navbar />
      <article className="max-w-5xl mx-auto px-6 md:px-12 pt-36 pb-24">
        <nav aria-label="Breadcrumb" className="text-[11px] font-black uppercase tracking-[0.2em] text-[#525252] mb-10">
          <Link href="/" className="hover:text-[#fafafa]">Home</Link> / <Link href="/#services" className="hover:text-[#fafafa]">Services</Link> /{" "}
          <span className="text-[#a855f7]">{s.title}</span>
        </nav>

        <h1 className="text-5xl md:text-7xl font-black uppercase text-[#fafafa] tracking-[-0.04em] leading-[0.95]">{s.title}</h1>
        <p className="mt-8 text-xl text-[#d4d4d4] max-w-[62ch]">{s.answer}</p>

        <div className="mt-10 grid grid-cols-2 gap-4 max-w-md">
          <div className="rounded-xl border border-white/5 bg-[#111] p-5">
            <div className="text-2xl font-black text-[#a855f7]">{s.price}</div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#737373] font-black">Investment</div>
          </div>
          <div className="rounded-xl border border-white/5 bg-[#111] p-5">
            <div className="text-2xl font-black text-[#fafafa]">{s.timeline}</div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#737373] font-black">Timeline</div>
          </div>
        </div>

        <section className="mt-20 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.25em] text-[#525252] mb-5">What&apos;s included</h2>
            <ul className="space-y-3">
              {s.includes.map((x) => (
                <li key={x} className="flex gap-3 text-[#d4d4d4]"><span className="text-[#a855f7]">✓</span>{x}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.25em] text-[#525252] mb-5">Ideal for</h2>
            <ul className="flex flex-wrap gap-2">
              {s.idealFor.map((x) => (
                <li key={x} className="px-3 py-1.5 rounded-full border border-white/10 text-sm text-[#a3a3a3]">{x}</li>
              ))}
            </ul>
          </div>
        </section>

        {work.length > 0 && (
          <section className="mt-20">
            <h2 className="text-sm font-black uppercase tracking-[0.25em] text-[#525252] mb-5">Proof — live projects</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {work.map((p) => (
                <Link key={p.slug} href={`/work/${p.slug}`}
                  className="group rounded-xl border border-white/5 bg-[#111] p-6 hover:border-white/15 transition-colors">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: p.color }}>{p.category}</p>
                  <h3 className="mt-2 text-xl font-black uppercase text-[#fafafa]">{p.name}</h3>
                  <p className="mt-2 text-sm text-[#737373]">{p.tagline}</p>
                  <span className="mt-4 inline-block text-xs font-black uppercase tracking-[0.15em] text-[#a3a3a3] group-hover:text-[#fafafa]">
                    Read case study →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mt-20">
          <h2 className="text-sm font-black uppercase tracking-[0.25em] text-[#525252] mb-5">Questions</h2>
          <div className="divide-y divide-white/5 border-y border-white/5">
            {s.faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="cursor-pointer list-none flex justify-between gap-6 text-lg font-black text-[#fafafa]">
                  <h3>{f.q}</h3>
                  <span className="text-[#a855f7] group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-[#a3a3a3]">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <PageCTA title={`Get a quote for ${s.title.toLowerCase()}`} />
      </article>
      <Footer />
    </main>
  );
}
