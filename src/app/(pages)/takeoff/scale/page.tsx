'use client';
import { bg_style } from '@/globals/tailwindvariables';
import NextImage from 'next/image';
import { useContext, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Layer, Image as KonvaImage, Stage } from 'react-konva';
import { UploadFileContext } from '../context';
import { UploadFileContextProps } from '../context/UploadFileContext';

type ScaleLabel = 'scale' | 'length' | 'volume' | 'count' | 'area' | 'dynamic';

interface ScaleNavigation {
  label: ScaleLabel;
  src: string;
  selectedSrc: string;
  alt: string;
  width: number;
  height: number;
}

const scaleNavigation: ScaleNavigation[] = [
  {
    label: 'scale',
    src: '/scale.svg',
    selectedSrc: '/selectedScale.svg',
    alt: 'createicon',
    width: 19.97,
    height: 11.31,
  },
  {
    label: 'length',
    src: '/length.svg',
    selectedSrc: '/selectedLength.svg',
    alt: 'createicon',
    width: 19.97,
    height: 11.31,
  },
  {
    label: 'volume',
    src: '/volume.svg',
    selectedSrc: '/selectedVolume.svg',
    alt: 'createicon',
    width: 14,
    height: 16,
  },
  {
    label: 'count',
    src: '/count.svg',
    selectedSrc: '/selectedCount.svg',
    alt: 'createicon',
    width: 19.97,
    height: 11.31,
  },
  {
    label: 'area',
    src: '/area.svg',
    selectedSrc: '/selectedArea.svg',
    alt: 'createicon',
    width: 18.33,
    height: 13.72,
  },
  {
    label: 'dynamic',
    src: '/dynamic.svg',
    selectedSrc: '/selectedDynamic.svg',
    alt: 'createicon',
    width: 15,
    height: 14,
  },
];

const Scale = () => {
  const [scale, setScale] = useState<ScaleLabel>('scale');

  const { src } = useContext(UploadFileContext) as UploadFileContextProps;

  const myImage = new Image();
  myImage.src = src;

  return (
    <section className="mt-[100px] md:px-16 px-8 pb-4">
      <div
        className={`h-12 w-full mt-6 flex flex-row items-center justify-center gap-8  py-[5.5px] ${bg_style}`}
      >
        {scaleNavigation.map(
          ({ src, selectedSrc, height, width, alt, label }) => {
            return (
              <div
                key={src}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => setScale(label)}
              >
                {scale === label ? (
                  <NextImage
                    src={selectedSrc}
                    alt={alt}
                    width={width}
                    height={height}
                  />
                ) : (
                  <NextImage
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                  />
                )}
                <span
                  className={twMerge(
                    `text-xs capitalize ${
                      scale === label ? 'text-[#6F6AF8]' : ''
                    }`
                  )}
                >
                  {label}
                </span>
              </div>
            );
          }
        )}
      </div>
      <div className="bg-[#F2F2F2] h-[52px] w-full">Configurations</div>
      <div className="py-6 h-[709px] bg-red-200">
        <div>
          <Stage
            width={600}
            height={600}
            className="flex justify-center cursor-pointer"
          >
            <Layer>
              <KonvaImage image={myImage} width={600} height={600} />
            </Layer>
          </Stage>
        </div>
      </div>
    </section>
  );
};

export default Scale;
