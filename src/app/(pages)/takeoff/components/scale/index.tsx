'use client';
import Button from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import Image from 'next/image';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import { Select, Radio, Input } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';
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

const byDefaultPrest = [
  { label: `1"=1"`, value: `1"=1` },
  { label: `1/32"=1'-0"`, value: `1/32"=1'-0"` },
  { label: `1/16"=1'-0"`, value: `1/16"=1'-0"` },
  { label: `3/32"=1'0"`, value: `3/32"=1'0"` },
  { label: `1/8"=1'-0"`, value: `1/8"=1'-0"` },
  { label: `3/16"=1'-0"`, value: `3/16"=1'-0"` },
  { label: `1/4"=1'-0"`, value: `1/4"=1'-0"` },
  { label: `1/2"=1'-0"`, value: `1/2"=1'-0"` },
  { label: `3/4"=1'-0"`, value: `3/4"=1'-0"` },
  { label: `1"=1'-0"`, value: `1"=1'-0"` },
  { label: `11/2"=1'-0"`, value: `11/2"=1'-0"` },
  { label: `1"=80'`, value: `1"=80'` },
  { label: `1"=90'`, value: `1"=90'` },
  { label: `1"=100'`, value: `1"=100'` },
  { label: `1"=200'`, value: `1"=200'` },
  { label: `1"=300'`, value: `1"=300'` },
  { label: `1"=400'`, value: `1"=400'` },
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
  setScaleData: any;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  numOfPages: number;
  page?: number;
}

const ScaleModal = ({
  setModalOpen,
  numOfPages,
  page,
  setScaleData,
}: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const allPresets = useSelector(selectTakeoffPreset);

  const [mergedPresets, setMergedPresets] = useState<any[]>([]);
  const [value, setValue] = useState('preset');
  const [secMeter, setSecMeter] = useState('');
  const [meter, setMeter] = useState('');
  const [precision, setPrecision] = useState('');
  const [preset, setPreset] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [optionsValue, setOptionsValue] = useState('');
  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState('');

  const [optionError, setOptionError] = useState(false);
  const [secValError, setSecValError] = useState(false);

  const onChange = (e: RadioChangeEvent) => {
    setPreset('');
    setFirstValue('');
    setMeter('');
    setSecondValue('');
    setSecMeter('');
    setValue(e.target.value);
  };

  const handleAddPreset = async () => {
    takeoffPresetService
      .httpAddNewPreset({
        label: `${firstValue}${meter}-${secondValue}${secMeter}`,
        value: `${firstValue}${meter}-${secondValue}${secMeter}`,
      })
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
      setMergedPresets([...allPresets, ...byDefaultPrest]);
    }
  }, [allPresets]);

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    const numbers = inputValue.split(/[,-]/);
    if (
      numbers.every(
        (number) =>
          number === '' ||
          (parseInt(number) >= 1 && parseInt(number) <= numOfPages)
      )
    ) {
      setOptionsValue(inputValue);
      setOptionError(false);
    } else {
      setOptionError(true);
    }
  };

  const handleCalibrate = () => {
    const newData: any = {};
    let scale = '';

    if (value === 'preset') {
      scale = preset;
    } else if (value === 'custom') {
      scale = `${firstValue}${meter}-${secondValue}${secMeter}`;
    }

    if (optionsValue !== 'all' && optionsValue !== 'page') {
      if (optionsValue?.includes('-')) {
        const range = optionsValue?.split('-').map(Number);
        const [start, end] = range;
        for (let i = start; i <= end; i++) {
          newData[i] = { scale: scale, precision: precision };
        }
      } else if (optionsValue?.includes(',')) {
        const numbers = optionsValue?.split(',').map(Number);
        numbers.forEach((num) => {
          newData[num] = { scale: scale, precision: precision };
        });
      }
    } else if (optionsValue === 'all' || optionsValue === 'page') {
      if (optionsValue === 'page') {
        newData[page ? page : '1'] = { scale: scale, precision: precision };
      } else {
        for (let i = 1; i <= numOfPages; i++) {
          newData[i] = { scale: scale, precision: precision };
        }
      }
    }

    setScaleData((prevData: any) => ({ ...prevData, ...newData }));
    setModalOpen(false);
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
            <div className="flex items-center gap-1">
              <Input
                value={optionsValue}
                className={`w-full ${
                  optionError && '!border-1 !border-rose-500'
                }`}
                onChange={(e) => handleOptionChange(e)}
              />
              <div className="">
                <Image
                  src={'/chevron-down.svg'}
                  alt={'alt'}
                  width={14}
                  height={14}
                  onClick={() => setShowOptions(!showOptions)}
                />
              </div>
            </div>
            {/* <Select className="w-full" /> */}
          </div>
          {showOptions && (
            <div className="w-48 absolute left-[148px] top-[124px] z-30 bg-white cursor-pointer">
              <div onClick={() => setOptionsValue('page')}>{`Current Page (${
                page ? page : 1
              }) `}</div>
              <div onClick={() => setOptionsValue('all')}>
                {`All pages ( 1 - ${numOfPages} )`}
              </div>
            </div>
          )}
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
                <Input
                  value={firstValue}
                  className="!w-[115px]"
                  onChange={(e) => setFirstValue(e.target.value)}
                />
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
                <Input
                  value={secondValue}
                  className={`!w-[115px] ${
                    secValError && '!border-1 !border-rose-500'
                  } `}
                  onChange={(e) => {
                    const inputValue = e.target.value;

                    if (secMeter !== `ft' in'` && inputValue.includes('/')) {
                      setSecValError(true);
                      return;
                    }

                    if (inputValue.length > 8) {
                      setSecValError(true);
                      return;
                    }

                    if (inputValue.length > 0 && !/^[1-9]/.test(inputValue)) {
                      setSecValError(true);
                      return;
                    }

                    if (inputValue.includes('/')) {
                      const parts = inputValue.split('/');
                      if (
                        parts.length !== 2 ||
                        isNaN(Number(parts[0])) ||
                        isNaN(Number(parts[1])) ||
                        parts[1].length > 2
                      ) {
                        setSecValError(true);
                        return;
                      }
                    }
                    setSecValError(false);
                    setSecondValue(inputValue);
                  }}
                />
                <Select
                  value={secMeter}
                  className="w-[115px]"
                  onChange={(value) => {
                    setSecondValue('');
                    setSecMeter(value);
                  }}
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
          <Button text="Calibrate" onClick={handleCalibrate} />
        </div>
      </div>
    </div>
  );
};

export default ScaleModal;
