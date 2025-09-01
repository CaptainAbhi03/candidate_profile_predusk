import { NextResponse } from 'next/server';
import { intelligentSkillSearch } from '@/ai/flows/intelligent-skill-search';
import { profileData } from '@/lib/data';
import type { RankedProject } from '@/types';

export async function POST(request: Request) {
  try {
    const { skill } = await request.json();

    if (!skill || typeof skill !== 'string') {
      return NextResponse.json({ error: 'Skill query is required' }, { status: 400 });
    }

    const projects = profileData.projects;

    // The AI flow can be slow, so for a production app you might add caching or other optimizations.
    const rankedProjects: RankedProject[] = await intelligentSkillSearch({
      skill,
      projects,
    });
    
    // Sort results by relevance score in descending order
    const sortedProjects = rankedProjects.sort((a, b) => b.relevanceScore - a.relevanceScore);

    return NextResponse.json(sortedProjects);
  } catch (error) {
    console.error('Error in intelligent skill search:', error);
    return NextResponse.json({ error: 'An error occurred during the search.' }, { status: 500 });
  }
}
