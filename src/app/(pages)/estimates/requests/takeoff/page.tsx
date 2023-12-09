'use client';
import CustomButton from '@/app/component/customButton/button';
import Heading from '@/app/component/customheading/heading';
import {
  minHeading,
  senaryHeading,
  quaternaryHeading,
  tertiaryHeading,
} from '@/globals/tailwindvariables';
import React from 'react';
import Paragraph from '@/app/component/customparagraph/paragraph';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import ClientInfo from './clientInfo';
import Projectinformation from './projectinformation';
import Assignments from './assignments';
import { useRouter } from 'next/navigation'
const page = () => {
  const router = useRouter();
  return (
    <>
      <section className="pt-2.5 pb-3 px-12">
        <div className="p-5  flex flex-col">
          <div className="flex justify-between items-center mb-3 md:flex-wrap">
            <Heading
              styledVars={tertiaryHeading}
              title="Take Off Measurements"
              classes="text-graphiteGray"
            />
            <CustomButton
              text="Add Existing Client"
              className="!w-auto "
              icon="plus.svg"
              iconwidth={20}
              iconheight={20}
              onClick={() => router.push('/estimates/requests/existing')}
            />
          </div>
          <ClientInfo />
          <Projectinformation />
          <Assignments />

          <div className="p-5 my-2 border-2 border-silverGray pb-4 rounded-lg shadow-quinarGentleDepth">
            <Heading
              styledVars={quaternaryHeading}
              title="Uploads"
              classes="text-graphiteGray font-semibold"
            />
            <div className="flex items-center gap-3">
              <div className="w-60">
                <Paragraph
                  styledVars={senaryHeading}
                  classes="text-midnightBlue font-popin"
                  title="Other Documents"
                />
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
                    <Paragraph
                      styledVars={minHeading}
                      classes="text-midnightBlue font-popin"
                      title="or drag and drop"
                    />
                  </div>
                  <Paragraph
                    styledVars={minHeading}
                    classes="text-midnightBlue font-popin text-center"
                    title="SVG, PNG, JPG or GIF (max. 800x400px)"
                  />
                </div>
              </div>
              <div className="w-60">
                <Paragraph
                  styledVars={senaryHeading}
                  classes="text-midnightBlue font-popin"
                  title="Other Documents"
                />
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
                    <Paragraph
                      styledVars={minHeading}
                      classes="text-midnightBlue font-popin"
                      title="or drag and drop"
                    />
                  </div>
                  <Paragraph
                    styledVars={minHeading}
                    classes="text-midnightBlue font-popin text-center"
                    title="SVG, PNG, JPG or GIF (max. 800x400px)"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* buttons */}
          <div
            className="self-end  flex justify-between items-center gap-10
           md:my-5 my-3"
          >
            <div className="!px-5 !py-3">
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
              <CustomButton text="Next" className="!px-5 !py-3"
                onClick={() => router.push('/estimates')}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
