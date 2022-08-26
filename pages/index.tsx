import { useEffect, useRef, useState } from "react";

import Links from "../components/links";
import Stock from "../components/stock";

export default function Home() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      window.location.href = `https://www.google.com/search?q=${event.currentTarget.value}`;
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const links = [
    // { href: "https://www.google.com/", name: "Google" },
    // { href: "https://www.apple.com/", name: "Apple" },
    // { href: "https://www.microsoft.com/", name: "Microsoft" },
    // { href: "https://www.facebook.com/", name: "Facebook" },
    { href: "https://www.twitter.com/", name: "Twitter" },
    { href: "https://www.instagram.com/", name: "Instagram" },
    { href: "https://www.youtube.com/", name: "YouTube" },
    { href: "https://www.linkedin.com/", name: "LinkedIn" },
    { href: "https://www.amazon.ca/", name: "Amazon CA" },
    // { href: "https://www.ebay.com/", name: "Ebay" },
    { href: "https://www.netflix.com/", name: "Netflix" },
    // github
    { href: "https://www.github.com/", name: "Github" },
    // trello
    { href: "https://www.trello.com/", name: "Trello" },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white gap-4">
      <div className="flex flex-col w-32">
        <Stock />
      </div>
      <div className="flex flex-col">
        <div className="grid place-items-center">
          {/* if time past noon, say good afternoon */}
          <h2 className="text-3xl">
            {time.getHours() > 12
              ? "Good Afternoon, Alex"
              : "Good Morning, Alex"}
          </h2>
          <h1 className="text-5xl">{time.toLocaleTimeString()}</h1>
        </div>
        <div>
          <input
            ref={inputRef}
            type="text"
            onKeyDown={handleKeyDown}
            className="bg-gray-900 border rounded-full border-gray-500 p-4 w-full"
            placeholder="Google Search"
          />
        </div>
        <div className="flex justify-center underline hover:no-underline mt-4">
          <a href="https://google.com">Actual Google Website</a>
        </div>
        <div className="grid lg:grid-cols-6 md:grid-cols-4 gap-4 mt-10 place-content-center">
          {links.map((link, index) => (
            <Links key={index} {...link} />
          ))}
        </div>
      </div>
      <div className="w-32"></div>
    </div>
  );
}
