import React, { useCallback, useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Dropdown, Table } from 'antd';
import type { MenuProps } from 'antd';
// import NoData from '@/app/component/noData';
import TertiaryHeading from '@/app/component/headings/tertiary';
import Image from 'next/image';
import { estimateRequestService } from '@/app/services/estimates.service';
import NoDataComponent from '@/app/component/noData';
import { useRouterHook } from '@/app/hooks/useRouterHook';

interface DataType {
  key: React.Key;
  projectName: string;
  clientName: string;
  salePerson: string;
  estimator: string;
  totalCost: string;
  action: string;
}

const EstimateRequestTable: React.FC = () => {
  const router = useRouterHook();
  const [loading, setLoading] = useState(true);

  const [generatedEstimates, setGeneratedEstimates] = useState<[] | null>(null);

  const fetchGeneratedEstiamtesHandler = useCallback(async () => {
    setLoading(true);
    let result = await estimateRequestService.httpGetAllGeneratedEstimates(
      1,
      9
    );
    let updatedGeneratedEstimate = result?.data?.generatedEstimates.map(
      (estimate: any) => {
        return {
          _id: estimate?._id,
          projectName: estimate?.estimateRequestIdDetail?.projectName,
          clientName: estimate?.estimateRequestIdDetail?.clientName,
          salePerson: `${estimate?.estimateRequestIdDetail?.salePerson?.firstName ?? ''
            } ${estimate?.estimateRequestIdDetail?.salePerson?.lastName ?? ''}`,
          estimator: `${estimate?.estimateRequestIdDetail?.estimator?.firstName ?? ''
            } ${estimate?.estimateRequestIdDetail?.estimator?.lastName ?? ''}`,
          totalCost: estimate?.totalCost,
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
      key: 'deleteEstimate',
      label: <p>Delete</p>,
    },
  ];

  const handleDropdownItemClick = async (key: string, estimate: any) => {
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
    }
    else if (key == 'createInvoice') {
      router.push(`/financial/aia-invoicing`)
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
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    // },
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
      {
        generatedEstimates && generatedEstimates.length === 0 ? (
          <NoDataComponent title='No Data Found' description='Please create estimate request first to create an estimate' btnText='Create Estimate Request' isButton={true} link='/estimates/requests/create' />
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
        )
      }

      {/**) : (
        <NoData
          btnText="Add Request"
          title="Create Estimate Request"
          description="There is not any record yet . To get started, Create an estimate request by clicking the button below and sharing details about your project."
          link="/estimates/requests/create"
        />
      )} */}
    </section>
  );
};

export default EstimateRequestTable;
