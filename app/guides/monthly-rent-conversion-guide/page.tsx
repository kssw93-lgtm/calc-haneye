import { GuideArticle } from "@/components/guides/GuideArticle"; import { guideData } from "@/lib/constants/guideData"; import { pageMetadata } from "@/lib/utils/seo";
export const metadata = pageMetadata({ title: guideData.rent.title, description: guideData.rent.intro, path: guideData.rent.path }); export default function Page() { return <GuideArticle data={guideData.rent} />; }
