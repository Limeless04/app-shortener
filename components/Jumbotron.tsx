"use client";

import React, { useEffect, useState } from "react";

interface Motto {
  title: string;
  message: string;
}

const Jumbotron = () => {
  const mottos: Motto[] = [
    { title: "Simple", message: "– even your cat could use it 🐱" },
    { title: "Fast", message: "– blink and it's already done ⚡️" },
    {
      title: "Reliable",
      message:
        "– don’t worry, after you use it, we forget it like last week's pizza 🍕",
    },
    {
      title: "Secure",
      message: "– we encrypted your URL so well, even *we* can't peek 🔐",
    },
    {
      title: "Free",
      message: "– like the office snacks... until budget cuts 🍩",
    },
  ];

  const gradients = [
    "from-pink-500 to-yellow-500",
    "from-blue-500 to-green-500",
    "from-purple-500 to-pink-500",
    "from-red-400 to-orange-500",
    "from-cyan-400 to-indigo-500",
  ];

  const [gradient, setGradient] = useState<string>(gradients[0]);
  const [isVisible, setIsVisible] = useState<boolean>(true); // Start with visible
  const [currentMottoIndex, setCurrentMottoIndex] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false); // Fade out

      setTimeout(() => {
        setCurrentMottoIndex((prevIndex) => (prevIndex + 1) % mottos.length);
        setGradient(gradients[Math.floor(Math.random() * gradients.length)]);

        setIsVisible(true); // Fade in
      }, 300); // 300ms fade-out duration
    }, 2000);

    return () => clearInterval(interval);
  }, [currentMottoIndex]);

  return (
    <div className="text-center py-3 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white">
          The Only URL{" "}
          <span
            className={`bg-clip-text text-transparent bg-gradient-to-r ${gradient} transition-opacity duration-300`}
          >
            Shortener
          </span>{" "}
          You’ll Ever Need
        </h1>
        <p className="mt-4 text-lg text-white transition-opacity duration-300 ease-in-out">
          <span
            className={`bg-clip-text text-transparent bg-gradient-to-r ${gradient} ${
              isVisible ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300`}
          >
            {mottos[currentMottoIndex].title}
          </span>{" "}
          <span
            className={`${
              isVisible ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300`}
          >
            {mottos[currentMottoIndex].message}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Jumbotron;
