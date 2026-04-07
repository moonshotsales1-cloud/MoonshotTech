export default function SectionTitle({ title, font }) {
  return (
    <div className="section-title flex items-center max-md:justify-center gap-3 text-sm md:text-base lg:text-xs 1280:text-sm 1366:text-base 1600:text-lg mb-6 text-[#808080]">
      <span className={`text-nowrap font-normal ${font}`}>{title}</span>
    </div>
  );
}
