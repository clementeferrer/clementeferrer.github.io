"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { Download, Mail, Github, Linkedin, GraduationCap, Newspaper, Lightbulb } from "lucide-react";
import ResearchInterests from "@/components/profile/ResearchInterests";
import { formatMonthYear } from "@/lib/utils";
import type { Profile, Social, NewsItem } from "@/lib/types";

const DensitySurface = dynamic(
  () => import("@/components/three/DensitySurface"),
  { ssr: false }
);

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Github,
  Linkedin,
  GraduationCap,
};

interface HomeContentProps {
  profile: Profile;
  social: Social;
  news: NewsItem[];
}

export default function HomeContent({ profile, social, news }: HomeContentProps) {
  const shouldReduceMotion = useReducedMotion();
  const recentNews = news.slice(0, 3);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current || mapRef.current.querySelector("script")) return;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.id = "mapmyvisitors";
    script.src =
      "https://mapmyvisitors.com/map.js?cl=080808&w=400&t=tt&d=kEigzcBA3DiAHilrCn9XjjjEKKxV27MN8jdvZiCULfk&co=ffffff&ct=808080&cmo=3acc3a&cmn=ff5353";
    mapRef.current.appendChild(script);
  }, []);


  return (
    <div className="mx-auto max-w-7xl px-4 pt-12 pb-12 sm:px-6">
      {/* Header — info with 3D floating behind */}
      <section className="relative mb-8">
        {/* 3D visualization — absolute, behind content */}
        {!shouldReduceMotion && (
          <div className="hidden lg:block absolute top-0 bottom-0 right-0 left-1/2 pointer-events-none">
            <Canvas
              camera={{ position: [2.2, 0.3, 2.2], fov: 60 }}
              dpr={[1, 1.5]}
              gl={{ alpha: true, antialias: true }}
              style={{ background: "transparent" }}
            >
              <DensitySurface />
            </Canvas>
          </div>
        )}

        {/* Content — sits on top, defines section height */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start gap-6 py-4">
          {/* Photo */}
          <div className="shrink-0">
            <div className="relative h-40 w-40 rounded-full overflow-hidden border border-border">
              <Image
                src={profile.photo}
                alt={profile.name}
                fill
                className="object-cover"
                style={{ objectPosition: "center 20%" }}
                priority
              />
            </div>
          </div>

          {/* Info */}
          <div className="min-w-0">
            <h1 className="text-display font-serif font-bold leading-tight">
              {profile.name}
            </h1>
            <p className="mt-1 text-xl text-primary font-serif font-medium">
              {profile.title}
            </p>
            <p className="text-muted mt-1">{profile.affiliation}</p>

            {/* Buttons + social icons */}
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <span
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm cursor-default opacity-80"
              >
                <Download className="h-4 w-4" />
                CV
              </span>
              <a
                href={`mailto:${social.emails[0]}`}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium shadow-sm hover:shadow-md hover:border-primary/30 active:scale-[0.98] transition-all duration-200"
              >
                <Mail className="h-4 w-4" />
                Email
              </a>
              <div className="flex gap-2 ml-1">
                {social.links.map((link) => {
                  const Icon = iconMap[link.icon];
                  const disabled = link.icon === "GraduationCap";
                  return disabled ? (
                    <span
                      key={link.name}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface opacity-80 cursor-default"
                      aria-label={link.name}
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                    </span>
                  ) : (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface hover:bg-surface-hover hover:text-primary transition-colors"
                      aria-label={link.name}
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-border mb-8" />

      {/* Research Interests */}
      <section className="mb-8">
        <h2 className="text-xl font-serif font-bold mb-4 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          Research Interests
        </h2>
        <ResearchInterests interests={profile.researchInterests} />
      </section>

      <hr className="border-border mb-8" />

      {/* News */}
      <section>
        <h2 className="text-xl font-serif font-bold mb-4 flex items-center gap-2">
          <Newspaper className="h-5 w-5 text-primary" />
          News
        </h2>
        <div className="space-y-4">
          {recentNews.map((item, i) => (
            <div key={i} className="border-l-2 border-border pl-4 py-1">
              <span className="text-xs text-muted">
                {formatMonthYear(item.date)}
              </span>
              <p className="font-medium text-sm leading-snug">{item.title}</p>
              <p className="text-sm text-muted mt-0.5">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-border my-8" />

      {/* Visitor Map */}
      <section className="flex justify-center">
        <div ref={mapRef} className="overflow-hidden rounded-lg" />
      </section>
    </div>
  );
}
