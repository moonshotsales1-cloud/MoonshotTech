"use client";

import { Tabs } from "@/components/ui/tabs";
import React, { useEffect, useRef, useState } from "react";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import Button from "../button/button";
import SectionTitle from "../reusable-components/SectionTitle";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Tags() {
  const tabs = [
    { title: "Branding", value: "branding", anchor: "portfolio-1" },
    { title: "UI/UX", value: "ui-ux", anchor: "portfolio-2" },
    { title: "Animation", value: "animation", anchor: "portfolio-4" },
    {
      title: "Mobile Applications",
      value: "mobile-applications",
      anchor: "portfolio-3",
    },
    {
      title: "Web Development",
      value: "web-development",
      anchor: "portfolio-5",
    },
    { title: "All Services", value: "all-services", anchor: "portfolio-2" },
  ];

  return (
    <div className="relative flex flex-col max-w-xl md:ml-auto w-full lg:w-5/6">
      <p className="text-center md:text-end font-normal text-sm md:text-xs lg:text-sm 1366:text-base 1600:text-lg font-sora mb-8 text-white/60">
        (<span className="text-white">Filter</span> by Tag)
      </p>
      <Tabs tabs={tabs} />
    </div>
  );
}

const ExpandableSpan = ({ children }) => {
  const spanRef = useRef(null);
  const [targetWidth, setTargetWidth] = useState(0);

  useEffect(() => {
    if (spanRef.current) {
      spanRef.current.style.width = "auto";
      const measuredWidth = spanRef.current.offsetWidth;
      setTargetWidth(measuredWidth);
      spanRef.current.style.width = "0px";
    }
  }, [children]);

  return (
    <span
      ref={spanRef}
      className="inline-block overflow-hidden align-bottom opacity-100"
      style={{
        width: `calc(var(--reveal-progress, 0) * ${targetWidth}px)`,
        height: "auto",
        transition: "width 0.1s linear",
      }}
    >
      {children}
    </span>
  );
};

