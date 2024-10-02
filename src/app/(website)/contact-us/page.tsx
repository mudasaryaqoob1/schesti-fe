import React from 'react'
import Navbar from '../navbar';

const ContactUs = () => {
  return (
    <div>
        <div className="w-full h-[100%] lg:pb-[180px]">
        <div className="bg-[url('/contact-us-imges/Group.png')] bg-cover bg-center  lg:h-[1145px]  bg-no-repeat w-full">
          <Navbar />
          {/* Add your content here if needed */}
          {/* first section */}
          <div className="container ">
            <div className=" w-full  flex flex-col items-center lg:pt-[167px]">
              <div className="pb-6">
                <h1 className="font-Gilroy font-bold text-[24px] md:text-[48px] text-center text-gray_dark md:leading-[65px]">
                  Contact us
                </h1>
              </div>
              <div className=" w-full max-w-[600px]">
                <p className="font-normal font-Gilroy text-[15px] md:text-[19px]  text-gray_dark leading-[32px] text-center">
                  With lots of unique blocks, you can easily build a page
                  without coding. Build your next consultancy website within few
                  minutes
                </p>
              </div>
            </div>
            <div className="lg:mt-[94px] mt-10 flex flex-col lg:flex-row items-center gap-4 justify-between ">
              <div className="w-full max-w-[325px] flex gap-4 p-[16px] bg-white rounded-[24px]">
                <div className="">
                  <img src="/contact-us-imges/ion_call.svg" alt="" />
                </div>
                <div className="">
                  <h1 className="font-Gilroy font-bold text-[18px] md:text-[24px] text-left text-gray_dark leading-[-0.5px] md:leading-[29.71px] pb-2">
                    Call us
                  </h1>
                  <p className="font-normal font-Gilroy text-[16px] md:text-[21px]  text-gray_dark leading-[34px] text-left">
                    +1 (919)610 7760
                  </p>
                </div>
              </div>
              <div className="w-full max-w-[325px] flex gap-4 p-[16px] bg-white rounded-[24px]">
                <div className="">
                  <img src="/contact-us-imges/ic_round-email.svg" alt="" />
                </div>
                <div className="">
                  <h1 className="font-Gilroy font-bold text-[18px] md:text-[24px] text-left text-gray_dark leading-[-0.5px] md:leading-[29.71px] pb-2">
                    Email us
                  </h1>
                  <p className="font-normal font-Gilroy text-[16px] md:text-[21px]  text-gray_dark leading-[34px] text-left">
                    Info@schesti.com
                  </p>
                </div>
              </div>
              <div className="w-full max-w-[325px] flex gap-4 p-[16px] bg-white rounded-[24px]">
                <div className="">
                  <img
                    src="/contact-us-imges/fluent_location-16-filled.svg"
                    alt=""
                  />
                </div>
                <div className="">
                  <h1 className="font-Gilroy font-bold text-[18px] md:text-[24px] text-left text-gray_dark leading-[-0.5px] md:leading-[29.71px] pb-2">
                    Visit us
                  </h1>
                  <p className="font-normal font-Gilroy text-[16px] md:text-[21px]  text-gray_dark leading-[34px] text-left">
                    5109 Hollyridge Dr, Ste 102 Raleigh, NC 27612
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-[70px] mb-[180px] lg:h-[595px] xl:w-full max-w-[1110px] mx-8 xl:mx-0 bg-white rounded-[24px] shadow-[0px_2px_60px_0px_rgba(46,45,116,0.1)]">
              <div className="px-[45px] py-[44px]">
                <div className="flex justify-between lg:flex-row gap-7 flex-col">
                  <div className="w-full lg:max-w-[495px]">
                    <div className="">
                      <h1 className="font-Gilroy font-bold text-[13px] md:text-[15px] text-left text-gray_dark leading-[-0.1px] md:leading-[26px] pb-2">
                        First & Last Name
                      </h1>
                    </div>
                    <div className="w-full lg:max-w-[495px] border-[1px] border-[#E7E9ED] rounded-[10px] bg-white">
                      <input
                        className="font-Gilroy outline-none rounded-[10px] font-normal text-[13px] md:text-[15px] text-left text-gray_dark leading-[-0.1px] md:leading-[26px] px-[18px] py-3"
                        type="text"
                        placeholder="i.e. John Doe"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:max-w-[495px]">
                    <div className="">
                      <h1 className="font-Gilroy font-bold text-[13px] md:text-[15px] text-left text-gray_dark leading-[-0.1px] md:leading-[26px] pb-2">
                        Email
                      </h1>
                    </div>
                    <div className="w-full lg:max-w-[495px] border-[1px] border-[#E7E9ED] rounded-[10px] bg-white">
                      <input
                        className="font-Gilroy outline-none rounded-[10px] font-normal text-[13px] md:text-[15px] text-left text-gray_dark leading-[-0.1px] md:leading-[26px] px-[18px] py-3"
                        type="text"
                        placeholder="i.e. john@mail.com"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between lg:flex-row flex-col gap-7 mt-[32px]">
                  <div className="w-full lg:max-w-[495px]">
                    <div className="">
                      <h1 className="font-Gilroy font-bold text-[13px] md:text-[15px] text-left text-gray_dark leading-[-0.1px] md:leading-[26px] pb-2">
                        Phone Number
                      </h1>
                    </div>
                    <div className="w-full lg:max-w-[495px] border-[1px] border-[#E7E9ED] rounded-[10px] bg-white">
                      <input
                        className="font-Gilroy outline-none rounded-[10px] font-normal text-[13px] md:text-[15px] text-left text-gray_dark leading-[-0.1px] md:leading-[26px] px-[18px] py-3"
                        type="text"
                        placeholder="i.e. +1-234-567-7890"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:max-w-[495px]">
                    <div className="">
                      <h1 className="font-Gilroy font-bold text-[13px] md:text-[15px] text-left text-gray_dark leading-[-0.1px] md:leading-[26px] pb-2">
                        Subject
                      </h1>
                    </div>
                    <div className="w-full lg:max-w-[495px] border-[1px] border-[#E7E9ED] rounded-[10px] bg-white">
                      <input
                        className="font-Gilroy outline-none rounded-[10px] font-normal text-[13px] md:text-[15px] text-left text-gray_dark leading-[-0.1px] md:leading-[26px] px-[18px] py-3"
                        type="text"
                        placeholder="i.e. I need a help"
                      />
                    </div>
                  </div>
                </div>
                <div className="pb-[130px]">
                  <div className="w-full lg:max-w-[1025px]">
                    <div className="pt-8">
                      <h1 className="font-Gilroy font-bold text-[13px] md:text-[15px] text-left text-gray_dark leading-[-0.1px] md:leading-[26px] pb-2">
                        Message
                      </h1>
                    </div>
                    <div className="w-full lg:max-w-[1025px] border-[1px] border-[#E7E9ED] rounded-[10px] bg-white">
                      <textarea
                        id="message"
                        rows={1} // Corrected to pass a number
                        className="w-full font-Gilroy outline-none rounded-[10px] font-normal text-[13px] md:text-[15px] text-left text-gray_dark leading-[-0.1px] md:leading-[26px] px-[18px] py-3"
                        placeholder="Type you message"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="">
                  <button className="bg-blue text-white font-medium text-[18px] font-Poppins leading-[27px] rounded-md px-[56px] py-3 md:py-[15px]">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs