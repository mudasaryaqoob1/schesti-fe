import React from 'react';
import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import Wrapper from '../style';

interface DataType {
  key: React.Key;
  ClientName: string;
  company: string;
  email: string;
  phoneNumber: string;
  address: string;
  status: string;
  Action: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Client Name',
    dataIndex: 'clientName',
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
    title: 'Company',
    dataIndex: 'company',
    // defaultSortOrder: 'descend',
    // sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Email',
    dataIndex: 'email',
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
    title: 'Phone number',
    dataIndex: 'phonenumber',
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
    title: 'Address',
    dataIndex: 'address',
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
    clientName: 'Kristin Watson',
    company: 'Tech',
    email: 'georgia.young@example.com',
    phonenumber: '(684) 555-0102',
    address: '2972 Westheimer Rd. Santa Ana, Illinois 85486 ',
    status: 'Active',
    action: 'icon',
  },
  {
    key: '2',
    clientName: 'Kristin Watson',
    company: 'Tech',
    email: 'georgia.young@example.com',
    phonenumber: '(684) 555-0102',
    address: '2972 Westheimer Rd. Santa Ana, Illinois 85486 ',
    status: 'Active',
    action: 'icon',
  },
  {
    key: '3',
    clientName: 'Kristin Watson',
    company: 'Tech',
    email: 'georgia.young@example.com',
    phonenumber: '(684) 555-0102',
    address: '2972 Westheimer Rd. Santa Ana, Illinois 85486 ',
    status: 'Active',
    action: 'icon',
  },
  {
    key: '4',
    clientName: 'Kristin Watson',
    company: 'Tech',
    email: 'georgia.young@example.com',
    phonenumber: '(684) 555-0102',
    address: '2972 Westheimer Rd. Santa Ana, Illinois 85486 ',
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
