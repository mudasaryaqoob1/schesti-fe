import CustomButton from "@/app/component/customButton/button";
import SenaryHeading from "@/app/component/headings/senaryHeading";
import { USCurrencyFormat } from "@/app/utils/format";
import { Divider, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Image from "next/image";

export function ProjectBids() {

    const columns: ColumnsType<{}> = [
        {
            key: "description",
            title: "Description",
            dataIndex: "description",
        },
        {
            key: "quantity",
            title: "Quantity",
            dataIndex: "quantity",
        },
        {
            key: "unitPrice",
            title: "Unit Price",
            dataIndex: "unitPrice",
            render(value) {
                return USCurrencyFormat.format(value)
            },
        },
        {
            key: "total",
            title: "Total",
            dataIndex: "total",
            render(value) {
                return USCurrencyFormat.format(value)
            },
        }
    ]

    return <div className=" mt-6 mb-4 md:ms-[69px] md:me-[59px] mx-4 ">
        <div className=" p-5  bg-white rounded-lg border shadow-lg">
            <SenaryHeading
                title="Bid Coverage Overview"
                className="text-xl font-semibold text-[#344054] leading-9"
            />

            <div className="grid grid-cols-8 mt-3">
                <div className="flex space-x-2 items-center rounded-lg border-[#EAECF0] border bg-[#F9FAFB] py-3 px-4">
                    <div className="flex  items-center space-x-1">
                        <SenaryHeading
                            title="Trades"
                            className="text-[#667085] text-base font-normal leading-6"
                        />
                        <SenaryHeading
                            title="44"
                            className="text-[#667085] text-2xl font-semibold leading-8"
                        />
                    </div>
                    <SenaryHeading
                        title="0 Bids"
                        className="text-[#667085] text-base font-normal leading-6"
                    />
                </div>
            </div>
        </div>

        <div className=" ">
            <div className="grid grid-cols-12 gap-3">
                <div className={`mt-3 h-fit col-span-8 rounded-lg bg-white shadow-lg  border border-[#E8E3EF] p-4 cursor-pointer`}

                >
                    <div className="flex justify-between">
                        <div className="flex items-center space-x-3">
                            <Image
                                src={'/trade.svg'}
                                width={18}
                                height={18}
                                alt="trade icon"
                            />
                            <SenaryHeading
                                title={"Johen Markes Property"}
                                className="font-medium text-[#001556] text-base leading-6"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <SenaryHeading
                                title="Trade:"
                                className="font-normal text-[#667085] text-xs leading-6"
                            />
                            <p className="bg-[#E9EBF8] py-[5px] px-[11px] text-xs leading-4 text-[#7138DF] rounded-full">
                                Budgeting/Planning
                            </p>
                        </div>
                    </div>
                    <div className="mt-[17px] flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                            <div className="space-y-2">
                                <SenaryHeading
                                    title="Company Name:"
                                    className="text-[#475467] font-normal text-xs leading-4"
                                />

                                <SenaryHeading
                                    title={"Company Devanics"}
                                    className="text-[#475467] font-semibold text-xs leading-4"
                                />
                            </div>
                            <div className="space-y-2">
                                <SenaryHeading
                                    title="Project value: "
                                    className="text-[#475467] font-normal text-xs leading-4"
                                />

                                <SenaryHeading
                                    title={"$ 1,000,000"}
                                    className="text-[#475467] font-semibold text-xs leading-4"
                                />
                            </div>
                            <div className="space-y-2">
                                <SenaryHeading
                                    title="Deadline: "
                                    className="text-[#475467] font-normal text-xs leading-4"
                                />

                                <SenaryHeading
                                    title={`90 Days`}
                                    className="text-[#475467] font-semibold text-xs leading-4"
                                />
                            </div>
                            <div className="space-y-2">
                                <SenaryHeading
                                    title="Bid date and time:"
                                    className="text-[#475467] font-normal text-xs leading-4"
                                />

                                <SenaryHeading
                                    title={"12 May 2022, 12:40"}
                                    className="text-[#475467] font-semibold text-xs leading-4"
                                />
                            </div>
                        </div>
                        <Image
                            src={'/forward-arrow.svg'}
                            width={46}
                            height={36}
                            alt="forward arrow icon"
                            className="cursor-pointer"
                        />
                    </div>
                </div>

                <div className="col-span-4  mt-3 rounded-lg p-4 border border-[#E8E3EF] shadow-lg bg-white">
                    <div>
                        <SenaryHeading
                            title={"Company Name"}
                            className="font-normal text-[#475467] text-xs leading-4"
                        />
                        <div className="flex mt-1 items-center space-x-3">
                            <Image
                                src={'/trade.svg'}
                                width={18}
                                height={18}
                                alt="trade icon"
                            />
                            <SenaryHeading
                                title={"Johen Markes Property"}
                                className="font-medium text-[#001556] text-base leading-6"
                            />
                        </div>
                    </div>

                    <div className="mt-3 space-y-2">
                        <div className="flex items-centers space-x-2">
                            <SenaryHeading
                                title={"Project Price:"}
                                className="font-normal text-[#475467] text-xs leading-4"
                            />

                            <SenaryHeading
                                title={"$ 1,000,000"}
                                className="font-semibold text-[#475467] text-xs leading-4"
                            />
                        </div>
                        <div className="flex items-centers space-x-2">
                            <SenaryHeading
                                title={"Deadline:"}
                                className="font-normal text-[#475467] text-xs leading-4"
                            />

                            <SenaryHeading
                                title={"90 Days"}
                                className="font-semibold text-[#475467] text-xs leading-4"
                            />
                        </div>
                        <div className="flex items-centers space-x-2">
                            <SenaryHeading
                                title={"Bid Time:"}
                                className="font-normal text-[#475467] text-xs leading-4"
                            />

                            <SenaryHeading
                                title={"12 May 2022, 12:40"}
                                className="font-semibold text-[#475467] text-xs leading-4"
                            />
                        </div>


                    </div>

                    <Divider />
                    <div className="mt-3">
                        <SenaryHeading
                            title={"lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"}
                            className="font-normal text-[#475467] text-sm leading-6"
                        />
                    </div>

                    <Divider />

                    <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <SenaryHeading
                                title="How long this price will stay?"
                                className="font-normal text-[#667085] text-xs leading-4"
                            />
                            <SenaryHeading
                                title="3 months"
                                className="font-semibold text-[#101828] text-xs leading-4"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <SenaryHeading
                                title="How much you want to increase?"
                                className="font-normal text-[#667085] text-xs leading-4"
                            />
                            <SenaryHeading
                                title="6 %"
                                className="font-semibold text-[#101828] text-xs leading-4"
                            />
                        </div>
                    </div>

                    <Divider />

                    <div className="mt-2 space-y-3">
                        <SenaryHeading
                            title="Project Scope"
                            className="font-semibold text-[#101828] text-xs leading-4"
                        />

                        <Table
                            columns={columns}
                            dataSource={[
                                { description: "Lorem ipsum dolor sit amet", quantity: 1, unitPrice: 1000, total: 1000 },
                                { description: "Lorem ipsum dolor sit amet", quantity: 1, unitPrice: 1000, total: 1000 },
                                { description: "Lorem ipsum dolor sit amet", quantity: 1, unitPrice: 1000, total: 1000 },
                                { description: "Lorem ipsum dolor sit amet", quantity: 1, unitPrice: 1000, total: 1000 },
                            ]}
                            pagination={false}
                            bordered
                        />
                    </div>

                    <div className="px-4 mt-3">
                        <CustomButton
                            text="Download All Files"
                        />
                    </div>
                </div>

            </div>
        </div>
    </div>
}