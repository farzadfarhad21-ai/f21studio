import Link from "next/link";
import BlogCover from "./BlogCover";
import { getAllPosts, formatDate } from "@/lib/blog";

export default function LatestPosts() {
  const posts = getAllPosts().slice(0, 3);
  if (!posts.length) return null;

  return (
    <section className="relative py-32 px-6 md:px-12 border-t border-white/5 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-[11px] font-black tracking-[0.45em] uppercase text-[#a855f7] mb-3">AI notes · daily</p>
            <h2 className="text-4xl md:text-5xl font-black text-[#fafafa] uppercase tracking-[-0.03em]">Fresh from the blog</h2>
          </div>
          <Link href="/blog" className="text-sm font-black uppercase tracking-[0.15em] text-[#a3a3a3] hover:text-[#fafafa]">All notes →</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group rounded-2xl border border-white/5 bg-[#111] overflow-hidden hover:border-white/15 transition-colors">
              <div className="relative aspect-[16/10] overflow-hidden">
                <BlogCover post={p} sizes="(min-width: 768px) 33vw, 100vw" className="group-hover:scale-[1.03] transition-transform duration-700" />
              </div>
              <div className="p-6">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#737373]">{formatDate(p.date)}</p>
                <h3 className="mt-2 text-lg font-black text-[#fafafa] group-hover:text-[#c084fc] transition-colors leading-snug">{p.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
