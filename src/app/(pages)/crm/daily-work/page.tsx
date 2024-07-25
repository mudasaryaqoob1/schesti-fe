'use client';
import CustomButton from "@/app/component/customButton/button";
import WhiteButton from "@/app/component/customButton/white";
import { InputComponent } from "@/app/component/customInput/Input";
import { SelectComponent } from "@/app/component/customSelect/Select.component";
import TertiaryHeading from "@/app/component/headings/tertiary";
import { withAuth } from "@/app/hoc/withAuth";
import { SearchOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";

function DailyWorkPage() {
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('All');
    const inputFileRef = useRef<HTMLInputElement | null>(null);

    return (
        <section className="mt-6 mb-[39px] bg-white p-5  mx-4 rounded-xl ">
            <div className="flex justify-between items-center mb-3">
                <TertiaryHeading className={'mt-1 mb-2'} title="Daily Work Needed" />

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
                                className: '!py-2',
                            }}
                        />
                    </div>

                    <SelectComponent
                        label=""
                        name=""
                        placeholder="Priority"
                        field={{
                            options: []
                        }}
                    />
                    <SelectComponent
                        label=""
                        name=""
                        placeholder="Status"
                        field={{
                            value: status ? status : undefined,
                            options: [
                                { label: 'Active', value: 'active' },
                                { label: 'In Active', value: 'inactive' },
                                { label: 'All', value: 'all' },
                            ],
                            onChange: (value) => {
                                setStatus(value);
                            },
                            allowClear: true,
                            onClear() {
                                setStatus('');
                            },
                        }}
                    />

                    <div>
                        <WhiteButton
                            text="Export"
                            className="!w-fit !py-2.5"
                            icon="/download-icon.svg"
                            iconwidth={20}
                            iconheight={20}
                        />
                    </div>
                    <div>
                        <WhiteButton
                            text="Import"
                            className="!w-fit !py-2.5"
                            icon="/uploadcloud.svg"
                            iconwidth={20}
                            iconheight={20}
                            loadingText="Uploading..."
                        />
                        <input
                            ref={inputFileRef}
                            accept=".csv, .xlsx"
                            type="file"
                            name=""
                            id="importClients"
                            className="hidden"

                        />
                    </div>

                    {/* <div>
                        <WhiteButton
                            text="Invite"
                            className="!border-schestiPrimary !text-schestiPrimary"
                        />
                    </div> */}
                    <CustomButton
                        text="Add New Lead"
                        className="!w-fit !py-2.5"
                        icon="/plus.svg"
                        iconwidth={20}
                        iconheight={20}

                    />
                </div>
            </div>

        </section>
    );
}

export default withAuth(DailyWorkPage)