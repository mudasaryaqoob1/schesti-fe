import React from 'react';
import Image from 'next/image';
const TakeOff = () => {
  return (
    <div className="container flex flex-col lg:flex-row justify-between items-center lg:py-6 py-4 px-4 lg:px-0">
      <div className="lg:max-w-[534px] flex flex-col">
        <div className="font-bold text-h4 font-Gilroy tracking-[1.6px] text-blue uppercase lg:text-xl">
          Quantity Takeoff
        </div>
        <div className="font-bold font-Gilroy text-[20px] lg:text-h8 leading-[28px] -tracking-[1.2px] text-gray mt-2">
          Revolutionize Your Construction Projects with SCHESTI Quantity Takeoff
          Service
        </div>
        <div className="font-regular font-Gilroy text-[14px] lg:text-h2 text-gray opacity-70 mt-4 lg:mt-2">
          Takeoffs are key to predicting project costs and optimizing your bids,
          ensuring precision and competitiveness in your construction projects.
          Transform your construction estimating process with SCHESTI
          cutting-edge Quantity Takeoff Service, delivering unmatched accuracy
          and efficiency to elevate your project planning and execution
          seamlessly.
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
          src="/images/services-image6.png"
          width={532}
          height={604}
          alt="image5"
          className="w-full max-w-[532px] h-auto"
        />
      </div>
    </div>
  );
};

export default TakeOff;
