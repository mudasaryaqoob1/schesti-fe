import WhiteButton from '@/app/component/customButton/white';
import { InputComponent } from '@/app/component/customInput/Input';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { SearchOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import Image from 'next/image';

export function ProjectRFICenter() {
  return (
    <div className="mb-4 md:ms-[69px] md:me-[59px] mx-4  ">
      <div className="flex items-center justify-between">
        <TertiaryHeading
          title="RFI Center"
          className="text-[20px] leading-[30px]"
        />

        <div className="flex items-center space-x-2">
          <div className="pt-1">
            <WhiteButton
              text="Export"
              icon="/uploadcloud.svg"
              iconwidth={20}
              iconheight={20}
            />
          </div>

          <div className="w-96">
            <InputComponent
              label=""
              placeholder="Search"
              name="search"
              type="text"
              field={{
                prefix: <SearchOutlined className="text-xl" />,
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex bg-white rounded-lg shadow">
        <Avatar
          src="https://static.vecteezy.com/system/resources/previews/011/883/287/non_2x/modern-letter-c-colorful-logo-with-watter-drop-good-for-technology-logo-company-logo-dummy-logo-bussiness-logo-free-vector.jpg"
          size={100}
        />

        <div className="py-4 flex-1 px-4 space-y-3">
          <div className="flex justify-between">
            <TertiaryHeading
              title="Dale Hockenberry | 2022-02-21 20:03:43"
              className="text-[14px] leading-5 font-semibold text-[#667085]"
            />
            <div className="flex items-center space-x-4">
              <p className="py-[5px] rounded-full px-[11px] bg-[#E9EBF8] text-[#7138DF] text-xs leading-4">
                New
              </p>
              <div className="flex items-center space-x-1">
                <Image
                  src={'/message-circle.svg'}
                  alt="message-circle icon"
                  width={17}
                  height={18}
                />
                <TertiaryHeading
                  title="Reply"
                  className="text-[#475467] text-[14px] leading-6 font-normal "
                />
              </div>
            </div>
          </div>
          <TertiaryHeading
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at nunc sit amet nunc. Nulla at nunc sit amet nunc. Nulla at nunc sit amet nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at nunc sit amet nunc. Nulla at nunc sit amet nunc. Nulla at nunc sit amet nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at nunc sit amet nunc. Nulla at nunc sit amet nunc. Nulla at nunc sit amet nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at nunc sit amet nunc. Nulla at nunc sit amet nunc. Nulla at nunc sit amet nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at nunc sit amet nunc. Nulla at nunc sit amet nunc. Nulla at nunc sit amet nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at nunc sit amet nunc. Nulla at nunc sit amet nunc. Nulla at nunc sit amet nunc. "
            className="text-[#475467] text-[14px] leading-6 font-normal "
          />
        </div>
      </div>
    </div>
  );
}
