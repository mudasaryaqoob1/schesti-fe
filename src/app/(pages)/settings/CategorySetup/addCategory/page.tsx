'use client';

import React from 'react'
import { bg_style } from '@/globals/tailwindvariables'
import TertiaryHeading from '@/app/component/headings/tertiary';
import CustomButton from '@/app/component/customButton/button';
import SettingSidebar from '../../verticleBar';
import * as Yup from 'yup';
import FormikController from '@/app/component/formControl';
import { Form, Formik } from 'formik';
import { companySetupService } from '@/app/services/setting/companySetup';
import { voidFc } from '@/app/utils/types';
import CategoryTable from '../components/CategoryTable';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { addNewCategoryData } from '@/redux/company/settingSlices/companySetup/category.slice';

export interface DataType {
    categoryId: string;
    companyName: string;
    _id: string;
    action: string;
}

export type CategoryInitTypes = {
    name: string
}
const validationSchema = Yup.object({
    name: Yup.string().required('Category Name is required!'),
});


const AddCategory = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { categoryData } = useSelector((state: any) => state.companySetupCategory);

    console.log({ categoryData })

    const initialValues: CategoryInitTypes = {
        name: categoryData?.name || ''
    };

    const submitHandler = async (values: CategoryInitTypes, { resetForm }: { resetForm: voidFc }) => {
        const { statusCode, data } = await companySetupService.httpAddNewCategory(values);
        if (statusCode === 201) {
            dispatch(addNewCategoryData(data));
            resetForm();
        }
    }

    return (
        <SettingSidebar>
            <section className={`${bg_style} p-5 w-full`}>
                <div className={`${bg_style} p-5 w-full`}>
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
                                        name="name"
                                        placeholder="Enter Name"
                                    />
                                    <div className="flex justify-end mt-5">
                                        <CustomButton
                                            type='submit'
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
                <CategoryTable />
            </section>
        </SettingSidebar>
    )
}

export default AddCategory