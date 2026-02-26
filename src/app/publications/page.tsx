import type { Metadata } from "next";
import { getPublications } from "@/lib/content";
import PublicationsClient from "@/components/publications/PublicationsClient";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Journal articles and manuscripts by Clemente Ferrer.",
};

export default function PublicationsPage() {
  const publications = getPublications();

  return <PublicationsClient publications={publications} />;
}
