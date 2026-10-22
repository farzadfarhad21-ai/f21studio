import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import JsonLd from "../../components/JsonLd";
import PageCTA from "../../components/PageCTA";
import RichText from "../../components/RichText";
import { getAllPosts, getPost, formatDate } from "@/lib/blog";
import { site } from "@/lib/site";

type Params = { params: { slug: string } };

export const generateStaticParams = () => getAllPosts().map((p) => ({ slug: p.slug }));

export function generateMetadata({ params }: Params): Metadata {
  const p = getPost(params.slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: {
      title: p.title,
      description: p.description,
      url: `/blog/${p.slug}`,
      type: "article",
      publishedTime: p.date,
      tags: p.tags,
      ...(p.image ? { images: [{ url: p.image, alt: p.imageAlt }] } : {}),
    },
  };
}

export default function PostPage({ params }: Params) {
  const p = getPost(params.slug);
  if (!p) notFound();
  const more = getAllPosts().filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BlogPosting",
              headline: p.title,
              description: p.description,
              datePublished: p.date,
              dateModified: p.date,
              url: `${site.url}/blog/${p.slug}`,
              mainEntityOfPage: `${site.url}/blog/${p.slug}`,
              keywords: p.tags.join(", "),
              author: { "@type": "Organization", name: site.name, url: site.url },
              publisher: { "@id": `${site.url}/#org` },
              ...(p.image ? { image: `${site.url}${p.image}` } : {}),
              citation: p.sources.map((s) => s.url),
            },
            ...(p.faq.length
              ? [{
                  "@type": "FAQPage",
                  mainEntity: p.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
                }]
              : []),
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: site.url },
                { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
                { "@type": "ListItem", position: 3, name: p.title, item: `${site.url}/blog/${p.slug}` },
              ],
            },
          ],
        }}
      />
      <Navbar />
      <article className="max-w-3xl mx-auto px-6 pt-36 pb-24">
        <nav aria-label="Breadcrumb" className="text-[11px] font-black uppercase tracking-[0.2em] text-[#525252] mb-8">
          <Link href="/" className="hover:text-[#fafafa]">Home</Link> / <Link href="/blog" className="hover:text-[#fafafa]">Blog</Link>
        </nav>
        <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#a855f7]">
          {formatDate(p.date)} · {p.readingMinutes} min read
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl font-black text-[#fafafa] tracking-[-0.03em] leading-[1.05]">{p.title}</h1>
        <p className="mt-5 text-xl text-[#a3a3a3]">{p.description}</p>

        {p.image && (
          <figure className="mt-10">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/5">
              <Image src={p.image} alt={p.imageAlt} fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
            </div>
            <figcaption className="mt-2 text-xs text-[#525252]">Illustration: F21 Studio</figcaption>
          </figure>
        )}

        {p.takeaways.length > 0 && (
          <aside className="mt-10 rounded-xl border border-[#a855f7]/25 bg-[#a855f7]/[0.06] p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c084fc] mb-3">In 30 seconds</p>
            <ul className="space-y-2">
              {p.takeaways.map((t) => (
                <li key={t} className="flex gap-3 text-[#e5e5e5]"><span className="text-[#a855f7]">→</span><span>{t}</span></li>
              ))}
            </ul>
          </aside>
        )}

        <div className="mt-10 space-y-6 text-[17px] leading-[1.8] text-[#d4d4d4]">
          {p.blocks.map((b, i) => {
            if (b.type === "h2") return <h2 key={i} className="pt-6 text-2xl font-black text-[#fafafa] tracking-[-0.02em]">{b.text}</h2>;
            if (b.type === "quote")
              return <blockquote key={i} className="border-l-2 border-[#a855f7] pl-5 italic text-[#e5e5e5]"><RichText text={b.text} /></blockquote>;
            if (b.type === "ul")
              return (
                <ul key={i} className="list-disc pl-6 space-y-2 marker:text-[#a855f7]">
                  {b.items.map((it, j) => <li key={j}><RichText text={it} /></li>)}
                </ul>
              );
            return <p key={i} style={{ maxWidth: "none" }}><RichText text={b.text} /></p>;
          })}
        </div>

        {p.faq.length > 0 && (
          <section className="mt-14">
            <h2 className="text-2xl font-black text-[#fafafa] mb-4">Quick answers</h2>
            <div className="divide-y divide-white/5 border-y border-white/5">
              {p.faq.map((f) => (
                <details key={f.q} className="group py-4">
                  <summary className="cursor-pointer list-none flex justify-between gap-6 font-black text-[#fafafa]">
                    <h3>{f.q}</h3>
                    <span className="text-[#a855f7] group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-2 text-[#a3a3a3]">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        <section className="mt-14">
          <h2 className="text-sm font-black uppercase tracking-[0.25em] text-[#525252] mb-3">Sources</h2>
          <ul className="space-y-2 text-sm">
            {p.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener" className="text-[#a3a3a3] hover:text-[#fafafa] underline underline-offset-4 decoration-white/20">
                  {s.title}
                </a>{" "}
                <span className="text-[#525252]">— {s.publisher}</span>
              </li>
            ))}
          </ul>
        </section>

        <PageCTA title="Want AI working in your business?" />

        {more.length > 0 && (
          <section className="mt-16">
            <h2 className="text-sm font-black uppercase tracking-[0.25em] text-[#525252] mb-5">More AI notes</h2>
            <ul className="space-y-4">
              {more.map((m) => (
                <li key={m.slug}>
                  <Link href={`/blog/${m.slug}`} className="text-lg font-black text-[#fafafa] hover:text-[#c084fc]">{m.title} →</Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
      <Footer />
    </main>
  );
}
