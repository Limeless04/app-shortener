"use client";
import Jumbotron from "./_components/jumbotron";
import Navbar from "./_components/navbar";
import { useState } from "react";
export default function Home() {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const handleShorten = () => {
    setIsLoading(true); 
    // setIsLoading(true);
    console.log("Shortening URL...");
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <Navbar />
      
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-center">
      <Jumbotron />
        <section className="flex flex-col gap-4 items-center justify-center">
        <form className="flex flex-col gap-4">
                  <input 
                    type="text"
                    placeholder="Enter text here"
                    className=" w-100 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    onClick={handleShorten}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {isLoading ? "Loading..." : "Shorten URL"}
                  </button>
                </form>

        </section>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}