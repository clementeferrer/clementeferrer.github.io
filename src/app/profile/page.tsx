import type { Metadata } from "next";
import Image from "next/image";
import { User, GraduationCap, Award, FlaskConical, Code } from "lucide-react";
import { getProfile } from "@/lib/content";
import EducationTimeline from "@/components/profile/EducationTimeline";
import ResearchProjects from "@/components/profile/ResearchProjects";
import AwardsList from "@/components/profile/AwardsList";
import SkillsSection from "@/components/profile/SkillsSection";

export const metadata: Metadata = {
  title: "Profile",
  description:
    "About Clemente Ferrer — education, awards, and skills.",
};

export default function ProfilePage() {
  const profile = getProfile();

  return (
    <div className="mx-auto max-w-7xl px-4 pt-12 pb-12 sm:px-6">
      {/* About Me — text + photo */}
      <section className="mb-8">
        <h2 className="text-xl font-serif font-bold mb-4 flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          About Me
        </h2>
        <div className="grid gap-8 lg:grid-cols-2 items-start">
          <div className="text-sm text-muted leading-relaxed space-y-3">
            <p>
              I am a PhD student in Statistics at Pontificia Universidad Católica de Chile, under the supervision of Luis Gutiérrez (PUC) and Miguel de Carvalho (University of Edinburgh). I am interested in the sequential modeling of cascading extreme events, and lately I have been studying neural methods for amortized inference. More broadly, my work sits at the intersection of extreme value theory, Bayesian nonparametrics, and modern machine learning.
            </p>
            <p>
              Before starting my doctorate, I completed a Mathematical Engineering degree and a Master of Science in Mathematics at Universidad Técnica Federico Santa María, graduating with highest honors. During that time I became passionate about spatial statistics, Bayesian analysis, and the role neural architectures can play in classical statistical problems.
            </p>
            <p>
              Outside of research, I enjoy mentoring students, spending time with my family, and appreciating the quiet beauty of everyday life. If you are interested in consulting or collaboration, feel free to reach out.
            </p>
            <blockquote className="mt-12 text-center italic text-muted/70">
              <p>&ldquo;Peace begins with a smile.&rdquo;</p>
              <footer className="mt-1 text-xs not-italic">&mdash; St. Teresa of Calcutta</footer>
            </blockquote>
          </div>
          <div className="flex justify-center">
            <div className="relative w-full max-w-sm aspect-[3/4] rounded-xl overflow-hidden border border-border bg-surface">
              <Image
                src="/images/Profile_photo.png"
                alt="About me"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <hr className="border-border mb-8" />

      {/* Education + Awards — side by side */}
      <div className="grid gap-8 lg:grid-cols-2 mb-8">
        <section>
          <h2 className="text-xl font-serif font-bold mb-4 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            Education
          </h2>
          <EducationTimeline education={profile.education} />
        </section>
        <section>
          <h2 className="text-xl font-serif font-bold mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Awards &amp; Honors
          </h2>
          <AwardsList awards={profile.awards} />
        </section>
      </div>

      <hr className="border-border mb-8" />

      {/* Projects + Skills — side by side */}
      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="text-xl font-serif font-bold mb-4 flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-primary" />
            Research Projects &amp; Grants
          </h2>
          <ResearchProjects projects={profile.researchProjects} />
        </section>
        <section>
          <h2 className="text-xl font-serif font-bold mb-4 flex items-center gap-2">
            <Code className="h-5 w-5 text-primary" />
            Skills &amp; Languages
          </h2>
          <SkillsSection skills={profile.skills} languages={profile.languages} />
        </section>
      </div>
    </div>
  );
}
