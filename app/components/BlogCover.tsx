import Image from "next/image";
import type { Post } from "@/lib/blog";

// Post picture, or a branded cover when a post has none (image service down).
export default function BlogCover({ post, sizes, priority = false, className = "" }: { post: Post; sizes: string; priority?: boolean; className?: string }) {
  if (post.image) {
    return <Image src={post.image} alt={post.imageAlt} fill sizes={sizes} priority={priority} className={`object-cover ${className}`} />;
  }
  const seed = Array.from(post.slug).reduce((n, c) => (n * 31 + c.charCodeAt(0)) % 360, 7);
  return (
    <div
      role="img"
      aria-label={post.imageAlt}
      className="absolute inset-0 flex flex-col justify-between p-6 md:p-8"
      style={{
        background: `radial-gradient(circle at ${20 + (seed % 60)}% ${30 + (seed % 40)}%, hsla(${270 + (seed % 40)},85%,55%,0.55), transparent 55%),
          radial-gradient(circle at ${80 - (seed % 50)}% 85%, hsla(${300 + (seed % 30)},80%,50%,0.35), transparent 50%), #0c0912`,
      }}
    >
      <span className="font-black text-xs tracking-[0.2em] uppercase">
        <span className="text-[#c084fc]">F21</span> <span className="text-[#fafafa]">AI notes</span>
      </span>
      <span className="font-black text-[#fafafa] text-xl md:text-2xl leading-tight max-w-[22ch] line-clamp-3">{post.title}</span>
    </div>
  );
}
