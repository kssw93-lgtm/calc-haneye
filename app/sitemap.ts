import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/constants/site";
import { calculators } from "@/lib/constants/calculatorMetadata";
import { newsArticles } from "@/lib/constants/newsMetadata";

const staticPaths = [
  "",
  "/finance",
  "/property-tax",
  "/guides",
  "/news",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/disclaimer",
  "/guides/loan-interest-guide",
  "/guides/severance-pay-guide",
  "/guides/home-acquisition-tax-guide",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
  }));

  const calculatorEntries: MetadataRoute.Sitemap = calculators.map((item) => ({
    url: `${siteUrl}${item.href}`,
    lastModified: now,
  }));

  const newsEntries: MetadataRoute.Sitemap = newsArticles.map((item) => ({
    url: `${siteUrl}${item.href}`,
    lastModified: new Date(item.publishedAt),
  }));

  return [...staticEntries, ...calculatorEntries, ...newsEntries];
}
