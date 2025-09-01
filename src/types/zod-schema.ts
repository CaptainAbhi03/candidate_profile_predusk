import { z } from 'zod';

export const LinksSchema = z.object({
    github: z.string().url().or(z.literal('')).optional(),
    linkedin: z.string().url().or(z.literal('')).optional(),
    portfolio: z.string().url().or(z.literal('')).optional(),
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
        url: z.string().url().or(z.literal('')).optional(),
        aiHint: z.string().optional(),
    }).optional(),
});

export const ProfileSchema = z.object({
    name: z.string().optional(),
    title: z.string().optional(),
    email: z.string().email().or(z.literal('')).optional(),
    links: LinksSchema.optional(),
    skills: z.array(z.string()).optional(),
    education: z.array(EducationSchema).optional(),
    workExperience: z.array(WorkExperienceSchema).optional(),
    projects: z.array(ProjectSchema).optional(),
});
