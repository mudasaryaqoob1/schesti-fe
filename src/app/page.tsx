'use client';
import Image from 'next/image';
import CustomButton from './component/customButton/white';
import { LandingNavbar } from './component/navbar/LandingNavbar';
import LandingFooter from './component/footer/LandingFooter';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RequestForPost } from './component/landing/RequestForPost';
import { GatewayToEfficiency } from './component/landing/GatewayToEfficiency';

type Key = 'estimating' | 'invoice' | 'meeting' | 'client' | 'subcontractor';

// eslint-disable-next-line no-unused-vars
const featuresData: {
  [_k in Key]: { title: string; description: string; image: string };
} = {
  estimating: {
    title: 'Automate your business with schesti',
    description:
      'Say goodbye to messy spreadsheets and disorganized paperwork. With schesti, you can easily manage your clients, estimates, sales process, and scheduling, all in one place. Plus, our intuitive interface makes it easy for anyone on your team to use.',
    image: '/schedule-img.png',
  },

  invoice: {
    title: 'Easy and Instant Invoices',
    description:
      "Simplify your billing process with Schesti's feature - Easy and Instant Invoices. Create and manage invoices swiftly against clients. Enjoy a seamless billing experience with our user-friendly interface designed to make invoicing quick and effortless. From project-based invoicing to client transactions, our feature ensures precision and speed, giving you more time to focus on what matters. Experience the convenience of managing your financial transactions with Easy and Instant Invoices, where billing becomes instant and hassle-free.",
    image: '/invoice-img.png',
  },
  meeting: {
    title: 'Streamlined Meetings with Jitsi Meet',
    description:
      "Experience the ease of Schesti's integration with Jitsi Meet, making your virtual meetings effortlessly smooth. Connect seamlessly, communicate clearly, and collaborate effectively with teams and clients. Enjoy the simplicity of crystal-clear video calls and intuitive features that enhance every meeting. Jitsu provide a quick catch-up or a crucial client discussion, Schesti and Jitsi Meet bring you hassle-free, streamlined meetings for unparalleled success.",
    image: '/schedule-img.png',
  },
  client: {
    title: 'Client Management with Schesti',
    description:
      'In Schesti, user can able to organize their client efficiently. Client Hub simplifies the way you handle client information. From contact details to project history, stay on top of every interaction. Navigate seamlessly, organize effortlessly, and build lasting connections with ease. Elevate your client management experience and unlock new possibilities for business growth.',
    image: '/Client-img.png',
  },
  subcontractor: {
    title: 'Allocate Projects to Subcontractors',
    description:
      "Streamline workflows and enhance project efficiency by effortlessly allocating projects to specialized teams. Assign estimates with ease, ensuring a harmonious and productive project workflow with Schesti's advanced allocation capabilities.",
    image: '/Subcontractor-img.png',
  },
};

