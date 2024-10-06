'use client';
import React from 'react';
import Image from 'next/image';

import Navbar from '../navbar';
import Bidding from './bidding';
import Networking from './networking';
import TakeOff from './takeoff';
import Estimate from './estimate';
import Schedule from './schedule';
import Financial from './financial';
import CRM from './crm';
import Meeting from './meeting';
import Social from './socialmedia';

import HomepageSlider from '../homepage/homepageSlider';
import CollapseComponent from '../components/customCollapse';
const Services = () => {
  return (
    <div>
      {/* First Section */}
      <div className='relative w-full h-full bg-no-repeat bg-[url("/images/services-bg.png")] bg-contain'>
        <div className="bg-white">
          <Navbar />
        </div>

        <div className="flex justify-center items-center flex-col px-4">
          <div className="max-w-[1222px] lg:mt-20 mt-10 text-center ">
            <div
              className={`font-bold text-[30px] lg:text-[40px] leading-[48px] lg:leading-[60px]  lg:px-36 px-0 text-gray_900 uppercase `}
            >
              Platform from Start to Finish (All your Pre construction in one
              Place)
            </div>
            <div className="font-Poppins text-[16px] lg:text-h7 text-light_gray mt-[24px] px-4 lg:px-48">
              Optimize Your Processes with a Unified Application, encompassing
              Takeoff Software, automatic bid monitoring, Time Schedule, CRM,
              and live analytics.
            </div>
            <div className="flex flex-col lg:flex-row gap-3 justify-center items-center mt-[40px]">
              <button className="w-full lg:w-[153px] h-[57px] rounded-md bg-blue transition-transform duration-300 hover:scale-105">
                <p className="font-Poppins font-medium text-h7 text-white">
                  Catch offer
                </p>
              </button>
              <button className="w-full lg:w-[217px] h-[55px] rounded-md border-2 border-blue transition-transform duration-300 hover:scale-105">
                <p className="font-Poppins font-medium text-h7 text-blue">
                  Start your free trial
                </p>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center mt-[40px] lg:mt-[73px] relative">
            <div className="absolute self-center">
              <img src="/images/Button.png" alt="" />
            </div>
            <Image
              src="/images/Services-image1.png"
              width={922}
              height={469}
              alt="Hero_image"
              className="max-w-full h-auto shadow-custom2 rounded-[24px]"
            />
          </div>
        </div>
      </div>
      {/* Second Section */}
      <div className="max-w-[1000px] mx-auto mt-[40px] lg:mt-[102px] lg:px-0 px-4">
        <div className="font-Gilroy font-bold text-[32px] lg:text-[40px] leading-[40px] lg:leading-[50px] text-center">
          Enhance your preconstruction capabilities
        </div>
        <div className="flex flex-col lg:flex-row justify-between mt-[40px] gap-6 lg:gap-0">
          <div className="flex justify-center logo-container flex-shrink-0">
            <Image
              src="/images/Service_image2.png"
              width={296}
              height={117}
              alt="image2"
              className="transform transition-transform duration-300 hover:scale-95 logo"
            />
          </div>
          <div className="hidden lg:block h-[117px] w-[1px] bg-gradient-to-b from-white via-blue to-white"></div>
          <div className="flex justify-center logo-container flex-shrink-0">
            <Image
              src="/images/Service_image3.png"
              width={296}
              height={117}
              alt="image3"
              className="transform transition-transform duration-300 hover:scale-95 logo"
            />
          </div>
          <div className="hidden lg:block h-[117px] w-[1px] bg-gradient-to-b from-white via-blue to-white"></div>
          <div className="flex justify-center logo-container flex-shrink-0">
            <Image
              src="/images/Service_image4.png"
              width={296}
              height={117}
              alt="image4"
              className="transform transition-transform duration-300 hover:scale-95 logo"
            />
          </div>
        </div>
      </div>
      {/* Third Section */}
      <div className="mt-[60px] lg:mt-[86px] mb-[60px] lg:mb-[80px] px-4">
        <div className="relative font-bold text-center font-Gilroy text-[32px] lg:text-[48px] leading-[40px] lg:leading-[48px] -tracking-[1.2px] text-gray">
          <span className="mr-1">
            Revolutionize your field service business with
          </span>
          <span className="relative inline-block">
            <span className="relative z-10">schesti</span>
            <img
              className="absolute inset-0 z-0 object-contain w-[160px] lg:w-[200px] h-[44px] lg:h-[55px]"
              src="/images/yellow_path.png"
              alt="background"
            />
          </span>
        </div>
        <div className="max-w-[1090px] mx-auto mt-[12px]">
          <div className="font-Gilroy font-regular text-[16px] lg:text-h2 text-center opacity-70 text-gray">
            Schesti streamlines your business operations by providing a central
            hub for all your clients, projects, scheduling, invoicing, and
            estimating needs. It is the ultimate tool for businesses who want to
            save time, increase efficiency, and boost profitability.
          </div>
        </div>
      </div>
      {/* Fourth Section */}
      <Bidding />
      {/* Fifth Section */}
      <Networking />
      {/* div six */}
      <TakeOff />
      {/* Seventh Section */}
      <Estimate />
      {/* Eighth Section */}
      <Schedule />
      {/* Ninth Section */}
      <Financial />
      {/* Tenth Section */}
      <CRM />
      {/* Eleven Section */}
      <Meeting />
      {/* Twelth Section */}
      <Social />
      {/* Thirteen div */}
      <div className="container mx-auto lg:px-0 px-4 lg:py-14 py-4">
        <div className="flex flex-col  items-center justify-center ">
          <div
            className={`font-bold text-3xl sm:text-3xl md:text-4xl lg:text-[40px] text-center md:text-start capitalize  md:leading-[50px] md:-tracking-[2px] text-[#27303F]`}
          >
            Proven results you can <span className="text-blue">trust</span>
          </div>
          <div className="font-Gilroy font-regular text-center md:text-start text-base md:text-[20px] leading-[24px] text-[#474C59] mt-[16px]">
            Transforming Construction Management Worldwide
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:justify-between mt-[40px]">
          <div className="w-full lg:w-[262px] h-[204px] flex flex-col items-center justify-center mb-8 lg:mb-0">
            <Image
              src="/images/image14-4.png"
              width={80}
              height={80}
              alt="Increase in Efficiency"
            />
            {/* <Numbercount targetValue={30} /> */}
            <div
              className={`font-bold leading-[40px] text-[40px] text-center text-[#181D25] mt-[18px] `}
            >
              30
            </div>
            <div className="font-Poppins text-[18px] leading-[18px] text-center text-[#404B5A] mt-[10px]">
              Increase in Efficiency
            </div>
          </div>

          <div className="hidden lg:block h-[204px] w-[1px] bg-gradient-to-b from-white via-blue to-white"></div>

          <div className="w-full lg:w-[262px] h-[204px] flex flex-col items-center justify-center mb-8 lg:mb-0">
            <Image
              src="/images/image14-3.png"
              width={80}
              height={80}
              alt="More Bids Submitted"
            />
            {/* <Numbercount targetValue={36} /> */}
            <div
              className={`font-bold leading-[40px] text-[40px] text-center text-[#181D25] mt-[18px] `}
            >
              36
            </div>

            <div className="font-Poppins text-[18px] leading-[18px] text-center text-[#404B5A] mt-[10px]">
              More Bids Submitted
            </div>
          </div>

          <div className="hidden lg:block h-[204px] w-[1px] bg-gradient-to-b from-white via-blue to-white"></div>

          <div className="w-full lg:w-[262px] h-[204px] flex flex-col items-center justify-center mb-8 lg:mb-0">
            <Image
              src="/images/image14-2.png"
              width={80}
              height={80}
              alt="Higher Revenue"
            />
            {/* <Numbercount targetValue={25} /> */}
            <div
              className={`font-bold leading-[40px] text-[40px] text-center text-[#181D25] mt-[18px] `}
            >
              25
            </div>

            <div className="font-Poppins text-[18px] leading-[18px] text-center text-[#404B5A] mt-[10px]">
              Higher Revenue
            </div>
          </div>

          <div className="hidden lg:block h-[204px] w-[1px] bg-gradient-to-b from-white via-blue to-white"></div>

          <div className="w-full lg:w-[262px] h-[204px] flex flex-col items-center justify-center mb-8 lg:mb-0">
            <Image
              src="/images/image14-1.png"
              width={80}
              height={80}
              alt="Projects Completed"
            />
            <div>
              {/* <Numbercount targetValue={100} /> */}
              <div
                className={`font-bold leading-[40px] text-[40px] text-center text-[#181D25] mt-[18px] `}
              >
                100
              </div>
            </div>
            <div className="font-Poppins text-[18px] leading-[18px] text-center text-[#404B5A] mt-[10px]">
              Projects Completed
            </div>
          </div>
        </div>
      </div>
      {/* Fourteen Div  */}
      <div className="container mx-auto lg:px-0 px-4 py-28">
        <div className="max-w-full md:max-w-[701px] h-auto md:h-[198px] ">
          <div className="font-semibold font-Gilroy text-h4 tracking-[1.6px] text-blue uppercase">
            Why Schesti?
          </div>
          <div className="font-bold font-Gilroy text-[24px] md:text-[32px] leading-[32px] md:leading-[48px] text-gray -tracking-[1.2px] mt-[16px] md:mt-[23px]">
            Discover why over 1 million contractors have chosen Schesti to
            facilitate the construction of more than $1 trillion worth of
            projects annually
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-end mt-8 md:mt-0">
          <div className="flex items-start md:items-end w-full md:w-auto mt-8 justify-center md:justify-start mb-10">
            <Image
              src="/images/services-image13.png"
              width={500}
              height={565}
              alt="Image13"
              className="w-[550px]"
            />
          </div>
          <div className="flex flex-col max-w-full md:max-w-[507px] mt-8 md:mt-[22px]">
            <div className="mb-8 md:mb-[75px]">
              <Image
                src="/images/services-image14.png"
                width={506}
                height={362}
                alt="Group-2"
                className="w-full md:w-auto"
              />
            </div>
            <div className="font-Gilroy font-regular text-base md:text-h3 text-gray opacity-70 -tracking-[0.2] ">
              Our goal is to provide a straightforward, cost-effective,
              user-friendly, and potent solution for the cumbersome construction
              bidding process. We introduce the first invoicing modules
              worldwide, catering to all contractors, subcontractors, vendors,
              and owners in one unified platform. Our commitment and enthusiasm
              for enhancing the construction sector continually inspire new
              ideas and innovative platform features that benefit construction
              professionals across the nation.
            </div>
          </div>
        </div>
      </div>
      {/* Fifteen Div */}
      <div className=" relative max-w-full md:h-[770px] h-[680px]  bg-[#E6F2F8] rounded-sm content-center ">
        <HomepageSlider />
      </div>
      {/* Sixteen Section */}
      <div className="container py-[120px] space-y-5 ">
        <div>
          <div className="font-Gilroy font-bold text-[36px] leading-[45px] text-center text-gray_900 ">
            Browse FAQs{' '}
          </div>
          <div className="font-Gilroy font-regular text-h2 -tracking-[0.2px] text-center opacity-70 text-gray">
            Lorem ipsum dolor sit amet consectetur. Vitae nunc facilisis{' '}
          </div>
        </div>
        <div className="mt-4 px-3 md:px-0 ">
          <CollapseComponent faqs={[]} />
        </div>
      </div>
      {/* Seventeen Section */}
      <div className="container mx-auto md:px-0 px-4 py-[120px]">
        <div className="flex flex-col lg:flex-row justify-between ">
          <div className="mb-8 lg:mb-0">
            <Image
              src="/bedding-page-imges/bedding-aplication-sec.png"
              width={500}
              height={495}
              alt=" "
              className="w-full lg:max-w-[500px]"
            />
          </div>
          <div className="max-w-full lg:max-w-[511px]">
            <div className="font-bold font-Gilroy text-3xl md:text-start text-center sm:text-3xl md:text-4xl lg:text-5xl text-gray">
              Transform Construction with SCHESTI for a Better World!
            </div>
            <div className="font-Gilroy font-regular  text-gray opacity-70 md:text-start text-center  text-base lg:text-[19px] mt-[32px]">
              Empower Your Projects With Schesti: Estimating construction
              projects shouldn be a headache. We offer a solution that
              streamlines the process for you. Discover the ease and efficiency
              of Schesti estimating feature today.
            </div>
            <div className="flex flex-col gap-[20px] mt-[32px] lg:flex-row lg:gap-[20px]">
              <button className="w-full lg:w-[201px] h-[57px] rounded-[39px] text-white bg-blue font-medium font-Gilroy text-[18px] leading-[27px] transition-transform duration-300 hover:scale-105">
                Get Started Now!
              </button>
              <button className="w-full lg:w-[148px] h-[55px] rounded-[39px] border-2 border-blue font-medium font-Gilroy text-[18px] leading-[27px] text-blue transition-transform duration-300 hover:scale-105">
                Contact us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
