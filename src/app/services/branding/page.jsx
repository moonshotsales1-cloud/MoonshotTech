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
    src: "/images/services/branding/success-stories/image-1.png",
  },
  {
    src: "/images/services/branding/success-stories/image-2.png",
  },
  {
    src: "/images/services/branding/success-stories/image-3.png",
  },

  {
    src: "/images/services/branding/success-stories/image-1.png",
  },
  {
    src: "/images/services/branding/success-stories/image-2.png",
  },
  {
    src: "/images/services/branding/success-stories/image-3.png",
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

export default function Branding() {
  const layoutImages = [
    {
      id: 1,
      thumbnail: "/images/services/branding/layout-grid/image-1.png",
      className: "md:col-span-2 md:row-span-2 1920:max-h-[403px] 1920:min-h-[850px]",
      content: null,
    },
    {
      id: 2,
      thumbnail: "/images/services/branding/layout-grid/image-2.png",
      className: "md:col-span-1",
      content: null,
    },
    {
      id: 3,
      thumbnail: "/images/services/branding/layout-grid/image-3.png",
      className: "md:col-span-1",
      content: null,
    },
  ];

  const webDevInfo = [
    {
      id: 1,
      title: "Logo Ownership <br /> Right",
      description:
        "It is our religion to give our partners outright copyrights of all products they co-opt.",
    },
    {
      id: 2,
      title: "Social Media <br /> Expertise",
      description:
        "Our team fabricates impressive social media banners and posts to illuminate different facets of your brand across the globe.",
    },
    {
      id: 3,
      title: "Best Stationery <br /> Designing",
      description:
        "Our team invents expressive stationery designs to highlight brand identity and values.",
    },
    {
      id: 4,
      title: "ROI Boost via <br /> Landing Pages",
      description:
        "Make effective use of advertising investment with our UX/UI designed landing pages.",
    },
    {
      id: 5,
      title: "Money Back <br /> Guarantee",
      description:
        "All our branding services feature money back guarantee to give you convenience at our cost.",
    },
    {
      id: 6,
      title: "Industry Specific <br /> Designs",
      description:
        "Our expert strategists make use of industry-specific trends to create insurmountable value for your brand.",
    },
    {
      id: 7,
      title: "Unique <br /> Designs",
      description:
        "Uncommon designs allow our partners to develop exclusive brand positioning.",
    },
  ];

  return (
    <>
      <CyberHologramLoader />
      <Navbar />

      <section className="lg:flex items-center relative w-full overflow-visible">
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

        {/* Branding Hero Section */}
        <section className="px-[5em] max-lg:px-[3em] max-md:px-[2em] max-sm:pt-[40%] max-sm:pb-[10%] max-lg:pt-[30%] lg:py-[19%] 1280:py-[18%]">
          <div className="relative z-10">
            <HeroTitle title="Branding" />

            <h1 className="text-center md:text-start text-2xl 480:text-3xl md:text-[40px] 840:text-5xl lg:text-[clamp(36px,3.5vw,74px)] font-normal font-sora uppercase mb-4 tracking-tight leading-[118%] 1920:leading-[120%]">
              <AuroraText colors={["#ffffff", "#d1bd73"]}>
                Branding <br /> Brands That Shape You{" "}
              </AuroraText>
              <span className="lg:text-[clamp(36px,3.5vw,74px)] font-thin md:text-end md:mr-[22%] 840:mr-[15%] lg:mr-0 block leading-[110%]">
                <AuroraText colors={["#D42290", "#2DAEEF"]}>
                  Brand & Persona
                </AuroraText>
              </span>
            </h1>

            <p className="text-center md:text-start font-sora font-normal text-white/70 text-xs 480:text-sm sm:text-base md:text-xs 840:text-sm lg:text-[clamp(10px,1vw,18px)]">
              From early spark to brand logo, we create and shape profiles that
              show who you are online
            </p>
          </div>

          <div className="hidden lg:block">
            <img
              className="absolute inset-0 w-full h-auto"
              src="/images/services/bg-service-banner.png"
              alt="Hero Background Gradient"
            />
            <img
              src="/images/services/branding/hero-cropped.png"
              className="absolute w-[55%] top-40 right-0 z-10"
              alt="Branding Hero"
            />
          </div>
        </section>

        <div className="max-md:hidden lg:hidden relative z-20">
          <img
            src="/images/services/branding/hero.png"
            className="w-3/4 mx-auto h-auto"
            alt="Branding Hero"
          />
        </div>
      </section>

      <section className="relative px-[5em] max-lg:px-[3em] max-md:px-[2em] z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="relative z-10 w-full h-full rounded-[34.137px] opacity-90"
        >
          <source
            src="/images/services/branding/section-2.mp4"
            type="video/mp4"
          />
        </video>
      </section>

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
            <h2 className="hidden lg:block text-[clamp(30px,2.75vw,63px)] font-sora font-light uppercase tracking-tight leading-snug mb-5 1440:mb-8">
              <TextType
                text="Identity-first"
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={false}
                startOnVisible={true}
                loop={true}
              />
              <br />
              <TextType
                text="Modern Branding Studio"
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={false}
                startOnVisible={true}
                loop={true}
              />
            </h2>
            <h2 className="block max-md:text-center lg:hidden text-2xl 480:text-3xl md:text-4xl font-sora font-light uppercase tracking-tight leading-snug mb-5">
              <TextType
                text="Identity-first Modern Branding Studio"
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
            <div className="lg:col-span-5 lg:-mt-36 1440:-mt-54 relative z-10 col-span-1 flex items-center justify-center order-1 lg:order-0">
              <img
                src="/images/services/branding/section-3.png"
                alt="Laptop showcasing website design"
                className="hidden lg:block h-full w-full lg:object-contain xl:object-cover lg:scale-[160%] 1280:scale-[140%] 1600:scale-[140%] 1920:scale-150"
                style={{ mixBlendMode: "screen" }}
              />

              <img
                src="/images/services/branding/section-3-sm.png"
                alt="Laptop showcasing website design"
                className="block lg:hidden h-full w-2/3"
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
                            width: 100% !important;
                          }
                        }
                        @media (max-width: 1366px) {  
                          .sec-3-para p {
                            width: 95% !important;
                          }
                        }
                        @media (max-width: 1024px) {  
                          .sec-3-para p {
                            width: 106% !important;
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
          <img
            src="/images/services/branding/section-4.png"
            className="max-h-[70vh] 1280:max-h-[85vh] 1440:max-h-[95vh] object-cover object-bottom relative z-10 h-full w-full"
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
          id="branding"
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

            <h2 className="block max-md:text-center lg:hidden text-2xl 480:text-3xl md:text-4xl font-sora font-light uppercase tracking-tight leading-snug mb-8">
              <TextType
                text="Modern web dev made for Immersive website user experience"
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={false}
                startOnVisible={true}
                loop={true}
              />
            </h2>

            <div className="font-sora max-md:text-center text-sm md:text-xs 840:text-sm lg:text-xs 1280:text-[13px] 1440:text-sm 1600:text-[16px] 1920:text-[18px] mt-5 text-white/80 leading-relaxed">
              <TextType
                text="Branding is mandatory for businesses, as it changes how target audience perceive your brand; it increases brand awareness, and it drives sales. Branding gives your business competitive advantage and grows business value."
                typingSpeed={15}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
                startOnVisible={true}
                loop={true}
              />
            </div>
          </div>

          <div id="branding-layout" className="relative z-50">
            <LayoutGrid cards={layoutImages} />
            <style
              dangerouslySetInnerHTML={{
                __html: `
                  #branding #branding-layout > div.grid {
                    gap: 50px !important;
                    padding: 5rem !important;
                  }
                  #branding #branding-layout img {
                      border-radius: 25.788px !important;
                  }
                  @media (max-width: 1440px) {
                    #branding #branding-layout > div.grid {
                        padding: 25px 5rem !important;
                    }
                  }
                  @media (max-width: 1023px) {
                    #branding #branding-layout > div.grid {
                      padding: 25px !important;
                      gap: 20px !important;
                    }
                  }
                  /* Hide the absolute overlay inside LayoutGrid cards */
                  #branding
                    #branding-layout
                    .grid
                    > div
                    > div
                    .absolute.bottom-0.left-0.right-0 {
                    display: none !important;
                  }
                  @media (max-width: 1600px) {
                      #branding #branding-layout > div.grid {
                        gap: 30px !important;
                    }
                  }
                  @media (max-width: 1024px) {
                      #branding #branding-layout > div.grid {
                        gap: 20px !important;
                    }
                  }
                `,
              }}
            />
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

          <div className="max-w-[90%] min-w-[90%] max-xl:max-w-[95%] max-xl:min-w-[95%] mx-auto my-15 sm:my-20 md:my-25 lg:my-30 1366:my-35 text-white/30 w-px h-px bg-white/30"></div>

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
