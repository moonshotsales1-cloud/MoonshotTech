"use client";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CTA from "../components/CTA";
import { AuroraText } from "@/components/ui/aurora-text";
import { PhoneCall } from "lucide-react";
import { GoLocation } from "react-icons/go";
import RotatingText from "@/components/RotatingText";
import TextType from "@/components/TextType";
import DecorativeLines from "../components/DecorativeLines";
import Ribbons from "@/components/Ribbons";
import Link from "next/link";
import Image from "next/image";
import Smoke from "../components/smoke/smoke";
import HeroTitle from "../components/hero-title";
import Form from "../components/reusable-components/Form";
import SectionTitle from "../components/reusable-components/SectionTitle";
import CyberHologramLoader from "../components/CyberHologramLoader";

export default function ContactUs() {
  return (
    <>
      <CyberHologramLoader />
      <section
        className="max-md:bg-[#00050A]"
        style={{ fontFamily: "var(--font-sora), sans-serif" }}
      >
        <Navbar />

        <div className="max-md:hidden fixed inset-0 z-9999 pointer-events-none">
          <Ribbons
            baseThickness={6}
            colors={["#D42290"]}
            speedMultiplier={0.4}
            maxAge={500}
            enableFade={true}
          />
        </div>

        <div className="flex items-center relative w-full overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              alt="linear-gradient-bg"
              width={1920}
              height={1080}
              src="/images/services/bg-service-banner.png"
              style={{ filter: "brightness(1.25)" }}
            />
          </div>

          {/* Decorative Lines */}
          <DecorativeLines />

          {/* Hero Section */}
          <div className="px-[5em] max-lg:px-[3em] max-md:px-[2em] max-sm:py-[35%] max-lg:pt-[30%] max-md:py-[30%] lg:pt-[18%] lg:pb-[22%]">
            <div className="relative z-10">
              <HeroTitle title="Contact Us" />

              <h1 className="text-center md:text-start text-2xl 480:text-3xl md:text-[40px] 840:text-5xl lg:text-[clamp(45px,4.5vw,100px)] font-normal font-sora uppercase mb-4 tracking-tight leading-[118%] 1920:leading-[120%]">
                <AuroraText colors={["#ffffff", "#d1bd73"]}>
                  Plan <br /> Your Growth{" "}
                </AuroraText>
                <span className="font-thin block leading-[110%]">
                  <AuroraText colors={["#D42290", "#2DAEEF"]}>
                    With Moonshot
                  </AuroraText>
                </span>
              </h1>

              <p className="text-center md:text-start font-sora font-normal text-white/70 text-xs 480:text-sm sm:text-base md:text-[clamp(13px,1.08vw,20px)] lg:text-[clamp(10px,1.08vw,22px)]">
                We invite you to reach out to us at MoonShot Tech to discuss
                your goals, challenges,
                <br /> and the structured digital solutions that can support
                your next phase of growth.
              </p>
            </div>

            <div>
              <img
                className="absolute inset-0 w-full h-auto"
                src="/images/services/bg-service-banner.png"
                alt="Hero Background Gradient"
              />
              <img
                src="/images/contact-us-hero.png"
                className="hidden lg:block w-[38.5%] h-auto absolute bottom-2 right-30 max-1600:right-30 max-xl:right-10 z-10"
                alt="City"
              />
            </div>

            <div className="max-md:hidden pb-10 lg:hidden flex items-center justify-center relative z-20">
              <img
                src="/images/contact-us-hero.png"
                className="w-1/2 h-auto"
                alt="Portfolio Hero"
              />
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <div className="absolute inset-0 rounded-t-[34.137px] overflow-hidden pointer-events-none">
            <Smoke />
          </div>
          <div className="-mt-10 max-md:py-10 max-lg:py-20 1600:pb-30 lg:pt-30 1366:pt-40 1600:pt-50 relative bg-[#00050A] rounded-t-[34.137px]">
            <div className="max-w-[80%] max-1600:max-w-[85%] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-16 lg:gap-6">
              {/* Left content */}
              <div className="text-center md:text-start lg:col-span-5">
                <div className="max-md:flex max-md:justify-center">
                  <SectionTitle
                    title="01 - Send Us a Message"
                    font="font-poppins"
                  />
                </div>

                <h2
                  style={{ fontFamily: "Inter, sans-serif" }}
                  className="leading-tight text-white mb-6 block text-[clamp(40px,5vw,75px)] md:text-[clamp(55px,5vw,75px)] lg:text-[clamp(45px,4.2vw,75px)]"
                >
                  Speak With Our
                  <br />
                  <span
                    className="italic"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    {" "}
                    Strategy Team
                  </span>
                </h2>

                <div className="lg:w-[80%] hidden lg:block text-[#989898] text-sm lg:text-xs 1280:text-[13px] 1440:text-sm 1600:text-base 1920:text-lg font-poppins leading-relaxed tracking-widest mb-8">
                  <TextType
                    text="Start the conversation with clarity about your goals. We will return with insight, structure, and a practical roadmap tailored to your requirements."
                    typingSpeed={15}
                    pauseDuration={1500}
                    showCursor={true}
                    cursorCharacter="|"
                    startOnVisible={true}
                    loop={true}
                  />

                  <div className="hidden w-full 1440:w-full lg:block h-[1.5px] bg-[#888] my-6 lg:my-8 1366:my-12" />
                </div>

                <div className="font-sora space-y-4 lg:space-y-6 1440:space-y-8 text-white text-[clamp(14px,2vw,24px)] lg:text-[clamp(10px,1.4vw,20px)]">
                  <div className="flex items-center max-md:justify-center gap-4">
                    <PhoneCall className="w-10 h-10 max-lg:h-8 md:h-8 fill-white" />
                    <Link href="tel:+19723315058" className="hover:underline">
                      +1-972-331-5058
                    </Link>
                  </div>

                  <div className="flex items-center max-md:justify-center gap-4">
                    <GoLocation className="w-10 h-10 max-lg:h-8 md:h-8" />
                    <Link
                      href="https://share.google/nqL7znJrG0VweAWyG"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      1200 East Collins Boulevard <br /> Suite 106 Richardson
                      Texas 75081
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right form */}
              <Form />
            </div>
          </div>

          <CTA />
        </div>

        <Footer />
      </section>
    </>
  );
}
