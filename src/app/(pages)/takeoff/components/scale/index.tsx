'use client';
import Button from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import Image from 'next/image';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import { Select, Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { useState } from 'react';

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ScaleModal = ({ setModalOpen }: Props) => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  return (
    <div className="py-2.5 px-6 bg-white border border-solid border-elboneyGray rounded-[4px] z-50">
      <section className="w-full">
        <div className="flex justify-between items-center border-b-Gainsboro ">
          <div>
            <QuaternaryHeading
              title="Scale"
              className="text-graphiteGray font-bold"
            />
            {/* <QuinaryHeading
              title="Select any existing client from here."
              className="text-coolGray"
            /> */}
          </div>
          <Image
            src={'/crossblack.svg'}
            alt="close icon"
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={() => setModalOpen(false)}
          />
        </div>
        <div className="flex flex-col p-6 gap-6">
          <div className="flex gap-6 items-center">
            <label>Options:</label>
            <Select className="w-full" />
          </div>
          <div className="flex gap-6 items-center justify-between ">
            <div className="flex flex-row gap-6">
              <label>Scale:</label>
              <Radio.Group onChange={onChange} value={value}>
                <Radio value={1}>Present</Radio>
                <Radio value={2}>Custom</Radio>
              </Radio.Group>
            </div>
            <div>
              <WhiteButton text="Add to Preset" />
            </div>
          </div>
          <div className="flex gap-4 items-center justify-end">
            <Select className="w-[115px]" />
            <Select className="w-[115px]" />
            <Select className="w-[115px]" />
            <Select className="w-[115px]" />
          </div>
          <div className="flex gap-6 items-center">
            <label>Position:</label>
            <Select className="w-full" />
          </div>
        </div>
      </section>
      <div className="flex justify-end gap-4 mt-5 mb-2">
        <div>
          <Button
            text="Cancel"
            className="!bg-snowWhite !text-abyssalBlack"
            onClick={() => setModalOpen(false)}
          />
        </div>
        <div>
          <Button text="Calibrate" />
        </div>
      </div>
    </div>
  );
};

export default ScaleModal;
