import React from 'react';
import Image from 'next/image';
const servicesbidding = () => {
  return (
    <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-4 py-4 lg:py-20 lg:px-0 ">
      <div className="lg:max-w-[434px] flex justify-between flex-col">
        <div className="font-bold text-h4 font-Gilroy tracking-[1.6px] text-blue uppercase lg:text-xl">
          Bid Management
        </div>
        <div className="font-bold font-Gilroy text-[20px] lg:text-[24px] leading-[28px] lg:leading-[36px] -tracking-[1.2px] text-gray mt-2 lg:mt-3">
          Unlock the Future of Bid Management with SCHESTI
        </div>
        <div className="font-regular font-Gilroy text-[14px] lg:text-h2 text-gray opacity-70 mt-4 lg:mt-6">
          Experience an evolution in handling construction projects with SCHESTI
          advanced bid management tools, Our platform offers unparalleled speed,
          accuracy, and customization, seamlessly integrating cutting-edge
          technology into every phase of your project lifecycle.
        </div>
        <button className="flex flex-row items-center gap-[10px] font-Gilroy font-bold text-blue group mt-[28px]">
          Get started
          <img
            src="/images/arrow.svg"
            alt="arrow"
            className="transform transition-transform duration-300 group-hover:translate-x-2"
          />
        </button>
      </div>
      <div className="relative mt-8 lg:mt-0">
        <div className="absolute hidden md:flex -right-3 bottom-96">
          <img src="/images/up_arrow.png" alt="up arrow" />
        </div>
        <div className="absolute hidden md:flex bottom-0 -left-4 lg:left-0">
          <img src="/images/down_arrow.png" alt="down arrow" />
        </div>
        <div className="absolute lg:flex hidden -right-[116px] bottom-8">
          <Image
            src="/images/service_star1.png"
            width={130}
            height={108}
            alt="star"
            className=""
          />
        </div>
        <Image
          src="/images/image_7con.png"
          width={513}
          height={470}
          alt="illustration"
          className="w-full max-w-[513px] h-auto"
        />
      </div>
    </div>
  );
};

export default servicesbidding;
