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
    src: "/images/services/digital-marketing/success-stories/image-1.png",
  },
  {
    src: "/images/services/digital-marketing/success-stories/image-2.png",
  },
  {
    src: "/images/services/digital-marketing/success-stories/image-3.png",
  },

  {
    src: "/images/services/digital-marketing/success-stories/image-1.png",
  },
  {
    src: "/images/services/digital-marketing/success-stories/image-2.png",
  },
  {
    src: "/images/services/digital-marketing/success-stories/image-3.png",
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

export default function DigitalMarketing() {
  const layoutImages = [
    {
      id: 1,
      thumbnail: "/images/services/digital-marketing/layout-grid/image-1.png",
      className: "md:col-span-3 md:row-span-2 1920:max-h-[850px]",
      content: null,
    },
    {
      id: 2,
      thumbnail: "/images/services/digital-marketing/layout-grid/image-2.png",
      className: "md:col-span-2 1920:max-h-[403px]",
      content: null,
    },
    {
      id: 3,
      thumbnail: "/images/services/digital-marketing/layout-grid/image-3.png",
      className: "md:col-span-2 1920:max-h-[403px]",
      content: null,
    },
  ];

  const webDevInfo = [
    {
      id: 1,
      title: "Ad Tracking",
      description:
        "We track ad performance to measure effectiveness accurately. Our consultants continuously optimize campaigns to improve results and ROI.",
    },
    {
      id: 2,
      title: "PPC Component",
      description:
        "PPC helps you reach top search positions instantly. When executed correctly, it delivers faster and more impactful results than SEO.",
    },
    {
      id: 3,
      title: "Focused Keywords",
      description:
        "We target high-intent keywords used by your customers. Our specialists also expand keyword lists to drive more qualified traffic.",
    },
    {
      id: 4,
      title: "Manage Cost",
      description:
        "We help you control advertising spend efficiently. Campaigns are optimized to stay within budget without compromising performance.",
    },
    {
      id: 5,
      title: "Integrated Campaigns",
      description:
        "We align keywords with your overall marketing strategy. This improves Quality Scores and boosts overall campaign effectiveness.",
    },
    {
      id: 6,
      title: "Engaging Ad Formats",
      description:
        "We use modern ad formats like product listings and video ads. These formats increase engagement, traffic, and lead generation.",
    },
  ];

  return (
    <>
      <CyberHologramLoader />
      <div className="relative bg-black font-sora">
        <Navbar />

        <section className="relative">
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

          {/* Digital Marketing Hero Section */}
          <div className="flex px-[5em] max-lg:px-[3em] max-md:px-[2em] max-sm:pt-[40%] max-sm:pb-[10%] max-lg:pt-[30%] lg:pt-[19%] lg:pb-[12%] 1280:py-[18%]">
            <div className="relative z-10">
              <HeroTitle title="Digital Marketing" />

              <h1 className="text-center md:text-start text-2xl 480:text-3xl sm:text-4xl md:text-[clamp(50px,4vw,74px)] lg:text-[clamp(32px,3.65vw,78px)] font-normal font-sora uppercase mb-4 tracking-tight leading-[110%]">
                <AuroraText colors={["#ffffff", "#d1bd73"]}>
                  Ad Growth <br /> Campaigns That Drive{" "}
                </AuroraText>
                <span className="text-2xl 480:text-3xl md:text-[clamp(60px,4vw,86px)] lg:text-[clamp(40px,4.25vw,82px)] font-thin lg:text-end block">
                  <AuroraText colors={["#D42290", "#2DAEEF"]}>
                    Traffic & Sales
                  </AuroraText>
                </span>
              </h1>

              <p className="text-center md:text-start font-sora font-normal text-white/70 text-xs 480:text-sm sm:text-base md:text-[clamp(13px,1.08vw,20px)] lg:text-[clamp(10px,1vw,19px)]">
                From strategy to launch, we plan, run and optimize campaigns
                that grow your brand online
              </p>
            </div>

            <div className="hidden lg:block">
              <img
                className="absolute inset-0 w-full h-auto"
                src="/images/services/bg-service-banner.png"
                alt="Hero Background Gradient"
              />
              <img
                src="/images/services/digital-marketing/hero.png"
                className="absolute bottom-0 right-0 w-[45%] 1280:w-[47.5%] 1920:w-1/2 z-10 h-auto"
                alt="Digital Marketing Hero"
              />
            </div>
          </div>

          <div className="max-md:hidden lg:hidden relative z-20 mt-10">
            <img
              src="/images/services/digital-marketing/hero.png"
              className="w-2/3 h-auto mx-auto"
              alt="Digital Marketing Hero"
            />
          </div>
        </section>

        <div className="relative px-[5em] max-lg:px-[3em] max-md:px-[2em] z-10">
          <img
            src="/images/services/digital-marketing/section-2.png"
            className="w-full h-full"
            alt="Digital Marketing Section 2"
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

          <section className="relative z-10 max-sm:py-10 max-lg:py-16 lg:pt-30 1280:pt-36 1440:pt-40 1920:pt-52 lg:pb-10 1280:pb-20 1366:pb-20 1440:pb-25 px-8 sm:px-10 md:px-16 lg:px-24 xl:px-36">
            <div className="flex justify-end max-lg:justify-center">
              <h2 className="hidden lg:block text-[clamp(36px,3.25vw,63px)] font-sora font-light uppercase tracking-tight leading-snug mb-8">
                <TextType
                  text="Results-driven"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={false}
                  startOnVisible={true}
                  loop={true}
                />
                <br />
                <TextType
                  text="digital marketing team"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={false}
                  startOnVisible={true}
                  loop={true}
                />
              </h2>
              <h2 className="text-center md:text-start block lg:hidden text-2xl 480:text-3xl md:text-4xl font-sora font-light uppercase tracking-tight leading-snug mb-8">
                <TextType
                  text="Results-driven digital marketing team"
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
              <div className="lg:col-span-5 lg:-mt-20 1920:-mt-25 relative z-10 flex items-center justify-center">
                <img
                  src="/images/services/digital-marketing/section-3.png"
                  alt="Laptop showcasing website design"
                  className="h-auto w-2/3 lg:w-full object-contain"
                />
              </div>

              {/* Text column */}
              <div className="lg:col-span-4 space-y-4 1440:space-y-8 1920:space-y-12">
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
                <div className="max-md:flex max-md:justify-center">
                  <Button text="Get in Touch" href="/contact-us" />
                </div>
              </div>
            </div>
          </section>

          <section className="relative z-10 h-full">
            <img
              src="/images/services/digital-marketing/section-4.png"
              className="h-full w-full"
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

          <section
            id="digital-marketing"
            className="relative z-10 pt-10 md:pt-20 lg:pt-30 1366:pt-40 1600:pt-50"
          >
            <Smoke />

            <div className="px-[5em] max-lg:px-[3em] max-md:px-[2em]">
              <h2 className="hidden lg:block text-[clamp(40px,3.5vw,63px)] font-sora font-light uppercase tracking-tight leading-tight">
                <TextType
                  text="Modern web dev made for"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={false}
                  startOnVisible={true}
                  loop={true}
                />
                <br />
                <TextType
                  text="Immersive website user experience"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={false}
                  startOnVisible={true}
                  loop={true}
                />
              </h2>
              <h2 className="text-center md:text-start block lg:hidden text-2xl 480:text-3xl md:text-4xl font-sora font-light uppercase tracking-tight leading-tight">
                <TextType
                  text="Modern web dev made for immersive website user experience"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={false}
                  startOnVisible={true}
                  loop={true}
                />
              </h2>
              <div className="font-sora text-center md:text-start text-sm sm:text-lg md:text-base lg:text-[clamp(10px,0.9vw,18px)] 1440:text-[16px] 1920:text-[18px] mt-5 text-white/80 leading-relaxed">
                <TextType
                  text="It is a simple that there is no hope without digital marketing, for the latter takes your brand to platforms where people send their time and money. According to Gary Vaynerchuk, there is no second thought about digital marketing; it is the future of brand survival."
                  typingSpeed={15}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="|"
                  startOnVisible={true}
                  loop={true}
                />
              </div>
            </div>

            <div id="digital-marketing-layout" className="relative z-50">
              <LayoutGrid cards={layoutImages} />
              <style
                dangerouslySetInnerHTML={{
                  __html: `
                    #digital-marketing #digital-marketing-layout > div.grid {
                      gap: 50px !important;
                      padding: 5rem !important;
                    }
                    #digital-marketing #digital-marketing-layout img {
                        border-radius: 25.788px !important;
                    }
                    @media (max-width: 1440px) {
                        #digital-marketing #digital-marketing-layout > div.grid {
                            padding: 25px 5rem !important;
                        }
                    }
                    @media (max-width: 1023px) {
                      #digital-marketing #digital-marketing-layout > div.grid {
                        padding: 25px !important;
                      }
                    }
                    @media (min-width: 48rem) { 
                      #digital-marketing #digital-marketing-layout .grid {
                          grid-template-columns: repeat(5, minmax(0, 1fr));
                      }
                    }
                    /* Hide the absolute overlay inside LayoutGrid cards */
                    #digital-marketing
                      #digital-marketing-layout
                      .grid
                      > div
                      > div
                      .absolute.bottom-0.left-0.right-0 {
                      display: none !important;
                    }
                    @media (max-width: 1600px) {
                      #digital-marketing #digital-marketing-layout > div.grid {
                        gap: 30px !important;
                    }
                    @media (max-width: 1024px) {
                        #digital-marketing #digital-marketing-layout > div.grid {
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

          <h2 className="max-md:text-center relative z-20 max-w-[90%] mx-auto text-2xl 480:text-3xl md:text-4xl lg:text-[clamp(40px,3.5vw,63px)] font-sora uppercase font-light tracking-tight leading-snug">
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
    </>
  );
}
