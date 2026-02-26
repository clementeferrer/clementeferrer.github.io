import type { Metadata } from "next";
import { getProfile, getSocial, getNews } from "@/lib/content";
import HomeContent from "@/components/home/HomeContent";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function HomePage() {
  const profile = getProfile();
  const social = getSocial();
  const news = getNews();

  return (
    <HomeContent profile={profile} social={social} news={news} />
  );
}
