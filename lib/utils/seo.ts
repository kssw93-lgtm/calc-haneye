import type { Metadata } from "next";
import { siteName, siteUrl } from "@/lib/constants/site";

export function absoluteUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
}

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
}

/**
 * 페이지별 title/description/canonical/OG metadata를 siteUrl 기준으로 생성합니다.
 * image를 지정하면(예: 뉴스 기사 인포그래픽) 기본 social-preview.png 대신
 * 카카오톡·트위터 등 공유 미리보기에 해당 이미지를 사용합니다.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const shareImage = absoluteUrl(image ?? "/social-preview.png");
  const shareImageAlt = imageAlt ?? "계산한눈에 - 생활 계산기와 지원정책";
  const shareImageHeight = image ? 640 : 630;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url,
      siteName,
      locale: "ko_KR",
      type: "website",
      images: [{ url: shareImage, width: 1200, height: shareImageHeight, alt: shareImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage],
    },
  };
}
