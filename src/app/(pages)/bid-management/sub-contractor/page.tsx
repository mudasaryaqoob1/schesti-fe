'use client';
import WhiteButton from "@/app/component/customButton/white";
import CustomButton from "@/app/component/customButton/button";
import { InputComponent } from "@/app/component/customInput/Input";
import Description from "@/app/component/description";
import SenaryHeading from "@/app/component/headings/senaryHeading";
import { withAuth } from "@/app/hoc/withAuth"
import { SearchOutlined } from "@ant-design/icons";
import Image from "next/image";
import { BidIntro } from "./components/BidIntro";
import { IBidManagement } from "@/app/interfaces/bid-management/bid-management.interface";
import { useState } from "react";
import { useQuery } from "react-query";
import { bidManagementService } from "@/app/services/bid-management.service";
import { BidDetails } from "./components/BidDetails";
import { Skeleton } from "antd";

function BidManagementSubContractorPage() {
    const [selectedBid, setSelectedBid] = useState<IBidManagement | null>(null);

    const projectsQuery = useQuery(['bid-projects'], () => {
        return bidManagementService.httpGetOwnerProjects();
    });

    const invitedUserProjectsQuery = useQuery(['bid-projects'], () => {
        return bidManagementService.httpGetBidProjectInvitedUsers();
    });

    const projects = projectsQuery.data && projectsQuery.data.data ? projectsQuery.data.data?.projects : [];
    const invitedProjects = invitedUserProjectsQuery.data && invitedUserProjectsQuery.data.data ? invitedUserProjectsQuery.data.data?.projects : [];



    return <section className="mt-6 mb-[39px] md:ms-[69px] md:me-[59px] mx-4 ">
        <div className="flex gap-4 items-center">
            <Image src={'/home.svg'} alt="home icon" width={20} height={20} />
            <Image
                src={'/chevron-right.svg'}
                alt="chevron-right icon"
                width={16}
                height={16}
            />
            <Description title="Bid Management" className="font-base text-slateGray" />
            <Image
                src={'/chevron-right.svg'}
                alt="chevron-right icon"
                width={16}
                height={16}
            />

            <Description
                title="Find a project"
                className="font-semibold text-lavenderPurple cursor-pointer underline"
            />
        </div>

        <div className="p-5 rounded-lg bg-white mt-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                    <SenaryHeading
                        title="Find a project "
                        className="text-[#344054] text-[20px] leading-7 font-semibold" />

                    <SenaryHeading
                        title={` as Sub-Contractor`}
                        className="text-[#344054] text-[20px] leading-7 font-normal" />

                </div>

                <div className="flex-1 flex items-center justify-end  space-x-2">
                    <div className="!w-96">
                        <InputComponent
                            label=""
                            type="text"
                            placeholder="Search"
                            name="search"
                            prefix={<SearchOutlined size={20} />}
                        />
                    </div>
                    <WhiteButton
                        text="Export"
                        icon="/uploadcloud.svg"
                        className="!w-28"
                        iconwidth={14}
                        iconheight={14}
                    />
                    <WhiteButton
                        text="Advance Filters"
                        icon="/advance-filters.svg"
                        className="!w-44"
                        iconwidth={14}
                        iconheight={14}
                    />
                    <CustomButton
                        text="Post a Project"
                        icon="/plus.svg"
                        iconwidth={14}
                        iconheight={14}
                        className="!w-44"
                    />
                </div>
            </div>

            <div className="grid grid-cols-12 gap-3">
                <div className={`${selectedBid ? "col-span-8" : "col-span-12 "}`}>
                    <div className="my-3">
                        <SenaryHeading
                            title="Invited"
                            className="text-[#344054]  font-semibold text-[20px] leading-7"
                        />

                        {invitedUserProjectsQuery.isLoading ? <Skeleton /> :
                            invitedProjects.map(bidProject => {
                                return <BidIntro
                                    key={bidProject._id}
                                    bid={bidProject}
                                    onClick={() => setSelectedBid(bidProject)}
                                />
                            })}
                    </div>

                    <div className="mt-3">
                        <SenaryHeading
                            title="Explore all project"
                            className="text-[#344054]  font-semibold text-[20px] leading-7"
                        />

                        {projectsQuery.isLoading ? <Skeleton /> :
                            projects.filter(project => project.status !== 'draft').map(bidProject => {
                                return <BidIntro
                                    key={bidProject._id}
                                    bid={bidProject}
                                    onClick={() => setSelectedBid(bidProject)}
                                />
                            })}
                    </div>
                </div>

                {/* Side Modal */}
                {selectedBid ? <div className="col-span-4 py-[24px] px-[17px] rounded-lg mt-3 border border-[#E9E9EA]">
                    <BidDetails
                        bid={selectedBid}
                    />
                </div> : null}
            </div>
        </div>

    </section>
}

export default withAuth(BidManagementSubContractorPage);