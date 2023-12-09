import { twMerge } from 'tailwind-merge';
export const primaryHeading = twMerge(
  'font-inter text-grayextraBolder text-[30px] font-[600] leading-[42px]'
);
export const secondaryHeading = twMerge(
  'font-inter text-obsidianBlack text-[24px] font-[600] leading-[34px]'
);
export const tertiaryHeading = twMerge(
  'font-inter text-graphiteGray text-[20px] font-[600] leading-[30px]'
);
export const quaternaryHeading = twMerge(
  'font-inter text-slateGray text-[18px] font-[400] leading-[34px]'
);
export const quinaryHeading = twMerge(
  ' font-inter text-graphiteGray  text-[16px] font-[400] leading-[24px]'
);
// quinaryHeading to quinaryHeading
//  quinaryHeading to senaryHeading
export const senaryHeading = twMerge(
  'text-graphiteGray  text-[14px] font-normal leading-[22px]'
);
export const minHeading = twMerge(
  `text-slateGray  text-xs font-normal leading-5 not-italic`
)
export const btnStyle = twMerge(
  'rounded-[8px] border-[1px] ',
  'border-lavenderPurple',
  'bg-lavenderPurple',
  'text-[#FFFFFF]',
  'leading-[24px]',
  'h-auto',
  'w-full',
  'font-[600]',
  "py-2.5 px-4",
  'self-stretch',
  'shadow-[0px 1px 2px 0px]',
  'shadow-[rgba(16, 24, 40, 0.05)]',
  "cursor-pointer"
);
export const Backgrounder = twMerge(
  "rounded-xl",
  "border border-solid border-silverGray",
  "bg-snowWhite",
  "shadow-secondaryTwist"
)