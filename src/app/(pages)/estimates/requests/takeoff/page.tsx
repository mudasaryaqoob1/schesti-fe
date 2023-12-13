'use client';
import CustomButton from '@/app/component/customButton/button';
import { minHeading, senaryHeading } from '@/globals/tailwindvariables';
import React, { useState } from 'react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import ClientInfo from './clientInfo';
import Projectinformation from './projectinformation';
import Assignments from './assignments';
import { useRouter } from 'next/navigation';
import TertiaryHeading from '@/app/component/headings/tertiary';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import MinDescription from '@/app/component/description/minDesc';
import CustomWhiteButton from '@/app/component/customButton/white';
import Existing from '../../components/existing';
import ModalComponent from '@/app/component/modal';

const TakeOff = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ModalComponent open={showModal} setOpen={setShowModal}>
        <Existing setModalOpen={setShowModal} />
      </ModalComponent>
      <section className="pt-6 pb-3 px-16">
        <div className=" flex flex-col">
          <div className="flex justify-between items-center  md:flex-wrap relative">
            <TertiaryHeading title="Take Off Measurements" />
            <CustomWhiteButton
              text="Add Existing Client"
              className="!w-auto "
              icon="/plusblack.svg"
              iconwidth={20}
              iconheight={20}
              onClick={() => setShowModal(true)}
            />
          </div>
          <ClientInfo />
          <Projectinformation />
          <Assignments />

          <div className="p-5 mt-4 border-2  border-silverGray pb-4 rounded-lg shadow-quinarGentleDepth">
            <QuaternaryHeading
              title="Uploads"
              className="text-graphiteGray font-semibold"
            />
            <div className="flex items-center gap-3">
              <div className="w-60">
                <p className={`${senaryHeading} text-midnightBlue font-popin`}>
                  Architecture
                </p>
                <div
                  className="my-2 p-4 flex items-center flex-col gap-2 border-2
                 border-silverGray pb-4 rounded-lg "
                >
                  <Image
                    src={'/uploadcloud.svg'}
                    alt="upload icon"
                    width={20}
                    height={20}
                    className="rounded-3xl border-5 border-paleblueGray bg-lightGrayish"
                  />
                  <div className="flex gap-3 items-center">
                    <div>
                      <p
                        className={twMerge(
                          `${senaryHeading}
                         text-RoyalPurple font-semibold`
                        )}
                      >
                        Click to upload
                      </p>
                    </div>
                    <MinDescription
                      className="text-steelGray font-popin text-center"
                      title="or drag and drop"
                    />
                  </div>
                  <MinDescription
                    className="text-steelGray font-popin text-center"
                    title="SVG, PNG, JPG or GIF (max. 800x400px)"
                  />
                </div>
              </div>
              <div className="w-60">
                <p className={`${senaryHeading} text-midnightBlue font-popin`}>
                  Other Documents
                </p>
                <div
                  className="p-4 my-2 flex items-center flex-col gap-2 border-2
                 border-silverGray pb-4 rounded-lg "
                >
                  <Image
                    src={'/uploadcloud.svg'}
                    alt="upload icon"
                    width={20}
                    height={20}
                    className="rounded-3xl border-5 border-paleblueGray bg-lightGrayish"
                  />
                  <div className="flex gap-3 items-center">
                    <div>
                      <p
                        className={twMerge(
                          `${senaryHeading}
                         text-RoyalPurple font-semibold`
                        )}
                      >
                        Click to upload
                      </p>
                    </div>
                    <p className={`${minHeading} text-midnightBlue font-popin`}>
                      or drag and drop
                    </p>
                  </div>
                  <p
                    className={`${minHeading} text-midnightBlue font-popin text-center `}
                  >
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* buttons */}
          <div
            className="self-end  flex justify-end items-center gap-1
           md:my-5 my-3 bg-white shadow-secondaryTwist"
          >
            <div className="!px-5 !py-3 ">
              <CustomButton
                className="  !border-celestialGray 
            !shadow-scenarySubdued2  
             !text-graphiteGray 
              !bg-snowWhite
              !px-5 !py-3
              "
                text="Cancel"
                onClick={() => router.push('/estimates')}
              />
            </div>
            <div className="!px-5 !py-3 !w-64">
              <CustomButton
                text="Next"
                className="!px-5 !py-3"
                onClick={() => router.push('/estimates')}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TakeOff;
