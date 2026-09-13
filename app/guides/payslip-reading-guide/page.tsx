import { PracticalGuide } from "@/components/guides/PracticalGuide"; import { practicalGuideData } from "@/lib/constants/practicalGuideData"; import { pageMetadata } from "@/lib/utils/seo";
export const metadata = pageMetadata({ title: practicalGuideData.payslip.title, description: practicalGuideData.payslip.intro, path: "/guides/payslip-reading-guide" });
export default function Page() { return <PracticalGuide data={practicalGuideData.payslip} />; }
