'use client';
import Image from 'next/image';
import WhiteButton from '@/app/component/customButton/white';
import Button from '@/app/component/customButton/button';

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Dynamic: React.FC<Props> = ({ setModalOpen }) => {
  return (
    <div className="py-2.5 px-2.5 w-[204px] bg-[#F2F2F2] border border-solid border-elboneyGray rounded-[4px]">
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
            <div className="flex flex-col py-2 gap-2">
              <div className="flex flex-row gap-3">
                <div className="bg-white px-[15px] py-[11px] rounded-lg ">
                  <Image src={'/dyn1.svg'} alt="s" width={18} height={18} />
                </div>
                <div className="bg-white px-[15px] py-[11px] rounded-lg ">
                  <Image src={'/dyn2.svg'} alt="s" width={18} height={18} />
                </div>
              </div>
              <div className="flex flex-row gap-3">
                <div className="bg-white px-[15px] py-[11px] rounded-lg ">
                  <Image src={'/dyn3.svg'} alt="s" width={18} height={18} />
                </div>
                <div className="bg-white px-[15px] py-[11px] rounded-lg ">
                  <Image src={'/dyn4.svg'} alt="s" width={18} height={18} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <label>Create :</label>
            <div className="flex flex-col py-2 gap-2">
              <div className="flex flex-row gap-3">
                <div className="bg-white px-[15px] py-[11px] rounded-lg ">
                  <Image src={'/create1.svg'} alt="s" width={18} height={18} />
                </div>
                <div className="bg-white px-[15px] py-[11px] rounded-lg ">
                  <Image src={'/volume.svg'} alt="s" width={18} height={18} />
                </div>
              </div>
              <div className="flex flex-row gap-3">
                <div className="bg-white px-[15px] py-[11px] rounded-lg ">
                  <Image src={'/create3.svg'} alt="s" width={18} height={18} />
                </div>
                <div className="bg-white px-[15px] py-[11px] rounded-lg ">
                  <Image src={'/create4.svg'} alt="s" width={18} height={18} />
                </div>
              </div>
              <div className="flex flex-row gap-3">
                <div className="bg-white px-[15px] py-[11px] rounded-lg ">
                  <Image src={'/create5.svg'} alt="s" width={18} height={18} />
                </div>
                <div className="bg-white px-[15px] py-[11px] rounded-lg ">
                  <Image src={'/create6.svg'} alt="s" width={18} height={18} />
                </div>
              </div>
            </div>
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
