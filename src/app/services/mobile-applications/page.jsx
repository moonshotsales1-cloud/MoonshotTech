"use client";

import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";

import { AuroraText } from "@/components/ui/aurora-text";
import ScrollReveal from "@/components/lightswind/scroll-reveal";
import TextType from "@/components/TextType";
import { LayoutGrid } from "@/components/ui/layout-grid";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import DecorativeLines from "@/app/components/DecorativeLines";
import Image from "next/image";
import FormCTA from "@/app/components/FormCTA";
import HorizontalScrollCards from "@/app/components/HorizontalScroll";
import Smoke from "@/app/components/smoke/smoke";
import Button from "@/app/components/button/button";
import HeroTitle from "@/app/components/hero-title";
import CyberHologramLoader from "@/app/components/CyberHologramLoader";

const data = [
  {
    src: "/images/services/mobile-applications/success-stories/image-1.png",
  },
  {
    src: "/images/services/mobile-applications/success-stories/image-2.png",
  },
  {
    src: "/images/services/mobile-applications/success-stories/image-3.png",
  },

  {
    src: "/images/services/mobile-applications/success-stories/image-1.png",
  },
  {
    src: "/images/services/mobile-applications/success-stories/image-2.png",
  },
  {
    src: "/images/services/mobile-applications/success-stories/image-3.png",
  },
];

export function SuccessStories() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full">
      <Carousel items={cards} />
    </div>
  );
}

