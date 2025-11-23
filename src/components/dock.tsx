"use client";
import safari from "@/assets/icons/safari.png";
import finder from "@/assets/icons/finder.png";
import terminal from "@/assets/icons/terminal.png";
import calculator from "@/assets/icons/calculator.png";
import Image, { StaticImageData } from "next/image";
import React from "react";

interface AppData {
  name: string;
  icon: StaticImageData;
}

const apps: AppData[] = [
  {
    name: "finder",
    icon: finder,
  },
  {
    name: "safari",
    icon: safari,
  },
  {
    name: "calculator",
    icon: calculator,
  },
  {
    name: "terminal",
    icon: terminal,
  },
];

function DockIcon({ appData }: { appData: AppData }) {
  const [isHovered, setHovered] = React.useState(false);
  return (
    <div
      className={"relative flex items-center group"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`
          absolute -top-12 px-3 py-1 rounded-lg bg-gray-200/80 backdrop-blur-sm border border-white/20
          text-black text-xs font-medium shadow-sm
          transition-opacity duration-200 pointer-events-none
          ${isHovered ? "opacity-100" : "opacity-0"}
        `}
      >
        {appData.name}
      </div>
      <Image
        className={"w-[50px] h-[50px] my-2"}
        src={appData.icon}
        alt={appData.name}
      />
    </div>
  );
}

export function Dock() {
  return (
    <div
      className="absolute flex bottom-0 mb-10 left-1/2 -translate-x-1/2 w-max
      bg-white/20 border backdrop-blur-xl
      gap-2 px-3
      shadow-2xl shadow-black/10 border-white/20 rounded-2xl"
    >
      {apps.map((app) => (
        <DockIcon key={app.name} appData={app} />
      ))}
    </div>
  );
}
