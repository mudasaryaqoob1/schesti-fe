import React from 'react'
import Image from 'next/image';
import Navbar from '../navbar';
import Footer from '../footer'
import CollapseComponent from '../components/customCollapse';
import ContractorCards from '@/app/(website)/homepage/contractorCard'

const Resouces = () => {
  return (
    <div>
         <div className="w-full">
        <div className="bg-[url('/resources-imges/hero.png')] bg-cover bg-center bg-no-repeat w-full ">
          <Navbar />

          {/* Add your content here if needed */}
          <div className="container">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-12 px-4 lg:px-0 pt-[117px] pb-[82px]">
              <div className="">
                <div className=" w-full max-w-[541px]">
                  <div className="pb-5 relative">
                    <h1 className="font-Gilroy font-bold text-[24px] md:text-[48px] tracking-[-2px] text-gray_dark md:leading-[65px] ">
                      Find solutions to your queries or submit a support request
                    </h1>
                    <span className=" absolute right-[150px] bottom-[33px]">
                      {' '}
                      <img src="/resources-imges/Ellipse.png" alt="" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="pt-[100px]">
                <img
                  src="/resources-imges/Group.png"
                  alt=""
                  className="w-full h-auto max-w-full max-h-[500px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* second section */}
      <div className="container">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-0 pt-[106px] px-4 lg:px-0 relative">
          <div className="w-full max-w-[469px]">
            <div className="">
              <h1 className="font-Gilroy font-bold text-[30px] md:text-h1 tracking-[-1.8px] text-gray_dark leading-[58px]">
                Schesti objectives
              </h1>
            </div>
            <div className="w-full max-w-[517px] pt-[24px]">
              <p className="font-normal font-Gilroy text-[15px] md:text-[18px] tracking-[-0.2px] text-gray_dark leading-[32px]">
                Lorem ipsum dolor sit amet consectetur. In donec tellus nunc
                habitant vitae pellentesque. Bibendum imperdiet adipiscing
                praesent a nunc in. Eu diam convallis dolor accumsan urna
                eleifend diam. Dui sed convallis at ultrices praesent semper in
                nunc suspendisse. Pellentesque scelerisque eu quis nibh felis
                nisi et pharetra. Ac pulvinar sed lectus leo facilisis facilisi
                ut vel duis. Pulvinar quam convallis est ac.
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
        </div>
      </div>
      {/* third section */}
      <div className="flex flex-col items-center gap-4 mt-10 lg:mt-20 px-4 md:px-6 lg:px-0">
        <div className="text-center max-w-lg lg:max-w-[505px]">
          <h2 className="font-bold text-[28px] md:text-[36px] lg:text-[40px] text-[#181D25] tracking-tighter">
            Upcoming events
          </h2>
          <p className="text-base md:text-lg lg:text-h2 font-Gilroy text-gray opacity-70 mt-4 lg:mt-6">
            Lorem ipsum dolor sit amet consectetur. Donec ultrices pretium
            convallis massa. Amet aliquam eget et enim sit.
          </p>
        </div>

        <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-9 mt-8 relative">
          <div className="absolute left-[-163px] top-[-64px] ">
            <img src="/why-setch-imges/Dots.png" alt="" />
          </div>
          <ContractorCards
            imageSrc="/resources-imges/IMG.png"
            title="Educational Institutes"
            description="With lots of unique blocks, you can easily build a page without coding. Build your next landing page."
            title2="August 08, 2007"
            imageSrc2="/resources-imges/Fram.png"
          />
          <ContractorCards
            imageSrc="/resources-imges/IMG.png"
            title="Educational Institutes"
            description="With lots of unique blocks, you can easily build a page without coding. Build your next landing page."
            title2="August 08, 2007"
            imageSrc2="/resources-imges/Fram.png"
          />
          <ContractorCards
            imageSrc="/resources-imges/IMG.png"
            title="Educational Institutes"
            description="With lots of unique blocks, you can easily build a page without coding. Build your next landing page."
            title2="August 08, 2007"
            imageSrc2="/resources-imges/Fram.png"
          />
          <ContractorCards
            imageSrc="/resources-imges/IMG.png"
            title="Educational Institutes"
            description="With lots of unique blocks, you can easily build a page without coding. Build your next landing page."
            title2="August 08, 2007"
            imageSrc2="/resources-imges/Fram.png"
          />
          <ContractorCards
            imageSrc="/resources-imges/IMG.png"
            title="Educational Institutes"
            description="With lots of unique blocks, you can easily build a page without coding. Build your next landing page."
            title2="August 08, 2007"
            imageSrc2="/resources-imges/Fram.png"
          />
          <ContractorCards
            imageSrc="/resources-imges/IMG.png"
            title="Educational Institutes"
            description="With lots of unique blocks, you can easily build a page without coding. Build your next landing page."
            title2="August 08, 2007"
            imageSrc2="/resources-imges/Fram.png"
          />
        </div>
      </div>
      {/* four sectin */}
      <div className="container ">
        <div className="flex items-center justify-center mt-[97px]">
          <div className=" max-w-[503px] ">
            <div className="font-bold font-Gilroy text-3xl  md:text-[36px] leading-[48px] -tracking-[1.2px] text-gray text-center">
              Related Arcticles
            </div>
            <div className="font-regular font-Gilroy mx-4 md:mx-0 text-base sm:text-lg md:text-xl -tracking-[0.2px] text-gray opacity-70 text-center mt-1 md:mt-[17px]">
              Explore our story and values. Learn about our journey, mission,
              and the principles that drive us
            </div>
          </div>
        </div>
        <div className=" mx-4 md:mx-0   mt-[65px]">
          <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4 lg:px-0 gap-6 lg:gap-9 mt-8">
            <div className="max-w-[350px] ">
              <Image
                src="/images/image10-1.png"
                width={350}
                height={301}
                alt=" "
                className=""
              />
              <div className="font-Gilroy font-regular text-[15px] leading-[26px] -tracking-[0.1] text-gray opacity-70 md:mt-[22px] mt-2">
                Oct 18, 1982
              </div>
              <div className="font-bold font-Gilroy text-[21px] leading-[32px] text-gray -tracking-[0.5px]  md:mt-[10px]">
                How to win any job you want. Get started with 5 steps.
              </div>
            </div>
            <div className="max-w-[350px] mt-10 md:mt-0 ">
              <Image
                src="/images/image10-2.png"
                width={350}
                height={301}
                alt=" "
                className=""
              />
              <div className="font-Gilroy font-regular text-[15px] leading-[26px] -tracking-[0.1] text-gray opacity-70 md:mt-[22px] mt-2 ">
                August 08, 2007
              </div>
              <div className="font-bold font-Gilroy text-[21px] leading-[32px] text-gray -tracking-[0.5px] md:mt-[10px]  ">
                10 ways to reduce your office work depression.
              </div>
            </div>
            <div className="max-w-[350px] md:mt-0 mt-10">
              <Image
                src="/resources-imges/IMG2.png"
                width={350}
                height={301}
                alt=" "
                className=""
              />
              <div className="font-Gilroy font-regular text-[15px] leading-[26px] -tracking-[0.1] text-gray opacity-70 md:mt-[22px] mt-2">
                March 27, 1999
              </div>
              <div className="font-bold font-Gilroy text-[21px] leading-[32px] text-gray -tracking-[0.5px] md:mt-[10px]">
                Why should you work as a team even on small projects.
              </div>
            </div>
            <div className="max-w-[350px] ">
              <Image
                src="/resources-imges/IMG (2).png"
                width={350}
                height={301}
                alt=" "
                className=""
              />
              <div className="font-Gilroy font-regular text-[15px] leading-[26px] -tracking-[0.1] text-gray opacity-70 md:mt-[22px] mt-2">
                Oct 18, 1982
              </div>
              <div className="font-bold font-Gilroy text-[21px] leading-[32px] text-gray -tracking-[0.5px]  md:mt-[10px]">
                How to win any job you want. Get started with 5 steps.
              </div>
            </div>
            <div className="max-w-[350px] mt-10 md:mt-0 ">
              <Image
                src="/resources-imges/Img (3).png"
                width={350}
                height={301}
                alt=" "
                className=""
              />
              <div className="font-Gilroy font-regular text-[15px] leading-[26px] -tracking-[0.1] text-gray opacity-70 md:mt-[22px] mt-2 ">
                August 08, 2007
              </div>
              <div className="font-bold font-Gilroy text-[21px] leading-[32px] text-gray -tracking-[0.5px] md:mt-[10px]  ">
                10 ways to reduce your office work depression.
              </div>
            </div>
            <div className="max-w-[350px] md:mt-0 mt-10">
              <Image
                src="/resources-imges/IMG (4).png"
                width={350}
                height={301}
                alt=" "
                className=""
              />
              <div className="font-Gilroy font-regular text-[15px] leading-[26px] -tracking-[0.1] text-gray opacity-70 md:mt-[22px] mt-2">
                March 27, 1999
              </div>
              <div className="font-bold font-Gilroy text-[21px] leading-[32px] text-gray -tracking-[0.5px] md:mt-[10px]">
                Why should you work as a team even on small projects.
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-[72px]">
          <button className="w-[196px] h-[56px] rounded-full border border-blue font-Gilroy font-bold text-[17px] leading-[22px] -tracking-[0.6px] text-blue transition-transform duration-300 hover:scale-105">
            See more
          </button>
        </div>
      </div>
      {/* fifth  */}
      <div className="py-[100px]">
        <div className="container">
          <div className=" ">
            <div className="text-center">
              <h1 className="font-Gilroy font-bold text-[30px] md:text-[36px]  text-dark_black md:leading-[44.57px]">
                Browse FAQs and Troubleshooting
              </h1>
              <h1 className="font-normal font-Gilroy text-[15px] md:text-[19px]  text-gray md:leading-[32px] pt-3">
                Lorem ipsum dolor sit amet consectetur. Vitae nunc facilisis
              </h1>
            </div>
            <div className="mt-4 px-5 xl:px-0 ">
              <CollapseComponent
               faqs={[]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* six */}
      <div className="bg-[url('/resources-imges/Mission.png')] bg-cover bg-center bg-no-repeat w-full ">
        <div className=" container">
          <div className=" w-full  flex flex-col items-center pt-4 lg:pt-[130px] pb-5 lg:pb-[146px] px-4 lg:px-0">
            <div className="pb-4">
              <h1 className="font-Gilroy font-bold text-[24px] md:text-[48px] text-center tracking-[-0.2px] text-white md:leading-[60px]">
                Didn’t get your answer?
              </h1>
            </div>
            <div className=" w-full max-w-[600px] pb-6">
              <p className="font-normal font-Gilroy text-[15px] md:text-[20px] tracking-[-0.2px] text-[#E6F2F8] leading-[24px] text-center">
                Our team carefully reviews and responds to every message. We
                will get back to you as soon as possible.Get in touch now
              </p>
            </div>
            <div className="">
              <button className="bg-white text-blue font-medium text-[17px] font-Poppins leading-[22px] rounded-[300px] px-[55px] py-4 md:py-[15px]">
                Send message
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* seven section */}
      <div className="py-[50px]">
        <div className=" container">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0 justify-between px-7 md:px-0">
            <div className="">
              <div className="w-full max-w-[715px] pb-[42px]">
                <h1 className="font-Plus-Jakarta-Sans font-bold text-[24px] md:text-[40px] text-left tracking-[-0.2px] text-gray_dark md:leading-[63px] ">
                  Discover Schesti-{' '}
                  <span className="text-blue">
                    The Ultimate Solution for Construction
                  </span>
                </h1>
                <p className="font-normal pt-6 font-Poppins text-[15px] md:text-[18px] text-gray_dark leading-[36px] text-left">
                  Empower Your Projects With Schesti: Estimating construction
                  projects shouldn be a headache. We offers a solution that
                  streamlines the process for you. Discover the ease and
                  efficiency of Schesti estimating feature today.
                </p>
              </div>
              <div className="">
                <button className="bg-blue text-white font-medium text-[18px] font-Poppins leading-[36px] rounded-[40px] px-[24px] py-4 md:py-[15px]">
                  Get start with Schesti
                </button>
              </div>
            </div>
            <div className="w-full max-w-[323px]">
              <img src="/resources-imges/Fram1.png" className='w-full' alt="" />
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Resouces