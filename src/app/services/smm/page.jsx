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
    src: "/images/services/ssm/success-stories/image-1.png",
  },
  {
    src: "/images/services/ssm/success-stories/image-2.png",
  },
  {
    src: "/images/services/ssm/success-stories/image-3.png",
  },

  {
    src: "/images/services/ssm/success-stories/image-1.png",
  },
  {
    src: "/images/services/ssm/success-stories/image-2.png",
  },
  {
    src: "/images/services/ssm/success-stories/image-3.png",
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

export default function SSM() {
  const layoutImages = [
    {
      id: 1,
      thumbnail: "/images/services/ssm/layout-grid/image1.png",
      className: "md:col-span-3 md:row-span-2",
      content: null,
    },
    {
      id: 2,
      thumbnail: "/images/services/ssm/layout-grid/image2.png",
      className: "md:col-span-2",
      content: null,
    },
    {
      id: 3,
      thumbnail: "/images/services/ssm/layout-grid/image3.png",
      className: "md:col-span-2",
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
          <div className="flex px-[5em] max-lg:px-[3em] max-md:px-[2em] max-sm:pt-[40%] max-sm:pb-[10%] max-lg:pt-[30%] lg:pt-[22%] lg:pb-[16%] 1920:py-[18%]">
            <div className="relative z-10">
              <HeroTitle title="Social Media Marketing" />

              <h1 className="text-center md:text-start text-3xl sm:text-4xl md:text-[clamp(50px,4vw,74px)] lg:text-[clamp(40px,3.6vw,82px)] font-normal font-sora uppercase mb-4 tracking-tight leading-8 md:leading-15 lg:leading-12 1280:leading-15 1600:leading-18 1920:leading-20.25">
                <AuroraText colors={["#ffffff", "#d1bd73"]}>
                  Social Media <br /> That Grows Your{" "}
                </AuroraText>
                <span className="text-4xl md:text-[clamp(60px,4vw,86px)] lg:text-[clamp(45px,5vw,86px)] font-thin lg:text-end block">
                  <AuroraText colors={["#D42290", "#2DAEEF"]}>
                    Brand Reach
                  </AuroraText>
                </span>
              </h1>

              <p className="text-center md:text-start font-sora font-normal text-white/70 text-xs 480:text-sm sm:text-base lg:text-[clamp(10px,1vw,17px)]">
                From ideas to final posts, we plan & manage SMM that shows who
                you are online!
              </p>
            </div>

            <div className="hidden lg:block">
              <img
                className="absolute inset-0 w-full h-auto"
                src="/images/services/bg-service-banner.png"
                alt="Hero Background Gradient"
              />
              <img
                src="/images/services/ssm/hero.png"
                className="absolute w-[45%] h-auto -bottom-15 right-30 max-xl:right-10"
                alt="Social Media Marketing Hero"
              />
            </div>
          </div>

          <div className="max-md:hidden lg:hidden relative z-20 mt-10">
            <img
              src="/images/services/ssm/hero.png"
              className="w-3/5 mx-auto h-auto"
              alt="Social Media Marketing Hero"
            />
          </div>
        </section>

        <div className="relative z-10 px-[5em] max-lg:px-[3em] max-md:px-[2em]">
          <img
            src="/images/services/ssm/section-2.png"
            className="relative z-10 max-h-[95vh] w-full object-cover rounded-4xl items-center"
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
              <h2 className="hidden lg:block text-[clamp(36px,3.1vw,63px)] font-sora font-light uppercase tracking-tight leading-snug mb-8">
                <TextType
                  text="Modern social"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={false}
                  startOnVisible={true}
                  loop={true}
                />
                <br />
                <TextType
                  text="media experience studio"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={false}
                  startOnVisible={true}
                  loop={true}
                />
              </h2>
              <h2 className="text-center md:text-start block lg:hidden text-3xl md:text-4xl font-sora font-light uppercase tracking-tight leading-snug mb-8">
                <TextType
                  text="Modern social media experience studio"
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
              <div className="lg:col-span-5 -mt-24 1280:-mt-34 1440:-mt-44 1920:-mt-54 max-lg:mt-0 relative z-10 flex items-center justify-center">
                <img
                  src="/images/services/ssm/section-3.png"
                  alt="Laptop showcasing website design"
                  className="h-auto w-full object-cover lg:scale-110"
                  style={{ mixBlendMode: "screen" }}
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

          <section className="max-h-screen overflow-hidden">
            <img
              src="/images/services/ssm/sec-4.png"
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
            id="ssm"
            className="relative z-10 pt-20 sm:pt-30 lg:pt-40 1366:pt-50"
          >
            <Smoke />

            <div className="px-[5em] max-lg:px-[3em] max-md:px-[2em]">
              <h2 className="hidden lg:block text-[clamp(40px,3.5vw,63px)] font-sora font-light uppercase tracking-tight leading-tight">
                <TextType
                  text="Modern social media made"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={false}
                  startOnVisible={true}
                  loop={true}
                />
                <br />
                <TextType
                  text="for engaging audience connection"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={false}
                  startOnVisible={true}
                  loop={true}
                />
              </h2>
              <h2 className="text-center md:text-start block lg:hidden text-3xl md:text-4xl font-sora font-light uppercase tracking-tight leading-tight">
                <TextType
                  text="Modern social media made for engaging audience connection"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={false}
                  startOnVisible={true}
                  loop={true}
                />
              </h2>
              <div className="font-sora text-center md:text-start text-sm sm:text-lg md:text-base lg:text-[clamp(10px,0.9vw,18px)] 1440:text-[16px] 1920:text-[18px] mt-5 text-white/80 leading-relaxed">
                <TextType
                  text="Social media advertising is one of the most pronounced and useful means to give wings to your profitability. The paid advertisements on Facebook, Instagram, Snap Chat, YouTube, TikTok, and other potential platforms are consequential in this digitized globe to give sustenance to brands."
                  typingSpeed={15}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="|"
                  startOnVisible={true}
                  loop={true}
                />
              </div>
            </div>

            <div id="ssm-layout" className="relative z-50">
              <LayoutGrid cards={layoutImages} />

              <style
                dangerouslySetInnerHTML={{
                  __html: `
                      #ssm #ssm-layout > div.grid {
                          gap: 50px !important;
                          padding: 5rem !important;
                      }
                      #ssm #ssm-layout img {
                          border-radius: 25.788px !important;
                      }
                      @media (max-width: 1024px) {
                          #ssm #ssm-layout > div.grid {
                              padding: 25px !important;
                          }
                      }
                      @media (min-width: 48rem) { 
                        #ssm #ssm-layout .grid {
                          grid-template-columns: repeat(5, minmax(0, 1fr));
                        }
                      }
                      #ssm #ssm-layout .grid > div > div .absolute.bottom-0.left-0.right-0 {
                          display: none !important;
                      }
                      @media (max-width: 1440px) {
                        #ssm #ssm-layout > div.grid {
                          gap: 30px !important;
                      }
                      @media (max-width: 1024px) {
                        #ssm #ssm-layout > div.grid {
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

          <h2 className="text-center md:text-start relative z-20 max-w-[90%] mx-auto text-3xl md:text-4xl lg:text-[clamp(40px,3.5vw,63px)] font-sora uppercase font-light tracking-tight leading-snug">
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
