"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { SkillsSection } from "@/components/sections/skills-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/firebase";

import Navigation from "@/components/Navigation";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { EducationsSection } from "@/components/sections/educations-section";
import { ExperiencesSection } from "@/components/sections/experiences-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ExperiencesSection />
      <EducationsSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </div>
  );
}
