'use client';
import FormControl from '@/app/component/formControl';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomButton from '@/app/component/customButton/button';
import Image from "next/image"
import TertiaryHeading from '@/app/component/headings/tertiary';
import Description from '@/app/component/description';
import { bg_style } from '@/globals/tailwindvariables';
import { Dispatch } from 'react';
interface Props {
    setShowAddUser: Dispatch<React.SetStateAction<boolean>>
}
const AddNewUser = ({ setShowAddUser }: Props) => {
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
    const submitHandler = (values: any, { resetForm }: unknown) => {

    };
    return (
        <div className='w-full'>
            <div className="flex gap-4 items-center">
                <Image src={'/home.svg'} alt="home icon" width={20} height={20} />
                <Image
                    src={'/chevron-right.svg'}
                    alt="chevron-right icon"
                    width={16}
                    height={16}
                />
                <Description
                    title="Setting"
                    className="font-base text-slateGray"
                />
                <Image
                    src={'/chevron-right.svg'}
                    alt="chevron-right icon"
                    width={16}
                    height={16}
                />

                <Description
                    title="Add New"
                    className="font-semibold text-lavenderPurple cursor-pointer underline"
                />
            </div>
            <TertiaryHeading
                title="Client List"
                className='my-5'
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
                            onSubmit={handleSubmit}
                            autoComplete="off"
                            className={`${bg_style} p-5`}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-x-5 ">
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

                            </div>
                            <div
                                className="self-end flex justify-end items-center gap-5 md:mt-5 my-3"
                            >
                                <div>
                                    <CustomButton
                                        className=" !border-celestialGray !shadow-scenarySubdued2 !text-graphiteGray !bg-snowWhite"
                                        text="Cancel"
                                        onClick={() => setShowAddUser(false)}
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
    )
}

export default AddNewUser