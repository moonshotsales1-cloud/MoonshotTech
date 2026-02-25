"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import RotatingText from "@/components/RotatingText";
import TextType from "@/components/TextType";
import { PhoneCall, ArrowRight } from "lucide-react";
import { GoLocation } from "react-icons/go";
import CTA from "./CTA";
import Form from "./reusable-components/Form";
import SectionTitle from "./reusable-components/SectionTitle";

export default function FormCTA({
  ctaText = "Ready to take your triathlon performance to the next level? Reach out today and let's create a personalized training plan for you.",
  ctaHeading = "Have a Project",
  rotatingTexts = ["Idea?", "In Mind?", "To Discuss?"],
}) {
  const tags = [
    "UI/UX Design",
    "Website Development",
    "E-commerce",
    "Branding",
    "Web Applications",
    "Animations",
    "Mobile Applications",
    "SEO",
    "SMM",
    "Google Adwords",
    "Email Marketing",
    "Digital Marketing",
  ];

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
    <section className="bg-[#00050A] overflow-hidden">
      <div className="pt-10 lg:pt-15 1440:pt-25 rounded-[34.137px]">
        <div className="max-w-[80%] max-1600:max-w-[85%] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-16 lg:gap-6">
          {/* Left content */}
          <div className="text-center md:text-start lg:col-span-5">
            <div className="max-md:flex max-md:justify-center">
              <SectionTitle title="07 — Get in Touch" font="font-poppins" />
            </div>

            <h2 className="font-sora leading-tight text-white mb-6 block text-[clamp(40px,5vw,75px)] md:text-[clamp(55px,5vw,75px)] lg:text-[clamp(40px,4.2vw,65px)]">
              <span className="w-[98%] flex flex-col lg:max-4xl capitalize gap-x-4">
                {ctaHeading}{" "}
                <RotatingText
                  texts={rotatingTexts}
                  mainClassName="inline-block text-white overflow-hidden justify-center rounded-lg"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{
                    type: "spring",
                    damping: 30,
                    stiffness: 400,
                  }}
                  rotationInterval={3500}
                />{" "}
              </span>
            </h2>

            <div className="lg:max-w-lg text-[#989898] text-sm lg:text-xs 1280:text-[13px] 1440:text-sm 1600:text-base 1920:text-lg max-w-[95%] 1280:max-w-[85%] 1600:max-w-[90%] font-sora leading-relaxed tracking-widest mb-8">
              <TextType
                text={ctaText}
                typingSpeed={15}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
                startOnVisible={true}
                loop={true}
              />

              <div className="hidden w-full 1440:w-full lg:block h-[1.5px] bg-[#888] my-6 lg:my-8 1366:my-12" />
            </div>

            <div className="font-sora space-y-4 lg:space-y-6 1440:space-y-8 text-[clamp(14px,2vw,24px)] lg:text-[clamp(10px,1.4vw,20px)]">
              <div className="flex items-center max-md:justify-center gap-4">
                <PhoneCall className="w-10 h-10 max-lg:h-8 md:h-8 fill-white" />
                <Link href="tel:+19723315058" className="hover:underline">
                  +1-972-331-5058
                </Link>
              </div>

              <div className="flex items-center max-md:justify-center gap-4">
                <GoLocation className="w-10 h-10 max-lg:h-8 md:h-8" />
                <Link
                  href="https://share.google/nqL7znJrG0VweAWyG"
                  className="hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  1200 East Collins Boulevard <br /> Suite 106 Richardson Texas
                  75081
                </Link>
              </div>
            </div>
          </div>

          {/* Right form */}
          <Form />
        </div>
      </div>

      {/* Let's Start Section */}
      <CTA />
    </section>
  );
}
