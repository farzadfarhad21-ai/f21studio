"use client";
import { useState } from "react";
import Image from "next/image";

// Thumbnail first, real player only after a click: keeps the page fast.
export default function YouTubeEmbed({ id, title, channel }: { id: string; title: string; channel: string }) {
  const [play, setPlay] = useState(false);

  return (
    <figure className="my-10">
      <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black">
        {play ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <button onClick={() => setPlay(true)} aria-label={`Play video: ${title}`} className="group absolute inset-0 w-full h-full">
            <Image src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" fill sizes="(min-width: 768px) 768px, 100vw" className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-16 h-16 rounded-full bg-[#a855f7] group-hover:scale-110 transition-transform flex items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.5)]">
                <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white ml-1" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
              </span>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-2 text-xs text-[#737373]">
        ▶ Watch: {title} <span className="text-[#525252]">· {channel} on YouTube</span>
      </figcaption>
    </figure>
  );
}
