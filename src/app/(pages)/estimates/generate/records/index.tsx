import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Dropdown, Table } from 'antd';
import type { MenuProps } from 'antd';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { selectToken } from '@/redux/authSlices/auth.selector';
import { HttpService } from '@/app/services/base.service';
// import NoData from '@/app/component/noData';
import TertiaryHeading from '@/app/component/headings/tertiary';
import Image from 'next/image';
import { estimateRequestService } from '@/app/services/estimates.service';

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
  const token = useSelector(selectToken);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  const [generatedEstimates, setGeneratedEstimates] = useState([]);

  const fetchGeneratedEstiamtesHandler = useCallback(async () => {
    setLoading(true);
    let result = await estimateRequestService.httpGetAllGeneratedEstimates(
      1,
      9
    );
    let updatedGeneratedEstimate = result?.data?.generatedEstiamtes.map(
      (estimate: any) => {
        return {
          _id: estimate?._id,
          projectName: estimate?.estimateRequestIdDetail?.projectName,
          clientName: estimate?.estimateRequestIdDetail?.clientName,
          salePerson: `${estimate?.estimateRequestIdDetail?.salePerson?.firstName} ${estimate?.estimateRequestIdDetail?.salePerson?.lastName}`,
          estimator: `${estimate?.estimateRequestIdDetail?.estimator?.firstName} ${estimate?.estimateRequestIdDetail?.estimator?.lastName}`,
          totalCost: estimate?.totalCost,
          status: estimate?.status,
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
      label: 'View Detail',
    },
    {
      key: 'createSchedule',
      label: 'Create Schedule',
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
      router.push(`/schedule/estimate/${estimate._id}`);
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
            dataSource={generatedEstimates}
            pagination={{ position: ['bottomCenter'] }}
          />
        </div>
      </>
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
