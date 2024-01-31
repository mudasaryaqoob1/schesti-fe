'use client';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import { Badge, Progress, Select } from 'antd';
import React, { useEffect, useState } from 'react';
// import { Column } from '@ant-design/plots';
import SenaryHeading from '@/app/component/headings/senaryHeading';
import CustomButton from '@/app/component/customButton/white';
import QuinaryHeading from '@/app/component/headings/quinary';
import Table, { type ColumnsType } from 'antd/es/table';

const Fiance = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])
  const columns: ColumnsType<{}> = [
    {
      title: 'Month',
      dataIndex: 'month',
    },
    {
      title: 'Receivable',
      dataIndex: 'receivable',
      render(value) {
        return `$${value}`;
      },
    },
    {
      title: 'Target',
      dataIndex: 'amount',
      render(value) {
        return `$${value}`;
      },
    },
    {
      title: 'Target %',
      dataIndex: 'percentage',
      render(value) {
        return `${value}%`;
      },
    },
  ];

  if (!isMounted) {
    return null
  }

  return (
    <section className="my-4  mx-8 px-4">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-8  shadow bg-white p-4 rounded-md">
          <div className="flex justify-between items-center">
            <QuaternaryHeading
              title="Receivable Vs Payable"
              className="text-[#344054] font-semibold"
            />
            <div className="flex items-center space-x-2">
              <Badge status="warning" text="Total Payable" />
              <Badge color="#7F56D9" status="success" text="Total Receivable" />
            </div>
            <Select
              placeholder="Choose Year"
              options={[
                { label: 'Year 2024', value: '2024' },
                { label: 'Year 2023', value: '2023' },
                { label: 'Year 2022', value: '2022' },
                { label: 'Year 2021', value: '2021' },
              ]}
            />
          </div>

          {/* <Column
            {...config1} /> */}
        </div>
        <div className="col-span-12 md:col-span-4 space-y-4 shadow bg-white p-4 rounded-md">
          <div className="flex justify-between items-center">
            <QuaternaryHeading
              title="Target Status"
              className="text-[#344054] font-semibold"
            />
            <Select
              placeholder="Choose Year"
              options={[
                { label: 'Year 2024', value: '2024' },
                { label: 'Year 2023', value: '2023' },
                { label: 'Year 2022', value: '2022' },
                { label: 'Year 2021', value: '2021' },
              ]}
            />
          </div>
          <div className="flex justify-center">
            <Progress
              showInfo
              type="dashboard"
              strokeColor={'#7F56D9'}
              strokeWidth={12}
              size={200}
              percent={75}
            />
          </div>
          <div className="flex justify-between items-center">
            <Badge color="#0074D9" status="default" text="Completed" />
            <SenaryHeading title="35k" />
          </div>
          <div className="flex justify-between items-center">
            <Badge status="warning" text="Remaining" />
            <SenaryHeading title="35k" />
          </div>
        </div>
      </div>

      <div className="shadow space-y-4 bg-white p-4 rounded-md my-3">
        <div className="flex items-center">
          <QuaternaryHeading
            title="Target Table"
            className="!text-[#344054] font-semibold"
          />
          <div className="flex flex-1 space-x-5 justify-end items-center">
            <QuinaryHeading title="Back log" className="text-[#868686]" />
            <QuinaryHeading title="$53674" className="text-[#7F56D9]" />
            <Select
              placeholder="Choose Year"
              options={[
                { label: 'Year 2024', value: '2024' },
                { label: 'Year 2023', value: '2023' },
                { label: 'Year 2022', value: '2022' },
                { label: 'Year 2021', value: '2021' },
              ]}
            />
            <CustomButton text="Download" className="!w-44 !py-2" />
          </div>
        </div>
        <Table
          loading={false}
          columns={columns}
          dataSource={Array.from({ length: 10 }, (_, index) => ({
            month: `Month ${index + 1}`,
            receivable: Math.random() * 1000, // You can replace this with your own logic for 'receivable'
            amount: Math.random() * 1000, // You can replace this with your own logic for 'amount'
            percentage: Math.random() * 100, // You can replace this with your own logic for 'percentage'
          }))}
          pagination={false}
        />
      </div>
    </section>
  );
};

export default Fiance;
