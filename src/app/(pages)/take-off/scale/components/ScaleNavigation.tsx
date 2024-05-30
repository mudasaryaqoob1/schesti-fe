import React from 'react';
import NextImage from 'next/image';
import { twMerge } from 'tailwind-merge';
import { bg_style } from '@/globals/tailwindvariables';
import { SCALE_NAVIGATION, ScaleInterface } from '../../types';
import { ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import { ColorPicker } from 'antd';

interface Props {
  tool: ScaleInterface;
  setTool: (data: ScaleInterface) => void;
  setShowModal: (data: boolean) => void;
  handleZoomIn?:any;
  handleZoomOut?:any;
  handleRoomColorChange?:any;
  fillColor?:string;
}

const ScaleNavigation: React.FC<Props> = ({ tool, setTool, setShowModal, handleZoomIn, handleZoomOut, handleRoomColorChange,fillColor }) => {
  return (
    <div
      className={twMerge(
        `h-auto w-30 py-5 px-1 flex flex-col justify-center items-center gap-4  ${bg_style} rounded-lg !fixed !z-[50] right-0 top-30`
      )}
    >
      {SCALE_NAVIGATION.map(
        ({ src, selectedSrc, height, width, alt, label }) => {
          return (
            <div
              key={src}
              className="flex flex-col items-center cursor-pointer p-2"
              onClick={() => {
                setShowModal(true);
                setTool({
                  selected: label,
                  ...((label === 'dynamic' || label === 'perimeter') && { subSelected: 'create' }),
                });
              }}
            >
              {tool.selected === label ? (
                <NextImage
                  src={selectedSrc}
                  alt={alt}
                  width={width}
                  height={height}
                />
              ) : (
                <NextImage src={src} alt={alt} width={width} height={height} />
              )}
              <span
                className={twMerge(
                  `text-xs capitalize ${tool.selected === label ? 'text-[#6F6AF8]' : ''
                  }`
                )}
              >
                {label}
              </span>
            </div>
          );
        }
      )}

      {/* Zoom In */}
      <div
        className="flex flex-col items-center cursor-pointer p-2"
        onClick={handleZoomIn}
      >
         <ZoomInOutlined width={19.97} height={11.31}/>
        <span
          className={twMerge(
            `text-xs capitalize`
          )}
        >
          {"Zoom In"}
        </span>
      </div>

      {/* Zoom Out */}
      <div
        className="flex flex-col items-center cursor-pointer p-2"
        onClick={handleZoomOut}
      >
         <ZoomOutOutlined width={19.97} height={11.31}/>
        <span
          className={twMerge(
            `text-xs capitalize`
          )}
        >
          {"Zoom Out"}
        </span>
      </div>

      {/* Room Color */}
      <div
        className="flex flex-col items-center cursor-pointer p-2"
        // onClick={}
      >
         {/* <NextImage src={'/selectedScale.svg'} alt={'zoomicon'} width={19.97} height={11.31} /> */}
         <ColorPicker value={fillColor ?? '#ffffff'} onChangeComplete={(value)=>{handleRoomColorChange(value?.toRgbString())}} />
        <span
          className={twMerge(
            `text-xs capitalize`
          )}
        >
          {"Room Color"}
        </span>
      </div>

    </div>
  );
};

export default ScaleNavigation;
