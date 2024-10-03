import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <div className="w-full bg-schestiPrimary mt-[90px]">
      <div className="container px-4 lg:px-0 py-10 ">
        <div className="flex flex-col items-start lg:flex-row ">
          <div className="md:w-1/3 lg:w-1/4 mt-[40px] md:mt-[122px]">
            <div className="max-w-[246px]">
              <Image
                src="/images/Footer_logo.svg"
                width={122}
                height={32}
                alt="Footer Logo"
              />
              <div className="font-Gilroy text-[15px] leading-[26px] -tracking-[0.1px] text-white opacity-65 mt-[37px]">
                With lots of unique blocks, you can easily build a page without
                coding. Build your next landing page.
              </div>
              <div className="flex space-x-5 mt-[44px] cursor-pointer">
                <img src="/images/logo-twitter.svg" alt="Twitter" />
                <img src="/images/logo-facebook.svg" alt="Facebook" />
                <img src="/images/logo-instagram.svg" alt="Instagram" />
                <img src="/images/logo-linkedin.svg" alt="LinkedIn" />
              </div>
            </div>
            <div className="mt-[56px]">
              <div className="font-Gilroy text-[15px] leading-[26px] text-white opacity-65">
                Sign up for our newsletter
              </div>
              <div className="relative w-full md:w-[306px]">
                <input
                  type="email"
                  placeholder="Enter Your Email Here"
                  className="placeholder:font-Gilroy placeholder:font-regular placeholder:text-[14px] placeholder:leading-[16.8px] placeholder:text-[#A0A0A0] w-full h-[49px] rounded-[28px] bg-white text-center pr-[130px] mt-[9px] outline-none flex justify-center items-center"
                />
                <button className="absolute top-1/2 right-[10px] transform -translate-y-1/2 w-[114px] h-[35px] rounded-[28px] bg-schestiPrimary transition-transform duration-300 hover:scale-105">
                  <p className="text-white font-Gilroy font-regular text-[17px] leading-[17px]">
                    Subscribe
                  </p>
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap md:flex-nowrap mt-[40px] md:mt-[122px] space-y-6 md:space-y-0 md:space-x-11 ml-0 lg:ml-[267px]">
            <div className="w-full md:w-auto">
              <p className="font-bold text-h5 font-Gilroy -tracking-[0.1px] text-white opacity-65">
                Company
              </p>
              <div className="space-y-2 mt-[20px]">
                <p className="font-regular font-Gilroy text-h6 -tracking-[0.2px] text-white cursor-pointer">
                  <Link href="/contact-us" className="cursor-pointer ">
                    Contact us
                  </Link>
                </p>
                <p className="font-regular font-Gilroy text-h6 -tracking-[0.2px] text-white cursor-pointer">
                  <Link href="/why-schesti" className="cursor-pointer ">
                    Why Schesti?
                  </Link>
                </p>
              </div>
            </div>
            <div className="w-full md:w-auto">
              <p className="font-bold text-h5 font-Gilroy -tracking-[0.1px] text-white opacity-65">
                <Link href="/services" className="cursor-pointer ">
                  Services
                </Link>
              </p>
              <div className="space-y-2 mt-[20px]">
                <p className="font-regular font-Gilroy text-h6 -tracking-[0.2px] text-white cursor-pointer">
                  <Link href="/estimate" className="cursor-pointer ">
                    Estimate
                  </Link>
                </p>
                <p className="font-regular font-Gilroy text-h6 -tracking-[0.2px] text-white cursor-pointer">
                  <Link href="/bidding" className="cursor-pointer ">
                    Bidding
                  </Link>
                </p>
                <p className="font-regular font-Gilroy text-h6 -tracking-[0.2px] text-white cursor-pointer">
                  <Link href="/takeoff" className="cursor-pointer ">
                    Takeoff
                  </Link>
                </p>
                <p className="font-regular font-Gilroy text-h6 -tracking-[0.2px] text-white cursor-pointer">
                  Network
                </p>
                <p className="font-regular font-Gilroy text-h6 -tracking-[0.2px] text-white cursor-pointer">
                  Social media
                </p>
                <p className="font-regular font-Gilroy text-h6 -tracking-[0.2px] text-white cursor-pointer">
                  <Link href="/custumermanagment" className="cursor-pointer ">
                    CRM
                  </Link>
                </p>
                <p className="font-regular font-Gilroy text-h6 -tracking-[0.2px] text-white cursor-pointer">
                  <Link href="/FinantialTool" className="cursor-pointer ">
                    Financial tools
                  </Link>
                </p>
                <p className="font-regular font-Gilroy text-h6 -tracking-[0.2px] text-white cursor-pointer">
                  <Link href="/onlinemettings" className="cursor-pointer ">
                    Meeting
                  </Link>
                </p>
                <p className="font-regular font-Gilroy text-h6 -tracking-[0.2px] text-white cursor-pointer">
                  <Link href="/timeseduling" className="cursor-pointer ">
                    Schedule
                  </Link>
                </p>
                <p className="font-regular font-Gilroy text-h6 -tracking-[0.2px] text-white cursor-pointer">
                  <Link
                    href="/custumerrelationship"
                    className="cursor-pointer "
                  >
                    Contracts
                  </Link>
                </p>
              </div>
            </div>
            <div className="w-full md:w-auto">
              <p className="font-bold text-h5 font-Gilroy -tracking-[0.1px] text-white opacity-65">
                Information
              </p>
              <div className="space-y-2 mt-[20px]">
                <p className="font-regular font-Gilroy text-h6 -tracking-[0.2px] text-white cursor-pointer">
                  Pricing
                </p>
                <p className="font-regular font-Gilroy text-h6 -tracking-[0.2px] text-white cursor-pointer">
                  <Link href="/resources" className="cursor-pointer ">
                    Resources
                  </Link>
                </p>
                <p className="font-regular font-Gilroy text-h6 -tracking-[0.2px] text-white cursor-pointer">
                  <Link href="/apis" className="cursor-pointer ">
                    APIs
                  </Link>
                </p>
                <p className="font-regular font-Gilroy text-h6 -tracking-[0.2px] text-white cursor-pointer">
                  Blogs
                </p>
                <p className="font-regular font-Gilroy text-h6 -tracking-[0.2px] text-white cursor-pointer">
                  <Link href="/faqs" className="cursor-pointer ">
                    FAQs
                  </Link>
                </p>
                <p className="font-regular font-Gilroy text-h6 -tracking-[0.2px] text-white cursor-pointer">
                  <Link href="/helpcenter" className="cursor-pointer ">
                    Help Center
                  </Link>
                </p>
              </div>
            </div>
            <div className="w-full md:w-auto">
              <p className="font-bold text-h5 font-Gilroy -tracking-[0.1px] text-white opacity-65">
                Legal
              </p>
              <div className="space-y-2 mt-[20px]">
                <p className="font-regular font-Gilroy text-h6 -tracking-[0.2px] text-white cursor-pointer">
                  <Link href="/privacy" className="cursor-pointer ">
                    Privacy Policy
                  </Link>
                </p>
                <p className="font-regular font-Gilroy text-h6 -tracking-[0.2px] text-white cursor-pointer">
                  <Link href="/terms-conditions" className="cursor-pointer ">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
