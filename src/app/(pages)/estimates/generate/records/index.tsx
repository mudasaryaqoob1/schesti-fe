import React, { useCallback, useEffect, useLayoutEffect , useState} from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Dropdown, Table } from 'antd';
import type { MenuProps } from 'antd';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { selectToken } from '@/redux/authSlices/auth.selector';
import { HttpService } from '@/app/services/base.service';
import NoData from '@/app/component/noData';
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

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);


  const [generatedEstimates, setGeneratedEstimates] = useState([])

  const fetchGeneratedEstiamtesHandler = useCallback(async () => {
    let result = await estimateRequestService.httpGetAllGeneratedEstimates(
      1,
      9
    );
    
    let updatedGeneratedEstimate = result?.data?.generatedEstiamtes.map((estimate : any) => {
      return {
        id : estimate._id,
        projectName : estimate.estimateRequestID.projectName,
        clientName : estimate.estimateRequestID.clientName,
        salePerson : `${estimate?.estimateRequestID.salePerson?.firstName} ${estimate?.estimateRequestID.salePerson?.lastName}`,
        estimator : `${estimate?.estimateRequestID.estimator?.firstName} ${estimate?.estimateRequestID.estimator?.lastName}`,
        totalCost : estimate.estimateRequestID.totalCost,
        estimateRequestId : estimate.estimateRequestID._id,
      }
    })
    setGeneratedEstimates(updatedGeneratedEstimate)
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
      key: 'deleteEstimate',
      label: <p>Delete</p>,
    },
  ];

  const handleDropdownItemClick = async (key: string, estimate: any) => {
    console.log(key ,estimate , 'estimateestimate' );
    
    if (key == 'viewDetail') {
      router.push(`/estimates/generate/${estimate.estimateRequestId}`);
    } else if (key == 'deleteEstimate') {
      let deleteEstimateResult = await estimateRequestService.httpDeleteGeneratedEstimate(estimate.estimateRequestId)
      if(deleteEstimateResult.statusCode === 200){
        fetchGeneratedEstiamtesHandler()
      }
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
  

  return generatedEstimates && generatedEstimates.length < 1 ? (
    <NoData
      btnText="Create new estimates request"
      link="/estimates/requests/create"
    />
  ) : (
    <section className="mt-6 mx-4 p-5 rounded-xl grid items-center border border-solid border-silverGray shadow-secondaryTwist">
      <div className="flex justify-between items-center">
        <TertiaryHeading
          title="Submitted Estimate"
          className="text-graphiteGray"
        />
      </div>
      <div className="mt-4">
        <Table
          columns={columns}
          dataSource={generatedEstimates}
          pagination={{ position: ['bottomCenter'] }}
        />
      </div>
    </section>
  );
};

export default EstimateRequestTable;
