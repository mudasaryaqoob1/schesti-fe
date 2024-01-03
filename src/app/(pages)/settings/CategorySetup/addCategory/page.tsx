'use client';

import { HttpService } from '@/app/services/base.service';
import { bg_style } from '@/globals/tailwindvariables'
import { selectToken } from '@/redux/authSlices/auth.selector';
import { selectSettingTargets, selectSettingTargetsLoading } from '@/redux/company/settingSlices/settingSelector';
import { Table } from 'antd'
import Image from 'next/image';
import React, { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux';
import type { ColumnsType } from 'antd/es/table';
import TertiaryHeading from '@/app/component/headings/tertiary';
import CustomButton from '@/app/component/customButton/button';
import SettingSidebar from '../../verticleBar';
import * as Yup from 'yup';
import FormikController from '@/app/component/formControl';
import { Form, Formik } from 'formik';

export interface DataType {
    categoryId: string;
    companyName: string;
    _id: string;
    action: string;
}
const validationSchema = Yup.object({
    categoryName: Yup.string().required('Category Name is required!'),
});
const initialValues = {
    categoryName: ''
};

const AddCategory = () => {

    const token = useSelector(selectToken);

    const settingTargetsData = useSelector(selectSettingTargets);
    const settingTargetsLoading = useSelector(selectSettingTargetsLoading);

    useLayoutEffect(() => {
        if (token) {
            HttpService.setToken(token);
        }
    }, [token]);

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
                    />
                    <Image
                        src="/edit.svg"
                        className="cursor-pointer"
                        width={20}
                        height={20}
                        alt="edit"
                    />
                </div>
            ),
        },
    ];

    const submitHandler = async (

    ) => {

    }

    return (
        <SettingSidebar>
            <section className={`${bg_style} p-5`}>
                <div className={`${bg_style} p-5`}>
                    <TertiaryHeading title="Category" className="text-graphiteGray" />
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={submitHandler}
                    >
                        {({ handleSubmit }) => {
                            return (
                                <Form
                                    name="basic"
                                    onSubmit={handleSubmit}
                                    autoComplete="off"
                                    className="mt-2"
                                >
                                    <FormikController
                                        control="input"
                                        label="Catgory Name"
                                        type="text"
                                        name="categoryName"
                                        placeholder="Enter Name"
                                    />
                                    <div className="flex justify-end mt-5">
                                        <CustomButton
                                            text="Add Category"
                                            className="!w-auto "
                                            iconwidth={20}
                                            iconheight={20}
                                        />
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
                <div
                    className={`${bg_style} border border-solid border-silverGray mt-4 p-5`}
                >
                    <TertiaryHeading title="Added Categories" className="text-graphiteGray" />
                    <Table
                        loading={settingTargetsLoading}
                        columns={columns}
                        className='mt-4'
                        dataSource={settingTargetsData}
                        pagination={{ position: ['bottomCenter'] }}
                    />
                </div>
            </section>
        </SettingSidebar>
    )
}

export default AddCategory