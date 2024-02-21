'use client';
import { bg_style } from '@/globals/tailwindvariables';
import NextImage from 'next/image';
import { useState, useContext } from 'react';
import { twMerge } from 'tailwind-merge';
import Draw from './Draw';
import ModalComponent from '@/app/component/modal';
import ScaleModal from '../components/scale';
import ModalsWrapper from '../components/main';
import { ColorPicker, InputNumber, Select } from 'antd';
import { UploadFileContext } from '../context';
import { UploadFileContextProps } from '../context/UploadFileContext';
import DrawHistoryTable from '../components/DrawHistoryTable';

export type ScaleLabel =
  | 'scale'
  | 'length'
  | 'volume'
  | 'count'
  | 'area'
  | 'dynamic';

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

export interface Measurements {
  angle?: number;
  segment?: string;
  volume?: number;
  count?: number;
  parameter?: string;
  area?: number;
}

export const defaultMeasurements: Measurements = {
  angle: 0,
  segment: '0',
  volume: 0,
  area: 0,
  count: 0,
  parameter: '0',
};

const Units = [11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72];

const Scale = () => {
  const [scale, setScale] = useState<ScaleLabel>('scale');
  const [showModal, setShowModal] = useState(false);
  const [border, setBorder] = useState<number>(4);
  const [color, setColor] = useState<string>('#1677ff');
  const [unit, setUnit] = useState<number>(18);
  const [depth, setDepth] = useState<number>(0);
  const [measurements, setMeasurements] =
    useState<Measurements>(defaultMeasurements);

  const { uploadFileData } = useContext(
    UploadFileContext
  ) as UploadFileContextProps;

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
                onClick={() => {
                  setShowModal(true);
                  setScale(label);
                }}
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
      <div className="bg-[#F2F2F2] h-[52px] flex flex-row items-center px-4 gap-6">
        <div className="flex flex-row gap-2 items-center">
          <label>Totals:</label>
          <Select></Select>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <label>Units:</label>
          <Select
            className="w-[64px]"
            value={unit}
            onChange={(value) => setUnit(value)}
          >
            {Units.map((item) => (
              <Select.Option value={item} key={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <label>Border:</label>
          <InputNumber
            min={1}
            max={76}
            value={border}
            onChange={(value) => setBorder(value as number)}
          />
        </div>
        <div className="flex flex-row gap-2 items-center">
          <label>Color:</label>
          <ColorPicker
            value={color}
            onChange={(color) => setColor(color.toHexString())}
          />
        </div>
        <div className="flex flex-row gap-2 items-center ">
          <div className="bg-[#F2F2F2] h-[52px] w-full pt-3">
            <input
              type="number"
              min={1}
              placeholder="depth"
              className="h-1/2"
              onChange={(e) => setDepth(+e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="py-6 h-[709px] relative">
        <div>
          <div className="absolute">
            <div className={`${showModal ? 'block' : 'hidden'}`}>
              <ModalsWrapper
                scale={scale}
                setModalOpen={setShowModal}
                measurements={measurements}
              />
            </div>
          </div>
        </div>
        <div className="relative h-[527px] overflow-y-auto">
          {uploadFileData.map((file, index) => (
            <Draw
              key={`draw-${index}`}
              selected={scale}
              depth={depth}
              color={color}
              border={border}
              unit={unit}
              uploadFileData={file}
              pageNumber={index + 1}
              handleChangeMeasurements={(measurements) =>
                setMeasurements(measurements)
              }
            />
          ))}
        </div>
        <div>
          <DrawHistoryTable />
        </div>
      </div>

      {scale === 'scale' && (
        <ModalComponent open={showModal} setOpen={setShowModal}>
          <ScaleModal setModalOpen={setShowModal} />
        </ModalComponent>
      )}
    </section>
  );
};

export default Scale;
