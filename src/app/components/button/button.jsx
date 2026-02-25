import Link from "next/link";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";

export default function Button({ text, href }) {
  return (
    <button className="relative z-20">
      <Link
        href={href}
        className="group border border-[#979797] inline-flex items-center gap-5 rounded-full bg-[#041426] hover:bg-[#D42290] pr-1.5 pl-5 md:pl-8 py-1.5 text-white/90 ring-1 ring-white/15 transition hover:ring-white/30"
      >
        <span className="text-nowrap relative top-[0.5px] font-sora text-sm md:text-base lg:text-xs 1280:text-sm 1366:text-base 1440:text-lg 1600:text-xl">
          {text}
        </span>
        <span className="grid place-items-center rounded-full bg-[#D42290] group-hover:bg-white p-1.5 1366:p-3">
          <LiaLongArrowAltRightSolid className="w-5 h-5 1366:w-6 1366:h-6 group-hover:text-black" />
        </span>
      </Link>
    </button>
  );
}
