import Image from "next/image";
import CustomButton from "./component/customButton/white";
import { LandingNavbar } from "./component/navbar/LandingNavbar";

export default function Home() {
  return (
    <section>
      <main style={{
        background: "linear-gradient(180deg, #8449EB 0%, #6A56F6 100%)"
      }} className="h-[760px] relative">

        <LandingNavbar />
        <div className="mt-[70px] mx-auto w-[780px] space-y-3">
          <h1 className="text-center font-extrabold text-white text-5xl leading-[60px]">
            Schesti - Revolutionizing Landscaping Estimations and Scheduling
          </h1>
          <p
            className="text-center text-white font-light text-xl mt-[20px]"
          >Take your landscaping projects to new heights with Schesti. Sign up now for a smarter way to estimate, schedule, and manage your projects</p>
          <div className="w-48 mx-auto">
            <CustomButton
              text="Get Started"
              className="!rounded-full !text-[#7138DF]"
            />
          </div>
        </div>
        <Image
          src={"/landing.png"}
          height={900}
          width={1400}
          className="absolute left-[50%] -translate-x-[50%] -bottom-80"
          alt="dashboard"
        />
      </main>


      <div className="px-[200px] mt-[400px]">

        <div className="w-[800px] space-y-3">
          <h3 className="text-[#7138DF] text-lg font-medium">Leading the Way: </h3>
          <h1 className="text-[#101112] font-medium leading-8">
            Schesti, the Pioneer Application Crafting Precise Estimates Through AI for Exceptional Organizational Success.
          </h1>
          <p className="text-lg text-[#475467] leading-8">Elevate Your Landscaping Venture with Schesti: A Symphony of Precision and Speed, Reshaping the Land</p>
        </div>

        <div className="mt-3">
          <div className="flex items-center justify-between w-full">
            <div className="space-y-3">
              <h1 className="text-[#1D2939] font-bold leading-8">
                Advanced Takeoff Module with AI Integration
              </h1>
              <p className="text-lg leading-10 text-[#475467]">Leverage our sophisticated Takeoff Module, seamlessly integrated with AI technology. Experience precision and efficiency in landscaping estimates, ensuring your projects start on a foundation of accuracy and reliability.</p>
            </div>
            <div>
              <Image
                src={"/ai-integration-img.png"}
                height={500}
                width={600}
                alt="dashboard"
              />
            </div>
          </div>
        </div>


      </div>

      <div className="mt-20 bg-[#F2F2FF]">
        <div className="px-[200px] py-8 space-y-8">
          <div className="w-[700px] mx-auto">
            <h1 className="text-center font-extrabold text-[#1D2939] text-3xl leading-10">
              Revolutionize your field service business with schesti.
            </h1>
          </div>
          <p className="text-lg leading-10 text-[#344054]">
            Schesti streamlines your business operations by providing a central hub for all your clients, projects, scheduling, invoicing, and estimating needs. {"It's"} the ultimate tool for businesses who want to save time, increase efficiency, and boost profitability.
          </p>

          <div className="flex justify-center px-28 space-x-6">
            <CustomButton
              text="Estimating"
              className="!rounded-full !bg-transparent !text-[#8449EB] !border-[#8449EB]"
            />
            <CustomButton
              text="Invoice"
              className="!rounded-full !bg-transparent !text-[#718096] !border-[#718096]"
            />
            <CustomButton
              text="Subcontractor"
              className="!rounded-full !bg-transparent !text-[#718096] !border-[#718096]"
            />
            <CustomButton
              text="Invoice"
              className="!rounded-full !bg-transparent !text-[#718096] !border-[#718096]"
            />
            <CustomButton
              text="Meeting"
              className="!rounded-full !bg-transparent !text-[#718096] !border-[#718096]"
            />
          </div>


          <div className="flex space-x-10">
            <div>
              <Image
                src={"/schedule-img.png"}
                height={500}
                width={600}
                alt="dashboard"
              />
            </div>

            <div className="mt-3 space-y-6">
              <h3 className="text-[#EF9F28] text-xl font-normal">Estimating</h3>
              <h1 className="text-4xl text-[#1D2939] font-bold leading-10">Automate your business with schesti</h1>
              <p className="text-lg text-[#475467] leading-8">Say goodbye to messy spreadsheets and disorganized paperwork. With schesti, you can easily manage your clients, estimates, sales process, and scheduling, all in one place. Plus, our intuitive interface makes it easy for anyone on your team to use.</p>
            </div>
          </div>

        </div>
      </div>


      <div className="px-[200px] mt-3">
        <div className="flex items-center justify-between w-full">
          <div className="space-y-6">
            <h1 className="text-[#1D2939] font-bold leading-8">
              Schedule estimates and create gantt charts
            </h1>
            <p className="text-lg text-[#475467] leading-10">Efficiently manage your project timelines. Schedule estimates with ease and visualize your project plan through Gantt charts. {"Schesti’s"} intuitive scheduling tools provide a clear overview, helping you stay on top of deadlines and ensuring a well-organized project workflow.</p>
          </div>
          <div>
            <Image
              src={"/schedule-gantt-img.png"}
              height={600}
              width={700}
              alt="dashboard"
            />
          </div>
        </div>
      </div>


      <div className="mt-20 bg-[#344054]">
        <div className="px-[200px] py-8">
          <div className="flex items-center">
            <div className="flex-1 mt-4 pr-24 space-y-7">
              <div className="space-y-5">
                <h1 className="text-white text-4xl">Schedule estimates and create gantt charts</h1>
                <p
                  className="text-white text-lg leading-10 pr-52"
                >
                  Unlock a prime advertising space for your company! Schesti offers exclusive opportunities for our valued partners to showcase their brand or promotions here.
                </p>
              </div>
              <CustomButton
                text="Request for post"
                className="!rounded-full !w-48 !text-[#8449EB]"
              />
            </div>
            <div>
              <Image
                src={"/request-for-post-img.svg"}
                height={400}
                width={400}
                alt="dashboard"
              />
            </div>
          </div>

        </div>
      </div>


      <div className="mt-20">
        <div className="px-[200px] py-8">
          <h1 className=" text-4xl font-bold text-[#1D2939] text-center">This is how schesti works</h1>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

              <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
                <div className="flex items-center justify-between p-6">
                  <h3 className="text-2xl font-semibold text-[#1D2939]">Add client</h3>
                  <div className="text-2xl fill-none font-bold text-[#1D2939]">1</div>
                </div>
                <div className="px-6 pb-6">
                  <p className="text-lg leading-8 text-[#667085]">
                    Input and organize client information seamlessly, ensuring you have all the details you need to add in the
                    client hub for creating client.
                  </p>
                </div>
              </div>


              <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
                <div className="flex items-center justify-between p-6">
                  <h3 className="text-2xl font-semibold  text-[#1D2939]">Create project request</h3>
                  <div className="text-2xl fill-none font-bold text-[#1D2939]">2</div>
                </div>
                <div className="px-6 pb-6">
                  <p className="text-lg leading-8 text-[#667085]">
                    Kickstart your projects by easily creating and managing detailed estimate requests. Define project scopes, add specific requirements, and set the stage for accurate and comprehensive estimates.
                  </p>
                </div>
              </div>

              <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
                <div className="flex items-center justify-between p-6">
                  <h3 className="text-2xl font-semibold  text-[#1D2939]">Takeoff and esstimate</h3>
                  <div className="text-2xl fill-none font-bold text-[#1D2939]">3</div>
                </div>
                <div className="px-6 pb-6">
                  <p className="text-lg leading-8 text-[#667085]">
                    This cutting-edge combination allows you to generate estimates efficiently, incorporating AI insights for enhanced accuracy. Now say goodbye to guesswork and hello to data-driven landscaping estimates.
                  </p>
                </div>
              </div>


              <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
                <div className="flex items-center justify-between p-6">
                  <h3 className="text-2xl font-semibold  text-[#1D2939]">Schedule project</h3>
                  <div className="text-2xl fill-none font-bold text-[#1D2939]">4</div>
                </div>
                <div className="px-6 pb-6">
                  <p className="text-lg leading-8 text-[#667085]">
                    Manage your project timelines. Schedule estimates with ease and visualize your project plan through Gantt charts. This intuitive scheduling tools provide a clear overview, helping you stay on top of deadlines.
                  </p>
                </div>
              </div>


            </div>
          </div>

        </div>
      </div>


      <div
        style={{
          background: "linear-gradient(180deg, #8449EB 0%, #6A56F6 100%)"
        }}
        className="mt-20">
        <div className="px-[200px] py-8">
          <div>
            <div className="mt-4 pxs-24 space-y-7">
              <div className="space-y-8">
                <h1 className="text-white text-center text-4xl">Schesti: Your Gateway to Unmatched Efficiency</h1>
                <p
                  className="text-white text-lg leading-10 text-center px-60"
                >
                  Empower Your Projects with Schesti: Your Comprehensive Solution for Achieving Exceptional Efficiency in Field Service Excellence
                </p>
              </div>
              <div className="flex justify-center space-x-4">
                <CustomButton
                  text="Request for post"
                  className="!rounded-full !w-48 !text-[#8449EB]"
                />

                <CustomButton
                  text="Request for post"
                  className="!rounded-full !w-48 !bg-transparent  !text-white"
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      <div
        className="bg-[#1D2939] px-[200px] py-2">
        <div className="flex justify-between">
          <div className="flex flex-col justify-between">
            <Image
              src={'/logowhite.svg'}
              width={90}
              height={90}
              alt="Schesti"
            />

            <p
              className={`text-gray-400  text-lg pb-1 font-medium`}
            >
              Contact
            </p>

            <p
              className={`text-white  text-lg pb-1 font-medium`}
            >
              info@shesti.com
            </p>
          </div>

          <div className="flex items-center space-x-8">
            <a
              className={`text-white cursor-pointer text-lg pb-1 font-medium`}
            >
              Home
            </a>
            <a
              className={`text-white cursor-pointer text-lg pb-1 font-medium`}
            >
              Plans
            </a>
            <a
              className={`text-white cursor-pointer text-lg pb-1 font-medium`}
            >
              Contact Us
            </a>
          </div>

          <div className="flex flex-col justify-end items-start">
            <p
              className={`text-white text-lg pb-1 font-medium`}
            >
              Get in touch
            </p>
            <p
              className={`text-gray-400 text-lg pb-1 font-medium`}
            >
              Stay informed on how you can make difference
            </p>

            <div className="flex justify-center py-2 ">
              <div className="flex items-center rounded-full bg-white px-4 py-1 shadow-md">
                <input
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 flex-1 border-none"
                  placeholder="Enter your email"
                  type="email"
                />
                <Image
                  src={"right-arrow-purple.svg"}
                  width={20}
                  height={20}
                  alt="arrow"
                />
              </div>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}
