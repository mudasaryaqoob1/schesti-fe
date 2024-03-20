'use client';
import Button from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import Image from 'next/image';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import { Select, Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { useEffect, useState } from 'react';
import { fetchTakeoffPreset } from '@/redux/takeoff/takeoff.thunk';
import { AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { selectTakeoffPreset } from '@/redux/takeoff/takeoff.Selector';
import { takeoffPresetService } from '@/app/services/takeoff.service';
import { addNewTakeoffPresetData } from '@/redux/takeoff/takeoff.slice';

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
  { label: `1'=1'`, value: `1'=1'` },
  { label: `1/32'=1'-0'`, value: `1/32'=1'-0'` },
  { label: `1/16'=1'-0'`, value: `1/16'=1'-0'` },
  { label: `3/32'=1'0'`, value: `3/32'=1'0'` },
  { label: `1/8=1'-0'`, value: `1/8=1'-0'` },
  { label: `3/16'=1'-0'`, value: `3/16'=1'-0'` },
  { label: `1/4'=1'-0'`, value: `1/4'=1'-0'` },
  { label: `1/2'=1'-0'`, value: `1/2'=1'-0'` },
  { label: `3/4'=1'-0'`, value: `3/4'=1'-0'` },
  { label: `1'=1'-0'`, value: `1'=1'-0'` },
  { label: `11/2'=1'-0'`, value: `11/2'=1'-0'` },
  { label: `1'=80'`, value: `1'=80'` },
  { label: `1'=90'`, value: `1'=90'` },
  { label: `1'=100'`, value: `1'=100'` },
  { label: `1'=200'`, value: `1'=200'` },
  { label: `1'=300'`, value: `1'=300'` },
  { label: `1'=400'`, value: `1'=400'` },
  { label: `1:1`, value: `1:1` },
  { label: `1:10`, value: `1:10` },
  { label: `1:20`, value: `1:20` },
  { label: `1:50`, value: `1:50` },
  { label: `1:100`, value: `1:100` },
  { label: `1:200`, value: `1:200` },
  { label: `1:500`, value: `1:500` },
  { label: `1:1000`, value: `1:1000` },
];

interface Props {
  scaleData: (data: any) => void;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ScaleModal = ({ setModalOpen, scaleData }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const allPresets = useSelector(selectTakeoffPreset);

  const [mergedPresets, setMergedPresets] = useState<any[]>([]);
  const [value, setValue] = useState('preset');
  const [secMeter, setSecMeter] = useState('');
  const [meter, setMeter] = useState('');
  const [precision, setPrecision] = useState('');
  const [preset, setPreset] = useState('');

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const handleAddPreset = async () => {
    takeoffPresetService
      .httpAddNewPreset({ label: 'dummy', value: 'dummy' })
      .then((res: any) => {
        if (res.statusCode == 201) {
          dispatch(addNewTakeoffPresetData(res.data));
        }
      });
  };

  useEffect(() => {
    dispatch(fetchTakeoffPreset({}));
  }, []);

  useEffect(() => {
    if (allPresets) {
      setMergedPresets([...allPresets, ...byDefaultPerest]);
    }
  }, [allPresets]);

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
                <WhiteButton text="Add to Preset" onClick={handleAddPreset} />
              </div>
            )}
          </div>
          <div className="flex gap-4 items-center justify-end">
            {value === 'preset' && (
              <Select
                className="w-full"
                value={preset}
                onChange={(value) => {
                  setPreset(value);
                }}
                options={mergedPresets}
              />
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
          <Button
            text="Calibrate"
            onClick={() =>
              scaleData({ 1: { scale: preset, precision: precision } })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ScaleModal;
