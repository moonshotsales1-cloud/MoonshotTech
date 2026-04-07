"use client";

import LiquidEther from "@/components/LiquidEther";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";

export default function CTA() {
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
    <section className="font-sora relative z-10 flex flex-col items-center justify-start overflow-hidden bg-[#00050A] pb-10 pt-20 lg:pt-36">
      {/* Left Gradient */}
      <div className="absolute -left-70 top-80 bottom-0 w-150 pointer-events-none">
        <div
          className="w-2/3 h-1/3"
          style={{
            background:
              "linear-gradient(119deg, rgba(255, 198, 40, 0.80) 14.54%, rgba(250, 40, 137, 0.80) 41.09%, rgba(35, 141, 250, 0.80) 55.83%, rgba(62, 95, 249, 0.80) 80.08%)",
            filter: "blur(150px)",
          }}
        />
      </div>

      {/* Right Gradient */}
      <div className="absolute -right-100 top-150 md:top-100 lg:top-200 bottom-0 w-120 lg:w-150 pointer-events-none">
        <div
          className="w-2/3 h-1/3"
          style={{
            background:
              "linear-gradient(119deg, rgba(255, 198, 40, 0.80) 14.54%, rgba(250, 40, 137, 0.80) 41.09%, rgba(35, 141, 250, 0.80) 55.83%, rgba(62, 95, 249, 0.80) 80.08%)",
            filter: "blur(150px)",
          }}
        />
      </div>

      {/* Heading */}
      <div className="text-center relative z-10">
        <p className="max-1366:mb-5 text-white/60 text-2xl 480:text-3xl md:text-[clamp(30px,2vw,80px)] lg:text-[clamp(30px,4vw,60px)] 1366:mb-4 tracking-tight font-sora font-light">
          Build With{" "}
        </p>
        <h2 className="text-white text-[50px] 480:text-[65px] md:text-[clamp(60px,6vw,138px)] lg:text-[clamp(50px,7vw,120px)] -mt-8 mb-2 font-medium tracking-tight leading-tight">
          <span
            className="block"
            style={{ fontFamily: "var(--font-sora), sans-serif" }}
          >
            <span
              className="italic"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Moonshot
            </span>
          </span>
        </h2>
      </div>

      <Image
        src="/images/elevate-icon.png"
        alt="Elevate Icon"
        width={100}
        height={100}
        className="w-30 max-1366:w-20 max-1600:w-25 relative z-10"
      />

      {/* Video container with outline */}
      <div
        className="relative py-12 max-lg:min-h-[50vh] max-1280:min-h-[65vh] max-1600:min-h-[75vh] min-h-[95vh] max-1440:max-w-[32.5%] max-1600:max-w-[30%] max-w-[35%] max-lg:max-w-[45%] max-sm:max-w-[70%] z-10 -mt-6 1366:-mt-10 flex items-center justify-center gradient-border"
        style={{
          borderRadius: "1333.3px",
          mixBlendMode: "screen",
        }}
      >
        <div className="flex flex-col items-center">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover rounded-full items-center overflow-visible"
          >
            <source src="/videos/cta-video.webm" type="video/webm" />
          </video>

          <p className="font-sora font-normal mt-12 text-center text-lg lg:text-xl 1366:text-2xl 1600:text-3xl leading-snug text-white/50">
            Connect with us at{" "}
            <span className="text-white">
              <br /> Moonshot Tech
            </span>
          </p>
        </div>
      </div>

      {/* Small prompt + button */}
      <div className="-mt-16 max-1440:-mt-14 max-sm:-mt-13 relative z-10 flex flex-col items-center">
        <Link href="/contact-us">
          <button
            type="button"
            className="hover:cursor-pointer mt-6 h-20 w-20 max-1440:w-16 max-1440:h-16 max-lg:w-12 max-lg:h-12 max-sm:h-12 max-sm:w-12 rounded-full bg-white text-black hover:text-white hover:bg-[#D42290] flex items-center justify-center shadow-lg hover:scale-105 rotate-320 hover:rotate-360 transition"
          >
            <LiaLongArrowAltRightSolid className="w-6 h-6 1600:w-10 1600:h-10" />
          </button>
        </Link>
      </div>

      {/* Bottom large background word/image */}
      <img
        src="/images/cta-unique.png"
        alt="Unique typography"
        className="w-full h-auto object-contain opacity-40 -mt-10 md:-mt-15 lg:-mt-26 1440:-mt-36 max-md:pt-15"
        draggable={false}
      />

      {/* Bottom large gradient */}
      <div className="max-sm:-mt-43 -mt-50 lg:-mt-53 1280:-mt-56 1366:-mt-60 1920:-mt-65 relative w-screen inset-0 flex items-center justify-center pointer-events-none z-50">
        <div
          className="max-lg:brightness-150 w-[95%] h-37.5 rounded-t-full blur-[80px] in-out max-md:relative max-md:top-25"
          style={{
            background:
              "linear-gradient(119deg, rgba(57, 40, 255, 0.80) 14.54%, rgba(250, 40, 137, 0.80) 41.09%, rgba(35, 141, 250, 0.80) 55.83%, rgba(62, 95, 249, 0.80) 80.08%), linear-gradient(119deg, rgba(255, 198, 40, 0.80) 14.54%, rgba(250, 40, 137, 0.80) 41.09%, rgba(35, 141, 250, 0.80) 55.83%, rgba(62, 95, 249, 0.80) 80.08%)",
            backgroundSize: "200% 100%, 200% 100%",
          }}
        />
      </div>
    </section>
  );
}
