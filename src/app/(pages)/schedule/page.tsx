'use client';
import CustomButton from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import { InputComponent } from '@/app/component/customInput/Input';
import { SelectComponent } from '@/app/component/customSelect/Select.component';
import TertiaryHeading from '@/app/component/headings/tertiary';
import ModalComponent from '@/app/component/modal';
import { HttpService } from '@/app/services/base.service';
import { selectToken } from '@/redux/authSlices/auth.selector';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { Dropdown, type MenuProps, Table, Tag } from 'antd';
import { type ColumnsType } from 'antd/es/table';
import moment from 'moment';
import Image from 'next/image';
import React, { useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Schedule = () => {
  const token = useSelector(selectToken);
  const [showModal, setShowModal] = useState(false);


  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);
  const items: MenuProps['items'] = [
    {
      key: 'schedule',
      label: <p>Schedule Project</p>,
    },
    {
      key: 'delete',
      label: <p>Delete</p>,
    },
  ];
  const columns: ColumnsType<{}> = [
    {
      title: 'Project #',
      dataIndex: 'project',
    },
    {
      title: 'Project Name',
      dataIndex: 'projectName',
    },
    {
      title: 'Managing Company (OSB)',
      dataIndex: 'managingCompany',
    },
    {
      title: 'Owner Representative (OSB)',
      dataIndex: 'ownerRepresentative',
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      render() {
        return <p>{moment(new Date()).format('DD/MM/YYYY')}</p>;
      },
    },
    {
      title: 'Task',
      dataIndex: 'task',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render(value) {
        return <Tag color="green" className='rounded-full' >{value}</Tag>;
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      key: 'action',
      render: () => (
        <Dropdown
          menu={{
            items,
          }}
          placement="bottomRight"
        >
          <Image
            src={'/menuIcon.svg'}
            alt="logo white icon"
            width={20}
            height={20}
            className="active:scale-105 cursor-pointer"
          />
        </Dropdown>
      ),
    },
  ];

  return (
    <section className="mt-6 shadow p-4 mb-[39px] md:ms-[69px] md:me-[59px] mx-4 rounded-xl ">

      <ModalComponent
        open={showModal}
        setOpen={setShowModal}
        title="Invoice Details"
        width="50%"
      >
        <div className="bg-white border border-solid border-elboneyGray rounded-[4px] z-50">
          <div className="flex px-6 py-2.5 justify-between bg-mistyWhite">
            <TertiaryHeading
              title="Invoice Details"
              className="text-graphiteGray"
            />
            <CloseOutlined
              className="cursor-pointer"
              width={24}
              height={24}
            />
          </div>

          <div className="px-6 py-2.5 space-y-3">
            <InputComponent
              label="Project name"
              type="text"
              placeholder="Enter project name"
              name="invoiceName"
            />
            <SelectComponent
              label='Duration'
              name='duration'
              placeholder='Select duration'
              field={{
                options: [{ label: "3 Months", value: 3 }, { label: "6 Months", value: 6 }, { label: "12 Months", value: 12 }]
              }}
            />

            <div className="flex justify-end py-2 space-x-2">
              <WhiteButton text="Cancel" className="!w-28" />
              <CustomButton
                text="Schedule"
                className="!w-28"
              />
            </div>
          </div>
        </div>
      </ModalComponent>

      <div className="flex justify-between flex-wrap items-center md:flex-nowrap mb-2">
        <TertiaryHeading
          title="Schedule"
          className="text-graphiteGray"
        />
        <div className="flex items-center space-x-2 flex-1 justify-end">
          <div className="w-96 ">
            <InputComponent
              label=""
              type="text"
              placeholder="Search"
              name="search"
              prefix={<SearchOutlined />}
              field={{
                type: 'text',
              }}
            />
          </div>
          <CustomButton
            text="Start new Schedule"
            icon="/plus.svg"
            className="!w-auto"
            iconwidth={20}
            iconheight={20}
            onClick={() => setShowModal(true)}
          />
        </div>
      </div>

      <div className='mt-3'>
        <Table
          loading={false}
          columns={columns}
          dataSource={[
            {
              project: "0001", projectName: "Project Name", managingCompany: "Managing Company", ownerRepresentative: "Owner Representative", dueDate: "Due Date", task: "Task", status: "Status"
            }
          ]}
          pagination={{ position: ['bottomCenter'] }}
        />
      </div>
    </section>
  );
};

export default Schedule;
