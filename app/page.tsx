"use client";
import Jumbotron from "../components/Jumbotron";
import Navbar from "../components/Navbar";
import React, { useState, useEffect } from "react";
import Toast from "@/components/Toast";
import {
  getRandomMessage,
  getRandomTopMessage,
} from "@/libs/utils/randomMessage";

export default function Home() {
  // Handle this form submission
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [url, setUrl] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [copiedSlug, setCopiedSlug] = useState<string>("");

  const randomMessage = getRandomMessage();
  const randomTopMessage = getRandomTopMessage();

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

    if (!url) {
      setError("Please enter a valid URL.");
      setIsLoading(false); // reset loading state
      return;
    }

    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      setSlug(data.shortUrl);
      if (!res.ok) {
        setError(data.error || "Unknown error");
        console.error(data.error || "Unknown error");
        return;
      }
    } catch (error) {
      setError(error as string);
      console.error("Failed to shorten URL:", error);
    } finally {
      setIsLoading(false);
      setUrl("");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-center">
        <Jumbotron />
        <section className="flex flex-col gap-4 items-center justify-center">
          <form className="flex flex-col gap-4" onSubmit={handleOnSubmit}>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter url here"
              className=" w-100 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isLoading ? "Loading..." : "Shorten URL"}
            </button>
          </form>
        </section>
      </main>
      <section className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        {slug && (
          <div className="p-10 border border-gray-600 bg-gray-900/30 rounded-lg animate-fadeIn">
            <p className="text-center">
              {randomTopMessage}
              <a
                onClick={handleCopyLink}
                className="text-blue-500 hover:text-blue-600 mt-2 py-2 px-4 block border border-blue-500 rounded-md hover:bg-blue-100 hover:border-blue-600 transition-all"
              >
                {slug}
              </a>
              <span className="text-sm text-red-400 p-1 rounded-sm mt-2 block">
                {randomMessage}
              </span>
            </p>
          </div>
        )}

        {error && (
          <div className="py-2 px-5 bg-red-500 rounded-lg animate-fadeIn">
            <p className="text-center text-white">
              Oops... Something went wrong! If only we had a crystal ball to fix
              this. But seriously, here's the error: {error}
            </p>
          </div>
        )}

        {showToast && (
          <Toast
            message={`Copied ${copiedSlug} to clipboard!`}
            show={showToast}
            onClose={() => setShowToast(false)}
          />
        )}
      </section>{" "}
    </div>
  );
}
