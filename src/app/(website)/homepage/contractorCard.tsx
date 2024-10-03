import React from 'react';
import Image from 'next/image';

interface IProps {
  imageSrc: string;
  imageSrc2?: string;
  title?: string;
  title2?: string;
  description: string;
}

const ContractorCard = ({
  imageSrc,
  imageSrc2,
  title,
  title2,
  description,
}: IProps) => {
  return (
    <div className="flex flex-col max-w-[347px]   rounded-[16px] p-4 gap-6 mt-0 md:mt-[40px]">
      <div>
        <Image
          src={imageSrc}
          width={315}
          height={165}
          alt={'title'}
          className="border rounded-sm border-[#E7E9ED]"
        />
      </div>
      <div className="relative flex flex-col items-start pl-1">
        <div className="font-Gilroy font-bold text-[21px] leading-[26px] -tracking-[0.5px] text-gray">
          {title}
        </div>
        <div className="font-Gilroy font-regular text-h3 -tracking-[0.2px] text-gray opacity-70 mt-[12px]">
          {description}
        </div>
        <div className="mt-[24px] w-full">
          <div className="flex justify-between flex-row items-center font-Gilroy font-bold text-blue  w-full">
            <div className="font-Gilroy font-regular text-[15px] -tracking-[0.2px] text-gray opacity-70 mt-[12px] ">
              {title2}
            </div>
            <div className="transform transition-transform duration-300 group-hover:translate-x-1">
              <img src={imageSrc2} alt="image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractorCard;
