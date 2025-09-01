import ProfileCard from "@/components/profile-card";
import SkillsCard from "@/components/skills-card";
import EducationCard from "@/components/education-card";
import WorkExperienceCard from "@/components/work-experience-card";
import ProjectSearch from "@/components/project-search";
import { connectToDatabase } from "@/lib/mongodb";
import type { Profile } from "@/types";
import { Code2, Edit } from "lucide-react";
import Link from "next/link";

async function getProfileData(): Promise<{data: Profile | null; error: string | null}> {
  try {
    const { db } = await connectToDatabase();
    // Assuming you have a 'profile' collection with a single document.
    // You might want to use a specific ID in a real application.
    const profile = await db.collection('profile').findOne({});

    if (!profile) {
      return { data: null, error: "Profile data not found in the database. Please seed it by running 'npm run db:seed'" };
    }

    // The _id field from MongoDB is not serializable for Next.js server components by default.
    // We convert it to a string and then remove it.
    const { _id, ...profileData } = profile;
    return { data: JSON.parse(JSON.stringify(profileData)) as Profile, error: null };

  } catch (error: any) {
    console.error("Failed to fetch profile data:", error);
    // Special handling for setup-related errors
    if (error.name === 'MissingEnvError') {
      return { data: null, error: `${error.message}. Please create or update the .env file in the root of your project with your MongoDB connection details.` };
    }
    return { data: null, error: "Could not load profile data. Please check the database connection and ensure data exists." };
  }
}


export default async function Home() {
  const { data: profileData, error } = await getProfileData();

  if (!profileData) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center p-8 max-w-2xl mx-auto bg-card rounded-lg shadow-lg border border-destructive/50">
          <h1 className="text-4xl font-bold text-destructive mb-4">Application Error</h1>
          <p className="text-lg text-muted-foreground">{error}</p>
          <p className="text-sm text-muted-foreground mt-4">If you've already set up your database, ensure it is seeded with a profile document. Check the README.md for instructions.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="py-8 bg-card border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
            Profile Pod
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            A dynamic showcase of skills and projects.
          </p>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8 flex-grow">
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
      <footer className="bg-card text-center p-6 text-muted-foreground text-sm border-t">
        <div className="flex justify-center items-center gap-2">
            <Code2 className="w-5 h-5 text-primary"/>
            <p>Built with Next.js, shadcn/ui, and Genkit AI.</p>
        </div>
        <p className="mt-1">Deployed on Firebase.</p>
        <div className="mt-4">
            <Link href="/edit" className="text-xs text-muted-foreground hover:text-primary flex items-center justify-center gap-1">
                <Edit className="w-3 h-3" /> Edit Profile
            </Link>
        </div>
      </footer>
    </div>
  );
}
