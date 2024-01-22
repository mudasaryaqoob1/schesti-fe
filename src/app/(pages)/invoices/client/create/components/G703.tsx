'use client'
import React, { } from "react";
import { Divider, Select } from "antd";
import { HotTable, } from '@handsontable/react';
import { } from 'handsontable';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import { HyperFormula } from 'hyperformula';


import CustomButton from "@/app/component/customButton/button";
import WhiteButton from "@/app/component/customButton/white";
import PrimaryHeading from "@/app/component/headings/primary";
import QuaternaryHeading from "@/app/component/headings/quaternary";
import { G703Row } from "../utils";


// register Handsontable's modules
registerAllModules();

type Props = {
    data: Array<G703Row>,
    addRow: () => void,
    getCalculatedRows: () => G703Row
}
export function G703Component({ addRow, data, getCalculatedRows }: Props) {

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
                        className="px-2 py-1 border border-gray-300 outline-none"
                        type="text"
                    />
                </div>
                <div className="flex self-end space-x-3 items-center">
                    <label className="text-right text-graphiteGray font-normal" htmlFor="application-date">
                        APPLICATION DATE:
                    </label>
                    <input
                        id="application-date"
                        className="px-2 py-1 border border-gray-300 outline-none"
                        type="text"
                    />
                </div>
                <div className="flex self-end space-x-3 items-center">
                    <label className="text-right text-graphiteGray font-normal" htmlFor="application-date">
                        PERIOD TO:
                    </label>
                    <input
                        id="application-date"
                        className="px-2 py-1 border border-gray-300 outline-none"
                        type="text"
                    />
                </div>
                <div className="flex self-end space-x-3 items-center">
                    <label className="text-right text-graphiteGray font-normal" htmlFor="application-date">
                        PROJECT NO:
                    </label>
                    <input
                        id="application-date"
                        className="px-2 py-1 border border-gray-300 outline-none"
                        type="text"
                    />
                </div>
            </div>
        </div >

        {/* Spreadsheet */}
        <div className="px-4">
            <HotTable
                data={[
                    ...data,
                    getCalculatedRows()]}
                colWidths={[50, 50, 100, 50, 100, 50, 50]}
                nestedHeaders={[
                    ['Description of work', 'Scheduled value', { label: 'Work Completed', colspan: 2 }, 'MATERIALS PRESENTLY STORED (NOT IN D OR E)', { label: 'Work Completed', colspan: 2 }, "BALANCE (C - G)", "RETAINAGE (IF VARIABLE RATE) 5%"],
                    ['', '', 'From previous application (D+E)', 'This period', '', 'TOTAL COMPLETED AND STORED TO DATE (D+E+F)', '% (G ÷ C)', '', ""],
                ]}
                formulas={{
                    engine: HyperFormula,
                }}
                licenseKey="non-commercial-and-evaluation"
                rowHeaders={true}
                colHeaders={true}
                height="auto"
                autoWrapRow={true}
                autoWrapCol={true}
                contextMenu={
                    {
                        items: [
                            {
                                "name": "Add Row",
                                callback() {
                                    addRow();
                                },

                            }
                        ]
                    }
                }
                className="clientTable"
            />
        </div>
        {/* END Spreadsheet */}

        <div className="flex justify-end space-x-4 mt-2">
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