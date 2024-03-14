'use client';
import React, { useLayoutEffect, useState } from 'react';
import moment from 'moment';
import Image from 'next/image';
import { Formik, Form } from 'formik';
import { Dropdown, type MenuProps, Table, Tag } from 'antd';
import { type ColumnsType } from 'antd/es/table';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import * as Yup from 'yup';

// module imports
import CustomButton from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import { InputComponent } from '@/app/component/customInput/Input';
import TertiaryHeading from '@/app/component/headings/tertiary';
import ModalComponent from '@/app/component/modal';
import { HttpService } from '@/app/services/base.service';
import { selectToken } from '@/redux/authSlices/auth.selector';
import { SetWorkWeek } from './components/SetWorkWeek';
import { IProject } from '@/app/interfaces/schedule/project.schedule.interface';
import { ISchedule } from '@/app/interfaces/schedule/schedule.type';
import { addSchedule } from '@/redux/schedule/schedule.slice';
import FormControl from '@/app/component/formControl';
import withAuth from '@/app/hoc/with_auth';

const initialValues: IProject = {
  projectName: '',
  duration: 1,
  hoursPerDay: 0,
  regularWorkingDays: [
    {
      day: 'Monday',
      isChecked: false,
      hours: 0,
    },
    {
      day: 'Tuesday',
      isChecked: false,
      hours: 0,
    },
    {
      day: 'Wednesday',
      isChecked: false,
      hours: 0,
    },
    {
      day: 'Thursday',
      isChecked: false,
      hours: 0,
    },
    {
      day: 'Friday',
      isChecked: false,
      hours: 0,
    },
    {
      day: 'Saturday',
      isChecked: false,
      hours: 0,
    },
    {
      day: 'Sunday',
      isChecked: false,
      hours: 0,
    },
  ],
};

const createProjectSchema = Yup.object({
  projectName: Yup.string().required('Project Name is required!'),
  duration: Yup.number()
    .required('Duration is required')
    .min(1, 'Minimum one day is required'),
});

const Schedule = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const token = useSelector(selectToken);
  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  const [createProjectModal, setCreateProjectModal] = useState(false);
  const [worksheetModal, setWorksheetModal] = useState(false);
  const [projectDetail, setProjectDetail] = useState<IProject>();

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
      render(_value) {
        if (_value === 'active') {
          return (
            <Tag color="green" className="rounded-full capitalize">
              {_value}
            </Tag>
          );
        } else if (_value === 'pending') {
          return (
            <Tag color="red" className="rounded-full capitalize">
              {_value}
            </Tag>
          );
        } else {
          return (
            <Tag color="blue" className="rounded-full capitalize">
              {_value}
            </Tag>
          );
        }
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      key: 'action',
      render: (_value, record) => (
        <Dropdown
          menu={{
            items,
            onClick: (e) => {
              handleMenuItemClick(e.key, record);
            },
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

  function handleMenuItemClick(key: string, record: ISchedule) {
    if (key === 'schedule') {
      router.push(`/schedule/${record._id}`);
    }
  }

  function handleConfirm(item: IProject) {
    let finalObject: any = {
      projectName: projectDetail?.projectName,
      duration: projectDetail?.duration,
      hoursPerDay: item.hoursPerDay,
      regularWorkingDays: item.regularWorkingDays,
    };

    dispatch(addSchedule(finalObject));
    setWorksheetModal(false);
    router.push(`/schedule/${1}`);
  }

  const submitHandler = (values: any) => {
    setProjectDetail(values);
    setCreateProjectModal(false);
    setWorksheetModal(true);
  };

  return (
    <section className="mt-6 shadow p-4 mb-[39px] md:ms-[69px] md:me-[59px] mx-4 rounded-xl ">
      <ModalComponent
        open={worksheetModal}
        setOpen={setWorksheetModal}
        title="Set Workweek"
        width="100%"
      >
        <SetWorkWeek
          initialValues={initialValues}
          onClose={() => setWorksheetModal(false)}
          onCancel={() => setWorksheetModal(false)}
          onConfirm={handleConfirm}
        />
      </ModalComponent>
      <ModalComponent
        open={createProjectModal}
        setOpen={setCreateProjectModal}
        title="Create project"
        width="50%"
      >
        <div className="bg-white border border-solid border-elboneyGray rounded-[4px] z-50">
          <div className="flex px-6 py-2.5 justify-between bg-mistyWhite">
            <TertiaryHeading
              title="Create Project"
              className="text-graphiteGray"
            />
            <CloseOutlined
              className="cursor-pointer"
              width={24}
              height={24}
              onClick={() => setCreateProjectModal(false)}
            />
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={createProjectSchema}
            onSubmit={submitHandler}
          >
            {({ handleSubmit, setFieldValue }) => {
              return (
                <Form name="basic" autoComplete="off" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-3 p-4">
                    <FormControl
                      control="input"
                      label="Project Name"
                      type="text"
                      name="projectName"
                      placeholder="Project Name"
                    />
                    <FormControl
                      control="input"
                      label="Duration"
                      type="number"
                      name="duration"
                      placeholder="Duration"
                    />
                    <div className="space-y-3">
                      <div className="flex justify-end py-2 space-x-2">
                        <WhiteButton
                          text="Cancel"
                          className="!w-28"
                          onClick={() => {
                            setCreateProjectModal(false);
                            setFieldValue('projectName', '');
                            setFieldValue('duration', 1);
                          }}
                        />
                        <CustomButton
                          text="Schedule"
                          className="!w-28"
                          type="submit"
                        />
                      </div>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
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
            onClick={() => setCreateProjectModal(true)}
          />
        </div>
      </div>

      <div className="mt-3">
        <Table
          loading={false}
          columns={columns}
          dataSource={[]}
          pagination={{ position: ['bottomCenter'] }}
        />
      </div>
    </section>
  );
};

export default withAuth(Schedule);
