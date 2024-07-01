'use client';
import CustomButton from "@/app/component/customButton/button";
import WhiteButton from "@/app/component/customButton/white";
import { InputComponent } from "@/app/component/customInput/Input";
import TertiaryHeading from "@/app/component/headings/tertiary";
import { withAuth } from "@/app/hoc/withAuth";
import { useRouterHook } from "@/app/hooks/useRouterHook";
import { Routes } from "@/app/utils/plans.utils";
import { bg_style } from "@/globals/tailwindvariables";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

function VendorsPage() {
    const [search, setSearch] = useState('');
    const router = useRouterHook();


    return <section className="mt-6 mb-[39px]  mx-4 rounded-xl ">
        <div className={`${bg_style} p-5 border border-solid border-silverGray`}>
            <div className="flex justify-between items-center mb-4">
                <TertiaryHeading title="Vendors List" className="text-graphiteGray" />
                <div className=" flex items-center space-x-3">
                    <div className="w-96">
                        <InputComponent
                            label=""
                            type="text"
                            placeholder="Search"
                            name="search"
                            prefix={<SearchOutlined />}
                            field={{
                                type: 'text',
                                value: search,
                                onChange: (e: any) => {
                                    setSearch(e.target.value);
                                },
                            }}
                        />
                    </div>
                    <div>
                        <WhiteButton
                            text='Export'
                            className='!w-fit'
                            icon='/download-icon.svg'
                            iconwidth={20}
                            iconheight={20}
                        />
                    </div>
                    <div>
                        <WhiteButton
                            text='Import'
                            className='!w-fit'
                            icon='/uploadcloud.svg'
                            iconwidth={20}
                            iconheight={20}

                            loadingText='Uploading...'
                        />
                        <input
                            accept='.csv, .xlsx'
                            type="file"
                            name=""
                            id="importClients"
                            className='hidden'
                        />
                    </div>

                    <div>
                        <WhiteButton
                            text="Invite"
                            className="!border-schestiPrimary !text-schestiPrimary"
                        />
                    </div>
                    <CustomButton
                        text="Add New Vendor"
                        className="!w-48"
                        icon="/plus.svg"
                        iconwidth={20}
                        iconheight={20}
                        onClick={() => router.push(`${Routes.CRM.Vendors}/create`)}
                    />
                </div>
            </div>

        </div>
    </section>
}

export default withAuth(VendorsPage)