import { Encryption } from "@/components/main/encryption";
import { Hero } from "@/components/main/hero";
import { Projects } from "@/components/main/projects";
import { Skills } from "@/components/main/skills";
import Experience from "../components/main/experience";
import CareerExperience from "@/components/main/CareerExperience";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <Skills />
        <Encryption />
        <Projects />
        {/* <Experience /> */}
        <CareerExperience />

      </div>
    </main>
  );
}
