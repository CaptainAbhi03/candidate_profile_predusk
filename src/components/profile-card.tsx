import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Mail, Github, Linkedin, Globe } from 'lucide-react';
import type { Profile } from '@/types';

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard: FC<ProfileCardProps> = ({ profile }) => {
  const { name, title, email, links } = profile;
  const initials = name.split(' ').map(n => n[0]).join('');

  return (
    <Card className="shadow-lg">
      <CardHeader className="text-center">
        <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/20">
          <AvatarImage src={`https://i.pravatar.cc/150?u=${email}`} alt={name} />
          <AvatarFallback className="text-3xl bg-primary/30 text-primary-foreground">
            {initials}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-2xl font-headline">{name}</CardTitle>
        <p className="text-muted-foreground">{title}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <a href={`mailto:${email}`} className="w-full">
            <Button variant="outline" className="w-full justify-start">
            <Mail className="mr-2" /> {email}
            </Button>
        </a>
        <div className="flex justify-around pt-2">
            <a href={links.github} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                    <Github className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
                    <span className="sr-only">GitHub</span>
                </Button>
            </a>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                    <Linkedin className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
                    <span className="sr-only">LinkedIn</span>
                </Button>
            </a>
            <a href={links.portfolio} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                    <Globe className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
                    <span className="sr-only">Portfolio</span>
                </Button>
            </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
