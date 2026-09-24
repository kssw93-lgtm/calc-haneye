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
    images: [{ url: "/social-preview.png", width: 1200, height: 630, alt: "계산한눈에 - 생활 계산기와 지원정책" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: ["/social-preview.png"],
  },
  icons: {
    icon: [{ url: "/logo-mark.png", sizes: "512x512", type: "image/png" }],
    apple: [{ url: "/logo-mark.png", sizes: "512x512", type: "image/png" }],
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
        <meta name="google-adsense-account" content="ca-pub-8704899603701516" />
        {/* 심사 준비: 계정 확인 메타태그·ads.txt는 유지하고 광고 송출은 비활성화. */}
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
