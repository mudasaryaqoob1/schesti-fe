'use client';
import CustomButton from '@/app/component/customButton/button';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { bg_style } from '@/globals/tailwindvariables';
import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import AddItemTable from '@/app/component/table/table';
// import { headings } from './data';
import Description from '@/app/component/description/index';
import MinDesc from '@/app/component/description/minDesc';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import QuinaryHeading from '@/app/component/headings/quinary';
import { Dispatch, SetStateAction } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Table } from 'antd';

interface Props {
  setPrevNext: Dispatch<SetStateAction<number>>;
}

interface DataType {
  Description: string;
  Unit: string;
  Qty: string;
  Wastage: string;
  Estimator: string;
  Status: string;
  Action: string;
}

const Summary = ({ setPrevNext }: Props) => {

  const columns: ColumnsType<DataType> = [
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
    },
    {
      title: 'Wastage',
      dataIndex: 'wastage',
    },
    {
      title: 'Qty with wastage',
      dataIndex: 'qty',
    },
    {
      title: 'Labor Cost (per hour)',
      dataIndex: 'qty',
    },
    {
      title: 'Total Labor Hour',
      dataIndex: 'qty',
    },
    {
      title: 'Unit Material Cost',
      dataIndex: 'qty',
    },
    {
      title: 'Total Material Cost',
      dataIndex: 'qty',
    },
    {
      title: 'Total Equipment Cost',
      dataIndex: 'qty',
    },
    {
      title: 'Total Cost',
      dataIndex: 'qty',
    },

    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      key: 'action',
      render: (text, record) => (
        <div className="flex gap-2 justify-center">
          <Image
            src="/edit.svg"
            className="cursor-pointer"
            width={20}
            height={20}
            alt="edit"
          />
          <Image
            src="/trash.svg"
            className="cursor-pointer"
            width={20}
            height={20}
            alt="delete"
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center">
        <TertiaryHeading
          title="Scope"
          className="text-graphiteGray font-semibold"
        />
        <div className="flex gap-3 items-center lg:w-3/12">
          <CustomButton
            text="Previous"
            className="!text-graphiteGray !bg-snowWhite !shadow-scenarySubdued 
              border-2 border-solid !border-celestialGray"
            onClick={() => setPrevNext((prev) => prev - 1)}
          />

          <CustomButton text="Generate" className="!w-full" />
        </div>
      </div>
      {/*center part  */}
      {/*  */}
      <div className={`${bg_style} p-5 mt-4`}>
        <div className="flex justify-between items-center">
          <QuaternaryHeading title="Client Information" className="font-bold" />
          <div className="bg-silverGray rounded-s border border-solid border-Gainsboro cursor-pointer w-8 h-8 flex justify-center items-center">
            <Image
              src={'/chevron-down.svg'}
              alt="icon"
              width={16}
              height={16}
            />
          </div>
        </div>
        <div className="grid grid-cols-6 mt-4">
          <div>
            <QuinaryHeading title="Client Name" className="text-lightyGray" />
            <Description
              title="Albert Flores"
              className="text-midnightBlue font-popin"
            />
          </div>
          {/* 1 */}
          <div>
            <QuinaryHeading title="Company Name" className="text-lightyGray" />
            <Description
              title="Jenny Wilson"
              className="text-midnightBlue font-popin"
            />
          </div>
          {/* 2 */}
          <div>
            <QuinaryHeading title="Phone Number" className="text-lightyGray" />
            <Description
              title="(938) 861-8764"
              className="text-midnightBlue font-popin"
            />
          </div>
          {/* 3 */}
          <div>
            <QuinaryHeading title="Email" className="text-lightyGray" />
            <Description
              title="james@example.com"
              className="text-midnightBlue font-popin"
            />
          </div>
        </div>
      </div>
      {/*  */}

      <div className={`${bg_style} p-5 mt-4`}>
        <div className="flex justify-between items-center">
          <QuaternaryHeading
            title="Project Information"
            className="font-bold"
          />
          <div className="bg-silverGray rounded-s border border-solid border-Gainsboro cursor-pointer w-8 h-8 flex justify-center items-center">
            <Image
              src={'/chevron-down.svg'}
              alt="icon"
              width={16}
              height={16}
            />
          </div>
        </div>
        <div className="grid grid-cols-6 grid-rows-2 mt-2 gap-y-2">
          {/* 1 */}
          <div>
            <QuinaryHeading title="Project Name" className="text-lightyGray" />
            <Description title="ABC" className="text-midnightBlue font-popin" />
          </div>
          {/* 2 */}
          <div>
            <QuinaryHeading title="Lead Source" className="text-lightyGray" />
            <Description
              title="Source 101"
              className="text-midnightBlue font-popin"
            />
          </div>
          {/* 2 */}
          <div>
            <QuinaryHeading title="Project Value" className="text-lightyGray" />
            <Description title="5M" className="text-midnightBlue font-popin" />
          </div>
          {/* 3 */}
          <div>
            <QuinaryHeading title="Email" className="text-lightyGray" />
            <Description
              title="james@example.com"
              className="text-midnightBlue font-popin"
            />
          </div>
          <div>
            <QuinaryHeading title="Address" className="text-lightyGray" />
            <Description
              title="House# 112 Johen markes , UK "
              className="text-midnightBlue font-popin"
            />
          </div>
          {/* 3 */}
          <div className="col-span-full row-span-2 text-start">
            <QuinaryHeading
              title="Project Information"
              className="text-lightyGray"
            />
            <Description
              title="Lorem ipsum dolor sit amet consectetur. Lobortis non malesuada bibendum nunc. Ultrices feugiat egestas tempus aliquam diam blandit. Aliquet nisl id aliquet eget. Hendrerit enim odio nullam ut pulvinar."
              className="text-midnightBlue font-popin"
            />
          </div>
        </div>
      </div>
      {/* center part */}
      <TertiaryHeading
        title="Estimates"
        className="text-graphiteGray font-semibold my-4"
      />
      <div className={`${bg_style} p-5`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <QuaternaryHeading
              title="DIV-03 - Concrete "
              className="font-semibold"
            />
            <Description
              title="Concrete - Building"
              className="text-lg font-normal"
            />
          </div>
          <Description
            title=" Trade Cost: $42563"
            className="text-lg font-normal"
          />
        </div>
        <Table
          className='mt-2'
          loading={false}
          columns={columns}
          dataSource={[]}
          pagination={{ position: ['bottomCenter'] }}
        />
      </div>

      <div className="bg-celestialGray h-px  w-full my-4"></div>
      <div className="flex w-full justify-between flex-col gap-2 my-4">
        <div className="flex items-center justify-between">
          <MinDesc title="Sub Total Cost" className='text-darkgrayish' />
          <Description title="$6,000" className='font-medium' />
        </div>
        <div className="flex items-center justify-between">
          <MinDesc title="Material Tax %" className='text-darkgrayish' />
          <Description title="0.5%" className='font-medium text-graphiteGray bg-cloudWhite2 rounded-[4px] p-1' />
        </div>
        <div className="flex items-center justify-between">
          <MinDesc title="Overhead & Profit %" className='text-darkgrayish' />
          <Description title="0.5%" className='font-medium text-graphiteGray bg-cloudWhite2 rounded-[4px] p-1' />
        </div>
        <div className="flex items-center justify-between">
          <MinDesc title="Bond Fee %" className='text-darkgrayish' />
          <Description title="0.5%" className='font-medium text-graphiteGray bg-cloudWhite2 rounded-[4px] p-1' />
        </div>
      </div>
      <div className="bg-celestialGray h-px w-full my-4"></div>
      <div className="flex items-center justify-between">
        <QuaternaryHeading title="Total Bid" />
        <Description title="$20,000" />
      </div>
    </div>
  );
};

export default Summary;
