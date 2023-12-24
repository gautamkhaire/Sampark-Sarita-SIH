import { useState, useEffect } from "react";
import { UserButton } from "@clerk/nextjs";

export const DateTime = () => {
  let [date, setDate] = useState(new Date());
  let [greeting, setGreeting] = useState("");

  useEffect(() => {
    let timer = setInterval(() => setDate(new Date()), 1000);
    const hours = date.getHours();
    if (hours < 12) {
      setGreeting("Good Morning");
    } else if (hours > 12 && hours < 17) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }

    return function cleanup() {
      clearInterval(timer);
    };
  });
  const optionsTime = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Use 24-hour format
  };
  const optionsDate = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  
  return (
    <div>
      <p className="text-3xl text-blue-500 font-semibold">{greeting}, Have a Nice Day 😄 !!</p>
      <p className="text-xl text-gray-400"> Time: <span className="text-2xl text-blue-500 font-medium">{date.toLocaleTimeString("en-GB", optionsTime)}</span></p>
      <p className="text-xl text-gray-400"> Date: <span className="text-2xl text-blue-500 font-medium">{date.toLocaleDateString("en-GB", optionsDate)}</span></p>
      <p className="text-xl text-blue-400"> </p>
    </div>
  );
};

export default DateTime;
