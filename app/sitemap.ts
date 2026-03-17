import type { MetadataRoute } from "next";
import { readSeoRoutes } from "@/lib/seo-routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "https://skystay-travel.vercel.app";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/flights`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/deals`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/packages`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/hotels`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/support`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const routes = readSeoRoutes();
  const routePages: MetadataRoute.Sitemap = routes.map((r) => ({
    url: `${baseUrl}/flights/${r.from.slug}-to-${r.to.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...routePages];
}

