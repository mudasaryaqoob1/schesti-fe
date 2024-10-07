import React from 'react';
import Image from 'next/image';
const Networking = () => {
  return (
    <div className="container flex flex-col-reverse items-center justify-between px-4 py-4 lg:flex-row lg:py-16 lg:px-0">
      <div className="relative mt-8 lg:mt-0">
        <Image
          src="/images/services-image5.png"
          width={580}
          height={586}
          alt="image5"
          className=""
        />
      </div>
      <div className="lg:max-w-[461px] flex flex-col">
        <div className="font-bold text-[16px] leading-[20px] font-Gilroy tracking-[1.6px] text-[#007AB6] uppercase lg:text-xl">
          Networking
        </div>
        <div className="font-bold font-Gilroy text-[20px] lg:text-[32px] lg:leading-[48px] leading-[28px] -tracking-[1.2px] text-[#161C2D] mt-2 lg:mt-3">
          Simplify Your Partner Search with SCHESTI Smart Networking Solutions
        </div>
        <div className="font-regular font-Gilroy text-[14px] lg:text-[19px] leading-[32px] text-[#161C2D] opacity-70 mt-4 lg:mt-2">
          Schesti unites GCs, subcontractors, and suppliers on a global network,
          enhancing connections, collaboration, and business opportunities. It
          offers powerful tools for project showcasing, bid management, AI
          take-offs, and tailored searches, streamlining preconstruction
          processes for all stakeholders{' '}
        </div>
        <button className="flex flex-row  bg-transparent cursor-pointer items-center gap-[10px] font-Gilroy font-bold text-[#007AB6] group mt-[28px]">
          Get started
          <img
            src="/images/arrow.svg"
            alt="arrow"
            className="transition-transform duration-300 transform group-hover:translate-x-2"
          />
        </button>
      </div>
    </div>
  );
};

export default Networking;
