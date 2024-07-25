'use client';
import CustomButton from "@/app/component/customButton/button";
import WhiteButton from "@/app/component/customButton/white";
import { InputComponent } from "@/app/component/customInput/Input";
import { SelectComponent } from "@/app/component/customSelect/Select.component";
import { DateInputComponent } from "@/app/component/cutomDate/CustomDateInput";
import TertiaryHeading from "@/app/component/headings/tertiary";
import { PhoneNumberInputWithLable } from "@/app/component/phoneNumberInput/PhoneNumberInputWithLable";
import { TextAreaComponent } from "@/app/component/textarea";
import { withAuth } from "@/app/hoc/withAuth";
import { SearchOutlined } from "@ant-design/icons";
import { Drawer, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import Image from "next/image";
import { useRef, useState } from "react";

function DailyWorkPage() {
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('All');
    const inputFileRef = useRef<HTMLInputElement | null>(null);
    const [open, setOpen] = useState(false);

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
    ]

    return (
        <section className="mt-6 mb-[39px] bg-white p-5  mx-4 rounded-xl ">
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
                <div></div>
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

            <Drawer
                title="Add New Member"
                placement="right"
                open={open}

                width={600}
                closable={false}
                extra={
                    <Image
                        src="/closeicon.svg"
                        alt="close"
                        width={20}
                        height={20}
                        className="cursor-pointer"
                        onClick={onClose}
                    />
                }
                headerStyle={{
                    backgroundColor: '#E6F2F8',
                }}
            >
                <div className="space-y-3">
                    <InputComponent
                        label="Needed"
                        name="name"
                        placeholder="Enter Work Needed"
                        type="text"
                        field={{
                        }}
                    />
                    <PhoneNumberInputWithLable
                        label="Phone Number"
                        //@ts-ignore
                        onChange={(val) => {
                            //@ts-ignore
                        }}
                        defaultCountry="US"

                    />
                    <InputComponent
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Enter Email"
                    />

                    <DateInputComponent
                        label="Deadline"
                        name="deadline"

                    />

                    <TextAreaComponent
                        label="Note"
                        placeholder="Enter Note"
                        name="note"
                        field={{
                            rows: 10
                        }}
                    />


                    <div className="flex items-center justify-between">
                        <WhiteButton text="Cancel" className="!w-40" />
                        <CustomButton
                            text={'Save'}
                            className="!w-40"
                            loadingText="Saving..."
                        />
                    </div>
                </div>
            </Drawer>

            <div className="mt-5">
                <Table
                    columns={columns}

                />
            </div>
        </section>
    );
}

export default withAuth(DailyWorkPage)