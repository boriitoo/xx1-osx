"use client";

import React, { useState, useRef } from "react";

interface DesktopProps {
  children: React.ReactNode;
}

interface SelectionBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function Desktop({ children }: DesktopProps) {
  const [selection, setSelection] = useState<SelectionBox | null>(null);
  const startPos = useRef<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) return;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    startPos.current = { x, y };
    setSelection({ x, y, width: 0, height: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!startPos.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    const newX = Math.min(startPos.current.x, currentX);
    const newY = Math.min(startPos.current.y, currentY);
    const newWidth = Math.abs(currentX - startPos.current.x);
    const newHeight = Math.abs(currentY - startPos.current.y);

    setSelection({
      x: newX,
      y: newY,
      width: newWidth,
      height: newHeight,
    });
  };

  const handleMouseUp = () => {
    startPos.current = null;
    setSelection(null);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="relative w-full h-screen overflow-hidden bg-[url(/assets/wallpaper.png)] bg-cover select-none"
    >
      {children}

      {selection && (
        <div
          className="absolute border border-white/20 bg-blue-400/20 rounded-sm pointer-events-none z-0"
          style={{
            left: selection.x,
            top: selection.y,
            width: selection.width,
            height: selection.height,
          }}
        />
      )}
    </div>
  );
}
