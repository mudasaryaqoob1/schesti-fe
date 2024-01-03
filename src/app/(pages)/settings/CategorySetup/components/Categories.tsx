import { HttpService } from '@/app/services/base.service';
import { bg_style } from '@/globals/tailwindvariables'
import { selectToken } from '@/redux/authSlices/auth.selector';
import { selectSettingTargets, selectSettingTargetsLoading } from '@/redux/company/settingSlices/settingSelector';
import { Table } from 'antd'
import Image from 'next/image';
import React, { useCallback, useEffect, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux';
import type { ColumnsType } from 'antd/es/table';
import TertiaryHeading from '@/app/component/headings/tertiary';
import CustomButton from '@/app/component/customButton/button';

export interface DataType {
    categoryId: string;
    companyName: string;
    _id: string;
    action: string;
}

const Categories = () => {

    const token = useSelector(selectToken);

    const settingTargetsData = useSelector(selectSettingTargets);
    const settingTargetsLoading = useSelector(selectSettingTargetsLoading);

    useLayoutEffect(() => {
        if (token) {
            HttpService.setToken(token);
        }
    }, [token]);

    const fetchSettingTargetsHandler = useCallback(async () => {
        //   await dispatch(fetchSettingTargets({ page: 1, limit: 10 }));
    }, []);

    useEffect(() => {
        fetchSettingTargetsHandler();
    }, []);

    const columns: ColumnsType<DataType> = [
        {
            title: 'Category  ID',
            dataIndex: 'categoryId',
        },
        {
            title: 'Category  Name',
            dataIndex: 'companyName',
            ellipsis: true,
        },

        {
            title: 'Action',
            dataIndex: 'action',
            align: 'center',
            key: 'action',
            render: () => (
                <div className="flex gap-2 justify-center">
                    <Image
                        src="/trash.svg"
                        className="cursor-pointer"
                        width={20}
                        height={20}
                        alt="delete"
                    // onClick={() => dispatch(deleteSettingTarget(record._id))}
                    />
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
                </div>
            ),
        },
    ];

    return (
        <>
            <div className="flex items-center justify-between">
                <TertiaryHeading title="Category" className="text-graphiteGray" />
                <CustomButton
                    text="Add Category"
                    className="!w-auto "
                    icon="/plus.svg"
                    iconwidth={20}
                    iconheight={20}
                // onClick={() => setShowCreateModal(true)}
                />
            </div>
            <div
                className={`${bg_style} border border-solid border-silverGray mt-4`}
            >
                <Table
                    loading={settingTargetsLoading}
                    columns={columns}
                    dataSource={settingTargetsData}
                    pagination={{ position: ['bottomCenter'] }}
                />
            </div>
        </>
    )
}

export default Categories