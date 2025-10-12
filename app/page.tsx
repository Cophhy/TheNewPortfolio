import { Encryption } from "@/components/main/encryption";
import { Hero } from "@/components/main/hero";
import { Projects } from "@/components/main/projects";
import { Skills } from "@/components/main/skills";
// import Experience from "../components/main/experience";
import CareerExperience from "@/components/main/CareerExperience";
import WorkHorizontal from "@/components/main/WorkHorizontal";
import TechStack from "@/components/main/TechStack";
// import ContactAstronaut from "@/components/main/ContactAstronaut";
import Testimonials from "@/components/main/Testimonials";
import ResumeButton from "@/components/sub/ResumeButton";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <Skills />
        <CareerExperience />
        <Encryption />
        {/* <Projects /> */}
        {/* <Experience /> */}
        <WorkHorizontal />
        <TechStack />
        {/* <ContactAstronaut /> */}
        <Testimonials />
        <ResumeButton />

      </div>
    </main>
  );
}
