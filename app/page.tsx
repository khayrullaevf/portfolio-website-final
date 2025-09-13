import type React from "react";
import { GlobeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectCard } from "@/components/project-card";
import { getAllProjects } from "@/lib/data";
import { EnhancedScrollIndicator } from "@/components/enhanced-scroll-indicator";
import { EnhancedProfile } from "@/components/enhanced-profile";
import { CredentialsSection } from "@/components/credentials-section";
import { PortfolioHeader } from "@/components/portfolio-header";
import { getExperienceInfo, getTechnicalSkillsInfo } from "@/lib/data";
import { ContactSection } from "@/components/contact-section";
import { SkillsProgressSection } from "@/components/skills-progress-section";
import { InteractiveTimeline } from "@/components/interactive-timeline";

const SkillTagComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-2 py-1 bg-zinc-800 rounded-full text-xs font-medium text-zinc-100">
      {children}
    </div>
  );
};

export default function Home() {
  const projects = getAllProjects();
  const experienceInfo = getExperienceInfo();
  const technicalSkills = getTechnicalSkillsInfo();

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px] opacity-20 z-0"></div>

      {/* Header */}
      <PortfolioHeader />

      <div className="relative z-10 container mx-auto p-3 sm:p-4 pt-20 sm:pt-24 pb-6 sm:pb-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Enhanced Profile Section */}
          <div className="md:sticky md:top-24 self-start">
            <EnhancedProfile />
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-3 space-y-4 sm:space-y-6">
            <InteractiveTimeline />

            {/* Credentials Section */}
            <section id="credentials">
              <CredentialsSection />
            </section>
            {/* Skills Section */}
            <section id="skills">
              <SkillsProgressSection />
            </section>

            {/* Projects Section */}
            <section id="projects">
              <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex items-center">
                      <GlobeIcon className="w-5 h-5 mr-2 text-cyan-400" />
                      <h3 className="text-lg font-medium">Recent Projects</h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs sm:text-sm px-2 sm:px-3"
                    >
                      View All
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {projects.map((project, index) => (
                      <div key={project.id}>
                        <ProjectCard
                          title={project.title}
                          category={project.category}
                          image={project.thumbnailImage}
                          slug={project.slug}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Contact Section */}
            <section id="contact">
              <ContactSection />
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 sm:mt-12 py-4 sm:py-6 text-center text-xs sm:text-sm text-zinc-500">
          <p>
            © {new Date().getFullYear()} Fazliddin Khayrullaev. All rights
            reserved.
          </p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <EnhancedScrollIndicator />
    </main>
  );
}
