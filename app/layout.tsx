import type { Metadata, Viewport } from "next";
import "@fontsource-variable/jetbrains-mono/wght.css";
import "./globals.css";
import { profile } from "@/content/profile";
import { Loader } from "@/components/shell/Loader";
import { SiteNav } from "@/components/shell/SiteNav";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { Toast } from "@/components/shell/Toast";
import { Analytics } from "@/components/shell/Analytics";

const description = `${profile.name} is a software engineer in Bengaluru with ${profile.experience} years building scalable web products with React, TypeScript and Next.js — now working with AI agents and MCP.`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${profile.name.toUpperCase()} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description,
  keywords: [...profile.keywords],
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  openGraph: {
    type: "profile",
    siteName: profile.name,
    title: `${profile.name} — ${profile.role}`,
    description,
    locale: "en_IN",
    images: [{ url: "/avatar.png", width: 256, height: 256, alt: profile.name }],
  },
  twitter: { card: "summary", title: `${profile.name} — ${profile.role}`, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: profile.siteUrl,
  image: `${profile.siteUrl}/avatar.png`,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" },
  worksFor: { "@type": "Organization", name: "EPAM Systems" },
  sameAs: [profile.github, profile.linkedin, profile.medium],
  knowsAbout: profile.keywords,
};

/**
 * Runs before first paint: marks JS as available, restores the saved theme and palette (Mono is the
 * default, set in the HTML; Ember removes it, Moss replaces it), and raises the boot
 * loader. Like the original site, every full page load gets the loader; in-app route changes don't.
 */
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js','booting');try{var t=localStorage.getItem('theme');if(t)d.dataset.theme=t;var p=localStorage.getItem('palette');if(p==='ember')delete d.dataset.palette;else if(p==='moss')d.dataset.palette='moss'}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" data-palette="mono" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body id="top">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Loader />
        <SiteNav />
        <main id="main">{children}</main>
        <SiteFooter />
        <Toast />
        <Analytics />
        <div className="vignette" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
        <div className="scanlines" aria-hidden="true" />
      </body>
    </html>
  );
}
