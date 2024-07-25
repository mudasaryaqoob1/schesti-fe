'use client';
import CustomButton from "@/app/component/customButton/button";
import { InputComponent } from "@/app/component/customInput/Input";
import { SelectComponent } from "@/app/component/customSelect/Select.component";
import SenaryHeading from "@/app/component/headings/senaryHeading";
import { withAuth } from "@/app/hoc/withAuth";
import { useRouterHook } from "@/app/hooks/useRouterHook";
import { ICrmContract } from "@/app/interfaces/crm/crm-contract.interface";
import { CrmType } from "@/app/interfaces/crm/crm.interface";
import { FileInterface } from "@/app/interfaces/file.interface";
import crmContractService from "@/app/services/crm/crm-contract.service";
import { downloadFile } from "@/app/utils/downloadFile";
import { Routes } from "@/app/utils/plans.utils";
import { SearchOutlined } from "@ant-design/icons";
import { Dropdown, Tag, type MenuProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import Table from "antd/es/table";
import { AxiosError } from "axios";
import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";

const menuItems: MenuProps['items'] = [
    {
        key: 'viewContract',
        label: <p>View Contract</p>,
    },
    {
        key: 'email',
        label: <p>Email</p>,
    },
    {
        key: 'download',
        label: <p>Download</p>,
    },
    {
        key: 'delete',
        label: <p>Delete</p>,
    },

];
function ContractsPage() {
    const [data, setData] = useState<ICrmContract[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouterHook();
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        getCompanyContracts();
    }, []);

    async function getCompanyContracts() {
        setIsLoading(true);
        try {
            const response = await crmContractService.httpGetCompanyContracts();
            if (response.data) {
                setData(response.data);
            }
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            console.log(err.response?.data);
        } finally {
            setIsLoading(false);
        }
    }


    const columns: ColumnsType<ICrmContract> = [
        {
            title: "Contract Title",
            dataIndex: "title"
        },
        {
            title: "Receiver Name",
            dataIndex: "receiver",
            render: (receiver: CrmType) => {
                if (receiver.module === 'subcontractors' || receiver.module === 'partners') {
                    return receiver.companyRep
                }
                return `${receiver.firstName} ${receiver.lastName || ""}`
            }
        },
        {
            title: "Start Date",
            dataIndex: "startDate",
            render: (date) => {
                return moment(date).format("YYYY-MM-DD")
            }
        },
        {
            title: "End Date",
            dataIndex: "endDate",
            render: (date) => {
                return moment(date).format("YYYY-MM-DD")
            }
        },
        {
            title: "Contract File",
            dataIndex: "file",
            render: (file: FileInterface) => {
                return <div className="flex space-x-5 items-center">
                    <div className="flex items-center space-x-2">
                        <div className="p-1 rounded-md bg-schestiLightPrimary">
                            <Image
                                alt="file"
                                src={"/file-cyan.svg"}
                                width={20}
                                height={20}
                            />
                        </div>

                        <SenaryHeading
                            title={file.name}
                            className="text-[14px] text-schestiPrimaryBlack"
                        />
                    </div>

                    <div className="p-1">
                        <Image
                            alt="download"
                            src={'/download-icon.svg'}
                            width={20}
                            height={20}
                            className="cursor-pointer"
                            onClick={() => downloadFile(file.url, file.name)}
                        />
                    </div>
                </div>
            }
        },
        {
            title: "Status",
            dataIndex: "status",
            render(value, record,) {
                if (record.status === 'draft') {
                    return (
                        <Tag className="rounded-full" color="#026AA2">
                            Draft
                        </Tag>
                    );
                } else if (record.status === 'pending') {
                    return (
                        <Tag className="rounded-full" color="#175CD3">
                            Pending
                        </Tag>
                    );
                } else if (record.status === 'archive') {
                    return (
                        <Tag className="rounded-full" color="#344054">
                            Archived
                        </Tag>
                    );
                } else {
                    return (
                        <Tag className="rounded-full" color="#027A48">
                            Signed
                        </Tag>
                    );
                }
            },
        },
        {
            title: "Action",
            dataIndex: "action",
            render(_value, record) {
                return <Dropdown
                    menu={{
                        items: menuItems,
                        onClick({ key }) {
                            if (key === 'viewContract') {
                                router.push(`${Routes.CRM.Contractors}/view?id=${record._id}`);
                            } else if (key === 'download') {
                                router.push(`${Routes.CRM.Contractors}/view?id=${record._id}&download=true`);
                            }
                        }
                    }}
                    placement="bottomRight"
                >
                    <Image
                        src={'/menuIcon.svg'}
                        alt="logo white icon"
                        width={20}
                        height={20}
                        className="active:scale-105 cursor-pointer"
                    />
                </Dropdown>
            },
        }
    ]

    const filteredData = data.filter((item) => {
        if (!search) return true;
        return item.title.toLowerCase().includes(search.toLowerCase());
    }).filter((item) => {
        if (!status) return true;
        return item.status === status
    });

    return <div className="mt-6 p-5 !pb-[39px]  mx-4 bg-white rounded-md">

        <div className="flex justify-between items-center">
            <SenaryHeading
                title="Contracts"
                className="text-xl text-schestiPrimaryBlack font-semibold leading-7"
            />
            <div className="flex items-center space-x-3">
                <div className="w-96">
                    <InputComponent
                        label=""
                        name=""
                        type="text"
                        placeholder="Search"
                        prefix={<SearchOutlined />}
                        field={{
                            value: search ? search : undefined,
                            onChange: (e) => {
                                setSearch(e.target.value);
                            },
                            allowClear: true,
                        }}
                    />
                </div>
                <SelectComponent
                    label=''
                    name='status'
                    placeholder='Status'
                    field={{
                        value: status ? status : undefined,
                        options: [
                            { label: "Pending", value: "pending" },
                            { label: "Signed", value: "signed" },
                        ],
                        className: "!w-auto",
                        allowClear: true,
                        onChange: (value) => {
                            setStatus(value);
                        },
                        onClear() {
                            setStatus('');
                        },
                    }}
                />

                <CustomButton
                    text="Create New Contract"
                    className="!w-fit !py-2.5"
                    icon="/plus.svg"
                    iconwidth={20}
                    iconheight={20}
                    onClick={() => router.push(`${Routes.CRM.Contractors}/create`)}
                />
            </div>
        </div>


        <div className="mt-5">
            <Table
                columns={columns}
                dataSource={filteredData}
                loading={isLoading}
            />
        </div>

    </div>
}

export default withAuth(ContractsPage)