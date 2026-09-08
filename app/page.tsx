import { EventGlance } from "@/components/public/event-glance";
import { Hero } from "@/components/public/hero";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <EventGlance />
    </main>
  );
}