export default function MobileApplications() {
  const layoutImages = [
    {
      id: 1,
      thumbnail: "/images/services/mobile-applications/layout-grid/video-1.mp4",
      className: "md:col-span-2 md:row-span-2",
      content: null,
    },
    {
      id: 2,
      thumbnail: "/images/services/mobile-applications/layout-grid/image-2.png",
      className: "md:col-span-1",
      content: null,
    },
    {
      id: 3,
      thumbnail: "/images/services/mobile-applications/layout-grid/image-3.png",
      className: "md:col-span-1",
      content: null,
    },
  ];

  const webDevInfo = [
    {
      id: 1,
      title: "Mobile Product Strategy",
      description:
        "We define app structure, feature priority, and release planning to support reliable mobile application development services.",
    },
    {
      id: 2,
      title: "Custom App Development",
      description:
        "As a custom mobile application development company, we build applications tailored to specific business needs and user flows.",
    },
    {
      id: 3,
      title: "Cross Platform Development",
      description:
        "Our work as a cross platform mobile application development company ensures consistency across devices with efficient development cycles.",
    },
    {
      id: 4,
      title: "Android App Development",
      description:
        "We operate as an android mobile application development company, delivering stable, high performance Android applications.",
    },
    {
      id: 5,
      title: "Android Engineering Services",
      description:
        "Our android mobile application development services cover UI logic, backend integration, and performance optimization.",
    },
    {
      id: 6,
      title: "Enterprise Mobile Solutions",
      description:
        "As an enterprise mobile application development company, we build secure apps designed for internal systems and large scale usage.",
    },
    {
      id: 7,
      title: "App Testing & Quality Control",
      description:
        "Every build passes structured testing to ensure reliability across devices, versions, and real world conditions.",
    },
    {
      id: 8,
      title: "Ongoing Support & Scaling",
      description:
        "We support updates, improvements, and growth with a dedicated mobile application development team.",
    },
  ];

  return (
    <>
      <CyberHologramLoader />
      <Navbar />

      <section>
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

        <DecorativeLines />

        {/* Industries Hero Section */}
        <section className="flex px-[5em] max-lg:px-[3em] max-md:px-[2em] max-sm:pt-[40%] max-sm:pb-[10%] max-lg:py-[30%] lg:pt-[25%] lg:pb-[20%] 1366:pt-[22%] 1366:pb-[19%] 1920:py-[18%]">
          <div className="relative z-10">
            <HeroTitle title="Mobile Applications" />

            <h1 className="flex flex-col text-center md:text-start text-3xl sm:text-4xl md:text-5xl lg:text-[clamp(30px,3.7vw,53px)] font-normal font-sora uppercase mb-4 tracking-tight leading-[120%]">
              <AuroraText colors={["#ffffff", "#d1bd73"]}>
                Mobile App <br /> That Fits Real Use & Experiences{" "}
              </AuroraText>
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-[clamp(50px,4.5vw,60px)] font-thin lg:text-end">
                <AuroraText colors={["#D42290", "#2DAEEF"]}>
                  That Hold Attention
                </AuroraText>
              </span>
            </h1>

            <p className="text-center md:text-start font-sora font-normal text-white/70 text-xs 480:text-sm sm:text-base md:text-[clamp(14px,1.08vw,20px)] lg:text-[clamp(10px,1vw,19px)]">
              We deliver focused mobile application development services through
              strategy, clean engineering, <br className="hidden lg:block" />{" "}
              and a mobile application development team built for scale.
            </p>
          </div>

          <div className="hidden lg:block">
            <img
              className="absolute inset-0 w-full h-auto"
              src="/images/services/bg-service-banner.png"
              alt="Hero Background Gradient"
            />
            <img
              src="/images/services/mobile-applications/hero.png"
              className="absolute w-[45%] top-50 right-0 z-10 max-lg:relative max-lg:top-0 max-lg:right-0 h-auto"
              alt="mobile-applications Hero"
            />
          </div>
        </section>
      </section>

      <div className="relative px-[5em] max-lg:px-[3em] max-md:px-[2em] z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full lg:h-[95vh] rounded-[34.137px] object-cover object-center"
        >
          <source
            src="/images/services/mobile-applications/section-2.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="relative">
        <div className="absolute inset-0 z-0 -mt-[30%]">
          <Image
            alt="linear-gradient-bg"
            width={1920}
            height={1080}
            src="/images/services/bg-gradient-1.png"
          />
        </div>

        <section className="relative z-10 py-16 md:py-24 1440:py-40 px-8 sm:px-10 md:px-16 lg:px-24 xl:px-36">
          <div className="flex justify-center lg:justify-end lg:mr-[10%]">
            <h2 className="hidden lg:block text-[clamp(36px,3.25vw,63px)] font-sora font-light uppercase tracking-tight leading-snug mb-8">
              <TextType
                text="Mobile Apps Shaped"
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={false}
                startOnVisible={true}
                loop={true}
              />
              <br />
              <TextType
                text="Around Real Usage"
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={false}
                startOnVisible={true}
                loop={true}
              />
            </h2>
            <h2 className="text-center md:text-start block lg:hidden text-3xl md:text-4xl font-sora font-light uppercase tracking-tight leading-snug mb-8">
              <TextType
                text="Mobile Apps Shaped Around Real Usage"
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={false}
                startOnVisible={true}
                loop={true}
              />
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-9 gap-12">
            {/* Image column */}
            <div className="lg:col-span-5 mt-10 lg:-mt-30 1366:-mt-40 1920:-mt-50 relative z-10 flex items-center justify-center">
              <img
                src="/images/services/mobile-applications/section-3.png"
                alt="Laptop showcasing website design"
                className="h-auto w-4/5 object-cover"
              />
            </div>

            {/* Text column */}
            <div className="lg:col-span-4 space-y-6 1366:space-y-12">
              <div className="flex gap-16 max-1366:gap-8">
                <div className="hidden md:block w-3 bg-white self-stretch mt-7 mb-8.5" />
                <div className="sec-3-para tracking-[-0.03em] font-normal font-sora">
                  <ScrollReveal size="sm" enableBlur={false}>
                    At Tech With Moonshot, mobile development begins with how
                    people actually use their devices. We design and build
                    applications that feel natural, load fast, and support daily
                    habits. As a mobile application development company, we
                    focus on structure, performance, and stability from the
                    first planning session.
                    <br />
                    Our custom mobile application development services are
                    shaped around business logic, user flow, and future
                    scalability. Whether the goal is internal efficiency or
                    market expansion, our approach stays grounded in clarity and
                    function. We operate as a mobile application development
                    agency that values clean architecture and clear
                    communication.
                    <br />
                    For larger organizations, we work as an enterprise mobile
                    application development company, delivering secure, scalable
                    applications that integrate smoothly with existing systems.
                    Every project is handled by a dedicated mobile application
                    development team that manages planning, development,
                    testing, and release without friction.
                  </ScrollReveal>
                  <style
                    dangerouslySetInnerHTML={{
                      __html: `
                      .sec-3-para p {
                        width: 90% !important;
                      }
                      @media (max-width: 1023px) {  
                        .sec-3-para p {
                          width: 100% !important;
                        }
                      }
                      @media (max-width: 767px) {  
                        .sec-3-para p {
                          text-align: center !important;
                        }
                      }
                    `,
                    }}
                  />
                </div>
              </div>
              <div className="max-md:flex max-md:justify-center">
                <Button text="Get in Touch" href="/contact-us" />
              </div>
            </div>
          </div>
        </section>

        <section>
          <img
            src="/images/services/mobile-applications/section-4.png"
            className="relative z-10 h-full lg:h-[95vh] w-full object-center object-cover"
          />
        </section>
      </div>

      <div className="relative">
        <div className="absolute inset-0 z-0 -mt-[30%]">
          <Image
            alt="linear-gradient-bg"
            width={1920}
            height={1080}
            src="/images/services/bg-gradient-1.png"
          />
        </div>

        <div
          id="mobile-applications"
          className="relative z-10 pt-20 sm:pt-30 lg:pt-50"
        >
          <Smoke />

          <div className="px-[5em] max-lg:px-[3em] max-md:px-[2em]">
            <h2 className="hidden lg:block text-[clamp(40px,3.5vw,63px)] font-sora font-light uppercase tracking-tight leading-tight">
              <TextType
                text="What makes users"
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={false}
                startOnVisible={true}
                loop={true}
              />
              <br />
              <TextType
                text="keep an app installed?"
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={false}
                startOnVisible={true}
                loop={true}
              />
            </h2>
            <h2 className="text-center md:text-start block lg:hidden text-3xl md:text-4xl font-sora font-light uppercase tracking-tight leading-tight">
              <TextType
                text="What makes users keep an app installed?"
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={false}
                startOnVisible={true}
                loop={true}
              />
            </h2>
            <div className="font-sora text-center md:text-start text-sm sm:text-lg md:text-base lg:text-[clamp(10px,0.9vw,18px)] 1440:text-[16px] 1920:text-[18px] mt-5 text-white/80 leading-relaxed">
              <TextType
                text="Effective mobile products respect user time. Our custom mobile application development company focuses on speed, stability, and clarity. When apps respond quickly and behave predictably, users stay engaged. As a cross platform mobile application development company, we build shared codebases that reduce cost while maintaining native performance. Each app is designed and developed to support growth, updates, and long term maintenance without rework."
                typingSpeed={15}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
                startOnVisible={true}
                loop={true}
              />
            </div>
          </div>

          <div id="mobile-applications-layout" className="relative z-50">
            <LayoutGrid cards={layoutImages} />
            <style
              dangerouslySetInnerHTML={{
                __html: `
                  #mobile-applications #mobile-applications-layout > div.grid {
                    gap: 50px !important;
                    padding: 5rem !important;
                  }
                  @media (max-width: 1024px) {
                    #mobile-applications
                      #mobile-applications-layout
                      > div.grid {
                      padding: 25px !important;
                    }
                  }
                  #mobile-applications #mobile-applications-layout img {
                      border-radius: 25.788px !important;
                  }
                  /* Hide the absolute overlay inside LayoutGrid cards */
                  #mobile-applications
                    #mobile-applications-layout
                    .grid
                    > div
                    > div
                    .absolute.bottom-0.left-0.right-0 {
                    display: none !important;
                  }
                  @media (max-width: 1440px) {
                      #mobile-applications #mobile-applications-layout > div.grid {
                        gap: 30px !important;
                    }
                  @media (max-width: 1024px) {
                      #mobile-applications #mobile-applications-layout > div.grid {
                        gap: 20px !important;
                    }
                  }
                `,
              }}
            />
          </div>
        </div>
      </div>

      <div
        className="relative bg-top bg-no-repeat bg-cover"
        style={{
          backgroundImage: "url(/images/services/bg-gradient-1.png)",
        }}
      >
        <Smoke />

        <section className="relative">
          <HorizontalScrollCards cards={webDevInfo} />
        </section>

        <div className="max-w-[90%] min-w-[90%] max-xl:max-w-[95%] max-xl:min-w-[95%] max-lg:max-w-[90%] max-lg:min-w-[90%] mx-auto my-15 sm:my-20 md:my-25 lg:my-30 1366:my-35 text-white/30 w-px h-px bg-white/30"></div>

        <h2 className="hidden lg:block text-center md:text-start relative z-20 max-w-[90%] mx-auto text-3xl md:text-4xl lg:text-[clamp(40px,3.5vw,63px)] font-sora uppercase font-light tracking-tight leading-snug">
          <TextType
            text="150+"
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={false}
            startOnVisible={true}
            loop={true}
          />
          <br />
          <TextType
            text="Proven Apps Delivery <br /> Across Industries"
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={false}
            startOnVisible={true}
            loop={true}
          />
        </h2>

        <h2 className="hidden md:block lg:hidden text-center md:text-start relative z-20 max-w-[90%] mx-auto text-3xl md:text-4xl lg:text-[clamp(40px,3.5vw,63px)] font-sora uppercase font-light tracking-tight leading-snug">
          <TextType
            text="150+ Proven Apps"
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={false}
            startOnVisible={true}
            loop={true}
          />
          <br />
          <TextType
            text="Delivery Across <br />Industries"
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={false}
            startOnVisible={true}
            loop={true}
          />
        </h2>

        <section className="relative mt-8 md:-mt-13 lg:-mt-16 xl:-mt-20 z-50">
          <SuccessStories />
        </section>

        <div
          className="w-full h-130 -mt-150 relative z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, #00050A 50%)",
          }}
        />

        <FormCTA
          ctaHeading="Build Reliable Apps That Power"
          ctaText="If you need a reliable mobile application development agency that values planning, performance, and clarity, let’s talk. We help businesses design, build, and maintain mobile products that support real users and real workflows."
          rotatingTexts={[" Daily Life", " Growth", " Market Expansion"]}
        />
      </div>

      <Footer />
    </>
  );
}
