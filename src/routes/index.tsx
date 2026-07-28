import { createFileRoute } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { ProjectList } from "../components/ProjectList";
import { SkillIcons } from "../components/SkillIcons";
import { CurrentlyWorking } from "../components/CurrentlyWorking";
import { media } from "../lib/media";
import { personalProjects, teamProjects } from "../data/projects";
import { canonicalUrl } from "../lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nikhil Patel - Electrical Engineering Portfolio" },
      { name: "description", content: "Electrical Engineering Technology student at SAIT. Rocketry, embedded systems, robotics, and hardware design." },
      { property: "og:title", content: "Nikhil Patel - Electrical Engineering Portfolio" },
      { property: "og:description", content: "Electrical Engineering Technology student at SAIT. Rocketry, embedded systems, robotics, and hardware design." },
      { property: "og:url", content: canonicalUrl("/") },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/") }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-6 pt-20 pb-16 sm:px-8">
        <header className="mb-16 flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-between">
          <Avatar className="h-32 w-32 shrink-0 border border-border bg-muted md:h-48 md:w-48">
            <AvatarImage
              src={media.profile.src}
              alt={media.profile.alt}
              className="object-cover"
            />
            <AvatarFallback className="text-lg font-medium">NP</AvatarFallback>
          </Avatar>
          <div className="min-w-0 text-center md:text-left">
            <h1 className="text-3xl font-semibold tracking-tight">Nikhil Patel</h1>
            <p className="mt-2 text-muted-foreground">
              Electrical Engineering Technology student at SAIT. <br /> Previous President & Propulsion lead of USST. <br /> 
              <br />
              Rocketry, embedded systems, robotics, prosthesis and hardware design.
            </p>
            <nav className="mt-5 flex flex-wrap justify-center gap-3 text-base md:justify-start">
              <a
                href="mailto:nikhil.patel@usask.ca"
                className="rounded border border-border px-3 py-1.5 text-primary hover:border-primary hover:no-underline"
              >
                Email
              </a>
              <a
                href="https://github.com/nikhil-iso"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-border px-3 py-1.5 text-primary hover:border-primary hover:no-underline"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/nikhil-patel-uofs/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-border px-3 py-1.5 text-primary hover:border-primary hover:no-underline"
              >
                LinkedIn
              </a>
              <a
                href={canonicalUrl("/team")}
                className="rounded border border-border px-3 py-1.5 text-primary hover:border-primary hover:no-underline md:hidden"
              >
                Team Projects
              </a>
            </nav>
          </div>
        </header>

        <section className="mb-6">
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            About
          </h2>
          <p className="leading-relaxed">
            I&apos;m an Electrical Engineering Technology student at{" "}
            <span className="text-[#DA291C]">SAIT Polytechnic</span> based in
            Calgary, AB. I like working on problems that deal with a mix of hardware and software.
            Things like rocketry, space systems and structures, embedded systems, and robotics particularly interest me. <br /><br />
            
            Currently focusing on academics and personal projects. Still open to opportunities and projects in electrical and mechatronics engineering.
            { /* Currently open to internships, co-op positions, and collaborative projects in electrical engineering and mechatronics. */}

          </p>
        </section>

        <section className="mb-16">
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Currently
          </h2>
          <CurrentlyWorking blurb="Currently @ SAIT, Building rockets + vision detection in my free time 🚀" />
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Personal Projects
          </h2>
          <ProjectList projects={personalProjects} />
        </section>

        <section className="mb-16">
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Skills
          </h2>
          <SkillIcons
            personalProjects={personalProjects}
            teamProjects={teamProjects}
          />
        </section>

      </div>
    </div>
  );
}
