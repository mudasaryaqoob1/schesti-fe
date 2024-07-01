'use client';
import CustomButton from "@/app/component/customButton/button";
import WhiteButton from "@/app/component/customButton/white";
import { InputComponent } from "@/app/component/customInput/Input";
import TertiaryHeading from "@/app/component/headings/tertiary";
import { withAuth } from "@/app/hoc/withAuth";
import { useRouterHook } from "@/app/hooks/useRouterHook";
import { ICrmVendor } from "@/app/interfaces/crm/vendor.interface";
import { Routes } from "@/app/utils/plans.utils";
import { bg_style } from "@/globals/tailwindvariables";
import { getCrmVendorsThunk } from "@/redux/crm-vendors/crmVendors.thunk";
import { AppDispatch, RootState } from "@/redux/store";
import { SearchOutlined } from "@ant-design/icons";
import { Dropdown, Table, Tag, type MenuProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const activeClientMenuItems: MenuProps['items'] = [
    {
        key: 'edit',
        label: <p>Edit Vendor Details</p>,
    },
    {
        key: 'delete',
        label: <p>Delete</p>,
    },
    {
        key: 'inActiveVendor',
        label: <p>In Active</p>,
    },
];

const inActiveClientMenuItems: MenuProps['items'] = [
    {
        key: 'activeVendor',
        label: <p>Active</p>,
    },
];
function VendorsPage() {
    const [search, setSearch] = useState('');
    const router = useRouterHook();
    const vendorState = useSelector((state: RootState) => state.crmVendor);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getCrmVendorsThunk({}));
    }, [])


    function handleMenuItemClick(key: string, record: ICrmVendor) {
        if (key === 'edit') {
            router.push(`/crm/vendors/edit/${record._id}`);
        }
    }


    const columns: ColumnsType<ICrmVendor> = [
        {
            title: 'Vendor Name',
            render: (_, record) => {
                return `${record.firstName} ${record.lastName}`;
            }
        },
        {
            title: 'Company',
            dataIndex: 'companyName',
            ellipsis: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Phone number',
            dataIndex: 'phone',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (_, record) => {
                if (record.status) {
                    return (
                        <Tag className="rounded-full" color="green">
                            Active
                        </Tag>
                    );
                } else {
                    return (
                        <Tag className="rounded-full" color="red">
                            In Active
                        </Tag>
                    );
                }
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            align: 'center',
            key: 'action',
            render: (text, record) => {
                if (record.status) {
                    return (
                        <Dropdown
                            menu={{
                                items: activeClientMenuItems,
                                onClick({ key }) {
                                    handleMenuItemClick(key, record);
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
                    );
                } else {
                    return (
                        <Dropdown
                            menu={{
                                items: inActiveClientMenuItems,
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
                    );
                }
            },
        },
    ];

    const filteredData = vendorState.data.filter((vendor) => {
        if (!search) {
            return true;
        }

        return vendor.firstName.toLowerCase().includes(search.toLowerCase()) ||
            vendor.lastName.toLowerCase().includes(search.toLowerCase()) ||
            vendor.companyName.toLowerCase().includes(search.toLowerCase()) ||
            vendor.email?.includes(search) ||
            vendor.phone?.includes(search) ||
            vendor.address?.includes(search)
    })

    return <section className="mt-6 mb-[39px]  mx-4 rounded-xl ">
        <div className={`${bg_style} p-5 border border-solid border-silverGray`}>
            <div className="flex justify-between items-center mb-4">
                <TertiaryHeading title="Vendors List" className="text-graphiteGray" />
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
                            }}
                        />
                    </div>
                    <div>
                        <WhiteButton
                            text='Export'
                            className='!w-fit'
                            icon='/download-icon.svg'
                            iconwidth={20}
                            iconheight={20}
                        />
                    </div>
                    <div>
                        <WhiteButton
                            text='Import'
                            className='!w-fit'
                            icon='/uploadcloud.svg'
                            iconwidth={20}
                            iconheight={20}

                            loadingText='Uploading...'
                        />
                        <input
                            accept='.csv, .xlsx'
                            type="file"
                            name=""
                            id="importClients"
                            className='hidden'
                        />
                    </div>

                    <div>
                        <WhiteButton
                            text="Invite"
                            className="!border-schestiPrimary !text-schestiPrimary"
                        />
                    </div>
                    <CustomButton
                        text="Add New Vendor"
                        className="!w-48"
                        icon="/plus.svg"
                        iconwidth={20}
                        iconheight={20}
                        onClick={() => router.push(`${Routes.CRM.Vendors}/create`)}
                    />
                </div>
            </div>
            <Table
                loading={vendorState.loading}
                columns={columns}
                dataSource={filteredData}
                pagination={{ position: ['bottomCenter'] }}
            />
        </div>
    </section>
}

export default withAuth(VendorsPage)