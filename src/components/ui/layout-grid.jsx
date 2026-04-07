"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import TextType from "../TextType";

export const LayoutGrid = ({ cards, showDescriptions = false }) => {
  return (
    <div className="w-full h-full p-5 xl:px-30 px:pt-30 lg:px-20 lg:pt-20 sm:px-10 sm:pt-10 grid grid-cols-1 md:grid-cols-3 mx-auto gap-8 1366:gap-12 relative">
      {cards.map((card, i) => (
        <div key={i} className={cn(card.className, "")}>
          <motion.div
            className={cn(
              card.className,
              "relative overflow-hidden rounded-[18.105px] h-full w-full",
            )}
            layoutId={`card-${card.id}`}
          >
            <ImageComponent card={card} showDescriptions={showDescriptions} />
          </motion.div>
        </div>
      ))}
    </div>
  );
};

const ImageComponent = ({ card, showDescriptions }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative h-full w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      {(() => {
        const src = card.video || card.src || card.thumbnail;
        const isVideo =
          !!card.video || /\.(mp4|webm|mov|ogg|m4v)(\?|$)/i.test(src || "");
        if (isVideo) {
          return (
            <video
              src={src}
              className={cn(
                "object-cover object-top h-full w-full transition-transform duration-500",
              )}
              autoPlay
              muted
              loop
              playsInline
            />
          );
        }

        return (
          <div className="relative w-full h-full">
            <div
              id="industry-layout-grid-top-overlay"
              data-industry-overlay
              className="layout-grid-top-overlay hidden absolute inset-0 top-0 z-10 transition-all duration-300"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.90) 100%)",
              }}
            ></div>
            <motion.img
              layoutId={`image-${card.id}-image`}
              src={card.thumbnail || src}
              className={cn(
                "group-hover:scale-110 object-cover object-top h-full w-full transition-transform duration-500",
              )}
              alt={card.title || "thumbnail"}
            />
          </div>
        );
      })()}
      <div
        id="card-title"
        className="absolute z-10 w-full left-0 max-md:top-1/2 max-md:-translate-y-1/2 md:-bottom-5 p-6 rounded-b-lg text-center md:text-left"
      >
        <div className="text-xl md:text-lg lg:text-[clamp(12px,1.8vw,30px)] font-sora font-normal">
          {card.title}
        </div>
        {showDescriptions && card.description ? (
          <div
            className={cn(
              "my-2 max-md:mx-auto text-sm md:text-xs lg:text-[clamp(12px,0.9vw,16px)] font-sora font-light leading-snug text-white/85 max-w-[95%]",
              "opacity-100 translate-y-0 max-h-50",
              "lg:opacity-0 lg:translate-y-2 lg:max-h-0 lg:overflow-hidden",
              "lg:group-hover:opacity-100 lg:group-hover:translate-y-0 lg:group-hover:max-h-50",
              "transition-all duration-300",
            )}
          >
            <span className="lg:hidden">{card.description}</span>
            <span className="hidden lg:inline">
              {isHovered ? (
                <TextType
                  key={card.id}
                  typingSpeed={20}
                  text={card.description}
                />
              ) : null}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};
