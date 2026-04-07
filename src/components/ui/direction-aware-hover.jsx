"use client";

import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export const DirectionAwareHover = ({
  imageUrl,
  children,
  childrenClassName,
  imageClassName,
  className,
  heading,
  number,
}) => {
  const ref = useRef(null);

  const [direction, setDirection] = useState("left");
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Track hydration

  // Track window size safely after mount
  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseEnter = (event) => {
    if (!ref.current || isMobile) return; // Prevent hover logic on mobile

    const direction = getDirection(event, ref.current);
    switch (direction) {
      case 0:
        setDirection("top");
        break;
      case 1:
        setDirection("right");
        break;
      case 2:
        setDirection("bottom");
        break;
      case 3:
        setDirection("left");
        break;
      default:
        setDirection("left");
        break;
    }
  };

  const getDirection = (ev, obj) => {
    const { width: w, height: h, left, top } = obj.getBoundingClientRect();
    const x = ev.clientX - left - (w / 2) * (w > h ? h / w : 1);
    const y = ev.clientY - top - (h / 2) * (h > w ? w / h : 1);
    const d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
    return d;
  };

  // Determine active animation state based on device size
  const currentAnimation = !isMounted
    ? "initial"
    : isMobile
      ? "mobile"
      : "initial";

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      ref={ref}
      className={cn(
        "w-2/4 h-2/4 bg-transparent rounded-[30px] 390:rounded-[53px] overflow-hidden group relative border border-white/20",
        className,
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          className="relative h-full w-full"
          initial="initial"
          animate={currentAnimation} // Forces Framer Motion to update styles post-hydration
          whileHover={isMobile ? "mobile" : direction}
          exit="exit"
        >
          {/* Background Overlay - Controlled via variants now for smooth transitions */}
          <motion.div className="lg:opacity-0 opacity-90 group-hover:opacity-90 absolute inset-0 w-full h-full bg-black z-10" />

          <motion.div
            variants={variants}
            className="h-full w-full relative"
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
          >
            <img
              alt="image"
              className={cn("h-full w-full object-cover", imageClassName)}
              src={imageUrl}
            />
          </motion.div>

          {/* Heading */}
          <motion.div
            variants={textVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn(
              "absolute top-[10%] left-[10%] z-40 text-[clamp(20px,2vw,30px)] font-semibold font-poppins block",
            )}
          >
            {heading}
          </motion.div>

          {/* Arrow */}
          <motion.div
            variants={textVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 right-0 390:right-2 480:right-4 lg:-right-2 1280:right-4 1600:right-12 1920:right-20 max-1600:place-items-center z-40 block",
            )}
          >
            <img
              src="/images/images-arrow.png"
              alt="arrow"
              className="h-auto w-[60%] 480:w-3/4 lg:w-1/2 1280:w-[75%] 1600:w-4/5 1920:w-full opacity-90"
            />
          </motion.div>

          {/* Number */}
          <motion.div
            variants={numberVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn(
              "font-poppins absolute -bottom-[16%] 390:-bottom-[19%] md:-bottom-[21%] 840:-bottom-[19%] lg:-bottom-[20%] 1920:-bottom-[19%] -left-[9%] md:-left-[15%] z-40 text-right text-[120px] 390:text-[150px] 480:text-[200px] md:text-[150px] 840:text-[165px] lg:text-[clamp(120px,14vw,300px)] block",
            )}
          >
            {number}
          </motion.div>

          {/* Children / Tags */}
          <motion.div
            variants={textVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn(
              "absolute bottom-8 lg:bottom-12 right-[10%] z-40 text-right block",
              childrenClassName,
            )}
          >
            {children}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

const variants = {
  initial: { x: 0 },
  exit: { x: 0, y: 0 },
  top: { y: 0 },
  bottom: { y: 0 },
  left: { x: 0 },
  right: { x: 0 },
  mobile: { x: 0, y: 0 },
};

// Text, Heading, and Arrow Animations
const textVariants = {
  initial: { y: 0, x: 0, opacity: 0 },
  exit: { y: 0, x: 0, opacity: 0 },
  top: { y: 0, opacity: 1 },
  bottom: { y: 0, opacity: 1 },
  left: { x: 0, opacity: 1 },
  right: { x: 0, opacity: 1 },
  mobile: { y: 0, x: 0, opacity: 1 }, // Note: Set to 1 so the text is fully readable on mobile
};

// Big Number Animations
const numberVariants = {
  initial: { y: 0, x: 0, opacity: 0 },
  exit: { y: 0, x: 0, opacity: 0 },
  top: { y: 0, opacity: 0.1 },
  bottom: { y: 0, opacity: 0.1 },
  left: { x: 0, opacity: 0.1 },
  right: { x: 0, opacity: 0.1 },
  mobile: { y: 0, x: 0, opacity: 0.1 }, // Shows at 0.1 opacity on mobile
};
