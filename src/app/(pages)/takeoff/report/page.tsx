'use client';
import { useState } from 'react';
import Button from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import { bg_style } from '@/globals/tailwindvariables';
import Image from 'next/image';
import SenaryHeading from '@/app/component/headings/senaryHeading';
import SecondaryHeading from '@/app/component/headings/Secondary';
import Description from '@/app/component/description';
import ModalComponent from '@/app/component/modal';
import ScaleModal from '../components/scale';

const Report = () => {
  const [selectedIcon, setSelectedIcon] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleClick = (item: string) => {
    setSelectedIcon(item);
    setShowModal(true);
  };

  return (
    <>
      <section className="md:px-16 px-8 pb-4">
        <div className="flex gap-4 items-center mt-6">
          <Image src={'/home.svg'} alt="home icon" width={20} height={20} />
          <Image
            src={'/chevron-right.svg'}
            alt="chevron-right icon"
            width={16}
            height={16}
          />
          <SenaryHeading title="Takeoff" className="font-base text-slateGray" />
          <Image
            src={'/chevron-right.svg'}
            alt="chevron-right icon"
            width={16}
            height={16}
          />

          <SenaryHeading
            title="Add new client"
            className="font-semibold text-lavenderPurple cursor-pointer underline"
          />
        </div>

        {/* search project */}
        <div className="bg-white flex justify-between items-center mt-6 ">
          <div
            className="rounded-lg border border-Gainsboro bg-silverGray  h-[51px] 
                        flex 
                        items-center
                            px-3"
          >
            <input
              type="search"
              name=""
              id=""
              placeholder="Enter project name"
              className="w-full h-full
          bg-transparent outline-none"
            />
          </div>
          <div className="flex flex-row gap-3">
            <div>
              <WhiteButton
                text="Generate with AI"
                className="!text-goldenrodYellow !border-goldenrodYellow"

                //   onClick={() => router.push('/createclient')}
              />
            </div>
            <div>
              <Button
                text="Generate Report"
                icon="/plus.svg"
                iconwidth={20}
                iconheight={20}
                //   onClick={() => router.push('/createclient')}
              />
            </div>
          </div>
        </div>

        <div
          className={`h-12 w-full mt-6 flex flex-row items-center justify-center gap-8  py-[5.5px] ${bg_style}`}
        >
          <div
            className="flex flex-col items-center"
            onClick={() => handleClick('scale')}
          >
            <Image
              style={{ color: 'red' }}
              src={'/scale.svg'}
              alt="createicon"
              width={19.97}
              height={11.31}
            />
            <label
              className={`text-xs ${
                selectedIcon === 'scale' ? 'text-[#6F6AF8]' : 'text-[#767676]'
              } `}
            >
              Scale
            </label>
          </div>
          <div
            onClick={() => handleClick('length')}
            className="flex flex-col items-center"
          >
            <Image
              src={'/length.svg'}
              alt="createicon"
              width={19.97}
              height={11.31}
            />
            <label
              className={`text-xs ${
                selectedIcon === 'length' ? 'text-[#6F6AF8]' : 'text-[#767676]'
              } `}
            >
              Length
            </label>
          </div>
          <div
            onClick={() => handleClick('volume')}
            className="flex flex-col items-center"
          >
            <Image
              src={'/volume.svg'}
              alt="createicon"
              width={14}
              height={16}
            />
            <label
              className={`text-xs ${
                selectedIcon === 'volume' ? 'text-[#6F6AF8]' : 'text-[#767676]'
              } `}
            >
              Volume
            </label>
          </div>
          <div
            onClick={() => handleClick('dynamic')}
            className="flex flex-col items-center"
          >
            <Image
              src={'/dynamic.svg'}
              alt="createicon"
              width={15}
              height={14}
            />
            <label
              className={`text-xs ${
                selectedIcon === 'dynamic' ? 'text-[#6F6AF8]' : 'text-[#767676]'
              } `}
            >
              Dynamic
            </label>
          </div>
          <div
            onClick={() => handleClick('count')}
            className="flex flex-col items-center"
          >
            <Image
              src={'/count.svg'}
              alt="createicon"
              width={19.97}
              height={11.31}
            />
            <label
              className={`text-xs ${
                selectedIcon === 'count' ? 'text-[#6F6AF8]' : 'text-[#767676]'
              } `}
            >
              Count
            </label>
          </div>
          <div
            onClick={() => handleClick('area')}
            className="flex flex-col items-center"
          >
            <Image
              src={'/area.svg'}
              alt="createicon"
              width={18.33}
              height={13.72}
            />
            <label
              className={`text-xs ${
                selectedIcon === 'area' ? 'text-[#6F6AF8]' : 'text-[#767676]'
              } `}
            >
              Area
            </label>
          </div>
        </div>

        <div
          className={`grid place-items-center shadow-sceneryShadow rounded-lg mt-4 ${bg_style} h-[580px] `}
        >
          <div className="md:min-w-[493px] flex items-center flex-col gap-2 justify-center shadow-sceneryShadow rounded-lg">
            <Image
              src={'/uploadcloud.svg'}
              alt="upload icon"
              width={80}
              height={80}
            />
            <SecondaryHeading
              title="Drag and Drop here"
              className="cursor-pointer text-graphiteGray"
            />
            <Description title="or" className="cursor-pointer text-coolGray" />
            <label htmlFor="fileInput" className="w-full mt-2 cursor-pointer">
              <input
                type="file"
                id="fileInput"
                name="fileInput"
                className="hidden"
              />
              <WhiteButton className="w-full" text="Select file" />
            </label>
          </div>
        </div>

        <ModalComponent open={showModal} setOpen={setShowModal}>
          <ScaleModal setModalOpen={setShowModal} />
        </ModalComponent>
      </section>
    </>
  );
};

export default Report;
