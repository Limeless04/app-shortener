"use client";
import Jumbotron from "../components/Jumbotron";
import Navbar from "../components/Navbar";
import Reviews from "../components/Reviews";
import React, { useEffect, useState, useCallback } from "react";
import Toast from "@/components/Toast";
import {
  getRandomMessage,
  getRandomTopMessage,
} from "@/libs/utils/randomMessage";
import { useAnonymous } from "@/libs/hooks/useAnonymous";
import { shortenUrl, fetchTodayLimit, fetchTotalLimit } from "./action";

export default function Home() {
  // Handle this form submission
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [url, setUrl] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [copiedSlug, setCopiedSlug] = useState<string>("");
  const { user, loading } = useAnonymous();

  const randomMessage = getRandomMessage();
  const randomTopMessage = getRandomTopMessage();

  // New state for limit management
  const [limit, setLimit] = useState<number>(0);
  const [totalLimit, setTotalLimit] = useState<number>(0);
  const [limitLoading, setLimitLoading] = useState<boolean>(false);
  const [limitError, setLimitError] = useState<string>("");

  const handleCopyLink = () => {
    navigator.clipboard.writeText(slug).then(() => {
      setCopiedSlug(slug);
      setShowToast(true);
    });
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setSlug("");
    setError("");
    if (!url || url.trim().length === 0) {
      setError("Please enter a valid URL.");
      setIsLoading(false); // reset loading state
      return;
    }

    try {
      // Call the server action to shorten the URL
      const result = await shortenUrl(url, user?.$id);

      if (result.error) {
        setError(result.error);
      } else if (result.shortUrl) {
        setSlug(result.shortUrl);

        fetchUserLimit(); // Fetch the user's limit after shortening the URL
      } else {
        setError("No short URL was returned");
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
      console.error("Failed to shorten URL:", error);
    } finally {
      setIsLoading(false);
      setUrl("");
    }
  };

  // Function to fetch the user's daily limit
  const fetchUserLimit = useCallback(async () => {
    if (!user?.$id) return;

    setLimitLoading(true);
    try {
      const result = await fetchTodayLimit(user.$id);
      const resTotalLimit = await fetchTotalLimit();
      if (result.error) {
        setLimitError(result.error);
      } else {
        setLimit(result.total);
        setTotalLimit(resTotalLimit);
      }
    } catch (error) {
      setLimitError(
        error instanceof Error ? error.message : "Failed to fetch limit"
      );
    } finally {
      setLimitLoading(false);
    }
  }, [user?.$id]);

  // Fetch limit when user loads or changes
  useEffect(() => {
    fetchUserLimit();
  }, [fetchUserLimit]);

  return (
    <>
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Jumbotron */}
      <div className="mt-[200px]">
        <Jumbotron />
      </div>

      {/* Main Content */}
      <div className="flex flex-col justify-center items-center p- pb-16 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 items-center w-full">
          {/* URL Shortener Form */}
          {!loading ? (
            <div className="text-center mb-4 p-4 bg-gray-900/30 border border-gray-600 rounded-lg max-w-[500px] w-full mx-auto">
              <p>
                You're now logged in as <br />
                <strong>{user?.username}</strong>.
              </p>
              <p>
                You've{" "}
                {limitLoading ? (
                  <span className="inline-block w-6 animate-pulse text-gray-400">
                    ...
                  </span>
                ) : (
                  <span className="font-bold text-white">
                    {limit}/{totalLimit}
                  </span>
                )}{" "}
                {limit === 1 ? "shortening left" : "shortenings left"} today.
              </p>
              {limitError && (
                <p className="text-red-400 text-sm mt-1">{limitError}</p>
              )}
            </div>
          ) : (
            <div className="text-center mb-4 p-4 bg-gray-900/30 border border-gray-600 rounded-lg max-w-[500px] w-full mx-auto animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-2/4 mx-auto mb-1"></div>
              <div className="h-4 bg-gray-800 rounded w-1/3 mx-auto"></div>
            </div>
          )}

          <section className="flex flex-col gap-6 items-center justify-center w-full p-2">
            <form
              className="flex flex-col gap-6 items-center w-full"
              onSubmit={handleOnSubmit}
            >
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL here"
                className="w-full max-w-[500px] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-[200px]"
              >
                {isLoading ? "Loading..." : "Shorten URL"}
              </button>
            </form>
          </section>

          {/* Result Section */}
          <section className="flex gap-4 flex-wrap items-center justify-center w-full">
            {slug && (
              <div className="p-8 border border-gray-600 bg-gray-900/30 rounded-lg animate-fadeIn text-center max-w-[500px] w-full">
                <p>{randomTopMessage}</p>
                <a
                  onClick={handleCopyLink}
                  className="text-blue-500 hover:text-blue-600 mt-4 py-2 px-4 block border border-blue-500 rounded-md hover:bg-blue-100 hover:border-blue-600 transition-all cursor-pointer"
                >
                  {slug}
                </a>
                <span className="text-sm text-red-400 mt-2 block">
                  {randomMessage}
                </span>
              </div>
            )}

            {error && (
              <div className="py-4 px-6 bg-red-500 text-white rounded-lg animate-fadeIn text-center w-full max-w-[500px]">
                Oops... Something went wrong! <br />
                If only we had a crystal ball to fix this. <br />
                But seriously, here's the error: <br />
                {error}
              </div>
            )}

            {showToast && (
              <Toast
                message={`Copied ${copiedSlug} to clipboard!`}
                show={showToast}
                onClose={() => setShowToast(false)}
              />
            )}
          </section>
        </main>

        {/* Reviews */}
        <div className="flex justify-center p-5">
          <Reviews />
        </div>
      </div>
    </>
  );
}
