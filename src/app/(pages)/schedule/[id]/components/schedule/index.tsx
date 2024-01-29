import CustomButton from "@/app/component/customButton/button";
import Description from "@/app/component/description";
import SecondaryHeading from "@/app/component/headings/Secondary";
import TertiaryHeading from "@/app/component/headings/tertiary";
import { useState } from "react";
import { CategoryModal } from "./Category";
import { IWBSType } from "./type";
import { DownOutlined, EditOutlined, MoreOutlined, RightOutlined, } from "@ant-design/icons";
import SenaryHeading from "@/app/component/headings/senaryHeading";
import { Collapse } from "antd";


export function Schedule() {
    const [materialModal, setMaterialModal] = useState(false);
    const [active, setActive] = useState<string | string[]>(['']);

    const [wbs, setWbs] = useState<Partial<IWBSType>>({
        category: undefined,
        subCategory: undefined,
    });

    function handleWbs(category: IWBSType['category'], subCategory: IWBSType['subCategory']) {
        setWbs({ category, subCategory });
    }

    console.log(active);

    return (
        <section>

            <CategoryModal
                materialModal={materialModal}
                setMaterialModal={setMaterialModal}
                handleWbs={handleWbs}
            />
            <div className=" flex items-center justify-between mt-4">
                <TertiaryHeading
                    title="Schedule"
                    className="text-lg tracking-wide"
                />
                <CustomButton
                    text="Add New WBS"
                    icon="/plus-yellow.svg"
                    iconheight={20}
                    iconwidth={20}
                    className="!w-44 !bg-white !text-[#EF9F28] !border-[#EF9F28]"
                    onClick={() => setMaterialModal(true)}
                />
            </div>
            <div className="mx-4 rounded-xl h-[calc(100vh-450px)]">
                {wbs.category && wbs.subCategory ? <div>
                    <Collapse
                        ghost
                        onChange={(key) => {
                            console.log(key);
                            setActive(key)
                        }}
                        items={[
                            {
                                key: '1',
                                label: <div className="flex items-center space-x-2">
                                    {Array.isArray(active) && active.includes('1') ?
                                        <DownOutlined className="text-obsidianBlack2 p-1 border rounded text-lg" />
                                        :
                                        <RightOutlined className="text-obsidianBlack2 p-1 border rounded text-lg" />
                                    }
                                    <div className="flex border justify-between w-1/4 px-4 rounded-full bg-[#F9FAFB] items-center">
                                        <SenaryHeading
                                            title={wbs.category.label}
                                            className="text-obsidianBlack2 font-semibold text-base tracking-wider"
                                        />
                                        <SecondaryHeading
                                            title={wbs.subCategory.label}
                                            className="text-obsidianBlack2 font-normal text-base"
                                        />
                                        <div className="space-x-1">
                                            <EditOutlined className="text-obsidianBlack2 border rounded bg-[#EAECF0] p-2 text-lg " />
                                            <MoreOutlined className="text-obsidianBlack2 border rounded bg-[#EAECF0] p-2 text-lg " />
                                        </div>
                                    </div>
                                </div>,
                                showArrow: false,
                                children: <div>
                                    Children
                                </div>
                            }
                        ]}
                    />
                </div>
                    :
                    <div className="mx-4 rounded-xl h-[calc(100vh-450px)] grid items-center">
                        <div className="grid place-items-center">
                            <div className="max-w-[500px] flex flex-col items-center p-4">
                                <SecondaryHeading
                                    title="Create your project Schedule"
                                    className="text-obsidianBlack2 mt-8"
                                />
                                <Description
                                    title="Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."
                                    className="text-steelGray text-center font-normal"
                                />
                                <CustomButton
                                    className="mt-7"
                                    text={"Create WBS"}
                                    onClick={() => setMaterialModal(true)}
                                />
                            </div>
                        </div>
                    </div>
                }
            </div>
        </section>

    )
}