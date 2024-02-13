'use client';
import Image from 'next/image';
import { Input } from 'antd';

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Count: React.FC<Props> = ({ setModalOpen }) => {
  return (
    <div className="py-2.5 px-2.5 w-[204px] bg-[#F2F2F2] border border-solid border-elboneyGray rounded-[4px]">
      <section className="w-full">
        <div className="flex justify-between items-center border-b-[#6a6767] border  ">
          <div>
            <label>Count</label>
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
            <label>Count</label>
            <div className="w-[92px]">
              <Input className="!rounded-md" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Count;
