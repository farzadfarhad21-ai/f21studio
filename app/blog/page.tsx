import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JsonLd from "../components/JsonLd";
import { getAllPosts, formatDate } from "@/lib/blog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI News for Small Business — Daily Notes",
  description:
    "One useful AI story a day, explained for small business owners: what happened, why it matters, and what you can do with it this week.",
  alternates: { canonical: "/blog" },
};

export default function Blog() {
  const posts = getAllPosts();
  const [lead, ...rest] = posts;

  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "F21 Studio — AI notes",
          url: `${site.url}/blog`,
          publisher: { "@id": `${site.url}/#org` },
          blogPost: posts.slice(0, 20).map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: `${site.url}/blog/${p.slug}`,
            datePublished: p.date,
          })),
        }}
      />
      <Navbar />
      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-36 pb-24">
        <p className="text-[11px] font-black tracking-[0.45em] uppercase text-[#a855f7] mb-3">AI notes · daily</p>
        <h1 className="text-5xl md:text-7xl font-black uppercase text-[#fafafa] tracking-[-0.04em] leading-[0.95]">
          The good AI news,
          <br />
          <span className="text-[#525252]">made useful.</span>
        </h1>
        <p className="mt-6 text-lg text-[#a3a3a3] max-w-[58ch]">
          Every morning we pick one AI story worth your time and explain what it means for a small business — in plain words, with links to the sources.
        </p>

        {!lead && <p className="mt-16 text-[#737373]">The first note lands tomorrow morning.</p>}

        {lead && (
          <Link href={`/blog/${lead.slug}`} className="group mt-16 grid md:grid-cols-[1.2fr_1fr] gap-8 items-center">
            {lead.image && (
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/5">
                <Image src={lead.image} alt={lead.imageAlt} fill sizes="(min-width: 768px) 55vw, 100vw" priority
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-700" />
              </div>
            )}
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#737373]">
                {formatDate(lead.date)} · {lead.readingMinutes} min read
              </p>
              <h2 className="mt-3 text-3xl md:text-4xl font-black text-[#fafafa] group-hover:text-[#c084fc] transition-colors leading-tight">
                {lead.title}
              </h2>
              <p className="mt-4 text-[#a3a3a3]">{lead.description}</p>
            </div>
          </Link>
        )}

        {rest.length > 0 && (
          <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group rounded-2xl border border-white/5 bg-[#111] overflow-hidden hover:border-white/15 transition-colors">
                {p.image && (
                  <div className="relative aspect-[16/10]">
                    <Image src={p.image} alt={p.imageAlt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                  </div>
                )}
                <div className="p-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#737373]">{formatDate(p.date)}</p>
                  <h3 className="mt-2 text-lg font-black text-[#fafafa] group-hover:text-[#c084fc] transition-colors leading-snug">{p.title}</h3>
                  <p className="mt-2 text-sm text-[#737373] line-clamp-3">{p.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
