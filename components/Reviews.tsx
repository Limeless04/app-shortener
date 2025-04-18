"use client";

import React, { useEffect, useState } from "react";

interface Review {
  quote: string;
  author: string;
}

const reviews: Review[] = [
  {
    quote: "I used this URL shortener once and now I’m legally a tech bro.",
    author: "Guy Who Definitely Knows JavaScript",
  },
  {
    quote: "I shortened a link and my Wi-Fi got faster. Coincidence? I think not.",
    author: "Totally Real Internet Scientist",
  },
  {
    quote: "Finally, a product that does one thing... and still makes me feel like I’m doing too much.",
    author: "Overachieving Underachiever",
  },
  {
    quote: "Before this, I sent my friends full-length URLs. Now I have none.",
    author: "Formerly Popular Person",
  },
  {
    quote: "It’s so simple even I could use it. And I once Googled 'how to Google'.",
    author: "Your Aunt Karen",
  },
  {
    quote: "Used this link shortener and now my emails look 37% more professional.",
    author: "Self-Proclaimed Productivity Guru",
  },
  {
    quote: "I clicked a short link and accidentally became a startup founder.",
    author: "Guy Pitching an App That Already Exists",
  },
  {
    quote: "One small link for man, one giant leap for my group chat etiquette.",
    author: "Buzzfeed Comment Section Philosopher",
  },
  {
    quote: "My links used to be long and confusing. Now they’re short and mysterious.",
    author: "Digital Minimalist in Denial",
  },
  {
    quote: "This tool saved me three characters. I’m retiring early.",
    author: "Efficiency Enthusiast with 14 To-Do Lists",
  },
  {
    quote: "I use this to look cooler when I send links. It's not working.",
    author: "Guy Who Thinks Coolness Is Clickable",
  },
  {
    quote: "Back in my day, URLs were long and we liked it that way.",
    author: "Disgruntled Internet Historian",
  },
  {
    quote: "Finally found a URL shortener that doesn’t ask for my star sign first.",
    author: "Privacy-Conscious Millennial",
  },
  {
    quote: "I shortened a URL and suddenly my ex texted me back. Coincidence?",
    author: "Hopeful Digital Romantic",
  },
  {
    quote: "It's like a haircut for your links. Fresh, clean, and mildly intimidating.",
    author: "Barber Who Just Got Into Tech",
  },
];

const FakeReview: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false); // trigger fade out

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % reviews.length);
        setVisible(true); // fade in after index change
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4 max-w-xs rounded-lg text-center text-white bg-gray-900/30 animate-fadeIn z-10 transition-all duration-300 ease-in-out">
      <p
        className={`text-lg italic transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        "{reviews[index].quote}"
        <br />
        <span className="font-semibold">– {reviews[index].author}</span>
      </p>
    </div>
  );
};

export default FakeReview;
