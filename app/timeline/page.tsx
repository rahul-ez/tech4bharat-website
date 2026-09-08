import type { Metadata } from "next";

import { PageBackdrop } from "@/components/public/page-backdrop";
import { PageHeader } from "@/components/public/page-header";
import { Timeline } from "@/components/public/timeline";

export const metadata: Metadata = {
  title: "Timeline — Tech4Bharat 2026",
  description:
    "Key dates for Tech4Bharat 2026: registration, the online preliminary round, and the on-site grand finale in Bengaluru.",
};

export default function TimelinePage() {
  return (
    <PageBackdrop>
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <PageHeader
          eyebrow="Key Dates"
          heading="Timeline"
          supporting="From registration through the on-site grand finale in Bengaluru. Dates still being finalised by the organising committee are marked as such."
        />
        <div className="mt-10 sm:mt-14">
          <Timeline />
        </div>
      </div>
    </PageBackdrop>
  );
}
