import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteDescription, siteName, siteUrl } from "@/lib/constants/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} - ${siteDescription}`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  verification: {
    google: "zHCWf74E8gsCtebtT9b44nelRPSqct5dzjTvV3Gyg0Y",
    other: {
      "naver-site-verification": "57a825104a8c4f0c6ad11e64f10eada491087241",
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName,
    title: siteName,
    description: siteDescription,
    url: siteUrl,
  },
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    types: {
      "application/rss+xml": `${siteUrl}/rss.xml`,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    description: siteDescription,
    url: siteUrl,
    inLanguage: "ko-KR",
  };

  return (
    <html lang="ko">
      <head>
        <link rel="alternate" type="application/rss+xml" title={`${siteName} RSS`} href="/rss.xml" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8704899603701516"
          crossOrigin="anonymous"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <Script src="https://wcs.pstatic.net/wcslog.js" strategy="afterInteractive" />
        <Script id="naver-analytics" strategy="afterInteractive">
          {`if (!wcs_add) var wcs_add = {};
wcs_add["wa"] = "1c12e21b3170420";
if (window.wcs) {
  wcs_do();
}`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
