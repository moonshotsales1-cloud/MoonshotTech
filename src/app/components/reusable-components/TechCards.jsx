"use client";

import Image from "next/image";
import { useState } from "react";

// ─── Card size constants ──────────────────────────────────────────────────────
const NORMAL_W = 190;
const NORMAL_H = 190;
const HOVER_W = 300;
const HOVER_H = 300;
// ─────────────────────────────────────────────────────────────────────────────

export default function TechCard({
  /**
   * Customisable props:
   * • imageSrc      — path to the logo/icon image
   * • imageAlt      — accessible alt text
   * • imageSize     — logo pixel size at rest (default 54)
   * • hoverSize     — logo pixel size when hovered (default 80)
   * • cardBg        — card background colour (default "#0d0d0d")
   * • beforeBg      — colour of the inner bottom-glow
   * • afterBg       — colour of the outer diffuse glow below the card
   * • boxShadow     — full shadow override
   * • accentColor   — drives beforeBg, afterBg and boxShadow when not set individually
   */
  imageSrc,
  imageAlt = "",
  heading, // custom label shown below the card; supports <br /> via HTML string
  imageSize = 54,
  hoverSize = 150,
  cardBg = "#0d0d0d",
  accentColor = "#f90",
  beforeBg,
  afterBg,
  boxShadow,
}) {
  const [hovered, setHovered] = useState(false);

  const glowColor = beforeBg ?? accentColor;
  const shadowGlow = afterBg ?? accentColor;
  const shadow =
    boxShadow ??
    `0 -1.5px 13.3px -0.75px ${accentColor} inset, 0 0 9px 0 rgba(255,255,255,0.1)`;

  const w = hovered ? HOVER_W : NORMAL_W;
  const h = hovered ? HOVER_H : NORMAL_H;

  // Push card down by half the height gained so the top edge stays pinned
  const extraH = (HOVER_H - NORMAL_H) / 2;
  const marginTop = hovered ? `${extraH}px` : "0px";

  const easing = "cubic-bezier(0.34, 1.2, 0.64, 1)";
  const dur = "0.65s";
  const cardTransition = [
    `width ${dur} ${easing}`,
    `height ${dur} ${easing}`,
    `margin-top ${dur} ${easing}`,
    `box-shadow ${dur} ease`,
  ].join(", ");

  const logoW = hovered ? hoverSize : imageSize;
  const logoH = hovered ? hoverSize : imageSize;
  const logoTransition = `width ${dur} ${easing}, height ${dur} ${easing}`;

  return (
    <>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group"
        style={{
          position: "relative",
          width: `${w}px`,
          height: `${h}px`,
          marginTop,
          borderRadius: "1.87em",
          background: cardBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: hovered
            ? `0 -1.5px 22px -0.75px ${accentColor} inset, 0 0 28px 4px ${accentColor}55`
            : shadow,
          overflow: "visible",
          flexShrink: 0,
          transition: cardTransition,
          zIndex: hovered ? 10 : 1,
          cursor: "pointer",
        }}
      >
        {/* Clipping wrapper — keeps inner glow contained within card shape */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "1.87em",
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          {/* Top centre glow */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "0%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "20%",
              height: "50%",
              borderRadius: "50%",
              background: glowColor,
              filter: "blur(28px)",
              opacity: hovered ? 0.75 : 0.55,
              transition: `opacity ${dur} ease`,
            }}
          />

          {/* Bottom glow */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "-10%",
              left: "10%",
              width: "80%",
              height: "20%",
              borderRadius: "50%",
              background: glowColor,
              filter: "blur(28px)",
              opacity: hovered ? 0.75 : 0.55,
              transition: `opacity ${dur} ease`,
            }}
          />
        </div>

        {/* Logo — width/height animated directly, no transform */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full"
            style={{
              display: "block",
              objectFit: "contain",
              width: `${logoW}px`,
              height: `${logoH}px`,
              transition: logoTransition,
            }}
          />
        </div>

        {/* Outer diffuse glow below card edge */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: hovered ? "-22px" : "-14px",
            left: "15%",
            width: "70%",
            height: "28px",
            borderRadius: "50%",
            background: shadowGlow,
            filter: "blur(18px)",
            opacity: hovered ? 0.50  : 0.45,
            transition: `opacity ${dur} ease, bottom ${dur} ease`,
            pointerEvents: "none",
          }}
        />
      </div>

      {heading && (
        <h2
          className="mt-6 text-xl text-center transition-opacity duration-300 ease-in-out"
          style={{ opacity: hovered ? 0 : 1 }}
          dangerouslySetInnerHTML={{ __html: heading }}
        />
      )}
      {imageAlt && (
        <p
          className="text-xl text-center mt-6 transition-opacity duration-300 ease-in-out"
          style={{ opacity: hovered ? 0 : 1 }}
        >
          {imageAlt}
        </p>
      )}
    </>
  );
}
