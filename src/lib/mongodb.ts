import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

class MissingEnvError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MissingEnvError';
  }
}

export async function connectToDatabase() {
  if (!uri) {
    throw new MissingEnvError('Please define the MONGODB_URI environment variable inside .env');
  }
  if (!dbName) {
    throw new MissingEnvError('Please define the MONGODB_DB_NAME environment variable inside .env');
  }

  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri!);
  await client.connect();
  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}