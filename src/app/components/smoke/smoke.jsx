"use client";

import { useEffect, useRef } from "react";

export default function Smoke({ className = "", zIndex = 20 }) {
  const smokeRef = useRef(null);

  useEffect(() => {
    const container = smokeRef.current;
    if (!container) return;

    function spawn(x, y) {
      const el = document.createElement("div");
      el.className = "smoke-elem";
      el.style.left = `${x - 25}px`;
      el.style.top = `${y - 25}px`;
      container.appendChild(el);
      el.addEventListener("animationend", () => {
        if (el.parentNode) el.parentNode.removeChild(el);
      });
    }

    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spawn(x, y);
    };

    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      <div
        ref={smokeRef}
        className={`smoke-layer hidden lg:block ${className}`}
        style={{ zIndex }}
      ></div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .smoke-layer {
                position: absolute;
                inset: 0;
                pointer-events: none;
                overflow: hidden;
            }

            .smoke-layer .smoke-elem {
                position: absolute;
                width: 50px;
                height: 50px;
                background: radial-gradient(circle,rgba(53, 160, 214, 0.14) 0%, rgba(0, 89, 255, 0) 80%);
                pointer-events: none;
                animation: ripple-cta 2s ease-out forwards;
            }

            @keyframes ripple-cta {
                0% {
                    transform: scale(3) translateY(0);
                    opacity: 1;
                }
                100% {
                    transform: scale(10) translateY(-10px);
                    opacity: 0;
                }
            }
          `,
        }}
      />
    </>
  );
}
