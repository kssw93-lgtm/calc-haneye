import { GuideArticle } from "@/components/guides/GuideArticle"; import { guideData } from "@/lib/constants/guideData"; import { pageMetadata } from "@/lib/utils/seo";
export const metadata = pageMetadata({ title: guideData.salary.title, description: guideData.salary.intro, path: guideData.salary.path }); export default function Page() { return <GuideArticle data={guideData.salary} />; }
