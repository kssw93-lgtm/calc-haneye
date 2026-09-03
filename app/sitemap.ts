import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/constants/site";
import { calculators } from "@/lib/constants/calculatorMetadata";
import { supplementalGuides } from "@/lib/constants/supplementalGuides";

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
  "/guides/employment-contract-template",
  "/guides/part-time-employment-contract",
  "/guides/payslip-reading-guide",
  "/guides/weekly-holiday-pay-20-hours",
  "/guides/severance-pay-one-year",
  "/guides/loan-100-million-interest",
  "/guides/deposit-10-million-interest",
  "/guides/jeonse-brokerage-fee",
  "/guides/monthly-rent-brokerage-fee",
  "/policies",
  "/policies/youth-jeonse-loan",
  "/policies/newlywed-jeonse-loan",
  "/policies/jeonse-guarantee-fee-support",
  "/policies/youth-monthly-rent-support",
  "/policies/didimdol-home-loan",
  "/policies/bogeumjari-loan",
  "/policies/earned-income-tax-credit",
  "/policies/national-learning-card",
  "/guides/savings-interest-guide",
  "/guides/real-estate-brokerage-fee-guide",
  "/guides/monthly-rent-conversion-guide",
  "/guides/salary-work",
  "/guides/finance",
  "/guides/property",
];

export default function sitemap(): MetadataRoute.Sitemap {

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${siteUrl}${path}`,
  }));

  const calculatorEntries: MetadataRoute.Sitemap = calculators.map((item) => ({
    url: `${siteUrl}${item.href}`,
  }));

  return [...staticEntries, ...calculatorEntries, ...supplementalGuides.map(item => ({ url: `${siteUrl}/guides/${item.slug}`, lastModified: item.reviewedAt }))];
}
