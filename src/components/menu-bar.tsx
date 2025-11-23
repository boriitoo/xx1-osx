"use client";

import Image from "next/image";
import Logo from "@/assets/images/apple_logo.png";
import { useState, useEffect } from "react";
import { Ellipsis, Wifi } from "lucide-react";

export function MenuBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[30px] bg-white/80 backdrop-blur-md text-gray-900 px-10 flex justify-between items-center text-xs font-medium">
      <div className="flex items-center space-x-4">
        <div className="h-[16px] w-[16px] relative flex-shrink-0">
          <Image src={Logo} alt="Logo" height={16} className="object-contain" />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Ellipsis />
        <div>{time}</div>
      </div>
    </div>
  );
}
