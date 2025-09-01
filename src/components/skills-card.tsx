import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wrench } from 'lucide-react';

interface SkillsCardProps {
  skills: string[];
}

const SkillsCard: FC<SkillsCardProps> = ({ skills }) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <Wrench className="mr-2 text-primary" /> Skills
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-sm font-normal">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsCard;
