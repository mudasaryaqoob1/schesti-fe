'use client';
import CustomButton from "@/app/component/customButton/button";
import WhiteButton from "@/app/component/customButton/white";
import { InputComponent } from "@/app/component/customInput/Input";
import TertiaryHeading from "@/app/component/headings/tertiary";
import { withAuth } from "@/app/hoc/withAuth"
import { SearchOutlined } from "@ant-design/icons";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import dummydata from './data.json';
import { useRouter } from "next/navigation";
import { Routes } from "@/app/utils/plans.utils";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { resetPostProjectAction } from "@/redux/post-project/post-project.slice";

function Page() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const columns: ColumnsType<typeof dummydata[0]> = [
        {
            key: "project",
            dataIndex: "project",
            title: "Project",
        },
        {
            key: "bid-date",
            dataIndex: "bid-date",
            title: "Bid Date",
        },
        {
            key: "location",
            dataIndex: "location",
            title: "Location",
        },
        {
            key: "stage",
            dataIndex: "stage",
            title: "Stage",
        },
        {
            key: "status",
            dataIndex: "status",
            title: "Status",
            render(value) {
                if (value === 'active') {
                    return <Tag className="rounded-full" color="green">
                        Active
                    </Tag>
                }
                if (value === 'draft') {
                    return <Tag className="rounded-full" color="#F8F9FC" style={{ color: "#363F72" }}>
                        Draft
                    </Tag>
                }
                return <Tag className="rounded-full" color="#ECF2FF" style={{ color: "#026AA2" }}>
                    Expired
                </Tag>
            },
            filters: [
                {
                    text: 'Active',
                    value: 'active'
                },
                {
                    text: 'Draft',
                    value: 'draft'
                },
                {
                    text: 'Expired',
                    value: 'expired'
                }
            ],
            // @ts-ignore
            onFilter: (value: string, record) => record.status.startsWith(value),
            filterSearch: true,
        }
    ]

    return <section className="mt-6 mb-[39px] md:ms-[69px] md:me-[59px] mx-4 rounded-xl bg-white shadow-xl px-8 py-9">
        <div className="flex justify-between items-center">
            <TertiaryHeading
                title="My posted project"
                className="text-xl leading-7"
            />
            <div className="flex-1 flex items-center space-x-4 justify-end ">
                <div className="!w-96">
                    <InputComponent
                        label=""
                        type="text"
                        placeholder="Search"
                        name="search"
                        prefix={<SearchOutlined />}
                        field={{
                            type: 'text',
                        }}
                    />
                </div>
                <WhiteButton
                    text="Export"
                    icon="/uploadcloud.svg"
                    iconheight={20}
                    className="!w-32"
                    iconwidth={20}
                />
                <CustomButton
                    icon="/plus.svg"
                    className="!w-48"
                    iconheight={20}
                    iconwidth={20}
                    text="Post New Project"
                    onClick={() => {
                        dispatch(resetPostProjectAction());
                        router.push(`${Routes["Bid Management"].Owner}/post`);
                    }}
                />
            </div>
        </div>


        <div className="mt-10">
            <Table
                columns={columns}
                dataSource={dummydata}
            />
        </div>
    </section>
}

export default withAuth(Page);