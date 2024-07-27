import { Popups } from "@/app/(pages)/bid-management/components/Popups";
import CustomButton from "@/app/component/customButton/button";
import WhiteButton from "@/app/component/customButton/white";
import { InputComponent } from "@/app/component/customInput/Input";
import ModalComponent from "@/app/component/modal";
import { IDailyWorkStatus } from "@/app/interfaces/crm/crm-daily-work.interface";
import { useState } from "react";
import * as Yup from 'yup'
import { dailyWorkColors } from "../utils";
import { useFormik } from "formik";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import crmDailyWorkService from "@/app/services/crm/crm-daily-work.service";
import { DisplayDailyWorkStatus } from "./DisplayStatus";
import Image from "next/image";
import { ChooseColor } from "./ChooseColor";
import { Spin, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

type Props = {
    statuses: IDailyWorkStatus[];
    onCreate: (_status: IDailyWorkStatus) => void;
    isFetching: boolean;
}

const ValidationSchema = Yup.object().shape({
    name: Yup.string().required('Status Name is required!'),
});


export function ManageStatus({ statuses, onCreate, isFetching }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formik = useFormik<{
        name: string;
        color: string
    }>({
        initialValues: {
            name: '',
            color: dailyWorkColors[dailyWorkColors.length - 1]
        },
        validationSchema: ValidationSchema,
        onSubmit: (values) => {
            createStatus(values)
        },
    });

    async function createStatus(values: {
        name: string;
        color: string
    }) {
        setIsSubmitting(true);
        try {
            const response = await crmDailyWorkService.httpCreateDailyWorkStatus(values);
            if (response.data) {
                toast.success('Status created successfully');
                formik.resetForm();
                onCreate(response.data)
            }
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            toast.error(err.response?.data.message || 'An error occurred');
        } finally {
            setIsSubmitting(false);
        }
    }

    function handleOnClose() {
        setShowModal(false);
        formik.resetForm();
    }

    return <>
        <ModalComponent
            open={!isFetching && showModal}
            setOpen={handleOnClose}
            width="600px"
            destroyOnClose
        >
            <Popups title="Manage Status" onClose={handleOnClose}>
                <div className="space-y-3">
                    <InputComponent
                        label="Status"
                        name="name"
                        type="text"
                        placeholder="Enter Status"
                        field={{
                            value: formik.values.name,
                            onChange: formik.handleChange,
                            onBlur: formik.handleBlur,
                        }}
                        hasError={formik.touched.name && Boolean(formik.errors.name)}
                        errorMessage={formik.touched.name && formik.errors.name ? formik.errors.name : ''}
                    />
                    <div className="max-h-[300px] overflow-y-auto">
                        {statuses.length === 0 ? <p className="text-center font-semibold text-base">No Status</p> : statuses.map((status, index) => {

                            return <div
                                key={index}
                                className="flex  relative items-center px-3 justify-between border-b border-[#E5E7EB] py-3">

                                <DisplayDailyWorkStatus item={status} />

                                <Tooltip title={<div>
                                    <ChooseColor itemColor={status.color} />
                                    <Spin spinning={false}>
                                        <div className="border-t text-red-500 space-x-2 text-base cursor-pointer py-3 flex items-center border-gray-200">
                                            <DeleteOutlined className="text-xl" />
                                            <span>Delete</span>
                                        </div>
                                    </Spin>
                                </div>} placement="bottom" color="#fff">
                                    <Image
                                        src="/menuIcon.svg"
                                        alt="logo white icon"
                                        width={20}
                                        height={20}
                                        className="cursor-pointer"
                                    />

                                </Tooltip>

                            </div>
                        })}
                    </div>
                    {formik.values.name ? <div className="flex justify-end ">
                        <CustomButton
                            text="Save"
                            className="!w-fit"
                            onClick={formik.handleSubmit}
                            isLoading={isSubmitting}
                            loadingText="Saving..."
                        />
                    </div> : null}
                </div>
            </Popups>
        </ModalComponent>
        <WhiteButton
            text="Manage Status"
            className="!w-fit !py-2.5"
            onClick={() => setShowModal(!showModal)}
            isLoading={isFetching}
            loadingText="Loading..."
        />
    </>
}