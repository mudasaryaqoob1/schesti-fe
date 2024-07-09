import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import type { MenuProps } from 'antd';
import { Dropdown, Table, Drawer } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import NoDataComponent from '@/app/component/noData';
import { useRouterHook } from '@/app/hooks/useRouterHook';
import ChangeStatus from '../components/changeStatus';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { estimateRequestService } from '@/app/services/estimates.service';

interface DataType {
  key: React.Key;
  projectName: string;
  clientName: string;
  salePerson: string;
  estimator: string;
  totalCost: string;
  status: string;
  action: string;
}

const items: MenuProps['items'] = [
  {
    key: 'viewDetail',
    label: 'View Estimate',
  },
  {
    key: 'createSchedule',
    label: 'Create Schedule',
  },
  {
    key: 'createInvoice',
    label: 'Create Invoice',
  },
  {
    key: 'email',
    label: 'Email',
  },
  {
    key: 'changeStatus',
    label: 'Change Status',
  },
  {
    key: 'deleteEstimate',
    label: <p>Delete</p>,
  },
];

const EstimateRequestTable: React.FC = () => {
  const router = useRouterHook();
  const [loading, setLoading] = useState(true);

  const [generatedEstimates, setGeneratedEstimates] = useState<[] | null>(null);
  const [changeStatusDrawer, setChangeStatusDrawer] = useState(false);
  const [estimateDetail, setEstimateDetail] = useState();

  const fetchGeneratedEstiamtesHandler = useCallback(async () => {
    setLoading(true);
    let result = await estimateRequestService.httpGetAllGeneratedEstimates(
      1,
      9
    );
    let updatedGeneratedEstimate = result?.data?.generatedEstimates.map(
      (estimate: any) => {
        return {
          ...estimate,
          projectName: estimate?.estimateRequestIdDetail?.projectName,
          clientName: estimate?.estimateRequestIdDetail?.clientName,
          salePerson: `${
            estimate?.estimateRequestIdDetail?.salePerson?.firstName ?? ''
          } ${estimate?.estimateRequestIdDetail?.salePerson?.lastName ?? ''}`,
          estimator: `${
            estimate?.estimateRequestIdDetail?.estimator?.firstName ?? ''
          } ${estimate?.estimateRequestIdDetail?.estimator?.lastName ?? ''}`,
          estimateRequestIdDetail: estimate.estimateRequestIdDetail?._id,
        };
      }
    );
    setGeneratedEstimates(updatedGeneratedEstimate);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchGeneratedEstiamtesHandler();
  }, []);

  const handleDropdownItemClick = async (key: string, estimate: any) => {
    setEstimateDetail(estimate);

    if (key == 'viewDetail') {
      router.push(`/estimates/generate/${estimate._id}`);
    } else if (key == 'deleteEstimate') {
      let deleteEstimateResult =
        await estimateRequestService.httpDeleteGeneratedEstimate(estimate._id);
      if (deleteEstimateResult.statusCode === 200) {
        fetchGeneratedEstiamtesHandler();
      }
    } else if (key == 'createSchedule') {
      // router.push(`/schedule/estimate/${estimate._id}`);
    } else if (key == 'createInvoice') {
      router.push(`/financial/aia-invoicing`);
    } else if (key == 'changeStatus') {
      setEstimateDetail(estimate);
      setChangeStatusDrawer(true);
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
      title: 'Sale Person',
      dataIndex: 'salePerson',
    },

    {
      title: 'Estimator',
      dataIndex: 'estimator',
    },
    {
      title: 'Total Cost',
      dataIndex: 'totalCost',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text, record) => (
        <span className="capitalize text-emeraldGreen bg-schestiLightSuccess px-2 py-1 rounded-full">
          {record.status}
        </span>
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

  return (
    <section className="mt-6 mx-4 p-5 rounded-xl grid items-center border border-solid border-silverGray shadow-secondaryTwist">
      {generatedEstimates && generatedEstimates.length === 0 ? (
        <NoDataComponent
          title="No Data Found"
          description="Please create estimate request first to create an estimate"
          btnText="Create Estimate Request"
          isButton={true}
          link="/estimates/requests/create"
        />
      ) : (
        <>
          <div className="flex justify-between items-center">
            <TertiaryHeading
              title="Submitted Estimate"
              className="text-graphiteGray"
            />
          </div>
          <div className="mt-4">
            <Table
              loading={loading}
              columns={columns}
              dataSource={generatedEstimates || []}
              pagination={{ position: ['bottomCenter'] }}
            />
          </div>
        </>
      )}

      <Drawer
        open={changeStatusDrawer}
        onClose={() => setChangeStatusDrawer(false)}
        closable={false}
        title="Edit"
        extra={
          <Image
            src="/closeicon.svg"
            alt="close"
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={() => setChangeStatusDrawer(false)}
          />
        }
        width={400}
      >
        <ChangeStatus
          fetchEstimates={fetchGeneratedEstiamtesHandler}
          setChangeStatusDrawer={setChangeStatusDrawer}
          estimateDetail={estimateDetail}
        />
      </Drawer>
    </section>
  );
};

export default EstimateRequestTable;
