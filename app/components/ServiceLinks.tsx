import Link from "next/link";
import type { Service } from "@/lib/services";

/** Cards linking to service pages, used on blog posts, the blog index and other service pages. */
export default function ServiceLinks({ title, items }: { title: string; items: Service[] }) {
  if (items.length === 0) return null;
  return (
    <section className="mt-16">
      <h2 className="text-sm font-black uppercase tracking-[0.25em] text-[#525252] mb-5">{title}</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((s) => (
          <Link key={s.slug} href={`/services/${s.slug}`}
            className="group rounded-xl border border-white/5 bg-[#111] p-6 hover:border-[#a855f7]/40 transition-colors">
            <h3 className="text-lg font-black text-[#fafafa] group-hover:text-[#c084fc] transition-colors">{s.title}</h3>
            <p className="mt-2 text-sm text-[#737373] line-clamp-2">{s.answer.split(". ")[0]}.</p>
            <span className="mt-4 inline-block text-xs font-black uppercase tracking-[0.15em] text-[#a3a3a3] group-hover:text-[#fafafa]">
              {s.price} · {s.timeline} →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
