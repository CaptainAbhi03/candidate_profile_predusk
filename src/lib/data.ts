import type { Profile } from '@/types';

/**
 * @deprecated This file is for reference only. Data is now fetched from MongoDB.
 * You can use this structure to seed your database.
 */
export const profileData: Profile = {
  name: "Abhineet Mathur",
  title: "Software Engineer",
  email: "abhi003mathur@gmail.com",
  links: {
    github: "https://github.com/CaptainAbhi03",
    linkedin: "https://linkedin.com/in/03Abhi",
    portfolio: "https://github.com/CaptainAbhi03"
  },
  skills: [
    "Python", "Java", "C/C++", "SQL", "JavaScript", "TypeScript", "Node.js",
    "LangChain", "Scikit-learn", "Pandas", "NumPy", "FAISS", "Optuna", "Streamlit", "RAG Pipelines", "Power BI",
    "Apache Spark", "Hadoop", "Cassandra", "AWS (EC2, S3, Lambda)", "PostgreSQL", "Data Pipelines", "ETL",
    "React", "Angular", "FastAPI", "Django", "HTML5", "CSS3", "Bootstrap", "Tailwind CSS", "REST APIs",
    "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Git", "Microsoft 365", "Power Platform"
  ],
  education: [
    {
      institution: "Manipal University Jaipur",
      degree: "Bachelor of Technology in Information Technology",
      period: "Sep 2022 - Jul 2026 (Expected)"
    },
    {
      institution: "Our Lady of Pillar Convent School",
      degree: "CBSE PCM",
      period: "Apr 2020 - May 2022"
    }
  ],
  workExperience: [
    {
      company: "Tata Technologies",
      role: "Software Engineering Intern",
      period: "Jun 2025 - Present",
      description: "Orchestrated scalable ETL data pipelines using LangChain and Python, integrating 1000+ enterprise documents with predictive analytics for data modernization. Architected FastAPI backends with real-time analytics, achieving 99.5% uptime and sub-2-second response times. Implemented RAG pipelines with FAISS indexing for data governance, improving accuracy by 40%. Deployed cloud workflows on AWS EC2 with Docker/CI/CD, reducing operational costs by 30%."
    }
  ],
  projects: [
    {
      title: "AI-Driven Business Proposal Generation Tool",
      description: "Optimized data processing pipelines using Hadoop and Spark for high-throughput ETL workflows, cutting processing time by 75%. Established a data governance framework with FAISS-based search for 99.5% data integrity. Developed 8 microservices with FastAPI for real-time analytics in investment data processing.",
      links: [],
      image: { url: "https://picsum.photos/600/400", aiHint: "business analytics" }
    },
    {
      title: "Cloud-Native Task Management System",
      description: "Engineered a scalable web application supporting over 100 users with PostgreSQL, handling more than 10GB of data. Created over 25 RESTful APIs with sub-200ms response times and integrated a real-time analytics dashboard. Orchestrated deployment using Docker and Kubernetes on AWS EC2, which reduced operational delays by 35%.",
      links: [],
      image: { url: "https://picsum.photos/600/400", aiHint: "task management" }
    },
    {
      title: "ML-Powered Credit Risk Analytics Engine",
      description: "Developed a machine learning system that processes over 50,000 loan applications for real-time risk assessment. Achieved 93% accuracy and 98% AUC-ROC, outperforming traditional models by 15%. Created a Streamlit interface serving over 200 daily users, reducing manual assessment time by 80%.",
      links: [],
      image: { url: "https://picsum.photos/600/400", aiHint: "credit risk" }
    },
    {
      title: "ML-Based Credit Risk Assessment Framework",
      description: "Authored research analyzing over 75,000 data points with ensemble models, achieving 94.2% prediction accuracy and a 3.5x improvement in scalability. This research is to be published in IEEE ICCCNT 2025.",
      links: [],
      image: { url: "https://picsum.photos/600/400", aiHint: "data analysis" }
    }
  ]
};
