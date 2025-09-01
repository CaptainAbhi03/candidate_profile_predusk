"use client";

import { useState, useTransition } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast"
import ProjectCard from './project-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Sparkles, Files } from 'lucide-react';
import type { Project, RankedProject } from '@/types';

interface ProjectSearchProps {
  projects: Project[];
}

export default function ProjectSearch({ projects: initialProjects }: ProjectSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const [results, setResults] = useState<(RankedProject | Project)[]>(initialProjects);
  const { toast } = useToast();

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Search query empty",
        description: "Please enter a skill to search for.",
        variant: "destructive",
      });
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch('/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ skill: searchQuery }),
        });

        if (!response.ok) {
          throw new Error('Search request failed');
        }

        const data: RankedProject[] = await response.json();
        setResults(data);
        if (data.length === 0) {
            toast({
                title: "No relevant projects found",
                description: "Try a different skill or broader term.",
            });
        }
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Could not perform search. Please try again later.",
          variant: "destructive",
        });
      }
    });
  };
  
  const handleClear = () => {
    setSearchQuery('');
    setResults(initialProjects);
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <Files className="mr-2 text-primary" /> Projects
        </CardTitle>
        <div className="flex w-full items-center space-x-2 pt-4">
          <Input
            type="text"
            placeholder="Search projects by skill (e.g., 'React', 'Python')"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            disabled={isPending}
            className="bg-card"
          />
          <Button onClick={handleSearch} disabled={isPending}>
            <Sparkles className="mr-2 h-4 w-4" /> AI Search
          </Button>
          <Button onClick={handleClear} variant="outline" disabled={isPending}>
            Clear
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isPending ? (
            Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="space-y-2 p-4 border rounded-lg">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <div className="pt-4 flex gap-2">
                        <Skeleton className="h-8 w-24" />
                    </div>
                </div>
            ))
          ) : results.length > 0 ? (
            results.map((project, index) => (
              <ProjectCard key={index} project={project as RankedProject} />
            ))
          ) : (
            <div className="md:col-span-2 text-center text-muted-foreground py-16">
              <Search className="mx-auto h-12 w-12 mb-4" />
              <p>No projects found.</p>
              <p className="text-sm">Try searching for a skill or clearing the search.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
