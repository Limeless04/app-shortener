import { createSlug } from "@/libs/services/slugService";
import { nanoid } from "nanoid";
import { encrypt } from "@/libs/utils/encryption";
import { SlugData } from "@/types/slug"; // updated path for consistency
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "Invalid or missing URL" }, { status: 400 });
    }

    const encryptedUrl = encrypt(url);
    const slug = nanoid(6);

    const data: SlugData = {
      slug,
      url: encryptedUrl,
      clicks: 0,
    };

    await createSlug(data);

    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    return NextResponse.json({ shortUrl: `${origin}/${slug}` });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to shorten URL" }, { status: 500 });
  }
}
