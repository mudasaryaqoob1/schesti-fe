import React from 'react';
import Image from 'next/image';
const Social = () => {
  return (
    <div className="container flex flex-col lg:flex-row justify-between items-center lg:py-6 py-4 lg:px-0 px-4">
      <div className="lg:max-w-[434px] flex flex-col">
        <div className="font-bold text-h4 font-Gilroy tracking-[1.6px] text-blue uppercase lg:text-xl">
          Social media{' '}
        </div>
        <div className="font-bold font-Gilroy text-[20px] lg:text-h8 leading-[28px] -tracking-[1.2px] text-gray mt-2">
          Construction Networking Elevated{' '}
        </div>
        <div className="font-regular font-Gilroy text-[14px] lg:text-h2 text-gray opacity-70 mt-4 lg:mt-4">
          Discover Schesti, the essential platform for construction
          professionals to network, showcase projects, and stay updated on
          industry trends. Engage with a diverse community, launch effective
          campaigns, and leverage targeted advertising options for business
          growth.
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
          src="/images/services-image12.png"
          width={550}
          height={560}
          alt="image8"
          className="w-full max-w-[532px] h-auto"
        />
      </div>
    </div>
  );
};

export default Social;
