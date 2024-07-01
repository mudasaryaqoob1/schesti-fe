'use client';
import { withAuth } from "@/app/hoc/withAuth"
import { senaryHeading } from "@/globals/tailwindvariables";
import Image from "next/image";
import MinDesc from '@/app/component/description/minDesc';
import TertiaryHeading from "@/app/component/headings/tertiary";
import { InputComponent } from "@/app/component/customInput/Input";
import { PhoneNumberInputWithLable } from "@/app/component/phoneNumberInput/PhoneNumberInputWithLable";
import CustomButton from "@/app/component/customButton/button";
import WhiteButton from "@/app/component/customButton/white";

function CreateVendorPage() {

    return (
        <section className="mx-4">
            <div className="flex gap-4 items-center my-6">
                <Image src={'/home.svg'} alt="home icon" width={20} height={20} />
                <Image
                    src={'/chevron-right.svg'}
                    alt="chevron-right icon"
                    width={16}
                    height={16}
                />
                <p className={`${senaryHeading} font-base text-slateGray`}>My Vendors</p>
                <Image
                    src={'/chevron-right.svg'}
                    alt="chevron-right icon"
                    width={16}
                    height={16}
                />

                <MinDesc
                    title="Add New Vendor"
                    className={`${senaryHeading} font-semibold text-schestiPrimary cursor-pointer underline`}
                />
            </div>

            <div className="p-5 flex flex-col rounded-lg border border-silverGray shadow-secondaryShadow2 bg-white">
                <TertiaryHeading
                    className="text-graphiteGray mb-4 "
                    title="Add New Vendor"
                />

                <form className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <InputComponent
                            label="First Name"
                            name="firstName"
                            type="text"
                            placeholder="Enter First Name"
                        />

                        <InputComponent
                            label="Last Name"
                            name="lastName"
                            type="text"
                            placeholder="Enter Last Name"
                        />
                    </div>

                    <PhoneNumberInputWithLable
                        label="Phone Number"
                        onChange={(value: any) => console.log(value)}
                    />

                    <InputComponent
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Enter Email"
                    />

                    <InputComponent
                        label="Company Name"
                        name="companyName"
                        type="text"
                        placeholder="Enter Company Name"
                    />

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <InputComponent
                            label="Address"
                            name="address"
                            type="text"
                            placeholder="Enter Address"
                        />

                        <InputComponent
                            label="Address 2"
                            name="secondAddress"
                            type="text"
                            placeholder="Enter Second Address"
                        />
                    </div>

                    <div className="flex justify-end items-center gap-2">
                        <WhiteButton
                            text="Cancel"
                            className="!w-fit"
                        />
                        <CustomButton
                            text="Save and Continue"
                            className="!w-fit"
                        />
                    </div>
                </form>
            </div>
        </section>
    )
}

export default withAuth(CreateVendorPage);