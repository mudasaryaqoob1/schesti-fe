'use client';
import Image from 'next/image';
import WhiteButton from '@/app/component/customButton/white';
import Button from '@/app/component/customButton/button';

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Dynamic: React.FC<Props> = ({ setModalOpen }) => {
  return (
    <div className="py-2.5 px-2.5 w-[204px] bg-[#DFDFDF] border border-solid border-elboneyGray rounded-[4px]">
      <section className="w-full">
        <div className="flex justify-between items-center border-b-[#6a6767] border  ">
          <div>
            <label>Dynamic</label>
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
          <div className="flex flex-col">
            <label>Define :</label>
            <div className="flex flex-row"></div>
          </div>
          <div className="flex flex-col">
            <label>Create :</label>
            <div className="flex flex-row"></div>
          </div>
          <div className="flex flex-col gap-2">
            <Button
              text="Apply"
              className="!h-9 !text-abyssalBlack flex items-center justify-center"
              onClick={() => setModalOpen(false)}
            />
            <WhiteButton
              className="!h-9 flex items-center justify-center"
              text="Cancel"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dynamic;
