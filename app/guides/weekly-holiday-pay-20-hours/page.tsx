import { PracticalGuide } from "@/components/guides/PracticalGuide"; import { practicalGuideData } from "@/lib/constants/practicalGuideData"; import { pageMetadata } from "@/lib/utils/seo";
export const metadata = pageMetadata({ title: practicalGuideData.weekly20.title, description: practicalGuideData.weekly20.intro, path: "/guides/weekly-holiday-pay-20-hours" });
export default function Page() { return <PracticalGuide data={practicalGuideData.weekly20} />; }
