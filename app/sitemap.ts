import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/constants/site";
import { calculators } from "@/lib/constants/calculatorMetadata";

export const dynamic = "force-static";

const staticPaths = [
  "",
  "/finance",
  "/property-tax",
  "/salary-work",
  "/guides",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/disclaimer",
  "/guides/loan-interest-guide",
  "/guides/severance-pay-guide",
  "/guides/home-acquisition-tax-guide",
  "/guides/salary-net-pay-guide",
  "/guides/weekly-holiday-pay-guide",
  "/guides/savings-interest-guide",
  "/guides/real-estate-brokerage-fee-guide",
  "/guides/monthly-rent-conversion-guide",
  "/guides/salary-work",
  "/guides/finance",
  "/guides/property",
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

  return [...staticEntries, ...calculatorEntries];
}
