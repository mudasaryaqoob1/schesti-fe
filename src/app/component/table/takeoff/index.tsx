import React from 'react';
import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';

interface DataType {
  key: React.Key;
  Projectname: string;
  Totalscopeofwork: string;
  MeasurementsDate: string;
  Action: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Project Name',
    dataIndex: 'Projectname',
    // filters: [
    //   {
    //     text: 'London',
    //     value: 'London',
    //   },
    //   {
    //     text: 'New York',
    //     value: 'New York',
    //   },
    // ],
    // onFilter: (value: string, record) => record.address.indexOf(value) === 0,
  },
  {
    title: 'Total scope of work',
    dataIndex: 'Totalscopeofwork',
    // filters: [
    //   {
    //     text: 'London',
    //     value: 'London',
    //   },
    //   {
    //     text: 'New York',
    //     value: 'New York',
    //   },
    // ],
    // onFilter: (value: string, record) => record.address.indexOf(value) === 0,
  },
  {
    title: 'Measurements Date',
    dataIndex: 'MeasurementsDate',
    // filters: [
    //   {
    //     text: 'London',
    //     value: 'London',
    //   },
    //   {
    //     text: 'New York',
    //     value: 'New York',
    //   },
    // ],
    // onFilter: (value: string, record) => record.address.indexOf(value) === 0,
  },
  {
    title: 'Action',
    dataIndex: 'action',
    // filters: [
    //   {
    //     text: 'London',
    //     value: 'London',
    //   },
    //   {
    //     text: 'New York',
    //     value: 'New York',
    //   },
    // ],
    // onFilter: (value: string, record) => record.address.indexOf(value) === 0,
  },
];

const data: any = [
  {
    key: '1',
    Projectname: 'Kristin Watson',
    Totalscopeofwork: '5 subject',
    MeasurementsDate: '12 May 2023, 8:30 ',
    action: 'icon',
  },
  {
    key: '2',
    Projectname: 'Kristin Watson',
    Totalscopeofwork: '5 subject',
    MeasurementsDate: '12 May 2023, 8:30 ',
    action: 'icon',
  },
  {
    key: '3',
    Projectname: 'Kristin Watson',
    Totalscopeofwork: '5 subject',
    MeasurementsDate: '12 May 2023, 8:30 ',
    action: 'icon',
  },
  {
    key: '4',
    Projectname: 'Kristin Watson',
    Totalscopeofwork: '5 subject',
    MeasurementsDate: '12 May 2023, 8:30 ',
    action: 'icon',
  },
];

const onChange: TableProps<DataType>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log('params', pagination, filters, sorter, extra);
};

const index: React.FC = () => {
  return (
    <div className="mt-4">
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  );
};

export default index;
