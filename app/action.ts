"use server";

import { databases, Query } from "@/libs/appWriteClient";
import { createSlug } from "@/libs/services/slugService";
import { nanoid } from "nanoid";
import { encrypt } from "@/libs/utils/encryption";
import { SlugData } from "@/types/slug"; // updated path for consistency

// Import any required databases, utils, etc.
// For example, if you're using a database to store shortened URLs

interface ShortenUrlResult {
  shortUrl?: string;
  error?: string;
}

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string;
const LIMITS_COLLECTION_ID = process.env
  .NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string;
const WRITE_LIMITS = 10; // Set your write limits here

export async function fetchTotalLimit(): Promise<number> {
    return WRITE_LIMITS
}

export async function shortenUrl(
  url: string,
  userId?: string
): Promise<ShortenUrlResult> {
  try {
    // Validate the URL
    if (!url || url.trim().length === 0) {
      return { error: "Please enter a valid URL." };
    }

    // Here you would implement the logic that was previously in your API route
    // For example:
    // 1. Check if the user has reached their daily limit
    // 2. Generate a short URL
    // 3. Store it in your database
    // 4. Return the shortened URL

    // Example implementation (replace with your actual logic):
    const validUrl = validateUrl(url);
    if (!validUrl) {
      return { error: "Invalid URL format" };
    }

    // Check user's daily limit
    if (userId) {
      const hasReachedLimit = await checkUserDailyLimit(userId);
      if (hasReachedLimit) {
        return { error: "You've reached your daily limit for URL shortening" };
      }
    }

    // Generate and store short URL
    const shortUrl = await generateAndStoreShortUrl(url, userId);

    return { shortUrl };
  } catch (error) {
    console.error("Server action error:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to shorten URL",
    };
  }
}

// Helper functions that you would implement based on your existing logic
function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

async function checkUserDailyLimit(
  userId: string
): Promise<boolean> {
  const today = new Date().toISOString().slice(0, 10);
  const limits = await databases.listDocuments(
    DATABASE_ID,
    LIMITS_COLLECTION_ID,
    [Query.equal("user_id", userId), Query.equal("date", today)]
  );
  // Implement logic to check if user has reached daily limit
  // Return true if limit reached, false otherwise
  return limits.total >= WRITE_LIMITS; // Placeholder
}


// In your actions.ts file
export async function fetchTodayLimit(userId?: string): Promise<{ total: number, error?: string }> {
    try {
      if (!userId) {
        return { total: 0 };
      }
      
      const total = await checkTotalDailyLimitUser(userId);
      return { total };
    } catch (error) {
      console.error("Error fetching today's limit:", error);
      return { 
        total: 0,
        error: error instanceof Error ? error.message : "Failed to fetch limit" 
      };
    }
  }
  
  async function checkTotalDailyLimitUser(userId: string): Promise<number> {
    const today = new Date().toISOString().slice(0, 10);
    const limits = await databases.listDocuments(
      DATABASE_ID,
      LIMITS_COLLECTION_ID,
      [Query.equal("user_id", userId), Query.equal("date", today)]
    );
    return limits.total;
  }

async function generateAndStoreShortUrl(
  url: string,
  userId?: string
): Promise<string> {
  // Implement logic to generate short URL and store in database
  // Return the generated short URL

  const encryptedUrl = encrypt(url);
  const slug = nanoid(6);
  const today = new Date().toISOString().slice(0, 10);

  // This is where you'd implement the core functionality from your API route
const data: SlugData = {
    slug,
    user_id: userId,
    date: today,
    url: encryptedUrl,
    clicks: 0,
  };
  const shortId = await createSlug(data);
  if (!shortId) {
    throw new Error("Failed to create short URL");
  }
  const fullShortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${slug}`;

  return fullShortUrl;

  
}
