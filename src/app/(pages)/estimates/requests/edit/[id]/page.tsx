'use client';
import CustomButton from '@/app/component/customButton/button';
import { minHeading, senaryHeading } from '@/globals/tailwindvariables';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { useRouter, useParams } from 'next/navigation';
import TertiaryHeading from '@/app/component/headings/tertiary';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import MinDescription from '@/app/component/description/minDesc';
import CustomWhiteButton from '@/app/component/customButton/white';
import ModalComponent from '@/app/component/modal';
import { Form, Formik } from 'formik';
import FormControl from '@/app/component/formControl';
import * as Yup from 'yup';
import { estimateRequestService } from '@/app/services/estimateRequest.service';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { IEstimateRequest } from '@/app/interfaces/companyInterfaces/estimateRequests.interface';
import { selectEstimateRequests } from '@/redux/company/estimateRequestSelector';
import ExistingClient from '../../existingClient';

const clientInfoSchema: any = Yup.object({
    clientName: Yup.string()
        .required('Field is required!'),
    companyName: Yup.string()
        .required('Field is required!'),
    email: Yup.string()
        .required('Email is required!')
        .email('Email should be valid'),
    phone: Yup.string()
        .required('Field is required!'),
    city: Yup.string()
        .required('Field is required!'),
    projectName: Yup.string()
        .required('Field is required!'),
    leadSource: Yup.string()
        .required('Field is required!'),
    projectValue: Yup.string()
        .required('Field is required!'),
    projectInformation: Yup.string()
        .required('Field is required!'),
    salePerson: Yup.string()
        .required('Field is required!'),
    estimator: Yup.string()
        .required('Field is required!'),
});


