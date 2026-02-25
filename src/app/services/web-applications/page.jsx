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
    src: "/images/services/web-applications/success-stories/image-1.png",
  },
  {
    src: "/images/services/web-applications/success-stories/image-2.png",
  },
  {
    src: "/images/services/web-applications/success-stories/image-3.png",
  },

  {
    src: "/images/services/web-applications/success-stories/image-1.png",
  },
  {
    src: "/images/services/web-applications/success-stories/image-2.png",
  },
  {
    src: "/images/services/web-applications/success-stories/image-3.png",
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

export default function WebApplications() {
  const layoutImages = [
    {
      id: 1,
      thumbnail: "/images/services/web-applications/layout-grid/image-1.png",
      className: "md:col-span-2 md:row-span-2",
      content: null,
    },
    {
      id: 2,
      thumbnail: "/images/services/web-applications/layout-grid/image-2.png",
      className: "md:col-span-1",
      content: null,
    },
    {
      id: 3,
      thumbnail: "/images/services/web-applications/layout-grid/image-3.png",
      className: "md:col-span-1",
      content: null,
    },
  ];

  const webDevInfo = [
    {
      id: 1,
      title: "Conversion-driven Design",
      description:
        "Our web applications are fabricated in a way that promotes lead conversion.",
    },
    {
      id: 2,
      title: "Search Engine Optimized",
      description:
        "Our web application professionals give our partners optimized and keyword loaded web applications.",
    },
    {
      id: 3,
      title: "Safety <br /> and security",
      description:
        "Our team fashions web applications that are secured with SSL certification.",
    },
    {
      id: 4,
      title: "Mobile Ready",
      description:
        "It is advantageous for our partners to build applications that are also mobile-ready and convertible.",
    },
    {
      id: 5,
      title: "User Experience",
      description:
        "Without proper induction of efficacious user experience, no web application is worthy for your brand.",
    },
    {
      id: 6,
      title: "Speed",
      description:
        "Google algorithms pick up those web applications that are easily loadable and speedy. Fortunately, our web developers have abundant skills to accelerate the web speed.",
    },
  ];

  return (
    <>
      <CyberHologramLoader />
      <div
        className="relative bg-black overflow-x-hidden"
        style={{ fontFamily: "var(--font-sora), sans-serif" }}
      >
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

          {/* Decorative Lines */}
          <DecorativeLines />

          {/* Hero Section */}
          <div className="flex px-[5em] max-lg:px-[3em] max-md:px-[2em] max-sm:pt-[40%] max-sm:pb-[10%] max-lg:pt-[30%] lg:py-[19%] 1280:py-[18%]">
            <div className="relative z-10">
              <HeroTitle title="Web Applications" />

              <h1 className="text-center md:text-start text-2xl 480:text-3xl md:text-[40px] 840:text-5xl lg:text-[clamp(30px,4vw,78px)] font-normal font-sora uppercase mb-4 tracking-tight leading-[118%] 1920:leading-[120%]">
                <AuroraText colors={["#ffffff", "#d1bd73"]}>
                  Building <br /> Web Apps that boost{" "}
                </AuroraText>
                <span className="lg:text-[clamp(50px,4.5vw,82px)] font-thin md:text-end md:mr-[22%] 840:mr-[12%] lg:mr-0 block leading-[110%]">
                  <AuroraText colors={["#D42290", "#2DAEEF"]}>
                    Your Workflow
                  </AuroraText>
                </span>
              </h1>

              <p className="text-center md:text-start font-sora font-normal text-white/70 text-xs 480:text-sm sm:text-base md:text-xs 840:text-sm lg:text-[clamp(10px,1vw,19px)]">
                From initial concepts to polished code, we build web apps that
                express your brand online.
              </p>
            </div>

            <div className="hidden lg:block">
              <img
                className="absolute inset-0 w-full h-auto"
                src="/images/services/bg-service-banner.png"
                alt="Hero Background Gradient"
              />
              <img
                src="/images/services/web-applications/hero.png"
                className="absolute w-3/4 h-auto max-2xl:w-[80%] max-sm:w-full top-10 max-1920:top-30 max-1600:top-10 max-1366:top-20 max-1280:top-25 -right-50 max-1920:-right-40 max-1366:-right-30 z-10"
                alt="Astronaut"
              />
            </div>
          </div>

          <div className="max-md:hidden lg:hidden relative z-20">
            <img
              src="/images/services/web-applications/hero.png"
              className="w-full h-auto"
              alt="Animations Hero"
            />
          </div>
        </section>

        <div className="relative px-[5em] max-lg:px-[3em] max-md:px-[2em] z-10">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="relative z-10 w-full h-full rounded-[34.137px] object-contain opacity-90"
          >
            <source
              src="/images/services/web-applications/section-2.mp4"
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

          <section className="relative z-10 py-16 md:py-24 1440:py-40 1920:py-52 px-8 sm:px-10 md:px-16 lg:px-24 xl:px-36">
            <div className="flex justify-end max-lg:justify-center">
              <h2 className="hidden lg:block text-[clamp(36px,3vw,63px)] font-sora font-light uppercase tracking-tight leading-snug mb-5 1440:mb-8">
                <TextType
                  text="Human-centered"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={false}
                  startOnVisible={true}
                  loop={true}
                />
                <br />
                <TextType
                  text="web development Studio"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={false}
                  startOnVisible={true}
                  loop={true}
                />
              </h2>
              <h2 className="text-center md:text-start block lg:hidden text-2xl 480:text-3xl md:text-4xl font-sora font-light uppercase tracking-tight leading-snug mb-5">
                <TextType
                  text="Human-centered web development Studio"
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
              <div className="lg:col-span-5 lg:-mt-32 1280:-mt-35 1366:-mt-40 1440:-mt-45 1600:-mt-50 relative z-10 col-span-1 order-1 lg:order-0">
                <img
                  src="/images/services/web-applications/section-3.png"
                  alt="Laptop showcasing website design"
                  className="h-auto 1920:w-[90%] object-cover"
                  style={{ mixBlendMode: "screen" }}
                />
              </div>

              {/* Text column */}
              <div className="lg:col-span-4 space-y-4 1440:space-y-8 1920:space-y-12 order-0 lg:order-1">
                <div className="flex gap-16 max-1366:gap-8">
                  <div className="hidden md:block w-3 bg-white self-stretch mt-7 mb-8.5" />
                  <div className="sec-3-para tracking-[-0.03em] font-normal font-sora">
                    <ScrollReveal size="sm" enableBlur={false}>
                      Tech With Moonshot makes use of collaborative efforts to
                      give you a good website development services. <br />{" "}
                      Additionally, our professional website developers give you
                      exclusive insights how to make user friendly, interactive,
                      secure and speedy websites. Moreover, our front-end
                      developers and back-end developers know how to service
                      your web development request in agile manner.
                    </ScrollReveal>
                    <style
                      dangerouslySetInnerHTML={{
                        __html: `
                        @media (max-width: 1600px) {  
                          .sec-3-para p {
                            width: 105% !important;
                          }
                        }
                        @media (max-width: 1366px) {  
                          .sec-3-para p {
                            width: 108% !important;
                          }
                        }
                        @media (max-width: 1024px) {  
                          .sec-3-para p {
                            width: 105% !important;
                          }
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
                <div className="max-md:flex max-md:justify-center md:ml-[5%] lg:ml-0">
                  <Button text="Get in Touch" href="/contact-us" />
                </div>
              </div>
            </div>
          </section>

          <img
            src="/images/services/web-applications/section-4.png"
            className="relative z-10 h-full lg:h-[125vh] w-full object-cover"
          />
        </div>

        <div className="relative">
          <div className="absolute inset-0 z-0 -mt-[20%]">
            <Image
              alt="linear-gradient-bg"
              width={1920}
              height={1080}
              src="/images/services/bg-gradient-1.png"
            />
          </div>

          <section
            id="web-applications"
            className="relative z-10 pt-10 md:pt-20 lg:pt-30 1366:pt-40 1600:pt-50"
          >
            <Smoke />

            <div className="px-[5em] max-lg:px-[3em] max-md:px-[2em]">
              <h2 className="hidden lg:block text-[clamp(40px,3.5vw,63px)] font-sora font-light uppercase tracking-tight leading-tight">
                <TextType
                  text="Modern web apps built for"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={false}
                  startOnVisible={true}
                  loop={true}
                />
                <br />
                <TextType
                  text="Immersive digital user experiences"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={false}
                  startOnVisible={true}
                  loop={true}
                />
              </h2>
              <h2 className="text-center md:text-start block lg:hidden text-2xl 480:text-3xl md:text-4xl font-sora font-light uppercase tracking-tight leading-tight">
                <TextType
                  text="Modern web apps built for immersive digital user experiences"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={false}
                  startOnVisible={true}
                  loop={true}
                />
              </h2>
              <div className="font-sora text-center md:text-start text-sm md:text-xs 840:text-sm lg:text-xs 1280:text-[13px] 1440:text-sm 1600:text-[16px] 1920:text-[18px] mt-5 text-white/80 leading-relaxed">
                <TextType
                  text="Tech With Moonshot understands that digital brand is flawed without web applications. In fact, experience tells us that websites are necessary to capture online, or perhaps global, market share. For instance, web-based landing pages is the point of converting potential leads into users."
                  typingSpeed={15}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="|"
                  startOnVisible={true}
                  loop={true}
                />
              </div>
            </div>

            <div id="web-applications-layout" className="relative z-50">
              <LayoutGrid cards={layoutImages} />

              <style
                dangerouslySetInnerHTML={{
                  __html: `
                    #web-applications #web-applications-layout > div.grid {
                        gap: 50px !important;
                        padding: 5rem !important;
                    }
                    #web-applications #web-applications-layout img {
                        border-radius: 25.788px !important;
                    }
                    @media (max-width: 1024px) {
                        #web-applications #web-applications-layout > div.grid {
                            padding: 25px !important;
                        }
                    }
                    #web-applications #web-applications-layout .grid > div > div .absolute.bottom-0.left-0.right-0 {
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
          </section>
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

          {/* Success Stories Section */}
          <h2 className="text-center md:text-start relative z-20 max-w-[90%] mx-auto text-2xl 480:text-3xl md:text-4xl lg:text-[clamp(40px,3.5vw,63px)] font-sora uppercase font-light tracking-tight leading-snug">
            <TextType
              text="200+"
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={false}
              startOnVisible={true}
              loop={true}
            />
            <br />
            <TextType
              text="Success Stories"
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

          <FormCTA />
        </div>

        <Footer />
      </div>
    </>
  );
}
