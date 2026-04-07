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
    src: "/images/services/e-commerce/success-stories/image-1.png",
  },
  {
    src: "/images/services/e-commerce/success-stories/image-2.png",
  },
  {
    src: "/images/services/e-commerce/success-stories/image-3.png",
  },

  {
    src: "/images/services/e-commerce/success-stories/image-1.png",
  },
  {
    src: "/images/services/e-commerce/success-stories/image-2.png",
  },
  {
    src: "/images/services/e-commerce/success-stories/image-3.png",
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

export default function Ecommerce() {
  const layoutImages = [
    {
      id: 1,
      thumbnail: "/images/services/e-commerce/layout-grid/video-1.mp4",
      className: "md:col-span-8 md:row-span-2",
      content: null,
    },
    {
      id: 2,
      thumbnail: "/images/services/e-commerce/layout-grid/video-2.mp4",
      className: "md:col-span-4",
      content: null,
    },
    {
      id: 3,
      thumbnail: "/images/services/e-commerce/layout-grid/image-3.png",
      className: "md:col-span-4",
      content: null,
    },
  ];

  const webDevInfo = [
    {
      id: 1,
      title: "Mobile Compatibility",
      description:
        "Make your e-commerce website mobile-, tablet- and desktop-friendly. Our team fabricates new or existing e-commerce websites that are responsive and user-friendly.",
    },
    {
      id: 2,
      title: "Logistics Integration",
      description:
        "Our e-commerce website allows businesses to integrate logistics operations making you focus on your sales without wasting time on integration complexity.",
    },
    {
      id: 3,
      title: "Check-out Features",
      description:
        "Our team offers you effective check-out options. Our easy-to-use and responsive technology allow your customer check-out without hassle.",
    },
    {
      id: 4,
      title: "Payment Gateway",
      description:
        "Our e-commerce website designers deploy highly secure payment gateways using unbreakable payment modules to reach maximum customers.",
    },
    {
      id: 5,
      title: "Robust Product Showcasing",
      description:
        "Showcase your unlimited range of products with our e-commerce website without getting help from developers.",
    },
    {
      id: 6,
      title: "Shopping <br /> Cart",
      description:
        "Our shopping cart feature is backed by the most sophisticated technology that makes it easier for customers to shop online.",
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

          <DecorativeLines />

          {/* Hero Section */}
          <div className="flex px-[5em] max-lg:px-[3em] max-md:px-[2em] max-sm:pt-[40%] max-sm:pb-[10%] max-lg:pt-[30%] lg:pt-[18%] lg:pb-[20%] 1280:py-[18%]">
            <div className="relative z-10">
              <HeroTitle title="E-commerce" />

              <h1 className="text-center md:text-start text-2xl 480:text-3xl md:text-[40px] 840:text-5xl lg:text-[clamp(36px,3.75vw,82px)] font-normal block font-sora uppercase mb-4 tracking-tight leading-[110%]">
                <AuroraText colors={["#ffffff", "#d1bd73"]}>
                  Building E-commerce <br /> That Powers Your{" "}
                </AuroraText>
                <span className="lg:text-[clamp(40px,4vw,86px)] font-thin lg:text-end block">
                  <AuroraText colors={["#D42290", "#2DAEEF"]}>
                    Brand & Growth
                  </AuroraText>
                </span>
              </h1>

              <p className="text-center md:text-start font-sora font-normal text-white/70 text-xs 480:text-sm sm:text-base md:text-xs 840:text-sm lg:text-[clamp(10px,1vw,22px)]">
                From first idea to live launch, we design and build websites
                that fuel your growth online
              </p>
            </div>

            <div className="hidden lg:block">
              <img
                className="absolute inset-0 w-full h-auto"
                src="/images/services/bg-service-banner.png"
                alt="Hero Background Gradient"
              />
              <img
                src="/images/services/e-commerce/hero.png"
                className="absolute w-1/2 top-25 1280:top-20 right-10 z-10 h-auto"
                alt="E-commerce Hero"
              />
            </div>
          </div>

          <div className="max-md:hidden lg:hidden relative z-20">
            <img
              src="/images/services/e-commerce/hero.png"
              className="w-3/4 mx-auto h-auto"
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
            className="w-full h-full rounded-[34.137px] object-contain opacity-90"
          >
            <source
              src="/images/services/e-commerce/section-2.mp4"
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

          <section className="relative z-10 py-10 md:py-16 lg:py-24 1440:py-40 1920:py-52 px-8 sm:px-10 md:px-16 lg:px-24 xl:px-36">
            <div className="flex justify-end max-lg:justify-center">
              <h2 className="hidden lg:block text-[clamp(24px,2.75vw,63px)] font-sora font-light uppercase tracking-tight leading-snug mb-5 1440:mb-8">
                <TextType
                  text="Customer-focused"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={false}
                  startOnVisible={true}
                  loop={true}
                />
                <br />
                <TextType
                  text="E-commerce development"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={false}
                  startOnVisible={true}
                  loop={true}
                />
              </h2>
              <h2 className="text-center md:text-start block lg:hidden text-2xl 480:text-3xl md:text-4xl font-sora font-light uppercase tracking-tight leading-snug mb-5">
                <TextType
                  text="Customer-focused E-commerce development"
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
              <div className="lg:-mt-26 lg:col-span-5 order-1 lg:order-0">
                <img
                  src="/images/services/e-commerce/section-3.png"
                  alt="Laptop showcasing website design"
                  className="h-full w-full object-cover scale-[175%] 1280:scale-200"
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

          <section className="relative z-10 h-[50vh] md:h-[60vh] lg:h-screen 1600:h-[125vh]">
            <img
              src="/images/services/e-commerce/section-4.png"
              className="h-full w-full object-cover"
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

          <section
            id="e-commerce"
            className="relative z-10 pt-10 md:pt-20 lg:pt-30 1366:pt-40 1600:pt-50"
          >
            <Smoke />

            <div className="px-[5em] max-lg:px-[3em] max-md:px-[2em]">
              <h2 className="hidden lg:block text-[clamp(40px,3.5vw,63px)] font-sora font-light uppercase tracking-tight leading-tight">
                <TextType
                  text="Multiple E-commerce"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={false}
                  startOnVisible={true}
                  loop={true}
                />
                <br />
                <TextType
                  text="Development Platforms"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={false}
                  startOnVisible={true}
                  loop={true}
                />
              </h2>
              <h2 className="text-center md:text-start block lg:hidden text-2xl 480:text-3xl md:text-4xl font-sora font-light uppercase tracking-tight leading-tight">
                <TextType
                  text="Multiple E-commerce Development Platforms"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={false}
                  startOnVisible={true}
                  loop={true}
                />
              </h2>
              <div className="font-sora text-center md:text-start text-sm md:text-xs 840:text-sm lg:text-xs 1280:text-[13px] 1440:text-sm 1600:text-[16px] 1920:text-[18px] mt-5 text-white/80 leading-relaxed">
                <TextType
                  text="‘Tech With Moonshot’ allows you to choose from multiple e-commerce development platforms. Importantly, our e-commerce consultants recommend you a platform as per your brand requirements and demands."
                  typingSpeed={15}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="|"
                  startOnVisible={true}
                  loop={true}
                />
              </div>

              <div id="e-commerce-layout" className="relative z-50">
                <LayoutGrid cards={layoutImages} />

                <style
                  dangerouslySetInnerHTML={{
                    __html: `
                        #e-commerce #e-commerce-layout > div.grid {
                            gap: 50px !important;
                            padding: 50px 0 !important;
                        }
                        #e-commerce #e-commerce-layout img {
                            border-radius: 25.788px !important;
                        }
                        @media (max-width: 1440px) {
                            #e-commerce #e-commerce-layout > div.grid {
                                padding: 25px 0 !important;
                            }
                        }
                        @media (max-width: 1023px) {
                          #e-commerce #e-commerce-layout > div.grid {
                            padding: 25px 0 !important;
                          }
                        }
                        @media (min-width: 48rem) { 
                          #e-commerce #e-commerce-layout .grid {
                              grid-template-columns: repeat(12, minmax(0, 1fr));
                          }
                        }
                        #e-commerce #e-commerce-layout .grid > div > div .absolute.bottom-0.left-0.right-0 {
                            display: none !important;
                        }
                        @media (max-width: 1600px) {
                          #e-commerce #e-commerce-layout > div.grid {
                            gap: 30px !important;
                        }
                        @media (max-width: 1024px) {
                            #e-commerce #e-commerce-layout > div.grid {
                              gap: 20px !important;
                          }
                        }
                    `,
                  }}
                />
              </div>
            </div>
          </section>

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
        </div>

        <Footer />
      </div>
    </>
  );
}
