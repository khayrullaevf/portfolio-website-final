import {
  getAllProjects,
  getPersonalInfo,
  getAboutInfo,
  getExperienceInfo,
  getSkills,
  getCredentialsInfo,
} from "@/lib/data";
import { PortfolioHeader } from "@/components/portfolio-header";
import { Hero } from "@/components/hero";
import { AboutSection } from "@/components/about-section";
import { Section } from "@/components/section";
import { ExperienceList } from "@/components/experience-list";
import { CredentialsList } from "@/components/credentials-list";
import { SkillsList } from "@/components/skills-list";
import { SelectedWork } from "@/components/selected-work";
import { ContactSection } from "@/components/contact-section";
import { CommandPaletteMount } from "@/components/command-palette-mount";
import { SiteFooter } from "@/components/site-footer";

export const revalidate = 60;

export default async function Home() {
  const [
    projects,
    personalInfo,
    aboutInfo,
    experienceItems,
    skills,
    credentialsInfo,
  ] = await Promise.all([
    getAllProjects(),
    getPersonalInfo(),
    getAboutInfo(),
    getExperienceInfo(),
    getSkills(),
    getCredentialsInfo(),
  ]);

  return (
    <>
      <PortfolioHeader personalInfo={personalInfo} />

      {/*
        One column, one measure. The old layout was a sticky profile card beside
        a stack of nine equal-weight panels; hierarchy now comes from order and
        whitespace instead of from borders.
      */}
      <main id="main" className="grain relative mx-auto max-w-3xl px-5 sm:px-6">
        <Hero
          personalInfo={personalInfo}
          aboutInfo={aboutInfo}
          experienceItems={experienceItems}
          skills={skills}
        />

        <div className="space-y-24 pb-8">
          {/* The five anchor ids below are referenced by lib/nav.ts and the
              command palette — renaming one silently breaks both. The order is
              work first: what was shipped is stronger evidence than where. */}
          {projects.length > 0 && (
            <Section id="projects" label="01 — Work" title="Selected work">
              <SelectedWork projects={projects} />
            </Section>
          )}

          {experienceItems.length > 0 && (
            <Section id="experience" label="02 — Experience" title="Where I've worked">
              <ExperienceList items={experienceItems} />
            </Section>
          )}

          {skills.length > 0 && (
            <Section id="skills" label="03 — Skills" title="What I work with">
              <SkillsList skills={skills} />
            </Section>
          )}

          {/* Unnumbered on purpose: quiet metadata (bio, focus, languages),
              not a section a reader navigates to. */}
          <AboutSection aboutInfo={aboutInfo} />

          {(credentialsInfo.education.length > 0 ||
            credentialsInfo.certifications.length > 0) && (
            <Section
              id="credentials"
              label="04 — Credentials"
              title="Education & certificates"
            >
              <CredentialsList credentialsInfo={credentialsInfo} />
            </Section>
          )}

          <Section id="contact" label="05 — Contact" title="Get in touch">
            <ContactSection personalInfo={personalInfo} />
          </Section>
        </div>

        <SiteFooter name={personalInfo.name} email={personalInfo.email} />
      </main>

      <CommandPaletteMount
        projects={projects.map((project) => ({
          slug: project.slug,
          title: project.title,
          category: project.category,
        }))}
        email={personalInfo.email}
        cvUrl={personalInfo.cvUrl}
        social={personalInfo.social.map((link) => ({
          platform: link.platform,
          url: link.url,
        }))}
      />
    </>
  );
}
