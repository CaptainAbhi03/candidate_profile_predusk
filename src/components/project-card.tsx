import type { FC } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Lightbulb } from 'lucide-react';
import type { Project, RankedProject } from '@/types';

interface ProjectCardProps {
  project: Project | RankedProject;
}

const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  const { title, description, links } = project;
  const isRankedProject = 'relevanceScore' in project;

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <CardHeader>
        <CardTitle className="font-headline">{title}</CardTitle>
        {isRankedProject && project.relevanceScore !== undefined && (
          <Badge 
            variant={project.relevanceScore > 0.7 ? "default" : "secondary"} 
            className="absolute top-4 right-4 bg-accent text-accent-foreground"
          >
            Relevance: {(project.relevanceScore * 100).toFixed(0)}%
          </Badge>
        )}
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {isRankedProject && project.reasoning && (
          <div className="mt-4 p-3 bg-accent/50 rounded-lg text-sm text-accent-foreground">
            <div className="flex items-center font-semibold mb-1">
              <Lightbulb className="mr-2 h-4 w-4 text-primary" />
              AI Reasoning
            </div>
            <p>{project.reasoning}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex flex-wrap gap-2">
          {links?.map((link, index) => (
            <a href={link} key={index} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                View Project <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
