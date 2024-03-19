'use client'
import Description from "@/app/component/description"
import { withAuth } from "@/app/hoc/withAuth"
import { ConfigProvider, Steps, type StepsProps } from "antd"
import Image from "next/image"
import { useState } from "react"
import { PostBasicInformation } from "./components/BasicInformation"
import { PostProjectFooter } from "./components/Footer"

function StaticTime() {
    return <div className="flex items-center space-x-2">
        <Image
            src={'/clock.svg'}
            height={10}
            width={10}
            alt="clock"
        />
        <Description
            title="3 Minutes"
            className="text-[#98A2B3] text-xs"
        />
    </div>
}
let stepItems: StepsProps['items'] = [
    {
        title: <h4>Basic Information</h4>,
        description: <StaticTime />,
        className: "mt-5"
    },
    {
        title: <h4>Project Details</h4>,
        description: <StaticTime />,
        className: "mt-5"
    },
    {
        title: <h4>Team</h4>,
        description: <StaticTime />,
        className: "mt-5"
    },
    {
        title: <h4>Trades</h4>,
        description: <StaticTime />,
        className: "mt-5"
    },
    {
        title: <h4>Project file</h4>,
        description: <StaticTime />,
        className: "mt-5"
    },
    {
        title: <h4>Finalize</h4>,
        description: <StaticTime />,
        className: "mt-5"
    },
]

function CreatePost() {
    const [current, setCurrent] = useState(0);

    const nextStep = () => {
        setCurrent(current + 1);
    };

    const prevStep = () => {
        setCurrent(current - 1);
    };


    return <section className="mt-6 mb-[39px] md:ms-[69px] md:me-[59px] mx-4 rounded-xl ">

        <div className="flex gap-4 items-center">
            <Image src={'/home.svg'} alt="home icon" width={20} height={20} />
            <Image
                src={'/chevron-right.svg'}
                alt="chevron-right icon"
                width={16}
                height={16}
            />
            <Description title="Project" className="font-base text-slateGray" />
            <Image
                src={'/chevron-right.svg'}
                alt="chevron-right icon"
                width={16}
                height={16}
            />

            <Description
                title="Post Project"
                className="font-semibold text-lavenderPurple cursor-pointer underline"
            />
        </div>


        <div className="grid grid-cols-12 gap-16 mt-5">
            <div className="col-span-3 shadow-2xl border rounded-xl p-4">
                <ConfigProvider
                    theme={{
                        components: {
                            Steps: {
                                dotSize: 18,
                                dotCurrentSize: 18,
                                colorPrimary: '#6941C6',
                                colorText: '#6941C6',
                                fontWeightStrong: 600,
                                fontSize: 16,
                                lineHeight: 16
                            },
                        },
                    }}
                >
                    <Steps
                        progressDot
                        current={0}
                        direction="vertical"
                        size="default"
                        items={stepItems}
                    />
                </ConfigProvider>
            </div>
            <div className="col-span-9">
                <PostBasicInformation >
                    <PostProjectFooter
                        cancelButton={{
                            text: "Cancel",
                            onClick() {

                            }
                        }}
                        submitButton={{
                            onClick() {

                            },
                            text: "Next Step"
                        }}
                        info={{
                            title: `0% Completed`,
                            description: "Welcome to the project post screens"
                        }}
                    />
                </PostBasicInformation>
            </div>
        </div>
    </section>
}

export default withAuth(CreatePost)