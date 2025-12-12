import Image from "next/image";
import { useState, useEffect } from "react";

const ShimmerMessage = () => {
  const messages = [
    "Thinking...",
    "Loading...",
    "Generating response...",
    "Analyzing your request...",
    "Building your Website...",
    "Crafting the component...",
    "Optimizing the code...",
    "Adding final touches...",
    "Almost done...",
  ];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="flex items-center gap-2 ">
      <span className="text-base text-muted-foreground animate-pulse">
        {messages[currentMessageIndex]}
      </span>
    </div>
  );
};

export const MessageLoading = () => {
  return (
    <div className="flex flex-col group px-2 pb-4">
      <div className="flex items-center gap-23">
        <Image
          src="/logo.svg"
          alt="vibe"
          width={18}
          height={18}
          className="shrink-0"
        />
        <span className="text-sm font-medium">Vibe</span>
      </div>
      <div className="pl-8.5 flex flex-col gap-y-4">
        <ShimmerMessage />
      </div>
    </div>
  );
};
