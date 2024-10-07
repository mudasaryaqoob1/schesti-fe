'use client';
import React from 'react';
import Image from 'next/image';

import Navbar from '../navbar';
import Footer from '../footer';
import TestimonialSlider from '../testimonialSlider';
import TestimonialCard from '../components/testimonialCard';

const WhySchesti = () => {
  return (
    <div>
      <Navbar />
      {/* Page Main Content Start */}
      <div className="w-full lg:h-screen">
        <div
          style={{ backgroundPosition: '100% 100%' }}
          className="bg-[url('/why-setch-imges/hero-bg.png')] bg-cover  bg-no-repeat w-full h-scree"
        >
          {/* Add your content here if needed */}

          <div className="flex  flex-col lg:flex-row  items-center container justify-between gap-16 lg:gap-0 lg:h-screen px-2 md:px-0">
            <div className="">
              <div className=" w-full max-w-[541px] relative">
                <div className="md:flex hidden absolute top-[-56px] left-0">
                  <img src="/why-setch-imges/Ellipse 1502.svg" alt="" />
                </div>
                <div className="pb-4">
                  <h1 className="font-Gilroy font-bold text-[30px] lg:text-[48px] tracking-[-2px] text-[#161C2D] md:leading-[56px]">
                    Top contractors
                    <br /> worldwide rely on Schesti
                  </h1>
                </div>
                <div className=" w-full max-w-[500px] relative">
                  <p className="font-normal font-Gilroy text-[19px] tracking-[-0.2px] text-[#161C2D] leading-[32px]">
                    Discover why over 1 million contractors have chosen Schesti
                    to facilitate the construction of more than $1 trillion
                    worth of projects annually
                  </p>
                  <div className="absolute left-[-168px] bottom-[-127px]">
                    <img src="/onlinemettingimges/Fill.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>

            <div className="">
              <div className="relative">
                <div className=" -z-50 absolute left-[-43px] top-[-41px]">
                  <img src="/why-setch-imges/Fill1.svg" alt="" />
                </div>
                <div className=" bg-white h-[361px] rounded-[16px] w-full max-w-[346.5px]  shadow-[0_0_40px_0_rgba(46,45,116,0.2)] flex items-center">
                  <TestimonialCard />
                </div>
                <div className="xl:flex hidden absolute right-[-42px] bottom-[-42px]">
                  <img src="/why-setch-imges/vector.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center pt-6 px-3 md:px-0 lg:pt-0">
        <div className="w-full md:max-w-[918px] max-w-[600px] ">
          <div className="">
            <h1 className="font-Gilroy font-bold text-[28px] md:text-[36px] tracking-[-1.2px] text-[#161C2D] leading-[48px] text-center">
              Big companies are here
            </h1>
          </div>
          <div className="">
            <p className="font-normal font-Gilroy text-[15px] md:text-[19px] tracking-[-0.2px] text-[#161C2D] leading-[32px] text-center">
              Schesti boasts the largest network, the most comprehensive project
              data, and cutting-edge tools for Time Schedule management, bid
              management, invoicing, networking, takeoff, and estimating in the
              industry
            </p>
          </div>
        </div>
      </div>
      <div className="pt-[75px]">
        <div className="flex gap-[40px] justify-center w-full overflow-hidden pb-[40px]">
          <img src="/why-setch-imges/Object.svg" alt="" />
          <img src="/why-setch-imges/Object.svg" alt="" />
          <img src="/why-setch-imges/Object.svg" alt="" />
          <img src="/why-setch-imges/Object.svg" alt="" />
          <img src="/why-setch-imges/Object.svg" alt="" />
          <img src="/why-setch-imges/Object.svg" alt="" />

          <img src="/why-setch-imges/Object.svg" alt="" />
          <img src="/why-setch-imges\Object (1).svg" alt="" />
          <img src="/why-setch-imges\Object (2).svg" alt="" />
          <img src="/why-setch-imges\Object.svg" alt="" />
          <img src="/why-setch-imges\Object (3).svg" alt="" />
          <img src="/why-setch-imges\Object.svg" alt="" />
          <img src="/why-setch-imges\Object (1).svg" alt="" />
          <img src="/why-setch-imges\Object (3).svg" alt="" />
          <img src="/why-setch-imges\Object (5).svg" alt="" />
          <img src="/why-setch-imges\Object (5).svg" alt="" />
          <img src="/why-setch-imges\Object (1).svg" alt="" />
          <img src="/why-setch-imges\Object (4).svg" alt="" />
          <img src="/why-setch-imges\Object (6).svg" alt="" />
          <img src="/why-setch-imges\Object (1).svg" alt="" />
          <img src="/why-setch-imges\Object (1).svg" alt="" />
        </div>
        <div className="flex gap-[40px] justify-center w-full overflow-hidden">
          <img src="/why-setch-imges/Object.svg" alt="" />
          <img src="/why-setch-imges/Object.svg" alt="" />
          <img src="/why-setch-imges/Object.svg" alt="" />

          <img src="/why-setch-imges\Object.svg" alt="" />
          <img src="/why-setch-imges\Object.svg" alt="" />
          <img src="/why-setch-imges\Object (1).svg" alt="" />
          <img src="/why-setch-imges\Object (2).svg" alt="" />
          <img src="/why-setch-imges\Object.svg" alt="" />
          <img src="/why-setch-imges\Object (3).svg" alt="" />
          <img src="/why-setch-imges\Object.svg" alt="" />
          <img src="/why-setch-imges\Object (1).svg" alt="" />
          <img src="/why-setch-imges\Object (3).svg" alt="" />
          <img src="/why-setch-imges\Object (5).svg" alt="" />
          <img src="/why-setch-imges\Object (5).svg" alt="" />
          <img src="/why-setch-imges\Object (1).svg" alt="" />
          <img src="/why-setch-imges\Object (4).svg" alt="" />
          <img src="/why-setch-imges\Object (6).svg" alt="" />
        </div>
      </div>
      {/* Adjusted Container and Image */}
      <div className="container">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-0 pt-[106px] px-4 lg:px-0 relative">
          <div className="w-full max-w-[469px]">
            <div className="">
              <h1 className="font-Gilroy font-bold text-[30px] md:text-[48px] tracking-[-1.8px] text-[#161C2D] leading-[58px]">
                Why Choose
                <br /> Schesti?
              </h1>
            </div>
            <div className="w-full max-w-[413px] pt-[15px]">
              <p className="font-normal font-Gilroy text-[15px] md:text-[19px] tracking-[-0.2px] text-[#161C2D] leading-[32px]">
                Simplifying excellence in construction work. Schesti stands as
                the premier bid management application for general contractors
                and subcontractors seeking a streamlined and efficient approach
                to their work. Crafted by Professional Engineers (PE) and
                General Contractors for contractors, subcontractors, and
                industry professionals alike.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center w-full h-full">
            <Image
              // loader={myLoader}
              src="/why-setch-imges/why-setch-4x.png" // no need to include the full path here, the loader will handle it
              alt="Picture of the author"
              width={500}
              height={500}
            />
          </div>
          <div className="absolute left-[-163px] bottom-[-64px] ">
            <img src="/why-setch-imges/Dots.png" alt="" />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="flex flex-col py-[72px]">
          <div className="">
            <div className="">
              <h1 className="font-bold font-PlusJakartaSans text-center text-[25px] md:text-[40px] tracking-[-2px] text-[#161C2D] leading-[50.4px]">
                Proven results you can <span className="text-[#007AB6]">Trust</span>{' '}
              </h1>
            </div>
            <div className="">
              <p className="font-Gilroy font-normal text-center text-[15px] md:text-[20px]  text-[#161C2D] leading-[24px]">
                Transforming Construction Management Worldwide
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6 items-center md:gap-0 justify-between md:pt-[40px]">
            <div className="w-full max-w-[262.62px] gap-2 flex flex-col  items-center">
              <div className="">
                <img src="\why-setch-imges\why-setch-proven-logo1.svg" alt="" />
              </div>
              <div className="">
                <p className="font-bold font-Manrope text-[25px] md:text-[40px] text-[#181D25]  leading-[40px]">
                  30%
                </p>
              </div>
              <div className="">
                <p className="font-medium font-Poppins text-center text-[15px] md:text-[18px]  text-[#404B5A] leading-[18px]">
                  Increase in Efficiency
                </p>
              </div>
            </div>
            <div className="md:flex hidden">
              <img
                src="/why-setch-imges/why-setch-proven-logolines.svg"
                alt=""
              />
            </div>
            <div className=" w-full max-w-[262.62px] gap-2 flex flex-col justify-between items-center">
              <div className="">
                <img src="\why-setch-imges/why-setch-proven-logo2.svg" alt="" />
              </div>
              <div className="">
                <p className="font-bold font-Manrope text-[25px] md:text-[40px] text-[#181D25]  leading-[40px]">
                  36%
                </p>
              </div>
              <div className="">
                <p className="font-medium font-Poppins text-center text-[15px] md:text-[18px]  text-[#404B5A] leading-[18px]">
                  More Bids Submitted
                </p>
              </div>
            </div>
            <div className="md:flex hidden">
              <img
                src="/why-setch-imges/why-setch-proven-logolines.svg"
                alt=""
              />
            </div>
            <div className="w-full max-w-[262.62px] gap-2 flex flex-col justify-between items-center">
              <div className="">
                <img src="\why-setch-imges/why-setch-proven-logo3.svg" alt="" />
              </div>
              <div className="">
                <p className="font-bold font-Manrope text-[25px] md:text-[40px] text-[#181D25] leading-[40px]">
                  25%
                </p>
              </div>
              <div className="">
                <p className="font-medium font-Poppins text-center text-[15px] md:text-[18px]  text-[#404B5A] leading-[18px]">
                  Higher Revenue
                </p>
              </div>
            </div>
            <div className="md:flex hidden">
              <img
                src="/why-setch-imges/why-setch-proven-logolines.svg"
                alt=""
              />
            </div>
            <div className="w-full max-w-[262.62px] gap-2 flex flex-col justify-between items-center">
              <div className="">
                <img src="\why-setch-imges/why-setch-proven-logo4.svg" alt="" />
              </div>
              <div className="">
                <p className="font-bold font-Manrope text-[25px] md:text-[40px] text-[#181D25]  leading-[40px]">
                  100K+
                </p>
              </div>
              <div className="">
                <p className="font-medium font-Poppins text-center text-[15px] md:text-[18px]  text-[#404B5A] leading-[18px]">
                  Projects Completed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[url('/why-setch-imges/why-setchi-business-sec-bgimg.png')] bg-cover bg-center bg-no-repeat">
        <div className="container">
          <div className="md:py-[80px] py-10 flex flex-col items-center gap-10 px-7 lg:px-0">
            <div className="flex flex-col justify-center items-center">
              <div className="">
                <h1 className="font-Gilroy font-bold text-[23px] md:text-[48px] md:tracking-[-1.2px] text-[#E6F2F8] md:leading-[48px] text-center">
                  Revolutionize your field service business with{' '}
                  <span className="bg-[url('/why-setch-imges/path1510.svg')] bg-auto  bg-bottom bg-no-repeat">
                    schesti
                  </span>
                </h1>
              </div>
              <div className="w-full max-w-[1110px] pt-3">
                <p className="font-normal font-GilroySemiBold text-[14px] md:text-[19px] text-[#E6F2F8] leading-[32px] text-center">
                  Schesti streamlines your business operations by providing a
                  central hub for all your clients, projects, scheduling,
                  invoicing, and estimating needs. It is the ultimate tool for
                  businesses who want to save time, increase efficiency, and
                  boost profitability
                </p>
              </div>
            </div>
            <div className="w-full max-w-[964px]">
              <div className="flex flex-wrap gap-2  md:gap-0 justify-center md:justify-between items-center  ">
                <div className="flex flex-col justify-evenly items-center  h-[100px]">
                  <div className="">
                    <img
                      src="/why-setch-imges/why-setchi-business-sec-logo1.svg"
                      alt=""
                    />
                  </div>
                  <div className="">
                    <h1 className="font-Gilroy font-bold text-[12px] md:text-[14px] text-[#E6F2F8] leading-[15px]">
                      Bidding
                    </h1>
                  </div>
                </div>
                <div className="flex flex-col justify-evenly items-center  h-[100px]">
                  <div className="">
                    <img
                      src="/why-setch-imges/why-setchi-business-sec-logo2-Network.svg"
                      alt=""
                    />
                  </div>
                  <div className="">
                    <h1 className="font-Gilroy font-bold text-[12px] md:text-[14px] text-[#E6F2F8] leading-[15px]">
                      Network
                    </h1>
                  </div>
                </div>
                <div className="flex flex-col justify-evenly items-center  h-[100px]">
                  <div className="">
                    <img
                      src="/why-setch-imges/why-setchi-business-sec-logo3.svg"
                      alt=""
                    />
                  </div>
                  <div className="">
                    <h1 className="font-Gilroy font-bold text-[12px] md:text-[14px] text-[#E6F2F8] leading-[15px]">
                      Takeoff
                    </h1>
                  </div>
                </div>
                <div className="flex flex-col justify-evenly items-center  h-[100px]">
                  <div className="">
                    <img
                      src="/why-setch-imges/why-setchi-business-sec-logo4.svg"
                      alt=""
                    />
                  </div>
                  <div className="">
                    <h1 className="font-Gilroy font-bold text-[12px] md:text-[14px] text-[#E6F2F8] leading-[15px]">
                      Estimate{' '}
                    </h1>
                  </div>
                </div>
                <div className="flex flex-col justify-evenly items-center  h-[100px]">
                  <div className="">
                    <img
                      src="/why-setch-imges/why-setchi-business-sec-logo5-schedule.svg"
                      alt=""
                    />
                  </div>
                  <div className="">
                    <h1 className="font-Gilroy font-bold text-[12px] md:text-[14px] text-[#E6F2F8] leading-[15px]">
                      Schedule
                    </h1>
                  </div>
                </div>
                <div className="flex flex-col justify-evenly items-center  h-[100px]">
                  <div className="">
                    <img
                      src="/why-setch-imges/why-setchi-business-sec-logo6-Financial-tools.svg"
                      alt=""
                    />
                  </div>
                  <div className="">
                    <h1 className="font-Gilroy font-bold text-[12px] md:text-[14px] text-[#E6F2F8] leading-[15px]">
                      Financial tools
                    </h1>
                  </div>
                </div>
                <div className="flex flex-col justify-evenly items-center  h-[100px]">
                  <div className="">
                    <img
                      src="/why-setch-imges/why-setchi-business-sec-logo7-CRM.svg"
                      alt=""
                    />
                  </div>
                  <div className="">
                    <h1 className="font-Gilroy font-bold text-[12px] md:text-[14px] text-[#E6F2F8] leading-[15px]">
                      CRM
                    </h1>
                  </div>
                </div>
                <div className="flex flex-col justify-evenly items-center  h-[100px]">
                  <div className="">
                    <img
                      src="/why-setch-imges/why-setchi-business-sec-logo8-Meetings.svg"
                      alt=""
                    />
                  </div>
                  <div className="">
                    <h1 className="font-Gilroy font-bold text-[12px] md:text-[14px] text-[#E6F2F8] leading-[15px]">
                      Meeting
                    </h1>
                  </div>
                </div>
                <div className="flex flex-col justify-evenly items-center  h-[100px]">
                  <div className="">
                    <img
                      src="/why-setch-imges/why-setchi-business-sec-logo9-Social media.svg"
                      alt=""
                    />
                  </div>
                  <div className="">
                    <h1 className="font-Gilroy font-bold text-[12px] md:text-[14px] text-[#E6F2F8] leading-[15px]">
                      Social media
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between px-4 lg:px-0 pt-[33px] ">
          <div className="w-full max-w-[483px]">
            <h1 className="font-Gilroy font-bold text-[20px] md:text-[36px] text-center md:text-left md:tracking-[-1.8px] text-[#27303F] md:leading-[58px]">
              Our application transcends borders, serving users worldwide in
              addition to our nationwide reach
            </h1>
          </div>
          <div className="">
            <img src="/why-setch-imges/why-setchi-aplication-sec.png" alt="" />
          </div>
        </div>
      </div>
      <div className="bg-[url('/why-setch-imges/why-setchi-mission-sec-bgimg.png')] bg-cover bg-center bg-no-repeat w-full ">
        <div className="container">
          <div className="flex flex-col py-4 pl-3 md:pl-0 md:py-[130px]">
            <div className="">
              <h1 className="font-Gilroy font-bold text-[30px] md:text-[48px] md:tracking-[-0.2px] text-[#E6F2F8] leading-[59.42px] text-center">
                Mission
              </h1>
            </div>
            <div className="w-full max-w-[1108px]">
              <h1 className="font-normal font-GilroySemiBold text-[16px] md:text-[19px] tracking-[-0.2px] text-[#E6F2F8] md:leading-[40px] text-center">
                Our goal is to provide a straightforward, cost-effective,
                user-friendly, and potent solution for the cumbersome
                construction bidding process. We introduce the first invoicing
                modules worldwide, catering to all contractors, subcontractors,
                vendors, and owners in one unified platform. Our commitment and
                enthusiasm for enhancing the construction sector continually
                inspire new ideas and innovative platform features that benefit
                construction professionals across the nation
              </h1>
            </div>
          </div>
        </div>
      </div>
      {/* slider section start  */}
      <div className="">
        <div className="container">
          <div className="md:mt-[90px] mt-5 flex flex-col items-center">
            <div className=" w-full max-w-[657px]">
              <p className="font-Gilroy font-bold text-[28px] md:text-[40px] md:tracking-[-1.2px] text-[#002B40] leading-[44px] text-center">
                See what people have shared about their{' '}
                <span className="text-[#007AB6]">experience</span> with our app!{' '}
              </p>
            </div>
            <div className=" flex items-center px-3 md:px-0 gap-5 w-full md:py-10  max-w-[1110px]">
              <div className="">
                <img src="/Group 163.svg" alt="" />
              </div>
              <TestimonialSlider />
              <div className="">
                <img src="/Group 162.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* slider section end */}
      {/* location start  */}
      <div className="bg-[url('/Content.png')] bg-cover bg-center bg-no-repeat bg-slate-400 w-full">
        <div className="w-full  m-auto">
          <div className="flex flex-col lg:flex-row justify-between items-center ">
            <div className="xl:pl-[165px] py-3 md:py-0 px-3 md:px-0 ">
              <div className="w-full max-w-[434px] flex flex-col gap-[51.55px] ">
                <div className="flex flex-col gap-3">
                  <div className="">
                    <h1 className="font-Gilroy font-bold text-[32px] md:text-[48px] md:tracking-[-1.2px] text-white leading-[48px]">
                      We are located at
                    </h1>
                  </div>
                  <div className="">
                    <p className="font-normal font-Gilroy text-[15px] md:text-[19px] md:tracking-[-0.2px] text-white leading-[32px]">
                      Our corporate office is based in San Diego, California,
                      and we have authorized business partners in major cities
                      worldwide to meet your sales, support, and training needs
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4 w-full max-w-[366px]">
                  <div className="flex items-center gap-3">
                    <div className="">
                      <img src="/fluent_call-24-filled.svg" alt="" />
                    </div>
                    <div className="">
                      <p className="font-normal font-Gilroy text-[15px] md:text-[19px] md:tracking-[-0.2px] text-white leading-[32px]">
                        +1 (919)610 7760
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="">
                      <img src="/typcn_location.svg" alt="" />
                    </div>
                    <div className="">
                      <p className="font-normal font-Gilroy text-[15px] md:text-[19px] md:tracking-[-0.2px] text-white leading-[32px]">
                        5109 Hollyridge Dr, Ste 102 Raleigh,
                        <br />
                        NC 27612
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="">
                      <img src="/bxs_time-five.svg" alt="" />
                    </div>
                    <div className="">
                      <p className="font-normal font-Gilroy text-[15px] md:text-[19px] md:tracking-[-0.2px] text-white leading-[32px]">
                        Monday - Friday: 7am - 4pm
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full max-w-[714px]">
              <iframe
                className="md:h-[699px] w-full max-w-[714px]"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52604986.93803917!2d-161.96195286730168!3d36.00836322274983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2s!4v1724692366524!5m2!1sen!2s"
                width="600"
                height="450"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WhySchesti;
