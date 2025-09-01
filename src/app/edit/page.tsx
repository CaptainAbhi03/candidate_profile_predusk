
"use client";

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { ProfileSchema } from '@/types/zod-schema';
import type { Profile } from '@/types';
import { Trash2, PlusCircle, Loader2 } from 'lucide-react';

export default function EditProfilePage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast();

    const form = useForm<Profile>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: async () => {
            try {
                const res = await fetch('/api/profile');
                if (!res.ok) {
                    throw new Error('Failed to fetch profile data');
                }
                const data = await res.json();
                return data;
            } catch (error) {
                console.error(error);
                toast({ title: "Error", description: "Could not load profile data.", variant: "destructive" });
                return {};
            } finally {
                setIsLoading(false);
            }
        },
    });

    const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({ control: form.control, name: "skills" });
    const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({ control: form.control, name: "education" });
    const { fields: workFields, append: appendWork, remove: removeWork } = useFieldArray({ control: form.control, name: "workExperience" });
    const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({ control: form.control, name: "projects" });

    const handleLogin = () => {
        // In a real app, you'd want a more secure auth method.
        // This is a simple check against an environment variable on the server.
        if (password) {
            sessionStorage.setItem('edit-token', password);
            setIsAuthenticated(true);
            toast({ title: "Authenticated", description: "You can now edit the profile." });
        } else {
            toast({ title: "Error", description: "Password is required.", variant: "destructive" });
        }
    };
    
    useEffect(() => {
        const token = sessionStorage.getItem('edit-token');
        if (token) {
            setPassword(token);
            setIsAuthenticated(true);
        }
    }, []);

    async function onSubmit(data: Profile) {
        setIsSaving(true);
        try {
            const token = sessionStorage.getItem('edit-token');
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                 },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 401) {
                    toast({ title: "Authentication Failed", description: "Your password might be incorrect. Please log in again.", variant: "destructive"});
                    setIsAuthenticated(false);
                    sessionStorage.removeItem('edit-token');
                } else {
                    throw new Error(errorData.error || 'Failed to save profile');
                }
            } else {
                 toast({
                    title: 'Profile Updated',
                    description: 'Your profile has been saved successfully.',
                });
            }
        } catch (error: any) {
            toast({
                title: 'Error Saving Profile',
                description: error.message,
                variant: 'destructive',
            });
        } finally {
            setIsSaving(false);
        }
    }
    
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle>Admin Access</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">Enter the password to edit the profile.</p>
                        <Input 
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                        />
                        <Button onClick={handleLogin} className="w-full">Login</Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    
                    {/* General Info */}
                    <Card>
                        <CardHeader><CardTitle>General Information</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="title" render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        </CardContent>
                    </Card>

                    {/* Links */}
                    <Card>
                        <CardHeader><CardTitle>Links</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <FormField control={form.control} name="links.github" render={({ field }) => (<FormItem><FormLabel>GitHub</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="links.linkedin" render={({ field }) => (<FormItem><FormLabel>LinkedIn</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="links.portfolio" render={({ field }) => (<FormItem><FormLabel>Portfolio</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        </CardContent>
                    </Card>

                    {/* Skills */}
                    <Card>
                        <CardHeader><CardTitle>Skills</CardTitle></CardHeader>
                        <CardContent>
                            {skillFields.map((field, index) => (
                                <FormField key={field.id} control={form.control} name={`skills.${index}`} render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center gap-2 mb-2">
                                            <FormControl><Input {...field} /></FormControl>
                                            <Button type="button" variant="destructive" size="icon" onClick={() => removeSkill(index)}><Trash2 /></Button>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                            ))}
                             <Button type="button" variant="outline" size="sm" onClick={() => appendSkill('')}><PlusCircle className="mr-2"/> Add Skill</Button>
                        </CardContent>
                    </Card>
                    
                    {/* Education */}
                    <Card>
                         <CardHeader><CardTitle>Education</CardTitle></CardHeader>
                         <CardContent className="space-y-6">
                            {eduFields.map((field, index) => (
                                <div key={field.id} className="p-4 border rounded-md space-y-4 relative">
                                    <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeEdu(index)}><Trash2 className="text-destructive"/></Button>
                                    <FormField control={form.control} name={`education.${index}.institution`} render={({ field }) => (<FormItem><FormLabel>Institution</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name={`education.${index}.degree`} render={({ field }) => (<FormItem><FormLabel>Degree</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name={`education.${index}.period`} render={({ field }) => (<FormItem><FormLabel>Period</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                </div>
                            ))}
                            <Button type="button" variant="outline" size="sm" onClick={() => appendEdu({ institution: '', degree: '', period: ''})}><PlusCircle className="mr-2"/> Add Education</Button>
                         </CardContent>
                    </Card>

                    {/* Work Experience */}
                    <Card>
                        <CardHeader><CardTitle>Work Experience</CardTitle></CardHeader>
                        <CardContent className="space-y-6">
                            {workFields.map((field, index) => (
                                <div key={field.id} className="p-4 border rounded-md space-y-4 relative">
                                    <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeWork(index)}><Trash2 className="text-destructive"/></Button>
                                    <FormField control={form.control} name={`workExperience.${index}.company`} render={({ field }) => (<FormItem><FormLabel>Company</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name={`workExperience.${index}.role`} render={({ field }) => (<FormItem><FormLabel>Role</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name={`workExperience.${index}.period`} render={({ field }) => (<FormItem><FormLabel>Period</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name={`workExperience.${index}.description`} render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                                </div>
                            ))}
                            <Button type="button" variant="outline" size="sm" onClick={() => appendWork({ company: '', role: '', period: '', description: ''})}><PlusCircle className="mr-2"/> Add Work Experience</Button>
                        </CardContent>
                    </Card>
                    
                    {/* Projects */}
                    <Card>
                        <CardHeader><CardTitle>Projects</CardTitle></CardHeader>
                        <CardContent className="space-y-6">
                            {projectFields.map((field, index) => (
                                <div key={field.id} className="p-4 border rounded-md space-y-4 relative">
                                    <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeProject(index)}><Trash2 className="text-destructive"/></Button>
                                    <FormField control={form.control} name={`projects.${index}.title`} render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name={`projects.${index}.description`} render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name={`projects.${index}.image.url`} render={({ field }) => (<FormItem><FormLabel>Image URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name={`projects.${index}.image.aiHint`} render={({ field }) => (<FormItem><FormLabel>Image AI Hint</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                </div>
                            ))}
                             <Button type="button" variant="outline" size="sm" onClick={() => appendProject({ title: '', description: '', links: [], image: {url: '', aiHint: ''}})}><PlusCircle className="mr-2"/> Add Project</Button>
                        </CardContent>
                    </Card>
                    
                    <Button type="submit" disabled={isSaving}>
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                    </Button>
                </form>
            </Form>
        </div>
    );
}
