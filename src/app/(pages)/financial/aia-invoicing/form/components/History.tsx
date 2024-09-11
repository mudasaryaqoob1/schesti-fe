import { InputComponent } from '@/app/component/customInput/Input';
import PrimaryHeading from '@/app/component/headings/primary';
import { Table } from 'antd';
import { type ColumnsType } from 'antd/es/table';
import Image from 'next/image';

export function AIAHistory() {
  const columns: ColumnsType = [
    {
      title: 'Invoice #',
      dataIndex: 'applicationNo',
    },
    {
      title: 'Invoice Name',
      dataIndex: 'invoiceName',
      ellipsis: true,
      width: 300,
    },
    {
      title: 'Owner',
      dataIndex: 'toOwner',
    },
    {
      title: 'Project Name',
      dataIndex: 'project',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Distributed To',
      dataIndex: 'distributionTo',
      render: (value) => value?.toUpperCase(),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      key: 'action',
    },
  ];

  return (
    <div className="p-5 space-y-5 shadow-md rounded-lg border border-silverGray  bg-white">
      <div className="flex justify-between items-center">
        <PrimaryHeading title="Invoice History" className="text-[18px]" />

        <InputComponent
          label=""
          name=""
          type="text"
          placeholder="Search Invoice History"
          prefix={
            <Image
              alt="search icon"
              src={'/search.svg'}
              width={20}
              height={20}
            />
          }
        />
      </div>

      <div>
        <Table columns={columns} />
      </div>
    </div>
  );
}
