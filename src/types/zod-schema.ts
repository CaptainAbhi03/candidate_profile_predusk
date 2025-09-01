import { z } from 'zod';

export const LinksSchema = z.object({
    github: z.string().url().or(z.literal('')),
    linkedin: z.string().url().or(z.literal('')),
    portfolio: z.string().url().or(z.literal('')),
});

export const EducationSchema = z.object({
    institution: z.string(),
    degree: z.string(),
    period: z.string(),
});

export const WorkExperienceSchema = z.object({
    company: z.string(),
    role: z.string(),
    period: z.string(),
    description: z.string(),
});

export const ProjectSchema = z.object({
    title: z.string(),
    description: z.string(),
    links: z.array(z.string().url()).optional(),
    image: z.object({
        url: z.string().url().or(z.literal('')),
        aiHint: z.string(),
    }).optional(),
});

export const ProfileSchema = z.object({
    name: z.string(),
    title: z.string(),
    email: z.string().email(),
    links: LinksSchema,
    skills: z.array(z.string()),
    education: z.array(EducationSchema),
    workExperience: z.array(WorkExperienceSchema),
    projects: z.array(ProjectSchema),
});
