'use client';
import CustomButton from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import { InputComponent } from '@/app/component/customInput/Input';
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
import { useDispatch, useSelector } from 'react-redux';
import { SetWorkWeek } from './components/SetWorkWeek';
import { IScheduleState } from './type';
import { regularWorkingDays } from './utils';
import { ISchedule } from '@/app/interfaces/schedule/schedule.type';
import { addSchedule, selectSchedules } from '@/redux/schedule/schedule.slice';

const Schedule = () => {
  const token = useSelector(selectToken);
  const schedules = useSelector(selectSchedules);
  const dispatch = useDispatch();
  const [info, setInfo] = useState<IScheduleState>({
    projectName: '',
    duration: 0,
    hoursPerDay: 0,
    regularWorkingDays,
  });

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

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
  const columns: ColumnsType<ISchedule> = [
    {
      title: 'Project #',
      dataIndex: '_id',
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
        return (
          <Tag color="green" className="rounded-full">
            {value}
          </Tag>
        );
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
  function handleInfo<K extends keyof typeof info>(
    key: K,
    value: (typeof info)[K]
  ) {
    setInfo({ ...info, [key]: value });
  }

  function handleSchedule() {
    // validate info
    if (!info.projectName) {
      return;
    }
    if (!info.duration) {
      return;
    }
    // set Modals
    setShowModal(false);
    setShowModal2(true);
  }

  function handleConfirm() {
    const item: ISchedule = {
      _id: new Date().getTime().toString(),
      dueDate: new Date().toDateString(),
      duration: info.duration as number,
      hoursPerDay: info.hoursPerDay,
      managingCompany: '',
      ownerRepresentation: '',
      projectName: info.projectName,
      regularWokingDays: info.regularWorkingDays,
      status: 'active'
    };
    dispatch(addSchedule(item));
    setShowModal2(false);
  }

  console.log(info);
  return (
    <section className="mt-6 shadow p-4 mb-[39px] md:ms-[69px] md:me-[59px] mx-4 rounded-xl ">
      <ModalComponent
        open={showModal2}
        setOpen={setShowModal2}
        title="Set Workweek"
        width="100%"
      >
        <SetWorkWeek
          handleInfo={handleInfo}
          info={info}
          onClose={() => setShowModal2(false)}
          onCancel={() => setShowModal2(false)}
          onConfirm={handleConfirm}
        />
      </ModalComponent>
      <ModalComponent
        open={showModal}
        setOpen={setShowModal}
        title="Create project"
        width="50%"
      >
        <div className="bg-white border border-solid border-elboneyGray rounded-[4px] z-50">
          <div className="flex px-6 py-2.5 justify-between bg-mistyWhite">
            <TertiaryHeading
              title="Create project"
              className="text-graphiteGray"
            />
            <CloseOutlined
              className="cursor-pointer"
              width={24}
              height={24}
              onClick={() => setShowModal(false)}
            />
          </div>

          <div className="px-6 py-2.5 space-y-3">
            <InputComponent
              label="Project name"
              type="text"
              placeholder="Enter project name"
              name="invoiceName"
              field={{
                value: info.projectName,
                onChange: (e) => handleInfo('projectName', e.target.value),
              }}
            />
            <InputComponent
              label="Duration"
              name="duration"
              placeholder="Duration"
              type='number'
              field={{
                value: info.duration,
                onChange(e) {
                  handleInfo('duration', Number(e.target.value));
                },
                addonAfter: "Days",
                size: "large",
                className: "border-none"
              }}
            />

            <div className="flex justify-end py-2 space-x-2">
              <WhiteButton text="Cancel" className="!w-28" onClick={() => setShowModal2(false)} />
              <CustomButton
                text="Schedule"
                className="!w-28"
                onClick={handleSchedule}
              />
            </div>
          </div>
        </div>
      </ModalComponent>

      <div className="flex justify-between flex-wrap items-center md:flex-nowrap mb-2">
        <TertiaryHeading title="Schedule" className="text-graphiteGray" />
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

      <div className="mt-3">
        <Table
          loading={false}
          columns={columns}
          dataSource={schedules}
          pagination={{ position: ['bottomCenter'] }}
        />
      </div>
    </section>
  );
};

export default Schedule;
