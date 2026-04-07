"use client";

import Carousel from "@/components/Carousel";
import TextType from "@/components/TextType";
import SectionTitle from "../reusable-components/SectionTitle";

export default function Proficients() {
  return (
    <section className="px-6 lg:px-10 1366:px-16 items-center py-24 1366:py-36 bg-[#00080F] relative z-50">
      {/* Heading */}
      <div className="text-center relative z-10 space-y-4 md:space-y-6 lg:space-y-8">
        <div className="flex justify-center">
          <SectionTitle title="05 — Case Studies" font="font-poppins" />
        </div>
        <h2 className="text-white text-7xl max-2xl:text-6xl max-1280:text-5xl max-lg:text-6xl max-sm:text-3xl tracking-tight leading-tight">
          <span className="block font-sora">
            <TextType
              text="Brands Refined For"
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={false}
              startOnVisible={true}
              loop={true}
            />{" "}
            <span
              className="italic"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              <TextType
                text="Performance"
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={false}
                startOnVisible={true}
                loop={true}
              />
            </span>
          </span>
        </h2>
      </div>

      <div className="flex justify-center md:max-w-[90%] 1920:max-w-[85%] mx-auto mt-10 1440:mt-20">
        <div className="absolute inset-0 top-0 flex justify-center pointer-events-none">
          <img
            src="/images/proficients/bg-performance.png"
            alt="Proficients Background"
            className="w-[95%] h-full object-contain object-center"
          />
        </div>
        <div className="relative z-10">
          <Carousel
            autoplay={false}
            autoplayDelay={3000}
            pauseOnHover={true}
            loop={false}
            round={false}
          />
        </div>
      </div>
    </section>
  );
}
