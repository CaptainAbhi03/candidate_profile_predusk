import ProfileCard from "@/components/profile-card";
import SkillsCard from "@/components/skills-card";
import EducationCard from "@/components/education-card";
import WorkExperienceCard from "@/components/work-experience-card";
import ProjectSearch from "@/components/project-search";
import { connectToDatabase } from "@/lib/mongodb";
import type { Profile } from "@/types";

async function getProfileData(): Promise<Profile | null> {
  try {
    const { db } = await connectToDatabase();
    // Assuming you have a 'profile' collection with a single document.
    // You might want to use a specific ID in a real application.
    const profile = await db.collection('profile').findOne({});

    if (!profile) {
      return null;
    }

    // The _id field from MongoDB is not serializable for Next.js server components by default.
    // We convert it to a string and then remove it.
    const { _id, ...profileData } = profile;
    return JSON.parse(JSON.stringify(profileData)) as Profile;

  } catch (error) {
    console.error("Failed to fetch profile data:", error);
    return null;
  }
}


export default async function Home() {
  const profileData = await getProfileData();

  if (!profileData) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-destructive mb-4">Error</h1>
          <p className="text-lg text-muted-foreground">Could not load profile data. Please check the database connection and ensure data exists.</p>
          <p className="text-sm text-muted-foreground mt-2">You may need to seed your database. Check the README for instructions.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary-foreground bg-primary py-2 px-4 rounded-lg inline-block shadow-md">
            Profile Pod
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A dynamic showcase of skills and projects.
          </p>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <aside className="lg:col-span-1 space-y-8 sticky top-8">
            <ProfileCard profile={profileData} />
            <SkillsCard skills={profileData.skills} />
            <EducationCard education={profileData.education} />
            <WorkExperienceCard work={profileData.workExperience} />
          </aside>
          <section className="lg:col-span-2 space-y-8">
            <ProjectSearch projects={profileData.projects} />
          </section>
        </div>
      </main>
      <footer className="text-center p-8 text-muted-foreground text-sm">
        <p>Built with Next.js, shadcn/ui, and Genkit AI.</p>
        <p>Deployed on Firebase.</p>
      </footer>
    </div>
  );
}
