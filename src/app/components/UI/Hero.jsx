"use client";

import React from "react";
import Link from "next/link";
import Navbar from "../Navbar";

import { AuroraText } from "@/components/ui/aurora-text";
import TextScrollMarquee from "@/components/lightswind/text-scroll-marquee";
import { ChevronDown } from "lucide-react";

const socials = [
  {
    key: "facebook",
    label: "Facebook",
    char: "f",
    href: "#",
    gradient: "bg-[#0866ff]",
  },
  {
    key: "instagram",
    label: "Instagram",
    char: (
      <svg
        id="instagram"
        fill="#fff"
        viewBox="0 0 169.063 169.063"
        className="w-[1em] h-[1em]"
      >
        <g>
          <path d="M122.406,0H46.654C20.929,0,0,20.93,0,46.655v75.752c0,25.726,20.929,46.655,46.654,46.655h75.752c25.727,0,46.656-20.93,46.656-46.655V46.655C169.063,20.93,148.133,0,122.406,0z M154.063,122.407c0,17.455-14.201,31.655-31.656,31.655H46.654C29.2,154.063,15,139.862,15,122.407V46.655C15,29.201,29.2,15,46.654,15h75.752c17.455,0,31.656,14.201,31.656,31.655V122.407z" />
          <path d="M84.531,40.97c-24.021,0-43.563,19.542-43.563,43.563c0,24.02,19.542,43.561,43.563,43.561s43.563-19.541,43.563-43.561C128.094,60.512,108.552,40.97,84.531,40.97z M84.531,113.093c-15.749,0-28.563-12.812-28.563-28.561c0-15.75,12.813-28.563,28.563-28.563s28.563,12.813,28.563,28.563C113.094,100.281,100.28,113.093,84.531,113.093z" />
          <path d="M129.921,28.251c-2.89,0-5.729,1.17-7.77,3.22c-2.051,2.04-3.23,4.88-3.23,7.78c0,2.891,1.18,5.73,3.23,7.78c2.04,2.04,4.88,3.22,7.77,3.22c2.9,0,5.73-1.18,7.78-3.22c2.05-2.05,3.22-4.89,3.22-7.78c0-2.9-1.17-5.74-3.22-7.78C135.661,29.421,132.821,28.251,129.921,28.251z" />
        </g>
      </svg>
    ),
    href: "#",
    gradient:
      "bg-[linear-gradient(135deg,#FF8A00_0%,#E52E71_50%,#9B00FF_100%)]",
  },
  {
    key: "x",
    label: "X (Twitter)",
    char: "𝕏",
    href: "#",
    gradient: "bg-white",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    char: "in",
    href: "#",
    gradient: "bg-[#0a66c2]",
  },
];

