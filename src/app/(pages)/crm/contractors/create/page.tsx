'use client'
import CustomButton from "@/app/component/customButton/button"
import WhiteButton from "@/app/component/customButton/white";
import { InputComponent } from "@/app/component/customInput/Input";
import { DateInputComponent } from "@/app/component/cutomDate/CustomDateInput";
import SenaryHeading from "@/app/component/headings/senaryHeading"
import { TextAreaComponent } from "@/app/component/textarea";
import { withAuth } from "@/app/hoc/withAuth"
import { CrmType } from "@/app/interfaces/crm/crm.interface";
import { IUserInterface } from "@/app/interfaces/user.interface";
import { RootState } from "@/redux/store";
import { Spin, Upload } from "antd";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import crmService from "@/app/services/crm/crm.service";
import { AxiosError } from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import ModalComponent from "@/app/component/modal";
import { ListCrmItems } from "../components/ListCrmItems";

function CreateContractPage() {
    const [crmItem, setCrmItem] = useState<CrmType | null>(null);
    const [isFetchingItem, setIsFetchingItem] = useState(false);
    const searchParams = useSearchParams();
    const authUser = useSelector((state: RootState) => state.auth.user as { user?: IUserInterface });
    const [showList, setShowList] = useState(false);


    useEffect(() => {
        const id = searchParams.get('id');
        if (id) {
            getCrmItemById(id);
        }
    }, [searchParams])

    async function getCrmItemById(id: string) {
        setIsFetchingItem(true);
        try {
            const response = await crmService.httpGetItemById(id);
            if (response.data) {
                setCrmItem(response.data);
            }
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            if (err.response?.data) {
                toast.error("Unable to get the item");
            }
        } finally {
            setIsFetchingItem(false);
        }
    }



    return <section className="mt-6 !pb-[39px]  mx-4 ">
        <div className="flex items-center justify-between">
            <SenaryHeading
                title="Create New Contract"
                className="text-schestiPrimaryBlack text-xl leading-7 font-semibold"
            />

            <div className="flex items-center space-x-3">
                <WhiteButton
                    text="Cancel"
                    className="!w-fit"
                />
                <CustomButton
                    text="Save"
                    className="!w-fit"
                />
            </div>
        </div>

        <ModalComponent open={showList} setOpen={setShowList}>
            <ListCrmItems onClose={() => setShowList(false)} title="Select Item" onItemClick={(item) => {
                setCrmItem(item);
                setShowList(false);
            }} />
        </ModalComponent>


        <div className="p-5 bg-white rounded-md mt-5 space-y-3">
            <div>
                <p className="text-graphiteGray text-sm font-medium leading-6 capitalize">
                    Contract Information
                </p>
                <Upload.Dragger
                    name={'file'}
                    // accept=".csv, .xls, .xlsx"
                    // fileList={[]}
                    beforeUpload={(_file, FileList) => {
                        for (const file of FileList) {
                            const isLessThan500MB = file.size < 500 * 1024 * 1024; // 500MB in bytes
                            if (!isLessThan500MB) {
                                toast.error('File size should be less than 500MB');
                                return false;
                            }
                        }

                        return false;
                    }}
                    style={{
                        borderStyle: 'dashed',
                        borderWidth: 2,
                        marginTop: 12,
                        backgroundColor: "transparent"
                    }}
                // itemRender={() => {
                //     return null;
                // }}
                >
                    <p className="ant-upload-drag-icon">
                        <Image
                            src={'/uploadcloudcyan.svg'}
                            width={50}
                            height={50}
                            alt="upload"
                        />
                    </p>
                    <p className="text-[18px] font-semibold py-2 leading-5 text-[#2C3641]">
                        Drop your files here, or browse
                    </p>

                    <p className="text-sm font-normal text-center py-2 leading-5 text-[#2C3641]">
                        or
                    </p>

                    <CustomButton
                        text="Select File"
                        className="!w-fit !px-6 !bg-schestiLightPrimary !text-schestiPrimary !py-2 !border-schestiLightPrimary"
                    />
                </Upload.Dragger>
            </div>

            <InputComponent
                label="Contract Title"
                placeholder="Contract Title"
                name="contractTitle"
                type="text"
            />

            <div className="grid grid-cols-2 gap-3">
                <DateInputComponent
                    label="Start Date"
                    name="startDate"
                />

                <DateInputComponent
                    label="End Date"
                    name="startDate"
                />
            </div>

            <TextAreaComponent
                label="Description"
                name="description"
                placeholder="Enter description"
            />

            <div className="grid grid-cols-2 gap-3">
                <div className="border p-3 rounded-md">
                    <p
                        className="text-graphiteGray text-sm font-medium leading-6 capitalize"
                    >
                        Company Information
                    </p>

                    <div className="mt-1 grid grid-cols-2 gap-2">
                        <InputComponent
                            label="Sender Name"
                            name="senderName"
                            placeholder="Sender Name"
                            type="text"
                            field={{
                                value: authUser?.user?.name
                            }}
                        />
                        <InputComponent
                            label="Company Name"
                            name="companyName"
                            placeholder="Company Name"
                            type="text"
                            field={{
                                value: authUser?.user?.companyName || authUser?.user?.organizationName
                            }}
                        />

                        <InputComponent
                            label="Phone Number"
                            name="phone"
                            type="text"
                            field={{
                                value: authUser?.user?.phone
                            }}
                        />
                        <InputComponent
                            label="Email"
                            name="email"
                            placeholder="Email"
                            type="email"
                            field={{
                                value: authUser?.user?.email
                            }}
                        />

                        <div className="col-span-2">
                            <InputComponent
                                label="Address"
                                name="address"
                                placeholder="Address"
                                type="text"
                                field={{
                                    value: authUser?.user?.address
                                }}
                            />
                        </div>
                    </div>
                </div>


                <div className="border p-3 rounded-md">
                    <div className="flex items-center justify-between">
                        <p
                            className="text-graphiteGray text-sm font-medium leading-6 capitalize"
                        >
                            Receiver Information
                        </p>
                        <CustomButton
                            text="Select"
                            className="!bg-schestiLightPrimary !text-schestiPrimary !py-2 !w-fit !border-schestiLightPrimary"
                            onClick={() => {
                                setShowList(true)
                            }}
                        />
                    </div>
                    <Spin spinning={isFetchingItem} indicator={<LoadingOutlined spin />}>
                        <div className="mt-1 grid grid-cols-2 gap-2">
                            <InputComponent
                                label="Receiver Name"
                                placeholder="Receiver Name"
                                name="receiverName"
                                type="text"
                                field={{
                                    value: crmItem ? (crmItem?.module === 'partners' || crmItem?.module === 'subcontractors') ? crmItem?.companyRep : crmItem?.firstName + " " + crmItem?.lastName : undefined
                                }}
                            />
                            <InputComponent
                                label="Company Name"
                                name="companyName"
                                placeholder="Company Name"
                                type="text"
                                field={{
                                    value: (crmItem?.module === 'subcontractors' || crmItem?.module === 'partners') ? crmItem?.name : crmItem?.companyName
                                }}
                            />

                            <InputComponent
                                label="Phone Number"
                                placeholder="Phone Number"
                                name="phone"
                                type="text"
                                field={{
                                    value: crmItem?.phone
                                }}
                            />
                            <InputComponent
                                label="Email"
                                placeholder="Email"
                                name="email"
                                type="email"
                                field={{
                                    value: crmItem?.email
                                }}
                            />

                            <div className="col-span-2">
                                <InputComponent
                                    label="Address"
                                    placeholder="Address"
                                    name="address"
                                    type="text"
                                    field={{
                                        value: crmItem?.address
                                    }}
                                />
                            </div>
                        </div>
                    </Spin>
                </div>
            </div>

        </div>



        <div className="my-5 grid grid-cols-2 gap-4 p-5 bg-white rounded-md">
            <InputComponent
                label="Project Name"
                placeholder="Project Name"
                name="projectName"
                type="text"
            />

            <InputComponent
                label="Project Number"
                placeholder="Project Number"
                name="projectName"
                type="number"
            />
        </div>

    </section>
}

export default withAuth(CreateContractPage)