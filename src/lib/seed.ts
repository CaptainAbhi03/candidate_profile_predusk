// @ts-nocheck
import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
import { profileData } from './data';

// Load environment variables from .env file
config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;

async function seedDatabase() {
  if (!uri || !dbName) {
    console.error('Missing MONGODB_URI or MONGODB_DB_NAME in .env file.');
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB.');

    const db = client.db(dbName);
    const collection = db.collection('profile');

    // Clear existing data
    await collection.deleteMany({});
    console.log('Cleared existing data from the profile collection.');

    // Insert new data
    const result = await collection.insertOne(profileData);
    console.log(`Successfully inserted 1 document into the profile collection.`);
    console.log(`Document ID: ${result.insertedId}`);

  } catch (error) {
    console.error('Failed to seed database:', error);
  } finally {
    await client.close();
    console.log('MongoDB connection closed.');
  }
}

seedDatabase();
