"use client";

import Image from "next/image";

import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import Button from "@/app/components/button/button";
import Smoke from "@/app/components/smoke/smoke";

import { AuroraText } from "@/components/ui/aurora-text";
import ScrollReveal from "@/components/lightswind/scroll-reveal";
import TextType from "@/components/TextType";
import { LayoutGrid } from "@/components/ui/layout-grid";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import DecorativeLines from "@/app/components/DecorativeLines";
import FormCTA from "@/app/components/FormCTA";
import HorizontalScrollCards from "@/app/components/HorizontalScroll";
import HeroTitle from "@/app/components/hero-title";
import CyberHologramLoader from "@/app/components/CyberHologramLoader";

const data = [
  {
    src: "/images/services/ui-ux/success-stories/image-1.png",
  },
  {
    src: "/images/services/ui-ux/success-stories/image-2.png",
  },
  {
    src: "/images/services/ui-ux/success-stories/image-3.png",
  },
  {
    src: "/images/services/ui-ux/success-stories/image-4.png",
  },
  {
    src: "/images/services/ui-ux/success-stories/image-1.png",
  },
  {
    src: "/images/services/ui-ux/success-stories/image-2.png",
  },
  {
    src: "/images/services/ui-ux/success-stories/image-3.png",
  },
  {
    src: "/images/services/ui-ux/success-stories/image-4.png",
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

export default function UIUX() {
  const layoutImages = [
    {
      id: 1,
      thumbnail: "/images/services/ui-ux/layout-grid/video1.mp4",
      className: "md:col-span-3 md:row-span-2",
      content: null,
    },
    {
      id: 2,
      thumbnail: "/images/services/ui-ux/layout-grid/image2.png",
      className: "md:col-span-2 aspect-video",
      content: null,
    },
    {
      id: 3,
      thumbnail: "/images/services/ui-ux/layout-grid/image3.png",
      className: "md:col-span-2 aspect-video",
      content: null,
    },
  ];

  const webDevInfo = [
    {
      id: 1,
      title: "Target <br /> Audience",
      description:
        "Our Social marketing starts with target audience in order to target right customers for your brand.",
    },
    {
      id: 2,
      title: "Practical <br /> Optimization",
      description:
        "Our social media marketing scheme involves practical optimization of social media campaigns, advertisements and paid promotions.",
    },
    {
      id: 3,
      title: "Inventive <br /> Content",
      description:
        "Tech With Moonshot put its weight behind inventive content, as it is crucial to lure customers towards your brand.",
    },
    {
      id: 4,
      title: "Advanced <br /> Reporting",
      description:
        "Using the Facebook pixels and Google analytics, Tech With Moonshot allows you to measure campaign performance.",
    },
    {
      id: 5,
      title: "Machine <br /> learning",
      description:
        "'Tech With Moonshot' utilizes machine learning to boost social media marketing of your brand.",
    },
    {
      id: 6,
      title: "ROI-based <br /> Reporting",
      description:
        "Our team knows ROI is important for your business. That's why our digital specialists give you ROI reports regularly.",
    },
  ];

  return (
    <>
      <CyberHologramLoader />
      <div
        className="relative bg-[#00050A]"
        style={{ fontFamily: "var(--font-sora), sans-serif" }}
      >
        <Navbar />

        <section className="lg:flex items-center relative overflow-visible">
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
          <div className="flex px-[5em] max-lg:px-[3em] max-md:px-[2em] max-sm:pt-[40%] max-sm:pb-[10%] max-lg:pt-[30%] lg:py-[18%]">
            <div className="relative z-10">
              <HeroTitle title="UI/UX Design" />

              <h1 className="text-center md:text-start text-2xl 480:text-3xl md:text-[40px] 840:text-5xl lg:text-[clamp(36px,3.8vw,82px)] font-normal font-sora uppercase mb-4 tracking-tight leading-[118%] 1920:leading-[120%]">
                <AuroraText colors={["#ffffff", "#d1bd73"]}>
                  Designing <br /> UI/UX That Elevates Your{" "}
                </AuroraText>
                <span className="text-2xl 480:text-3xl md:text-[40px] 840:text-5xl lg:text-[clamp(36px,3.8vw,82px)] font-thin md:text-end block leading-[110%]">
                  <AuroraText colors={["#D42290", "#2DAEEF"]}>
                    Brand & Flow
                  </AuroraText>
                </span>
              </h1>

              <p className="text-center md:text-start font-sora font-normal text-white/70 text-xs 480:text-sm sm:text-base md:text-xs 840:text-sm lg:text-[clamp(10px,1.05vw,22px)]">
                From first ideas to final code, we design and build websites
                that show who you are online
              </p>
            </div>

            <div className="hidden lg:block">
              <img
                className="absolute inset-0 w-full h-auto"
                src="/images/services/bg-service-banner.png"
                alt="Hero Background Gradient"
              />
              <img
                src="/images/services/ui-ux/hero.png"
                className="absolute w-[62.5%] h-auto -bottom-18 1280:-bottom-24 1440:-bottom-28 1600:-bottom-32 1920:-bottom-36 right-0"
                alt="UI/UX Design Hero"
              />
            </div>
          </div>

          <div className="max-md:hidden lg:hidden relative z-20 mt-10">
            <img
              src="/images/services/ui-ux/hero.png"
              className="w-3/4 mx-auto h-auto"
              alt="UI/UX Design Hero"
            />
          </div>
        </section>

        <div className="relative px-[5em] max-lg:px-[3em] max-md:px-[2em] z-10">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full 1280:h-[75vh] 1600:h-screen rounded-[34.137px] object-cover object-bottom"
          >
            <source
              src="/images/services/ui-ux/section-2.mp4"
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
            <div className="flex justify-center lg:justify-end lg:mr-[10%]">
              <h2 className="hidden lg:block text-[clamp(36px,3.25vw,63px)] font-sora font-light uppercase tracking-tight leading-snug mb-5 1440:mb-8">
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
                  text="UI/UX Design Studio"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={false}
                  startOnVisible={true}
                  loop={true}
                />
              </h2>
              <h2 className="block max-md:text-center lg:hidden text-2xl 480:text-3xl md:text-4xl font-sora font-light uppercase tracking-tight leading-snug mb-5">
                <TextType
                  text="Human-centered UI/UX Design Studio"
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
              <div className="lg:col-span-5 -mt-30 max-lg:mt-0 relative z-10 flex items-center justify-center order-1 lg:order-0">
                <img
                  src="/images/services/ui-ux/section-3.png"
                  alt="Laptop showcasing website design"
                  className="h-auto w-4/5 object-cover"
                  style={{ mixBlendMode: "screen" }}
                />
              </div>

              {/* Text column */}
              <div className="lg:col-span-4 space-y-4 1440:space-y-8 1920:space-y-12 order-0 lg:order-1">
                <div className="flex gap-16 max-1366:gap-8">
                  <div className="hidden md:block w-1 lg:w-3 bg-white self-stretch mt-7 mb-8.5" />
                  <div className="sec-3-para tracking-[-0.03em] font-normal font-sora max-lg:w-full">
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

          <section className="max-h-screen overflow-hidden">
            <img
              src="/images/services/ui-ux/section-4.png"
              className="relative z-10 h-full w-full object-cover"
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
            id="ui-ux"
            className="relative z-10 pt-10 md:pt-20 lg:pt-30 1366:pt-40 1600:pt-50"
          >
            <Smoke />

            <div className="px-[5em] max-lg:px-[3em] max-md:px-[2em]">
              <h2 className="hidden lg:block text-[clamp(40px,3.5vw,63px)] font-sora font-light uppercase tracking-tight leading-tight">
                <TextType
                  text="Modern Web Dev Made For"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={false}
                  startOnVisible={true}
                  loop={true}
                />
                <br />
                <TextType
                  text="Immersive Website User Experience"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={false}
                  startOnVisible={true}
                  loop={true}
                />
              </h2>
              <h2 className="block max-md:text-center lg:hidden text-2xl 480:text-3xl md:text-4xl font-sora font-light uppercase tracking-tight leading-tight">
                <TextType
                  text="Modern Web Dev Made For Immersive Website User Experience"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={false}
                  startOnVisible={true}
                  loop={true}
                />
              </h2>
              <div className="font-sora max-md:text-center text-sm md:text-xs 840:text-sm lg:text-xs 1280:text-[13px] 1440:text-sm 1600:text-[16px] 1920:text-[18px] mt-5 text-white/80 leading-relaxed">
                <TextType
                  text="Tech With Moonshot's UI/UX design services are focused on creating immersive website user experiences. We combine modern web development techniques with user-centered design principles to craft websites that not only look stunning but also provide seamless and engaging interactions for your audience."
                  typingSpeed={15}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="|"
                  startOnVisible={true}
                  loop={true}
                />
              </div>
            </div>

            <div id="ui-ux-layout" className="relative z-50">
              <LayoutGrid cards={layoutImages} />

              <style
                dangerouslySetInnerHTML={{
                  __html: `
                      #ui-ux #ui-ux-layout > div.grid {
                          gap: 50px !important;
                          padding: 5rem !important;
                      }
                      #ui-ux #ui-ux-layout img, #ui-ux #ui-ux-layout video {
                          border-radius: 25.788px !important;
                          object-position: center !important;
                      }
                      @media (max-width: 1440px) {
                          #ui-ux #ui-ux-layout > div.grid {
                              padding: 25px 5rem !important;
                          }
                      }
                      @media (max-width: 840px) {
                          #ui-ux #ui-ux-layout > div.grid {
                              padding: 25px !important;
                          }
                      }
                      @media (min-width: 48rem) { 
                        #ui-ux #ui-ux-layout .grid {
                          grid-template-columns: repeat(5, minmax(0, 1fr));
                        }
                      }
                      #ui-ux #ui-ux-layout .grid > div > div .absolute.bottom-0.left-0.right-0 {
                          display: none !important;
                      }
                      @media (max-width: 1600px) {
                         #ui-ux #ui-ux-layout > div.grid {
                            gap: 30px !important;
                        }
                      }
                      @media (max-width: 1024px) {
                         #ui-ux #ui-ux-layout > div.grid {
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

        <Footer />
      </div>
    </>
  );
}
