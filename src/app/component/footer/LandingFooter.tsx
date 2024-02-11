import { Divider } from "antd";
import Image from "next/image";

export default function LandingFooter() {
    return <div
        className="bg-[#1D2939] px-[200px] pb-4 pt-[52px]">
        <div className="flex justify-between items-start">
            <div className="flex flex-col justify-between gap-6">
                <Image
                    src={'/logowhite.svg'}
                    width={122.741}
                    height={32.19}
                    alt="Schesti"
                />

                <div className="space-y-2">
                    <p
                        className={`text-gray-400  text-lg pb-1 font-medium`}
                    >
                        Contact
                    </p>

                    <p
                        className={`text-white  text-lg pb-1 font-medium`}
                    >
                        info@shesti.com
                    </p>
                </div>
            </div>

            <div className="flex items-center space-x-8">
                <a
                    className={`text-white cursor-pointer text-lg pb-1 font-medium`}
                >
                    Home
                </a>
                <a
                    className={`text-white cursor-pointer text-lg pb-1 font-medium`}
                >
                    Plans
                </a>
                <a
                    className={`text-white cursor-pointer text-lg pb-1 font-medium`}
                >
                    Contact Us
                </a>
            </div>

            <div className="flex flex-col justify-end items-start space-y-2">
                <div className="space-y-2">
                    <p
                        className={`text-white text-lg pb-1 font-medium`}
                    >
                        Get in touch
                    </p>
                    <p
                        className={`text-gray-400 text-lg pb-1 font-medium`}
                    >
                        Stay informed on how you can make difference
                    </p>
                </div>

                <div className="flex justify-center py-2 ">
                    <div className="flex items-center rounded-full bg-white px-4 py-1 shadow-md">
                        <input
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 flex-1 border-none"
                            placeholder="Enter your email"
                            type="email"
                        />
                        <Image
                            src={"right-arrow-purple.svg"}
                            width={20}
                            height={20}
                            alt="arrow"
                        />
                    </div>
                </div>
            </div>


        </div>
        <Divider className="border-gray-400" />
        <div className="flex items-center justify-between">
            <div className="flex space-x-4">
                <p className="text-white text-[14px] font-normal leading-[18.23px]">Terms & Conditions</p>
                <p className="text-white text-[14px] font-normal leading-[18.23px]">Privacy Policy</p>
            </div>
            <div>
                <p className="text-white text-[14px] font-normal leading-[18.23px]">© 2023 Schesti  | All Rights Reserved</p>
            </div>
            <div className="flex items-center space-x-4">
                <Image
                    src={"/linkedin-img.png"}
                    width={20}
                    height={20}
                    alt="arrow"
                />
                <Image
                    src={"/FB.svg"}
                    width={20}
                    height={20}
                    alt="arrow"
                />
                <Image
                    src={"/IG.svg"}
                    width={20}
                    height={20}
                    alt="fb"
                />
                <Image
                    src={"/Twitter.svg"}
                    width={20}
                    height={20}
                    alt="fb"
                />

            </div>

        </div>
    </div>
}