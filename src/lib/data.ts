import type { Profile } from '@/types';

/**
 * @deprecated This file is for reference only. Data is now fetched from MongoDB.
 * You can use this structure to seed your database.
 */
export const profileData: Profile = {
  name: "Alex Doe",
  title: "Full Stack AI Engineer",
  email: "alex.doe@email.com",
  links: {
    github: "https://github.com/alexdoe",
    linkedin: "https://linkedin.com/in/alexdoe",
    portfolio: "https://alexdoe.com"
  },
  skills: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "Genkit",
    "Firebase",
    "MongoDB",
    "SQL",
    "Docker",
    "UI/UX Design"
  ],
  education: [
    {
      institution: "University of Technology",
      degree: "M.S. in Computer Science",
      period: "2018 - 2020"
    },
    {
      institution: "State University",
      degree: "B.S. in Software Engineering",
      period: "2014 - 2018"
    }
  ],
  workExperience: [
    {
      company: "Innovate Inc.",
      role: "Senior Software Engineer",
      period: "2022 - Present",
      description: "Leading development of AI-powered features for a flagship product. Architecting scalable cloud solutions on Firebase and GCP. Mentoring junior developers."
    },
    {
      company: "Tech Solutions LLC",
      role: "Software Engineer",
      period: "2020 - 2022",
      description: "Developed and maintained full-stack web applications using the MERN stack. Collaborated with cross-functional teams to deliver high-quality software."
    }
  ],
  projects: [
    {
      title: "AI-Powered Project Search",
      description: "A Next.js application that uses a Genkit AI flow to rank and search projects based on skill relevance. Demonstrates integration of modern AI tooling in a web app.",
      links: ["https://github.com/alexdoe/ai-project-search"]
    },
    {
      title: "E-commerce Platform",
      description: "A full-featured e-commerce website built with React, Node.js, and MongoDB. Includes user authentication, product catalog, shopping cart, and payment integration with Stripe.",
      links: ["https://github.com/alexdoe/ecommerce-platform"]
    },
    {
      title: "Data Visualization Dashboard",
      description: "A dashboard for visualizing complex datasets using D3.js and React. Features interactive charts and graphs to provide insights from raw data.",
      links: ["https://github.com/alexdoe/data-viz-dashboard"]
    },
    {
      title: "IoT Smart Home Controller",
      description: "A Python-based application to control smart home devices via a unified API. Deployed on a Raspberry Pi using Docker for containerization.",
      links: ["https://github.com/alexdoe/iot-controller"]
    }
  ]
};
