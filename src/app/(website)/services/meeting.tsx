import React from 'react';
import Image from 'next/image';
const Meeting = () => {
  return (
    <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between lg:px-0 lg:py-20 py-4 px-4">
      <div className="relative mt-8 lg:mt-0">
        <Image
          src="/images/services-image11.png"
          width={515}
          height={322}
          alt="illustration"
          className="w-full max-w-[513px] h-auto"
        />
      </div>
      <div className="lg:max-w-[558px] flex flex-col">
        <div className="font-bold text-h4 font-Gilroy tracking-[1.6px] text-blue uppercase lg:text-xl">
          Meeting{' '}
        </div>
        <div className="font-bold font-Gilroy text-[20px] lg:text-[32px] leading-[48px] lg:leading-[36px] -tracking-[1.2px] text-gray mt-2">
          Enhance Collaboration with SCHESTI: <br />
          <span className="font-medium font-Gilroy text-[20px] lg:text-[32px] leading-[48px] lg:leading-[36px] -tracking-[1.2px] ">
            Screen Sharing, Online Video Calls, Meetings, and Conferencing{' '}
          </span>{' '}
        </div>
        <div className="max-w-[504px] font-regular font-Gilroy text-[14px] lg:text-h2 text-gray opacity-70 mt-4 lg:mt-5">
          At SCHESTI, we prioritize every aspect of construction, including
          online meeting services. Experience exceptional video and audio
          quality in one comprehensive platform tailored to meet your needs.
        </div>
        <button className="flex flex-row items-center gap-[10px] font-Gilroy font-bold text-blue group lg:mt-[24px] mt-5">
          Get started
          <img
            src="/images/arrow.svg"
            alt="arrow"
            className="transform transition-transform duration-300 group-hover:translate-x-2"
          />
        </button>
      </div>
    </div>
  );
};

export default Meeting;
