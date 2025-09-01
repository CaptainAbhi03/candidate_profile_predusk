import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

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
