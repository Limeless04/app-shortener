// lib/services/slugService.ts

import { databases, ID, Query } from '@/libs/appWriteClient';
import { SlugDocument, SlugData } from '@/types/slug';

const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!;

export const createSlug = async (data: SlugData) => {
  return await databases.createDocument<SlugDocument>(
    databaseId,
    collectionId,
    ID.unique(), // You can use your own ID if needed
    data
  );
};

export const getSlug = async (slug: string) => {
  // Assuming slug is stored as a unique field, not the doc ID:
  const result = await databases.listDocuments<SlugDocument>(
    databaseId,
    collectionId,
    [ 
      // Appwrite Query to match slug field
      // @ts-ignore until `Query.equal()` is typed
      Query.equal('slug', slug),
    ]
  );
  return result.documents[0] ?? null;
};
