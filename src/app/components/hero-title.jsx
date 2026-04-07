export default function HeroTitle({ title, className }) {
  return (
    <div className={`max-md:justify-center mb-8 lg:mb-16 flex items-center gap-3 text-sm md:text-base lg:text-xs 1280:text-sm 1366:text-base 1440:text-lg 1600:text-xl ${className}`}>
      <img className="max-1366:scale-75" src="/images/about-us/icon.png" />
      <p className="font-poppins font-normal whitespace-nowrap">{title}</p>
    </div>
  );
}
