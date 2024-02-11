import Image from "next/image";
import { InputComponent } from "../component/customInput/Input";
import { LandingNavbar } from "../component/navbar/LandingNavbar";
import { SelectComponent } from "../component/customSelect/Select.component";
import { ConfigProvider } from "antd";
import CustomButton from "../component/customButton/button";
import LandingFooter from "../component/footer/LandingFooter";

export default function ContactPage() {
    return (
        <section>
            <main style={{
                background: "linear-gradient(180deg, #8449EB 0%, #6A56F6 100%)"
            }} className="h-[501px] relative">
                <LandingNavbar />
                <div className="mt-[101px] mx-auto w-[1063px]">
                    <h1 className="text-center font-extrabold text-white text-[64px] leading-[80px]">
                        Get in Touch With Us
                    </h1>
                    <p
                        className="text-center text-white w-[774px] leading-[44px] font-light text-[24px] mx-auto my-[26px]"
                    >
                        Schesti is here to help you at any stage of your project<br /> management journey.
                    </p>
                </div>
            </main>

            <div className="px-[200px] mt-[151px]">
                <div className="grid grid-cols-2 gap-64">
                    <div>
                        <h1 className=" text-[#1D2939] font-bold mt-[15px] leading-[54.181px] text-[36.121px]">
                            Ready to see Wrike for yourself?
                        </h1>
                        <p className="mt-[11px] text-[#475467] text-[20px] leading-[40px] font-normal">
                            {"We'"}d love to show you how Wrike can help your team do more of their best work. Fill out the form and {"we'"}ll be in touch within 24 hours.
                        </p>
                        <div className="flex space-x-4 my-[36px]">
                            <Image
                                src={"/navigation-icon.svg"}
                                alt="navigation-icon"
                                width={24}
                                height={24}
                                className="mt-2"
                            />
                            <div>
                                <p className="mt-[11px] text-[#344054] text-[18px] leading-[18px] font-semibold">
                                    OUR OFFICE ADDRESS:
                                </p>
                                <p className="mt-[11px] text-[#475467] text-[20px] leading-[34px] font-normal">
                                    5109 Hollyridge Dr, Ste 102 Raleigh, NC 27612
                                </p>
                            </div>
                        </div>
                        <div className="flex space-x-4 my-[36px]">
                            <Image
                                src={"/call-icon.svg"}
                                alt="call-icon"
                                width={24}
                                height={24}
                                className="mt-2"
                            />
                            <div>
                                <p className="mt-[11px] text-[#344054] text-[18px] leading-[18px] font-semibold">
                                    CALL US:
                                </p>
                                <p className="mt-[11px] text-[#475467] text-[20px] leading-[34px] font-normal">
                                    +1 (919)610 7760
                                </p>
                            </div>
                        </div>

                        <div className="flex space-x-4 my-[36px]">
                            <Image
                                src={"/mail-icon.svg"}
                                alt="call-icon"
                                width={24}
                                height={24}
                                className="mt-2"
                            />
                            <div>
                                <p className="mt-[11px] text-[#344054] text-[18px] leading-[18px] font-semibold">
                                    MAIL US:
                                </p>
                                <p className="mt-[11px] text-[#475467] text-[20px] leading-[34px] font-normal">
                                    Info@schesti.com
                                </p>
                            </div>
                        </div>
                    </div>


                    {/* Second Column */}
                    <div className="flex flex-col justify-evenly">
                        <InputComponent
                            label="Name"
                            placeholder="Enter your name"
                            name="name"
                            type="text"
                            inputStyle="!bg-[#D0D5DD32]"
                        />
                        <InputComponent
                            label="Email"
                            placeholder="Enter your email"
                            name="email"
                            type="email"
                            inputStyle="!bg-[#D0D5DD32]"
                        />
                        <InputComponent
                            label="Phone number"
                            placeholder="Enter your phone"
                            name="phone"
                            type="number"
                            inputStyle="!bg-[#D0D5DD32]"
                        />
                        <InputComponent
                            label="Company"
                            placeholder="Enter company name"
                            name="company"
                            type="text"
                            inputStyle="!bg-[#D0D5DD32]"
                        />
                        <ConfigProvider
                            theme={{
                                components: {
                                    Select: {
                                        colorBgContainer: "#D0D5DD32"
                                    }
                                }
                            }}
                        >
                            <SelectComponent
                                label="Number of employees"
                                name="employees"
                                placeholder="Select number of employees"
                                field={{
                                    options: [{ label: "1-10", value: "1-10" }, { label: "11-50", value: "11-50" }, { label: "51-200", value: "51-200" }],
                                    size: "large"
                                }}
                            />
                        </ConfigProvider>
                        <p className="mt-[11px] text-[#475467] text-[14px] leading-[34px] font-normal">
                            By completing and submitting the form, I acknowledge Wrike’s Privacy Policy.
                        </p>
                        <CustomButton
                            text="Get in touch"
                            className="!rounded-full !w-48 self-end !bg-[#7138DF]"
                        />
                    </div>
                </div>
            </div>


            <div
                style={{
                    background: "linear-gradient(180deg, #8449EB 0%, #6A56F6 100%)"
                }}
                className="mt-20">
                <div className="px-[200px] py-8">
                    <div>
                        <div className="mt-4 space-y-7">
                            <div>
                                <h1 className="text-white text-center text-[40px] leading-[60px]">Schesti: Your Gateway to Unmatched Efficiency</h1>
                                <p
                                    className="text-white pt-[13px] text-[20px] leading-[38px]  text-center w-[924px] mx-auto"
                                >
                                    Empower Your Projects with Schesti: Your Comprehensive Solution for Achieving Exceptional Efficiency in Field Service Excellence
                                </p>
                            </div>
                            <div className="flex mt-[42px] justify-center space-x-4">
                                <CustomButton
                                    text="Get start with Schesti"
                                    className="!rounded-full !bg-white !w-48 !text-[#8449EB]"
                                />

                                <CustomButton
                                    text="Contact Us"
                                    className="!rounded-full !w-48 !bg-transparent !border-white  !text-white"
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <LandingFooter />
        </section>
    )
}