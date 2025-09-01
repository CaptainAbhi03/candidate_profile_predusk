'use server';

/**
 * @fileOverview A Genkit flow for intelligent skill-based project search.
 *
 * - intelligentSkillSearch - A function that searches for projects based on skills, leveraging AI to rank results by relevance.
 * - IntelligentSkillSearchInput - The input type for the intelligentSkillSearch function.
 * - IntelligentSkillSearchOutput - The return type for the intelligentSkillSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentSkillSearchInputSchema = z.object({
  skill: z.string().describe('The skill to search for in project descriptions.'),
  projects: z.array(
    z.object({
      title: z.string().describe('The title of the project.'),
      description: z.string().describe('A detailed description of the project.'),
      links: z.array(z.string()).optional().describe('URLs related to the project, if any'),
    })
  ).describe('An array of project objects to search through.'),
});
export type IntelligentSkillSearchInput = z.infer<typeof IntelligentSkillSearchInputSchema>;

const IntelligentSkillSearchOutputSchema = z.array(
  z.object({
    title: z.string().describe('The title of the project.'),
    description: z.string().describe('A detailed description of the project.'),
    relevanceScore: z.number().describe('A numerical score indicating the relevance of the project to the search skill.'),
    links: z.array(z.string()).optional().describe('URLs related to the project, if any'),
  })
).describe('An array of project objects ranked by relevance to the search skill.');
export type IntelligentSkillSearchOutput = z.infer<typeof IntelligentSkillSearchOutputSchema>;

export async function intelligentSkillSearch(input: IntelligentSkillSearchInput): Promise<IntelligentSkillSearchOutput> {
  return intelligentSkillSearchFlow(input);
}

const intelligentSkillSearchPrompt = ai.definePrompt({
  name: 'intelligentSkillSearchPrompt',
  input: {schema: IntelligentSkillSearchInputSchema},
  output: {schema: IntelligentSkillSearchOutputSchema},
  prompt: `You are an AI expert in matching skills to projects. Given a skill and a list of projects, rank the projects by relevance to the skill. Return the projects with a relevance score between 0 and 1, where 1 is the most relevant.

Skill: {{{skill}}}

Projects:
{{#each projects}}
Title: {{{this.title}}}
Description: {{{this.description}}}
Links: {{#each this.links}}{{{this}}}{{/each}}
{{/each}}`,
});

const intelligentSkillSearchFlow = ai.defineFlow(
  {
    name: 'intelligentSkillSearchFlow',
    inputSchema: IntelligentSkillSearchInputSchema,
    outputSchema: IntelligentSkillSearchOutputSchema,
  },
  async input => {
    const {output} = await intelligentSkillSearchPrompt(input);
    return output!;
  }
);
