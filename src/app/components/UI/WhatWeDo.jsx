"use client";

import React, { useState, useEffect, useRef } from "react";
import Shuffle from "@/components/Shuffle";
import MoonshotIcon from "../reusable-components/MoonshotIcon";
import SectionTitle from "../reusable-components/SectionTitle";

const categories = [
  {
    name: "Mobile Applications",
    id: "mobile-applications",
    image: "/images/what-we-do/mobile-applications.png",
    title: "MOBILE",
    subtitle: "APPLICATIONS",
  },
  {
    name: "UI/UX",
    id: "ui-ux",
    image: "/images/what-we-do/ui-ux.png",
    title: "UI/UX",
    subtitle: "DESIGN",
  },
  {
    name: "Branding",
    id: "branding",
    image: "/images/what-we-do/branding.png",
    title: "BRANDING",
    subtitle: "",
  },
  {
    name: "Web Development",
    id: "web-development",
    image: "/images/what-we-do/web.png",
    title: "WEBSITE",
    subtitle: "DEVELOPMENT",
  },
  {
    name: "Animations",
    id: "animations",
    video: "/images/what-we-do/animation.mp4",
    title: "ANIMATIONS",
    subtitle: "",
  },
];

const WhatWeDo = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  const handleCategoryClick = (index) => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const containerStart = containerRect.top + window.scrollY;
    const targetPosition = containerStart + index * window.innerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
    setActiveIdx(index);
  };

  const xSteps = [0, 14.2857, 28.5714, 42.8571, 57.1429, 71.4286, 85.7143, 100];

  const yOffsets = [0, 30, 50, 80, 120, 160, 200];

  const generateClipPath = (progress) => {
    const inverseProgress = 1 - progress;
    const baseY = inverseProgress * 100;

    let path = "polygon(0% 100%, ";

    for (let i = 0; i < 7; i++) {
      const xStart = xSteps[i];
      const xEnd = xSteps[i + 1];

      let stepY = baseY + yOffsets[i] * inverseProgress;

      stepY = Math.max(0, Math.min(100, stepY));

      path += `${xStart}% ${stepY}%, ${xEnd}% ${stepY}%, `;
    }

    path += "100% 100%)";
    return path;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!cardsRef.current) return;
      const windowHeight = window.innerHeight;

      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        if (index === 0) {
          card.style.clipPath = "none";
          return;
        }

        const rect = card.getBoundingClientRect();

        let progress = (windowHeight - rect.top) / windowHeight;

        progress = Math.max(0, Math.min(1, progress));

        const path = generateClipPath(progress);

        card.style.clipPath = path;
        card.style.webkitClipPath = path;
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef}>
      <section className="bg-black relative z-50">
        <MoonshotIcon />

        <div className="relative">
          {categories.map((cat, idx) => (
            <div
              key={cat.name}
              id={cat.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              className={`pb-20 sticky top-0 h-screen flex flex-col justify-between z-10`}
              style={{
                background: "rgba(0,0,0,0.95)",
                clipPath:
                  idx === 0
                    ? "none"
                    : "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                willChange: "clip-path",
                transform: "translate3d(0,0,0)",
              }}
              onMouseEnter={() => setActiveIdx(idx)}
              onTouchStart={() => setActiveIdx(idx)}
            >
              {/* Navigation */}
              <div className="relative w-full z-30">
                <div className="relative z-20 px-[5em] max-lg:px-[3em] max-md:px-[2em] pt-16">
                  <div className="lg:flex items-center justify-between max-lg:space-y-6 text-white/70">
                    <div className="section-title flex items-center max-md:justify-center gap-3 text-sm md:text-base lg:text-xs 1280:text-sm 1366:text-base 1440:text-lg 1600:text-xl text-[#808080]">
                      <span className="text-nowrap font-normal font-poppins">
                        03 — What We Do
                      </span>
                    </div>
                    <div className="relative md:w-[92%]">
                      <div className="w-full flex flex-wrap max-md:justify-center lg:justify-end gap-1 font-sora font-light">
                        {categories.map((item, cidx) => (
                          <div
                            key={item.name}
                            className="text-sm 840:text-base lg:text-xs 1280:text-sm 1366:text-base 1440:text-lg 1600:text-xl flex items-center"
                          >
                            <span
                              onClick={() => handleCategoryClick(cidx)}
                              className={`font-normal lg:px-1 whitespace-nowrap cursor-pointer transition-colors duration-300 hover:text-white ${activeIdx === cidx ? "text-white" : "text-white/55"}`}
                            >
                              {item.name}
                            </span>
                            {cidx < categories.length - 1 && (
                              <span className="mx-2 text-white/25">|</span>
                            )}
                          </div>
                        ))}
                        <span className="hidden max-sm:block mx-2 text-white/25">
                          |
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 h-px w-full bg-white/10" />
                </div>
              </div>

              {/* Media */}
              <div className="absolute inset-0 z-0">
                {cat.video ? (
                  <video
                    key={cat.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src={cat.video} type="video/mp4" />
                  </video>
                ) : (
                  <div
                    key={cat.image}
                    className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-500"
                    style={{ backgroundImage: `url('${cat.image}')` }}
                  />
                )}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, #000 100%)",
                  }}
                />
              </div>

              {/* Text Content */}
              <div className="px-[5em] max-lg:px-[3em] max-md:px-[2em] max-sm:mb-5 relative z-10">
                <div className="text-center md:text-left">
                  <Shuffle
                    key={`${cat.name}-title`}
                    text={cat.title}
                    className="text-center md:text-start text-[36px] 480:text-5xl md:text-6xl lg:text-[clamp(40px,6vw,100px)] font-sora"
                    tag="span"
                    textAlign="left"
                    shuffleDirection="right"
                    duration={0.5}
                    stagger={0.04}
                    shuffleTimes={1}
                    loop={false}
                    triggerOnHover={false}
                  />

                  {cat.subtitle && (
                    <>
                      <br />
                      <Shuffle
                        key={`${cat.name}-subtitle`}
                        text={cat.subtitle}
                        className="text-center md:text-start text-[36px] 480:text-5xl md:text-6xl lg:text-[clamp(40px,6vw,100px)] font-sora"
                        tag="span"
                        textAlign="left"
                        shuffleDirection="right"
                        duration={0.5}
                        stagger={0.2}
                        shuffleTimes={2}
                        loop={true}
                        triggerOnHover={true}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WhatWeDo;
