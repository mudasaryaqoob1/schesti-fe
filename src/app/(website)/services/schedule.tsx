import React from 'react';
import Image from 'next/image';
const Schedule = () => {
  return (
    <div className="container flex flex-col lg:flex-row justify-between items-center lg:py-6 py-4 lg:px-0 px-4">
      <div className="lg:max-w-[524px] flex flex-col">
        <div className="font-bold text-h4 font-Gilroy tracking-[1.6px] text-blue uppercase lg:text-xl">
          Time Schedule{' '}
        </div>
        <div className="font-bold font-Gilroy text-[20px] lg:text-h8 leading-[28px] -tracking-[1.2px] text-gray mt-2">
          Eliminate costly errors in project scheduling with Schesti
        </div>
        <div className="font-regular font-Gilroy text-[14px] lg:text-h2 text-gray opacity-70 mt-4 lg:mt-2">
          Experience precision and efficiency in project scheduling with
          SCHESTI, ensuring precise adherence to timelines. Elevate project
          coordination and eliminate delays with our customizable scheduling
          processes. Our platform empowers detailed planning and seamless
          coordination of materials, equipment, and labor, guaranteeing on time
          and within-budget project completion. <br /> Empower your team with
          the ability to proactively adjust plans for optimized project
          management.
        </div>
        <button className="flex flex-row mt-5 items-center gap-[10px] font-Gilroy font-bold text-blue group">
          Get started
          <img
            src="/images/arrow.svg"
            alt="arrow"
            className="transform transition-transform duration-300 group-hover:translate-x-2"
          />
        </button>
      </div>
      <div className="mt-8 lg:mt-0">
        <Image
          src="/images/services-image8.png"
          width={540}
          height={545}
          alt="image8"
          className="w-full max-w-[532px] h-auto"
        />
      </div>
    </div>
  );
};

export default Schedule;
