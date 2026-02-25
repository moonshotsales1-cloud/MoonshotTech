"use client";

import { ChevronUp } from "lucide-react";
import Link from "next/link";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";

export default function Footer() {
  const urls = [
    { name: "About Us", href: "/about-us" },
    { name: "Services", href: "#" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Case Studies", href: "#" },
    { name: "Industries", href: "/industries" },
    { name: "Contact", href: "/contact-us" },
  ];

  return (
    <footer className="relative bg-[#020E1A] rounded-t-[34.137px] -mt-10 pt-10 font-sora overflow-hidden z-100">
      <div className="relative z-10 px-[5em] max-lg:px-[3em] max-md:px-[2em] py-8 md:py-16 1280:py-24">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-9 max-lg:gap-16">
          {/* Left Column - Location & Inquiry */}
          <div className="space-y-48 max-lg:space-y-16 md:col-span-3">
            {/* Location */}
            <div>
              <p
                className="text-sm md:text-xs 1280:text-sm 1440:text-base font-normal uppercase tracking-wider text-white/50 mb-3"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                LOCATION
              </p>
              <Link
                href="https://share.google/nZZos4GW7DTinRQbh"
                className="not-italic text-sm 1280:text-base 1440:text-xl leading-relaxed text-white hover:text-[#D42290]"
              >
                1200 East Collins Boulevard
                <br />
                Suite 106 Richardson Texas 75081
              </Link>
            </div>

            {/* Logo */}
            <Link
              href="/"
              className="hover:scale-105 transition-transform duration-300"
            >
              <img
                src="/images/primary-logo.png"
                alt="Moonshot Tech"
                className="w-4/6 md:w-3/4 h-auto"
              />
            </Link>
          </div>

          {/* Middle Column - Links */}
          <div className="md:col-span-2 space-y-32 max-lg:space-y-16">
            {/* Inquiry */}
            <div>
              <p
                className="text-sm md:text-xs 1280:text-sm 1440:text-base font-normal uppercase tracking-wider text-white/50 mb-3"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                INQUIRY
              </p>
              <div className="space-y-2 text-sm md:text-sm lg:text-sm 1280:text-base 1440:text-xl text-white leading-snug">
                <Link
                  href="mailto:info@gmail.com"
                  className="block hover:text-[#D42290] transition-colors"
                >
                  info@gmail.com
                </Link>
                <Link
                  href="tel:+19723315058"
                  className="block hover:text-[#D42290] transition-colors"
                >
                  +1-972-331-5058
                </Link>
              </div>
            </div>

            <div>
              <p className="text-sm md:text-xs 1280:text-sm 1440:text-base font-normal uppercase tracking-wider text-white/50 mb-6">
                LINKS
              </p>
              <ul className="space-y-3 xl:space-y-6 text-sm md:text-sm lg:text-sm 1280:text-base 1440:text-xl">
                {urls.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white hover:text-[#D42290] transition-colors inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="hidden lg:block w-[0.5px] h-full bg-[#1D1D1D] col-span-1"></div>

          {/* Logo + Tagline + Newsletter */}
          <div className="md:col-span-5 lg:col-span-3">
            <div className="space-y-24 max-lg:space-y-12 lg:block md:flex md:justify-between md:items-start md:gap-16">
              {/* Company Title */}
              <div className="space-y-6 lg:space-y-12">
                <div>
                  <h2 className="text-2xl xl:text-4xl font-semibold tracking-tight">
                    MOONSHOT TECH
                  </h2>
                </div>

                <div className="space-y-4">
                  <p className="mt-3 text-xs md:text-sm 1280:text-base 1600:text-lg text-[#bbbbbb]">
                    We hope to <span className="text-white"> empower </span>{" "}
                    user and <span className="text-white"> simplify </span>
                    <br />
                    their everyday lives
                  </p>

                  {/* Social Icons */}
                  <div className="flex gap-3">
                    <Link
                      href="#"
                      className="h-10 w-10 1280:h-14 1280:w-14 rounded-full border border-[#494949] flex items-center justify-center text-white hover:text-black hover:bg-white transition-colors"
                      aria-label="Twitter/X"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </Link>
                    <Link
                      href="#"
                      className="h-10 w-10 1280:h-14 1280:w-14 rounded-full border border-[#494949] flex items-center justify-center text-white hover:bg-[linear-gradient(135deg,#FF8A00_0%,#E52E71_50%,#9B00FF_100%)] transition-colors"
                      aria-label="Instagram"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect
                          x="2"
                          y="2"
                          width="20"
                          height="20"
                          rx="5"
                          ry="5"
                        />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    </Link>
                    <Link
                      href="#"
                      className="h-10 w-10 1280:h-14 1280:w-14 rounded-full border border-[#494949] flex items-center justify-center text-white hover:bg-[#0866ff] transition-colors"
                      aria-label="Facebook"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </Link>
                    <Link
                      href="#"
                      className="h-10 w-10 1280:h-14 1280:w-14 rounded-full border border-[#494949] flex items-center justify-center text-white hover:bg-[#0a66c2] transition-colors"
                      aria-label="LinkedIn"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </Link>
                    <Link
                      href="#"
                      className="h-10 w-10 1280:h-14 1280:w-14 rounded-full border border-[#494949] flex items-center justify-center text-white hover:bg-[#ff0033] transition-colors"
                      aria-label="YouTube"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Newsletter */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm md:text-xs 1280:text-sm 1440:text-base">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span className="text-white">Newsletter</span>
                </div>

                <form className="group flex flex-row gap-3 lg:max-w-md">
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-screen max-md:max-w-xs md:w-4/5 sm:flex-1 p-4 pr-16 rounded-full border border-white/25 text-sm md:text-xs 1280:text-sm 1440:text-base text-white placeholder:text-[#949494] focus:outline-none focus:border-white/30 transition-colors"
                    suppressHydrationWarning
                  />
                  <span className="text-black grid place-items-center rounded-full bg-white hover:bg-[#D42290] p-2.5 m-2 -ml-15.75">
                    <LiaLongArrowAltRightSolid className="w-6 h-6 hover:text-white" />
                  </span>
                </form>

                <p className="text-xs md:text-sm 1280:text-base 1600:text-lg lg:w-[110%] 1280:w-full text-[#808080] font-normal">
                  By subscribing, you accept our newsletter{" "}
                  <br className="hidden md:block" /> terms and privacy policy.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 lg:mt-36 1440:mt-48">
          <div className="max-lg:gap-8 grid grid-cols-4 max-sm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-14 lg:gap-4 text-sm md:text-sm lg:text-sm 1280:text-base 1440:text-xl text-nowrap text-white/80">
            <p className="hidden md:block col-span-1 text-nowrap max-md:text-center">
              © 2026 Moonshot Tech. All Rights Reserved
            </p>

            <div className="block md:hidden w-full h-px my-2 bg-[#777]" />

            <div className="col-span-1 lg:col-span-3 space-x-6 1366:space-x-12 flex max-md:flex-wrap max-sm:gap-4 justify-center max-1600:justify-end max-1440:justify-center max-1280:justify-end max-md:justify-between max-480:justify-center">
              <Link href="#" className="hover:text-[#D42290] transition-colors">
                Terms & Conditions
              </Link>
              <Link href="#" className="hover:text-[#D42290] transition-colors">
                FAQ's
              </Link>
              <Link href="#" className="hover:text-[#D42290] transition-colors">
                Privacy Policy
              </Link>
            </div>

            <p className="block md:hidden col-span-1 text-nowrap max-md:text-center">
              © 2026 Moonshot Tech. All Rights Reserved
            </p>

            {/* Scroll to Top */}
            <div className="md:col-span-2 lg:col-span-1 flex justify-end max-md:w-[85vw] max-lg:justify-center">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="hover:cursor-pointer flex items-center justify-center text-white transition-colors hover:bg-[#D42290] rounded-full p-2"
                aria-label="Scroll to top"
              >
                <ChevronUp size={36} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <img
        src="/images/footer-moonshot.png"
        alt="Unique typography"
        className="w-full h-auto object-contain"
        draggable={false}
      />
    </footer>
  );
}
