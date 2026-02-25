"use client";

import React, { useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// --- PART 1: THE 3D PARTICLE COMPONENT ---
const HologramParticles = ({ url, isFinished }) => {
  const pointsRef = useRef();
  const [data, setData] = useState(null);
  const [scale, setScale] = useState(0.8);

  // Handle responsive scaling based on screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 480)
        setScale(0.3); // Mobile
      else if (width < 768)
        setScale(0.4); // Tablet
      else if (width < 1024)
        setScale(0.5); // Small Laptop
      else if (width < 1366)
        setScale(0.65); // Laptop
      else if (width < 1600)
        setScale(0.8); // Desktop (Overall size reduced)
      else setScale(1); // Desktop (Overall size reduced)
    };

    handleResize(); // Calculate initially on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = url;
    img.crossOrigin = "Anonymous";

    img.onload = () => {
      // Slightly reduced grid density for better mobile performance
      const width = 200;
      const canvas = document.createElement("canvas");
      const aspect = img.height / img.width;
      const height = Math.round(width * aspect);

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      const imgData = ctx.getImageData(0, 0, width, height).data;

      const positions = [];
      const colors = [];
      const targets = [];
      const randoms = [];

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const i = (y * width + x) * 4;
          const r = imgData[i] / 255;
          const g = imgData[i + 1] / 255;
          const b = imgData[i + 2] / 255;
          const a = imgData[i + 3];

          if (a > 20) {
            const brightness = (r + g + b) / 3;
            const tx = (x - width / 2) * 0.08;
            const ty = -(y - height / 2) * 0.08;
            const tz = brightness * 2;
            targets.push(tx, ty, tz);
            positions.push(
              (Math.random() - 0.5) * 60,
              (Math.random() - 0.5) * 60,
              (Math.random() - 0.5) * 60,
            );
            colors.push(r * 3, g * 3, b * 3);
            randoms.push(Math.random());
          }
        }
      }

      setData({
        positions: new Float32Array(positions),
        colors: new Float32Array(colors),
        targets: new Float32Array(targets),
        randoms: new Float32Array(randoms),
      });
    };
  }, [url]);

  useFrame((state) => {
    if (!pointsRef.current || !data) return;
    const positions = pointsRef.current.geometry.attributes.position.array;
    const targets = data.targets;
    const randoms = data.randoms;
    const time = state.clock.getElapsedTime();
    const lerpSpeed = 0.08;

    for (let i = 0; i < positions.length; i += 3) {
      if (isFinished) {
        const ix = i / 3;
        const rnd = randoms[ix];
        positions[i] += (rnd - 0.5) * 2.5;
        positions[i + 1] += (rnd - 0.5) * 2.5;
        positions[i + 2] += rnd * 4;
      } else {
        let tx = targets[i];
        let ty = targets[i + 1];
        let tz = targets[i + 2];
        if (Math.sin(time * 15 + ty) > 0.98) tx += (Math.random() - 0.5) * 0.5;
        positions[i] += (tx - positions[i]) * lerpSpeed;
        positions[i + 1] += (ty - positions[i + 1]) * lerpSpeed;
        positions[i + 2] += (tz - positions[i + 2]) * lerpSpeed;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    if (!isFinished) pointsRef.current.rotation.y = Math.sin(time * 0.5) * 0.15;
  });

  if (!data) return null;

  return (
    // Apply dynamic scale to the entire mesh
    <points ref={pointsRef} scale={[scale, scale, scale]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={data.positions.length / 3}
          array={data.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={data.colors.length / 3}
          array={data.colors}
          itemSize={3}
        />
      </bufferGeometry>

      {/* Scale the particle size dynamically so it doesn't look clumped on small screens */}
      <pointsMaterial
        size={0.25 * scale}
        vertexColors
        transparent
        opacity={1}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// --- PART 2: THE MAIN LOADER ---
const CyberHologramLoader = () => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // New State: Controls whether the component exists in the DOM at all
  const [shouldRender, setShouldRender] = useState(true);

  const IMAGE_URL = "/images/primary-logo.png";

  const TARGET_TEXT = "MOONSHOT";
  const [displayText, setDisplayText] = useState("X#9@?L%");
  const [codeLeft, setCodeLeft] = useState("INIT_001");
  const [codeRight, setCodeRight] = useState("0x0000");
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*";

  useEffect(() => {
    let interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 3) + 1;

        if (next >= 100) {
          clearInterval(interval);
          setDisplayText(TARGET_TEXT);

          // 1. Trigger Exit Animation
          setTimeout(() => {
            setIsFinished(true);

            // 2. NUCLEAR OPTION: Wait for animation to finish (1.5s), then KILL the component
            setTimeout(() => {
              setShouldRender(false);
            }, 1500);
          }, 600);

          return 100;
        }

        const totalChars = TARGET_TEXT.length;
        const charsToLock = Math.floor((next / 100) * totalChars);
        let newString = "";
        for (let i = 0; i < totalChars; i++) {
          if (i < charsToLock) {
            newString += TARGET_TEXT[i];
          } else {
            newString +=
              characters[Math.floor(Math.random() * characters.length)];
          }
        }
        setDisplayText(newString);
        return next;
      });
    }, 50);

    let codeInterval = setInterval(() => {
      setCodeLeft(`SYS_${Math.floor(Math.random() * 999)}`);
      setCodeRight(
        `0x${Math.floor(Math.random() * 16777215)
          .toString(16)
          .toUpperCase()}`,
      );
    }, 150);

    return () => {
      clearInterval(interval);
      clearInterval(codeInterval);
    };
  }, []);

  // FIX: If we shouldn't render, return null immediately.
  // This removes the <div> from the DOM completely.
  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-9999 flex flex-col font-mono pointer-events-none`}
    >
      {/* 3D BACKGROUND */}
      <div
        className={`absolute inset-0 z-0 bg-black transition-opacity duration-1000 ${isFinished ? "opacity-0" : "opacity-100"}`}
      >
        <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
          <ambientLight intensity={2} />
          <HologramParticles url={IMAGE_URL} isFinished={isFinished} />
        </Canvas>
      </div>

      {/* TOP SHUTTER */}
      <div
        className="absolute top-0 left-0 w-full h-1/2 bg-black/80 backdrop-blur-md flex items-end justify-center overflow-hidden border-b border-white/20 transition-transform duration-1000 ease-expo z-10"
        style={{
          transform: isFinished ? "translateY(-100%)" : "translateY(0%)",
          transitionDelay: "0.1s",
        }}
      >
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="-mb-7.5 sm:-mb-12.5 z-20 text-center px-4">
          <h1 className="text-[12vw] sm:text-[10vw] font-bold text-white leading-none tracking-tighter">
            {displayText}
          </h1>
        </div>
        <div className="absolute top-4 left-4 sm:top-10 sm:left-10 text-[10px] sm:text-xs text-green-500">
          {codeLeft} <br /> MEM_ALLOC: OK
        </div>
      </div>

      {/* BOTTOM SHUTTER */}
      <div
        className="absolute bottom-0 left-0 w-full h-1/2 bg-black/80 backdrop-blur-md flex items-start justify-center overflow-hidden border-t border-white/20 transition-transform duration-1000 ease-expo z-10"
        style={{
          transform: isFinished ? "translateY(100%)" : "translateY(0%)",
          transitionDelay: "0.1s",
        }}
      >
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="-mt-7.5 sm:-mt-12.5 z-20 text-center px-4">
          <h1 className="text-[12vw] sm:text-[10vw] font-bold text-white leading-none tracking-tighter opacity-0">
            {displayText}
          </h1>
          <div className="mt-10 sm:mt-20 flex flex-col items-center gap-2">
            <div className="h-1 w-48 sm:w-64 bg-gray-800">
              <div
                className="h-full bg-green-500 transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-[10px] sm:text-xs text-green-500">
              {progress}% COMPLETE
            </p>
          </div>
        </div>
        <div className="absolute bottom-4 right-4 sm:bottom-10 sm:right-10 text-[10px] sm:text-xs text-green-500 text-right">
          {codeRight} <br /> DOM_READY
        </div>
      </div>
    </div>
  );
};

export default CyberHologramLoader;
