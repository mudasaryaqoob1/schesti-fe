'use client';
import { btnStyle, quinaryHeading } from '@/globals/tailwindvariables';
import Image from 'next/image';
import React from 'react';
import { twMerge } from 'tailwind-merge';
interface Props {
  text: string;
}

const GoogleButton = ({ text }: Props) => {
  return (
    <>
      <button
        className={twMerge(` ${btnStyle} ${quinaryHeading}  font-semibold
    flex items-center justify-center gap-3 bg-snowWhite border-2
    shadow-scenarySubdued
    border-doveGray
    `)}
      >
        <Image
          src={'/googleicon.svg'}
          alt="google icon"
          width={24}
          height={24}
          className="mr-1"
        />
        {text} with Google
      </button>
    </>
  );
};

export default GoogleButton;
