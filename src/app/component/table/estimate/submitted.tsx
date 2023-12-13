import React from 'react';
import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import Wrapper from '../style';

interface DataType {
  key: React.Key;
  'Estimate#': string;
  ProjectName: string;
  ClientName: string;
  SalePerson: string;
  Estimator: string;
  TotalCost: string;
  Status: string;
  Action: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Estimate#',
    dataIndex: 'estimate#',
    // filters: [
    //   {
    //     text: 'Joe',
    //     value: 'Joe',
    //   },
    //   {
    //     text: 'Jim',
    //     value: 'Jim',
    //   },
    //   {
    //     text: 'Submenu',
    //     value: 'Submenu',
    //     children: [
    //       {
    //         text: 'Green',
    //         value: 'Green',
    //       },
    //       {
    //         text: 'Black',
    //         value: 'Black',
    //       },
    //     ],
    //   },
    // ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    // onFilter: (value: string, record) => record.name.indexOf(value) === 0,
    // sorter: (a, b) => a.name.length - b.name.length,
    // sortDirections: ['descend'],
  },
  {
    title: 'Project Name',
    dataIndex: 'projectName',
    // filters: [
    //   {
    //     text: 'Joe',
    //     value: 'Joe',
    //   },
    //   {
    //     text: 'Jim',
    //     value: 'Jim',
    //   },
    //   {
    //     text: 'Submenu',
    //     value: 'Submenu',
    //     children: [
    //       {
    //         text: 'Green',
    //         value: 'Green',
    //       },
    //       {
    //         text: 'Black',
    //         value: 'Black',
    //       },
    //     ],
    //   },
    // ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    // onFilter: (value: string, record) => record.name.indexOf(value) === 0,
    // sorter: (a, b) => a.name.length - b.name.length,
    // sortDirections: ['descend'],
  },
  {
    title: 'ClientName',
    dataIndex: 'clientName',
    // defaultSortOrder: 'descend',
    // sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'SalePerson',
    dataIndex: 'salePerson',
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
    title: 'Estimator',
    dataIndex: 'estimator',
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
    title: 'TotalCost',
    dataIndex: 'totalCost',
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
    title: 'Status',
    dataIndex: 'status',
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

const data = [
  {
    key: '1',
    'estimate#': 'FS23426',
    projectName: 'Abdul Building ',
    clientName: 'Kristin Watson',
    salePerson: 'Ahmad Algabar',
    estimator: 'Ahmad Algabar',
    totalCost: '$1700',
    status: 'Accepted',
    action: 'icon',
  },
  {
    key: '1',
    'estimate#': 'FS23426',
    projectName: 'Abdul Building ',
    clientName: 'Kristin Watson',
    salePerson: 'Ahmad Algabar',
    estimator: 'Ahmad Algabar',
    totalCost: '$1700',
    status: 'Accepted',
    action: 'icon',
  },
  {
    key: '1',
    'estimate#': 'FS23426',
    projectName: 'Abdul Building ',
    clientName: 'Kristin Watson',
    salePerson: 'Ahmad Algabar',
    estimator: 'Ahmad Algabar',
    totalCost: '$1700',
    status: 'Accepted',
    action: 'icon',
  },
  {
    key: '1',
    'estimate#': 'FS23426',
    projectName: 'Abdul Building ',
    clientName: 'Kristin Watson',
    salePerson: 'Ahmad Algabar',
    estimator: 'Ahmad Algabar',
    totalCost: '$1700',
    status: 'Accepted',
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
    <Wrapper className="mt-4">
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </Wrapper>
  );
};

export default index;
