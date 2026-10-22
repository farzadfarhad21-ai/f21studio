import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import JsonLd from "../../components/JsonLd";
import PageCTA from "../../components/PageCTA";
import { projects, getProject } from "@/lib/projects";
import { getService } from "@/lib/services";
import { site } from "@/lib/site";

type Params = { params: { slug: string } };

export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));

export function generateMetadata({ params }: Params): Metadata {
  const p = getProject(params.slug);
  if (!p) return {};
  const title = `${p.name} — ${p.category} Case Study`;
  return {
    title,
    description: p.tagline,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { title, description: p.tagline, url: `/work/${p.slug}`, type: "article" },
  };
}

export default function CaseStudy({ params }: Params) {
  const p = getProject(params.slug);
  if (!p) notFound();
  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length];

  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CreativeWork",
              name: `${p.name} case study`,
              headline: p.tagline,
              about: p.category,
              url: `${site.url}/work/${p.slug}`,
              creator: { "@type": "Organization", name: site.name, url: site.url },
              keywords: p.stack.join(", "),
              ...(p.href ? { sameAs: p.href } : {}),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: site.url },
                { "@type": "ListItem", position: 2, name: "Work", item: `${site.url}/#work` },
                { "@type": "ListItem", position: 3, name: p.name, item: `${site.url}/work/${p.slug}` },
              ],
            },
          ],
        }}
      />
      <Navbar />
      <article className="max-w-5xl mx-auto px-6 md:px-12 pt-36 pb-24">
        <nav aria-label="Breadcrumb" className="text-[11px] font-black uppercase tracking-[0.2em] text-[#525252] mb-10">
          <Link href="/" className="hover:text-[#fafafa]">Home</Link> / <Link href="/#work" className="hover:text-[#fafafa]">Work</Link> /{" "}
          <span style={{ color: p.color }}>{p.name}</span>
        </nav>

        <p className="text-[11px] font-black tracking-[0.35em] uppercase" style={{ color: p.color }}>
          {p.category} · {p.status}
        </p>
        <h1 className="mt-4 text-5xl md:text-7xl font-black uppercase text-[#fafafa] tracking-[-0.04em] leading-[0.95]">{p.name}</h1>
        <p className="mt-6 text-xl text-[#a3a3a3] max-w-[60ch]">{p.tagline}</p>
        {p.href && (
          <a href={p.href} target="_blank" rel="noopener" className="inline-block mt-6 text-sm font-black uppercase tracking-[0.15em] hover:underline" style={{ color: p.color }}>
            Visit live site ↗
          </a>
        )}

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          {p.metrics.map((m) => (
            <div key={m.label} className="rounded-xl border border-white/5 bg-[#111] p-5">
              <div className="text-2xl font-black text-[#fafafa]">{m.value}</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#737373] font-black">{m.label}</div>
            </div>
          ))}
        </div>

        <section className="mt-20 grid md:grid-cols-[200px_1fr] gap-6">
          <h2 className="text-sm font-black uppercase tracking-[0.25em] text-[#525252]">The challenge</h2>
          <p className="text-lg text-[#d4d4d4]">{p.challenge}</p>
        </section>

        <section className="mt-14 grid md:grid-cols-[200px_1fr] gap-6">
          <h2 className="text-sm font-black uppercase tracking-[0.25em] text-[#525252]">What we built</h2>
          <ol className="space-y-4">
            {p.solution.map((s, n) => (
              <li key={n} className="flex gap-4 text-[#d4d4d4]">
                <span className="font-mono text-xs mt-1.5" style={{ color: p.color }}>0{n + 1}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14 grid md:grid-cols-[200px_1fr] gap-6">
          <h2 className="text-sm font-black uppercase tracking-[0.25em] text-[#525252]">Results</h2>
          <ul className="space-y-3">
            {p.results.map((r) => (
              <li key={r} className="flex gap-3 text-[#fafafa]">
                <span style={{ color: p.color }}>✓</span>
                {r}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14 grid md:grid-cols-[200px_1fr] gap-6">
          <h2 className="text-sm font-black uppercase tracking-[0.25em] text-[#525252]">Stack</h2>
          <ul className="flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <li key={s} className="px-3 py-1.5 rounded-full border border-white/10 text-xs text-[#a3a3a3]">{s}</li>
            ))}
          </ul>
        </section>

        <section className="mt-14 grid md:grid-cols-[200px_1fr] gap-6">
          <h2 className="text-sm font-black uppercase tracking-[0.25em] text-[#525252]">Services used</h2>
          <ul className="flex flex-wrap gap-3">
            {p.services.map((slug) => {
              const s = getService(slug);
              return s ? (
                <li key={slug}>
                  <Link href={`/services/${slug}`} className="text-sm font-black uppercase tracking-[0.1em] text-[#c084fc] hover:text-[#fafafa]">
                    {s.title} →
                  </Link>
                </li>
              ) : null;
            })}
          </ul>
        </section>

        <PageCTA />

        <Link href={`/work/${next.slug}`} className="group mt-16 flex items-center justify-between border-t border-white/5 pt-10">
          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#525252]">Next project</span>
          <span className="text-3xl md:text-5xl font-black uppercase text-[#fafafa] group-hover:text-[#c084fc] transition-colors">
            {next.name} →
          </span>
        </Link>
      </article>
      <Footer />
    </main>
  );
}
