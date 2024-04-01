import CustomButton from '@/app/component/customButton/white';
import { InputComponent } from '@/app/component/customInput/Input';
import TertiaryHeading from '@/app/component/headings/tertiary';
import Image from 'next/image';

export function ProjectAcitivityAndStatusTracking() {
  return (
    <div className=" mt-6 mb-4 md:ms-[69px] md:me-[59px] mx-4  p-5 bg-white rounded-lg border shadow-lg">
      <div className="flex items-center justify-between">
        <TertiaryHeading
          title="Activity and Status Tracking"
          className="text-[20px] leading-[30px]"
        />
        <div className="flex items-center space-x-3">
          <div className="pt-2">
            <CustomButton
              text="Export"
              icon="/uploadcloud.svg"
              iconwidth={20}
              iconheight={20}
              className="!w-28"
            />
          </div>
          <div className="w-96">
            <InputComponent
              label=""
              placeholder="Search"
              name="search"
              type="text"
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex py-3 px-1 space-x-3 border-b border-[#EAECF0] items-center justify-between">
          <Image
            src={'/green-tracking.svg'}
            height={23}
            width={23}
            alt="green tracking icon"
          />
          <div className="flex-1 space-y-2">
            <TertiaryHeading
              title="Ayro, Inc."
              className="font-semibold text-[#344054] text-[14px] leading-5"
            />

            <div className="flex items-center space-x-4">
              <Image
                src={'/navigation-icon.svg'}
                height={20}
                width={20}
                alt="navigation icon"
              />
              <TertiaryHeading
                title="6391 Elgin St. Celina, Delaware 10299"
                className="text-[#667085] text-[14px] leading-5 font-normal"
              />

              <Image
                src={'/mail-icon.svg'}
                height={20}
                width={20}
                alt="mail icon"
              />
              <TertiaryHeading
                title="xyz@gmail.com"
                className="text-[#667085] text-[14px] leading-5 font-normal"
              />

              <Image
                src={'/call-icon.svg'}
                height={20}
                width={20}
                alt="mail icon"
              />
              <TertiaryHeading
                title="+1 232 1222 3232"
                className="text-[#667085] text-[14px] leading-5 font-normal"
              />
            </div>
          </div>
          <div>
            <TertiaryHeading
              title="13 September, 9:43 PM"
              className="text-[#667085] text-[14px] leading-5 font-normal"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
