import Image from "next/image";
import Navbar from "../components/Navbar";

export default function Services() {
  return (
    <div className="relative lg:max-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          alt="linear-gradient-bg"
          width={1920}
          height={1080}
          src="/images/services/bg-service-banner.png"
          style={{ filter: "brightness(1.25)" }}
        />
      </div>
      <Navbar />
      <h1 className="h-screen flex justify-center items-center relative z-10 text-center text-7xl font-normal font-sora uppercase mb-4 tracking-tight leading-[110%]">
        Services
      </h1>
    </div>
  );
}
