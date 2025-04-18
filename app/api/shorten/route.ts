import { createSlug } from "@/libs/services/slugService";
import { nanoid } from "nanoid";
import { encrypt } from "@/libs/utils/encryption";
import { SlugData } from "@/types/slug"; // updated path for consistency
import { NextRequest, NextResponse } from "next/server";
import { databases, Query } from '@/libs/appWriteClient';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string;
const LIMITS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string;
export const WRITE_LIMITS = 10

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, url } = body;

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "Invalid or missing URL" }, { status: 400 });
    }

    const today = new Date().toISOString().slice(0, 10);
    const limits = await databases.listDocuments(DATABASE_ID, LIMITS_COLLECTION_ID, [
      Query.equal('user_id', userId),
      Query.equal('date', today),
    ]);

    if (limits.total < WRITE_LIMITS) {
      const encryptedUrl = encrypt(url);
      const slug = nanoid(6);
  
      const data: SlugData = {
        slug,
        user_id: userId,
        date: today,
        url: encryptedUrl,
        clicks: 0,
      };
  
      await createSlug(data);
  
      const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  
      return NextResponse.json({ shortUrl: `${origin}/${slug}` });
    }else{
      return NextResponse.json({ error: `Daily write limit reached (${limits.total}/${WRITE_LIMITS})` }, { status: 403 });
    }

   
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to shorten URL" }, { status: 500 });
  }
}
