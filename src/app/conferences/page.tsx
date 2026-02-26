import type { Metadata } from "next";
import { Globe } from "lucide-react";
import { getConferences, getProfile } from "@/lib/content";
import ConferenceList from "@/components/conferences/ConferenceList";
import ResearchVisits from "@/components/profile/ResearchVisits";

export const metadata: Metadata = {
  title: "Conferences",
  description:
    "Conference talks and presentations by Clemente Ferrer.",
};

export default function ConferencesPage() {
  const allConferences = getConferences();
  const speakerConferences = allConferences.filter((c) => c.role === "speaker");
  const profile = getProfile();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <section className="pt-12 pb-12">
        <ConferenceList conferences={speakerConferences} />
      </section>

      <hr className="border-border mb-8" />

      <section className="pb-12">
        <h2 className="text-xl font-serif font-bold mb-4 flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          Research Visits &amp; Schools
        </h2>
        <ResearchVisits visits={profile.researchVisits} />
      </section>
    </div>
  );
}
