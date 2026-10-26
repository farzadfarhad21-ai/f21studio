import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import JsonLd from "./components/JsonLd";
import { site } from "@/lib/site";
import { services } from "@/lib/services";

const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-DQHNJGLC8P"; // GA4 property "F21 Studio"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s | F21 Studio" },
  description: site.description,
  keywords: [
    "AI agency Dubai",
    "AI website design",
    "AI content automation",
    "SEO agency Dubai",
    "AI agents for small business",
    "Persian website design",
    "bilingual English Farsi website",
    "luxury website design",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: site.url,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  robots: { index: true, follow: true },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#org`,
      name: site.name,
      url: site.url,
      description: site.description,
      founder: { "@type": "Person", name: site.founder },
      address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
      areaServed: site.areaServed,
      knowsLanguage: ["en", "fa"],
      contactPoint: { "@type": "ContactPoint", contactType: "sales", url: site.whatsapp, availableLanguage: ["English", "Persian"] },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.title, url: `${site.url}/services/${s.slug}` },
        })),
      },
    },
    { "@type": "WebSite", "@id": `${site.url}/#website`, url: site.url, name: site.name, publisher: { "@id": `${site.url}/#org` } },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <JsonLd data={orgSchema} />
        {children}
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="lazyOnload" />
            <Script id="ga" strategy="lazyOnload">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
