"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}) => {
  const [active, setActive] = useState(propTabs[0]);
  const [tabs, setTabs] = useState(propTabs);

  const moveSelectedTabToTop = (idx) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);

    // Scroll to the portfolio item if anchor exists
    if (selectedTab[0].anchor) {
      const element = document.getElementById(selectedTab[0].anchor);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const [hovering, setHovering] = useState(false);

  return (
    <>
      <div
        className={cn(
          "flex flex-row flex-wrap lg:flex-nowrap items-center justify-center md:justify-end perspective-[1000px] relative sm:overflow-visible no-visible-scrollbar gap-5 lg:gap-2",
          containerClassName,
        )}
      >
        {propTabs.slice(0, 3).map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => {
              moveSelectedTabToTop(idx);
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={cn(
              "font-sora relative bg-black px-4 1280:px-6 1440:px-6 1920:px-8 py-2 rounded-full border border-white/30 hover:border-white transition-colors duration-300",
              tabClassName,
            )}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute inset-0 block bg-black border border-white shadow-lg rounded-full",
                  activeTabClassName,
                )}
              />
            )}

            <span className="relative text-sm md:text-base lg:text-[10.5px] 1280:text-xs 1366:text-sm 1600:text-base 1920:text-xl whitespace-nowrap">
              {tab.title}
            </span>
          </button>
        ))}
      </div>
      <div className="py-1.5"></div>
      <div
        className={cn(
          "flex flex-row flex-wrap lg:flex-nowrap items-center justify-center md:justify-end perspective-[1000px] relative sm:overflow-visible no-visible-scrollbar gap-5 lg:gap-2",
          containerClassName,
        )}
      >
        {propTabs.slice(3,5).map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => {
              moveSelectedTabToTop(idx + 3);
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={cn(
              "font-sora relative bg-black px-4 1280:px-6 1440:px-6 1920:px-8 py-2 rounded-full border border-white/30 hover:border-white transition-colors duration-300",
              tabClassName,
            )}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute inset-0 block bg-black border border-white shadow-lg rounded-full",
                  activeTabClassName,
                )}
              />
            )}

            <span className="relative text-sm md:text-base lg:text-[10.5px] 1280:text-xs 1366:text-sm 1600:text-base 1920:text-xl whitespace-nowrap">
              {tab.title}
            </span>
          </button>
        ))}
      </div>
      <div className="py-1.5"></div>
      <div
        className={cn(
          "flex flex-row flex-wrap lg:flex-nowrap items-center justify-center md:justify-end perspective-[1000px] relative sm:overflow-visible no-visible-scrollbar gap-5 lg:gap-2",
          containerClassName,
        )}
      >
        {propTabs.slice(5).map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => {
              moveSelectedTabToTop(idx + 5);
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={cn(
              "font-sora relative bg-black px-4 1280:px-6 1440:px-6 1600:px-8 py-2 rounded-full border border-white/30 hover:border-white transition-colors duration-300",
              tabClassName,
            )}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute inset-0 block bg-black border border-white shadow-lg rounded-full",
                  activeTabClassName,
                )}
              />
            )}

            <span className="relative text-sm md:text-base lg:text-[10.5px] 1280:text-xs 1366:text-sm 1600:text-base 1920:text-xl whitespace-nowrap">
              {tab.title}
            </span>
          </button>
        ))}
      </div>
      <div className="py-1.5"></div>
      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.value}
        hovering={hovering}
        className={cn("mt-32", contentClassName)}
      />
    </>
  );
};

export const FadeInDiv = ({ className, tabs, hovering }) => {
  const isActive = (tab) => {
    return tab.value === tabs[0].value;
  };
  return (
    <div className="relative w-full h-full">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            top: hovering ? idx * -50 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
          }}
          animate={{
            y: isActive(tab) ? [0, 40, 0] : 0,
          }}
          className={cn("w-full h-full absolute top-0 left-0", className)}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};
