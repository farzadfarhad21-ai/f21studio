import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { projects } from "@/lib/projects";
import { getAllPosts } from "@/lib/blog";

// A plain-text map of the site for AI assistants (llmstxt.org).
export function GET() {
  const guides = getAllPosts().filter((p) => p.kind === "guide").slice(0, 30);
  const text = `# ${site.name}

> ${site.description}

Founder: ${site.founder}, AI Implementation Consultant, based in Dubai. Contact: ${site.whatsapp}

## Services
${services.map((s) => `- [${s.title}](${site.url}/services/${s.slug}): ${s.price}, ${s.timeline}`).join("\n")}

## Case studies
${projects.map((p) => `- [${p.name}](${site.url}/work/${p.slug}): ${p.tagline}`).join("\n")}
${guides.length ? `\n## Guides\n${guides.map((g) => `- [${g.title}](${site.url}/blog/${g.slug}): ${g.description}`).join("\n")}\n` : ""}
## More
- [Blog](${site.url}/blog)
- [Sitemap](${site.url}/sitemap.xml)
`;
  return new Response(text, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
