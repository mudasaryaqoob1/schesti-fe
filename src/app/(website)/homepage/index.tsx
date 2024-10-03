'use client';
import React from 'react';
import Navbar from '../navbar';
import Image from 'next/image';

import ContractorCard from './contractorCard';
import HomepageSlider from './homepageSlider';
import Footer from '../footer'
import BusinessOperationCard from './businessOperationCard';

const HomePage = () => {
  return (
    <>
      <div className="relative w-full bg-[url('/images/BG.png')] bg-cover ">
        <Navbar />
        {/* first div */}
        <div className="max-w-[679px] ml-4 mx-4 md:mx-0 md:md-0 md:ml-[60px] lg:ml-[119px] mt-8 md:mt-[80px] lg:mt-[112px] relative flex flex-col justify-between min-h-screen ">
          <div>
            <h1 className="text-h3 md:text-4xl lg:text-h1 font-Gilroy font-bold text-gray -tracking-[1px] md:-tracking-[1.5px] lg:-tracking-[2px] mb-4 md:mb-6 lg:mb-[26px]">
              LEADING THE WAY: Schesti, the First Application Offering All
              Construction Services
            </h1>
            <p className="max-w-full md:max-w-[500px] lg:max-w-[617px] font-normal font-Gilroy text-body md:text-h3 lg:text-h2 text-gray -tracking-[0.1px] md:-tracking-[0.15px] lg:-tracking-[0.2px] opacity-70 mb-6 md:mb-8 lg:mb-[64px]">
              One place for all your construction needs, Schesti builds the
              future. Explore how our comprehensive suite of services can
              elevate your construction projects. Whether you are involved in
              Bid Management, estimating, Quantity Takeoff, scheduling,
              Financials, CRM and Contracts, expanding your network, SCHESTi is
              your partner in achieving success.
            </p>
            <div className="flex flex-col gap-3 md:flex-row">
              <button className="bg-[#007AB6] font-Gilroy font-bold text-white h-[48px] md:h-[56px] shadow-[0px 4px 30px rgba(0, 122, 182, 0.1)] w-full md:w-[221px] rounded-full transition-transform duration-300 hover:scale-105 custom-button">
                Catch the offer
              </button>

              <button
                onClick={() => {
                  document
                    .getElementById('video-section')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full cursor-pointer md:w-[192px] h-[48px] md:h-[56px] shadow-[0px 4px 30px rgba(0, 122, 182, 0.1)] bg-white font-Gilroy text-[15px] md:text-[17px] leading-[20px] md:leading-[22px] text-[#007AB6] rounded-full flex items-center justify-center -tracking-[0.4px] md:-tracking-[0.6px] transition-transform duration-300 hover:scale-105"
              >
                <div className="flex items-center space-x-2">
                  <Image
                    src="/images/hero_play.svg"
                    width={19}
                    height={20}
                    alt="Play"
                  />
                  <span className="text-[17px] font-bold leading-[22px] -tracking-[0.6px] font-Gilroy text-[#007AB6]">
                    Watch video
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-0 md:bottom-10 right-0 transition-transform duration-300 hover:scale-125 cursor-pointer">
          <Image
            src="/images/hero_mesage.png"
            width={66}
            height={66}
            alt="Message"
          />
        </div>
      </div>
      {/* <Link href="/why-schesti" className="cursor-pointer ">
          Why Schesti?
        </Link> */}
      {/* Second Div */}
      <div className="max-w-full h-[504px] flex items-center justify-center bg-[#F7FAFC]">
        <div className="relative flex items-center justify-center w-full h-full">
          {/* Background images */}
          <div className="absolute top-0 right-0 w-[50px] h-[100px] sm:w-[70px] sm:h-[140px] md:w-[100px] md:h-[200px] bg-[url('/images/Dot2.png')] bg-no-repeat bg-contain" />
          <div className="absolute bottom-0 left-0 w-[50px] h-[100px] sm:w-[70px] sm:h-[140px] md:w-[100px] md:h-[200px] bg-[url('/images/Dot.png')] bg-no-repeat bg-contain" />
          <div className="text-center max-w-[90%] md:max-w-[1000px] px-2 sm:px-4">
            <span className="text-h4 sm:text-h3 font-Gilroy text-blue tracking-[1.63px] font-bold uppercase">
              Leading the Way:
            </span>
            <div
              className={`font-extrabold text-[24px] sm:text-[32px] md:text-[35px] xl:text-[40px] leading-[32px] sm:leading-[48px] md:leading-[56px] text-[#002B40] mt-4 sm:mt-6 `}
            >
              Elevate Your Construction Venture with Schesti: A Symphony of
              Precision and Speed, Reshaping the Land
            </div>
            <div className="w-[90%] sm:w-[80%] md:w-[583px] mx-auto text-h3 sm:text-h2 font-Gilroy font-bold text-[#1A202C] mt-4 sm:mt-6 opacity-70">
              Elevate Your Construction Venture with Schesti:{' '}
              <span className="text-h4 sm:text-h3 md:text-h2 font-Gilroy font-regular text-[#4A5568]">
                A Symphony of Precision and Speed, Reshaping the Land
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Third Div */}
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

        <div className="container grid w-full grid-cols-1 gap-0 px-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-9 md:px-6 lg:px-0">
          <ContractorCard
            imageSrc="/images/Rec1.png"
            title="General Contractor"
            description="Find new projects, secure bids, minimize risks, and coordinate teams for efficient project management. Discover how we can revolutionize your construction processes."
            imageSrc2=""
          />
          <ContractorCard
            imageSrc="/images/Rec2.png"
            title="Sub Contractor"
            description="Track and manage labor and material costs effortlessly with automated updates, allowing you to focus on delivering quality results on time and within budget. Simplify subcontractor management with us"
          />
          <ContractorCard
            imageSrc="/images/Rec3.png"
            title="Owner/Developers"
            description="Optimize project financials with detailed cost analysis and forecasting tools, empowering you to make informed decisions that drive project success. Trust our comprehensive project financial management"
          />
          <ContractorCard
            imageSrc="/images/Rec4.png"
            title="Professor / Student"
            description="SCHESTi streamlines academic research projects with comprehensive project management tools, including estimating, contract management, and social media integration tailored to academic needs"
            title2=""
          />
          <ContractorCard
            imageSrc="/images/Rec5.png"
            title="Educational Institutes "
            description="Facilitate efficient project management and resource allocation, supporting educational facility development and enhancement. We aid in educational construction projects"
            title2=""
          />
          <ContractorCard
            imageSrc="/images/card6.png"
            title="Estimators"
            description="Rely on accurate project cost estimates according to industry standards and available data, empowering informed decision making and project success. Ensure precision in construction estimating with us"
            title2=""
          />
          <div className="grid justify-center gap-0 md:flex grid-col-1 sm:col-span-2 lg:col-span-3 md:gap-6 lg:gap-9 ">
            <ContractorCard
              imageSrc="/images/Rec7.png "
              title="Architect"
              description="Enhance your design process and client engagement with collaborative tools and visual planning capabilities, ensuring innovative and timely project delivery. We support architects in delivering excellence"
            />
            <ContractorCard
              imageSrc="/images/Rec7.png"
              title="Vendors"
              description="Accelerate cash flows and enhance supply relationships with tools for contract management and efficient order tracking. We support vendor efficiency and relationship building"
            />
          </div>
        </div>
      </div>
      {/* Forth Div */}
      <div className="relative container_slope">
        <div className="slope-background ">
          <div className="content_slope ">
            <div className="flex flex-col items-center justify-center w-full px-4 pt-12 mx-auto max-w-7xl md:px-0 sm:pt-16 md:pt-20 lg:pt-24">
              <div className="text-2xl font-bold text-center sm:text-3xl md:text-4xl lg:text-[47px] font-Gilroy text-gray">
                Schesti, the Pioneer Application Crafting Precise Estimates
                Through AI for Exceptional Organizational Success.
              </div>
              <div className="text-center text-base lg:text-[20px] leading-[32px] font-Gilroy font-regular opacity-65 text-[#27303F] mt-4 sm:mt-6 md:mt-8 lg:mt-10">
                Elevate Your Construction Venture with Schesti: A Symphony of
                Precision and Speed, Reshaping the Land
              </div>
            </div>
            <section
              id="video-section"
              className="flex items-center justify-center mt-8 lg:mt-12"
            >
              <Image
                src="/images/Owner.png"
                width={1112}
                height={551}
                alt="Message"
              />
            </section>
          </div>
        </div>
        <div className="absolute right-0 md:flex hidden  -bottom-20 ">
          <Image src="/images/star.png" width={185} height={108} alt="Star" />
        </div>
      </div>

      {/* Fifth Div */}
      <div className="relative flex flex-col items-center justify-center max-w-full mt-[94px] mb-[95px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1110px] w-full">
          <div className="font-bold text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl md:leading-[65px] font-Gilroy text-gray">
            Eliminate costly errors in project Takeoff with Schesti
          </div>
          <div className="p-2 font-Gilroy text-center text-base sm:text-lg md:text-xl font-regular text-gray opacity-70">
            Leverage our sophisticated Takeoff Module, seamlessly integrated
            with AI technology. Experience precision and efficiency in Building
            Estimates, ensuring your projects start on a foundation of accuracy
            and reliability.
          </div>
        </div>
        <div className="mt-[16px] w-full flex justify-center">
          <Image
            src="/images/image5.png"
            width={530}
            height={443}
            alt="Image5"
            className="max-w-full h-auto"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-[80px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col p-[24px] rounded-[16px] max-w-full sm:max-w-[490px] h-auto shadow-custom">
            <div className="font-bold font-Gilroy text-[21px] leading-[26px] -tracking-[0.5px] text-gray">
              Revolutionize your approach to Takeoffs
            </div>
            <div className="font-Gilroy font-regular text-[17px] leading-[29px] -tracking-[0.2] opacity-70 text-gray">
              Speed up takeoff creation, increase bid volume, and enhance
              project success rates
            </div>
          </div>
          <div className="flex flex-col p-[24px] rounded-[16px] max-w-full sm:max-w-[490px] h-auto shadow-custom">
            <div className="font-bold font-Gilroy text-[21px] leading-[26px] -tracking-[0.5px] text-gray">
              Bid faster and more efficiently. Bid farewell to manual methods
            </div>
            <div className="font-Gilroy font-regular text-[17px] leading-[29px] -tracking-[0.2] opacity-70 text-gray">
              Prevent costly estimating mistakes with digital accuracy
            </div>
          </div>
          <div className="flex flex-col p-[24px] rounded-[16px] max-w-full sm:max-w-[490px] h-auto shadow-custom">
            <div className="font-bold font-Gilroy text-[21px] leading-[26px] -tracking-[0.5px] text-gray">
              Reduce takeoff duration by 55%
            </div>
            <div className="font-Gilroy font-regular text-[17px] leading-[29px] -tracking-[0.2] opacity-70 text-gray">
              Quickly create takeoffs and generate bids with a user-friendly
              interface requiring no additional training
            </div>
          </div>
          <div className="flex flex-col p-[24px] rounded-[16px] max-w-full sm:max-w-[490px] h-auto shadow-custom">
            <div className="font-bold font-Gilroy text-[21px] leading-[26px] -tracking-[0.5px] text-gray">
              Reduce takeoff duration by 70%
            </div>
            <div className="font-Gilroy font-regular text-[17px] leading-[29px] -tracking-[0.2] opacity-70 text-gray">
              Experience fast, intuitive AI-powered takeoff creation with no
              training needed
            </div>
          </div>
        </div>
        <div className="absolute right-0 -bottom-[185px] hidden lg:block">
          <Image
            src="/images/circle.png"
            width={200}
            height={200}
            alt="Circle"
          />
        </div>
        <div className="absolute left-0 -bottom-[270px] hidden lg:block">
          <Image
            src="/images/Circle-2.png"
            width={172}
            height={172}
            alt="Group-2"
          />
        </div>
      </div>

      {/* Sixth Div Not responsive */}
      <div className="container mx-auto px-4">
        <div className="max-w-full md:max-w-[701px] h-auto md:h-[198px] ml-5">
          <div className="font-semibold font-Gilroy text-h4 tracking-[1.6px] text-[#DCA70A] uppercase">
            Why Schesti?
          </div>
          <div className="font-bold font-Gilroy text-[24px] md:text-[32px] leading-[32px] md:leading-[48px] text-gray -tracking-[1.2px] mt-[16px] md:mt-[23px]">
            Discover why over 1 million contractors have chosen Schesti to
            facilitate the construction of more than $1 trillion worth of
            projects annually
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-end mt-8 md:mt-0">
          <div className="flex items-start md:items-end w-full md:w-auto mt-8 justify-center md:justify-start">
            <Image
              src="/images/Group-1.png"
              width={574}
              height={565}
              alt="Group-1"
              className="w-full md:w-auto"
            />
          </div>
          <div className="flex flex-col max-w-full md:max-w-[507px] mt-8 md:mt-[22px]">
            <div className="mb-8 md:mb-[90px]">
              <Image
                src="/images/Group-2.png"
                width={506}
                height={362}
                alt="Group-2"
                className="w-full md:w-auto"
              />
            </div>
            <div className="font-Gilroy font-regular text-base md:text-h3 text-gray opacity-70 -tracking-[0.2] text-left md:justify-start">
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

      {/* seven div */}
      <div className="md:mt-[245px] mt-[100px] ">
        <div className="container mx-auto px-4">
          <div className="relative font-bold text-center font-Gilroy text-[28px] sm:text-3xl md:text-4xl lg:text-5xl text-gray">
            <div className="relative inline-block">
              <span className="relative z-10">SCHESTI</span>
              <img
                className="absolute inset-0 z-0 w-full h-full "
                src="/images/yellow_path.png"
                alt="background"
              />
            </div>
            <span className="relative z-20  ml-1">
              revolutionizes global construction management with its advanced
              web app
            </span>
          </div>

          <div className="text-center font-Gilroy font-regular text-h2 opacity-70 text-gray mt-4">
            Schesti streamlines your business operations by providing a central
            hub for all your clients, projects, scheduling, invoicing, and
            estimating needs. Its the ultimate tool for businesses who want to
            save time, increase efficiency, and boost profitability
          </div>
        </div>

        <BusinessOperationCard />
      </div>

      {/* Eight Div */}
      <div className="flex h-[176px] bg-[#E6F2F8] mt-[160px] mx-auto items-center justify-center">
        <div className="container mx-4 sm:mx-6 md:mx-8 lg:mx-12 flex flex-col sm:flex-row items-center justify-between">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <div className="font-bold font-Gilroy text-[24px] sm:text-[32px] leading-[32px] sm:leading-[44px] -tracking-[1px] sm:-tracking-[1.2px] text-[#002B40]">
              Check out our prices
            </div>
            <div className="font-Gilroy font-regular text-sm sm:text-h2 text-[#002B40] opacity-65">
              Check out our different plans & select a plan which suits your
              needs
            </div>
          </div>
          <button className="w-[150px]  sm:w-[220px] h-[50px] sm:h-[59px] rounded-full bg-blue font-Gilroy font-bold text-white text-sm sm:text-[17px] leading-[24px] sm:leading-[32px] text-center -tracking-[0.5px] sm:-tracking-[0.6px] transition-transform duration-300 transform hover:scale-105">
            View pricing
          </button>
        </div>
      </div>

      {/* Ninth Div */}
      <div className="relative h-[700px] md:mt-0 mt-10 lg:max-w-[1440px] w-full md:mx-auto">
        <div className="absolute lg:flex hidden inset-0 bg-[url('/images/BG9.png')] bg-cover  items-center  opacity-30">
          <div className="absolute md:flex hidden  inset-0  bg-[url('/images/BG99.png')] mb-10 bg-contain bg-no-repeat  mt-[190px] ml-[20px] z-10"></div>
        </div>
        <div className="relative md:max-w-[534px] mx-5 md:mx-0 text-center md:text-center xl:text-start  md:ml-[120px] xl:ml-[162px] z-20">
          <div className=" absolute font-bold font-Gilroy text-2xl sm:text-3xl md:text-4xl lg:text-5xl md:leading-[58px] -tracking-[1.8px] text-gray mt-[33px]">
            Schedule projects and create Gantt charts
          </div>
        </div>
        <div className="absolute mt-20 md:mt-24 xl:mt-0 md:right-[100px] h-full  bg-white ">
          <div className="mt-[33px] ">
            <Image
              src="/images/image09.png"
              width={520}
              height={400}
              alt=" "
              className=""
            />
          </div>
          <div className="max-w-[520px] md:mx-0 mx-4 text-center md:text-start font-Gilroy font-regular text-base sm:text-[12px] md:text-[19px] md:leading-[32px]  -tracking-[0.2px] opacity-70 text-gray xl:mt-[70px] md:mt-[0px] md:ml-7">
            Efficiently manage your project timelines. Schedule estimates with
            ease and visualize your project plan through Gantt charts. Schesti’
            s intuitive scheduling tools provide a clear overview, helping you
            stay on top of deadlines and ensuring a well-organized project
            workflow.
          </div>
        </div>
      </div>

      {/* Tenth Div */}

      <div className="relative md:max-w-[1440px] max-w-full md:mx-auto  md:h-[470px] h-[390px] bg-blue z-0 overflow-hidden">
        <div className="absolute md:flex hidden  inset-0 mt-2 bg-[url('/images/stars10.png')] w-[290px] sm:w-[400px] md:w-[500px] lg:w-[590px] h-full  bg-cover bg-no-repeat z-10"></div>

        <div className="absolute z-20 ml-4 mx-4 md:mx-0 sm:ml-[110px] md:ml-[160px] lg:ml-[210px] mt-10 sm:mt-[66px]">
          <div className="max-w-full sm:max-w-[400px] md:max-w-[460px] lg:max-w-[517px]">
            <div className="font-bold font-Gilroy text-[14px] sm:text-h4 tracking-[1.63px] text-[#FFC107] uppercase">
              Post advertisements request
            </div>
            <div
              className={`font-bold text-2xl sm:text-3xl md:text-4xl leading-[32px] sm:leading-[44px] md:leading-[54px] text-white mt-2 sm:mt-[18px] `}
            >
              Claim Your Prime Advertising Space with Schesti
            </div>
          </div>
          <div className="max-w-full sm:max-w-[500px]  md:max-w-[633px] lg:max-w-[733px]">
            <div className="font-Gilroy  font-regular text-[15px] sm:text-h2  tracking-tight sm:-tracking-[0.2px] text-white opacity-70 mt-4 sm:mt-[30px]">
              Unlock a prime advertising space for your company! Schesti offers
              exclusive opportunities for our valued partners to showcase their
              brand or promotions here.
            </div>
            <div className="mt-6 lg:mt-[40px] md:mt-[10px]  flex items-center md:items-start md:justify-start justify-center">
              <button className="w-[160px] sm:w-[196px] h-[46px] sm:h-[56px] rounded-full border border-white text-white font-Gilroy font-bold text-[15px] sm:text-[17px] leading-[22px] transition-transform duration-300 hover:scale-105">
                Request for post
              </button>
            </div>
          </div>
        </div>

        <div className="absolute lg:flex hidden right-0 bottom-0 transform  translate-x-1/2 lg:translate-x-0 lg:mr-0 ">
          <Image
            src="/images/young-man-10.png"
            width={547}
            height={473}
            alt=" "
          />
        </div>
      </div>

      {/* Eleventh div */}
      <div className="container ">
        <div className="flex items-center justify-center mt-[83px]">
          <div className=" max-w-[505px] ">
            <div className="font-bold font-Gilroy text-3xl  md:text-[36px] leading-[48px] -tracking-[1.2px] text-gray text-center">
              Get to Know Us Better
            </div>
            <div className="font-regular font-Gilroy mx-4 md:mx-0 text-base sm:text-lg md:text-xl -tracking-[0.2px] text-gray opacity-70 text-center mt-1 md:mt-[17px]">
              Explore our story and values. Learn about our journey, mission,
              and the principles that drive us
            </div>
          </div>
        </div>
        <div className="flex md:flex-row flex-col xl:mx-0  md:mx-4 md:gap-4   xl:justify-between mt-[65px]">
          <div className="max-w-[350px] ">
            <Image
              src="/images/image10-1.png"
              width={350}
              height={301}
              alt=" "
              className="xl:w-[350px] xl:h-[301px] w-[350px] h-[301px] md:w-[250px] md:h-[200px]"
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
              className="xl:w-[350px] xl:h-[301px] w-[350px] h-[301px] md:w-[250px] md:h-[200px]"
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
              src="/images/image10-3.png"
              width={350}
              height={301}
              alt=" "
              className="xl:w-[350px] xl:h-[301px] w-[350px] h-[301px] md:w-[250px] md:h-[200px]"
            />
            <div className="font-Gilroy font-regular text-[15px] leading-[26px] -tracking-[0.1] text-gray opacity-70 md:mt-[22px] mt-2">
              March 27, 1999
            </div>
            <div className="font-bold font-Gilroy text-[21px] leading-[32px] text-gray -tracking-[0.5px] md:mt-[10px]">
              Why should you work as a team even on small projects.
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-[72px]">
          <button className="w-[196px] h-[56px] rounded-full border border-blue font-Gilroy font-bold text-[17px] leading-[22px] -tracking-[0.6px] text-blue transition-transform duration-300 hover:scale-105">
            Read more
          </button>
        </div>
      </div>

      {/* Twelveth div */}
      <div className=" relative max-w-full md:h-[801px] h-[680px]  bg-[#FFF9E6] mt-[67px]">
        <div className="absolute left-[91px] top-[68px] ">
          <Image
            src="/images/Qoma12.png"
            width={110}
            height={80}
            alt=" "
            className=""
          />
        </div>
        <div className="container">
          <HomepageSlider />
        </div>
      </div>
      {/* Therteen Div */}
      <div className="container mx-auto md:px-0 px-4">
        <div className="flex flex-col lg:flex-row justify-between mt-[110px]">
          <div className="mb-8 lg:mb-0">
            <Image
              src="/images/TransformConstruction.png"
              width={475}
              height={495}
              alt=" "
              className="w-full lg:w-auto"
            />
          </div>
          <div className="max-w-full lg:max-w-[511px] max-lg:mx-4">
            <div className="font-bold font-Gilroy text-3xl md:text-start lg:leading-[64px] sm:leading-[50px]  text-center sm:text-3xl md:text-4xl lg:text-5xl text-gray">
              Transform Construction with SCHESTI for a Better World!
            </div>
            <div className="font-Gilroy font-regular  text-gray opacity-70 md:text-start text-center  lg:leading-[32px] sm:leading-[28px]  text-base lg:text-[19px] mt-[32px]">
              Empower Your Projects With Schesti: Estimating construction
              projects should not be a headache. We offer a solution that
              streamlines the process for you. Discover the ease and efficiency
              of Schestis estimating feature today.
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

      {/* Forteen div */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col  items-center justify-center pt-[60px]">
          <div
            className={`font-bold text-3xl sm:text-3xl md:text-4xl lg:text-[40px] text-center md:text-start   md:leading-[50px] md:-tracking-[1px] text-[#27303F] `}
          >
            Proven results you can <span className="text-blue">trust</span>
          </div>
          <div className="font-Gilroy font-medium text-center md:text-start text-base md:text-[20px] leading-[24px] text-[#474C59] mt-[16px]">
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
            <div
              className={`font-bold leading-[40px] text-[40px] text-center text-[#181D25] mt-[18px] `}
            >
              36
            </div>
            <div className="font-Poppins text-[18px] leading-[18px] text-center text-[#404B5A] mt-[10px]">
              Increase in Efficiency
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
            <div
              className={`font-bold leading-[40px] text-[40px] text-center text-[#181D25] mt-[18px] `}
            >
              25
            </div>
            <div className="font-Poppins text-[18px] leading-[18px] text-center text-[#404B5A] mt-[10px]">
              Increase in Efficiency
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
              <div
                className={`font-bold leading-[40px] text-[40px] text-center text-[#181D25] mt-[18px] `}
              >
                100
              </div>
              <div className="font-Poppins text-[18px] leading-[18px] text-center text-[#404B5A] mt-[10px]">
                Increase in Efficiency
              </div>
            </div>
            <div className="font-Poppins text-[18px] leading-[18px] text-center text-[#404B5A] mt-[10px]">
              Projects Completed
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default HomePage;
