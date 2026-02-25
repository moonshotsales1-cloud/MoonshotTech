"use client";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AuroraText } from "@/components/ui/aurora-text";
import PortfolioGrid from "../components/PortfolioGrid";
import DecorativeLines from "../components/DecorativeLines";
import Ribbons from "@/components/Ribbons";
import Image from "next/image";
import Smoke from "../components/smoke/smoke";
import CTA from "../components/CTA";
import HeroTitle from "../components/hero-title";
import CyberHologramLoader from "../components/CyberHologramLoader";

export default function Portfolio() {
  return (
    <div className="relative">
      <Smoke />

      <CyberHologramLoader />
      <section className="overflow-x-hidden bg-[#00050A]">
        <div className="max-md:hidden fixed inset-0 z-9999 pointer-events-none">
          <Ribbons
            baseThickness={6}
            colors={["#D42290"]}
            speedMultiplier={0.4}
            maxAge={500}
            enableFade={true}
          />
        </div>

        <Navbar />

        <section className="lg:flex items-center relative w-full">
          {/* Background Image Container */}
          <div className="absolute inset-0 z-10">
            <Image
              alt="linear-gradient-bg"
              width={1920}
              height={1080}
              src="/images/services/bg-service-banner.png"
              style={{ filter: "brightness(1.25)" }}
            />
            {/* <div className="hidden md:block absolute bottom-0 w-full h-64 bg-linear-to-b from-transparent to-[#00050a33]" /> */}
          </div>

          {/* Decorative Lines */}
          <DecorativeLines />

          {/* Hero Section */}
          <div className="px-[5em] max-lg:px-[3em] max-md:px-[2em] max-sm:pt-[40%] max-sm:pb-[10%] max-lg:pt-[30%] max-md:py-[30%] lg:py-[18%]">
            <div className="relative z-10">
              <HeroTitle title="Portfolio" />

              <h1 className="text-center md:text-start font-normal font-sora uppercase mb-4 text-2xl 480:text-3xl md:text-[40px] 840:text-5xl lg:text-[clamp(36px,4vw,70px)] tracking-tight leading-[110%]">
                <AuroraText colors={["#ffffff", "#d1bd73"]}>
                  Proof of Performance
                  <br /> in Action - Designed,{" "}
                </AuroraText>
                <span className="font-thin block lg:text-[clamp(36px,4vw,74px)]">
                  <AuroraText colors={["#D42290", "#2DAEEF"]}>
                    Engineered, Activated
                  </AuroraText>
                </span>
              </h1>

              <p className="text-center md:text-start font-normal font-sora text-white/70 text-xs 480:text-sm sm:text-base md:text-[clamp(13px,1.08vw,20px)] lg:text-[clamp(10px,1.08vw,20px)]">
                Explore our portfolio to see how branding, development,
                marketing, and digital systems
                <br /> come together to produce structured, performance driven
                results across industries.
              </p>
            </div>

            <div className="hidden lg:block">
              <img
                className="absolute inset-0 w-full h-auto"
                src="/images/services/bg-service-banner.png"
                alt="Hero Background Gradient"
              />
              <img
                src="/images/portfolio-page/portfolio-banner.png"
                className="absolute -top-40 z-20 w-full h-auto -right-100"
                alt="Portfolio Hero"
              />
            </div>
          </div>

          <div className="max-md:hidden lg:hidden flex items-center justify-center relative z-20">
            <img
              src="/images/portfolio-page/portfolio-hero-tablet.png"
              className="w-3/4 h-auto rotate-[7.76deg]"
              alt="Portfolio Hero"
              style={{ mixBlendMode: "screen" }}
            />
          </div>
        </section>

        <PortfolioGrid />
        <CTA />

        <Footer />
      </section>
    </div>
  );
}
