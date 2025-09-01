import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { GraduationCap } from 'lucide-react';
import type { Education } from '@/types';

interface EducationCardProps {
  education: Education[];
}

const EducationCard: FC<EducationCardProps> = ({ education }) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <GraduationCap className="mr-2 text-primary" /> Education
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {education.map((edu, index) => (
          <div key={index}>
            <div className="mb-4">
              <h3 className="font-semibold">{edu.institution}</h3>
              <p className="text-sm text-muted-foreground">{edu.degree}</p>
              <p className="text-xs text-muted-foreground">{edu.period}</p>
            </div>
            {index < education.length - 1 && <Separator />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default EducationCard;
