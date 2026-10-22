import Link from "next/link";
import { services } from "@/lib/services";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-16 px-6 md:px-12 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="font-black text-lg tracking-[0.15em] uppercase">
            <span className="text-[#a855f7]">F21</span>
            <span className="text-[#fafafa]"> STUDIO</span>
          </Link>
          <p className="mt-4 text-sm text-[#737373] max-w-[38ch]">
            AI agency in Dubai building websites, content automation, SEO and AI agents for small businesses worldwide.
          </p>
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-black text-[#25d366]">
            WhatsApp us →
          </a>
        </div>
        <nav aria-label="Services">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#525252] mb-4">Services</p>
          <ul className="space-y-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-sm text-[#a3a3a3] hover:text-[#fafafa]">{s.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Work">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#525252] mb-4">Work</p>
          <ul className="space-y-2">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link href={`/work/${p.slug}`} className="text-sm text-[#a3a3a3] hover:text-[#fafafa]">{p.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="max-w-7xl mx-auto mt-14 text-[#525252] text-xs" style={{ maxWidth: "none" }}>
        © {new Date().getFullYear()} F21 Studio · Dubai, UAE · Built with AI.
      </p>
    </footer>
  );
}
