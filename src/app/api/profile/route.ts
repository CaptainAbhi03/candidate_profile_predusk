import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { getAuth } from '@clerk/nextjs/server';
import type { NextApiRequest } from 'next';
import { headers } from 'next/headers';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    // Assuming you have a 'profile' collection with a single document.
    const profile = await db.collection('profile').findOne({});

    if (!profile) {
      return NextResponse.json({ error: 'Profile data not found' }, { status: 404 });
    }

    // Remove the _id field from the response
    const { _id, ...profileData } = profile;

    return NextResponse.json(profileData);
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    return NextResponse.json({ error: 'An error occurred while fetching profile data.' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
    const headersList = headers();
    const authorization = headersList.get('authorization');

    if (authorization !== `Bearer ${process.env.EDIT_PASSWORD}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const profileData = await request.json();
        const { db } = await connectToDatabase();
        
        // In this single-profile app, we find the existing document to update it.
        // A more robust app might use a specific _id.
        const result = await db.collection('profile').findOneAndReplace({}, profileData, { upsert: true, returnDocument: 'after' });

        if (!result) {
            return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
        }
        
        const { _id, ...updatedProfile } = result;

        return NextResponse.json(updatedProfile);
    } catch (error) {
        console.error('Failed to update profile:', error);
        return NextResponse.json({ error: 'An error occurred while updating profile data.' }, { status: 500 });
    }
}
