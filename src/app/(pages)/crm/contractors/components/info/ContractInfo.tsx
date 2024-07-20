import SenaryHeading from "@/app/component/headings/senaryHeading";
import Image from "next/image";

export function ContractInfo() {

    return <div>
        <SenaryHeading
            title="Contract for Markets property"
            className="text-schestiPrimaryBlack font-bold text-xl leading-7"
        />

        <div className="mt-5 grid grid-cols-4 gap-4">

            <div className="space-y-2">
                <SenaryHeading
                    title="Project Name"
                    className="text-schestiLightBlack text-base"
                />

                <SenaryHeading
                    title="Schesti"
                    className="text-schestiPrimaryBlack font-normal text-base"
                />
            </div>

            <div className="space-y-2">
                <SenaryHeading
                    title="Project Number"
                    className="text-schestiLightBlack text-base"
                />

                <SenaryHeading
                    title="123456"
                    className="text-schestiPrimaryBlack font-normal text-base"
                />
            </div>

            <div className="space-y-2">
                <SenaryHeading
                    title="Start Date"
                    className="text-schestiLightBlack text-base"
                />

                <SenaryHeading
                    title="01/01/2020"
                    className="text-schestiPrimaryBlack font-normal text-base"
                />
            </div>

            <div className="space-y-2">
                <SenaryHeading
                    title="End Date"
                    className="text-schestiLightBlack text-base"
                />

                <SenaryHeading
                    title="01/01/2020"
                    className="text-schestiPrimaryBlack font-normal text-base"
                />
            </div>

        </div>

        <div className="gap-2 mt-5">
            <SenaryHeading
                title="Description"
                className="text-schestiLightBlack text-base"
            />

            <SenaryHeading
                title="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt ultricies, nisl nunc aliquam nisl, eget aliquam nisl nisl sit amet nunc."
                className="text-schestiPrimaryBlack font-normal text-base"
            />
        </div>

        <div className="mt-5 p-6 bg-gray-50 rounded-md">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                    <SenaryHeading
                        title="Company Information"
                        className="text-base text-schestiPrimary font-medium"
                    />
                    <div>
                        <SenaryHeading
                            title={`Olivia Smith`}
                            className="text-schestiPrimaryBlack font-normal text-base"
                        />
                        <SenaryHeading
                            title={`Mohammad Construction LLC`}
                            className="text-schestiPrimaryBlack font-normal text-base"
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Image
                            alt="call"
                            src={"/call.svg"}
                            width={20}
                            height={20}
                        />
                        <SenaryHeading
                            title={`(123) 456-7890`}
                            className="text-schestiPrimaryBlack font-normal text-base"
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Image
                            alt="mail"
                            src={"/mail-black.svg"}
                            width={20}
                            height={20}
                        />
                        <SenaryHeading
                            title={`wL9z6@example.com`}
                            className="text-schestiPrimaryBlack font-normal text-base"
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Image
                            alt="location"
                            src={"/navigation-black.svg"}
                            width={20}
                            height={20}
                        />
                        <SenaryHeading
                            title={`123 Main Street, Anytown, USA`}
                            className="text-schestiPrimaryBlack font-normal text-base"
                        />
                    </div>

                </div>

                <div className="space-y-3">
                    <SenaryHeading
                        title="Receiver Information"
                        className="text-base text-schestiPrimary font-medium"
                    />
                    <div>
                        <SenaryHeading
                            title={`Olivia Smith`}
                            className="text-schestiPrimaryBlack font-normal text-base"
                        />
                        <SenaryHeading
                            title={`Mohammad Construction LLC`}
                            className="text-schestiPrimaryBlack font-normal text-base"
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Image
                            alt="call"
                            src={"/call.svg"}
                            width={20}
                            height={20}
                        />
                        <SenaryHeading
                            title={`(123) 456-7890`}
                            className="text-schestiPrimaryBlack font-normal text-base"
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Image
                            alt="mail"
                            src={"/mail-black.svg"}
                            width={20}
                            height={20}
                        />
                        <SenaryHeading
                            title={`wL9z6@example.com`}
                            className="text-schestiPrimaryBlack font-normal text-base"
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Image
                            alt="location"
                            src={"/navigation-black.svg"}
                            width={20}
                            height={20}
                        />
                        <SenaryHeading
                            title={`123 Main Street, Anytown, USA`}
                            className="text-schestiPrimaryBlack font-normal text-base"
                        />
                    </div>

                </div>
            </div>
        </div>

    </div>
}