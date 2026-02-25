"use client";

import React, {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
} from "react";
import { gsap } from "gsap";
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  ChevronsDown,
} from "lucide-react";
import Link from "next/link";
import Button from "@/app/components/button/button";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";

export const StaggeredMenu = ({
  position = "right",
  colors = ["#B19EEF", "#5227FF"],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl = "/src/assets/logos/reactbits-gh-white.svg",
  menuButtonColor = "#fff",
  isFixed = true,
  accentColor = "#5227FF",
  onMenuOpen,
  onMenuClose,
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const [expandedItem, setExpandedItem] = useState(null);

  const panelRef = useRef(null);
  const preLayersRef = useRef(null);
  const preLayerElsRef = useRef([]);

  const iconRef = useRef(null);
  const burgerTopRef = useRef(null);
  const burgerMidRef = useRef(null);
  const burgerBotRef = useRef(null);

  const textInnerRef = useRef(null);
  const textWrapRef = useRef(null);
  const [textLines, setTextLines] = useState(["Menu", "Close"]);

  const openTlRef = useRef(null);
  const closeTweenRef = useRef(null);
  const spinTweenRef = useRef(null);
  const textCycleAnimRef = useRef(null);
  const colorTweenRef = useRef(null);

  const toggleBtnRef = useRef(null);
  const busyRef = useRef(false);

  const itemEntranceTweenRef = useRef(null);

  // --- NEW: Lock body scrolling when menu is open ---
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup in case component unmounts while open
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  // ---------------------------------------------------

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;

      const icon = iconRef.current;
      const burgerTop = burgerTopRef.current;
      const burgerMid = burgerMidRef.current;
      const burgerBot = burgerBotRef.current;
      const textInner = textInnerRef.current;

      if (
        !panel ||
        !icon ||
        !burgerTop ||
        !burgerMid ||
        !burgerBot ||
        !textInner
      )
        return;

      let preLayers = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll(".sm-prelayer"));
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === "left" ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen });

      gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });
      gsap.set([burgerTop, burgerMid, burgerBot], {
        transformOrigin: "50% 50%",
      });
      gsap.set(burgerTop, { y: -5, rotate: 0 });
      gsap.set(burgerMid, { opacity: 1, scaleX: 1 });
      gsap.set(burgerBot, { y: 5, rotate: 0 });

      gsap.set(textInner, { yPercent: 0 });

      if (toggleBtnRef.current)
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll(".sm-panel-itemLabel"));
    const chevronEls = Array.from(panel.querySelectorAll(".sm-chevron-icon"));
    const numberEls = Array.from(
      panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item"),
    );
    const socialTitle = panel.querySelector(".sm-socials-title");
    const socialLinks = Array.from(panel.querySelectorAll(".sm-socials-link"));

    const layerStates = layers.map((el) => ({
      el,
      start: Number(gsap.getProperty(el, "xPercent")),
    }));
    const panelStart = Number(gsap.getProperty(panel, "xPercent"));

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (chevronEls.length)
      gsap.set(chevronEls, { opacity: 0, scale: 0, rotation: 270 });
    if (numberEls.length) gsap.set(numberEls, { ["--sm-num-opacity"]: 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(
        ls.el,
        { xPercent: ls.start },
        { xPercent: 0, duration: 0.5, ease: "power4.out" },
        i * 0.07,
      );
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: "power4.out" },
      panelInsertTime,
    );

    if (itemEls.length) {
      const itemsStartRatio = 0.15;
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;

      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: "power4.out",
          stagger: { each: 0.1, from: "start" },
        },
        itemsStart,
      );

      if (chevronEls.length) {
        tl.to(
          chevronEls,
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            stagger: { each: 0.1, from: "start" },
          },
          itemsStart + 0.3,
        );
      }

      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.6,
            ease: "power2.out",
            ["--sm-num-opacity"]: 1,
            stagger: { each: 0.08, from: "start" },
          },
          itemsStart + 0.1,
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;

      if (socialTitle)
        tl.to(
          socialTitle,
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          socialsStart,
        );
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
            stagger: { each: 0.08, from: "start" },
            onComplete: () => gsap.set(socialLinks, { clearProps: "opacity" }),
          },
          socialsStart + 0.04,
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, []);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback("onComplete", () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all = [...layers, panel];
    closeTweenRef.current?.kill();

    const offscreen = position === "left" ? -100 : 100;

    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: () => {
        const itemEls = Array.from(
          panel.querySelectorAll(".sm-panel-itemLabel"),
        );
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });

        const numberEls = Array.from(
          panel.querySelectorAll(
            ".sm-panel-list[data-numbering] .sm-panel-item",
          ),
        );
        if (numberEls.length) gsap.set(numberEls, { ["--sm-num-opacity"]: 0 });

        const chevronEls = Array.from(
          panel.querySelectorAll(".sm-chevron-icon"),
        );
        if (chevronEls.length)
          gsap.set(chevronEls, { opacity: 0, scale: 0, rotation: -90 });

        const socialTitle = panel.querySelector(".sm-socials-title");
        const socialLinks = Array.from(
          panel.querySelectorAll(".sm-socials-link"),
        );
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

        busyRef.current = false;
      },
    });
  }, [position]);

  const animateIcon = useCallback((opening) => {
    const icon = iconRef.current;
    const top = burgerTopRef.current;
    const mid = burgerMidRef.current;
    const bot = burgerBotRef.current;
    if (!icon || !top || !mid || !bot) return;

    spinTweenRef.current?.kill();

    if (opening) {
      gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .to(top, { y: 0, rotate: 45, duration: 0.35 }, 0)
        .to(bot, { y: 0, rotate: -45, duration: 0.35 }, 0)
        .to(mid, { opacity: 0, scaleX: 0.6, duration: 0.2 }, 0);
    } else {
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: "power3.inOut" } })
        .to(top, { y: -5, rotate: 0, duration: 0.25 }, 0)
        .to(bot, { y: 5, rotate: 0, duration: 0.25 }, 0)
        .to(mid, { opacity: 1, scaleX: 1, duration: 0.2 }, 0)
        .to(icon, { rotate: 0, duration: 0.001 }, 0);
    }
  }, []);

  const animateColor = useCallback((opening) => {
    const btn = toggleBtnRef.current;
    if (!btn) return;
    colorTweenRef.current?.kill();
    // Always keep white color
    gsap.set(btn, { color: "white" });
  }, []);

  React.useEffect(() => {
    if (toggleBtnRef.current) {
      // Always keep white color
      gsap.set(toggleBtnRef.current, { color: "white" });
    }
  }, []);

  const animateText = useCallback((opening) => {
    const inner = textInnerRef.current;
    if (!inner) return;

    textCycleAnimRef.current?.kill();

    const currentLabel = opening ? "Menu" : "Close";
    const targetLabel = opening ? "Close" : "Menu";
    const cycles = 3;

    const seq = [currentLabel];
    let last = currentLabel;
    for (let i = 0; i < cycles; i++) {
      last = last === "Menu" ? "Close" : "Menu";
      seq.push(last);
    }
    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);

    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });

    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;

    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + lineCount * 0.07,
      ease: "power4.out",
    });
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);

    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
      setExpandedItem(null);
    }

    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [
    playOpen,
    playClose,
    animateIcon,
    animateColor,
    animateText,
    onMenuOpen,
    onMenuClose,
  ]);

  // Click outside handler
  useLayoutEffect(() => {
    if (!open) return;

    const handleClickOutside = (e) => {
      const panel = panelRef.current;
      const toggleBtn = toggleBtnRef.current;

      if (!panel || !toggleBtn) return;

      // Check if click is outside both the panel and toggle button
      if (!panel.contains(e.target) && !toggleBtn.contains(e.target)) {
        toggleMenu();
      }
    };

    const handleScrollOutside = (e) => {
      const panel = panelRef.current;
      const toggleBtn = toggleBtnRef.current;
      if (!panel || !toggleBtn) return;

      const target = e.target;
      // If the scroll/wheel/touchmove started inside panel or toggle button, ignore
      if (panel.contains(target) || toggleBtn.contains(target)) return;

      // Only close on downward wheel scroll; for touchmove just close
      if (e.type === "wheel") {
        if (e.deltaY && e.deltaY > 0) toggleMenu();
      } else {
        toggleMenu();
      }
    };

    // Add listeners after a small delay to avoid immediate trigger from the opening click
    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("wheel", handleScrollOutside, {
        passive: true,
      });
      document.addEventListener("touchmove", handleScrollOutside, {
        passive: true,
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("wheel", handleScrollOutside);
      document.removeEventListener("touchmove", handleScrollOutside);
    };
  }, [open, toggleMenu]);

  return (
    <div
      className={`sm-scope z-10 ${
        isFixed
          ? "fixed top-0 left-0 w-screen h-screen overflow-hidden"
          : "w-full h-full"
      }`}
    >
      <div
        className={
          (className ? className + " " : "") +
          "staggered-menu-wrapper relative w-full h-full"
        }
        style={accentColor ? { ["--sm-accent"]: accentColor } : undefined}
        data-position={position}
        data-open={open || undefined}
      >
        <div
          ref={preLayersRef}
          className="sm-prelayers fixed top-0 left-0 w-screen h-screen pointer-events-none z-5"
          aria-hidden="true"
        >
          {(() => {
            const raw =
              colors && colors.length
                ? colors.slice(0, 4)
                : ["#1e1e22", "#35353c"];
            let arr = [...raw];
            if (arr.length >= 3) {
              const mid = Math.floor(arr.length / 2);
              arr.splice(mid, 1);
            }
            return arr.map((c, i) => (
              <div
                key={i}
                className="sm-prelayer absolute top-0 right-0 h-full w-full translate-x-0"
                style={{ background: c }}
              />
            ));
          })()}
        </div>

        <header
          className="staggered-menu-header absolute top-0 left-0 w-full flex items-center justify-between py-[2em] px-[5em] max-lg:px-[3em] max-md:px-[2em] bg-transparent pointer-events-none"
          aria-label="Main navigation header"
        >
          <div className="flex justify-center items-center gap-6">
            <button
              ref={toggleBtnRef}
              className="sm-toggle relative z-100 inline-flex items-center gap-4 md:bg-[#2626264D] pl-1 md:pl-2 pr-3 md:pr-8 py-0 md:py-1.5 1440:py-2.5 border border-white/20 rounded-full cursor-pointer text-white font-medium leading-none overflow-visible pointer-events-auto hover:border-white/40 transition-all duration-300 md:backdrop-blur-sm"
              style={{
                color: "white",
                fontFamily: "var(--font-sora), sans-serif",
              }}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="staggered-menu-panel"
              onClick={toggleMenu}
              type="button"
            >
              <span
                ref={iconRef}
                className="sm-icon relative shrink-0 inline-flex items-center justify-center will-change-transform"
                aria-hidden="true"
              >
                <span className="max-md:-ml-7.5 relative grid place-items-center w-10 h-10 max-1440:w-9 max-1440:h-9 max-lg:w-8 max-lg:h-8 max-sm:w-6 max-sm:h-6 rounded-full md:bg-[#494949]">
                  <span
                    ref={burgerTopRef}
                    className="absolute left-1/2 top-1/2 h-0.5 w-5 max-1440:w-4.5 max-lg:w-4 max-sm:w-3.5 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[2px] will-change-transform"
                  />
                  <span
                    ref={burgerMidRef}
                    className="absolute left-1/2 top-1/2 h-0.5 w-5 max-1440:w-4.5 max-lg:w-4 max-sm:w-3.5 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[2px] will-change-transform"
                  />
                  <span
                    ref={burgerBotRef}
                    className="absolute left-1/2 top-1/2 h-0.5 w-5 max-1440:w-4.5 max-lg:w-4 max-sm:w-3.5 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[2px] will-change-transform"
                  />
                </span>
              </span>

              <span
                ref={textWrapRef}
                className="hidden sm-toggle-textWrap relative md:inline-block h-[1em] overflow-hidden whitespace-nowrap text-xs sm:text-sm md:text-base lg:text-xs 1280:text-sm 1366:text-base 1440:text-lg 1600:text-xl"
                aria-hidden="true"
              >
                <span
                  ref={textInnerRef}
                  className="sm-toggle-textInner flex flex-col leading-none"
                >
                  {textLines.map((l, i) => (
                    <span
                      className="sm-toggle-line block h-[1em] leading-none"
                      key={i}
                    >
                      {l}
                    </span>
                  ))}
                </span>
              </span>
            </button>

            <Link
              className="font-sora hidden lg:flex text-sm md:text-base lg:text-xs 1280:text-sm 1366:text-base 1440:text-lg 1600:text-xl text-[#BBBBBB] underline text-nowrap hover:text-white ml-5 transition-colors"
              href="tel:+19723315058"
            >
              +1-972-331-5058
            </Link>
          </div>

          {/* <Link className="relative items-center" aria-label="Logo" href="/">
            <img
              src={logoUrl || "/src/assets/logos/reactbits-gh-white.svg"}
              alt="Logo"
              className="sm-logo-img block h-12 md:h-15 1366:h-17 1440:h-20 w-auto object-contain hover:scale-105 transition-transform duration-300"
              draggable={false}
              width={100}
              height={100}
            />
          </Link> */}

          <Link
            className="absolute top-7.5 left-1/2 transform -translate-x-1/2 z-10"
            aria-label="Logo"
            href="/"
          >
            <img
              src={logoUrl || "/src/assets/logos/reactbits-gh-white.svg"}
              alt="Logo"
              className="sm-logo-img block h-12 md:h-15 lg:h-13 1366:h-17 1440:h-20 w-auto object-contain hover:scale-105 transition-transform duration-300"
              draggable={false}
              width={100}
              height={100}
            />
          </Link>

          <div className="hidden lg:flex items-center gap-4 pointer-events-auto">
            <button>
              <Link
                href="/portfolio"
                className="inline-flex group items-center gap-3 1440:gap-6 rounded-full bg-[#041426] hover:bg-[#D42290] pr-1.5 pl-5 1440:pl-8 py-1.5 text-white/90 transition-all duration-300"
              >
                <span className="relative top-[0.5px] font-sora text-sm md:text-base lg:text-xs 1280:text-sm 1366:text-base 1440:text-lg 1600:text-xl whitespace-nowrap">
                  Our Works
                </span>
                <span className="grid place-items-center rounded-full bg-[#333333] group-hover:bg-white p-1.5 1366:p-3">
                  <ChevronRight className="w-6 h-6 group-hover:text-black" />
                </span>
              </Link>
            </button>

            <button className="relative z-20">
              <Link
                href="/contact-us"
                className="group border border-[#979797] inline-flex items-center gap-3 1440:gap-5 rounded-full bg-[#041426] hover:bg-[#D42290] pr-1.5 pl-5 1440:pl-8 py-1.5 text-white/90 ring-1 ring-white/15 transition hover:ring-white/30"
              >
                <span className="text-nowrap relative top-[0.5px] font-sora text-sm md:text-base lg:text-xs 1280:text-sm 1366:text-base 1440:text-lg 1600:text-xl">
                  Let's Talk
                </span>
                <span className="grid place-items-center rounded-full bg-[#D42290] group-hover:bg-white p-1.5 1366:p-3">
                  <LiaLongArrowAltRightSolid className="w-5 h-5 1366:w-6 1366:h-6 group-hover:text-black" />
                </span>
              </Link>
            </button>

            {/* <Button text="Let's Talk" href="/contact-us" /> */}
          </div>
        </header>

        <aside
          id="staggered-menu-panel"
          ref={panelRef}
          className="staggered-menu-panel absolute top-0 left-0 w-full h-dvh bg-black flex flex-col p-[6em_2em_2em_2em] overflow-y-auto overscroll-contain z-10 backdrop-blur-md"
          style={{
            WebkitBackdropFilter: "blur(12px)",
            fontFamily: "var(--font-sora), sans-serif",
          }}
          aria-hidden={!open}
        >
          {/* Full-screen backdrop overlay */}
          {open && (
            <div
              className="fixed inset-0 bg-black z-[-1]"
              onClick={toggleMenu}
            />
          )}
          <div className="mt-10 sm-panel-inner flex-1 flex flex-col gap-5">
            <ul
              className="sm-panel-list list-none m-0 p-0 flex flex-col gap-2"
              role="list"
              data-numbering={displayItemNumbering || undefined}
            >
              {items && items.length ? (
                items.map((it, idx) => (
                  <li
                    className="sm-panel-itemWrap relative overflow-hidden leading-none"
                    key={it.label + idx}
                  >
                    {it.hasDropdown ? (
                      <div className="flex flex-col items-start">
                        <button
                          onClick={() =>
                            setExpandedItem(expandedItem === idx ? null : idx)
                          }
                          className="sm-panel-item relative text-white font-semibold text-4xl 480:text-[clamp(2.5rem,4vw,3.5rem)] cursor-pointer leading-none tracking-[-2px] uppercase transition-[background,color] duration-150 ease-linear inline-block no-underline pr-[1.4em] bg-transparent border-0"
                          data-index={idx + 1}
                        >
                          <span className="sm-panel-itemLabel inline-block origin-[50%_100%] will-change-transform">
                            {it.label}
                          </span>
                          <ChevronDown
                            className="sm-chevron-icon inline-block ml-2 w-12 h-12 -mt-2"
                            style={{
                              transform:
                                expandedItem === idx
                                  ? "rotate(360deg)"
                                  : "rotate(270deg)",
                              transition: "transform 0.3s ease",
                            }}
                          />
                        </button>
                        {expandedItem === idx && it.dropdownItems && (
                          <ul className="list-none m-0 pl-8 mt-4 flex flex-col gap-2">
                            {it.dropdownItems.map((dropItem, dropIdx) => (
                              <li key={dropItem.label + dropIdx}>
                                <Link
                                  href={dropItem.link}
                                  className="text-white/80 hover:text-(--sm-accent,#ff0000) text-lg leading-relaxed font-light transition-colors duration-200"
                                >
                                  {dropItem.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <Link
                        className="sm-panel-item relative font-semibold text-4xl 480:text-[clamp(2.5rem,4vw,3.5rem)] cursor-pointer leading-none tracking-[-2px] uppercase transition-[background,color] duration-150 ease-linear inline-block no-underline pr-[1.4em]"
                        href={it.link}
                        aria-label={it.ariaLabel}
                        data-index={idx + 1}
                      >
                        <span className="sm-panel-itemLabel inline-block origin-[50%_100%] will-change-transform">
                          {it.label}
                        </span>
                      </Link>
                    )}
                  </li>
                ))
              ) : (
                <li
                  className="sm-panel-itemWrap relative overflow-hidden leading-none"
                  aria-hidden="true"
                >
                  <span className="sm-panel-item relative text-white font-semibold text-[clamp(2rem,4vw,3.5rem)] md:text-[clamp(3rem,4vw,3.5rem)] cursor-pointer leading-none tracking-[-2px] uppercase transition-[background,color] duration-150 ease-linear inline-block no-underline pr-[1.4em]">
                    <span className="sm-panel-itemLabel inline-block origin-[50%_100%] will-change-transform">
                      No items
                    </span>
                  </span>
                </li>
              )}
            </ul>

            {/* Mobile/Tablet CTA buttons - visible only below lg */}
            <div className="mt-4 block lg:hidden space-y-4">
              <Link
                className="sm-panel-item relative font-semibold text-4xl 480:text-[clamp(2.5rem,4vw,3.5rem)] cursor-pointer leading-none tracking-[-2px] uppercase transition-[background,color] duration-150 ease-linear inline-block no-underline pr-[1.4em]"
                href="/portfolio"
              >
                <span className="underline sm-panel-itemLabel inline-block origin-[50%_100%] will-change-transform">
                  Our Works
                </span>
              </Link>

              <div className="block lg:hidden">
                <Link
                  className="sm-panel-item relative font-semibold text-4xl 480:text-[clamp(2.5rem,4vw,3.5rem)] cursor-pointer leading-none tracking-[-2px] uppercase transition-[background,color] duration-150 ease-linear inline-block no-underline pr-[1.4em]"
                  href="/contact-us"
                >
                  <span className="underline sm-panel-itemLabel inline-block origin-[50%_100%] will-change-transform">
                    Let's Talk
                  </span>
                </Link>
              </div>
            </div>

            {displaySocials && socialItems && socialItems.length > 0 && (
              <div
                className="sm-socials md:mt-auto pt-2 md:pt-8 flex flex-col gap-3"
                aria-label="Social links"
              >
                <h3 className="sm-socials-title m-0 text-base font-medium text-(--sm-accent,#ff0000)">
                  Socials
                </h3>
                <ul
                  className="sm-socials-list list-none m-0 p-0 flex flex-row items-center gap-4 flex-wrap"
                  role="list"
                >
                  {socialItems.map((s, i) => (
                    <li key={s.label + i} className="sm-socials-item">
                      <a
                        href={s.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sm-socials-link text-[1.2rem] font-medium text-[#111] no-underline relative inline-block py-0.5 transition-[color,opacity] duration-300 ease-linear"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>
      <style>
        {`
.sm-scope .staggered-menu-wrapper { position: relative; width: 100%; height: 100%; z-index: 40; }
.sm-scope .staggered-menu-header { position: absolute; top: 0; left: 0; width: 100%; display: flex; align-items: center; justify-content: space-between; background: transparent; pointer-events: none; }
.sm-scope .staggered-menu-header > * { pointer-events: auto; }
.sm-scope .sm-logo { display: flex; align-items: center; user-select: none; }
.sm-scope .sm-logo-img { display: block; width: auto; object-fit: contain; }
.sm-scope .sm-toggle { position: relative; display: inline-flex; align-items: center; gap: 1rem; border: none; cursor: pointer; color: #e9e9ef; font-weight: 400; line-height: 1; overflow: visible; }
.sm-scope .sm-toggle:focus-visible { outline: 2px solid #ffffffaa; outline-offset: 4px; border-radius: 4px; }
.sm-scope .sm-line:last-of-type { margin-top: 6px; }
.sm-scope .sm-toggle-textWrap { position: relative; height: 1em; overflow: hidden; white-space: nowrap; width: var(--sm-toggle-width, auto); min-width: var(--sm-toggle-width, auto); }
.sm-scope .sm-toggle-textInner { display: flex; flex-direction: column; line-height: 1; }
.sm-scope .sm-toggle-line { display: block; height: 1em; line-height: 1; }
.sm-scope .sm-icon { position: relative; width: 40px; height: 40px; flex: 0 0 40px; display: inline-flex; align-items: center; justify-content: center; will-change: transform; }
.sm-scope .sm-panel-itemWrap { position: relative; overflow: hidden; line-height: 1; }
.sm-scope .sm-icon-line { position: absolute; left: 50%; top: 50%; width: 100%; height: 2px; background: currentColor; border-radius: 2px; transform: translate(-50%, -50%); will-change: transform; }
.sm-scope .sm-line { display: none !important; }
/* Changed overflow-y from visible to auto below */
.sm-scope .staggered-menu-panel { position: absolute; top: 0; right: 0; width: 500px; height: 100vh; background: rgba(0, 0, 0, 1); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); display: flex; flex-direction: column; padding: 6em 2em 2em 2em; overflow-y: auto; z-index: 10; }
.sm-scope [data-position='left'] .staggered-menu-panel { right: auto; left: 0; }
.sm-scope .sm-prelayers { position: absolute; top: 0; right: 0; bottom: 0; width: clamp(260px, 38vw, 420px); pointer-events: none; z-index: 5; }
.sm-scope [data-position='left'] .sm-prelayers { right: auto; left: 0; }
.sm-scope .sm-prelayer { position: absolute; top: 0; right: 0; height: 100%; width: 100%; transform: translateX(0); }
.sm-scope .sm-panel-inner { flex: 1; display: flex; flex-direction: column; gap: 1.25rem; }
.sm-scope .sm-socials { padding-top: 2rem; display: flex; flex-direction: column; gap: 0.75rem; }
.sm-scope .sm-socials-title { margin: 0; font-size: 1rem; font-weight: 500; color: var(--sm-accent, #ff0000); }
.sm-scope .sm-socials-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: row; align-items: center; gap: 1rem; flex-wrap: wrap; }
.sm-scope .sm-socials-list .sm-socials-link { opacity: 1; transition: opacity 0.3s ease; }
.sm-scope .sm-socials-list:hover .sm-socials-link:not(:hover) { opacity: 0.35; }
.sm-scope .sm-socials-list:focus-within .sm-socials-link:not(:focus-visible) { opacity: 0.35; }
.sm-scope .sm-socials-list .sm-socials-link:hover,
.sm-scope .sm-socials-list .sm-socials-link:focus-visible { opacity: 1; }
.sm-scope .sm-socials-link:focus-visible { outline: 2px solid var(--sm-accent, #ff0000); outline-offset: 3px; }
.sm-scope .sm-socials-link { font-size: clamp(1rem, 2.5vw, 1.2rem); font-weight: 500; color: #ffffff; text-decoration: none; position: relative; padding: 2px 0; display: inline-block; transition: color 0.3s ease, opacity 0.3s ease; font-family: var(--font-sora), sans-serif; }
.sm-scope .sm-socials-link:hover { color: var(--sm-accent, #ff0000); }
.sm-scope .sm-panel-title { margin: 0; font-size: 1rem; font-weight: 600; color: #fff; text-transform: uppercase; }
.sm-scope .sm-panel-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.5rem; }
.sm-scope .sm-panel-item { position: relative; color: #ffffff; font-weight: 600; cursor: pointer; line-height: 1; letter-spacing: -2px; text-transform: uppercase; transition: background 0.25s, color 0.25s; display: inline-block; text-decoration: none; padding-right: 1.4em; font-family: var(--font-sora), sans-serif; }
.sm-scope .sm-panel-itemLabel { display: inline-block; will-change: transform; transform-origin: 50% 100%; }
.sm-scope .sm-panel-item:hover { color: var(--sm-accent, #ff0000); }
.sm-scope .sm-panel-list[data-numbering] { counter-reset: smItem; }
@media (max-width: 1024px) { .sm-scope .staggered-menu-panel { width: auto; left: 0; right: 0; } }
      `}
      </style>
    </div>
  );
};

export default StaggeredMenu;
