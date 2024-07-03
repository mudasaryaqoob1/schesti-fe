'use client';
import CustomButton from "@/app/component/customButton/button";
import WhiteButton from "@/app/component/customButton/white";
import { InputComponent } from "@/app/component/customInput/Input";
import { DeleteContent } from "@/app/component/delete/DeleteContent";
import TertiaryHeading from "@/app/component/headings/tertiary";
import ModalComponent from "@/app/component/modal";
import { withAuth } from "@/app/hoc/withAuth";
import { useRouterHook } from "@/app/hooks/useRouterHook";
import { CommonCrmType, CrmType, ICrmItem } from "@/app/interfaces/crm/crm.interface";
import { Routes } from "@/app/utils/plans.utils";
import { bg_style } from "@/globals/tailwindvariables";
import { insertManyCrmItemAction, removeCrmItemAction } from "@/redux/crm/crm.slice";
import { getCrmItemsThunk, updateCrmItemStatusThunk } from "@/redux/crm/crm.thunk";
import { AppDispatch, RootState } from "@/redux/store";
import { SearchOutlined } from "@ant-design/icons";
import { Dropdown, Table, Tag, type MenuProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PreviewCSVImportFileModal } from "../components/PreviewCSVImportFileModal";
import _ from "lodash";
import { deleteCrmItemById, downloadCrmItemsAsCSV, saveManyCrmItems, uploadAndParseCSVData } from "../utils";


const items: MenuProps['items'] = [
    {
        key: 'edit',
        label: <p>Edit Vendor Details</p>,
    },
    {
        key: 'delete',
        label: <p>Delete</p>,
    },
    {
        key: 'inactive',
        label: <p>In Active</p>,
    },
];

const inactiveItems: MenuProps['items'] = [
    {
        key: 'active',
        label: <p>Active</p>,
    },
];
function VendorsPage() {
    const [search, setSearch] = useState('');
    const router = useRouterHook();
    const vendorState = useSelector((state: RootState) => state.crm);
    const dispatch = useDispatch<AppDispatch>();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState<ICrmItem | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const inputFileRef = useRef<HTMLInputElement | null>(null);
    const [isUploadingFile, setIsUploadingFile] = useState(false);
    const [parseData, setParseData] = useState<CommonCrmType[]>([]);
    const [duplicates, setDuplicates] = useState<CommonCrmType[]>([]);
    const [isSavingMany, setIsSavingMany] = useState(false);

    useEffect(() => {
        dispatch(getCrmItemsThunk({ module: "vendors" }));
    }, [])


    function handleMenuItemClick(key: string, record: ICrmItem) {
        if (key === 'edit') {
            router.push(`${Routes.CRM.Vendors}/edit/${record._id}`);
        }
        else if (key === 'delete') {
            setSelectedVendor(record);
            setShowDeleteModal(true);
        }
        else if (key === 'inactive') {
            dispatch(updateCrmItemStatusThunk({
                id: record._id,
                status: false
            }))
        }
        else if (key === 'active') {
            dispatch(updateCrmItemStatusThunk({
                id: record._id,
                status: true
            }))
        }
    }


    const columns: ColumnsType<ICrmItem> = [
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
                return (
                    <Dropdown
                        menu={{
                            items: record.status ? items : inactiveItems,
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

            },
        },
    ];

    const filteredData = vendorState.data.filter((vendor) => {
        if (!search) {
            return true;
        }
        if (vendor.module === 'subcontractors') {
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

        {selectedVendor && showDeleteModal ? (
            <ModalComponent
                open={showDeleteModal}
                setOpen={setShowDeleteModal}
                width="30%"
            >
                <DeleteContent
                    onClick={() => deleteCrmItemById(selectedVendor._id, setIsDeleting, item => {
                        toast.success('Vendor deleted successfully');
                        dispatch(removeCrmItemAction(item._id));
                        setShowDeleteModal(false);
                        setSelectedVendor(null);
                    })}
                    onClose={() => setShowDeleteModal(false)}
                    isLoading={isDeleting}
                />
            </ModalComponent>
        ) : null}

        <PreviewCSVImportFileModal
            columns={columns as any}
            data={parseData}
            onClose={() => {
                setParseData([]);
                setDuplicates([]);
            }}
            onConfirm={() => {
                saveManyCrmItems(parseData, setIsSavingMany, "vendors", setDuplicates, items => {
                    dispatch(insertManyCrmItemAction(items));
                    const remainingParsedData = _.differenceBy(parseData, items, 'email');
                    setParseData(remainingParsedData);
                });
            }}
            setData={setParseData}
            isLoading={isSavingMany}
            title='Import Vendors'
            duplicates={duplicates}
        />

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
                            onClick={() => downloadCrmItemsAsCSV(vendorState.data, columns as ColumnsType<CrmType>, "vendors")}
                        />
                    </div>
                    <div>
                        <WhiteButton
                            text='Import'
                            className='!w-fit'
                            icon='/uploadcloud.svg'
                            iconwidth={20}
                            iconheight={20}
                            isLoading={isUploadingFile}
                            onClick={() => {
                                if (inputFileRef.current) {
                                    inputFileRef.current.click();
                                }
                            }}
                            loadingText='Uploading...'
                        />
                        <input
                            ref={inputFileRef}
                            accept='.csv, .xlsx'
                            type="file"
                            name=""
                            id="importClients"
                            className='hidden'
                            onChange={uploadAndParseCSVData(setIsUploadingFile, "vendors", setParseData)}
                        />
                    </div>

                    {/* <div>
                        <WhiteButton
                            text="Invite"
                            className="!border-schestiPrimary !text-schestiPrimary"
                        />
                    </div> */}
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
                dataSource={filteredData as ICrmItem[]}
                pagination={{ position: ['bottomCenter'] }}
            />
        </div>
    </section>
}

export default withAuth(VendorsPage)