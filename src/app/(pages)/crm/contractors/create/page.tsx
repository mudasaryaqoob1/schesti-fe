'use client'
import CustomButton from "@/app/component/customButton/button"
import WhiteButton from "@/app/component/customButton/white";
import { InputComponent } from "@/app/component/customInput/Input";
import { DateInputComponent } from "@/app/component/cutomDate/CustomDateInput";
import SenaryHeading from "@/app/component/headings/senaryHeading"
import { PhoneNumberInputWithLable } from "@/app/component/phoneNumberInput/PhoneNumberInputWithLable";
import { TextAreaComponent } from "@/app/component/textarea";
import { withAuth } from "@/app/hoc/withAuth"
import { Upload } from "antd";
import Image from "next/image";
import { toast } from "react-toastify";

function CreateContractPage() {
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
                        />
                        <InputComponent
                            label="Company Name"
                            name="companyName"
                            placeholder="Company Name"
                            type="text"
                        />

                        <PhoneNumberInputWithLable
                            label="Phone Number"
                            onChange={() => { }}
                        />
                        <InputComponent
                            label="Email"
                            name="email"
                            placeholder="Email"
                            type="email"
                        />

                        <div className="col-span-2">
                            <InputComponent
                                label="Address"
                                name="address"
                                placeholder="Address"
                                type="text"
                            />
                        </div>
                    </div>
                </div>


                <div className="border p-3 rounded-md">
                    <p
                        className="text-graphiteGray text-sm font-medium leading-6 capitalize"
                    >
                        Receiver Information
                    </p>
                    <div className="mt-1 grid grid-cols-2 gap-2">
                        <InputComponent
                            label="Receiver Name"
                            placeholder="Receiver Name"
                            name="receiverName"
                            type="text"
                        />
                        <InputComponent
                            label="Company Name"
                            name="companyName"
                            placeholder="Company Name"
                            type="text"
                        />

                        <PhoneNumberInputWithLable
                            label="Phone Number"
                            onChange={() => { }}
                        />
                        <InputComponent
                            label="Email"
                            placeholder="Email"
                            name="email"
                            type="email"
                        />

                        <div className="col-span-2">
                            <InputComponent
                                label="Address"
                                placeholder="Address"
                                name="address"
                                type="text"
                            />
                        </div>
                    </div>
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