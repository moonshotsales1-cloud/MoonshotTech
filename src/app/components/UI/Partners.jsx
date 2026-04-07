"use client";

import { useEffect, useRef } from "react";
import {
  Marquee,
  MarqueeContent,
  MarqueeItem,
} from "@/components/ui/shadcn-io/marquee";
import Testimonials from "./Testimonials";
import CTA from "../CTA";
import Smoke from "../smoke/smoke";
import SectionTitle from "../reusable-components/SectionTitle";

export default function Partners() {
  const transitionRef = useRef(null);

  const xSteps = [0, 12.5, 25, 37.5, 50, 62.5, 75, 87.5, 100];
  const yOffsets = [70, 60, 50, 40, 30, 20, 10, 0];

  const generateClipPath = (progress) => {
    const inverseProgress = 1 - progress;
    const baseY = inverseProgress * 100;

    let path = "polygon(0% 100%, ";

    for (let i = 0; i < 8; i++) {
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
    const transition = transitionRef.current;
    if (!transition) return;

    const handleClipScroll = () => {
      const windowHeight = window.innerHeight;
      const rect = transition.getBoundingClientRect();

      let progress = (windowHeight - rect.top) / (windowHeight * 1.5);
      progress = Math.max(0, Math.min(1, progress));

      const path = generateClipPath(progress);

      transition.style.clipPath = path;
      transition.style.webkitClipPath = path;
    };

    window.addEventListener("scroll", handleClipScroll);
    handleClipScroll();

    return () => window.removeEventListener("scroll", handleClipScroll);
  }, []);

  return (
    <div className="relative overflow-visible">
      <div
        id="home-partners-clip-path"
        ref={transitionRef}
        className="absolute top-0 inset-0 h-[60vh] 1920:h-[50vh] z-10 -mt-110"
        style={{
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          willChange: "clip-path",
          transform: "translate3d(0,0,0)",
          background: "transparent",
        }}
      >
        <div
          className="absolute inset-0 bg-[#00050A]"
          style={{ clipPath: "inherit" }}
        />

        <Smoke />
      </div>

      {/* 2. Main Partners Section */}
      <div
        id="partners"
        className="relative z-15 -mt-35 lg:pt-25 mx-auto bg-[#00050A]"
      >
        <div className="absolute inset-0 z-0">
          <Smoke />
        </div>

        <div id="partners-slider" className="relative">
          {/* Top meta label */}
          <div className="relative px-[5em] max-lg:px-[3em] max-md:px-[2em] pt-6 pb-16 lg:py-16">
            <div className="font-sora flex justify-between items-baseline">
              <SectionTitle title="08 — Partners" font="font-sora" />
              <p className="text-[#41454a] text-end text-sm md:text-base 1280:text-lg 1366:text-xl 1600:text-2xl tracking-[-0.03em]">
                Over <span className="text-white">10 Years</span> <br />{" "}
                Partnership
              </p>
            </div>
          </div>

          {/* Logo Loop Section */}
          <div className="flex size-full items-center justify-center">
            <Marquee>
              <MarqueeContent speed={150}>
                {[
                  "/images/partners/archin.png",
                  "/images/partners/logo_github.png",
                  "/images/partners/logo_union.png",
                  "/images/partners/logo_usa.png",
                  "/images/partners/logo_squarespace.png",
                  "/images/partners/logo_zm.png",
                ].map((src, index) => (
                  <MarqueeItem
                    key={index}
                    className="group w-44 h-44 1440:h-55 1440:w-55 1600:h-66 1600:w-66 mx-0"
                  >
                    <div className="h-full w-full rounded-full bg-[#03182c] hover:bg-black flex items-center justify-center">
                      <img
                        alt={`Partner logo ${index + 1}`}
                        className="max-h-1/2 max-w-1/2 1600:max-h-full 1600:max-w-full object-contain group-hover:brightness-0 group-hover:invert transition-all duration-300"
                        src={src}
                      />
                    </div>
                  </MarqueeItem>
                ))}
              </MarqueeContent>
            </Marquee>
          </div>
        </div>

        <Testimonials />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @media (max-width: 767px) {
                #testimonials .section-title {
                    justify-content: start;
                }
              }
            `,
          }}
        />

        <div className="relative">
          <div className="absolute inset-0">
            <Smoke />
          </div>
          <div className="relative z-10">
            <CTA />
          </div>
        </div>
      </div>
    </div>
  );
}
