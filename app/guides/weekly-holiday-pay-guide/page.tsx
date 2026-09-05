import { GuideArticle } from "@/components/guides/GuideArticle"; import { guideData } from "@/lib/constants/guideData"; import { pageMetadata } from "@/lib/utils/seo";
export const metadata = pageMetadata({ title: guideData.weekly.title, description: guideData.weekly.intro, path: guideData.weekly.path }); export default function Page() { return <GuideArticle data={guideData.weekly} />; }
