"use client";

import React, { useRef, useMemo, isValidElement } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

const BR_TOKEN_REGEX = /<br\s*\/?\s*>/gi;

type TextToken =
  | { type: "text"; value: string }
  | { type: "br"; className?: string };

function normalizeChildrenToTokens(input: React.ReactNode): TextToken[] {
  if (input === null || input === undefined || typeof input === "boolean") return [];
  if (typeof input === "string") {
    const parts = input.split(BR_TOKEN_REGEX);
    const brCount = (input.match(BR_TOKEN_REGEX) || []).length;

    const tokens: TextToken[] = [];
    for (let i = 0; i < parts.length; i += 1) {
      if (parts[i]) tokens.push({ type: "text", value: parts[i] });
      if (i < brCount) tokens.push({ type: "br" });
    }
    return tokens;
  }
  if (typeof input === "number") return [{ type: "text", value: String(input) }];
  if (Array.isArray(input)) return input.flatMap(normalizeChildrenToTokens);
  if (isValidElement(input)) {
    if (input.type === "br") {
      const element = input as React.ReactElement<{ className?: string }>;
      return [{ type: "br", className: element.props?.className }];
    }

    const element = input as React.ReactElement<{ children?: React.ReactNode }>;
    return normalizeChildrenToTokens(element.props?.children);
  }
  return [{ type: "text", value: String(input) }];
}

export interface ScrollRevealProps {
  children: React.ReactNode;
  containerClassName?: string;
  textClassName?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  align?: "left" | "center" | "right";
  /** Initial opacity of the text (default: 1 for visible gray text) */
  baseOpacity?: number;
  /** Final opacity of the text */
  activeOpacity?: number;
  /** Initial text color (default: #808080) */
  baseColor?: string;
  /** Final text color (default: #ffffff) */
  activeColor?: string;
}

const sizeClasses = {
  sm: "text-sm lg:text-xs 1280:text-[13px] 1440:text-sm 1600:text-base 1920:text-lg",
  md: "text-lg 480:text-xl md:text-2xl 840:text-3xl lg:text-[clamp(30px,3vw,66px)]",
  lg: "text-5xl max-1600:text-[40px] max-2xl:text-[34px] max-1280:text-[30px] max-xl:text-[25px]",
  xl: "text-[clamp(16px,1.86vw,36px)]",
  "2xl": "text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
};

const alignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

// Sub-component for individual words
const Word = ({
  children,
  range,
  progress,
  baseOpacity,
  activeOpacity,
  baseColor,
  activeColor,
}: {
  children: string;
  range: [number, number];
  progress: MotionValue<number>;
  baseOpacity: number;
  activeOpacity: number;
  baseColor: string;
  activeColor: string;
}) => {
  // Map the specific word's scroll range to opacity and color
  const opacity = useTransform(progress, range, [baseOpacity, activeOpacity]);
  const color = useTransform(progress, range, [baseColor, activeColor]);

  return (
    <motion.span
      className="inline-block transition-colors duration-200"
      style={{ opacity, color }}
    >
      {children}
    </motion.span>
  );
};

export function ScrollReveal({
  children,
  containerClassName,
  textClassName,
  size = "lg",
  align = "left",
  baseOpacity = 1,
  activeOpacity = 1,
  baseColor = "#1C2E3D",
  activeColor = "#ffffff",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.25"],
  });

  const splitText = useMemo(() => {
    const tokens = normalizeChildrenToTokens(children);

    type SplitItem =
      | { kind: "word"; value: string; key: number }
      | { kind: "space"; value: string; key: number }
      | { kind: "br"; key: number; className?: string };

    const items: SplitItem[] = [];
    let key = 0;

    for (const token of tokens) {
      if (token.type === "br") {
        items.push({ kind: "br", key: key++, className: token.className });
        continue;
      }

      const parts = token.value.split(/(\s+)/);
      for (const part of parts) {
        if (!part) continue;
        if (/^\s+$/.test(part)) {
          items.push({ kind: "space", value: part, key: key++ });
        } else {
          items.push({ kind: "word", value: part, key: key++ });
        }
      }
    }

    return items;
  }, [children]);

  const totalWords = Math.max(
    1,
    splitText.filter((item) => item.kind === "word").length
  );

  let wordIndex = 0;

  return (
    <div
      ref={containerRef}
      className={cn("my-5", containerClassName)}
    >
      <p
        className={cn(
          "space-y-2",
          sizeClasses[size],
          alignClasses[align],
          textClassName
        )}
      >
        {splitText.map((item) => {
          if (item.kind === "space") {
            return <span key={`space-${item.key}`}>{item.value}</span>;
          }

          if (item.kind === "br") {
            return <br key={`br-${item.key}`} className={item.className} />;
          }

          const start = wordIndex / totalWords;
          const end = start + 1 / totalWords;
          wordIndex++;

          return (
            <Word
              key={`word-${item.key}`}
              range={[start, end]}
              progress={scrollYProgress}
              baseOpacity={baseOpacity}
              activeOpacity={activeOpacity}
              baseColor={baseColor}
              activeColor={activeColor}
            >
              {item.value}
            </Word>
          );
        })}
      </p>
    </div>
  );
}

export default ScrollReveal;