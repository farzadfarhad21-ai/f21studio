import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";
import { services } from "@/lib/services";
import { getAllPosts } from "@/lib/blog";

// Fixed date for pages that only change when we edit them by hand. Bump it when the
// homepage, services or case studies change, so Google can trust our lastmod dates.
const SITE_UPDATED = new Date("2026-11-11");

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const now = SITE_UPDATED;
  const newestPost = posts[0] ? new Date(posts[0].date) : now;
  return [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...services.map((s) => ({
      url: `${site.url}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: `${site.url}/blog`, lastModified: newestPost, changeFrequency: "daily" as const, priority: 0.8 },
    ...posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...projects.map((p) => ({
      url: `${site.url}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
