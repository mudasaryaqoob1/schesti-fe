import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Image from 'next/image';

interface DataType {
    key: React.ReactNode;
    category: string;
    subCategory: string;
    price: number;
    children?: DataType[];
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: 'Sub Category',
        dataIndex: 'subCategory',
        key: 'subCategory',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Action',
        dataIndex: 'action',
        align: 'center',
        key: 'action',
        render: () => (
            <div className="flex gap-2 justify-center">
                <Image
                    src="/edit.svg"
                    className="cursor-pointer"
                    width={20}
                    height={20}
                    alt="edit"
                    onClick={() => {
                        // setSelectedTarget(record);
                        //   setShowEditModal(true);
                    }}
                />
                <Image
                    src="/trash.svg"
                    className="cursor-pointer"
                    width={20}
                    height={20}
                    alt="delete"
                // onClick={() => dispatch(deleteSettingTarget(record._id))}
                />
            </div>
        ),
    },
];

const data: DataType[] = [
    {
        key: 1,
        category: 'John Brown sr.',
        subCategory: 'Sub Category 1',
        price: 60,
        children: [
            {
                key: 11,
                category: '',
                price: 43,
                subCategory: 'Sub Catgory 2',
            },
            {
                key: 12,
                category: '',
                price: 41,
                subCategory: 'Sub Catgory 3',
            },
            {
                key: 13,
                category: '',
                price: 40,
                subCategory: 'Sub Catgory 4',
            },

        ],
    },
];


const SubCategoryTable: React.FC = () => {

    return (
        <div className='w-full'>
            <Table
                columns={columns}
                dataSource={data}
            />
        </div>
    );
};

export default SubCategoryTable;