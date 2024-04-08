import { Popups } from '@/app/(pages)/bid-management/components/Popups';
import CustomButton from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import { InputComponent } from '@/app/component/customInput/Input';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { TextAreaComponent } from '@/app/component/textarea';
import { SearchOutlined } from '@ant-design/icons';
import { Avatar, Radio } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import Image from 'next/image';
import { useState } from 'react';

export function ProjectRFICenter() {
  const [showRfiModal, setShowRfiModal] = useState(false);

  function toggleRfiModal() {
    setShowRfiModal(!showRfiModal);
  }


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
              <div className="cursor-pointer flex items-center space-x-1 hover:bg-gray-100 hover:px-1 hover:py-1 hover:rounded-lg hover:transition-all hover:translate-x-1
              relative
              "
                onClick={e => {
                  e.stopPropagation();
                  e.preventDefault();
                  toggleRfiModal();
                }}
              >
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
                {showRfiModal ? <div className='absolute right-20' onClick={e => {
                  e.stopPropagation()
                }}>
                  <Popups
                    title='RFI'
                    onClose={() => {
                      setShowRfiModal(false);
                    }}
                  >
                    <div className='space-y-3'>
                      <TextAreaComponent
                        label='Description'
                        name='description'
                        field={{
                          rows: 7
                        }}
                      />
                      <div className='space-y-1'>
                        <TertiaryHeading
                          title='Type'
                          className='text-sm font-medium leading-6 capitalize text-graphiteGray '
                        />
                        <Radio.Group>
                          <Radio value={'private'}>Private</Radio>
                          <Radio value={'public'}>Public</Radio>
                        </Radio.Group>
                      </div>

                      <div>
                        <Dragger
                          name={'file'}
                          accept="image/*,gif,application/pdf"

                          beforeUpload={() => {

                            return false;
                          }}
                          style={{
                            borderStyle: 'dashed',
                            borderWidth: 6,
                          }}
                          itemRender={() => {
                            return null;
                          }}
                        >
                          <p className="ant-upload-drag-icon">
                            <Image
                              src={'/uploadcloud.svg'}
                              width={50}
                              height={50}
                              alt="upload"
                            />
                          </p>
                          <p className="text-[12px] py-2 leading-3 text-[#98A2B3]">
                            Drop your image here, or browse
                          </p>
                          <p className="text-[12px] leading-3 text-[#98A2B3]">
                            PNG, GIF, JPG, Max size: 2MB
                          </p>
                        </Dragger>
                      </div>

                      <CustomButton
                        text='Send'
                      />
                    </div>

                  </Popups>
                </div> : null}
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