const ScrollFillText = ({ children, className = "" }) => {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !overlayRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      let progress = (windowHeight - rect.top) / (windowHeight * 0.75);
      progress = Math.max(0, Math.min(1, progress));
      const percentageToHide = (1 - progress) * 100;
      overlayRef.current.style.clipPath = `inset(0% ${percentageToHide}% 0% 0%)`;
      containerRef.current.style.setProperty("--reveal-progress", progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative inline-block leading-none ${className}`}
      style={{ "--reveal-progress": 0 }}
    >
      <span className="relative z-0 text-white whitespace-nowrap">
        {children}
      </span>
      <span
        ref={overlayRef}
        className="absolute top-0 left-0 z-10 text-white bg-black w-full h-full whitespace-nowrap"
        style={{
          clipPath: "inset(0% 100% 0% 0%)",
          boxDecorationBreak: "clone",
          WebkitBoxDecorationBreak: "clone",
        }}
      >
        {children}
      </span>
    </div>
  );
};

const PortfolioAndBrand = () => {
  const containerRef = useRef(null);
  const innerRef = useRef(null);
  const placeholderRef = useRef(null);
  const transitionRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const router = useRouter();

  const xSteps = [0, 12.5, 25, 37.5, 50, 62.5, 75, 87.5, 100];
  const yOffsets = [0, 10, 20, 30, 40, 50, 60, 70];

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

  useEffect(() => {
    const brandEl = document.getElementById("brand-section");
    const container = containerRef.current;
    const inner = innerRef.current;
    const placeholder = placeholderRef.current;
    if (!brandEl || !container || !inner || !placeholder) return;

    let currentlySticky = false;
    let lastScrollY = window.scrollY;
    let scrollingDown = true;

    const setFixed = () => {
      const innerRect = inner.getBoundingClientRect();
      const currentTop = innerRect.top;
      const currentLeft = innerRect.left;
      const currentWidth = innerRect.width;

      placeholder.style.display = "block";
      placeholder.style.height = `${innerRect.height}px`;
      inner.style.position = "fixed";
      inner.style.top = `${currentTop}px`;
      inner.style.left = `${currentLeft}px`;
      inner.style.width = `${currentWidth}px`;
      inner.style.zIndex = "9";
      currentlySticky = true;
      setIsSticky(true);
    };

    const unsetFixed = () => {
      placeholder.style.display = "none";
      placeholder.style.height = "0px";
      inner.style.position = "";
      inner.style.top = "";
      inner.style.left = "";
      inner.style.width = "";
      inner.style.zIndex = "";
      currentlySticky = false;
      setIsSticky(false);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollingDown = currentScrollY > lastScrollY;
      lastScrollY = currentScrollY;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const ent = entries[0];
        if (ent.isIntersecting) {
          container.style.visibility = "";
          container.style.pointerEvents = "";
          if (scrollingDown) {
            setFixed();
          } else {
            unsetFixed();
          }
        } else {
          unsetFixed();
          const brandRect = brandEl.getBoundingClientRect();
          if (brandRect.bottom < 0) {
            container.style.visibility = "hidden";
            container.style.pointerEvents = "none";
          } else {
            container.style.visibility = "";
            container.style.pointerEvents = "";
          }
        }
      },
      { threshold: 0 },
    );

    observer.observe(brandEl);
    window.addEventListener("scroll", handleScroll, { passive: true });

    const onResize = () => {
      if (!currentlySticky) return;
      const newWidth = Math.round(window.innerWidth * 0.9);
      const newLeft = Math.round((window.innerWidth - newWidth) / 2);
      inner.style.width = `${newWidth}px`;
      inner.style.left = `${newLeft}px`;
    };

    window.addEventListener("resize", onResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", onResize);
      container.style.visibility = "";
      container.style.pointerEvents = "";
      unsetFixed();
    };
  }, []);

  return (
    <>
      <section
        ref={containerRef}
        className="sticky -top-360 390:-top-400 480:-top-500 md:-top-160 840:-top-180 lg:-top-40 1280:-top-120 1366:-top-160 1440:-top-180 1600:-top-240 1920:-top-280 text-white py-24 1366:py-36 1600:py-48 bg-[#0a0f14] z-10"
      >
        <div ref={placeholderRef} style={{ display: "none", height: 0 }} />
        <div
          id="portfolio"
          className="px-[5em] max-lg:px-[3em] max-md:px-[2em]"
          ref={innerRef}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4 1280:gap-6 1600:gap-8">
            <div className="flex flex-col justify-between space-y-6 order-1 lg:order-0">
              <div className="space-y-6">
                <SectionTitle
                  title="06 — Creative Archive"
                  font="font-poppins"
                />
                <h2 className="text-center md:text-start text-4xl 480:text-5xl md:text-6xl lg:text-4xl 1280:text-5xl 1366:text-5xl 1440:text-[55px] 1600:text-6xl 1920:text-7xl block font-normal font-sora">
                  Creative <br /> Work Backed By{" "}
                  <span
                    className="italic"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    Strategy
                  </span>
                </h2>
              </div>
              <div className="hidden md:inline-block max-md:flex max-md:justify-center ">
                <Button text="Explore All Works" href="/portfolio" />
              </div>
            </div>

            <div id="portfolio-1" className="relative order-3 lg:order-0">
              <Link href="/services/branding">
                <DirectionAwareHover
                  imageUrl="/images/portfolio/portfolio-1.png"
                  className="relative w-full h-full"
                  heading={<p>Branding</p>}
                  number={<p>01.</p>}
                >
                  <div className="text-xs 390:text-sm lg:text-xs 1366:text-sm 1600:text-base 1920:text-lg font-poppins font-light text-white/80">
                    <p>#BuildYourBrand</p>
                    <p>#brandwithpurpose</p>
                  </div>
                </DirectionAwareHover>
              </Link>
            </div>

            <div className="flex flex-col justify-start gap-3 order-2 lg:order-0">
              <Tags />
            </div>

            <div
              id="all-services"
              className="block max-lg:hidden lg:col-span-1"
            ></div>

            <div id="portfolio-2" className="order-4 lg:order-0">
              <Link href="/services/ui-ux">
                <DirectionAwareHover
                  imageUrl="/images/portfolio/portfolio-2.png"
                  className="w-full h-full"
                  heading={<p>UI/UX</p>}
                  number={<p>02.</p>}
                >
                  <div className="text-xs 390:text-sm lg:text-xs 1366:text-sm 1600:text-base 1920:text-lg font-poppins font-light text-white/80">
                    <p>#Webdesign</p>
                    <p>#Creativewebsolutions</p>
                  </div>
                </DirectionAwareHover>
              </Link>
            </div>

            <div id="portfolio-3" className="order-5 lg:order-0">
              <Link href="/services/mobile-applications">
                <DirectionAwareHover
                  imageUrl="/images/portfolio/portfolio-3.png"
                  className="w-full h-full"
                  heading={<p>Mobile Applications</p>}
                  number={<p>03.</p>}
                >
                  <div className="text-xs 390:text-sm lg:text-xs 1366:text-sm 1600:text-base 1920:text-lg font-poppins font-light text-white/80">
                    <p>#Appdesign</p>
                    <p>#Mobileapps</p>
                  </div>
                </DirectionAwareHover>
              </Link>
            </div>

            <div id="portfolio-4" className="order-6 lg:order-0">
              <Link href="/services/animations">
                <DirectionAwareHover
                  imageUrl="/images/portfolio/portfolio-4.png"
                  className="w-full h-full"
                  heading={<p>Animations</p>}
                  number={<p>04.</p>}
                >
                  <div className="text-xs 390:text-sm lg:text-xs 1366:text-sm 1600:text-base 1920:text-lg font-poppins font-light text-white/80">
                    <p>#Creativemotion</p>
                    <p>#Animateddesign</p>
                  </div>
                </DirectionAwareHover>
              </Link>
            </div>

            <div className="block max-lg:hidden lg:col-span-1"></div>

            <div id="portfolio-5" className="order-7 lg:order-0">
              <Link href="/services/web-development">
                <DirectionAwareHover
                  imageUrl="/images/portfolio/portfolio-5.png"
                  className="w-full h-full"
                  heading={<p>Web Development</p>}
                  number={<p>05.</p>}
                >
                  <div className="text-xs 390:text-sm lg:text-xs 1366:text-sm 1600:text-base 1920:text-lg font-poppins font-light text-white/80">
                    <p>#WebDevelopement</p>
                    <p>#ResponsiveDesign</p>
                  </div>
                </DirectionAwareHover>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={transitionRef}
        className="relative h-[50vh] z-50"
        style={{
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          willChange: "clip-path",
          transform: "translate3d(0,0,0)",
          background: "transparent",
        }}
      >
        <div
          className="absolute inset-0 bg-[#34A5DC]"
          style={{ clipPath: "inherit" }}
        />
      </section>

      <section
        id="brand-section"
        className="bg-[#34A5DC] -mt-1 pt-20 pb-125 relative z-10 min-h-screen flex items-center justify-center overflow-x-hidden"
      >
        <h2 className="z-20 text-[clamp(60px,12vw,260px)] text-center tracking-[-3%] leading-[0.8] md:leading-[0.85] uppercase font-semibold font-sora flex flex-col items-center gap-2">
          <ScrollFillText>We</ScrollFillText>
          <ScrollFillText>Shape</ScrollFillText>
          <ScrollFillText>Your</ScrollFillText>
          <ScrollFillText>Market </ScrollFillText>
          <ScrollFillText>Presence!</ScrollFillText>
        </h2>
      </section>
    </>
  );
};

export default PortfolioAndBrand;
