"use client";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CTA from "../components/CTA";
import { AuroraText } from "@/components/ui/aurora-text";
import { LayoutGrid } from "@/components/ui/layout-grid";
import DecorativeLines from "../components/DecorativeLines";
import Ribbons from "@/components/Ribbons";
import Image from "next/image";
import Smoke from "../components/smoke/smoke";
import HeroTitle from "../components/hero-title";
import CyberHologramLoader from "../components/CyberHologramLoader";

export default function Portfolio() {
  const topCards = [
    {
      id: 1,
      title: "Education & E-Learning",
      description:
        "We develop learning portals, course platforms, and digital marketing strategies that increase enrollment. Structured UX and automation systems support student engagement and retention.",
      thumbnail: "/images/industries/image-1.png",
      className: "md:col-span-1",
      content: null,
    },
    {
      id: 2,
      title: "Professional Services",
      description:
        "We help consulting firms, agencies, and service providers build strong digital identities and lead generation systems. Through this approach, we align brand positioning with structured marketing execution.",
      thumbnail: "/images/industries/image-2.png",
      className: "md:col-span-1",
      content: null,
    },
    {
      id: 3,
      title: "Technology & SaaS",
      description:
        "We build scalable web platforms, applications, and performance marketing systems that support user acquisition and product adoption. Our structured analytics approach helps SaaS brands improve retention and measurable growth.",
      thumbnail: "/images/industries/image-4.png",
      className: "md:col-span-1 md:row-span-2 technology",
      content: null,
    },
    {
      id: 4,
      title: "Financial Services",
      description:
        "We build secure web systems and performance driven campaigns that strengthen credibility. Our strategy helps financial brands attract, convert, and retain clients with measurable tracking.",
      thumbnail: "/images/industries/image-3.png",
      className: "md:col-span-2",
      content: null,
    },
    {
      id: 5,
      title: "Real Estate",
      description:
        "We create property platforms, landing systems, and paid media strategies that generate qualified leads. Our digital frameworks support listing visibility and brand authority within competitive markets.",
      thumbnail: "/images/industries/image-5.png",
      className:
        "md:col-span-3 h-[320px] 1600:h-[650px] 2xl:h-[550px] xl:h-[450px] max-xl:h-[350px] real-estate",
      content: null,
    },
    {
      id: 6,
      title: "Hospitality & Tourism",
      description:
        "We design engaging booking platforms and targeted campaigns that increase reservations. Our SEO and advertising systems improve seasonal visibility and audience engagement.",
      thumbnail: "/images/industries/image-6.png",
      className: "md:col-span-1 md:row-span-2 legal",
      content: null,
    },
    {
      id: 7,
      title: "Manufacturing & Industrial",
      description:
        "We develop structured websites and digital systems that support B2B visibility and lead acquisition. Our analytics driven marketing strengthens supplier positioning and industry credibility.",
      thumbnail: "/images/industries/image-7.png",
      className:
        "md:col-span-1 h-[320px] 1600:h-[650px] 2xl:h-[550px] xl:h-[450px] max-xl:h-[350px] max-lg:h-[250px]",
      content: null,
    },
    {
      id: 8,
      title: "Startups & Emerging Brands",
      description:
        "We provide brand foundation, scalable web infrastructure, and growth marketing strategies. Our structured planning helps startups build authority and attract early traction efficiently.",
      thumbnail: "/images/industries/image-8.png",
      className:
        "md:col-span-1 h-[320px] 1600:h-[650px] 2xl:h-[550px] xl:h-[450px] max-xl:h-[350px] max-lg:h-[250px]",
      content: null,
    },
    {
      id: 9,
      title: "Healthcare & Medical",
      description:
        "We develop secure, compliant digital platforms and structured marketing strategies that build trust. Our work improves patient engagement and online visibility for clinics and medical providers.",
      thumbnail: "/images/industries/image-9.png",
      className: "md:col-span-2",
      content: null,
    },
  ];

  const bottomCards = [
    {
      id: 10,
      title: "E-commerce & Retail",
      description:
        "We design conversion focused stores, optimize product flows, and manage paid campaigns that increase sales. Our integration of SEO, ads, and UX strengthens revenue performance across platforms.",
      thumbnail: "/images/industries/image-10.png",
      className: "md:col-span-2 1600:h-[500px] 2xl:h-[450px] max-xl:h-[300px]",
      content: null,
    },
    {
      id: 11,
      title: "Corporate & Enterprise",
      description:
        "We support large organizations with scalable platforms, enterprise applications, and multi channel marketing strategies. Our disciplined execution ensures measurable results and operational stability.",
      thumbnail: "/images/industries/image-11.png",
      className: "md:col-span-2 1600:h-[500px] 2xl:h-[450px] max-xl:h-[300px]",
      content: null,
    },
  ];

  return (
    <>
      <CyberHologramLoader />
      <section className="max-sm:bg-[#00050A]">
        <div className="max-sm:hidden fixed inset-0 z-9999 pointer-events-none">
          <Ribbons
            baseThickness={6}
            colors={["#D42290"]}
            speedMultiplier={0.4}
            maxAge={500}
            enableFade={true}
          />
        </div>

        <Navbar />

        <div className="flex items-center relative w-full overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0 -mt-[10%]">
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
          <div className="px-[5em] max-lg:px-[3em] max-md:px-[2em] max-sm:py-[35%] max-lg:pt-[30%] max-md:py-[30%] lg:pt-[18%] lg:pb-[22%]">
            <div className="relative z-10">
              <HeroTitle title="Industries" />

              <h1 className="text-center md:text-start text-2xl 480:text-3xl md:text-[40px] 840:text-5xl lg:text-[clamp(40px,4.25vw,86px)] font-normal font-sora uppercase mb-4 tracking-tight leading-[110%]">
                <AuroraText colors={["#ffffff", "#d1bd73"]}>
                  Performance
                  <br className="hidden md:block" /> Driven Systems
                </AuroraText>
                <span className="font-thin lg:block">
                  <AuroraText colors={["#D42290", "#2DAEEF"]}>
                    Across Markets
                  </AuroraText>
                </span>
              </h1>

              <p className="text-center md:text-start font-sora font-normal text-white/70 text-xs 480:text-sm sm:text-base md:text-[clamp(13px,1.08vw,20px)] lg:text-[clamp(10px,1vw,22px)]">
                We work with businesses across multiple industries, adapting
                strategy, technology, and <br /> performance systems to meet
                sector specific challenges and growth objectives.
              </p>
            </div>

            <div>
              <img
                className="absolute inset-0 w-full h-auto"
                src="/images/services/bg-service-banner.png"
                alt="Hero Background Gradient"
              />
              <img
                src="/images/industries/city-bg.png"
                className="hidden lg:block absolute z-10 w-[45%] h-auto top-30 1280:top-40 -right-10"
                alt="City"
              />
            </div>

            <div className="py-10 max-md:hidden lg:hidden flex items-center justify-center relative z-20">
              <img
                src="/images/industries/city-bg.png"
                className="w-3/5 h-auto"
                alt="City"
              />
            </div>
          </div>
        </div>

        <div className="-mt-10 rounded-t-[34.137px] pt-10 lg:pt-20 2xl:pt-30 bg-[#00050A] relative z-10">
          <div className="absolute inset-0 rounded-t-[34.137px] overflow-hidden pointer-events-none">
            <Smoke />
          </div>

          <div
            id="industries-grid"
            className="relative z-50"
            style={{
              ["--img-opacity"]: "0.8",
            }}
          >
            <LayoutGrid cards={topCards} showDescriptions={true} />
            <style
              dangerouslySetInnerHTML={{
                __html: `
                  #industries-grid .layout-grid-top-overlay {
                    display: block !important;
                  }
                  
                  @media (min-width: 1024px) {
                    #industries-grid .group:hover [data-industry-overlay] {
                      background: linear-gradient(rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 1) 100%) !important;
                    }
                  }
                  
                  @media (max-width: 1023px) {
                    /* Applies to ALL cards on mobile/tablet */
                    #industries-grid [data-industry-overlay] {
                      background: linear-gradient(rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 1) 100%) !important;
                    }
                  }
                  
                  #industries-grid .real-estate img, #industries-grid .technology img {
                    object-position: center !important;
                  }
                  
                  @media (min-width: 768px) {
                    #industries-grid .technology #card-title, #industries-grid .legal #card-title {
                      background: none !important;
                      top: 0 !important;
                      bottom: auto !important;
                    }
                  }
                  
                  /* Desktop-only custom overlays for Legal and Technology */
                  @media (min-width: 1024px) {
                    #industries-grid .legal [id="industry-layout-grid-top-overlay"] {
                      background: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 100%) !important;
                    }
                    #industries-grid .technology #industry-layout-grid-top-overlay {
                      background: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%) !important;
                    }
                    
                    #industries-grid .technology:hover #industry-layout-grid-top-overlay {
                      background: linear-gradient(rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.5) 100%) !important;
                    }
                    #industries-grid .legal:hover #industry-layout-grid-top-overlay {
                      background: linear-gradient(0deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.9) 100%) !important;
                    }
                  }
                  
                  @media (max-width: 1600px) {
                    #industries-grid > div.grid {
                      gap: 30px !important;
                    }
                  }
                  
                  @media (max-width: 1024px) {
                    #industries-grid > div.grid {
                      gap: 20px !important;
                    }
                  }
                `,
              }}
            />
            <div id="bottom-industries-grid">
              <LayoutGrid cards={bottomCards} showDescriptions={true} />
              <style
                dangerouslySetInnerHTML={{
                  __html: `
                    @media (min-width: 768px) {
                        #bottom-industries-grid > .grid {
                            grid-template-columns: repeat(4, minmax(0, 1fr));
                        }
                        
                        #bottom-industries-grid > .grid {
                            padding-top: 1.5%;
                            padding-bottom: 0%;
                        }
                    }
                `,
                }}
              />
            </div>
          </div>

          <CTA />
        </div>

        <Footer />
      </section>
    </>
  );
}
