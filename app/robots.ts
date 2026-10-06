import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/constants/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/ads.txt"],
      // Next.js의 정적 내보내기(output: "export")는 각 페이지마다 클라이언트 라우팅용
      // RSC 프리페치 payload(.txt)를 같은 경로에 함께 생성한다. 실제 콘텐츠가 없는
      // 이 파일들이 색인 큐를 채우는 것을 막기 위해 차단한다.
      disallow: ["/*.txt$"],
    },
    sitemap: [`${siteUrl}/sitemap.xml`],
  };
}
