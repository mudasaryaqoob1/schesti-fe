'use client';
import { InputComponent } from "@/app/component/customInput/Input";
import Description from "@/app/component/description";
import QuaternaryHeading from "@/app/component/headings/quaternary";
import SenaryHeading from "@/app/component/headings/senaryHeading";
import { withAuth } from "@/app/hoc/withAuth"
import { SearchOutlined } from "@ant-design/icons";
import { ConfigProvider, Tabs } from "antd";
import Image from "next/image";
import { useState } from "react";
import { ActiveProjects } from "./components/ActiveProjects";
import { UpComingProjects } from "./components/UpComingProjects";
import { ArchivedProjects } from "./components/ArchivedProjects";
import { SelectComponent } from "@/app/component/customSelect/Select.component";

const ACTIVE = "Active";
const UPCOMING = "Upcoming";
const ARCHIVED = "Archived";


function SubContractorBidsPage() {
    const [activeTab, setActiveTab] = useState(ACTIVE);


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
                title="Bidding Projects"
                className="font-semibold text-lavenderPurple cursor-pointer underline"
            />
        </div>

        <div className="p-5 shadow-lg rounded-lg bg-white mt-5">
            <ConfigProvider
                theme={{
                    components: {
                        Tabs: {
                            inkBarColor: '#8449EB',
                        },
                    },
                }}
            >
                <Tabs
                    onChange={(key) => {
                        setActiveTab(key);
                    }}
                    activeKey={activeTab}
                    items={[ACTIVE, UPCOMING, ARCHIVED].map((tab) => ({
                        key: tab,
                        label: (
                            <QuaternaryHeading
                                title={tab}
                                className={`${activeTab === tab ? 'text-RoyalPurple' : 'text-black'
                                    }`}
                            />
                        ),
                        tabKey: tab,
                        children: <div>
                            <div className="flex items-center justify-between ">
                                <SenaryHeading
                                    title={`${tab} Projects`}
                                    className="text-[#344054] text-[20px] leading-7 font-semibold" />
                                <div className="flex-1 flex items-center justify-end space-x-2">
                                    <div className="!w-96">
                                        <InputComponent
                                            label=""
                                            type="text"
                                            placeholder="Search"
                                            name="search"
                                            prefix={<SearchOutlined size={20} />}
                                        />
                                    </div>
                                    {activeTab === UPCOMING ? <SelectComponent
                                        label=""
                                        placeholder="Status"
                                        name="status"
                                    /> : null}
                                </div>
                            </div>

                            {activeTab === ACTIVE ? <ActiveProjects /> : activeTab === UPCOMING ? <UpComingProjects /> : <ArchivedProjects />}
                        </div>,
                    }))}
                />
            </ConfigProvider>
        </div>
    </section>
}

export default withAuth(SubContractorBidsPage)