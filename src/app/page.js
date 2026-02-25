"use client";
import { useState } from "react";

import About2 from "./components/UI/About2";
import AboutUs from "./components/UI/AboutUs";
import Hero from "./components/UI/Hero";
import Partners from "./components/UI/Partners";
import WhatWeDo from "./components/UI/WhatWeDo";
import Footer from "./components/Footer";
import PortfolioAndBrand from "./components/UI/PortfolioAndBrand";
import Proficients from "./components/UI/Proficients";
import Ribbons from "@/components/Ribbons";
import CyberHologramLoader from "./components/CyberHologramLoader";
import Navbar from "./components/Navbar";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <CyberHologramLoader />
      <div className="max-sm:hidden fixed inset-0 z-9999 pointer-events-none">
        <Ribbons
          baseThickness={6}
          colors={["#D42290"]}
          speedMultiplier={0.4}
          maxAge={500}
          enableFade={true}
        />
      </div>

      <Navbar onMenuStateChange={setIsMenuOpen} />
      <Hero />
      <AboutUs />
      <WhatWeDo />
      <About2 />
      <Proficients />
      <PortfolioAndBrand />
      <Partners />
      <Footer />
    </>
  );
}
