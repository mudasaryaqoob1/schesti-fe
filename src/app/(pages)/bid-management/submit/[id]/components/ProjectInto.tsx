import SenaryHeading from "@/app/component/headings/senaryHeading";
import TertiaryHeading from "@/app/component/headings/tertiary";
import { IBidManagement } from "@/app/interfaces/bid-management/bid-management.interface";
import { USCurrencyFormat } from "@/app/utils/format";
import { Avatar } from "antd";
import { Country } from "country-state-city";
import moment from "moment";
import Image from "next/image";


type Props = {
    bid: IBidManagement | null
}

export function ProjectIntro({ bid }: Props) {
    if (!bid) {
        return null;
    }

    return <div className="bg-white py-[27px] px-[28px] mt-5 rounded-lg shadow-lg">
        <TertiaryHeading
            title="Submit a proposal"
            className="text-[#344054] text-3xl font-semibold leading-9"
        />
        <div className="grid mt-4 grid-cols-12 gap-3">
            <div className="col-span-8 border-r">
                <TertiaryHeading
                    title={`Posted: ${moment(bid.createdAt).format("MM/DD/YYYY hh:mm A")}`}
                    className="text-[#475467] text-xs leading-4 font-normal"
                />

                <div className="mt-3">
                    <TertiaryHeading
                        title={bid.description}
                        className="text-[#475467] text-[14px] leading-6 font-normal"
                    />
                    <p className="text-[#7F56D9] underline underline-offset-2 mt-4 text-[14px] leading-6 font-normal cursor-pointer">
                        View full details
                    </p>
                </div>
            </div>
            <div className="col-span-4">
                <div className="flex justify-end items-center space-x-3">
                    <div className="rounded-full bg-[#E9EBF8] py-[5px] px-[11px]">
                        <SenaryHeading
                            title={"Budgeting/Planning"}
                            className="text-[#7138DF] font-normal text-xs leading-4"
                        />
                    </div>
                    <Image
                        alt="trash icon"
                        src={'/trash.svg'}
                        width={16}
                        height={16}
                        className="cursor-pointer"
                    />
                    <Image
                        alt="share icon"
                        src={'/share.svg'}
                        width={16}
                        height={16}
                        className="cursor-pointer"
                    />
                    <Image
                        alt="heart icon"
                        src={'/heart.svg'}
                        width={16}
                        height={16}
                        className="cursor-pointer"
                    />
                </div>

                <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                        <TertiaryHeading
                            title="Location: "
                            className="text-[#667085] text-xs leading-4 font-normal"
                        />

                        <TertiaryHeading
                            title={`${Country.getCountryByCode(bid.country)?.name}`}
                            className="text-[#101828] text-xs leading-4 font-normal"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <TertiaryHeading
                            title="Project value: "
                            className="text-[#667085] text-xs leading-4 font-normal"
                        />

                        <TertiaryHeading
                            title={USCurrencyFormat.format(bid.projectValue)}
                            className="text-[#101828] text-xs leading-4 font-normal"
                        />
                    </div>
                </div>

                {typeof bid.user !== 'string' ? <div className="mt-4">
                    <SenaryHeading
                        title="Who is bidding the project?"
                        className="text-[#475467] text-base leading-6 font-semibold"
                    />

                    <div className="bg-[#FCFAFF] mt-2 rounded-md  p-3 border border-[#EBEAEC]">
                        <div className="flex items-center justify-between">
                            <div className="flex mt-1 space-x-2">
                                <Avatar size={24} src={bid.user.avatar}>

                                </Avatar>

                                <SenaryHeading
                                    title={bid.user.organizationName || bid.user.companyName || "N/A"}
                                    className="text-[#475467] text-[14px] leading-6 font-semibold"
                                />
                            </div>

                            <div className="">
                                <SenaryHeading
                                    title="Representative"
                                    className="text-[#7F56D9] underline underline-offset-2 text-[14px] leading-6 font-normal"
                                />
                                <SenaryHeading
                                    title={bid.user.name}
                                    className="text-[#475467] text-[14px] leading-6 font-normal"
                                />
                            </div>
                        </div>
                    </div>

                </div> : null}
            </div>
        </div>
    </div>
}