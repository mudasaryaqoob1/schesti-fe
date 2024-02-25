'use client';
import Button from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import Image from 'next/image';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import { Select, Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { useState } from 'react';

const precisions = ['1', '0.1', '0.01', ' 0.001', '0.0001', '0.00001'];
const byPrecision = ['1', '1/2', '1/4', '1/8', '1/16', '1/32'];
const meters = ['in', 'cm', 'mm'];
const secondaryMeters = [
  'in',
  'ft',
  `ft' in'`,
  `in'`,
  'yd',
  'mi',
  'mm',
  'cm',
  'm',
  'km',
];

const byDefaultPerest = [
  `1'=1'`,
  `1/32'=1'-0'`,
  `1/16'=1'-0'`,
  `3/32'=1'0'`,
  `1/8=1'-0'`,
  `3/16'=1'-0'`,
  `1/4'=1'-0'`,
  `1/2'=1'-0'`,
  `3/4'=1'-0'`,
  `1'=1'-0'`,
  `11/2'=1'-0'`,

  `1'=80'`,
  `1'=90'`,
  `1'=100'`,
  `1'=200'`,
  `1'=300'`,
  `1'=400'`,

  `1:1`,
  `1:10`,
  `1:20`,
  `1:50`,
  `1:100`,
  `1:200`,
  `1:500`,
  `1:1000`,
];

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ScaleModal = ({ setModalOpen }: Props) => {
  const [value, setValue] = useState('preset');
  const [secMeter, setSecMeter] = useState('');
  const [meter, setMeter] = useState('');
  const [precision, setPrecision] = useState('');
  const [preset, setPreset] = useState('');

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
                <Radio value={'preset'}>Present</Radio>
                <Radio value={'custom'}>Custom</Radio>
              </Radio.Group>
            </div>
            {value === 'custom' && (
              <div>
                <WhiteButton text="Add to Preset" />
              </div>
            )}
          </div>
          <div className="flex gap-4 items-center justify-end">
            {value === 'preset' && (
              <Select
                className="w-full"
                value={preset}
                onChange={(value) => setPreset(value)}
              >
                {byDefaultPerest.map((item) => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            )}
            {value === 'custom' && (
              <>
                <Select className="w-[115px]" defaultValue={1}>
                  <Select.Option value={1}>1</Select.Option>
                </Select>
                <Select
                  value={meter}
                  className="w-[115px]"
                  onChange={(value) => setMeter(value)}
                >
                  {meters.map((item) => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
                <Select className="w-[115px]" defaultValue={1}>
                  <Select.Option value={1}>1</Select.Option>
                </Select>
                <Select
                  value={secMeter}
                  className="w-[115px]"
                  onChange={(value) => setSecMeter(value)}
                >
                  {secondaryMeters.map((item) => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </>
            )}
          </div>
          <div className="flex gap-6 items-center">
            <label>Precision:</label>
            <Select
              value={precision}
              className="w-full"
              onChange={(value) => setPrecision(value)}
            >
              {secMeter === `in'` || secMeter === `ft' in'`
                ? byPrecision.map((item) => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))
                : precisions.map((item) => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
            </Select>
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
