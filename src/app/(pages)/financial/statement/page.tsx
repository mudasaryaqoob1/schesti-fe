'use client';

import CustomButton from "@/app/component/customButton/button";
import PrimaryHeading from "@/app/component/headings/primary";
import SenaryHeading from "@/app/component/headings/senaryHeading";
import TertiaryHeading from "@/app/component/headings/tertiary";
import { withAuth } from "@/app/hoc/withAuth"
import { CurrentAssetTable } from "./components/assets/CurrentAssetTable";
import { LongTermAssetTable } from "./components/assets/LongTermAssets";
import { AccumulatedDepreciationTable } from "./components/assets/AccumulatedDepreciation";
import { AssetTotal } from "./components/assets/AssetTotal";
import { CurrentLiabilitiesTable } from "./components/liabilities/CurrentLiabilities";
import { LongTermLiabilitiesTable } from "./components/liabilities/LongTermLiabilities";
import { TotalLiabilities } from "./components/liabilities/TotalLiabilities";

function FinancialStatementPage() {
    return <section className="mt-6  space-y-4 mb-[39px] mx-4 rounded-xl bg-white p-5">
        <div className="flex justify-between items-center">

            <div className="flex items-center space-x-4">
                <PrimaryHeading
                    title="Financial Statement"
                    className="text-[20px]"
                />

                <SenaryHeading
                    title="From January 1, 2024 to June 30, 2024"
                    className="text-schestiLightBlack"
                />
            </div>

            <CustomButton
                text="Print Statement"
                className="!w-fit"
            />

        </div>

        {/* Assets */}
        <div className="p-4 border space-y-2 rounded-md">
            <TertiaryHeading
                title="Assets"
            />
            <CurrentAssetTable />
            <LongTermAssetTable />
            <AccumulatedDepreciationTable />
            <AssetTotal />
        </div>

        {/* LiabILITIES */}

        <div className="p-4 border space-y-2 rounded-md">
            <TertiaryHeading
                title="Liabilities"
            />

            <CurrentLiabilitiesTable />
            <LongTermLiabilitiesTable />
            <TotalLiabilities />
        </div>
    </section>
}


export default withAuth(FinancialStatementPage)