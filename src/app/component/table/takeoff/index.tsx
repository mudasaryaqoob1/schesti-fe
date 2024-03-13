import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { takeoffSummaryService } from '@/app/services/takeoffSummary.service';
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

const Index: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    // Define an async function to fetch your data
    const fetchData = async () => {
      try {
        // Call your API here; adjust parameters as needed
        const response =
          await takeoffSummaryService.httpGetAllTakeoffSummaries(/* userId, page, limit */);
        if (response && response.data) {
          // Map your data to match the DataType structure
          const formattedData = response.data.map(
            (
              item: {
                id: any;
                name: any;
                scope: { toString: () => any };
                createdAt: any;
              },
              index: any
            ) => ({
              key: item.id, // Assume each item has a unique id
              name: item.name,
              scope: item.scope.toString(), // Ensure scope is a string
              createdAt: item.createdAt,
              action: 'icon', // Replace with actual action logic
            })
          );
          setData(formattedData);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

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
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  );
};

export default Index;
