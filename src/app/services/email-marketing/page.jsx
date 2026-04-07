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
    src: "/images/services/email-marketing/success-stories/image-1.png",
  },
  {
    src: "/images/services/email-marketing/success-stories/image-2.png",
  },
  {
    src: "/images/services/email-marketing/success-stories/image-3.png",
  },

  {
    src: "/images/services/email-marketing/success-stories/image-1.png",
  },
  {
    src: "/images/services/email-marketing/success-stories/image-2.png",
  },
  {
    src: "/images/services/email-marketing/success-stories/image-3.png",
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

export default function EmailMarketing() {
  const layoutImages = [
    {
      id: 1,
      thumbnail: "/images/services/email-marketing/layout-grid/image-1.png",
      className: "md:col-span-2 md:row-span-1 max-h-[850px]",
      content: null,
    },
    {
      id: 2,
      thumbnail: "/images/services/email-marketing/layout-grid/image-2.png",
      className: "md:col-span-3 max-h-[850px]",
      content: null,
    },
  ];

  const webDevInfo = [
    {
      id: 1,
      title: "Conversion-driven <br /> Layout",
      description:
        "Our e-mail marketing has built-in layout that seeks lead conversion. Additionally, it is optimized, user interactive and mobile friendly.",
    },
    {
      id: 2,
      title: "Error Free <br /> E-mails",
      description:
        "Error filled emails hurt brand image. That's why 'Tech With Moonshot' makes sure our email-marketing is impeccable from every angle.",
    },
    {
      id: 3,
      title: "Data-Driven <br /> Content",
      description:
        "Tech With Moonshot' emailing specialists make use of data-driven content to make email promotions search engine optimized.",
    },
    {
      id: 4,
      title: "Targeted <br /> Emails",
      description:
        "Segmented email marketing produce better results in terms of reach and lead generation.",
    },
    {
      id: 5,
      title: "Personalization",
      description:
        "Email-marketing is more effectual when they deliver personalized messages to targeted niche.",
    },
    {
      id: 6,
      title: "AI <br /> embedded",
      description:
        "AI embedded email marketing strategies are more productive, as they use algorithm to predict sophisticated taglines for target audience.",
    },
    {
      id: 7,
      title: "Go beyond <br /> text",
      description:
        "Send images, videos, apps, and emoji to tell your story and drive action in the most powerful way possible.",
    },
  ];

  return (
    <>
      <CyberHologramLoader />
      <div
        className="relative bg-black max-sm:bg-[#00050A] overflow-x-hidden"
        style={{ fontFamily: "var(--font-sora), sans-serif" }}
      >
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

          {/* Decorative Lines */}
          <DecorativeLines />

          {/* Hero Section */}
          <div className="flex px-[5em] max-lg:px-[3em] max-md:px-[2em] max-sm:pt-[40%] max-sm:pb-[10%] max-lg:pt-[30%] lg:py-[18%]">
            <div className="relative z-10">
              <HeroTitle title="Email Marketing" />

              <h1 className="text-center md:text-start text-2xl 480:text-3xl md:text-[clamp(50px,4vw,74px)] lg:text-[clamp(37px,3.5vw,72px)] font-normal font-sora uppercase mb-4 tracking-tight leading-[110%]">
                <AuroraText colors={["#ffffff", "#d1bd73"]}>
                  Driving <br /> Emails That Power Your{" "}
                </AuroraText>
                <span className="text-2xl 480:text-3xl md:text-[clamp(60px,4vw,86px)] lg:text-[clamp(36px,4.25vw,82px)] font-thin lg:text-end block">
                  <AuroraText colors={["#D42290", "#2DAEEF"]}>
                    Brand & Growth
                  </AuroraText>
                </span>
              </h1>

              <p className="text-center md:text-start text-wrap font-sora font-normal text-white/70 text-xs 480:text-sm sm:text-base md:text-[clamp(13px,1.08vw,20px)] lg:text-[clamp(10px,0.9vw,22px)]">
                From bold concepts to polished sends, we create email flows that
                clearly reflect who you are online
              </p>
            </div>

            <div className="hidden lg:block">
              <img
                className="absolute inset-0 w-full h-auto"
                src="/images/services/bg-service-banner.png"
                alt="Hero Background Gradient"
              />
              <img
                src="/images/services/email-marketing/hero.png"
                className="absolute w-[40%] h-auto bottom-10 right-0 z-10"
                alt="Email Marketing Hero"
              />
            </div>
          </div>

          <div className="max-md:hidden lg:hidden relative z-20 my-10">
            <img
              src="/images/services/email-marketing/hero.png"
              className="w-3/5 ml-auto h-auto"
              alt="email-marketing Hero"
            />
          </div>
        </section>

        <div className="relative px-[5em] max-lg:px-[3em] max-md:px-[2em] z-10">
          <img
            src="/images/services/email-marketing/section-2.png"
            className="1920:h-screen 1600:h-[95vh] 1366:h-[85vh] 1280:h-[75vh] lg:h-[60vh] w-full object-cover rounded-4xl object-bottom"
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

          <section className="relative z-10 py-10 md:py-16 lg:py-24 1440:py-40 1920:py-52 px-8 sm:px-10 md:px-16 lg:px-24 xl:px-36">
            <div className="flex justify-end max-lg:justify-center">
              <h2 className="hidden lg:block text-[clamp(30px,3vw,63px)] font-sora font-light uppercase tracking-tight leading-snug mb-8">
                <TextType
                  text="Performance-driven"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={false}
                  startOnVisible={true}
                  loop={true}
                />
                <br />
                <TextType
                  text="Email Marketing Studio"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={false}
                  startOnVisible={true}
                  loop={true}
                />
              </h2>
              <h2 className="text-center md:text-start block lg:hidden text-2xl 480:text-3xl md:text-4xl font-sora font-light uppercase tracking-tight leading-snug mb-8">
                <TextType
                  text="Performance-driven Email Marketing Studio"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={false}
                  startOnVisible={true}
                  loop={true}
                />
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-9 gap-24">
              {/* Image column */}
              <div className="lg:col-span-5 -mt-40 mr-10 max-lg:mt-10 relative z-10">
                <img
                  src="/images/services/email-marketing/section-3.png"
                  alt="Laptop showcasing website design"
                  className="h-full w-3/4 mx-auto lg:w-full 1280:w-[90%] object-contain"
                />
              </div>

              {/* Text column */}
              <div className="lg:col-span-4 space-y-4 1440:space-y-8 1920:space-y-12">
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
                              width: 112% !important;
                            }
                          }
                          @media (max-width: 1366px) {  
                            .sec-3-para p {
                              width: 117% !important;
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
            src="/images/services/email-marketing/section-4.png"
            className="relative z-10 h-[50vh] lg:h-[70vh] 1280:h-[90vh] 1600:h-[110vh] w-full object-cover"
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
            id="email-marketing"
            className="relative z-10 pt-20 sm:pt-30 lg:pt-40 1366:pt-50"
          >
            <Smoke />

            <div className="px-[5em] max-lg:px-[3em] max-md:px-[2em]">
              <h2 className="hidden lg:block text-[clamp(40px,3.5vw,63px)] font-sora font-light uppercase tracking-tight leading-tight">
                <TextType
                  text="Modern email flows made for"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={false}
                  startOnVisible={true}
                  loop={true}
                />
                <br />
                <TextType
                  text="immersive customer engagement"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={false}
                  startOnVisible={true}
                  loop={true}
                />
              </h2>
              <h2 className="text-center md:text-start block lg:hidden text-2xl 480:text-3xl md:text-4xl font-sora font-light uppercase tracking-tight leading-tight">
                <TextType
                  text="Modern email flows made for immersive customer engagement"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={false}
                  startOnVisible={true}
                  loop={true}
                />
              </h2>
              <div className="font-sora text-center md:text-start text-sm sm:text-lg md:text-base lg:text-[clamp(10px,0.9vw,18px)] 1440:text-[16px] 1920:text-[18px] mt-5 text-white/80 leading-relaxed">
                <TextType
                  text="E-mail is a powerful tool to connect with masses as it sends them personalized messages. The research clarifies the fact that email marketing is more effective than SMM. Additionally, it is used to convert web surfers into members and eventually loyal patrons."
                  typingSpeed={15}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="|"
                  startOnVisible={true}
                  loop={true}
                />
              </div>
            </div>

            <div id="email-marketing-layout" className="relative z-50">
              <LayoutGrid cards={layoutImages} />

              <style
                dangerouslySetInnerHTML={{
                  __html: `
                        #email-marketing #email-marketing-layout > div.grid {
                            gap: 50px !important;
                            padding: 5rem !important;
                        }
                        #email-marketing #email-marketing-layout img {
                            border-radius: 25.788px !important;
                        }
                        @media (min-width: 48rem) { 
                          #email-marketing #email-marketing-layout .grid {
                              grid-template-columns: repeat(5, minmax(0, 1fr));
                          }
                        }
                        @media (max-width: 1440px) {
                            #email-marketing #email-marketing-layout > div.grid {
                                padding: 25px 5rem !important;
                            }
                        }
                        @media (max-width: 1023px) {
                            #email-marketing #email-marketing-layout > div.grid {
                                padding: 25px !important;
                            }
                        }
                        #email-marketing #email-marketing-layout .grid > div > div .absolute.bottom-0.left-0.right-0 {
                            display: none !important;
                        }
                        @media (max-width: 1600px) {
                          #email-marketing #email-marketing-layout > div.grid {
                            gap: 30px !important;
                        }
                        @media (max-width: 1024px) {
                            #email-marketing #email-marketing-layout > div.grid {
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
        </div>

        <Footer />
      </div>
    </>
  );
}