const EditTakeOff = () => {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [estimateRequestData, setEstimateRequestData] = useState(null);
    const estimateRequestsData = useSelector(selectEstimateRequests);
    const params = useParams();

    const { id } = params;


    const initialValues: IEstimateRequest = {
        clientName: '',
        companyName: '',
        email: '',
        phone: '',
        city: 'Lahore',
        projectName: '',
        leadSource: '',
        projectValue: '',
        projectInformation: '',
        salePerson: '',
        estimator: ''
    };

    console.log({ estimateRequestsData, estimateRequestData })
    useEffect(() => {
        setEstimateRequestData(estimateRequestsData.find((item: any) => item._id === id));
    }, [id]);

    const submitHandler = async (values: IEstimateRequest) => {

        let updateEstimateRequestData = {
            clientName: values.clientName,
            companyName: values.companyName,
            email: values.email,
            phone: values.phone,
            city: values.city,
            projectName: values.projectName,
            leadSource: values.leadSource,
            projectValue: values.projectValue,
            projectInformation: values.projectInformation,
            salePerson: values.salePerson,
            estimator: values.estimator
        };

        let result = await estimateRequestService.httpUpdateEstimateRequest(updateEstimateRequestData, id);
        if (result.statusCode == 200) {
            setIsLoading(false);
            router.push('/estimates');
        } else {
            setIsLoading(false);
            toast.error(result.message);
        }
    };

    return (
        <>
            <ModalComponent open={showModal} setOpen={setShowModal}>
                <ExistingClient setModalOpen={setShowModal} />
            </ModalComponent>
            <section className="pt-6 pb-3 px-16">
                <div className=" flex flex-col">
                    <div className="flex justify-between items-center  md:flex-wrap relative">
                        <TertiaryHeading title="Take Off Measurements" />
                        <CustomWhiteButton
                            text="Add Existing Client"
                            className="!w-auto "
                            icon="/plusblack.svg"
                            iconwidth={20}
                            iconheight={20}
                            onClick={() => setShowModal(true)}
                        />
                    </div>
                    <Formik
                        initialValues={estimateRequestData ? estimateRequestData : initialValues}
                        enableReinitialize={true}
                        validationSchema={clientInfoSchema}
                        onSubmit={submitHandler}
                    >
                        {({ handleSubmit, values }) => {
                            console.log({ values })
                            return (
                                <Form
                                    onSubmit={handleSubmit}
                                >
                                    <div className="p-5 mt-4 border border-solid border-silverGray pb-4 rounded-lg shadow-quinarGentleDepth">
                                        <QuaternaryHeading title="Client Information" className="font-semibold" />
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-1 gap-x-5">
                                            <FormControl
                                                control="input"
                                                label="Client Name"
                                                type="text"
                                                name="clientName"
                                                placeholder="Enter Client Name"
                                            />
                                            <FormControl
                                                control="input"
                                                label="Company Name"
                                                type="text"
                                                name="companyName"
                                                placeholder="Enter Company Name"
                                            />
                                            <FormControl
                                                control="input"
                                                label="email"
                                                type="email"
                                                name="email"
                                                placeholder="Enter Email"
                                            />
                                            <FormControl
                                                control="input"
                                                label="Phone Number"
                                                type="text"
                                                name="phone"
                                                placeholder="Phone number"
                                            />

                                        </div>
                                    </div>

                                    <div className="p-5 my-4 border-2 border-silverGray  rounded-lg shadow-quinarGentleDepth">
                                        <QuaternaryHeading
                                            title="Project information "
                                            className="text-graphiteGray font-semibold"
                                        />
                                        <div className="grid grid-cols-1 gap-y-2 md:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-x-5">
                                            <FormControl
                                                control="input"
                                                label="Project Name"
                                                type="text"
                                                name="projectName"
                                                placeholder="Enter Project Name"
                                            />
                                            <FormControl
                                                control="input"
                                                label="Lead Source Value"
                                                type="text"
                                                name="leadSource"
                                                placeholder="Select source"
                                            />
                                            <FormControl
                                                control="input"
                                                label="Project Value"
                                                type="text"
                                                name="projectValue"
                                                placeholder="Select source"
                                            />
                                            <FormControl
                                                control="input"
                                                label="Project Information"
                                                type="text"
                                                name="projectInformation"
                                                placeholder="Enter Project Information"
                                            />


                                        </div>
                                    </div>

                                    {/* assignment */}
                                    <div className="p-5  border-2 border-silverGray pb-4 rounded-lg shadow-quinarGentleDepth">
                                        <QuaternaryHeading
                                            title="Assignments"
                                            className="text-graphiteGray font-semibold"
                                        />
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 grid-rows-1 gap-x-5 w-full">
                                            <FormControl
                                                control="input"
                                                label="Sale Person"
                                                type="text"
                                                name="salePerson"
                                                placeholder="Enter sale person"
                                            />
                                            <FormControl
                                                control="input"
                                                label="Estimator"
                                                type="text"
                                                name="estimator"
                                                placeholder="Select project manager"
                                            />
                                        </div>
                                    </div>

                                    <div className="p-5 mt-4 border-2  border-silverGray pb-4 rounded-lg shadow-quinarGentleDepth">
                                        <QuaternaryHeading
                                            title="Uploads"
                                            className="text-graphiteGray font-semibold"
                                        />
                                        <div className="flex items-center gap-3">
                                            <div className="w-60">
                                                <p className={`${senaryHeading} text-midnightBlue font-popin`}>
                                                    Architecture
                                                </p>
                                                <div
                                                    className="my-2 p-4 flex items-center flex-col gap-2 border-2
                 border-silverGray pb-4 rounded-lg "
                                                >
                                                    <Image
                                                        src={'/uploadcloud.svg'}
                                                        alt="upload icon"
                                                        width={20}
                                                        height={20}
                                                        className="rounded-3xl border-5 border-paleblueGray bg-lightGrayish"
                                                    />
                                                    <div className="flex gap-3 items-center">
                                                        <div>
                                                            <p
                                                                className={twMerge(
                                                                    `${senaryHeading}
                         text-RoyalPurple font-semibold`
                                                                )}
                                                            >
                                                                Click to upload
                                                            </p>
                                                        </div>
                                                        <MinDescription
                                                            className="text-steelGray font-popin text-center"
                                                            title="or drag and drop"
                                                        />
                                                    </div>
                                                    <MinDescription
                                                        className="text-steelGray font-popin text-center"
                                                        title="SVG, PNG, JPG or GIF (max. 800x400px)"
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-60">
                                                <p className={`${senaryHeading} text-midnightBlue font-popin`}>
                                                    Other Documents
                                                </p>
                                                <div
                                                    className="p-4 my-2 flex items-center flex-col gap-2 border-2
                 border-silverGray pb-4 rounded-lg "
                                                >
                                                    <Image
                                                        src={'/uploadcloud.svg'}
                                                        alt="upload icon"
                                                        width={20}
                                                        height={20}
                                                        className="rounded-3xl border-5 border-paleblueGray bg-lightGrayish"
                                                    />
                                                    <div className="flex gap-3 items-center">
                                                        <div>
                                                            <p
                                                                className={twMerge(
                                                                    `${senaryHeading}
                         text-RoyalPurple font-semibold`
                                                                )}
                                                            >
                                                                Click to upload
                                                            </p>
                                                        </div>
                                                        <p className={`${minHeading} text-midnightBlue font-popin`}>
                                                            or drag and drop
                                                        </p>
                                                    </div>
                                                    <p
                                                        className={`${minHeading} text-midnightBlue font-popin text-center `}
                                                    >
                                                        SVG, PNG, JPG or GIF (max. 800x400px)
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* buttons */}
                                    <div
                                        className="self-end  flex justify-end items-center gap-1
           md:my-5 my-3 bg-white shadow-secondaryTwist"
                                    >
                                        <div className="!px-5 !py-3 ">
                                            <CustomButton
                                                className="  !border-celestialGray 
            !shadow-scenarySubdued2  
             !text-graphiteGray 
              !bg-snowWhite
              !px-5 !py-3
              "
                                                text="Cancel"
                                                onClick={() => router.push('/estimates')}
                                            />
                                        </div>
                                        <div className="!px-5 !py-3 !w-64">
                                            <CustomButton
                                                text="Next"
                                                type='submit'
                                                isLoading={isLoading}
                                                className="!px-5 !py-3"
                                            />
                                        </div>
                                    </div>
                                </Form>
                            )

                        }}
                    </Formik>

                </div>
            </section>
        </>
    );
};

export default EditTakeOff;
