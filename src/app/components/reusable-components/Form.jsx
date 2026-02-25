"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Form() {
  const tags = [
    "UI/UX Design",
    "Website Development",
    "E-commerce",
    "Branding",
    "Web Applications",
    "Animations",
    "Mobile Applications",
    "SEO",
    "SMM",
    "Google Adwords",
    "Email Marketing",
    "Digital Marketing",
  ];

  const [selectedTag, setSelectedTag] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [budget, setBudget] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const toggleTag = (t) => {
    setSelectedTag(t);
  };

  const validate = () => {
    const e = {};
    if (!fullName.trim()) e.fullName = "Full name is required.";
    if (!email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Enter a valid email.";
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setSubmitSuccess(false);
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      // TODO: replace with actual submit logic
      console.log({
        email,
        fullName,
        budget,
        businessName,
        message,
        selectedTag,
      });
      setSubmitSuccess(true);
      setEmail("");
      setFullName("");
      setBudget("");
      setBusinessName("");
      setMessage("");
      setSelectedTag(false);
      setSubmitSuccess(true);
    }
  };

  return (
    <form
      className="relative z-50 lg:col-span-7"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="bg-[#011322] rounded-[25px] p-10 lg:p-12 1440:p-16 xl:mx-6 max-sm:p-9 1920:mx-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-poppins font-normal text-[11px] 1920:text-[14px] 1600:text-[13px] 1366:text-[11px] 1280:text-[10px] lg:text-[9px]">
          <div>
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-[90px] py-3 px-8 bg-[#000911] border border-[#18354D] outline-none"
            />
            {errors.email ? (
              <p className="text-red-400 mt-2 ml-5">{errors.email}</p>
            ) : null}
          </div>
          <div>
            <input
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-[90px] py-3 px-8 bg-[#000911] border border-[#18354D] outline-none"
            />
            {errors.fullName ? (
              <p className="text-red-400 mt-2 ml-5">{errors.fullName}</p>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 font-poppins font-normal text-[11px] 1920:text-[14px] 1600:text-[13px] 1366:text-[11px] 1280:text-[10px] lg:text-[9px]">
          <input
            placeholder="Project Budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full rounded-[90px] py-3 px-8 bg-[#000911] border border-[#18354D] outline-none"
          />
          <input
            placeholder="Business Name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full rounded-[90px] py-3 px-8 bg-[#000911] border border-[#18354D] outline-none"
          />
        </div>

        <div className="text-[11px] 1920:text-[14px] 1600:text-[13px] 1366:text-[11px] 1280:text-[10px] lg:text-[9px]">
          <textarea
            placeholder="Tell us more about your product and goals"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="font-poppins font-normal w-full rounded-[25px] mt-6 p-8 bg-[#000911] border border-[#18354D] outline-none"
          />
        </div>

        <p className="text-white my-4 text-[13px] md:text-[16px] 1920:text-[16px] 1600:text-[15px] 1440:text-[14px] lg:text-[13px] font-sora">
          How can we help you?
        </p>

        <div className="hidden md:block space-y-3 lg:space-y-6">
          {[tags.slice(0, 4), tags.slice(4, 8), tags.slice(8, 12)].map(
            (row, rowIdx) => (
              <div
                key={`tag-row-${rowIdx}`}
                className="w-full flex flex-nowrap gap-3 lg:gap-2 1366:gap-3 1920:gap-4 justify-between"
              >
                {row.map((t) => {
                  const isSelected = selectedTag === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => toggleTag(t)}
                      className={`font-poppins max-sm:w-full px-6 840:px-8 py-4 lg:px-3.5 1280:px-5 1440:px-4.5 1920:px-6 max-xl:py-3 rounded-full bg-[#000911] text-[11px] 1920:text-[14px] 1600:text-[13px] 1366:text-[11px] 1280:text-[10px] lg:text-[9px] transition-colors duration-200 border ${
                        isSelected
                          ? "border-white/80 text-white/80"
                          : "border-[#18354D] text-[#999999]"
                      } hover:border-white/80 hover:text-white/80 cursor-pointer`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            ),
          )}
        </div>

        <div className="block md:hidden">
          <div className="w-full grid grid-cols-2 gap-3">
            {tags.map((t) => {
              const isSelected = selectedTag === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleTag(t)}
                  className={`text-center font-poppins py-4 px-1.5 480:px-2 rounded-full bg-[#000911] text-[9.5px] 480:text-[11px] transition-colors duration-200 border ${
                    isSelected
                      ? "border-white/80 text-white/80 "
                      : "border-[#18354D] text-[#999999]"
                  } hover:border-white/80 hover:text-white/80 cursor-pointer`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        <div className="md:flex justify-between items-center mt-8">
          <button
            type="submit"
            className="group border border-[#979797] inline-flex items-center gap-5 rounded-full bg-[#041426] hover:bg-[#D42290] pr-1.5 pl-8 py-1.5 text-[15px] text-white/90 ring-1 ring-white/15 transition hover:ring-white/30"
          >
            <span className="text-nowrap relative top-[0.5px] font-sora text-[clamp(14px,1.04vw,21px)]">
              Send Message
            </span>
            <span className="grid place-items-center rounded-full bg-[#D42290] group-hover:bg-white p-2 lg:p-3">
              <ArrowRight className="w-4 h-4 1366:w-6 1366:h-6 group-hover:text-black" />
            </span>
          </button>
          <div className="text-xs 1366:text-sm max-sm:space-y-3 max-sm:pt-6 md:text-end 1920:text-[16px] 1600:text-[15px] 1440:text-[14px] lg:text-[13px]">
            <p className="text-[#A3A3A3]">Prefer email?</p>
            <Link
              href="mailto:moonshottech@gmail.com"
              className="text-white hover:underline"
            >
              moonshottech@gmail.com
            </Link>
          </div>
        </div>

        {submitSuccess ? (
          <p className="mt-6 font-poppins 1920:text-[14px] 1600:text-[13px] text-[11px] text-white/80">
            Thanks — we’ve received your message. Our team will reach out
            shortly.
          </p>
        ) : null}
      </div>
    </form>
  );
}
