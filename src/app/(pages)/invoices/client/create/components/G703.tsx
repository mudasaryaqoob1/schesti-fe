import { Divider, Select } from "antd";

import CustomButton from "@/app/component/customButton/button";
import WhiteButton from "@/app/component/customButton/white";
import PrimaryHeading from "@/app/component/headings/primary";
import QuaternaryHeading from "@/app/component/headings/quaternary";
import React from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

export function G703Component() {



    return <section>
        <div className="flex justify-between items-center">
            <div>
                <QuaternaryHeading title="AIA Document G703, - 1992" />
                <PrimaryHeading title="Continuation Sheet"
                    className="font-normal"
                />
            </div>
            <div>
                <Select
                    placeholder="Select Previous Phase"
                    options={[
                        { value: 'phase1', label: 'Phase 1' },
                        { value: 'phase2', label: 'Phase 2' },
                        { value: 'phase3', label: 'Phase 3' },
                    ]}
                    style={{ width: 250 }}
                    size="large"
                />
            </div>

        </div>
        <Divider className="!mt-6 !m-0" />

        <div className="flex justify-between">
            <div>
                <QuaternaryHeading title={`AIA Document G702, APPLICATION AND CERTIFICATION FOR PAYMENT, containing
                                        Contractor's signed certification is attached.

                                        In tabulations below, amounts are stated to the nearest dollar.
                                        
                                        Use Column I on Contracts where variable retainage for line items may apply.`}

                    className="max-w-2xl" />
            </div>

            <div className="flex flex-col p-4 space-y-3 bg-white flex-1">
                <div className="flex self-end space-x-3 items-center">
                    <label className="text-right text-graphiteGray font-normal" htmlFor="application-date">
                        APPLICATION NO:
                    </label>
                    <input
                        id="application-date"
                        className="px-2 py-1 border border-gray-300"
                        type="text"
                    />
                </div>
                <div className="flex self-end space-x-3 items-center">
                    <label className="text-right text-graphiteGray font-normal" htmlFor="application-date">
                        APPLICATION DATE:
                    </label>
                    <input
                        id="application-date"
                        className="px-2 py-1 border border-gray-300"
                        type="text"
                    />
                </div>
                <div className="flex self-end space-x-3 items-center">
                    <label className="text-right text-graphiteGray font-normal" htmlFor="application-date">
                        PERIOD TO:
                    </label>
                    <input
                        id="application-date"
                        className="px-2 py-1 border border-gray-300"
                        type="text"
                    />
                </div>
                <div className="flex self-end space-x-3 items-center">
                    <label className="text-right text-graphiteGray font-normal" htmlFor="application-date">
                        PROJECT NO:
                    </label>
                    <input
                        id="application-date"
                        className="px-2 py-1 border border-gray-300"
                        type="text"
                    />
                </div>
            </div>
        </div >

        <div className="flex justify-end space-x-4">
            <WhiteButton
                text="Cancel"
                className="!w-40"
            />
            <CustomButton
                text="Next"
                className="!w-40"

            />

        </div>
    </section >
}