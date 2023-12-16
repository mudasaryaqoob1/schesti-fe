import React from 'react';
import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import Wrapper from '../style';

interface DataType {
  key: React.Key;
  ProjectName: string;
  ClientName: string;
  Number: string;
  City: string;
  SalePerson: string;
  Estimator: string;
  Status: string;
  Action: string;
}

const columns: ColumnsType<DataType> = [
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
    title: 'Number',
    dataIndex: 'number',
  },
  {
    title: 'City',
    dataIndex: 'city',
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
    projectName: 'Abdul Building ',
    clientName: 'Kristin Watson',
    number: '7+78787878',
    city: 'Cario',
    salePerson: 'Ahmad Algabar',
    estimator: 'Ahmad Algabar',
    status: 'Active',
    action: 'icon',
  },
  {
    key: '1',
    projectName: 'Abdul Building ',
    clientName: 'Kristin Watson',
    number: '7+78787878',
    city: 'Cario',

    salePerson: 'Ahmad Algabar',
    estimator: 'Ahmad Algabar',
    status: 'Active',
    action: 'icon',
  },
  {
    key: '1',
    projectName: 'Abdul Building ',
    clientName: 'Kristin Watson',
    number: '7+78787878',
    city: 'Cario',

    salePerson: 'Ahmad Algabar',
    estimator: 'Ahmad Algabar',
    status: 'Active',
    action: 'icon',
  },
  {
    key: '1',
    projectName: 'Abdul Building ',
    clientName: 'Kristin Watson',
    number: '7+78787878',
    city: 'Cario',
    salePerson: 'Ahmad Algabar',
    estimator: 'Ahmad Algabar',
    status: 'Active',
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
