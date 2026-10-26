// Tell Bing (and other IndexNow engines) about every URL in the live sitemap.
// Usage: node scripts/indexnow.mjs   (run after a deploy is live)

const HOST = "www.f21studio.com";
const KEY = "013996c4a42f43c6b073f1764541bd40"; // public/<KEY>.txt must be live

const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urlList.length) throw new Error("sitemap has no URLs");

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: ${res.status} for ${urlList.length} URLs`);
if (res.status >= 400) process.exit(1);
