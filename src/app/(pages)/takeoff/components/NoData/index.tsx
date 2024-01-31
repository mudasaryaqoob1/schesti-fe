import CustomButton from '@/app/component/customButton/button';
import Description from '@/app/component/description';
import SecondaryHeading from '@/app/component/headings/Secondary';
import { bg_style } from '@/globals/tailwindvariables';
import Image from 'next/image';
const NoData = () => {
  return (
    <div className={`${bg_style} grid place-items-center p-5`}>
      <div
        className="w-[563px] h-auto py-2
        flex flex-col items-center  gap-3  px-5 md:mt-16 
        "
      >
        <div className="rounded-full flex justify-center items-center bg-lightGray w-64 h-64">
          <Image
            src={'/takeoff.png'}
            alt="createicon"
            width={134}
            height={134}
          />
        </div>
        <SecondaryHeading
          title="No Takeoff Record"
          className="text-obsidianBlack2 mt-1.5"
        />
        <Description
          title="Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."
          className="text-steelGray text-center mb-6 px-6"
        />
        <CustomButton text="Create your TakeOff" className="w-full" />
      </div>
    </div>
  );
};

export default NoData;
