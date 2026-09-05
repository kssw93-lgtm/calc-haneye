import { PracticalGuide } from "@/components/guides/PracticalGuide"; import { practicalGuideData } from "@/lib/constants/practicalGuideData"; import { pageMetadata } from "@/lib/utils/seo";
export const metadata = pageMetadata({ title: practicalGuideData.partTimeContract.title, description: practicalGuideData.partTimeContract.intro, path: "/guides/part-time-employment-contract" });
export default function Page() { return <PracticalGuide data={practicalGuideData.partTimeContract} />; }
