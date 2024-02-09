'use client';
import { bg_style } from '@/globals/tailwindvariables';
import Image from 'next/image';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

type ScaleLabel = 'scale' | 'length' | 'volume' | 'count' | 'area' | 'dynamic';

interface ScaleNavigation {
  label: ScaleLabel;
  src: string;
  alt: string;
  width: number;
  height: number;
}

const scaleNavigation: ScaleNavigation[] = [
  {
    label: 'scale',
    src: '/scale.svg',
    alt: 'createicon',
    width: 19.97,
    height: 11.31,
  },
  {
    label: 'length',
    src: '/length.svg',
    alt: 'createicon',
    width: 19.97,
    height: 11.31,
  },
  {
    label: 'volume',
    src: '/volume.svg',
    alt: 'createicon',
    width: 14,
    height: 16,
  },
  {
    label: 'count',
    src: '/count.svg',
    alt: 'createicon',
    width: 19.97,
    height: 11.31,
  },
  {
    label: 'area',
    src: '/area.svg',
    alt: 'createicon',
    width: 18.33,
    height: 13.72,
  },
  {
    label: 'dynamic',
    src: '/dynamic.svg',
    alt: 'createicon',
    width: 15,
    height: 14,
  },
];

const Scale = () => {
  const [scale, setScale] = useState<ScaleLabel>('scale');
  return (
    <section className="mt-[100px] md:px-16 px-8 pb-4">
      <div
        className={`h-12 w-full mt-6 flex flex-row items-center justify-center gap-8  py-[5.5px] ${bg_style}`}
      >
        {scaleNavigation.map(({ src, height, width, alt, label }) => {
          return (
            <div
              key={src}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => setScale(label)}
            >
              <Image src={src} alt={alt} width={width} height={height} />
              <span
                className={twMerge(
                  `text-xs capitalize ${scale === label ? 'text-[#6F6AF8]' : ''}`
                )}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Scale;