export default function Home() {
  const router = useRouter();
  const [tab, setTab] = useState<Key>('estimating');

  return (
    <section>
      <main
        style={{
          background: 'linear-gradient(180deg, #8449EB 0%, #6A56F6 100%)',
        }}
        className="h-[760px] relative"
      >
        <LandingNavbar />
        <div className="mt-[101px] mx-auto w-[1063px]">
          <h1 className="text-center font-extrabold text-white text-[64px] leading-[80px]">
            Schesti - Revolutionizing Landscaping Estimations and Scheduling
          </h1>
          <p className="text-center text-white w-[774px] font-light text-xl mx-auto my-[26px]">
            Take your landscaping projects to new heights with Schesti. Sign up
            now for a smarter way to estimate, schedule, and manage your
            projects
          </p>
          <div className="w-48 mx-auto relative">
            <CustomButton
              text="Get Started"
              className="!rounded-full !text-[#7138DF]"
              onClick={() => router.push('/register')}
            />
            <Image
              src={'/landing.png'}
              height={758.21}
              width={1325.71}
              className="absolute left-[50%] -translate-x-[50%] top-[37px]"
              alt="dashboard"
            />
          </div>
        </div>
      </main>

      <div className="px-[200px] mt-[633px]">
        <div>
          <h3 className="text-[#EF9F28] text-[24px] font-medium leading-[32px]">
            Leading the Way:{' '}
          </h3>
          <h1 className="text-[#101112] py-[15px] text-[48px] font-medium leading-[66px]">
            Schesti, the Pioneer Application Crafting Precise Estimates Through
            AI for Exceptional
            <br /> Organizational Success.
          </h1>
          <p className="text-[20px] text-[#475467] mt-[15px] leading-[38px]">
            Elevate Your Landscaping Venture with Schesti: A Symphony of
            Precision and Speed,
            <br /> Reshaping the Land
          </p>
        </div>

        <div className="mt-3">
          <div className="flex justify-between space-x-5 items-center ">
            <div>
              <h3 className="text-[#EF9F28] text-[24px] font-medium leading-[32px]">
                Quantity Takeoff{' '}
              </h3>
              <h1 className="text-[#1D2939] text-[40px] py-[15px] font-bold leading-[60px]">
                Advanced Takeoff Module with AI Integration
              </h1>
              <p className="text-[20px] font-normal leading-[38px] text-[#475467]">
                Leverage our sophisticated Takeoff Module, seamlessly integrated
                with AI technology. Experience precision and efficiency in
                landscaping estimates, ensuring your projects start on a
                foundation of accuracy and reliability.
              </p>
            </div>
            <div>
              <Image
                src={'/ai-integration-img.png'}
                height={576.46}
                width={562.3}
                alt="dashboard"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 bg-[#F2F2FF]">
        <div className="px-[200px] py-16">
          <h3 className="text-[#EF9F28] text-center text-[24px] font-medium leading-[32px]">
            Features
          </h3>
          <h1 className="text-center w-[829px] pb-[20px] mx-auto py-[24px] font-extrabold text-[#1D2939] text-[40px] leading-[60px]">
            Revolutionize your field service <br /> business with schesti.
          </h1>
          <p className="text-[20px] font-normal pb-[37px] leading-[38px] text-[#344054]">
            Schesti streamlines your business operations by providing a central
            hub for all your clients, projects, scheduling, invoicing, and
            estimating needs. {"It's"} the ultimate tool for businesses who want
            to save time, increase efficiency, and boost profitability.
          </p>

          <div className="flex justify-center px-28 pt-[37px] pb-[57px] space-x-6">
            <CustomButton
              text="Estimating"
              className={`!rounded-full !bg-transparent  ${tab === 'estimating' ? '!text-[#8449EB] !border-[#8449EB]' : '!text-[#718096] !border-[#718096]'}`}
              onClick={() => setTab('estimating')}
            />
            <CustomButton
              text="Invoice"
              className={`!rounded-full !bg-transparent  ${tab === 'invoice' ? '!text-[#8449EB] !border-[#8449EB]' : '!text-[#718096] !border-[#718096]'}`}
              onClick={() => setTab('invoice')}
            />
            <CustomButton
              text="Subcontractor"
              className={`!rounded-full !bg-transparent  ${tab === 'subcontractor' ? '!text-[#8449EB] !border-[#8449EB]' : '!text-[#718096] !border-[#718096]'}`}
              onClick={() => setTab('subcontractor')}
            />
            <CustomButton
              text="Client"
              className={`!rounded-full !bg-transparent  ${tab === 'client' ? '!text-[#8449EB] !border-[#8449EB]' : '!text-[#718096] !border-[#718096]'}`}
              onClick={() => setTab('client')}
            />
            <CustomButton
              text="Meeting"
              className={`!rounded-full !bg-transparent  ${tab === 'meeting' ? '!text-[#8449EB] !border-[#8449EB]' : '!text-[#718096] !border-[#718096]'}`}
              onClick={() => setTab('meeting')}
            />
          </div>

          <div className="flex space-x-10 pb-[64px]">
            <div>
              <Image
                src={featuresData[tab].image}
                height={426.04}
                width={582.61}
                alt="dashboard"
                className="rounded-lg"
              />
            </div>

            <div className="mt-3">
              <h3 className="text-[#EF9F28] capitalize text-[24px] leading-[24px] font-normal">
                {tab}
              </h3>
              <h1 className="text-[40px] pt-[12px] pb-[20px] text-[#1D2939] font-bold leading-[60px]">
                {featuresData[tab].title}
              </h1>
              <p className="text-[20px] text-[#475467] leading-[38px]">
                {featuresData[tab].description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-[200px] my-[104px]">
        <div className="flex items-center justify-between space-x-28 w-full">
          <div>
            <h3 className="text-[#EF9F28] text-[24px] font-medium leading-[32px]">
              Project schedule
            </h3>
            <h1 className="text-[#1D2939] pt-[15px] pb-[24px] font-bold text-[40px] leading-[60px]">
              Schedule estimates and create gantt charts
            </h1>
            <p className="text-[20px] text-[#475467] leading-[38px]">
              Efficiently manage your project timelines. Schedule estimates with
              ease and visualize your project plan through Gantt charts.{' '}
              {'Schesti’s'} intuitive scheduling tools provide a clear overview,
              helping you stay on top of deadlines and ensuring a well-organized
              project workflow.
            </p>
          </div>
          <div>
            <Image
              src={'/schedule-gantt-img.png'}
              height={465.93}
              width={578.32}
              alt="dashboard"
            />
          </div>
        </div>
      </div>

      <RequestForPost />

      <div className="my-[147px]">
        <div className="px-[200px] py-8">
          <h3 className="text-[#EF9F28] text-[24px] text-center font-medium leading-[32px]">
            Work process
          </h3>
          <h1 className=" text-[40px] font-bold pt-[12px] pb-[49px] leading-[60px] text-[#1D2939] text-center">
            This is how schesti works
          </h1>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm w-full"
                data-v0-t="card"
              >
                <div className="flex items-center justify-between p-6">
                  <h3 className="text-[18px] leading-[24px] font-semibold text-[#1D2939]">
                    Add client
                  </h3>
                  <div className="font-outline">1</div>
                </div>
                <div className="px-6 pb-6">
                  <p className="text-[16px] leading-[28px] text-[#667085]">
                    Input and organize client information seamlessly, ensuring
                    you have all the details you need to add in the client hub
                    for creating client.
                  </p>
                </div>
              </div>

              <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm w-full"
                data-v0-t="card"
              >
                <div className="flex items-center justify-between p-6">
                  <h3 className="text-[18px] leading-[24px] font-semibold text-[#1D2939]">
                    Create project request
                  </h3>
                  <div className="font-outline">2</div>
                </div>
                <div className="px-6 pb-6">
                  <p className="text-[16px] leading-[28px] text-[#667085]">
                    Kickstart your projects by easily creating and managing
                    detailed estimate requests. Define project scopes, add
                    specific requirements, and set the stage for accurate and
                    comprehensive estimates.
                  </p>
                </div>
              </div>

              <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm w-full"
                data-v0-t="card"
              >
                <div className="flex items-center justify-between p-6">
                  <h3 className="text-[18px] leading-[24px] font-semibold text-[#1D2939]">
                    Takeoff and esstimate
                  </h3>
                  <div className="font-outline">3</div>
                </div>
                <div className="px-6 pb-6">
                  <p className="text-[16px] leading-[28px] text-[#667085]">
                    This cutting-edge combination allows you to generate
                    estimates efficiently, incorporating AI insights for
                    enhanced accuracy. Now say goodbye to guesswork and hello to
                    data-driven landscaping estimates.
                  </p>
                </div>
              </div>

              <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm w-full"
                data-v0-t="card"
              >
                <div className="flex items-center justify-between p-6">
                  <h3 className="text-[18px] leading-[24px] font-semibold text-[#1D2939]">
                    Schedule project
                  </h3>
                  <div className="font-outline">4</div>
                </div>
                <div className="px-6 pb-6">
                  <p className="text-[16px] leading-[28px] text-[#667085]">
                    Manage your project timelines. Schedule estimates with ease
                    and visualize your project plan through Gantt charts. This
                    intuitive scheduling tools provide a clear overview, helping
                    you stay on top of deadlines.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <GatewayToEfficiency />

      <LandingFooter />
    </section>
  );
}
