"use client";
import { motion, AnimatePresence } from "motion/react";

import { useEffect, useState } from "react";
import { SpinningText } from "./spinning-text";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  containerClass = "mx-auto max-w-7xl px-[5em] max-lg:px-[3em] max-md:px-[2em] py-12 1280:py-24 1600:py-32",
  nameClass = "text-xs sm:text-sm lg:text-xs 1280:text-sm 1366:text-base 1440:text-lg 1600:text-xl font-semibold text-white uppercase mb-1",
  designationClass = "text-xs sm:text-sm lg:text-xs 1366:text-sm 1440:text-base 1600:text-lg text-white/70",
  quoteClass = "mb-8 1920:w-[130%] max-1920:w-[110%] max-1600:w-[100%] max-1366:w-[90%] max-lg:w-[97%] text-lg 480:text-xl 840:text-2xl lg:text-[clamp(10px,2vw,37px)] leading-tight text-white/70 md:leading-[150%] lg:leading-tight",
}) => {
  const [active, setActive] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return isClient ? Math.floor(Math.random() * 21) - 10 : 0;
  };

  const total = testimonials ? testimonials.length : 0;
  const fractionText = `${active + 1}/${total}`;
  // Progress should reflect the fraction (1 of N -> 1/N filled)
  const progress = total > 0 ? (active + 1) / total : 0;

  return (
    <>
      <div className={containerClass}>
        <div className="relative grid grid-cols-1 lg:grid-cols-2 items-center">
          <div className="relative h-full w-full col-span-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[active].src}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  z: -100,
                  rotate: randomRotateY(),
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  z: 0,
                  rotate: 0,
                  zIndex: 40,
                  y: [0, -80, 0],
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  z: 100,
                  rotate: randomRotateY(),
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
                className="lg:absolute inset-0 origin-bottom"
              >
                {/* Spinning ring text positioned top-left of the portrait */}
                <div className="absolute left-0 1366:left-4 1600:left-0 1920:-left-6 -top-3 1366:top-0 z-10 lg:block hidden w-36 h-36">
                  <SpinningText
                    duration={12}
                    radius={6}
                    className="w-full h-full text-white/80 text-[clamp(10px,1.25vw,22px)] uppercase"
                    style={{ letterSpacing: "12px" }}
                    centerSrc="/images/quote.png"
                    centerAlt="quote"
                    centerSize={36}
                  >
                    TESTIMONIALS - TRUSTED BY CLIENTS -
                  </SpinningText>
                </div>
                <img
                  src={testimonials[active].src}
                  alt={testimonials[active].name}
                  draggable={false}
                  className="w-3/4 md:w-1/2 mx-auto lg:w-full h-full object-contain object-center overflow-visible lg:scale-125"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex flex-col justify-between py-4 col-span-1">
            <motion.div
              key={active}
              initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -20,
                opacity: 0,
              }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
            >
              <div className="text-sm md:text-base lg:text-xs 1280:text-sm 1366:text-base 1440:text-lg 1600:text-xl text-[#808080] mb-8">
                <span className="text-nowrap font-sora font-normal">
                  09 — Testimonials
                </span>
              </div>
              <motion.h2 className={quoteClass}>
                {testimonials[active].quote.split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{
                      filter: "blur(10px)",
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                      delay: 0.02 * index,
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.h2>
              <h3 className={nameClass}>{testimonials[active].name}</h3>
              <h3 className={designationClass}>
                {testimonials[active].designation}
              </h3>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-[5em] max-lg:px-[3em] max-md:px-[2em]">
        <div className="flex justify-between items-center mb-6">
          <div className="font-poppins font-light text-white/70 text-xs sm:text-sm lg:text-xs 1366:text-sm 1440:text-base 1600:text-lg w-12">
            {fractionText}
          </div>
          <div className="flex gap-2 1440:gap-4">
            <button
              onClick={handlePrev}
              className="group/button flex h-7 w-7 1366:h-8 1366:w-8 1440:h-10 1440:w-10 items-center justify-center rounded-full bg-[#151515] hover:bg-white"
            >
              <ChevronLeft className="h-4 w-4 1366:h-6 1366:w-6 1440:h-7 1440:w-7 text-white transition-transform duration-300 group-hover/button:text-black" />
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-7 w-7 1366:h-8 1366:w-8 1440:h-10 1440:w-10 items-center justify-center rounded-full bg-[#151515] hover:bg-white"
            >
              <ChevronRight className="h-4 w-4 1366:h-6 1366:w-6 1440:h-7 1440:w-7 text-white transition-transform duration-300 group-hover/button:text-black" />
            </button>
          </div>
        </div>
        <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full"
            style={{
              width: `${progress * 100}%`,
              transition: "width 160ms linear",
            }}
          />
        </div>
      </div>
    </>
  );
};
