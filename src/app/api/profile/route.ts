import { NextResponse } from 'next/server';
import { profileData } from '@/lib/data';

export async function GET() {
  return NextResponse.json(profileData);
}
