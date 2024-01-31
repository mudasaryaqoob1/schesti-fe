import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Dropdown, Table } from 'antd';
import type { MenuProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { AppDispatch } from '@/redux/store';
import { selectToken } from '@/redux/authSlices/auth.selector';
import { HttpService } from '@/app/services/base.service';
import {
  selectEstimateRequests,
  selectEstimateRequestsLoading,
} from '@/redux/estimate/estimateRequestSelector';
import {
  deleteEstimateRequest,
  fetchEstimateRequests,
} from '@/redux/company/company.thunk';
import NoData from '@/app/component/noData';
import CustomButton from '@/app/component/customButton/button';
import TertiaryHeading from '@/app/component/headings/tertiary';
import Image from 'next/image';

interface DataType {
  key: React.Key;
  ProjectName: string;
  ClientName: string;
  Number: string;
  SalePerson: string;
  Estimator: string;
  Status: string;
  Action: string;
}

const EstimateRequestTable: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(selectToken);

  const estimateRequestsLoading = useSelector(selectEstimateRequestsLoading);
  const estimateRequestsData = useSelector(selectEstimateRequests);

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  const memoizedSetPerson = useCallback(async () => {
    await dispatch(fetchEstimateRequests({ page: 1, limit: 10 }));
  }, []);

  useEffect(() => {
    memoizedSetPerson();
  }, []);

  const items: MenuProps['items'] = [
    {
      key: 'createEstimateRequest',
      label: <a href="#">Create Estimate</a>,
    },
    {
      key: 'editEstimateRequest',
      label: <a href="#">Edit Request</a>,
    },
    {
      key: 'deleteEstimateRequest',
      label: <p>Delete</p>,
    },
  ];

  const handleDropdownItemClick = async (key: string, estimateRequest: any) => {
    if (key == 'deleteEstimateRequest') {
      await dispatch(deleteEstimateRequest(estimateRequest._id));
    } else if (key == 'editEstimateRequest') {
      router.push(`/estimates/requests/edit/${estimateRequest._id}`);
    } else if (key === 'createEstimateRequest') {
      router.push(
        `/estimates/generate/create?estimateId=${estimateRequest._id}`
      );
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Project Name',
      dataIndex: 'projectName',
    },
    {
      title: 'Client Name',
      dataIndex: 'clientName',
      ellipsis: true,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
    },

    {
      title: 'Sale Person ',
      dataIndex: 'salePerson',
      render: (text, record: any) =>
        `${record?.salePerson?.firstName} ${record?.salePerson?.lastName}`,
    },
    {
      title: 'Estimator',
      dataIndex: 'estimator',
      render: (text, record: any) =>
        `${record?.estimator?.firstName} ${record?.estimator?.lastName}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: () => (
        <a className="text-[#027A48] bg-[#ECFDF3] px-2 py-1 rounded-full">
          Active
        </a>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      key: 'action',
      render: (text, record) => (
        <Dropdown
          menu={{
            items,
            onClick: (event) => {
              const { key } = event;
              handleDropdownItemClick(key, record);
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

  return estimateRequestsData && estimateRequestsData.length < 1 ? (
    <NoData
      btnText="Add Request"
      link="/estimates/requests/create"
      title="Create New Estimate Request"
      description="There is not any record yet . To get started, Create an estimate request by clicking the button below and sharing details about your project."
    />
  ) : (
    <section className="mt-6 mx-4 p-5 rounded-xl grid items-center border border-solid border-silverGray shadow-secondaryTwist">
      <div className="flex justify-between items-center">
        <TertiaryHeading
          title="My Estimate request"
          className="text-graphiteGray"
        />
        <CustomButton
          text="Start New Estimate "
          className="!w-auto "
          icon="plus.svg"
          iconwidth={20}
          iconheight={20}
          onClick={() => router.push('/estimates/requests/create')}
        />
      </div>
      <div className="mt-4">
        <Table
          loading={estimateRequestsLoading}
          columns={columns}
          dataSource={estimateRequestsData}
          pagination={{ position: ['bottomCenter'] }}
        />
      </div>
    </section>
  );
};

export default EstimateRequestTable;
