import React, { useEffect, useMemo } from 'react';
import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { AppDispatch } from '@/redux/store';
import { selectTakeoffSummaries } from '@/redux/takeoffSummaries/takeoffSummaries.Selector';
import {
  deleteSummaries,
  fetchTakeoffSummaries,
} from '@/redux/takeoffSummaries/takeoffSummaries.thunk';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { NextRouter, useRouter } from 'next/router';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
// Import your API service

interface DataType {
  key: React.Key;
  name: string; // Changed to match column dataIndex
  scope: string;
  createdAt: string; // Assuming date is returned as a string
  action: string; // Define how you plan to render actions
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Project Name',
    dataIndex: 'name',
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
    dataIndex: 'scope',
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
    dataIndex: 'createdAt',
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
export interface ITableProps {handleEditClick:(item:any)=>void}
const Index: React.FC<ITableProps> = ({handleEditClick}:ITableProps) => {
  // const router = useRouter()
  const dispatch = useDispatch<AppDispatch>();
  const summaries = useSelector(selectTakeoffSummaries);

  useEffect(() => {
    dispatch(fetchTakeoffSummaries({ page: 1, limit: 10 }));
  }, []); // Empty dependency array means this effect runs once on mount

  const formattedData = useMemo(() => {
    return summaries?.map(
      (item: {
        _id: any;
        name: any;
        url: string;
        scope: { toString: () => any };
        createdAt: string;
      }) => ({
        key: item._id, // Assume each item has a unique id
        name: item.name,
        scope: item.scope.toString(), // Ensure scope is a string
        createdAt: moment(item.createdAt).format('YYYY-MM-DD'),
        action: (
          <span className="flex flex-col space-y-2">
            <button
              id="editBtn"
              onClick={() =>{handleEditClick(item)}}
              className="cursor-pointer"
            >
              Edit
            </button>
            <button
              id="downloadPdfBtn"
              onClick={() => downloadPdfFromS3(item.url)}
              className="cursor-pointer"
            >
              Download PDF
            </button>
            <button
              id="deletePdfBtn"
              onClick={() => dispatch(deleteSummaries(item._id))}
              className="cursor-pointer"
            >
              Delete
            </button>
          </span>
        ),
      })
    );
  }, [summaries]);

  const onChange: TableProps<DataType>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div className="mt-4">
      <Table columns={columns} dataSource={formattedData} onChange={onChange} />
    </div>
  );
};

export default Index;

function downloadPdfFromS3(pdfBlobUrl: string, fileName = 'downloaded.pdf') {
  console.warn('pdfBlobUrl', pdfBlobUrl);

  // Fetch the PDF blob using the Fetch API
  fetch(pdfBlobUrl)
    .then((response) => {
      if (response.ok) return response.blob();
      throw new Error('Network response was not ok.');
    })
    .then((blob) => {
      // Create a local URL for the blob
      const blobUrl = window.URL.createObjectURL(blob);

      // Create a temporary link element and trigger the download
      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();

      // Clean up by removing the temporary link element and revoking the blob URL
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    })
    .catch((error) => console.error('Error downloading the PDF:', error));
}
