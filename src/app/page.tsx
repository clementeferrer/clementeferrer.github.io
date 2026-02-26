import { getProfile, getSocial, getNews } from "@/lib/content";
import HomeContent from "@/components/home/HomeContent";

export default function HomePage() {
  const profile = getProfile();
  const social = getSocial();
  const news = getNews();

  return (
    <HomeContent profile={profile} social={social} news={news} />
  );
}
