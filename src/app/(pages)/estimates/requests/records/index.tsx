import React, { useCallback, useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Dropdown, Table } from 'antd';
import type { MenuProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import {
  selectEstimateRequests,
  selectEstimateRequestsLoading,
} from '@/redux/estimate/estimateRequestSelector';
import {
  deleteEstimateRequest,
  fetchEstimateRequests,
  changeEstimateStatus,
} from '@/redux/company/company.thunk';
import CustomButton from '@/app/component/customButton/button';
import TertiaryHeading from '@/app/component/headings/tertiary';
import Image from 'next/image';
import { IEstimateRequest } from '@/app/interfaces/estimateRequests/estimateRequests.interface';
import ModalComponent from '@/app/component/modal';
import { DeleteContent } from '@/app/component/delete/DeleteContent';
import NoDataComponent from '@/app/component/noData';
import { useRouterHook } from '@/app/hooks/useRouterHook';

interface DataType {
  key: React.Key;
  projectName: string;
  clientName: string;
  phone: string;
  salePerson: string;
  estimator: string;
  status: string;
  action: string;
}

const EstimateRequestTable: React.FC = () => {
  const router = useRouterHook();
  const dispatch = useDispatch<AppDispatch>();

  const [selectedEstimate, setSelecteEstimate] = useState<
    (IEstimateRequest & { _id: string }) | null
  >(null);
  const estimateRequestsLoading = useSelector(selectEstimateRequestsLoading);
  const estimateRequestsData = useSelector(selectEstimateRequests);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetachEstimateRequest = useCallback(async () => {
    await dispatch(fetchEstimateRequests({ page: 1, limit: 10 }));
  }, []);

  useEffect(() => {
    fetachEstimateRequest();
  }, []);

  const activeEstimateMenu: MenuProps['items'] = [
    {
      key: 'createEstimateRequest',
      label: <a href="#">Create Estimate</a>,
    },
    {
      key: 'editEstimateRequest',
      label: <a href="#">Edit Request</a>,
    },
    {
      key: 'inactiveState',
      label: <a href="#">In Active</a>,
    },
    {
      key: 'deleteEstimateRequest',
      label: <p>Delete</p>,
    },
  ];

  const inActiveEstimateMenu: MenuProps['items'] = [
    {
      key: 'editEstimateRequest',
      label: <a href="#">Edit Request</a>,
    },
    {
      key: 'activeState',
      label: <a href="#">Active</a>,
    },
    {
      key: 'deleteEstimateRequest',
      label: <p>Delete</p>,
    },
  ];

  const handleDropdownItemClick = async (key: string, estimateRequest: any) => {
    if (key == 'deleteEstimateRequest') {
      setShowDeleteModal(true);
      setSelecteEstimate(estimateRequest);
    } else if (key == 'editEstimateRequest') {
      router.push(`/estimates/requests/edit/${estimateRequest._id}`);
    } else if (key === 'createEstimateRequest') {
      router.push(
        `/estimates/generate/create?estimateId=${estimateRequest._id}`
      );
    } else if (key === 'inactiveState') {
      let statusBody = {
        status: false,
        estimateId: estimateRequest._id,
      };
      dispatch(changeEstimateStatus(statusBody));
      fetachEstimateRequest();
    } else if (key === 'activeState') {
      let statusBody = {
        status: true,
        estimateId: estimateRequest._id,
      };
      dispatch(changeEstimateStatus(statusBody));
      fetachEstimateRequest();
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
      render: (text, record: any) => (
        <a className="text-[#027A48] bg-[#ECFDF3] px-2 py-1 rounded-full capitalize">
          {record.status ? 'Active' : 'In Active'}
        </a>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      key: 'action',
      render: (text, record: any) => {
        if (record?.status) {
          return (
            <Dropdown
              menu={{
                items: activeEstimateMenu,
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
          );
        } else {
          return (
            <Dropdown
              menu={{
                items: inActiveEstimateMenu,
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
          );
        }
      },
    },
  ];

  console.log(estimateRequestsData, 'estimateRequestsData');


  return (
    <section className="mt-6 mx-4 p-5 rounded-xl grid items-center border border-solid border-silverGray shadow-secondaryTwist">
      {selectedEstimate ? (
        <ModalComponent
          open={showDeleteModal}
          setOpen={() => {
            setSelecteEstimate(null);
            setShowDeleteModal(false);
          }}
          destroyOnClose
        >
          <DeleteContent
            onClick={() => {
              dispatch(deleteEstimateRequest(selectedEstimate._id));
              setSelecteEstimate(null);
              setShowDeleteModal(false);
            }}
            onClose={() => setSelecteEstimate(null)}
          />
        </ModalComponent>
      ) : null}
      <div className="flex justify-between items-center">
        <TertiaryHeading
          title="My Estimate request"
          className="text-graphiteGray"
        />
        <CustomButton
          text="Start New Estimate "
          className="!w-auto "
          icon="/plus.svg"
          iconwidth={20}
          iconheight={20}
          onClick={() => router.push('/estimates/requests/create')}
        />
      </div>
      <div className="mt-4">
        {
          estimateRequestsData.length === 0 ? (
            <NoDataComponent title='No Data Found' description='Please create estimate request first to create an estimate' btnText='Create Estimate Request' isButton={true} link='/estimates/requests/create' />
          ) : (
            <Table
              loading={estimateRequestsLoading}
              columns={columns}
              dataSource={estimateRequestsData}
              pagination={{ position: ['bottomCenter'] }}
            />
          )
        }

      </div>
    </section>
  );
};

export default EstimateRequestTable;
