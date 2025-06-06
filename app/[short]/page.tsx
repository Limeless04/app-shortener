
import { getSlug } from '@/libs/services/slugService';
import { decrypt } from '@/libs/utils/encryption';
import { redirect } from 'next/navigation';
import { use } from "react";

type Params = Promise<{ short: string }>;

export default async function RedirectPage(props: { params: Params }) {
  // Fetch data for the given slug
  const params = await props.params;
  const short = params.short;
  const data = await getSlug(short);

  if (data?.url) {
    // If data exists, redirect to the target URL
    const decryptedUrl = decrypt(data.url);
    redirect(decryptedUrl);
  }

  // If no data, redirect to 404 or handle as needed
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-500 mb-6">
          The short URL you're looking for doesn't exist or has been removed.
        </p>
      </div>
    </div>
  );
}