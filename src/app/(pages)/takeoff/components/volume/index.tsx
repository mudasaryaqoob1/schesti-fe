'use client';
import Image from 'next/image';
import { Input } from 'antd';
import { Measurements } from '../../scale/page';

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  measurements: Measurements;
}

const Volume: React.FC<Props> = ({ setModalOpen, measurements }) => {
  return (
    <div className="py-2.5 px-2.5 w-[204px] bg-[#F2F2F2] border border-solid border-elboneyGray rounded-[4px]">
      <section className="w-full">
        <div className="flex justify-between items-center border-b-[#6a6767] border  ">
          <div>
            <label>Volume</label>
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
        <div className="mt-4 flex flex-col gap-4">
          <div className="flex flex-row items-center justify-between ">
            <label>Volume</label>
            <div className="w-[92px]">
              <Input value={measurements.volume} className="!rounded-md" />
              {/* <Select className="!rounded-md w-full">
                <Select.Option value="cu">Cu</Select.Option>
                <Select.Option value="cy">CY</Select.Option>
                <Select.Option value="cy_ft">CY FT</Select.Option>
                <Select.Option value="tn">TN</Select.Option>
                <Select.Option value="sy">SY</Select.Option>
              </Select> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Volume;