const Hero = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      className="relative w-full z-20 bg-[#00060B] rounded-b-[36px] lg:rounded-b-[64px] overflow-hidden"
      style={{ backgroundImage: 'url("/images/hero-bg.png")' }}
    >
      {/* Navbar */}
      {/* <Navbar onMenuStateChange={setIsMenuOpen} /> */}

      {/* Hero Content */}
      <div className="relative flex items-center justify-center pt-30 overflow-visible">
        {/* Decorative Labels */}
        <div className="hidden lg:block absolute lg:top-[30%] 1366:top-[29%] 1440:top-[27%] 1920:top-[22%] left-20">
          <p
            style={{ fontFamily: "var(--font-poppins), sans-serif" }}
            className="text-sm md:text-base lg:text-xs 1280:text-sm 1366:text-base 1440:text-lg font-normal text-[#FFFFFF99]"
          >
            (creative)
          </p>
        </div>
        <div className="hidden lg:block absolute lg:top-[30%] 1366:top-[29%] 1440:top-[27%] 1920:top-[22%] right-20">
          <p
            style={{ fontFamily: "var(--font-poppins), sans-serif" }}
            className="text-sm md:text-base lg:text-xs 1280:text-sm 1366:text-base 1440:text-lg font-normal text-[#FFFFFF99]"
          >
            (agency)
          </p>
        </div>

        {/* Main Content Container */}
        <div
          className="md:mt-20 lg:mt-17 1280:mt-25 z-10 w-full flex flex-col items-center md:max-w-[77%] overflow-visible"
          style={{
            mixBlendMode: "screen",
          }}
        >
          <div className="w-full relative">
            {/* Decorative Lines */}
            <div className="max-sm:hidden block">
              {["5%", "25%", "47%", "70%", "95%"].map((left) => (
                <div
                  key={left}
                  style={{ left }}
                  className="absolute top-0 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 pointer-events-none z-50"
                >
                  <div
                    className="w-px h-[150vh]"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(187,187,187,0) 0%, rgba(187,187,187,0.12) 12%, rgba(187,187,187,0.12) 88%, rgba(187,187,187,0) 100%)",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Left Side - Digital Text */}
            <div className="hidden md:block leading-none">
              <div className="ml-[5%] 1920:ml-[7%] text-center md:text-left max-sm:mb-5 relative z-10">
                <h1
                  className="text-[clamp(80px,11vw,238px)] italic tracking-[-2px] 1920:tracking-[-7.2px]"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  Digital
                </h1>
              </div>

              <div className="lg:-mt-5 lg:mr-[1%] text-end max-lg:text-center">
                <h1 className="text-[clamp(60px,11vw,238px)] flex justify-center md:justify-end font-sora tracking-[-2px] 1920:tracking-[-6.56px]">
                  Experts
                </h1>
              </div>
            </div>

            <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-1/2 block md:hidden leading-none tracking-[-3%]">
              <div className="md:ml-10 text-center md:text-left max-sm:mb-5 relative z-10">
                <h1
                  className="text-7xl 480:text-8xl italic"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  Digital
                </h1>
              </div>

              <div className="lg:-mt-5 text-end max-lg:text-center">
                <h1 className="text-7xl 480:text-8xl flex justify-center md:justify-end font-sora">
                  Experts
                </h1>
              </div>
            </div>
          </div>

          {/* Video Container - Center (overflow visible) */}
          <div
            className="-mt-112 max-1920:-mt-100 max-1600:-mt-88 max-1366:-mt-78 max-1280:-mt-60 max-lg:-mt-50 max-md:mt-0 relative z-999 w-[70%] max-sm:w-full overflow-visible"
            style={{ mixBlendMode: "exclusion" }}
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="mt-10 md:mt-25 360:w-100 360:h-100 md:w-125 md:h-125 1600:w-150 1600:h-150 rounded-full blur-[180px]"
                style={{
                  background:
                    "linear-gradient(45deg, rgba(40, 100, 255, 0.60) 15.91%, rgba(250, 40, 137, 0.60) 52.98%, rgba(35, 141, 250, 0.60) 73.58%, rgba(62, 95, 249, 0.60) 107.45%)",
                }}
              />
            </div>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="relative z-10 w-full h-auto object-contain opacity-90"
              style={{
                mixBlendMode: "screen",
                transform: "rotate(2.075deg) scale(0.85)",
              }}
            >
              <source src="/videos/hero/service-video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Services Text - Right Bottom */}
        <div className="max-md:hidden block absolute right-20 top-[70%] lg:top-[60%] text-right z-50">
          <p className="text-gray-600 text-base 1280:text-lg 1440:text-xl 1600:text-2xl leading-relaxed transition-colors duration-300 font-sora">
            <span
              onClick={() => scrollToSection("branding")}
              className="text-gray-600 hover:text-white hover:underline cursor-pointer"
            >
              Branding
            </span>{" "}
            /{" "}
            <span
              onClick={() => scrollToSection("mobile-applications")}
              className="hover:underline text-gray-600 hover:text-white cursor-pointer"
            >
              Mobile Apps
            </span>
            <br />/{" "}
            <span
              onClick={() => scrollToSection("animations")}
              className="text-gray-600 hover:text-white hover:underline cursor-pointer"
            >
              Graphic
            </span>{" "}
            /{" "}
            <span
              onClick={() => scrollToSection("ui-ux")}
              className="hover:underline text-gray-600 hover:text-white cursor-pointer"
            >
              UI/UX
            </span>
          </p>
        </div>
      </div>

      {/* Social Media Icons - Left Side */}
      <div
        className={`max-md:hidden absolute lg:left-16 max-lg:left-10 pl-3 top-[40%] lg:top-[45%] flex flex-col gap-5 transition-all duration-300 ${
          isMenuOpen ? "z-0" : "z-0"
        }`}
      >
        {socials.map((s) => (
          <div
            key={s.key}
            className="relative group/frame p-0.5 cursor-pointer"
          >
            {/* --- CORNER BORDERS --- */}
            {/* Top Left */}
            <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/20 transition-colors duration-300 group-hover/frame:border-white/80" />
            {/* Top Right */}
            <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/20 transition-colors duration-300 group-hover/frame:border-white/80" />
            {/* Bottom Left */}
            <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/20 transition-colors duration-300 group-hover/frame:border-white/80" />
            {/* Bottom Right */}
            <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/20 transition-colors duration-300 group-hover/frame:border-white/80" />

            {/* --- EXISTING CIRCULAR LINK --- */}
            <Link
              href={s.href}
              aria-label={s.label}
              className={`
                group relative w-12 h-12 max-1600:w-11 max-1600:h-11 max-1440:w-10 max-1440:h-10 max-1366:w-9 max-1366:h-9 max-1280:w-8 max-1280:h-8 max-lg:h-6 max-lg:w-6 rounded-full
                flex items-center justify-center text-xs font-medium
                bg-gray-800/80 backdrop-blur
                text-white transition-colors duration-300
                focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40
                overflow-hidden
                `}
            >
              {/* Animated gradient fill layer */}
              <span
                aria-hidden="true"
                className={`
                    absolute left-0 top-full w-full h-full rounded-full
                    ${s.gradient}
                    transition-all duration-500 ease-out
                    group-hover:top-0
                    group-active:top-0
                    will-change:top
                `}
              />
              {/* Glyph */}
              <span
                className={`relative text-[16px] max-1600:text-[15px] max-1440:text-[14px] max-1366:text-[13px] max-1280:text-[12px] z-10 transition-colors duration-300 ${
                  s.key === "x"
                    ? "group-hover:text-black"
                    : "group-hover:text-white"
                }`}
              >
                {s.char}
              </span>
            </Link>
          </div>
        ))}
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
              @media (prefers-reduced-motion: reduce) {
                  .group span:first-child {
                      transition: none;
                  }
                  .group:hover span:first-child {
                      top: 0;
                  }
                  .group:hover .relative.z-10 {
                      transition: none;
                  }
              }
          `,
        }}
      />

      {/* Bottom div */}
      <div className="relative z-100 w-full max-sm:py-4 -mt-40">
        {/* Bottom large background word/image */}
        <div
          className="absolute inset-x-0 -bottom-5 1920:-bottom-10 z-0 pointer-events-none"
          style={{
            fontFamily: "Inter",
            opacity: 0.05,
          }}
        >
          <TextScrollMarquee
            baseVelocity={3}
            direction="left"
            className="text-[clamp(120px,12vw,350px)] font-medium tracking-tighter leading-none text-white/20 select-none pointer-events-none"
            scrollDependent={false}
            delay={500}
          >
            Moonshot Tech
          </TextScrollMarquee>
        </div>

        {/* Background gradient */}
        <div className="mt-75 absolute inset-0 flex items-center justify-center pointer-events-none z-50">
          <div
            className="w-screen h-80 rounded-full blur-[160px]"
            style={{
              background:
                "linear-gradient(119deg, rgba(57, 40, 255, 0.80) 14.54%, rgba(250, 40, 137, 0.80) 41.09%, rgba(35, 141, 250, 0.80) 55.83%, rgba(62, 95, 249, 0.80) 80.08%), linear-gradient(119deg, rgba(255, 198, 40, 0.80) 14.54%, rgba(250, 40, 137, 0.80) 41.09%, rgba(35, 141, 250, 0.80) 55.83%, rgba(62, 95, 249, 0.80) 80.08%)",
            }}
          />
        </div>

        {/* Content Container */}
        <div className="relative flex justify-between items-center max-sm:justify-center px-20 max-sm:px-6 pt-22 pb-3 md:pb-12 gap-8 max-sm:gap-12">
          {/* Bottom Left Scroll Text */}
          <div className="max-390:hidden mt-6 flex justify-center items-center gap-4">
            <p className="text-xs md:text-sm lg:text-xs 1280:text-sm 1366:text-base whitespace-nowrap font-sora">
              (Scroll Down)
            </p>
          </div>

          {/* Center Button */}
          <div className="mt-6 bg-white/10 rounded-[133px] py-2 px-8 lg:px-12 hover:scale-105 transition-transform duration-300 flex justify-center items-center gap-4 cursor-pointer">
            <a href="#about-us" className="scroll-smooth">
              <ChevronDown className="w-6 h-6 lg:w-8 lg:h-8" />
            </a>
          </div>

          {/* Bottom Right Scroll Indicator */}
          <div className="relative z-10 max-390:hidden mt-6 flex justify-center items-center text-nowrap">
            <p className="font-sora text-right text-xs md:text-sm lg:text-xs 1280:text-sm 1366:text-base leading-relaxed text-white/60">
              Let's explore
              <br />
              <span className="text-white">Moonshot Tech</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
