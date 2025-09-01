import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import type { Project } from '@/types';

async function getProjects(): Promise<Project[]> {
    const { db } = await connectToDatabase();
    // In a multi-user app, you'd filter by a user/profile ID.
    // For this app, we assume a single profile document.
    const profile = await db.collection('profile').findOne({}, { projection: { projects: 1, _id: 0 } });
    return profile?.projects || [];
}

export async function POST(request: Request) {
  try {
    const { skill } = await request.json();

    if (!skill || typeof skill !== 'string') {
      return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
    }

    const projects = await getProjects();

    if (projects.length === 0) {
      return NextResponse.json([]);
    }

    const searchLower = skill.toLowerCase();
    const filteredProjects = projects.filter(project => 
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower)
    );

    return NextResponse.json(filteredProjects);
  } catch (error) {
    console.error('Error in search:', error);
    return NextResponse.json({ error: 'An error occurred during the search.' }, { status: 500 });
  }
}
