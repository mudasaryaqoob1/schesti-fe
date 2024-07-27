'use client';
import CustomButton from "@/app/component/customButton/button";
import WhiteButton from "@/app/component/customButton/white";
import { InputComponent } from "@/app/component/customInput/Input";
import { SelectComponent } from "@/app/component/customSelect/Select.component";
import TertiaryHeading from "@/app/component/headings/tertiary";
import { withAuth } from "@/app/hoc/withAuth";
import { SearchOutlined } from "@ant-design/icons";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRef, useState } from "react";
import { DailyWorkForm } from "./components/DailyWorkForm";
import * as Yup from 'yup';
import { isValidPhoneNumber } from "react-phone-number-input";
import { useFormik } from "formik";
import crmDailyWorkService, { ICrmDailyWorkCreate } from "@/app/services/crm/crm-daily-work.service";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { DailyWorkDatePicker } from "./components/DailyWorkDatePicker";

const ValidationSchema = Yup.object().shape({

    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().test({
        test: (value) => {
            if (value) {
                return isValidPhoneNumber(value);
            }
            return true;
        },
        message: 'Invalid phone number',
    }).required('Phone number is required'),
    work: Yup.string().required('Work Needed is required'),
    deadline: Yup.string().required('Deadline is required'),
    note: Yup.string().max(10, 'Note must have max 10 characters').required('Note is required'),

})

function DailyWorkPage() {
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('All');
    const inputFileRef = useRef<HTMLInputElement | null>(null);
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date().toISOString());



    const formik = useFormik<ICrmDailyWorkCreate>({
        initialValues: {
            email: '',
            phone: '',
            work: '',
            deadline: '',
            note: '',
        },
        validationSchema: ValidationSchema,
        onSubmit: (values) => {
            createDailyWorkLead(values);
        },
        enableReinitialize: true
    });

    async function createDailyWorkLead(values: ICrmDailyWorkCreate) {
        setIsSubmitting(true);
        try {
            const response = await crmDailyWorkService.httpCreateDailyWork(values);
            if (response.data) {
                toast.success('Daily work created successfully');
                setOpen(false);
            }
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            toast.error(err.response?.data.message || 'An error occurred');
        } finally {
            setIsSubmitting(false);
        }

    }

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const columns: ColumnsType<{}> = [
        {
            title: 'Priority',
        },
        {
            title: 'Work Needed',
        },
        {
            title: 'Phone Number',
        },
        {
            title: 'Email',
        },
        {
            title: 'Note',
        },
        {
            title: 'Status',
        },
        {
            title: 'Action',
        },
    ];



    return (
        <section className="mt-6 mb-[39px] bg-white p-5  mx-4 rounded-xl ">
            <DailyWorkForm
                formik={formik}
                onClose={onClose}
                open={open}
                isSubmitting={isSubmitting}
                onSubmit={formik.handleSubmit}
            />
            <div className="flex justify-between items-center mb-3">
                <TertiaryHeading className={'mt-1 mb-2'} title="Daily Work Needed" />

                <div className=" flex items-center space-x-3">
                    <div className="w-96">
                        <InputComponent
                            label=""
                            type="text"
                            placeholder="Search"
                            name="search"
                            prefix={<SearchOutlined />}
                            field={{
                                type: 'text',
                                value: search,
                                onChange: (e: any) => {
                                    setSearch(e.target.value);
                                },
                                className: '!py-2',
                            }}
                        />
                    </div>

                    <SelectComponent
                        label=""
                        name=""
                        placeholder="Priority"
                        field={{
                            options: []
                        }}
                    />
                    <SelectComponent
                        label=""
                        name=""
                        placeholder="Status"
                        field={{
                            value: status ? status : undefined,
                            options: [
                                { label: 'Active', value: 'active' },
                                { label: 'In Active', value: 'inactive' },
                                { label: 'All', value: 'all' },
                            ],
                            onChange: (value) => {
                                setStatus(value);
                            },
                            allowClear: true,
                            onClear() {
                                setStatus('');
                            },
                        }}
                    />

                    <div>
                        <WhiteButton
                            text="Export"
                            className="!w-fit !py-2.5"
                            icon="/download-icon.svg"
                            iconwidth={20}
                            iconheight={20}
                        />
                    </div>
                    <div>
                        <WhiteButton
                            text="Import"
                            className="!w-fit !py-2.5"
                            icon="/uploadcloud.svg"
                            iconwidth={20}
                            iconheight={20}
                            loadingText="Uploading..."
                        />
                        <input
                            ref={inputFileRef}
                            accept=".csv, .xlsx"
                            type="file"
                            name=""
                            id="importClients"
                            className="hidden"

                        />
                    </div>

                    {/* <div>
                        <WhiteButton
                            text="Invite"
                            className="!border-schestiPrimary !text-schestiPrimary"
                        />
                    </div> */}
                    <CustomButton
                        text="Add New Lead"
                        className="!w-fit !py-2.5"
                        icon="/plus.svg"
                        iconwidth={20}
                        iconheight={20}
                        onClick={showDrawer}
                    />
                </div>
            </div>

            <div className="mt-5 flex items-center justify-between">

                <DailyWorkDatePicker

                    value={currentDate}
                    onChange={setCurrentDate}
                />

                <div className="flex items-center space-x-3">

                    <WhiteButton
                        text="Manage Priority"
                        className="!w-fit !py-2.5"
                    />

                    <WhiteButton
                        text="Manage Status"
                        className="!w-fit !py-2.5"
                        loadingText="Uploading..."
                    />
                </div>
            </div>



            <div className="mt-5">
                <Table
                    columns={columns}

                />
            </div>
        </section>
    );
}

export default withAuth(DailyWorkPage)