'use client';
import Image from "next/image";
import ProjectsReport from "./components/ProjectReport";
import SenaryHeading from "@/app/component/headings/senaryHeading";
import { InvoiceReport } from "./components/InvoiceReport";
import { SelectComponent } from "@/app/component/customSelect/Select.component";
import { StatisticsReport } from "./components/StatisticsReport";
import { AdsManagement } from "./components/AdsManagement";
const Dashboard = () => {
  return <section className="my-4  mx-8 px-4">
    <div className="grid grid-cols-4 gap-3 my-3">
      <div className="flex justify-between items-center bg-white shadow rounded-md p-4">
        <div className="space-y-2">
          <h2 className="text-[#EF9F28] font-semibold text-[30px] leading-[38px]">146</h2>
          <h3 className={'text-[#344054] text-[18px] leading-[26px] font-normal'}>Total Estimates</h3>
        </div>
        <div>
          <Image
            src={'/documentIcon.svg'}
            alt="Picture of the author"
            width={50}
            height={50}
            className="text-[#8449EB]"
          />
        </div>
      </div>
      <div className="flex justify-between items-center bg-white shadow rounded-md p-4">
        <div className="space-y-2">
          <h2 className="text-[#EF9F28] font-semibold text-[30px] leading-[38px]">146</h2>
          <h3 className={'text-[#344054] text-[18px] leading-[26px] font-normal'}>Total Takeoff</h3>
        </div>
        <div>
          <Image
            src={'/documentIcon.svg'}
            alt="Picture of the author"
            width={50}
            height={50}
            className="text-[#8449EB]"
          />
        </div>
      </div>
      <div className="flex justify-between items-center bg-white shadow rounded-md p-4">
        <div className="space-y-2">
          <h2 className="text-[#EF9F28] font-semibold text-[30px] leading-[38px]">146</h2>
          <h3 className={'text-[#344054] text-[18px] leading-[26px] font-normal'}>Project Scheduled</h3>
        </div>
        <div>
          <Image
            src={'/documentIcon.svg'}
            alt="Picture of the author"
            width={50}
            height={50}
            className="text-[#8449EB]"
          />
        </div>
      </div>
      <div className="flex justify-between items-center bg-white shadow rounded-md p-4">
        <div className="space-y-2">
          <h2 className="text-[#EF9F28] font-semibold text-[30px] leading-[38px]">146</h2>
          <h3 className={'text-[#344054] text-[18px] leading-[26px] font-normal'}>Total Invoices</h3>
        </div>
        <div>
          <Image
            src={'/documentIcon.svg'}
            alt="Picture of the author"
            width={50}
            height={50}
            className="text-[#8449EB]"
          />
        </div>
      </div>
    </div>

    <div className="grid grid-cols-12 gap-3">
      <div className="col-span-7 shadow-md bg-white rounded-md px-4">
        <div className="flex justify-between items-center mb-4">

          <h3 className="text-[18px] text-[#344054] leading-[28px] font-semibold">
            Invoice
          </h3>
          <SelectComponent
            label=""
            name="month"
            field={{
              options: [{ label: "January", value: "January" }, { label: "February", value: "February" }],
            }}
            placeholder="Month"
          />
        </div>
        <InvoiceReport />
      </div>
      <div className="col-span-5 flex flex-col space-y-8 p-3 shadow-md bg-white rounded-md px-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[18px] text-[#344054] leading-[28px] font-semibold">
            Projects
          </h3>
        </div>
        <div className="mx-auto w-48">
          <ProjectsReport />
        </div>
        <div className="px-5 space-y-5">
          <div className="flex justify-between">
            <div className="flex gap-3 items-center">
              <span className="w-3 h-3 bg-midnightBlue2" />
              <SenaryHeading title="Takeoff Project" />
            </div>
            <SenaryHeading title="20" className="font-medium" />
          </div>
          <div className="flex justify-between">
            <div className="flex gap-3 items-center">
              <span className="w-3 h-3 bg-lavenderPurple" />

              <SenaryHeading title="Estimate Project" />
            </div>

            <SenaryHeading title="23" className="font-medium" />
          </div>
          <div className="flex justify-between">
            <div className="flex gap-3 items-center">
              <span className="w-3 h-3 bg-[#36B37E]" />

              <SenaryHeading title="Invoices " />
            </div>

            <SenaryHeading title="23" className="font-medium" />
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 bg-goldenrodYellow" />

              <SenaryHeading title="Scheduled Project" />
            </div>
            <SenaryHeading title="65" className="font-medium" />
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 bg-[#B58905]" />

              <SenaryHeading title="Meeting" />
            </div>
            <SenaryHeading title="65" className="font-medium" />
          </div>
        </div>
      </div>

    </div>

    <div className="my-4 shadow-md bg-white rounded-md p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-[18px] text-[#344054] leading-[28px] font-semibold">
          Statistics
        </h3>
        <div className="p-5 flex items-center space-x-4">
          <div className="flex justify-between">
            <div className="flex gap-3 items-center">
              <span className="w-3 h-3 bg-[#7F56D9]" />
              <SenaryHeading title="Takeoff" />
            </div>

          </div>
          <div className="flex justify-between">
            <div className="flex gap-3 items-center">
              <span className="w-3 h-3 bg-[#EF9F28]" />

              <SenaryHeading title="Estimate" />
            </div>

          </div>
          <div className="flex justify-between">
            <div className="flex gap-3 items-center">
              <span className="w-3 h-3 bg-[#27AE60]" />

              <SenaryHeading title="Scheduled " />
            </div>

          </div>
        </div>
      </div>
      <StatisticsReport />

    </div>

    <AdsManagement />
  </section>;
};

export default Dashboard;
