"use client";

import ScrollReveal from "@/components/lightswind/scroll-reveal";
import TextType from "@/components/TextType";
import SectionTitle from "../reusable-components/SectionTitle";

const ParallaxCard = ({ children, className = "", offset = 0 }) => {
  return (
    <div
      className={[
        "relative rounded-[28px] border border-[#2e2e2e]/60 bg-[#030303] overflow-hidden",
        "shadow-[0_30px_120px_rgba(0,0,0,0.75)]",
        "p-8 min-w-[42%] max-w-[42%] max-1280:max-w-[45%] max-1280:min-w-[45%] max-md:max-w-full max-md:min-w-full",
        className,
      ].join(" ")}
    >
      <div className="w-full h-full">
        <div className="flex flex-col justify-between min-h-85 1366:min-h-110 1440:min-h-125 1920:min-h-145">
          {children}
        </div>
      </div>
    </div>
  );
};

const About2 = () => {
  return (
    <section className="relative bg-[#00060B] text-white py-24 1366:py-36 1600:py-48 z-50">
      {/* Content Overlay */}
      <div className="relative z-10 px-[5em] max-lg:px-[3em] max-md:px-[2em]">
        <div className="mb-8 lg:mb-16 1366:mb-24 1600:mb-36 space-y-6 1440:space-y-8 overflow-x-hidden">
          {/* Top label */}
          <SectionTitle title="04 — Our Perspective" font="font-poppins" />

          {/* Heading */}
          <div className="scroll-reveal -tracking-[0.03em] leading-relaxed font-light text-white/90 font-sora">
            <ScrollReveal size="xl" enableBlur={false}>
              At Moonshot Tech, we study positioning, audience perception, and
              behavioral signals before shaping identity. We refine voice,
              visual structure, and digital presence into one coherent canvas.
              That canvas is built through structured branding, high performing
              websites, scalable web and mobile applications, and commerce
              platforms designed for real use. We strengthen visibility through
              SEO, social media strategy, paid advertising, and data driven
              digital marketing. We support engagement with email campaigns and
              visual storytelling through animation.
            </ScrollReveal>
          </div>
        </div>

        {/* Core Discernments Title */}
        <div className="text-center md:text-start text-lg md:text-xl lg:text-2xl 1366:text-2xl 1600:text-3xl font-medium font-sora uppercase">
          <TextType
            text="The Gaps "
            typingSpeed={15}
            pauseDuration={1500}
            showCursor={false}
            startOnVisible={true}
            loop={true}
          />
          <br className="hidden md:block" />
          <TextType
            text="Holding Brands Back"
            typingSpeed={15}
            pauseDuration={1500}
            showCursor={false}
            startOnVisible={true}
            loop={true}
          />
        </div>

        {/* Cards Section with Background */}
        <div className="relative md:-mt-16">
          {/* Background Image - Behind cards only */}
          <div className="sticky top-0 z-0 flex h-screen items-center justify-center pointer-events-none will-change-transform">
            <img
              src="/images/about-2/about-2-bg.png"
              alt=""
              className="max-w-275 w-[60vw] object-contain opacity-100"
              style={{ filter: "grayscale(1)" }}
            />
          </div>
          {/* Cards Container */}
          <div className="max-w-[80%] max-1366:max-w-[85%] max-1280:max-w-[90%] max-lg:max-w-full relative mx-auto z-10 max-md:-mt-[95vh] -mt-[100vh]">
            {/* Card 01 */}
            <div className="relative flex max-md:justify-center mb-10 lg:-mb-30">
              <ParallaxCard offset={-150} className="md:ml-[50%]">
                {/* Card Bg Image */}
                <div className="absolute inset-0">
                  <img
                    src="/images/about-2/card-1.png"
                    alt="Card 1 Background"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Top row: index + ball */}
                <div className="relative flex items-start justify-between z-10 mt-3 1366:mt-6">
                  <div className="text-[#38BDF8] text-4xl md:text-2xl lg:text-3xl 1366:text-4xl 1600:text-5xl font-bold tracking-tight font-sora">
                    01
                  </div>
                </div>

                {/* Headline */}
                <div className="1920:w-[90%] relative z-10 text-[21px] 480:text-[26px] md:text-[clamp(16px,1.4vw,26px)] uppercase leading-snug tracking-[0.01em] font-sora">
                  <TextType
                    text="Many businesses invest in digital presence without building a structured system that connects brand identity, website development, paid campaigns, and measurable analytics into one disciplined performance framework."
                    typingSpeed={15}
                    pauseDuration={1500}
                    showCursor={true}
                    cursorCharacter="|"
                    loop={true}
                    startOnVisible={true}
                  />
                </div>
              </ParallaxCard>
            </div>

            {/* Card 02 */}
            <div className="relative mb-10 md:-mt-40 1366:-mt-50 1440:-mt-60 max-md:flex max-md:justify-center">
              <ParallaxCard>
                {/* Card Bg Image */}
                <div className="absolute inset-0">
                  <img
                    src="/images/about-2/card-2.png"
                    alt="Card 1 Background"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Top row: index + ball */}
                <div className="relative flex items-start justify-between z-10 mt-3 1366:mt-6">
                  <div className="text-[#38BDF8] text-4xl md:text-2xl lg:text-3xl 1366:text-4xl 1600:text-5xl font-bold tracking-tight font-sora">
                    02
                  </div>
                </div>

                {/* Headline */}
                <div className="relative z-10 text-[21px] 480:text-[26px] md:text-[clamp(16px,1.4vw,26px)] uppercase leading-snug tracking-[0.01em] font-sora">
                  <TextType
                    text="Companies often separate<br/>design, development, and marketing efforts, when sustainable growth requires strategic coordination where branding, platforms, advertising, and data insights operate together with clear objectives."
                    typingSpeed={15}
                    pauseDuration={1500}
                    showCursor={false}
                    loop={true}
                  />
                </div>
              </ParallaxCard>
            </div>

            {/* Card 03 */}
            <div className="relative flex justify-end max-md:justify-center mb-10 md:-mt-40 1366:-mt-50 1440:-mt-60 max-sm:mt-0">
              <ParallaxCard className="">
                {/* Card Bg Image */}
                <div className="absolute inset-0">
                  <img
                    src="/images/about-2/card-3.png"
                    alt="Card 3 Background"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Top row: index + ball */}
                <div className="relative flex items-start justify-between z-10 mt-3 1366:mt-6">
                  <div className="text-[#38BDF8] text-4xl md:text-2xl lg:text-3xl 1366:text-4xl 1600:text-5xl font-bold tracking-tight font-sora">
                    03
                  </div>
                </div>

                {/* Headline */}
                <div
                  className="relative z-10 text-[21px] 480:text-[26px] md:text-[clamp(16px,1.4vw,26px)] uppercase leading-snug tracking-[0.01em] text-white"
                  style={{ fontFamily: "var(--font-sora), sans-serif" }}
                >
                  <TextType
                    text="Digital performance suffers when execution is driven by trends instead of research, while real progress depends on audience analysis, behavioral data, and continuous optimization across every active channel."
                    typingSpeed={15}
                    pauseDuration={1500}
                    showCursor={true}
                    cursorCharacter="|"
                    loop={true}
                    startOnVisible={true}
                  />
                </div>
              </ParallaxCard>
            </div>

            {/* Card 04 */}
            <div className="relative max-md:flex max-md:justify-center md:-mt-50 1366:-mt-60 1440:-mt-70">
              <ParallaxCard className="max-sm:mt-0 md:ml-[5%] 1280:ml-[8%]">
                {/* Card Bg Image */}
                <div className="absolute inset-0">
                  <img
                    src="/images/about-2/card-4.png"
                    alt="Card 4 Background"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Top row: index + ball */}
                <div className="relative flex items-start justify-between z-10 mt-3 1366:mt-6">
                  <div className="text-[#38BDF8] text-4xl md:text-2xl lg:text-3xl 1366:text-4xl 1600:text-5xl font-bold tracking-tight font-sora">
                    04
                  </div>
                </div>

                {/* Headline */}
                <div
                  className="relative z-10 text-[21px] 480:text-[26px] md:text-[clamp(16px,1.4vw,26px)] uppercase leading-snug tracking-[0.01em] text-white"
                  style={{ fontFamily: "var(--font-sora), sans-serif" }}
                >
                  <TextType
                    text="Growth becomes unstable when short term campaigns replace long term planning, yet lasting impact requires consistent strategy, technical reliability, and performance tracking that refines results over time."
                    typingSpeed={15}
                    pauseDuration={1500}
                    showCursor={true}
                    cursorCharacter="|"
                    loop={true}
                    startOnVisible={true}
                  />
                </div>
              </ParallaxCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About2;
