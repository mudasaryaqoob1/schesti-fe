import React from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { senaryHeading } from '@/globals/tailwindvariables';
// import Menu from './../table/menu';
interface Props {
  title: string;
  className?: string;
}
const SenaryHeading = ({ title, className }: Props) => {
  return (
    <h6
      className={twMerge(
        clsx(
          `${senaryHeading} text-midnightBlue font-popin ${
            className && className
          }`
        )
      )}
    >
      {title}
    </h6>
  );
};

export default SenaryHeading;
