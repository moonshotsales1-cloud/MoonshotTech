"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/app/components/button/button";

export const Carousel = ({ items, initialScroll = 0 }) => {
  const carouselRef = React.useRef(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const progressMin = 0.08;
  const progressDisplay = Math.min(
    1,
    progressMin + (1 - progressMin) * scrollProgress,
  );

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
      const max = Math.max(scrollWidth - clientWidth, 1);
      const progress = Math.max(0, Math.min(1, scrollLeft / max));
      setScrollProgress(progress);
      try {
        const track = carouselRef.current.children[1];
        const firstCard = track && track.children && track.children[0];
        if (firstCard) {
          const gap = 16;
          const cardWidth = firstCard.getBoundingClientRect().width + gap;
          const idx = Math.round(scrollLeft / cardWidth);
          setCurrentIndex(Math.max(0, Math.min(items.length - 1, idx)));
        }
      } catch (e) {
        // ignore calculation errors
      }
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <div className="relative z-10 w-full">
        <div className="flex flex-wrap justify-start md:justify-end max-md:justify-center items-center gap-4 md:gap-2 max-w-[90%] mx-auto">
          <div className="hidden md:block">
            <Button text="Recent Projects" href="/portfolio" />
          </div>
          <div
            className="hidden lg:block mx-2 sm:mx-4 md:mx-6 bg-white w-px"
            style={{ minHeight: "-webkit-fill-available" }}
          ></div>
          <button
            className="hidden lg:flex hover:cursor-pointer relative z-40 h-12 w-12 max-sm:h-10 max-sm:w-10 items-center justify-center rounded-full bg-[#D42290] disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <ChevronLeft className="h-6 w-6 max-sm:h-5 max-sm:w-5 text-white" />
          </button>
          <button
            className="hidden lg:flex hover:cursor-pointer relative z-40 h-12 w-12 max-sm:h-10 max-sm:w-10 items-center justify-center rounded-full bg-[#D42290] disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <ChevronRight className="h-6 w-6 max-sm:h-5 max-sm:w-5 text-white" />
          </button>
        </div>

        <div
          className="flex w-full overflow-x-scroll overscroll-x-hidden scroll-smooth md:pt-10 [scrollbar-width:none] lg:pt-20"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div
            className={cn(
              "absolute right-0 z-1000 h-auto w-[5%] overflow-hidden",
            )}
          ></div>

          <div
            className={cn(
              "max-w-[90%] mx-auto flex flex-row justify-start gap-4",
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                    once: true,
                  },
                }}
                key={"card" + index}
                className="last:pr-[5%]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="max-md:hidden flex lg:hidden justify-center items-center gap-4 max-w-[90%] mx-auto my-10">
          <button
            className="flex hover:cursor-pointer relative z-40 h-12 w-12 max-sm:h-10 max-sm:w-10 items-center justify-center rounded-full bg-[#D42290] disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <ChevronLeft className="h-6 w-6 max-sm:h-5 max-sm:w-5 text-white" />
          </button>
          <button
            className="flex hover:cursor-pointer relative z-40 h-12 w-12 max-sm:h-10 max-sm:w-10 items-center justify-center rounded-full bg-[#D42290] disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <ChevronRight className="h-6 w-6 max-sm:h-5 max-sm:w-5 text-white" />
          </button>
        </div>

        <div className="flex md:hidden justify-center items-center gap-4 max-w-[90%] mx-auto my-10">
          <Button text="Recent Projects" href="/portfolio" />
        </div>

        {/* Pagination: progress bar */}
        <div className="relative pb-15 sm:pt-10 sm:pb-20 lg:py-30 1366:py-35">
          <div className="max-w-[90%] mx-auto w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full"
              style={{
                width: `${progressDisplay * 100}%`,
                transition: "width 120ms linear",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Card = ({ card, layout = false, ...rest }) => {
  return (
    <>
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        className="relative z-10 flex flex-col items-start justify-start overflow-hidden h-80 w-60 lg:h-100 lg:w-80 1440:h-160 1440:w-124"
      >
        <img
          className="h-auto w-full transition duration-300 blur-0"
          src={card.src}
          width={card.width}
          height={card.height}
          loading="lazy"
          alt={card.title ? card.title : "Card image"}
        />
      </motion.button>
    </>
  );
};
