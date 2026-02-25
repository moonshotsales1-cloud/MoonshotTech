"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface SlidingLogoMarqueeItem {
  id: string;
  content: React.ReactNode;
  href?: string;
}

export interface SlidingLogoMarqueeProps {
  items: SlidingLogoMarqueeItem[];
  speed?: number;
  pauseOnHover?: boolean;
  enableBlur?: boolean;
  blurIntensity?: number;
  height?: string;
  width?: string;
  gap?: string;
  scale?: number;
  direction?: "horizontal" | "vertical";
  autoPlay?: boolean;
  backgroundColor?: string;
  showGridBackground?: boolean;
  className?: string;
  onItemClick?: (item: SlidingLogoMarqueeItem) => void;
  enableSpillEffect?: boolean;
  animationSteps?: number;
  showControls?: boolean;
}

export function SlidingLogoMarquee({
  items,
  speed = 5,
  pauseOnHover = false,
  enableBlur = true,
  blurIntensity = 1,
  height = "250px",
  width = "100%",
  gap = "0.5rem",
  scale = 1,
  direction = "horizontal",
  autoPlay = true,
  backgroundColor,
  showGridBackground = false,
  className,
  onItemClick,
  enableSpillEffect = false,
  animationSteps = 8,
  showControls = false,
}: SlidingLogoMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMobile, setIsMobile] = useState(false);

  // Track window size to disable pause-on-hover logic on mobile/tablet
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile(); // Check on mount
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const marqueeItems = [...items, ...items, ...items, ...items];

  const handleItemClick = (item: SlidingLogoMarqueeItem) => {
    if (item.href) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    }
    onItemClick?.(item);
  };

  return (
    <>
      <style>
        {`
        .sliding-marquee-container {
          --speed: ${speed}s;
          --scale: ${scale};
          --blur: ${blurIntensity};
          --blurs: ${animationSteps};
        }

        .sliding-marquee-resizable {
          overflow: visible;
          container-type: size;
          scale: var(--scale);
          width: 100%;
          height: ${height};
          min-height: 150px;
          min-width: 300px;
          display: flex;
          align-items: center;
        }
        
        @media (max-width: 767px) {
          .sliding-marquee-resizable {
            height: 250px;
          }
        }

        /* --- MARQUEE TRACK --- */
        .sliding-marquee-inner {
          display: flex;
          align-items: center;
          width: max-content;
          animation: scroll var(--speed) linear infinite;
        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }

        .sliding-marquee-list {
          display: flex;
          align-items: center;
          gap: ${gap};
          padding: 0;
          margin: 0;
          list-style-type: none;
          padding-right: ${gap}; 
        }

        .sliding-marquee-item {
          height: 50%;
          aspect-ratio: 1 / 1;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          cursor: pointer;
        }

        .sliding-marquee-item img {
          transition: all 0.3s ease-in-out;
        }

        @media (max-width: 767px) {
          .sliding-marquee-item img {
            width: 150px;
          }
        }
        
        .sliding-marquee-item svg {
          height: 65%;
          width: 65%;
          object-fit: contain;
        }

        /* --- RESPONSIVE --- */
        @media (max-width: 767px) {
          .sliding-marquee-list { gap: 1rem !important; padding-right: 1rem !important; }
          .sliding-marquee-item { height: 40%; }
        }

        [data-play-state="paused"] .sliding-marquee-inner {
          animation-play-state: paused !important;
        }
        `}
      </style>

      <div
        ref={containerRef}
        className={cn("sliding-marquee-container relative", className)}
        style={{ width, background: backgroundColor }}
        // Disable pausing behavior on screens below 1024px
        onMouseEnter={() => !isMobile && pauseOnHover && setIsPlaying(false)}
        onMouseLeave={() => !isMobile && pauseOnHover && setIsPlaying(true)}
      >
        {showGridBackground && <div className="" />}

        <div
          className="sliding-marquee-resizable"
          data-blurring={enableBlur}
          data-play-state={isPlaying ? "running" : "paused"}
          data-spill={enableSpillEffect}
        >
          {/* Track moves left */}
          <div className="sliding-marquee-inner">
            <ul className="sliding-marquee-list text-foreground">
              {marqueeItems.map((item, index) => (
                <li
                  // Use index in key to handle duplicates safely
                  key={`${item.id}-${index}`}
                  className="sliding-marquee-item text-foreground"
                  onClick={() => handleItemClick(item)}
                  role="button"
                  tabIndex={0}
                >
                  {item.content}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default SlidingLogoMarquee;
