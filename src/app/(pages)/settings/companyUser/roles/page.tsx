'use client';

import CustomButton from "@/app/component/customButton/button";
import VerticleBar from "../../verticleBar";
import TertiaryHeading from "@/app/component/headings/tertiary";
import { InputComponent } from "@/app/component/customInput/Input";
import { planFeatureOptions } from "@/app/utils/plans.utils";
import { Checkbox } from "antd";

export default function NewCompanyRole() {
    return <VerticleBar>
        <div className="w-full">
            <div className="flex w-full justify-between items-center">
                <div>
                    <TertiaryHeading title="Contractor" className="text-schestiPrimaryBlack text-2xl font-semibold" />
                    <p className="text-schestiLightBlack font-normal text-[14px] leading-6 ">Manage your company roles</p>
                </div>

                <CustomButton
                    text="Create new role"
                    icon="/plus.svg"
                    iconwidth={20}
                    iconheight={20}
                    className="!w-fit"
                />
            </div>

            <div className="bg-snowWhite rounded-2xl mt-4 shadow-instentWhite py-5 px-6">

                <div className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-4">
                        <InputComponent
                            label="Role Name"
                            name="name"
                            placeholder="Enter Role Name"
                            type="text"
                        />
                    </div>
                    <div className="col-span-2 pt-5">
                        <p className="text-schestiPrimaryBlack font-medium text-[14px] leading-6">
                            Created At: <span className="text-schestiLightBlack">2023/10/06</span>
                        </p>
                    </div>
                </div>


                <div className="p-5 mt-6 border border-schestiLightGray rounded-md">
                    <p className="text-[14px] text-schestiLightBlack leading-5">Select permission/access for this role</p>

                    <div className="grid mt-3 grid-cols-3 gap-3">
                        {planFeatureOptions.map(plan => {
                            return <Checkbox className="text-schestiPrimaryBlack font-normal" key={plan.label}>
                                {plan.label}
                            </Checkbox>
                        })}
                    </div>
                </div>

            </div>
        </div>
    </VerticleBar>

}