'use client';;
import FastMarquee from 'react-fast-marquee';
import { cn } from '@/lib/utils';

export const Marquee = ({
  className,
  ...props
}) => (
  <div className={cn('relative w-full overflow-hidden', className)} {...props} />
);

export const MarqueeContent = ({
  loop = 0,
  autoFill = true,
  pauseOnHover = false,
  ...props
}) => (
  <FastMarquee autoFill={autoFill} loop={loop} pauseOnHover={pauseOnHover} {...props} />
);

export const MarqueeFade = ({
  className,
  side,
  ...props
}) => (
  <div
    {...props} />
);

export const MarqueeItem = ({
  className,
  ...props
}) => (
  <div className={cn('mx-2 object-contain hover:border-2 hover:border-white/70 hover:bg-[#03182c] hover:rounded-full', className)} {...props} />
);
