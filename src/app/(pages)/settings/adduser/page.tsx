'use client';
import FormControl from '@/app/component/formControl';
import Heading from '@/app/component/customHeading/heading';
import ClientNavbar from '@/app/component/navbar/clientnavbar';
import { senaryHeading, tertiaryHeading } from '@/globals/tailwindvariables';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form } from 'antd';
import Paragraph from '@/app/component/customParagraph/paragraph';
import CustomButton from '@/app/component/customButton/button';
import { useRouter } from 'next/navigation';
import Tabs from '../../../component/tabs';
import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks';
import { addClient, editClient } from '@/app/redux/clientSlice';
import Image from "next/image"
import Button from "@/app/component/customButton/button"

const Index = () => {
    const newClientSchema: any = Yup.object({
        firstName: Yup.string().required(' first name is required!'),
        lastName: Yup.string().required('last name is required!'),
        email: Yup.string()
            .required('Email is required!')
            .email('Email should be valid'),
        phoneNumber: Yup.string().required('phone number is required!'),
        companyName: Yup.string().required('company Name is required!'),
        address: Yup.string().required('Address is required!'),
        address2: Yup.string(),
    });

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        companyName: '',
        address: '',
        address2: '',
    };
    const router = useRouter();
    const submitHandler = (values: any, { resetForm }) => {

    };
    return (
        <>
            <ClientNavbar />
            <Tabs />
            <div className='mx-16'>
                <div className="flex gap-4 items-center my-6">
                    <Image src={'/home.svg'} alt="home icon" width={20} height={20} />
                    <Image
                        src={'/chevron-right.svg'}
                        alt="chevron-right icon"
                        width={16}
                        height={16}
                    />
                    <Paragraph
                        title="My Client"
                        styledVars={senaryHeading}
                        classes="font-base text-slateGray"
                    />
                    <Image
                        src={'/chevron-right.svg'}
                        alt="chevron-right icon"
                        width={16}
                        height={16}
                    />

                    <Paragraph
                        title="Add new client"
                        styledVars={senaryHeading}
                        classes="font-semibold text-lavenderPurple cursor-pointer underline"
                    />
                </div>
                <Heading
                    styledVars={tertiaryHeading}
                    title="Client List"
                    classes="text-graphiteGray"
                />
                <Formik
                    initialValues={initialValues}
                    validationSchema={newClientSchema}
                    onSubmit={submitHandler}
                >
                    {({ handleSubmit }) => {
                        return (
                            <Form
                                name="basic"
                                onFinish={handleSubmit}
                                autoComplete="off"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-4 gap-x-5">
                                    <FormControl
                                        control="input"
                                        label="First Name"
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                    />
                                    <FormControl
                                        control="input"
                                        label="Last Name"
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                    />
                                    <FormControl
                                        control="input"
                                        label="Phone Number"
                                        type="text"
                                        name="phoneNumber"
                                        placeholder="Phone number"
                                    />
                                    <FormControl
                                        control="input"
                                        label="email"
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                    />
                                    <div className='md:col-span-full'>
                                        <FormControl
                                            control="input"
                                            label="Company Name"
                                            type="text"
                                            name="companyName"
                                            placeholder="Enter Company Name"
                                        />
                                    </div>
                                    <FormControl
                                        control="input"
                                        label="Address"
                                        type="text"
                                        name="address"
                                        placeholder="Address"
                                    />
                                    <FormControl
                                        control="input"
                                        label="Address 2 (optional)"
                                        type="text"
                                        name="address2"
                                        placeholder="Address 2"
                                    />
                                </div>
                                <div
                                    className="self-end flex justify-end items-center gap-5 md:my-5 my-3"
                                >
                                    <div>
                                        <CustomButton
                                            className=" !border-celestialGray !shadow-scenarySubdued2 !text-graphiteGray !bg-snowWhite"
                                            text="Cancel"
                                            onClick={() => router.push('/client')}
                                        />
                                    </div>
                                    <div>
                                        <CustomButton className='mx-w-30' type="submit" text="Save and Continue" />
                                    </div>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </>
    )
}

export default Index