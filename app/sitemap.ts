import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";
import { services } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...services.map((s) => ({
      url: `${site.url}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...projects.map((p) => ({
      url: `${site.url}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
