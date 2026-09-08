import type { Metadata } from "next";

import { PageBackdrop } from "@/components/public/page-backdrop";
import { PrizeDisplay } from "@/components/public/prize-display";

export const metadata: Metadata = {
  title: "Prizes — Tech4Bharat 2026",
  description: "₹6,00,000 total prize pool across three tiers at Tech4Bharat 2026.",
};

export default function PrizesPage() {
  return (
    <PageBackdrop>
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <PrizeDisplay />
      </div>
    </PageBackdrop>
  );
}
