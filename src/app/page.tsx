"use client";
import Image from "next/image";
import CustomButton from "./component/customButton/white";
import { LandingNavbar } from "./component/navbar/LandingNavbar";
import LandingFooter from "./component/footer/LandingFooter";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <section>
      <main style={{
        background: "linear-gradient(180deg, #8449EB 0%, #6A56F6 100%)"
      }} className="h-[760px] relative">
        <LandingNavbar />
        <div className="mt-[101px] mx-auto w-[1063px]">
          <h1 className="text-center font-extrabold text-white text-[64px] leading-[80px]">
            Schesti - Revolutionizing Landscaping Estimations and Scheduling
          </h1>
          <p
            className="text-center text-white w-[774px] font-light text-xl mx-auto my-[26px]"
          >Take your landscaping projects to new heights with Schesti. Sign up now for a smarter way to estimate, schedule, and manage your projects</p>
          <div className="w-48 mx-auto relative">
            <CustomButton
              text="Get Started"
              className="!rounded-full !text-[#7138DF]"
              onClick={() => router.push("/login")}
            />
            <Image
              src={"/landing.png"}
              height={758.21}
              width={1325.71}
              className="absolute left-[50%] -translate-x-[50%] top-[37px]"
              alt="dashboard"
            />
          </div>
        </div>
      </main>


      <div className="px-[200px] mt-[633px]">

        <div >
          <h3 className="text-[#7138DF] text-[24px] font-medium leading-[32px]">Leading the Way: </h3>
          <h1 className="text-[#101112] py-[15px] text-[48px] font-medium leading-[66px]">
            Schesti, the Pioneer Application Crafting Precise Estimates Through AI for Exceptional<br /> Organizational Success.
          </h1>
          <p className="text-[20px] text-[#475467] mt-[15px] leading-[38px]">Elevate Your Landscaping Venture with Schesti: A Symphony of Precision and Speed,<br />  Reshaping the Land</p>
        </div>

        <div className="mt-3">
          <div className="flex justify-between space-x-5 items-center ">
            <div>
              <h1 className="text-[#1D2939] text-[40px] pb-[24px] font-bold leading-[60px]">
                Advanced Takeoff Module with AI Integration
              </h1>
              <p className="text-[20px] font-normal leading-[38px] text-[#475467]">Leverage our sophisticated Takeoff Module, seamlessly integrated with AI technology. Experience precision and efficiency in landscaping estimates, ensuring your projects start on a foundation of accuracy and reliability.</p>
            </div>
            <div>
              <Image
                src={"/ai-integration-img.png"}
                height={576.46}
                width={562.3}
                alt="dashboard"
              />
            </div>
          </div>
        </div>


      </div>

      <div className="mt-20 bg-[#F2F2FF]">
        <div className="px-[200px] py-8">
          <h1 className="text-center w-[829px] pb-[20px] mx-auto mt-[96px] font-extrabold text-[#1D2939] text-[40px] leading-[60px]">
            Revolutionize your field service <br /> business with schesti.
          </h1>
          <p className="text-[20px] font-normal pb-[37px] leading-[38px] text-[#344054]">
            Schesti streamlines your business operations by providing a central hub for all your clients, projects, scheduling, invoicing, and estimating needs. {"It's"} the ultimate tool for businesses who want to save time, increase efficiency, and boost profitability.
          </p>

          <div className="flex justify-center px-28 pb-[67px] space-x-6">
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
              text="Client"
              className="!rounded-full !bg-transparent !text-[#718096] !border-[#718096]"
            />
            <CustomButton
              text="Meeting"
              className="!rounded-full !bg-transparent !text-[#718096] !border-[#718096]"
            />
          </div>


          <div className="flex space-x-10 pb-[64px]">
            <div>
              <Image
                src={"/schedule-img.png"}
                height={426.04}
                width={582.61}
                alt="dashboard"
              />
            </div>

            <div className="mt-3 space-y-6">
              <h3 className="text-[#EF9F28] text-[24px] leading-[24px] font-normal">Estimating</h3>
              <h1 className="text-[40px] text-[#1D2939] font-bold leading-[60px]">Automate your business<br /> with schesti</h1>
              <p className="text-[20px] text-[#475467] leading-[38px]">Say goodbye to messy spreadsheets and disorganized paperwork. With schesti, you can easily manage your clients, estimates, sales process, and scheduling, all in one place. Plus, our intuitive interface makes it easy for anyone on your team to use.</p>
            </div>
          </div>

        </div>
      </div>


      <div className="px-[200px] my-[104px]">
        <div className="flex items-center justify-between space-x-28 w-full">
          <div className="space-y-6">
            <h1 className="text-[#1D2939] font-bold text-[40px] leading-[60px]">
              Schedule estimates and create gantt charts
            </h1>
            <p className="text-[20px] text-[#475467] leading-[38px]">Efficiently manage your project timelines. Schedule estimates with ease and visualize your project plan through Gantt charts. {"Schesti’s"} intuitive scheduling tools provide a clear overview, helping you stay on top of deadlines and ensuring a well-organized project workflow.</p>
          </div>
          <div>
            <Image
              src={"/schedule-gantt-img.png"}
              height={465.93}
              width={578.32}
              alt="dashboard"
            />
          </div>
        </div>
      </div>


      <div className="mt-20 bg-[#344054]">
        <div className="px-[200px] py-8">
          <div className="flex space-x-16">
            <div className="mt-4 space-y-7">
              <div>
                <h1 className="text-white pb-[16px] text-[40px] leading-[60px]">Schedule estimates and create gantt charts</h1>
                <p
                  className="text-white text-[20px] leading-[38px] w-[696.986px]"
                >
                  Unlock a prime advertising space for your company! Schesti offers exclusive opportunities for our valued partners to showcase their<br /> brand or promotions here.
                </p>
              </div>
              <CustomButton
                text="Request for post"
                className="!rounded-full !w-48 mt-[48px] !text-[#8449EB]"
                onClick={() => router.push("/contact")}
              />
            </div>
            <div>
              <Image
                src={"/request-for-post-img.svg"}
                height={309}
                width={277.65}
                alt="dashboard"
              />
            </div>
          </div>

        </div>
      </div>


      <div className="my-[147px]">
        <div className="px-[200px] py-8">
          <h1 className=" text-[40px] font-bold leading-[60px] text-[#1D2939] text-center">This is how schesti works</h1>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

              <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
                <div className="flex items-center justify-between p-6">
                  <h3 className="text-[18px] leading-[24px] font-semibold text-[#1D2939]">Add client</h3>
                  <div className="font-outline">1</div>
                </div>
                <div className="px-6 pb-6">
                  <p className="text-[16px] leading-[28px] text-[#667085]">
                    Input and organize client information seamlessly, ensuring you have all the details you need to add in the
                    client hub for creating client.
                  </p>
                </div>
              </div>


              <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
                <div className="flex items-center justify-between p-6">
                  <h3 className="text-[18px] leading-[24px] font-semibold text-[#1D2939]">Create project request</h3>
                  <div className="font-outline">2</div>
                </div>
                <div className="px-6 pb-6">
                  <p className="text-[16px] leading-[28px] text-[#667085]">
                    Kickstart your projects by easily creating and managing detailed estimate requests. Define project scopes, add specific requirements, and set the stage for accurate and comprehensive estimates.
                  </p>
                </div>
              </div>

              <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
                <div className="flex items-center justify-between p-6">
                  <h3 className="text-[18px] leading-[24px] font-semibold text-[#1D2939]">Takeoff and esstimate</h3>
                  <div className="font-outline">3</div>
                </div>
                <div className="px-6 pb-6">
                  <p className="text-[16px] leading-[28px] text-[#667085]">
                    This cutting-edge combination allows you to generate estimates efficiently, incorporating AI insights for enhanced accuracy. Now say goodbye to guesswork and hello to data-driven landscaping estimates.
                  </p>
                </div>
              </div>


              <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
                <div className="flex items-center justify-between p-6">
                  <h3 className="text-[18px] leading-[24px] font-semibold text-[#1D2939]">Schedule project</h3>
                  <div className="font-outline">4</div>
                </div>
                <div className="px-6 pb-6">
                  <p className="text-[16px] leading-[28px] text-[#667085]">
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
            <div className="mt-4 space-y-7">
              <div>
                <h1 className="text-white text-center text-[40px] leading-[60px]">Schesti: Your Gateway to Unmatched Efficiency</h1>
                <p
                  className="text-white pt-[13px] text-[20px] leading-[38px]  text-center w-[924px] mx-auto"
                >
                  Empower Your Projects with Schesti: Your Comprehensive Solution for Achieving Exceptional Efficiency in Field Service Excellence
                </p>
              </div>
              <div className="flex mt-[42px] justify-center space-x-4">
                <CustomButton
                  text="Get start with Schesti"
                  className="!rounded-full !w-48 !text-[#8449EB]"
                  onClick={() => router.push("/login")}
                />

                <CustomButton
                  text="Contact Us"
                  className="!rounded-full !w-48 !bg-transparent  !text-white"
                  onClick={() => router.push("/contact")}
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      <LandingFooter />
    </section>
  );
}
