'use client';

import React, { useLayoutEffect } from 'react'
import { Form, Formik } from 'formik';
import { Table } from 'antd'
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectSettingTargets, selectSettingTargetsLoading } from '@/redux/company/settingSlices/settingSelector';
import { HttpService } from '@/app/services/base.service';
import { bg_style } from '@/globals/tailwindvariables'
import { selectToken } from '@/redux/authSlices/auth.selector';
import type { ColumnsType } from 'antd/es/table';
import TertiaryHeading from '@/app/component/headings/tertiary';
import CustomButton from '@/app/component/customButton/button';
import SettingSidebar from '../../verticleBar';
import * as Yup from 'yup';
import FormControl from '@/app/component/formControl';

export interface DataType {
    categoryId: string;
    companyName: string;
    _id: string;
    action: string;
}
const validationSchema = Yup.object({
    categoryName: Yup.string().required('Category Name is required!'),
    subCategory: Yup.string().required('Sub Category is required!'),
    price: Yup.string().required('Price is required!'),
});
const initialValues = {
    categoryName: '',
    subCategory: '',
    price: ''
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

    const submitHandler = async (

    ) => {

    }

    return (
        <SettingSidebar>
            <section className={`${bg_style} p-5`}>
                <div className={`${bg_style} p-5`}>
                    <TertiaryHeading title="Sub-Category" className="text-graphiteGray" />
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
                                    <div className="grid grid-cols-3 gap-2 items-center">
                                        <FormControl
                                            control="select"
                                            label="Catgory Name"
                                            type="text"
                                            name="categoryName"
                                            placeholder="Enter Name"
                                        />
                                        <FormControl
                                            control="input"
                                            label="Sub-Catgory"
                                            type="text"
                                            name="subCategory"
                                            placeholder="Enter Sub-Category"
                                        />
                                        <FormControl
                                            control="input"
                                            label="Price"
                                            type="number"
                                            name="price"
                                            placeholder="Enter Price"
                                        />
                                    </div>
                                    <div className="flex justify-end mt-5">
                                        <CustomButton
                                            text="Add SubCategory"
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
                    <TertiaryHeading title="Added SubCategories" className="text-graphiteGray" />
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