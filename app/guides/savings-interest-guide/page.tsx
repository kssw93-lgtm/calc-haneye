import { GuideArticle } from "@/components/guides/GuideArticle"; import { guideData } from "@/lib/constants/guideData"; import { pageMetadata } from "@/lib/utils/seo";
export const metadata = pageMetadata({ title: guideData.savings.title, description: guideData.savings.intro, path: guideData.savings.path }); export default function Page() { return <GuideArticle data={guideData.savings} />; }
