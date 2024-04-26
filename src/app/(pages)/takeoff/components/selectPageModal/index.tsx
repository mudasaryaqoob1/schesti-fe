'use client';
import Button from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import Image from 'next/image';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import { Select, Radio, Input, Checkbox } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { fetchTakeoffPreset } from '@/redux/takeoff/takeoff.thunk';
import { AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { selectTakeoffPreset } from '@/redux/takeoff/takeoff.Selector';
import { takeoffPresetService } from '@/app/services/takeoff.service';
import { addNewTakeoffPresetData } from '@/redux/takeoff/takeoff.slice';
import { ScaleContext } from '../../context';
import { ScaleDataContextProps } from '../../context/ScaleContext';
import { measurementUnits } from '@/app/hooks/useDraw';
import { useRouter } from 'next/router';

const precisions = ['1', '0.1', '0.01', ' 0.001', '0.0001', '0.00001'];
const byPrecision = ['1', '1/2', '1/4', '1/8', '1/16', '1/32'];
const meters = ['in', 'cm', 'mm'];

const byDefaultPrest = [
  { label: `1"=1"`, value: `1"=1"` },
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
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  numOfPages: number;
  page?: number;
  uploadFileData?: any;
  handleSrc?: any;
  router?: any;
}

const SelectPageModal = ({ setModalOpen, numOfPages, page, uploadFileData, handleSrc, router }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const allPresets = useSelector(selectTakeoffPreset);
  const [selectedPages, setselectedPages] = useState<any>([])
  const [loading, setloading] = useState(false)

  const handleAddRemove = (item: any) => {
    const itemExists = selectedPages?.find((i: any) => i == item)
    if (itemExists) {
      const filtered = selectedPages?.filter((i: any) => i != item)
      setselectedPages(filtered)
    } else {
      setselectedPages((ps: any) => ([...ps, item]))
    }
  }

  console.log(selectedPages, " ===> selectedPages");

  const handleCalibrate = () => {
    try {
      setloading(true)
      handleSrc(selectedPages)
      // setModalOpen(false)
      router.push('/takeoff/scale');
    } catch (error) {
      console.log(error, " error while adding");
      setloading(false)
    }
  };

  return (
    <div className="py-2.5 px-6 bg-white border border-solid border-elboneyGray rounded-[4px] z-50">
      <section className="w-full">
        <div className="flex justify-between items-center border-b-Gainsboro ">
          <div>
            <QuaternaryHeading
              title="Select Pages"
              className="text-graphiteGray font-bold"
            />
            {/* <QuinaryHeading
              title="Select any existing client from here."
              className="text-coolGray"
            /> */}
          </div>
          {/* <Image
            src={'/crossblack.svg'}
            alt="close icon"
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={() => setModalOpen(false)}
          /> */}
        </div>
        <div className='py-6' >
          <div className='mb-4 px-5 flex gap-x-4 justify-end' >
            <span className='underline cursor-pointer text-[#7138df]' onClick={() => { setselectedPages(uploadFileData) }} >select all</span>
            <span className='underline cursor-pointer text-[#7138df]' onClick={() => { setselectedPages([]) }} >clear</span>
          </div>
          <div className='flex justify-center flex-wrap gap-6 max-h-[400px] overflow-y-auto no-scrollbar' >
            {
              uploadFileData && Array.isArray(uploadFileData) && uploadFileData?.map((i: any) => {
                const isIncluded = selectedPages?.find((it: any) => it == i) ? true : false
                return <div onClick={() => { handleAddRemove(i) }} className={`border relative w-56 h-72 rounded-xl cursor-pointer ${isIncluded ? 'border-[#7138df]' : 'border-gray-400'}`} >
                  <img src={i?.src} className='w-full h-full rounded-xl' alt='img' />
                  <span className={`w-3 h-3 rounded-xl absolute top-3 right-3 cursor-pointer border ${isIncluded ? 'bg-[#7138df] border-[#7138df]' : 'bg-transparent border-gray-400'}`} >.</span>
                </div>
              })
            }
          </div>
        </div>
      </section>
      <div className="flex justify-end gap-4 mt-5 mb-2">
        {/* <div>
          <Button
            text="Cancel"
            className="!bg-snowWhite !text-abyssalBlack !py-1.5 "
            onClick={() => setModalOpen(false)}
          />
        </div> */}
        <div>
          <Button
            text="Add"
            onClick={handleCalibrate}
            className="!py-1.5 disabled:!bg-lavenderPurple"
            disabled={selectedPages?.length < 1}
            isLoading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectPageModal;
