'use client';
import Button from '@/app/component/customButton/button';
import Image from 'next/image';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import { Select } from 'antd';

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ScaleModal = ({ setModalOpen }: Props) => {
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
        <div className="p-6">
          <div className="flex gap-6 items-center">
            <label>Options:</label>
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
