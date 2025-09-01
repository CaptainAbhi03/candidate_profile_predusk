import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Briefcase } from 'lucide-react';
import type { WorkExperience } from '@/types';

interface WorkExperienceCardProps {
  work: WorkExperience[];
}

const WorkExperienceCard: FC<WorkExperienceCardProps> = ({ work }) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <Briefcase className="mr-2 text-primary" /> Work Experience
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {work.map((job, index) => (
          <div key={index}>
            <div className="mb-4">
              <h3 className="font-semibold">{job.role}</h3>
              <p className="text-sm font-medium text-primary">{job.company}</p>
              <p className="text-xs text-muted-foreground mb-2">{job.period}</p>
              <p className="text-sm text-muted-foreground">{job.description}</p>
            </div>
            {index < work.length - 1 && <Separator />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default WorkExperienceCard;
