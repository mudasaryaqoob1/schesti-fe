import CustomButton from '@/app/component/customButton/button';
import Image from 'next/image';
import { Pagination } from 'antd';
const Index = () => {
  return (
    <div className="flex mt-5 overflow-x-auto w-full justify-between items-center">
      <div>
        <CustomButton
          className={`!bg-transparent   !border-celestialGray 
        shadow-scenarySubdued2 px-5 py-2.5   
         !text-graphiteGray min-w-40 `}
          icon="/arrow-left.svg"
          iconheight={20}
          iconwidth={20}
          text="Previous"
        />
      </div>
      <Pagination defaultCurrent={1} total={100} />
      <div>
        <button
          className={`!bg-transparent rounded-lg border border-celestialGray 
        shadow-scenarySubdued2 px-5 py-2.5  cursor-pointer 
         text-graphiteGray min-w-40 bg-snowWhite`}
        >
          Next
          <Image
            src={'/arrow-right.svg'}
            alt="right arrow icon"
            height={20}
            width={20}
          />
        </button>
      </div>
    </div>
  );
};

export default Index;
