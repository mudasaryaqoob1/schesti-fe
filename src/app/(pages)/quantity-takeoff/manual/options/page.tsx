'use client';

import React from 'react';
import { bg_style } from '@/globals/tailwindvariables';
import Image from 'next/image';
import SecondaryHeading from '@/app/component/headings/Secondary';
import Description from '@/app/component/description';
import CustomButtonW from '@/app/component/customButton/white';
import CustomButton from '@/app/component/customButton/button';
import { useRouter } from 'next/navigation';

const Upload = () => {
  const router = useRouter();

  return (
    <div className={`${bg_style} flex justify-center items-center mx-16 my-6`}>
      <div
        className=" h-auto  py-8 
    flex flex-col items-center  gap-3  px-5 
    "
      >
        <div className="rounded-full flex justify-center items-center bg-lightGray w-64 h-64 ">
          <Image
            src={'/takeoff.png'}
            alt="createicon"
            width={134}
            height={134}
          />
        </div>
        <SecondaryHeading
          title="Upload"
          className="text-obsidianBlack2 mt-1.5"
        />
        <Description
          title="Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."
          className="text-steelGray text-center mb-6 px-6"
        />
        <div className="w-[394px]">
          <CustomButton
            text="Create your TakeOff"
            className="w-full"
            onClick={() => router.push('/takeoff/report')}
          />
        </div>
      </div>
      <div
        className=" h-auto py-2 bg-cosmicGray rounded-2xl
    flex flex-col items-center  gap-3  px-5  
    "
      >
        <div className="rounded-full flex justify-center items-center bg-lightGray w-64 h-64">
          <Image
            src={'/takeOffAi.svg'}
            alt="createicon"
            width={134}
            height={134}
          />
        </div>
        <SecondaryHeading
          title="Takeoff by Al"
          className="text-obsidianBlack2 mt-1.5"
        />
        <Description
          title="Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."
          className="text-steelGray text-center mb-6 px-6"
        />
        <div className="w-[394px]">
          <CustomButtonW
            text="Create your TakeOff"
            className="w-full"
            // onClick={() => router.push('/upload')}
          />
        </div>
      </div>
    </div>
  );
};

export default Upload;
