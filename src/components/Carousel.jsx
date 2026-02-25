"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";

const DEFAULT_ITEMS = [
  {
    title: "UNIT MOVE",
    description:
      "The co-founders of Unit Move, Jaye and Claire, had faced digital marketing complications until they met our digital performance gurus.",
    stats: [
      {
        value: "68%",
        label: "Sixty Eight per cent increase in lead conversions.",
      },
      { value: "50%", label: "Fifty per cent increase in lead conversions." },
      {
        value: "72%",
        label: "Seventy Two per cent increase in lead conversions.",
      },
    ],
    badge: "PASSION IN BUSINESS",
    image: "/images/proficients/laptop1.png",
    id: 1,
  },
  {
    title: "MARKING",
    description:
      "The co-founders of Marking, Jaye and Claire, had faced digital marketing complications until they met our digital performance gurus.",
    stats: [
      {
        value: "55%",
        label: "Sixty Eight per cent increase in lead conversions.",
      },
      { value: "80%", label: "Fifty per cent increase in lead conversions." },
      {
        value: "65%",
        label: "Seventy Two per cent increase in lead conversions.",
      },
    ],
    badge: "PASSION IN BUSINESS",
    image: "/images/proficients/laptop2.png",
    id: 2,
  },
  {
    title: "UNIT MOVE",
    description:
      "The co-founders of Unit Move, Jaye and Claire, had faced digital marketing complications until they met our digital performance gurus.",
    stats: [
      {
        value: "68%",
        label: "Sixty Eight per cent increase in lead conversions.",
      },
      { value: "50%", label: "Fifty per cent increase in lead conversions." },
      {
        value: "72%",
        label: "Seventy Two per cent increase in lead conversions.",
      },
    ],
    badge: "PASSION IN BUSINESS",
    image: "/images/proficients/laptop1.png",
    id: 3,
  },
  {
    title: "MARKING",
    description:
      "The co-founders of Marking, Jaye and Claire, had faced digital marketing complications until they met our digital performance gurus.",
    stats: [
      {
        value: "55%",
        label: "Sixty Eight per cent increase in lead conversions.",
      },
      { value: "80%", label: "Fifty per cent increase in lead conversions." },
      {
        value: "65%",
        label: "Seventy Two per cent increase in lead conversions.",
      },
    ],
    badge: "PASSION IN BUSINESS",
    image: "/images/proficients/laptop2.png",
    id: 4,
  },
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = "100%",
  autoplay = true,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
}) {
  const containerPadding = 16;
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setContainerWidth(width);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const itemWidth = containerWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const carouselItems = loop ? [...items, items[0]] : items;

  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev === items.length - 1 && loop) {
            return prev + 1;
          }
          if (prev === carouselItems.length - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [
    autoplay,
    autoplayDelay,
    isHovered,
    loop,
    items.length,
    carouselItems.length,
    pauseOnHover,
  ]);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) {
        setCurrentIndex(items.length - 1);
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * (carouselItems.length - 1),
          right: 0,
        },
      };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden p-4'
        }`}
      style={{
        width: baseWidth,
        ...(round && containerWidth && { height: `${containerWidth}px` }),
      }}
    >
      <motion.div
        className="flex"
        drag="x"
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => {
          return (
            <motion.div
              key={index}
              className={`relative shrink-0 flex flex-col bg-no-repeat bg-cover ${
                round
                  ? "items-center justify-center text-center"
                  : "items-start justify-between rounded-[38.741px]"
              } overflow-hidden cursor-grab active:cursor-grabbing`}
              style={{
                width: itemWidth,
                height: round ? itemWidth : "100%",
                ...(round && { borderRadius: "50%" }),
                backgroundImage: "url(/images/proficients/card-bg.png)",
              }}
              transition={effectiveTransition}
            >
              {/* Content */}
              <div className="text-center md:text-start relative z-10 p-8 lg:p-15 grid grid-cols-1 lg:grid-cols-2 gap-6 rounded-[38.741px]">
                {/* Top Section */}
                <div className="flex flex-col justify-between col-span-1 max-md:space-y-6 max-1280:space-y-6 max-1440:space-y-0 max-1600:space-y-6 max-1920:space-y-12">
                  <h3 className="font-sora text-2xl 480:text-3xl md:text-4xl 1280:text-5xl 1440:text-6xl font-semibold md:tracking-[-3.177px]">
                    {item.title}
                  </h3>

                  <p className="text-white/70 text-sm 1280:text-base 1366:text-xl 1920:text-2xl lg:max-w-[90%] 1280:max-w-[79%] 1366:max-w-[95%] 1440:max-w-[90%] 1600:max-w-[80%] 1920:max-w-[81.5%] font-normal font-sora tracking-[-0.72px] leading-normal">
                    {item.description}
                  </p>

                  {/* Statistics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 col-span-2 gap-x-8 gap-y-8 lg:gap-y-4 1280:gap-x-12 1280:gap-y-8 1600:gap-x-16 1600:gap-y-12 max-w-2xl">
                    {item.stats?.map((stat, idx) => (
                      <div
                        key={idx}
                        className={`space-y-4 lg:space-y-2 1440:space-y-4 ${idx === 2 ? "col-span-1" : ""}`}
                      >
                        <div className="text-4xl md:text-5xl 1366:text-6xl 1600:text-7xl font-sora font-normal tracking-[-2.1px]">
                          {stat.value}
                        </div>
                        <p className="text-white/60 text-sm lg:text-[10px] 1280:text-xs 1366:text-sm 1440:text-base 1600:text-lg font-sora font-normal tracking-[-0.57px] leading-[136%] max-w-[97%] 1920:max-w-[81.5%]">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Section - Laptop Image & Badge */}
                <div className="col-span-1 flex flex-col justify-between">
                  <div className="hidden md:flex items-start justify-end gap-2 text-white/70 text-xs lg:text-sm 1440:text-base font-inter">
                    <div className="text-right flex">
                      <p className="text-white">
                        PASSION
                        <span className="text-white/50">
                          {" "}
                          IN <br /> {item.badge?.split(" ")[2] || "BUSINESS"}
                        </span>
                      </p>
                    </div>
                  </div>

                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-contain w-3/4 max-lg:mx-auto lg:w-full 1280:w-[90%] 1366:w-full h-full pointer-events-none select-none"
                    />
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      <div
        className={`mt-10 flex w-full justify-center items-center gap-6 ${round ? "absolute z-20 bottom-12 left-1/2 -translate-x-1/2" : ""}`}
      >
        <div className="flex border border-white/20 rounded-full">
          {/* Previous Button */}
          <button
            onClick={() => {
              if (loop && currentIndex === 0) {
                setCurrentIndex(items.length - 1);
              } else {
                setCurrentIndex((prev) => Math.max(prev - 1, 0));
              }
            }}
            disabled={!loop && currentIndex === 0}
            className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-white"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Dot Indicators */}
          <div className="mt-4 flex w-37.5 justify-center gap-6">
            {items.map((_, index) => (
              <motion.div
                key={index}
                className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 ${
                  currentIndex % items.length === index
                    ? "bg-white"
                    : "bg-white/40"
                }`}
                animate={{
                  scale: currentIndex % items.length === index ? 1.2 : 1,
                }}
                onClick={() => setCurrentIndex(index)}
                transition={{ duration: 0.15 }}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => {
              if (loop && currentIndex === items.length - 1) {
                setCurrentIndex(currentIndex + 1);
              } else {
                setCurrentIndex((prev) =>
                  Math.min(prev + 1, carouselItems.length - 1),
                );
              }
            }}
            disabled={!loop && currentIndex === items.length - 1}
            className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-white"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
