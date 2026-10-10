import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";
import { pages } from "@/lib/pages";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((p) => ({
    url: `${profile.siteUrl}${p.href}`,
    changeFrequency: "monthly",
    priority: p.no === "00" ? 1 : 0.7,
  }));
}
