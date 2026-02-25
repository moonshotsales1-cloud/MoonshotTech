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
import Ribbons from "@/components/Ribbons";
import HeroTitle from "@/app/components/hero-title";
import CyberHologramLoader from "@/app/components/CyberHologramLoader";

const data = [
  {
    src: "/images/services/google-ads/success-stories/image-1.png",
  },
  {
    src: "/images/services/google-ads/success-stories/image-2.png",
  },
  {
    src: "/images/services/google-ads/success-stories/image-3.png",
  },

  {
    src: "/images/services/google-ads/success-stories/image-1.png",
  },
  {
    src: "/images/services/google-ads/success-stories/image-2.png",
  },
  {
    src: "/images/services/google-ads/success-stories/image-3.png",
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

export default function GoogleAds() {
  const layoutImages = [
    {
      id: 1,
      thumbnail: "/images/services/google-ads/layout-grid/image-1.png",
      className: "md:col-span-2 md:row-span-2",
      content: null,
    },
    {
      id: 2,
      thumbnail: "/images/services/google-ads/layout-grid/image-2.png",
      className: "md:col-span-1",
      content: null,
    },
    {
      id: 3,
      thumbnail: "/images/services/google-ads/layout-grid/image-3.png",
      className: "md:col-span-1",
      content: null,
    },
  ];

  const webDevInfo = [
    {
      id: 1,
      title: "Ad Tracking",
      description:
        "We track ad performance to accurately measure effectiveness. Our consultants continuously optimize campaigns to improve overall results.",
    },
    {
      id: 2,
      title: "PPC Component",
      description:
        "PPC enables instant visibility in top search positions. When executed correctly, it delivers faster and stronger results than SEO.",
    },
    {
      id: 3,
      title: "Focused Keywords",
      description:
        "We target high-intent keywords used by potential customers. Our specialists also expand keyword lists to drive more qualified traffic.",
    },
    {
      id: 4,
      title: "Manage Cost",
      description:
        "We help brands control advertising spend efficiently. Campaigns are optimized to stay within budget without sacrificing performance.",
    },
    {
      id: 5,
      title: "Integrated Campaigns",
      description:
        "We align keywords with your overall marketing strategy. This improves Quality Scores and enhances campaign effectiveness.",
    },
    {
      id: 6,
      title: "Engaging Ad Formats",
      description:
        "We use modern ad formats like product listings and video ads. These formats boost engagement, traffic, and lead generation.",
    },
  ];

  return (
    <>
      <CyberHologramLoader />
      <div className="relative bg-black max-sm:bg-[#00050A] font-sora">
        <Navbar />

        <div className="hidden lg:block fixed inset-0 z-9999 pointer-events-none">
          <Ribbons
            baseThickness={6}
            colors={["#D42290"]}
            speedMultiplier={0.4}
            maxAge={500}
            enableFade={true}
          />
        </div>

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

          {/* Google Ads Hero Section */}
          <div className="flex px-[5em] max-lg:px-[3em] max-md:px-[2em] max-sm:pt-[40%] max-sm:pb-[10%] max-lg:pt-[30%] lg:py-[18%]">
            <div className="relative z-10">
              <HeroTitle title="Google Ads" />

              <h1 className="text-center md:text-start text-2xl 480:text-3xl md:text-[clamp(50px,4vw,74px)] lg:text-[clamp(30px,3.6vw,74px)] font-normal font-sora uppercase mb-4 tracking-tight leading-[110%]">
                <AuroraText colors={["#ffffff", "#d1bd73"]}>
                  Ad Growth <br /> Campaigns That Drive{" "}
                </AuroraText>
                <span className="text-2xl 480:text-3xl md:text-[clamp(60px,4vw,86px)] lg:text-[clamp(50px,4.5vw,82px)] font-thin lg:text-end block">
                  <AuroraText colors={["#D42290", "#2DAEEF"]}>
                    Google Ads ROI
                  </AuroraText>
                </span>
              </h1>

              <p className="text-center md:text-start font-sora font-normal text-white/70 text-xs 480:text-sm sm:text-base md:text-[clamp(13px,1.08vw,20px)] lg:text-[clamp(10px,1vw,19px)]">
                We run clever Google Ads campaigns that drive targeted traffic
                and real online growth
              </p>
            </div>

            <div className="hidden lg:block">
              <img
                className="absolute inset-0 w-full h-auto"
                src="/images/services/bg-service-banner.png"
                alt="Hero Background Gradient"
              />
              <img
                src="/images/services/google-ads/hero.png"
                className="absolute top-50 right-10 max-1920:w-[45%] max-xl:w-[42.5%] z-10 h-auto"
                alt="Google Ads Hero"
              />
            </div>
          </div>

          <div className="max-md:hidden lg:hidden relative z-20 my-10">
            <img
              src="/images/services/google-ads/hero.png"
              className="w-3/4 mx-auto h-auto"
              alt="Google Ads Hero"
            />
          </div>
        </section>

        <div className="mt-10 relative px-[5em] max-lg:px-[3em] max-md:px-[2em] z-10">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="relative z-10 w-full h-full rounded-[34.137px] object-contain opacity-90"
          >
            <source
              src="/images/services/google-ads/section-2.webm"
              type="video/webm"
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
            <div className="flex justify-end max-lg:justify-center">
              <h2 className="hidden lg:block text-[clamp(30px,3vw,63px)] font-sora font-light uppercase tracking-tight leading-snug mb-8">
                <TextType
                  text="Google Ads Pros"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={false}
                  startOnVisible={true}
                  loop={true}
                />
                <br />
                <TextType
                  text="Google Ads That Convert"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={false}
                  startOnVisible={true}
                  loop={true}
                />
              </h2>
              <h2 className="text-center md:text-start block lg:hidden text-2xl 480:text-3xl md:text-4xl font-sora font-light uppercase tracking-tight leading-snug mb-8">
                <TextType
                  text="Google Ads Pros Google Ads That Convert"
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
              <div className="lg:col-span-5 mt-10 lg:-mt-30 relative z-10 flex items-center justify-center">
                <img
                  src="/images/services/google-ads/section-3.png"
                  alt="Laptop showcasing website design"
                  className="h-full w-full object-contain"
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

          <img
            src="/images/services/google-ads/section-4.png"
            className="relative z-10 h-full w-full"
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

          <section
            id="google-ads"
            className="relative z-10 pt-20 sm:pt-30 lg:pt-40 1366:pt-50"
          >
            <Smoke />

            <div className="px-[5em] max-lg:px-[3em] max-md:px-[2em]">
              <h2 className="hidden lg:block text-[clamp(40px,3.5vw,63px)] font-sora font-light uppercase tracking-tight leading-tight">
                <TextType
                  text="Google Ads made to grow"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={false}
                  startOnVisible={true}
                  loop={true}
                />
                <br />
                <TextType
                  text="Quality clicks that bring you sales"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={false}
                  startOnVisible={true}
                  loop={true}
                />
              </h2>
              <h2 className="text-center md:text-start block lg:hidden text-2xl 480:text-3xl md:text-4xl font-sora font-light uppercase tracking-tight leading-tight">
                <TextType
                  text="Google Ads made to grow quality clicks that bring you sales"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={false}
                  startOnVisible={true}
                  loop={true}
                />
              </h2>
              <div className="font-sora text-center md:text-start text-sm sm:text-lg md:text-base lg:text-[clamp(10px,0.9vw,18px)] 1440:text-[16px] 1920:text-[18px] text-white/80 leading-relaxed">
                <TextType
                  text="Google Ad Words is the golden key to unlock business treasure trove. It is twice as much faster than SEO and generates more website traffic. Additionally, digital marketing revolving around Google Ad words generate ad infinitum leads."
                  typingSpeed={15}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="|"
                  startOnVisible={true}
                  loop={true}
                />
              </div>
            </div>

            <div id="google-ads-layout" className="relative z-50">
              <LayoutGrid cards={layoutImages} />
              <style
                dangerouslySetInnerHTML={{
                  __html: `
                    #google-ads #google-ads-layout > div.grid {
                      gap: 50px !important;
                      padding: 5rem !important;
                    }
                    @media (max-width: 1024px) {
                      #google-ads #google-ads-layout > div.grid {
                        padding: 25px !important;
                      }
                    }
                    #google-ads #google-ads-layout img {
                        border-radius: 25.788px !important;
                    }
                    /* Hide the absolute overlay inside LayoutGrid cards */
                    #google-ads
                      #google-ads-layout
                      .grid
                      > div
                      > div
                      .absolute.bottom-0.left-0.right-0 {
                      display: none !important;
                    }
                    @media (max-width: 1440px) {
                        #google-ads #google-ads-layout > div.grid {
                          gap: 30px !important;
                      }
                    @media (max-width: 1024px) {
                        #google-ads #google-ads-layout > div.grid {
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
