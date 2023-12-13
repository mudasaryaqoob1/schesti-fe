import CustomButton from '@/app/component/customButton/button';
import CustomWhiteButton from '@/app/component/customButton/white';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import TertiaryHeading from '@/app/component/headings/tertiary';
import Image from 'next/image';
import MinDesc from '@/app/component/description/minDesc';
import { bg_style } from '@/globals/tailwindvariables';
import { Dispatch, SetStateAction } from 'react';
interface Props {
  setPrevNext: Dispatch<SetStateAction<number>>;
}
const TakeOff = ({ setPrevNext }: Props) => {
  return (
    <>
      {/* scope */}
      <div className="flex justify-between items-center">
        <TertiaryHeading
          title="Take Off Measurements"
          className="text-graphiteGray font-semibold"
        />
        <div className="flex gap-3 items-center">
          <CustomWhiteButton
            text="previous"
            className="md:w-32"
            // onClick={() => setPrevNext(prev => prev - 1)}
          />

          <CustomButton
            text="Next"
            className="md:w-32"
            onClick={() => setPrevNext((prev) => prev + 1)}
          />
        </div>
      </div>
      {/* middle */}
      <div className={`${bg_style} p-5  mt-4`}>
        <div className="flex justify-between items-center ">
          <QuaternaryHeading
            title="Estimate Details"
            className="text-graphiteGray font-bold"
          />
          <div className="bg-silverGray rounded-s border border-solid border-Gainsboro cursor-pointer p-2">
            <Image
              src={'/chevron-down.svg'}
              alt="icon"
              width={16}
              height={16}
            />
          </div>
        </div>
        {/*  */}
        <div className="mt-4 grid md:grid-cols-4 md:grid-rows-2  gap-y-6">
          {/* 1 */}
          <div>
            <MinDesc
              title="Company Name"
              className="font-popin text-[16px] text-lightyGray font-normal"
            />
            <MinDesc
              title="Albert Flores"
              className="font-popin text-[16px] text-midnightBlue "
            />
          </div>
          {/* 2 */}
          <div>
            <MinDesc
              title="Company Name"
              className="font-popin font-normal text-[16px] text-lightyGray"
            />
            <MinDesc
              title="Jenny Wilson"
              className="font-popin text-[16px] text-midnightBlue mt-2"
            />
          </div>
          {/* 3 */}
          <div>
            <MinDesc
              title="Phone Number"
              className="font-popin text-[16px] font-normal text-lightyGray"
            />
            <MinDesc
              title="(938) 861-8764"
              className="font-popin text-[16px] text-midnightBlue my-2"
            />
            <div className="flex items-center gap-1">
              <MinDesc
                title="(938) 861-8764"
                className="font-popin text-[16px] text-midnightBlue "
              />
              <MinDesc
                title="(Alternate)"
                className="font-popin text-[16px] text-lightyGray"
              />
            </div>
          </div>
          {/* 4 */}
          <div>
            <MinDesc
              title="Email"
              className="font-popin text-[16px]font-normal text-lightyGray"
            />
            <MinDesc
              title="james@example.com"
              className="font-popin text-[16px] text-midnightBlue my-2"
            />
            <div className="flex items-center gap-2">
              <MinDesc
                title="james@example.com"
                className="font-popin text-[16px] text-midnightBlue"
              />
              <MinDesc
                title="(Alternate)"
                className="font-popin text-[16px] text-lightyGray"
              />
            </div>
          </div>
          {/* 5 */}
          <div>
            <MinDesc
              title="Project name"
              className="font-popin font-normal text-[16px] text-lightyGray"
            />
            <MinDesc
              title="Bessie Cooper"
              className="font-popin text-[16px] text-midnightBlue mt-2"
            />
          </div>
          {/* 6 */}
          <div>
            <MinDesc
              title="Sale person"
              className="font-popin font-normal text-[16px] text-lightyGray"
            />
            <MinDesc
              title="Ralph Edwards"
              className="font-popin text-[16px] text-midnightBlue mt-2"
            />
          </div>
          {/* 7 */}
          <div>
            <MinDesc
              title="Estimator"
              className="font-popin  font-normal text-[16px] text-lightyGray"
            />
            <MinDesc
              title="Leslie Alexander"
              className="font-popin text-[16px] text-midnightBlue mt-2"
            />
          </div>
          {/* 8 */}
          <div>
            <MinDesc
              title="Address"
              className="font-popin font-normal text-[16px] text-lightyGray"
            />
            <MinDesc
              title="2118 Thornridge Cir. Syracuse, Connecticut 35624"
              className="font-popin text-[16px] text-midnightBlue mt-2"
            />
          </div>
        </div>
      </div>
      {/*  */}
      {/* takeoff */}
      <div className={`${bg_style} p-5 mt-6`}>
        <div className="flex justify-between items-center">
          <QuaternaryHeading
            title="Take off"
            className="text-graphiteGray font-bold"
          />
          <div className="bg-silverGray rounded-s border border-solid border-Gainsboro cursor-pointer p-2">
            <Image
              src={'/chevron-down.svg'}
              alt="icon"
              width={16}
              height={16}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TakeOff;
