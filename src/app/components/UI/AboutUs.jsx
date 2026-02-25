"use client";

import ScrollReveal from "@/components/lightswind/scroll-reveal";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import AboutUsCards from "../AboutUsCards";
import { ArrowRight } from "lucide-react";
import Button from "../button/button";
import Smoke from "../smoke/smoke";
import SectionTitle from "../reusable-components/SectionTitle";
import HeroTitle from "../hero-title";

const AboutUs = () => {
  const smokeRef = useRef(null);

  useEffect(() => {
    const container = smokeRef.current;
    if (!container) return;

    function spawn(x, y) {
      const el = document.createElement("div");
      el.className = "elem";
      el.style.left = `${x - 25}px`;
      el.style.top = `${y - 25}px`;
      container.appendChild(el);
      el.addEventListener("animationend", () => {
        if (el.parentNode) el.parentNode.removeChild(el);
      });
    }

    const interval = setInterval(() => {
      const rect = container.getBoundingClientRect();
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      spawn(x, y);
      while (container.children.length > 30) {
        container.removeChild(container.firstChild);
      }
    }, 700);

    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spawn(x, y);
    };

    window.addEventListener("mousemove", onMove);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section
      id="about-us"
      className="relative isolate w-full bg-[#00060b] -mt-15 pt-15 z-10 overflow-hidden"
    >
      <Smoke />

      <div className="px-[5em] max-lg:px-[3em] max-md:px-[2em] pt-16 md:pt-24 pb-20 1280:pb-30 1366:pb-40 1600:pb-56">
        <div className="1366:pb-16 1600:pb-24 lg:flex lg:items-start">
          {/* Small "About Us" label */}
          <div className="max-md:mb-10 lg:mr-40 1366:mr-50 1600:mr-60">
            <HeroTitle title="About Moonshot" />
          </div>

          <div className="-mt-7">
            {/* Heading */}
            <h2
              id="about-us-index-scroll-reveal"
              className="tracking-[-0.03em] font-normal font-poppins"
            >
              <ScrollReveal enableBlur={false}>
                Moonshot Tech shapes brand presence and builds strategic digital
                systems for ambitious brands using data, design, and disciplined
                execution across modern channels.
              </ScrollReveal>
              <style
                dangerouslySetInnerHTML={{
                  __html: `
                    #about-us-index-scroll-reveal p {
                      font-size: 42px;
                      line-height: 145%;
                      width: 95%;
                    }
                    @media screen and (max-width: 1600px) {
                        #about-us-index-scroll-reveal p {
                           font-size: 40px;
                        }
                    }
                    @media screen and (max-width: 1440px) {
                        #about-us-index-scroll-reveal p {
                           font-size: 35px;
                        }
                    }
                    @media screen and (max-width: 1366px) {
                        #about-us-index-scroll-reveal p {
                           font-size: 33px;
                        }
                    }
                    @media screen and (max-width: 1024px) {
                        #about-us-index-scroll-reveal p {
                           font-size: 24px;
                        }
                    }
                    @media screen and (max-width: 767px) {
                        #about-us-index-scroll-reveal p {
                           text-align: center;
                        }
                    }
                  `,
                }}
              />
            </h2>

            <div className="hidden md:block max-lg:mb-6 1440:mt-8">
              <Button text="Learn More About" href="/about-us" />
            </div>
          </div>
        </div>

        <AboutUsCards />

        <div className="md:hidden flex justify-center mt-16">
          <Button text="Learn More About" href="/about-us" />
        </div>
      </div>
      {/* Glow ellipse below cards */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-[95%] h-37.5 rounded-t-full blur-[80px] in-out"
            style={{
              background:
                "linear-gradient(119deg, rgba(57, 40, 255, 0.80) 14.54%, rgba(250, 40, 242, 0.80) 41.09%, rgba(35, 141, 250, 0.80) 55.83%, rgba(62, 95, 249, 0.80) 80.08%), linear-gradient(119deg, rgba(255, 198, 40, 0.80) 14.54%, rgba(250, 40, 137, 0.80) 41.09%, rgba(35, 141, 250, 0.80) 55.83%, rgba(62, 95, 249, 0.80) 80.08%)",
              backgroundSize: "200% 100%, 200% 100%",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
