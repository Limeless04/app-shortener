// types/slug.ts
import type { Models } from 'appwrite';

export interface SlugData {
    slug: string;      // The short unique code
    url: string;       // The full destination URL
    clicks?: number;   // Optional: how many times it's been clicked
  }
  

// Use Appwrite's Document type to add metadata fields
export type SlugDocument = SlugData & Models.Document;