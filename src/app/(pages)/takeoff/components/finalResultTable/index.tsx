import React from 'react';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';

interface DataType {
  key: React.Key;
  project_name: string;
  page_label: string;
  comment: string;
  author: string;
  date: string;
  status: string;
  color: string;
  layer: string;
  space: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Project name',
    dataIndex: 'project_name',
  },
  {
    title: 'Page Label',
    dataIndex: 'page_label',
  },
  {
    title: 'Comment',
    dataIndex: 'comment',
  },
  {
    title: 'Author',
    dataIndex: 'author',
  },
  {
    title: 'Date',
    dataIndex: 'date',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Color',
    dataIndex: 'color',
  },
  {
    title: 'Layer',
    dataIndex: 'layer',
  },
  {
    title: 'Space',
    dataIndex: 'space',
  },
];

const data: DataType[] = [
  {
    key: '1',
    project_name: 'Length Measurement',
    page_label: '01',
    comment: '202-8 1/4',
    author: 'John Doe',
    date: '15 May 2020 8:00 am',
    status: '----',
    color: '----',
    layer: '----',
    space: '----',
  },
];

const FinalData = () => {
  return (
    <div className="py-2">
      <Table columns={columns} dataSource={data} size="small" />
    </div>
  );
};

export default FinalData;
