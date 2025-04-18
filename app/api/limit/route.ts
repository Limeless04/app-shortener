import { NextRequest, NextResponse } from "next/server";
import { databases, Query } from '@/libs/appWriteClient';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string;
const LIMITS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string;


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    const today = new Date().toISOString().slice(0, 10);
    const limits = await databases.listDocuments(DATABASE_ID, LIMITS_COLLECTION_ID, [
      Query.equal('user_id', userId),
      Query.equal('date', today),
    ]);

    return NextResponse.json({ limits: limits.total });

   
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to shorten URL" }, { status: 500 });
  }
}