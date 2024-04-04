'use client';

import { InputComponent } from "@/app/component/customInput/Input";
import { SelectComponent } from "@/app/component/customSelect/Select.component";
import Description from "@/app/component/description";
import SenaryHeading from "@/app/component/headings/senaryHeading";
import TertiaryHeading from "@/app/component/headings/tertiary";
import { withAuth } from "@/app/hoc/withAuth";
import { USCurrencyFormat } from "@/app/utils/format";
import { Avatar, ConfigProvider, Divider, Table } from "antd";
import Image from "next/image";
import { bidDurationType } from "../../owner/post/components/data";
import { TextAreaComponent } from "@/app/component/textarea";
import Dragger from "antd/es/upload/Dragger";
import type { ColumnsType } from "antd/es/table";
import CustomButton from "@/app/component/customButton/button";
import WhiteButton from "@/app/component/customButton/white";
import { useFormik } from "formik";

type ProjectScope = {
    description: string;
    quantity: number;
    unitPrice: number;
}
function ContractorSubmitBidPage() {
    const formik = useFormik<{ projectScope: ProjectScope[] }>({
        initialValues: {
            projectScope: []
        },
        onSubmit(values) {
            console.log(values);
        },
    });



    function addNewScope() {
        formik.setFieldValue('projectScope', [
            ...formik.values.projectScope,
            {
                description: "",
                quantity: 0,
                unitPrice: 0
            }
        ]);
    }

    function deleteScope(index: number) {
        const newScopes = formik.values.projectScope.filter((_, i) => i !== index);
        formik.setFieldValue('projectScope', newScopes);
    }

    function updateScope(index: number, key: string, value: string | number) {
        const newScopes = formik.values.projectScope.map((scope, i) => {
            if (i === index) {
                return {
                    ...scope,
                    [key]: value
                }
            }
            return scope;
        });

        formik.setFieldValue('projectScope', newScopes);
    }


    const columns: ColumnsType<ProjectScope> = [
        {
            key: "description",
            dataIndex: "description",
            title: "Description",
            render(value, _record, index) {
                return <input
                    className="border-none focus:outline-none w-full h-full bg-transparent"
                    type="text"
                    value={value}
                    onChange={(e) => {
                        updateScope(index, 'description', e.target.value);
                    }}
                />
            },
        },
        {
            key: "quantity",
            dataIndex: "quantity",
            title: "Quantity",
            render(value, _record, index) {
                return <input
                    className="border-none focus:outline-none w-full h-full bg-transparent"
                    type="number"
                    value={value}
                    onChange={(e) => {
                        updateScope(index, 'quantity', Number(e.target.value));
                    }}
                />
            },
        },
        {
            key: "unitPrice",
            dataIndex: "unitPrice",
            title: "Unit Price",
            render: (value, _record, index) => {
                return <input
                    className="border-none focus:outline-none w-full h-full bg-transparent"
                    type="number"
                    value={value}
                    onChange={(e) => {
                        updateScope(index, 'unitPrice', Number(e.target.value));
                    }}
                />
            }
        },
        {
            key: "subtotal",
            title: "Sub Total",
            render(value, record, index) {
                return USCurrencyFormat.format(record.quantity * record.unitPrice);
            },
        },
        {
            title: "",
            render(value, record, index) {
                return <Image
                    src={"/x-circle.svg"}
                    alt="delete icon"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                    onClick={() => deleteScope(index)}
                />
            },
        }
    ]

    return <section className="mt-6 mb-4 md:ms-[69px] md:me-[59px] mx-4 ">
        <div className="flex gap-4 items-center">
            <Image src={'/home.svg'} alt="home icon" width={20} height={20} />
            <Image
                src={'/chevron-right.svg'}
                alt="chevron-right icon"
                width={16}
                height={16}
            />
            <Description
                title="Bid Management"
                className="font-base text-slateGray"
            />
            <Image
                src={'/chevron-right.svg'}
                alt="chevron-right icon"
                width={16}
                height={16}
            />

            <Description
                title="Find a project"
                className="font-base text-slateGray"
            />
            <Image
                src={'/chevron-right.svg'}
                alt="chevron-right icon"
                width={16}
                height={16}
            />
            <Description
                title="Project Details"
                className="font-base text-slateGray"
            />
            <Image
                src={'/chevron-right.svg'}
                alt="chevron-right icon"
                width={16}
                height={16}
            />

            <Description
                title="Submit Bid"
                className="font-semibold text-lavenderPurple cursor-pointer underline"
            />
        </div>

        <div className="bg-white py-[27px] px-[28px] mt-5 rounded-lg shadow-lg">
            <TertiaryHeading
                title="Submit a proposal"
                className="text-[#344054] text-3xl font-semibold leading-9"
            />
            <div className="grid mt-4 grid-cols-12 gap-3">
                <div className="col-span-8 border-r">
                    <TertiaryHeading
                        title="Posted: 12 may 2022, 12:40"
                        className="text-[#475467] text-xs leading-4 font-normal"
                    />

                    <div className="mt-3">
                        <TertiaryHeading
                            title="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc. Sed ut purus eget nunc. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc. Sed ut purus eget nunc. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc. Sed ut purus eget nunc.
                        "
                            className="text-[#475467] text-[14px] leading-6 font-normal"
                        />
                        <p className="text-[#7F56D9] underline underline-offset-2 mt-4 text-[14px] leading-6 font-normal cursor-pointer">
                            View full details
                        </p>
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="flex justify-end items-center space-x-3">
                        <div className="rounded-full bg-[#E9EBF8] py-[5px] px-[11px]">
                            <SenaryHeading
                                title={"Budgeting/Planning"}
                                className="text-[#7138DF] font-normal text-xs leading-4"
                            />
                        </div>
                        <Image
                            alt="trash icon"
                            src={'/trash.svg'}
                            width={16}
                            height={16}
                            className="cursor-pointer"
                        />
                        <Image
                            alt="share icon"
                            src={'/share.svg'}
                            width={16}
                            height={16}
                            className="cursor-pointer"
                        />
                        <Image
                            alt="heart icon"
                            src={'/heart.svg'}
                            width={16}
                            height={16}
                            className="cursor-pointer"
                        />
                    </div>

                    <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-between">
                            <TertiaryHeading
                                title="Location: "
                                className="text-[#667085] text-xs leading-4 font-normal"
                            />

                            <TertiaryHeading
                                title="Austin"
                                className="text-[#101828] text-xs leading-4 font-normal"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <TertiaryHeading
                                title="Project value: "
                                className="text-[#667085] text-xs leading-4 font-normal"
                            />

                            <TertiaryHeading
                                title={USCurrencyFormat.format(123122)}
                                className="text-[#101828] text-xs leading-4 font-normal"
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <SenaryHeading
                            title="Who is bidding the project?"
                            className="text-[#475467] text-base leading-6 font-semibold"
                        />

                        <div className="bg-[#FCFAFF] mt-2 rounded-md  p-3 border border-[#EBEAEC]">
                            <div className="flex items-center justify-between">
                                <div className="flex mt-1 space-x-2">
                                    <Avatar size={24} src={"/clientimage.png"}>

                                    </Avatar>

                                    <SenaryHeading
                                        title={"John Doe Company"}
                                        className="text-[#475467] text-[14px] leading-6 font-semibold"
                                    />
                                </div>

                                <div className="">
                                    <SenaryHeading
                                        title="Representative"
                                        className="text-[#7F56D9] underline underline-offset-2 text-[14px] leading-6 font-normal"
                                    />
                                    <SenaryHeading
                                        title={"Johen Markes"}
                                        className="text-[#475467] text-[14px] leading-6 font-normal"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <div className="bg-white py-[27px] px-[28px] mt-5 rounded-lg shadow-lg">
            <TertiaryHeading
                title="Bid On Project"
                className="text-[#344054] text-3xl font-semibold leading-9"
            />

            <div className="mt-3 space-y-3">
                <SelectComponent
                    label="Bid Trade"
                    name="bidTrade"
                    field={{
                        options: []
                    }}
                />
                <div className="flex items-center space-x-2">
                    <div className="flex-1">
                        <InputComponent
                            label="Price"
                            name="price"
                            type="number"
                            field={{
                                prefix: "$",
                            }}
                        />
                    </div>

                    <div className="flex-1 mt-1">
                        <InputComponent
                            label="Duration"
                            name="estimatedDuration"
                            placeholder="Duration"
                            type=""
                            field={{
                                type: 'number',
                                styles: {
                                    input: {
                                        padding: 10,
                                    },
                                },

                                className: '!py-1.5',
                                addonAfter: (
                                    <SelectComponent
                                        label=""
                                        name="durationType"
                                        field={{
                                            className: '!w-28 !pb-1',
                                            options: bidDurationType,
                                            dropdownStyle: {
                                                width: 100,
                                            },
                                            defaultValue: 'days',

                                        }}

                                    />
                                ),
                            }}

                        />
                    </div>
                </div>

                <TextAreaComponent
                    label="Additional Details"
                    name="additionalDetails"
                    field={{
                        rows: 10
                    }}
                />
            </div>

            <Divider />

            <div className="space-y-3">
                <TertiaryHeading
                    title="Price Value change"
                    className="text-[#192A3E] text-[18px] leading-8 font-medium"
                />
                <div className="flex items-center space-x-2">
                    <div className="flex-1">
                        <SelectComponent
                            label="How long this price will stay?"
                            placeholder="Select Period"
                            name="priceDuration"
                            field={{
                                options: []
                            }}
                        />
                    </div>
                    <div className="flex-1">

                        <SelectComponent
                            label="How much you want to increase"
                            placeholder="Select Increase"
                            name="priceIncrease"
                            field={{
                                options: []
                            }}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-12">
                    <div className="col-span-5">
                        <Dragger
                            name={'file'}
                            accept="image/*,gif,application/pdf"
                            multiple={true}

                            style={{
                                borderStyle: 'dashed',
                                borderWidth: 6,
                                borderColor: "#CDD2E1"
                            }}
                            itemRender={() => {
                                return null;
                            }}
                        >
                            <p className="ant-upload-drag-icon">
                                <Image
                                    src={'/uploadcloud.svg'}
                                    width={50}
                                    height={50}
                                    alt="upload"
                                />
                            </p>
                            <p className="text-[12px] py-2 leading-3 text-[#98A2B3]">
                                Drop your image here, or browse
                            </p>
                            <p className="text-[12px] leading-3 text-[#98A2B3]">
                                PNG, GIF, JPG, Max size: 2MB
                            </p>
                        </Dragger>
                    </div>
                </div>

                <div className="flex w-fit items-center space-x-4 cursor-pointer border-b border-[#7F56D9]">
                    <p className="text-[#7F56D9] text-[14px] leading-6 font-normal ">
                        Add Project Scope
                    </p>
                    <Image
                        src={'/forward-arrow.svg'}
                        width={24}
                        height={23}
                        alt="forward arrow icon"
                        className="cursor-pointer"
                    />
                </div>

                <div className="py-3">
                    <Table
                        columns={columns}
                        dataSource={formik.values.projectScope}
                        bordered
                        pagination={false}
                        footer={() => {
                            return <div className="bg-white border border-dashed h-full  p-4 rounded-lg">
                                <p className="text-[#98A2B3] text-[14px] leading-5 font-normal cursor-pointer"
                                    onClick={addNewScope}
                                >
                                    + Create new scope
                                </p>
                            </div>
                        }}
                    />
                </div>
            </div>
        </div>

        <div className="my-3 flex justify-end space-x-3">
            <WhiteButton
                text="Cancel"
                className="!w-36"
            />
            <CustomButton
                text="Place Bid"
                className="!w-36"
            />
        </div>
    </section>
}

export default withAuth(ContractorSubmitBidPage);