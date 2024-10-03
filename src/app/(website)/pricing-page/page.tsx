import React from 'react';
import Navbar from '../navbar';
import PricingCard from './pricingCard'
import Footer from '../footer'
import ContractorCards from '../homepage/contractorCard';

const cardData = [
  {
    title: 'Individual Standard License',
    price: 25,
    features: ['CRM', 'Takeoff Module', 'Construction Estimate Module'],
    buttonText: 'Buy',
  },
  {
    title: 'Individual Standard License',
    price: 40,
    features: [
      'CRM',
      'Takeoff Module',
      'Construction Estimate Module',
      'Construction Schedule Module',
      'Financial and Invoices Module',
    ],
    buttonText: 'Buy',
  },
  {
    title: 'Individual Super License',
    price: 75,
    features: [
      'CRM',
      'Takeoff Module',
      'Takeoff Module by Artificial Intelligence (AI)',
      'Construction Estimate Module',
      'Construction Schedule Module',
      'Financial and Invoices Module',
      'Video Meetings with your client and team',
    ],
    buttonText: 'Buy',
  },
  {
    title: 'Individual Standard License',
    price: 25,
    features: ['CRM', 'Takeoff Module', 'Construction Estimate Module'],
    buttonText: 'Buy',
  },
  {
    title: 'Individual Standard License',
    price: 40,
    features: [
      'CRM',
      'Takeoff Module',
      'Construction Estimate Module',
      'Construction Schedule Module',
      'Financial and Invoices Module',
    ],
    buttonText: 'Buy',
  },
  {
    title: 'Individual Super License',
    price: 75,
    features: [
      'CRM',
      'Takeoff Module',
      'Takeoff Module by Artificial Intelligence (AI)',
      'Construction Estimate Module',
      'Construction Schedule Module',
      'Financial and Invoices Module',
      'Video Meetings with your client and team',
    ],
    buttonText: 'Buy',
  },
];

