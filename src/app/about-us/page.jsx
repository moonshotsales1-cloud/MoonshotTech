"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AuroraText } from "@/components/ui/aurora-text";
import Partners from "../components/UI/Partners";
import ScrollReveal from "@/components/lightswind/scroll-reveal";
import TextType from "@/components/TextType";
import { CountingNumber } from "@/components/ui/shadcn-io/counting-number";
import SlidingLogoMarquee from "@/components/lightswind/sliding-logo-marquee";
import DecorativeLines from "../components/DecorativeLines";
import Ribbons from "@/components/Ribbons";
import CyberHologramLoader from "../components/CyberHologramLoader";
import HeroTitle from "../components/hero-title";
import SectionTitle from "../components/reusable-components/SectionTitle";
import TechCard from "../components/reusable-components/TechCards";
import MoonshotIcon from "../components/reusable-components/MoonshotIcon";

gsap.registerPlugin(ScrollTrigger);

export default function AboutUsPage() {
  const cards = [
    {
      id: 1,
      title: "Define Objectives <br /> With Precision",
      description:
        "Market understanding <br /> Audience insight <br /> Brand positioning <br /> Performance benchmarks <br /> Competitive awareness <br /> Strategic direction",
    },
    {
      id: 2,
      title: "Structure <br /> Before Design",
      description:
        "System mapping <br /> Platform planning <br /> Technical evaluation <br /> Workflow alignment <br /> Scalability planning <br /> Risk assessment",
    },
    {
      id: 3,
      title: "Identity With <br /> Measured Purpose",
      description:
        "Visual clarity <br /> Message alignment <br /> Experience planning <br /> Consistent presence <br /> Brand cohesion <br /> Engagement focus",
    },
    {
      id: 4,
      title: "Build With <br /> Reliability",
      description:
        "Clean engineering <br /> Secure frameworks <br /> Performance optimization <br /> CMS structure <br /> Application stability <br /> Integration readiness",
    },
    {
      id: 5,
      title: "Launch With <br /> Measured Strategy",
      description:
        "SEO execution <br /> Paid campaigns <br /> Social alignment <br /> Email systems <br /> Data tracking <br /> Channel coordination",
    },
    {
      id: 6,
      title: "Improve Through <br /> Analytics",
      description:
        "Behavioral analysis <br /> Conversion tracking <br /> Strategic reviews <br /> Iterative updates <br /> Transparent reporting <br /> Collaborative decisions",
    },
  ];

  const Card = ({ card, showArrow = true }) => {
    return (
      <>
        <div
          key={card.id}
          className="group relative w-120 overflow-hidden"
          style={{ height: "350px" }}
        >
          <div className="absolute inset-0 z-10 grid place-content-start">
            <div className="flex gap-12 justify-center items-center mb-10">
              <p
                className="text-[clamp(10px,1.5vw,20px)] uppercase"
                dangerouslySetInnerHTML={{ __html: card.title }}
              ></p>
              {showArrow && card.id !== cards.length && (
                <div className="w-50">
                  <img
                    src="/images/arrow.png"
                    alt="arrow"
                    className="h-auto w-full"
                  />
                </div>
              )}
            </div>
            <p
              className="text-[clamp(10px,1.1vw,17px)] font-light leading-loose"
              dangerouslySetInnerHTML={{ __html: card.description }}
            />
          </div>
        </div>
      </>
    );
  };

  const HorizontalScrollCarousel = () => {
    const carouselRef = useRef(null);
    const contentRef = useRef(null);

    useGSAP(
      () => {
        const carouselEl = carouselRef.current;
        const contentEl = contentRef.current;
        if (!carouselEl || !contentEl) return;

        // Don't pin on mobile devices to allow normal vertical scrolling
        if (window.innerWidth < 1024) return;

        const totalWidth = contentEl.scrollWidth;
        const viewportWidth = window.innerWidth;
        if (totalWidth <= viewportWidth) return;

        const getScrollAmount = () =>
          -(contentEl.scrollWidth - window.innerWidth);

        const tween = gsap.to(contentEl, {
          x: getScrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: carouselEl, // The entire wrapper including headings is now the trigger
            start: "top 15%", // Pin it when the top of the headings is 15% from the top of the screen
            end: () => `+=${contentEl.scrollWidth - window.innerWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        const ro = new ResizeObserver(() => {
          ScrollTrigger.refresh();
        });
        ro.observe(contentEl);

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          ro.disconnect();
        };
      },
      { scope: carouselRef },
    );

    return (
      <div ref={carouselRef} className="relative w-full">
        {/* Headings */}
        <div className="text-center md:text-start grid grid-cols-1 lg:grid-cols-6 w-full">
          <div className="col-span-2 md:flex md:items-start">
            <SectionTitle title="03 - Working Philosophy" font="font-poppins" />
          </div>
          <div className="col-span-4">
            <h2 className="font-sora text-5xl max-2xl:text-4xl max-xl:text-3xl max-lg:text-3xl max-md:text-2xl max-480:text-xl uppercase font-normal leading-[1.2]">
              Performance Shaped Through <br className="hidden md:block" />{" "}
              Disciplined Execution
            </h2>
          </div>
        </div>

        {/* Desktop Horizontal Scroll */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-6 mt-16 h-[50vh]">
          <div className="md:col-span-2" aria-hidden="true" />
          <div className="md:col-span-4 relative overflow-visible">
            <div
              ref={contentRef}
              className="flex gap-6 absolute left-0 top-0 h-full items-start pr-[50vw]"
            >
              {cards.map((card) => (
                <Card key={card.id} card={card} />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Stacked Grid */}
        <div className="relative lg:hidden mt-8">
          <div className="grid grid-cols-1 480:grid-cols-2 gap-6">
            {cards.map((card) => (
              <div
                key={card.id}
                className="relative z-10 text-center md:text-start"
              >
                <div className="relative overflow-hidden rounded-[18px] bg-white/5 p-6 480:min-h-90 md:min-h-0">
                  <div className="mb-3">
                    <p
                      className="text-base 480:text-lg md:text-[clamp(14px,2.5vw,20px)] uppercase"
                      dangerouslySetInnerHTML={{ __html: card.title }}
                    />
                  </div>
                  <p
                    className="text-sm lg:text-[clamp(12px,2vw,16px)] font-light leading-loose text-white/80"
                    dangerouslySetInnerHTML={{ __html: card.description }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const logos = [
    // --- FRONTEND & WEB ---
    {
      id: "2",
      content: (
        <TechCard
          imageSrc="/images/about-us-page/icons/icon-17.svg"
          imageAlt="HTML5"
          accentColor="#E34F26"
        />
      ),
    },
    {
      id: "3",
      content: (
        <TechCard
          imageSrc="/images/about-us-page/icons/icon-21.svg"
          imageAlt="JavaScript"
          accentColor="#F7DF1E"
        />
      ),
    },
    {
      id: "1",
      content: (
        <TechCard
          imageSrc="/images/about-us-page/icons/icon-35.svg"
          imageAlt="React"
          accentColor="#61DAFB"
        />
      ),
    },
    {
      id: "5",
      content: (
        <TechCard
          imageSrc="/images/about-us-page/icons/icon-7.svg"
          imageAlt="Angular"
          accentColor="#DD0031"
        />
      ),
    },
    {
      id: "6",
      content: (
        <TechCard
          imageSrc="/images/about-us-page/icons/icon-2.svg"
          imageAlt="Vue.js"
          accentColor="#4FC08D"
        />
      ),
    },
    {
      id: "21",
      content: (
        <TechCard
          imageSrc="/images/about-us-page/icons/icon-22.svg"
          imageAlt="jQuery"
          accentColor="#0769AD"
        />
      ),
    },

    // --- BACKEND & LANGUAGES ---
    {
      id: "4",
      content: (
        <TechCard
          imageSrc="/images/about-us-page/icons/icon-34.svg"
          imageAlt="Python"
          accentColor="#3776AB"
        />
      ),
    },
    {
      id: "14",
      content: (
        <TechCard
          imageSrc="/images/about-us-page/icons/icon-20.svg"
          imageAlt="Java"
          accentColor="#007396"
        />
      ),
    },
    {
      id: "20",
      content: (
        <TechCard
          imageSrc="/images/about-us-page/icons/icon-13.svg"
          imageAlt="C#"
          accentColor="#68217A"
        />
      ),
    },
    {
      id: "19",
      content: (
        <TechCard
          imageSrc="/images/about-us-page/icons/icon-8.svg"
          imageAlt="ASP.NET"
          accentColor="#512BD4"
        />
      ),
    },
    {
      id: "13",
      content: (
        <TechCard
          imageSrc="/images/about-us-page/icons/icon-31.svg"
          imageAlt="PHP"
          accentColor="#777BB4"
        />
      ),
    },
    {
      id: "12",
      content: (
        <TechCard
          imageSrc="/images/about-us-page/icons/icon-24.svg"
          imageAlt="Laravel"
          accentColor="#FF2D20"
        />
      ),
    },

    // --- MOBILE ---
    {
      id: "16",
      content: (
        <TechCard
          imageSrc="/images/about-us-page/icons/icon-36.svg"
          imageAlt="Swift"
          accentColor="#F05138"
        />
      ),
    },
    {
      id: "15",
      content: (
        <TechCard
          imageSrc="/images/about-us-page/icons/icon-23.svg"
          imageAlt="Kotlin"
          accentColor="#7F52FF"
        />
      ),
    },
    {
      id: "17",
      content: (
        <TechCard
          imageSrc="/images/about-us-page/icons/icon-5.svg"
          imageAlt="Android"
          accentColor="#3DDC84"
        />
      ),
    },
    {
      id: "18",
      content: (
        <TechCard
          imageSrc="/images/about-us-page/icons/icon-6.svg"
          accentColor="#3DDC84"
          heading="Android<br />Studio"
        />
      ),
    },

    // --- DATABASES ---
    {
      id: "10",
      content: (
        <TechCard
          imageSrc="/images/about-us-page/icons/icon-27.svg"
          imageAlt="MySQL"
          accentColor="#4479A1"
        />
      ),
    },
    {
      id: "11",
      content: (
        <TechCard
          imageSrc="/images/about-us-page/icons/icon-33.svg"
          imageAlt="PostgreSQL"
          accentColor="#336791"
        />
      ),
    },
    {
      id: "35",
      content: (
        <TechCard
          imageSrc="/images/about-us-page/icons/icon-29.svg"
          imageAlt="NoSQL"
          accentColor="#4DB33D"
        />
      ),
    },
    {
      id: "9",
      content: (
        <TechCard
          imageSrc="/images/about-us-page/icons/icon-26.svg"
          imageAlt="MongoDB"
          accentColor="#47A248"
        />
      ),
    },

    // --- CLOUD & DEVOPS ---
    {
      id: "7",
      content: (
        <TechCard
          imageSrc="/images/about-us-page/icons/icon-4.svg"
          accentColor="#FF9900"
          heading="Amazon <br /> Web Services"
        />
      ),
    },
    {
      id: "24",
      content: (
        <TechCard
          imageSrc="/images/about-us-page/icons/icon-12.svg"
          imageAlt="AWS S3"
          accentColor="#3F8624" /* AWS Storage Green */
        />
      ),
    },
    {
      id: "23",
      content: (
        <TechCard
          imageSrc="/images/about-us-page/icons/icon-11.svg"
          imageAlt="AWS Lambda"
          accentColor="#D05C17" /* AWS Compute Orange */
        />
      ),
    },
    {
      id: "25",
      content: (
        <TechCard
          imageSrc="/images/about-us-page/icons/icon-10.svg"
          accentColor="#8C4FFF" /* AWS Networking Purple */
          heading="Amazon <br /> CloudFront"
        />
      ),
    },
    {
      id: "26",
      content: (
        <TechCard
          imageSrc="/images/about-us-page/icons/icon-9.svg"
          accentColor="#CC2264" /* AWS App Integration Pink/Red */
          heading="AWS<br />API Gateway"
        />
      ),
    },
    {
      id: "22",
      content: (
        <TechCard
          imageSrc="/images/about-us-page/icons/icon-28.svg"
          imageAlt="Nginx"
          accentColor="#009639"
        />
      ),
    },

    // --- DESIGN (ADOBE, FIGMA, ETC) ---
    {
      id: "8",
      content: (
        <TechCard
          imageSrc="/images/about-us-page/icons/icon-14.svg"
          imageAlt="Figma"
          accentColor="#F24E1E"
        />
      ),
    },
    {
      id: "30",
      content: (
        <TechCard
          imageSrc="/images/about-us-page/icons/icon-19.svg"
          imageAlt="InVision"
          accentColor="#FF3366"
        />
      ),
    },
    {
      id: "27",
      content: (
        <TechCard
          imageSrc="/images/about-us-page/icons/icon-30.svg"
          imageAlt="Adobe Photoshop"
          accentColor="#31A8FF"
        />
      ),
    },
    {
      id: "28",
      content: (
        <TechCard
          imageSrc="/images/about-us-page/icons/icon-18.svg"
          accentColor="#FF9A00"
          heading="Adobe<br />Illustrator"
        />
      ),
    },
    {
      id: "29",
      content: (
        <TechCard
          imageSrc="/images/about-us-page/icons/icon-1.svg"
          accentColor="#9999FF"
          heading="Adobe<br />After Effects"
        />
      ),
    },

    // --- MARKETING, SOCIAL & ANALYTICS ---
    {
      id: "31",
      content: (
        <TechCard
          imageSrc="/images/about-us-page/icons/icon-16.svg"
          accentColor="#F9AB00"
          heading="Google<br />Analytics"
        />
      ),
    },
    {
      id: "32",
      content: (
        <TechCard
          imageSrc="/images/about-us-page/icons/icon-15.svg"
          imageAlt="Google Ads"
          accentColor="#4285F4"
        />
      ),
    },
    {
      id: "36",
      content: (
        <TechCard
          imageSrc="/images/about-us-page/icons/icon-3.svg"
          heading="AdWords<br />Fundamentals"
          accentColor="#F4B400"
        />
      ),
    },
    {
      id: "33",
      content: (
        <TechCard
          imageSrc="/images/about-us-page/icons/icon-25.svg"
          imageAlt="Meta"
          accentColor="#0668E1"
        />
      ),
    },
    {
      id: "34",
      content: (
        <TechCard
          imageSrc="/images/about-us-page/icons/icon-32.svg"
          imageAlt="Pinterest"
          accentColor="#E60023"
        />
      ),
    },
  ];

  return (
    <>
      <CyberHologramLoader />
      <section
        className="relative bg-[#00050A] overflow-x-hidden"
        style={{ fontFamily: "var(--font-sora), sans-serif" }}
      >
        <Navbar />

        <div className="max-sm:hidden fixed inset-0 z-9999 pointer-events-none">
          <Ribbons
            baseThickness={6}
            colors={["#D42290"]}
            speedMultiplier={0.4}
            maxAge={500}
            enableFade={true}
          />
        </div>

        <div className="flex items-center relative w-full overflow-visible">
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
          <section className="px-[5em] max-lg:px-[3em] max-md:px-[2em] max-sm:pt-[40%] max-sm:pb-[10%] max-lg:pt-[30%] lg:pt-[18%] lg:pb-[22%]">
            <div className="relative z-10">
              <HeroTitle title="Our Company" />

              <h1 className="font-normal font-sora uppercase text-center md:text-start text-2xl 480:text-3xl md:text-4xl 840:text-6xl lg:text-5xl 1280:text-[clamp(36px,4.65vw,82px)] mb-4 tracking-tight leading-[110%]">
                <AuroraText colors={["#ffffff", "#d1bd73"]}>
                  Strategic <br /> Thinking Built Into{" "}
                </AuroraText>
                <span className="text-2xl 480:text-3xl sm:text-4xl md:text-5xl 840:text-6xl lg:text-[clamp(40px,4.5vw,80px)] font-thin lg:text-end block">
                  <AuroraText colors={["#D42290", "#2DAEEF"]}>
                    Every Digital Move
                  </AuroraText>
                </span>
              </h1>

              <p className="text-center md:text-start font-normal font-sora text-white/70 text-xs 480:text-sm sm:text-base lg:text-[clamp(12px,1.08vw,20px)]">
                This page shares who we are, how we think, and the disciplined
                approach that drives <br /> our digital performance across every
                engagement. Read on to learn more about us.
              </p>
            </div>

            <div>
              <img
                className="absolute inset-0 w-full h-auto"
                src="/images/services/bg-service-banner.png"
                alt="Hero Background Gradient"
              />
              <img
                src="/images/about-us-bg.png"
                className="hidden lg:block lg:absolute z-10 w-1/2 h-auto top-50 -right-40 max-1440:-right-30"
                alt="Astronaut"
              />
            </div>

            <div className="py-10 max-md:hidden lg:hidden relative z-20">
              <img
                src="/images/about-us-bg.png"
                className="w-3/4 h-auto opacity-0"
                alt="City"
              />
              <img
                src="/images/about-us-bg.png"
                className="w-3/4 h-auto absolute -right-12 top-10"
                alt="City"
              />
            </div>
          </section>
        </div>

        <div className="relative z-10 px-[5em] max-lg:px-[3em] max-md:px-[2em]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-auto object-cover rounded-[34.137px] items-center"
          >
            <source src="/videos/about-us-video.webm" type="video/mp4" />
          </video>
        </div>

        <div
          className="bg-top overflow-hidden brightness-[1.2]"
          style={{ backgroundImage: "url(/images/services/bg-gradient.png)" }}
        >
          {/* Who We Are Section */}
          <div>
            <div className="relative z-10 max-w-[90%] mx-auto py-10 md:py-24 1280:py-36 1440:py-48">
              <div className="space-y-5 lg:space-y-10">
                <SectionTitle title="01 — Our Foundation" font="font-poppins" />

                <div className="scroll-reveal uppercase font-sora lg:max-w-[95%] leading-tight">
                  <ScrollReveal size="md">
                    MoonShot Tech builds structured digital systems that support
                    measurable growth for ambitious businesses.
                  </ScrollReveal>
                </div>

                <div className="w-full lg:max-w-[90%] flex max-md:flex-col justify-between gap-12 lg:gap-6">
                  <div className="text-center md:text-start text-xs 1366:text-[13px] 1440:text-sm 1600:text-base 1920:text-lg lg:mt-10 md:max-w-[50%] lg:max-w-[53%] 1366:max-w-[54%] 1440:max-w-[55%] 1600:max-w-[56%] 1920:max-w-[53%] text-[#808080]">
                    <TextType
                      text="MoonShot Tech is a Texas-based digital design and strategic development agency. We specialize in branding, website and application development, search optimization, paid media, and performance marketing. Our work is guided by analytics, structured planning, and long term collaboration with businesses that value measurable growth and accountability."
                      typingSpeed={15}
                      pauseDuration={1500}
                      showCursor={true}
                      cursorCharacter="|"
                      startOnVisible={true}
                      loop={true}
                    />
                  </div>

                  <div className="flex justify-center md:justify-start gap-12 1280:gap-20 1366:gap-23 1600:gap-28 1920:gap-32 max-lg:gap-8">
                    <div className="text-center md:text-start">
                      <p className="text-4xl 480:text-5xl md:text-6xl 840:text-7xl lg:text-[clamp(50px,6vw,110px)]">
                        <CountingNumber
                          number={10}
                          inView={true}
                          transition={{ stiffness: 100, damping: 30 }}
                        />
                        +
                      </p>
                      <span className="text-xs 480:text-sm 840:text-sm 1366:text-base 1600:text-xl">
                        Years of Industry <br /> Experience
                      </span>
                    </div>
                    <div className="text-center md:text-start">
                      <p className="text-4xl 480:text-5xl md:text-6xl 840:text-7xl lg:text-[clamp(50px,6vw,110px)]">
                        <CountingNumber
                          number={700}
                          inView={true}
                          transition={{ stiffness: 100, damping: 30 }}
                        />
                        +
                      </p>
                      <span className="text-xs 480:text-sm 840:text-sm 1366:text-base 1600:text-xl">
                        Projects Delivered <br /> Successfully
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 lg:mt-20">
                {/* Images Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-end gap-6">
                  <div className="w-full relative mx-auto h-auto overflow-hidden">
                    <Image
                      src="/images/about-us-page/image-1.png"
                      width={400}
                      height={400}
                      alt="Image 1"
                      className="w-full h-auto relative z-0 transition-all duration-300 hover:scale-110"
                    />
                  </div>
                  <div className="w-full relative mx-auto h-auto overflow-hidden">
                    <Image
                      src="/images/about-us-page/image-2.png"
                      width={400}
                      height={400}
                      alt="Image 2"
                      className="w-full h-auto relative z-0 transition-all duration-300 hover:scale-110"
                    />
                  </div>
                  <div className="w-full relative mx-auto h-auto overflow-hidden">
                    <Image
                      src="/images/about-us-page/image-3.png"
                      width={400}
                      height={400}
                      alt="Image 3"
                      className="w-full h-auto relative z-0 transition-all duration-300 hover:scale-110"
                    />
                  </div>
                  <div className="w-full relative mx-auto h-auto overflow-hidden">
                    <Image
                      src="/images/about-us-page/image-4.png"
                      width={400}
                      height={400}
                      alt="Image 4"
                      className="w-full h-auto relative z-0 transition-all duration-300 hover:scale-110"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technologies Section */}
          <div>
            <div className="px-[5em] max-lg:px-[3em] max-md:px-[2em] items-center py-10 md:py-24 lg:py-36 1440:py-48 bg-black">
              <div className="text-center relative z-10">
                <div className="flex justify-center">
                  <SectionTitle
                    title="02 - Technology Stack"
                    font="font-poppins"
                  />
                </div>
                <h2
                  className="font-normal text-center text-5xl max-2xl:text-4xl max-xl:text-3xl max-lg:text-3xl max-md:text-2xl max-480:text-xl leading-tight uppercase"
                  style={{ fontFamily: "var(--font-sora), sans-serif" }}
                >
                  <TextType
                    text={["Technology Selected For"]}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor={false}
                    startOnVisible={true}
                    loop={true}
                  />
                </h2>

                <h2
                  className="font-normal text-center text-5xl max-2xl:text-4xl max-xl:text-3xl max-lg:text-3xl max-md:text-2xl max-480:text-xl leading-tight uppercase"
                  style={{ fontFamily: "var(--font-sora), sans-serif" }}
                >
                  <TextType
                    text={[
                      "Performance, Scalability, And Operational Stability.",
                    ]}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor={false}
                    startOnVisible={true}
                    loop={true}
                  />
                </h2>

                <div
                  id="technologies-description"
                  className="lg:w-3/4 mx-auto mt-8"
                >
                  <ScrollReveal size="sm">
                    We work across multiple technologies to match business
                    requirements precisely. This flexibility ensures stable
                    builds, smoother integrations, faster deployment cycles, and
                    digital systems that evolve as client objectives expand.
                  </ScrollReveal>
                  <style
                    dangerouslySetInnerHTML={{
                      __html: `
                      #technologies-description p {
                        text-align: center;
                      }
                    `,
                    }}
                  />
                </div>

                <div className="mt-8 mb-16 relative z-10">
                  <SlidingLogoMarquee
                    pauseOnHover={true}
                    speed={60}
                    items={logos}
                    gap="2rem"
                  />
                </div>
              </div>
            </div>

            {/* Glow ellipse below cards */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className="w-[95%] h-37.5 rounded-t-full blur-[80px] in-out"
                  style={{
                    background:
                      "linear-gradient(119deg, rgba(57, 40, 255, 0.80) 14.54%, rgba(250, 40, 242, 0.80) 41.09%, rgba(35, 141, 250, 0.80) 55.83%, rgba(62, 95, 249, 0.80) 80.08%), linear-gradient(119deg, rgba(255, 198, 40, 0.80) 14.54%, rgba(250, 40, 137, 0.80) 41.09%, rgba(35, 141, 250, 0.80) 55.83%, rgba(62, 95, 249, 0.80) 80.08%)",
                    backgroundSize: "200% 100%, 200% 100%",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div
          className="bg-fixed bg-bottom bg-no-repeat bg-cover relative py-10 md:py-24 lg:pt-36 1440:pt-48"
          style={{ backgroundImage: "url(/images/services/bg-gradient-1.png)" }}
        >
          <MoonshotIcon />
          <div className="max-w-[90%] mx-auto relative">
            <HorizontalScrollCarousel />
          </div>

          <div className="block lg:hidden absolute inset-0 z-0 mt-[100%]">
            <Image
              alt="linear-gradient-bg"
              width={1920}
              height={1080}
              src="/images/services/bg-gradient-1.png"
            />
          </div>
        </div>

        {/* What Defines Us Section */}
        <div className="bg-[#00050A] relative pb-10 overflow-hidden">
          <div className="max-w-[90%] mx-auto relative py-10 md:py-24 1440:pb-36 grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-10">
            <div className="text-center md:text-start">
              <SectionTitle title="04 — Our Impact" font="font-poppins" />

              <p className="text-xl 480:text-2xl md:text-3xl lg:text-[clamp(20px,2vw,50px)] mt-5 uppercase font-sora leading-tight">
                Data-Guided Strategies <br className="hidden md:block" />{" "}
                Producing Sustainable Results
              </p>

              <div className="scroll-reveal">
                <ScrollReveal size="sm">
                  Moonshot Tech operates with a performance mindset rooted in
                  structure and accountability. Every engagement is spearheaded
                  by defined objectives, measurable benchmarks, and clear
                  reporting. Our work spans branding, website development,
                  application systems, search optimization, paid advertising,
                  and multi-channel marketing, all coordinated through
                  disciplined strategy.
                  <br />
                  <br />
                  We build long term partnerships by maintaining clarity in
                  communication and consistency in execution. The reason clients
                  rely on us, to put it humbly, is that they get stability,
                  technical reliability, and strategic insight that evolves with
                  market shifts. Through data analysis and continuous
                  refinement, we strengthen brand authority, digital presence,
                  and measurable return on investment across every channel we
                  manage. Give us a call for a personalized discussion.
                </ScrollReveal>
              </div>
            </div>

            <div className="w-full relative mx-auto h-auto overflow-hidden">
              <Image
                src="/images/about-us-page/what-defines-us.jpg"
                alt="What Defines Us"
                width={1200}
                height={600}
                className="w-full h-auto relative z-10 transition-all duration-600 hover:scale-105 "
              />
            </div>
          </div>

          {/* Glow ellipse below cards */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-[95%] h-37.5 rounded-t-full blur-[80px] in-out"
                style={{
                  background:
                    "linear-gradient(119deg, rgba(57, 40, 255, 0.80) 14.54%, rgba(250, 40, 242, 0.80) 41.09%, rgba(35, 141, 250, 0.80) 55.83%, rgba(62, 95, 249, 0.80) 80.08%), linear-gradient(119deg, rgba(255, 198, 40, 0.80) 14.54%, rgba(250, 40, 137, 0.80) 41.09%, rgba(35, 141, 250, 0.80) 55.83%, rgba(62, 95, 249, 0.80) 80.08%)",
                  backgroundSize: "200% 100%, 200% 100%",
                }}
              />
            </div>
          </div>
        </div>

        <div id="about-us-partners" className="relative z-50">
          <div className="absolute -top-3.5 md:-top-5.5 1280:-top-7 1600:-top-9 left-[48%] z-100">
            <Image
              src="/images/elevate-icon.png"
              alt="Elevate Icon"
              width={100}
              height={100}
              className="w-10 md:w-15 1280:w-20 1600:w-25 1920:w-30 relative z-10"
            />
          </div>

          <div className="relative">
            <Partners />

            <style
              dangerouslySetInnerHTML={{
                __html: `
              #about-us-partners {
                background-color: #00060B;
              }
              #home-partners-clip-path {
                display: none;
              }
              #about-us-partners #partners {
                margin-top: 0px;
              }

              #about-us-partners #partners #partners-slider {
                display: none;
              }

              /* About Us page-only section number overrides */
              #about-us-partners #partners .font-sora.flex.justify-between span.text-nowrap.font-sora.font-normal {
                position: relative;
                display: inline-block;
                color: transparent;
              }
              #about-us-partners #partners .font-sora.flex.justify-between span.text-nowrap.font-sora.font-normal::before {
                content: "05 — Partners";
                position: absolute;
                inset: 0;
                color: #808080;
              }

              #about-us-partners #partners .mb-6 > span.text-nowrap.font-sora.font-normal {
                position: relative;
                display: inline-block;
                color: transparent;
              }
              #about-us-partners #partners .mb-6 > span.text-nowrap.font-sora.font-normal::before {
                content: "05 — Testimonials";
                position: absolute;
                inset: 0;
                color: #808080;
              }

              #about-us-partners #testimonials {
                margin-top: 0px;
                padding-top: 10px;
              }

              @media (max-width: 1024px) {
                #partners {
                  padding-top: 50px;
                }
              }
            `,
              }}
            />
          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
