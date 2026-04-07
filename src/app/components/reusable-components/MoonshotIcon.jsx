import Image from "next/image";

export default function MoonshotIcon() {
  return (
    <div className="absolute left-1/2 -top-1 -translate-x-1/2 -translate-y-1/2 z-100">
      <Image
        src="/images/elevate-icon.png"
        alt="Elevate Icon"
        width={75}
        height={75}
        className="w-full h-auto relative z-10"
      />
    </div>
  );
}
