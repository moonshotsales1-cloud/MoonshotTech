"use client";

import React, { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// The inner component that processes the image
const ParticleImage = ({ url, scale = 1.5 }) => {
  const pointsRef = useRef();

  const { positions, colors } = useMemo(() => {
    // Create an offscreen canvas to read pixel data
    const img = new Image();
    img.src = url;
    // Note: Ensure your image supports CORS if hosted externally
    img.crossOrigin = "Anonymous";

    // We return a promise-like structure or just default data until loaded
    // For simplicity in React, we'll use a synchronous-like pattern with logic inside onload
    // In a real app, use useLoader(TextureLoader) and read the texture.image
    
    // Placeholder data to prevent crash before load
    return { positions: new Float32Array(0), colors: new Float32Array(0) };
  }, [url]);

  // We need a robust way to load the image and process data.
  // We'll use a state to trigger re-render once data is processed.
  const [particleData, setParticleData] = React.useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = url;
    img.crossOrigin = "Anonymous";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      // Scale down image for performance (e.g., 200px wide)
      // Too many particles will lag
      const width = 200; 
      const aspectRatio = img.height / img.width;
      const height = Math.round(width * aspectRatio);
      
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      
      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;
      
      const pos = [];
      const col = [];
      
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const index = (y * width + x) * 4;
          const r = data[index] / 255;
          const g = data[index + 1] / 255;
          const b = data[index + 2] / 255;
          const a = data[index + 3];

          // Skip transparent pixels
          if (a < 20) continue;

          // Calculate brightness for Z-depth
          const brightness = (r + g + b) / 3;

          // Center the model
          const pX = (x - width / 2) * 0.05;
          const pY = -(y - height / 2) * 0.05; // Invert Y
          const pZ = brightness * 2; // Z based on brightness

          pos.push(pX, pY, pZ);
          col.push(r, g, b);
        }
      }

      setParticleData({
        positions: new Float32Array(pos),
        colors: new Float32Array(col)
      });
    };
  }, [url]);

  useFrame((state) => {
    if (pointsRef.current) {
        // Subtle rotation animation
        pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
        pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  if (!particleData) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleData.positions.length / 3}
          array={particleData.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleData.colors.length / 3}
          array={particleData.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation={true}
      />
    </points>
  );
};

// The wrapper component
const ImageTo3D = () => {
  return (
    <div className="w-full h-[600px] bg-black relative">
        <div className="absolute top-5 left-5 z-10 text-white font-sora">
            <h2 className="text-2xl font-bold">Image to 3D Particles</h2>
            <p className="text-gray-400 text-sm">Mapping pixel brightness to Z-depth</p>
        </div>
        
        <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
            <color attach="background" args={["#000"]} />
            {/* Ambient light for general visibility */}
            <ambientLight intensity={0.5} />
            
            {/* Replace this URL with your local image path */}
            {/* Example: /images/what-we-do/ui-ux.png */}
            <ParticleImage url="/images/primary-logo.png" />
            
            <OrbitControls enableZoom={true} />
        </Canvas>
    </div>
  );
};

export default ImageTo3D;