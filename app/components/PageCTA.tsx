import { site } from "@/lib/site";

export default function PageCTA({ title = "Want a system like this?" }: { title?: string }) {
  return (
    <section className="mt-24 rounded-2xl border border-[#a855f7]/30 bg-[#1a0d2e] p-10 md:p-14 text-center">
      <h2 className="text-3xl md:text-5xl font-black uppercase text-[#fafafa] tracking-[-0.03em]">{title}</h2>
      <p className="text-[#a3a3a3] mt-4 mx-auto">Tell us about your business. We reply within 24 hours with a plan and a price.</p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href={site.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="px-9 py-4 bg-[#25d366] hover:bg-[#1db954] text-white font-black text-sm uppercase tracking-[0.07em] transition-colors"
        >
          Chat on WhatsApp
        </a>
        <a
          href="/#contact"
          className="px-9 py-4 border border-white/15 hover:border-[#a855f7]/60 text-[#fafafa] font-black text-sm uppercase tracking-[0.07em] transition-colors"
        >
          Send a message
        </a>
      </div>
    </section>
  );
}