const Prcing = () => {
  return (
    <div>
      <div className="w-full">
        <div className="bg-[url('/price/hero.png')] bg-cover bg-center h-[389px] bg-no-repeat w-full ">
          <div className="bg-white">
            <Navbar />
          </div>
          <div className="container">
            <div className="pt-[289px] flex justify-center px-4 lg:px-0">
              <p className="font-Gilroy font-normal text-[14px] md:text-[24px] pt-4 text-[#EF9F28] md:leading-[24px]">
                Craft Your Success
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="flex items-center justify-center mt-[17px]">
          <div className="font-bold font-Gilroy text-3xl md:text-[48px] leading-[65px] tracking-[-2px] text-gray text-center">
            Exclusive Schesti Subscriptions, A gateway to Unparalleled
            Excellence in Field Service
          </div>
        </div>
        <div className="">
          <div className="">
            <div className="mt-[30px] flex flex-col justify-center items-center ">
              <div
                className="inline-flex justify-between mb-10 rounded-md shadow-sm w-full max-w-[365px] h-[60px] bg-[#E6F2F8]"
                role="group"
              >
                <button
                  type="button"
                  className="px-[21px] m-[6px]  py-[14px] text-black text-sm font-medium rounded-[1000px] bg-blue   hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-blue"
                >
                  Individual Plan
                </button>
                <button
                  type="button"
                  className="px-[21px] m-[6px]  py-[14px]  text-sm font-medium text-[#101828] rounded-[1000px] bg-transparent  hover:bg-blue hover:text-orange-300 focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-gray dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-blue"
                >
                  Enterprise Plan
                </button>
              </div>
              <div className=" flex items-center justify-center ">
                <label className="inline-flex gap-[28px] items-center cursor-pointer">
                  <span className="ms-3 text-[18.06px] leading-[21.86px] font-medium text-gray-900 dark:text-gray peer-checked:text-[#101828]">
                    Monthly
                  </span>
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                  ></input>
                  <div className="relative w-[64px] h-7 bg-[#2f7da7] peer-focus:outline-none   rounded-full peer  peer-checked:after:translate-x-[38px] rtl:peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300  after:rounded-full after:h-6 after:w-6 after:transition-all "></div>
                  <span className="ms-3 text-[18.06px] leading-[21.86px] font-medium text-gray-900 dark:text-gray peer-checked:text-[#101828]">
                    Yearly
                  </span>
                </label>
              </div>
            </div>
          </div>
          {/* component call in this place */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 lg:px-0 gap-6 py-12 mt-[32px]">
            {cardData.map((card, index) => (
              <PricingCard
                key={index}
                title={card.title}
                price={card.price}
                features={card.features}
                buttonText={card.buttonText}
              />
            ))}
          </div>
        </div>
      </div>
      {/* section three */}
      <div className="bg-[#007AB6] mt-44 ">
        <div className="container">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-[80px]  px-4 lg:px-0 pt-4">
            <div className="w-full max-w-[580px]">
              <div className="">
                <h1 className="font-Gilroy font-bold text-[30px] md:text-[32px]  text-[#FAFAFA] md:leading-[44px]">
                  Ready to Elevate Your Business?
                </h1>
              </div>
              <div className=" pt-[16px] w-full max-w-[522px]">
                <p className="font-normal font-Gilroy text-[15px] md:text-[16px] text-[#FAFAFA] leading-[32px]">
                  Let’s discuss your requirements in detail. Schedule a meeting
                  with us, and we’ll help you understand how Schesti can best
                  serve your Construction Business
                </p>
                <p className="font-normal pt-6 font-Gilroy text-[15px] md:text-[18px] text-[#FAFAFA] leading-[32px]">
                  Get a Personalized Quote Today!
                </p>
              </div>
              <div className="mt-8">
                <button className="bg-[#E6F2F8] text-blue font-medium text-[18px] font-Poppins leading-[27px] rounded-[400px] px-6 py-[14px] md:py-[15px]">
                  Schedule a Meeting
                </button>
              </div>
            </div>
            <div className="w-full">
              <img
                src="/price/Image.png"
                alt=""
                className="w-full h-auto max-w-full max-h-[500px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>
      {/* four */}
      <div className="flex flex-col items-center gap-4 md:gap-6 lg:gap-8">
        <div className="w-full max-w-lg lg:max-w-[850px] mt-10 lg:mt-20 px-4 md:px-6 lg:px-0">
          <div
            className={`font-bold text-[28px] md:text-[36px] lg:text-[40px] leading-[36px] md:leading-[46px] lg:leading-[56px] text-center text-[#181D25] tracking-tighter `}
          >
            What Type of Company Do You Work For in Construction?
          </div>
          <div className="text-base md:text-lg lg:text-h2 font-Gilroy font-regular tracking-normal md:-tracking-[0.1px] lg:-tracking-[0.2px] text-center text-gray opacity-70 mt-4 lg:mt-6">
            Discover Construction Sector Opportunities, At SCHESTI, we provide
            tailored construction solutions for your needs, ensuring efficient
            operations and successful project outcomes - all in one place
          </div>
        </div>

        <div className="container grid w-full grid-cols-1 gap-0 px-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-9 md:px-6 lg:px-0 justify-center">
          <ContractorCards
            imageSrc="/images/Rec1.png"
            title="General Contractor"
            description="Find new projects, secure bids, minimize risks, and coordinate teams for efficient project management. Discover how we can revolutionize your construction processes."
            title2=""
            imageSrc2=""
          />
          <ContractorCards
            imageSrc="/images/Rec2.png"
            title="Sub Contractor"
            description="Track and manage labor and material costs
effortlessly with automated updates, allowing you to focus on delivering quality results on time and within budget. Simplify
subcontractor management with us"
            title2=""
            imageSrc2=""
          />
          <ContractorCards
            imageSrc="/images/Rec3.png"
            title="Owner/Developers"
            description="Optimize project financials with detailed cost
analysis and forecasting tools, empowering you to make informed
 decisions that drive project success. Trust our comprehensive project
financial management"
            title2=""
            imageSrc2=""
          />
          <ContractorCards
            imageSrc="/resources-imges/IMG.png"
            title="Professor / Student"
            description="SCHESTi streamlines academic research projects with comprehensive project management tools, including
estimating, contract management, and social media integration
tailored to academic needs"
            title2=""
            imageSrc2=""
          />
          <ContractorCards
            imageSrc="/resources-imges/IMG.png"
            title="Educational Institutes "
            description="Facilitate efficient project management and
resource allocation, supporting educational facility development and enhancement. We aid in educational construction projects"
            title2=""
            imageSrc2=""
          />
          <ContractorCards
            imageSrc="/resources-imges/IMG.png"
            title="Estimators"
            description="Rely on accurate project cost estimates according to
 industry standards and available data, empowering informed decision
making and project success. Ensure precision in construction estimating with us"
            title2=""
            imageSrc2=""
          />
          <ContractorCards
            imageSrc="/images/Rec6.png"
            title="Estimators"
            description="Rely on accurate project cost estimates according to
 industry standards and available data, empowering informed decision
making and project success. Ensure precision in construction estimating with us"
            title2=""
            imageSrc2=""
          />
          <ContractorCards
            imageSrc="/images/Rec6.png"
            title="Estimators"
            description="Rely on accurate project cost estimates according to
 industry standards and available data, empowering informed decision
making and project success. Ensure precision in construction estimating with us"
            title2=""
            imageSrc2=""
          />
        </div>
      </div>
      <div className="flex items-center justify-center mt-[72px]">
        <button className="w-[196px] h-[56px] rounded-full border border-blue font-Gilroy font-bold text-[17px] leading-[22px] -tracking-[0.6px] text-blue transition-transform duration-300 hover:scale-105">
          See more
        </button>
      </div>
      {/* five section */}

      <div className="bg-[#333E4F] mt-44 ">
        <div className="container">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0   px-4 lg:px-0 py-[45px]">
            <div className="w-full max-w-[937px]">
              <div className="">
                <h1 className="font-Gilroy font-bold text-[20px] md:text-[24px]  text-[#EF9F28] md:leading-[24px]">
                  Post advertisements request
                </h1>
                <h1 className="font-Poppins pt-3 font-semibold text-[30px] md:text-[39px]  text-[#FAFAFA] md:leading-[60px]">
                  Schedule estimates and create gantt charts
                </h1>
              </div>
              <div className=" pt-[16px] w-full max-w-[697px]">
                <p className="font-normal font-Poppins text-[15px] md:text-[20px] text-[#FAFAFA] leading-[38px]">
                  Unlock a prime advertising space for your company! Schesti
                  offers exclusive opportunities for our valued partners to
                  showcase their brand or promotions here.
                </p>
              </div>
              <div className="mt-8">
                <button className="bg-[#E6F2F8] text-blue font-medium text-[18px] font-Poppins leading-[27px] rounded-[400px] px-6 py-[14px] md:py-[16px]">
                  Request for post
                </button>
              </div>
            </div>
            <div className="">
              <img
                src="/price/man.png"
                alt=""
                className="w-full h-auto max-w-[277.65px] max-h-[340px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Prcing;
