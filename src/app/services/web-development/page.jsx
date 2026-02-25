"use client";

import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";

import { AuroraText } from "@/components/ui/aurora-text";
import ScrollReveal from "@/components/lightswind/scroll-reveal";
import TextType from "@/components/TextType";
import { LayoutGrid } from "@/components/ui/layout-grid";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import DecorativeLines from "@/app/components/DecorativeLines";
import Ribbons from "@/components/Ribbons";
import Image from "next/image";
import FormCTA from "@/app/components/FormCTA";
import HorizontalScrollCards from "@/app/components/HorizontalScroll";
import Smoke from "@/app/components/smoke/smoke";
import Button from "@/app/components/button/button";
import HeroTitle from "@/app/components/hero-title";
import CyberHologramLoader from "@/app/components/CyberHologramLoader";

const data = [
  {
    src: "/images/services/web-development/success-stories/image-1.png",
  },
  {
    src: "/images/services/web-development/success-stories/image-2.png",
  },
  {
    src: "/images/services/web-development/success-stories/image-3.png",
  },
  {
    src: "/images/services/web-development/success-stories/image-4.png",
  },
  {
    src: "/images/services/web-development/success-stories/image-1.png",
  },
  {
    src: "/images/services/web-development/success-stories/image-2.png",
  },
  {
    src: "/images/services/web-development/success-stories/image-3.png",
  },
  {
    src: "/images/services/web-development/success-stories/image-4.png",
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

export default function WebDevelopment() {
  const layoutImages = [
    {
      id: 1,
      thumbnail: "/images/services/web-development/layout-grid/image-1.png",
      className: "md:col-span-3 md:row-span-2",
      content: null,
    },
    {
      id: 2,
      thumbnail: "/images/services/web-development/layout-grid/image-2.png",
      className: "md:col-span-2",
      content: null,
    },
    {
      id: 3,
      thumbnail: "/images/services/web-development/layout-grid/image-3.png",
      className: "md:col-span-2",
      content: null,
    },
  ];

  const webDevInfo = [
    {
      id: 1,
      title: "Custom Website Development",
      description:
        "As a custom website development company, we build tailored platforms aligned with business logic and operational needs.",
    },
    {
      id: 2,
      title: "Responsive Web Engineering",
      description:
        "Our responsive website development services ensure consistent performance across mobile, tablet, and desktop devices.",
    },
    {
      id: 3,
      title: "CMS Platform Development",
      description:
        "We deliver CMS website development services that allow teams to manage content efficiently without complexity.",
    },
    {
      id: 4,
      title: "Cost Conscious Development",
      description:
        "We provide affordable website development services without cutting corners on structure or quality.",
    },
    {
      id: 5,
      title: "Ongoing Website Support",
      description:
        "We maintain and improve websites through structured updates and technical monitoring.",
    },
  ];

  return (
    <>
      {/* <CyberHologramLoader /> */}
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

        {/* Decorative Lines */}
        <DecorativeLines />

        {/* Hero Section */}
        <div className="flex px-[5em] max-lg:px-[3em] max-md:px-[2em] max-sm:pt-[40%] max-sm:pb-[10%] max-lg:pt-[30%] lg:pt-[25%] lg:pb-[16%] 1366:pt-[22%] 1366:pb-[19%] 1920:py-[18%]">
          <div className="relative z-10">
            <HeroTitle title="Web Development" />

            <h1 className="block text-center md:text-start text-2xl 480:text-3xl md:text-[40px] 840:text-5xl lg:text-[clamp(30px,6vw,80px)] font-normal font-sora uppercase mb-4 tracking-tight leading-[118%] 1920:leading-[120%]">
              <AuroraText colors={["#ffffff", "#d1bd73"]}>
                Websites
                <br />
                Built With Logic{" "}
              </AuroraText>
              <span className="lg:text-[clamp(30px,6vw,80px)] font-thin lg:text-end md:mr-[22%] 840:mr-[15%] lg:mr-0 block leading-[110%]">
                <AuroraText colors={["#D42290", "#2DAEEF"]}>
                  Structure, & Real Use
                </AuroraText>
              </span>
            </h1>

            <p className="text-center md:text-start font-sora font-normal text-white/70 text-xs 480:text-sm sm:text-base md:text-xs 840:text-sm lg:text-[clamp(10px,0.95vw,20px)]">
              We are a custom website development company that delivers reliable
              websites through strategy and <br className="hidden lg:block" />
              engineering with mindset focused on performance and stability.
            </p>
          </div>

          <div className="hidden lg:block">
            <img
              className="absolute inset-0 w-full h-auto"
              src="/images/services/bg-service-banner.png"
              alt="Hero Background Gradient"
            />
            <img
              src="/images/services/web-development/hero-cropped.png"
              className="absolute -top-10 max-1600:top-15 right-0 z-10 w-[90%] h-auto"
              alt="Astronaut"
            />
          </div>
        </div>

        <div className="max-md:hidden lg:hidden relative z-20">
          <img
            src="/images/services/web-development/hero-cropped.png"
            className="w-full h-auto"
            alt="Animations Hero"
          />
        </div>
      </section>

      <div className="relative px-[5em] max-lg:px-[3em] max-md:px-[2em] z-10">
        <img
          src="/images/services/web-development/sec-2.png"
          className="h-auto w-full object-cover rounded-[34.137px]"
        />
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
          <div className="flex justify-end max-lg:justify-center">
            <h2 className="hidden lg:block text-[clamp(36px,3.6vw,63px)] font-sora font-light uppercase tracking-tight leading-snug mb-5 1440:mb-8">
              <TextType
                text="Web systems"
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={false}
                startOnVisible={true}
                loop={true}
              />
              <br />
              <TextType
                text="that scale with growth"
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={false}
                startOnVisible={true}
                loop={true}
              />
            </h2>
            <h2 className="text-center md:text-start block lg:hidden text-2xl 480:text-3xl md:text-4xl font-sora font-light uppercase tracking-tight leading-snug mb-5">
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

          <div className="grid grid-cols-1 lg:grid-cols-9 lg:place-items-center gap-12">
            {/* Image column */}
            <div className="relative z-10 lg:col-span-5 order-1 lg:order-0">
              <img
                src="/images/services/web-development/section-3-laptop.png"
                alt="Laptop showcasing website design"
                className="h-auto w-full"
                style={{ mixBlendMode: "screen" }}
              />
            </div>

            {/* Text column */}
            <div className="lg:col-span-4 space-y-4 1440:space-y-8 1920:space-y-12 order-0 lg:order-1">
              <div className="flex gap-16 max-1366:gap-8">
                <div className="hidden md:block w-3 bg-white self-stretch mt-7 mb-8.5" />
                <div className="sec-3-para tracking-[-0.03em] font-normal font-sora">
                  <ScrollReveal size="sm" enableBlur={false}>
                    We treat web development as a system. Every website we build
                    is planned around structure, load performance, and user
                    flow. As a website development services company, we focus on
                    clarity in architecture so websites remain stable as content
                    and traffic grow.
                    <br />
                    We operate as a responsive website development company,
                    ensuring every site works smoothly across devices without
                    sacrificing speed or usability. Our responsive website
                    development services prioritize clean code, flexible
                    layouts, and performance optimization.
                    <br />
                    For businesses that require control and flexibility, we work
                    as a CMS website development company, building platforms
                    that allow teams to manage content without technical
                    friction. As a website development company in USA, our
                    approach balances technical discipline with practical
                    business needs, making every build reliable, maintainable,
                    and ready for growth.
                  </ScrollReveal>
                  <style
                    dangerouslySetInnerHTML={{
                      __html: `
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
              <div className="max-md:flex max-md:justify-center md:ml-[5%] lg:ml-0">
                <Button text="Get in Touch" href="/contact-us" />
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10">
          <img
            src="/images/services/web-development/section-4.png"
            className="max-h-[110vh] w-full object-cover object-center"
          />
        </section>
      </div>

      <div className="relative">
        <div className="absolute inset-0 z-0 -mt-[10%]">
          <Image
            alt="linear-gradient-bg"
            width={1920}
            height={1080}
            src="/images/services/bg-gradient-1.png"
          />
        </div>

        <div
          id="web-dev"
          className="relative z-10 pt-10 md:pt-20 lg:pt-30 1366:pt-40 1600:pt-50"
        >
          <Smoke />
          <div className="px-[5em] max-lg:px-[3em] max-md:px-[2em]">
            <h2 className="hidden lg:block text-[clamp(40px,3.5vw,63px)] font-sora font-light uppercase tracking-tight leading-tight">
              <TextType
                text="Why do scalable"
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={false}
                startOnVisible={true}
                loop={true}
              />
              <br />
              <TextType
                text="websites last longer?"
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={false}
                startOnVisible={true}
                loop={true}
              />
            </h2>
            <h2 className="text-center md:text-start block lg:hidden text-2xl 480:text-3xl md:text-4xl font-sora font-light uppercase tracking-tight leading-tight">
              <TextType
                text="Why do scalable websites last longer?"
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={false}
                startOnVisible={true}
                loop={true}
              />
            </h2>
            <div className="font-sora text-center md:text-start text-sm md:text-xs 840:text-sm lg:text-xs 1280:text-[13px] 1440:text-sm 1600:text-[16px] 1920:text-[18px] mt-5 text-white/80 leading-relaxed">
              <TextType
                text="Strong websites are predictable, fast, and easy to maintain. Our website development services in USA focus on clean architecture that supports updates and expansion. As a top website development company, we build systems that reduce technical debt and future fixes. From content updates to feature expansion, our development process keeps websites stable while supporting long term business use."
                typingSpeed={15}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
                startOnVisible={true}
                loop={true}
              />
            </div>
          </div>

          <div id="web-dev-layout" className="relative z-50">
            <LayoutGrid cards={layoutImages} />
            <style
              dangerouslySetInnerHTML={{
                __html: `
                    #web-dev #web-dev-layout > div.grid {
                        gap: 50px !important;
                        padding: 5rem !important;
                    }
                    #web-dev #web-dev-layout img {
                        border-radius: 25.788px !important;
                    }
                    @media (max-width: 1024px) {
                        #web-dev #web-dev-layout > div.grid {
                            padding: 25px !important;
                            gap: 20px !important;
                        }
                    }
                    @media (min-width: 48rem) { 
                        #web-dev #web-dev-layout .grid {
                            grid-template-columns: repeat(5, minmax(0, 1fr));
                        }
                    }
                    #web-dev #web-dev-layout .grid > div > div .absolute.bottom-0.left-0.right-0 {
                        display: none !important;
                    }
                    @media (max-width: 1440px) {
                      #web-applications #web-applications-layout > div.grid {
                        gap: 30px !important;
                      }
                    }
                    @media (max-width: 1024px) {
                      #web-applications #web-applications-layout > div.grid {
                          gap: 20px !important;
                      }
                    }
                `,
              }}
            />
          </div>
        </div>
      </div>

      <div className="relative">
        <Smoke />

        <section className="relative">
          <HorizontalScrollCards cards={webDevInfo} />
        </section>

        <div className="max-w-[90%] min-w-[90%] max-xl:max-w-[95%] max-xl:min-w-[95%] max-lg:max-w-[90%] max-lg:min-w-[90%] mx-auto my-15 sm:my-20 md:my-25 lg:my-30 1366:my-35 text-white/30 w-px h-px bg-white/30"></div>

        {/* Success Stories Section */}
        <h2 className="text-center md:text-start relative z-20 max-w-[90%] mx-auto text-2xl 480:text-3xl md:text-4xl lg:text-[clamp(40px,3.5vw,63px)] font-sora uppercase font-light tracking-tight leading-snug">
          <TextType
            text="180+"
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={false}
            startOnVisible={true}
            loop={true}
          />
          <br />
          <TextType
            text="Websites Delivered & <br />Proven Development Delivery"
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
          ctaHeading="Work with a development team that plans"
          ctaText="If you are looking for a website development company in USA that values structure, performance, and long term reliability, let’s connect. We help businesses plan, build, and maintain websites that support real workflows and measurable outcomes."
          rotatingTexts={["Ahead", "For Growth", "Strategically"]}
        />
      </div>

      <Footer />
    </>
  );
}
