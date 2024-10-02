import React from 'react';
import Image from 'next/image';
const CRM = () => {
  return (
    <div className="container flex flex-col lg:flex-row justify-between items-center lg:py-6 py-4 lg:px-0 px-4">
      <div className="lg:max-w-[434px] flex flex-col">
        <div className="font-bold text-h4 font-Gilroy tracking-[1.6px] text-blue uppercase lg:text-xl">
          CRM{' '}
        </div>
        <div className="font-bold font-Gilroy text-[20px] lg:text-h8 leading-[28px] -tracking-[1.2px] text-gray mt-2">
          Effortless Construction CRM Solutions{' '}
        </div>
        <div className="font-regular font-Gilroy text-[14px] lg:text-h2 text-gray opacity-70 mt-4 lg:mt-4">
          Schesti CRM integrates marketing, sales, and service teams with
          AI-driven tools for construction businesses. Manage leads effectively,
          streamline contract handling, and enhance customer satisfaction with
          centralized communication and secure document management. Achieve
          seamless collaboration and cohesive customer relationships across your
          network
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
          src="/images/services-image10.png"
          width={550}
          height={388}
          alt="image8"
          className="w-full max-w-[532px] h-auto"
        />
      </div>
    </div>
  );
};

export default CRM;
