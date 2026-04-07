"use client";

import Image from "next/image";

import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";

import { AuroraText } from "@/components/ui/aurora-text";
import ScrollReveal from "@/components/lightswind/scroll-reveal";
import TextType from "@/components/TextType";
import { LayoutGrid } from "@/components/ui/layout-grid";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import DecorativeLines from "@/app/components/DecorativeLines";
import Button from "@/app/components/button/button";
import FormCTA from "@/app/components/FormCTA";
import HorizontalScrollCards from "@/app/components/HorizontalScroll";
import Smoke from "@/app/components/smoke/smoke";
import HeroTitle from "@/app/components/hero-title";
import CyberHologramLoader from "@/app/components/CyberHologramLoader";

const data = [
  {
    src: "/images/services/animations/success-stories/image-1.png",
  },
  {
    src: "/images/services/animations/success-stories/image-2.png",
  },
  {
    src: "/images/services/animations/success-stories/image-3.png",
  },
  {
    src: "/images/services/animations/success-stories/image-1.png",
  },
  {
    src: "/images/services/animations/success-stories/image-2.png",
  },
  {
    src: "/images/services/animations/success-stories/image-3.png",
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

export default function Animations() {
  const layoutImages = [
    {
      id: 1,
      thumbnail: "/images/services/animations/layout-grid/video-1.mp4",
      className: "md:col-span-3 md:row-span-2",
      content: null,
    },
    {
      id: 2,
      thumbnail: "/images/services/animations/layout-grid/video-2.webm",
      className: "md:col-span-2 aspect-video",
      content: null,
    },
    {
      id: 3,
      thumbnail: "/images/services/animations/layout-grid/video-3.mp4",
      className: "md:col-span-2 aspect-video",
      content: null,
    },
  ];

  const webDevInfo = [
    {
      id: 1,
      title: "Whiteboard <br /> Animation",
      description:
        "Whiteboard videos seek to involve and engage customers on wide array of topics.",
    },
    {
      id: 2,
      title: "Character <br /> Animation",
      description:
        "Characters revolutionize your products/services as they inject emotions into videos.",
    },
    {
      id: 3,
      title: "2D <br /> Animation",
      description:
        "2D Animations are eye-catchy, efficient and customer oriented.",
    },
    {
      id: 4,
      title: "3D <br /> Animation",
      description:
        "3D characters are user-friendly as well as effective tool to grab customer attention.",
    },
    {
      id: 5,
      title: "Explainer <br /> Videos",
      description:
        "Short video aims at explaining your product/service to your potential customers.",
    },
    {
      id: 6,
      title: "Motion <br /> Graphics",
      description:
        "Motion animation is crucial, for it disseminate your brand’s story effectively.",
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

        {/* Animations Hero Section */}
        <div className="flex px-[5em] max-lg:px-[3em] max-md:px-[2em] max-sm:pt-[40%] max-sm:pb-[10%] max-lg:pt-[30%] lg:py-[19%] 1280:py-[18%]">
          <div className="relative z-10">
            <HeroTitle title="Animations" />

            <h1 className="text-center md:text-start text-2xl 480:text-3xl md:text-[40px] 840:text-5xl lg:text-[clamp(36px,3.75vw,78px)] font-normal font-sora uppercase mb-4 tracking-tight leading-[118%] 1920:leading-[120%]">
              <AuroraText colors={["#ffffff", "#d1bd73"]}>
                Smooth Animations <br /> That Grow Your{" "}
              </AuroraText>
              <span className="lg:text-[clamp(36px,3.75vw,78px)] font-thin md:text-end md:mr-[14%] 840:mr-[12%] lg:mr-0 block leading-[110%]">
                <AuroraText colors={["#D42290", "#2DAEEF"]}>
                  Brand Reach
                </AuroraText>
              </span>
            </h1>

            <p className="text-center md:text-start font-sora font-normal text-white/70 text-xs 480:text-sm sm:text-base md:text-xs 840:text-sm lg:text-[clamp(10px,0.95vw,20px)]">
              From concept frames to final render, we craft motion that brings
              your brand story to life
            </p>
          </div>

          <div className="hidden lg:block">
            <img
              className="absolute inset-0 w-full h-auto"
              src="/images/services/bg-service-banner.png"
              alt="Hero Background Gradient"
            />
            <img
              className="absolute w-1/2 top-35 1280:top-33 1366:top-36 1600:top-40 right-0 z-10"
              src="/images/services/animations/hero.png"
              alt="animations Hero"
            />
          </div>
        </div>

        <div className="max-md:hidden lg:hidden relative z-20 pt-10">
          <img
            src="/images/services/animations/hero.png"
            className="w-2/3 mx-auto h-auto"
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
          className="relative z-50 w-full h-full rounded-[34.137px] object-contain opacity-100"
        >
          <source
            src="/images/services/animations/section-2.mp4"
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

        <section className="relative z-10 max-sm:py-10 max-lg:py-16 lg:pt-30 1280:pt-36 1440:pt-40 1920:pt-52 lg:pb-10 1280:pb-20 1366:pb-10 1920:pb-0 px-8 sm:px-10 md:px-16 lg:px-24 xl:px-36">
          <div className="flex justify-end max-lg:justify-center">
            <h2 className="mr-10 1280:mr-20 1440:mr-30 1920:mr-40 hidden lg:block text-[clamp(40px,3.5vw,63px)] font-sora font-light uppercase tracking-tight leading-snug mb-5 1440:mb-8">
              <TextType
                text="Expressive visual"
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={false}
                startOnVisible={true}
                loop={true}
              />
              <br />
              <TextType
                text="storytelling studio"
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
            <div className="lg:col-span-5 lg:-mt-36 1440:-mt-44 1600:-mt-54 relative z-10 col-span-1 flex items-center justify-center order-1 lg:order-0">
              <img
                src="/images/services/animations/section-3.png"
                alt="Laptop showcasing website design"
                className="h-full w-3/4 lg:w-full lg:scale-110 1280:scale-125 1366:scale-110 1600:scale-100 object-cover"
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
                    developers and back-end developers know how to service your
                    web development request in agile manner.
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

        <section>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="relative z-10 w-full h-full"
          >
            <source
              src="/images/services/animations/section-4.mp4"
              type="video/mp4"
            />
          </video>
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
          id="animations"
          className="relative z-10 pt-10 md:pt-20 lg:pt-30 1366:pt-40 1600:pt-50"
        >
          <div>
            <Smoke />

            <div className="px-[5em] max-lg:px-[3em] max-md:px-[2em]">
              <h2 className="hidden lg:block text-[clamp(40px,3.5vw,63px)] font-sora font-light uppercase tracking-tight leading-tight">
                <TextType
                  text="High-impact animation"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={false}
                  startOnVisible={true}
                  loop={true}
                />
                <br />
                <TextType
                  text="crafted to captivate every audience"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={false}
                  startOnVisible={true}
                  loop={true}
                />
              </h2>

              <h2 className="block max-md:text-center lg:hidden text-2xl 480:text-3xl md:text-4xl font-sora font-light uppercase tracking-tight leading-snug mb-8">
                <TextType
                  text="High-impact animations crafted to captivate every audience"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={false}
                  startOnVisible={true}
                  loop={true}
                />
              </h2>

              <div className="font-sora max-md:text-center text-sm md:text-xs 840:text-sm lg:text-xs 1280:text-[13px] 1440:text-sm 1600:text-[16px] 1920:text-[18px] mt-5 text-white/80 leading-relaxed">
                <TextType
                  text="‘Tech With Moonshot’ recognizes the worth of video animation. The reason being it evokes customer interest and lead them to buy goods and services. In order to help our clients, our animators combine creative design, 3D special effects, live action and visual effects to give your concept a life."
                  typingSpeed={15}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="|"
                  startOnVisible={true}
                  loop={true}
                />
              </div>
            </div>
          </div>

          <div id="animations-layout" className="relative z-50">
            <LayoutGrid cards={layoutImages} />
            <style
              dangerouslySetInnerHTML={{
                __html: `
                  #animations #animations-layout > div.grid {
                    gap: 50px !important;
                    padding: 5rem !important;
                  }
                  #animations #animations-layout video {
                      border-radius: 25.788px !important;
                      object-position: center !important;
                  }
                  @media (max-width: 1440px) {
                      #animations #animations-layout > div.grid {
                          padding: 25px 5rem !important;
                      }
                  }
                  @media (max-width: 1023px) {
                    #animations #animations-layout > div.grid {
                      padding: 25px !important;
                      gap: 20px !important;
                    }
                  }
                  @media (min-width: 48rem) { 
                    #animations #animations-layout .grid {
                        grid-template-columns: repeat(5, minmax(0, 1fr));
                    }
                  }
                  /* Hide the absolute overlay inside LayoutGrid cards */
                  #animations #animations-layout .grid > div > div .absolute.bottom-0.left-0.right-0 {
                    display: none !important;
                  }
                  @media (max-width: 1600px) {
                      #animations #animations-layout > div.grid {
                        gap: 30px !important;
                    }
                  }
                  @media (max-width: 1024px) {
                      #animations #animations-layout > div.grid {
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
    </>
  );
}
