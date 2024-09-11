'use client';

import CustomButton from '@/app/component/customButton/button';
import PrimaryHeading from '@/app/component/headings/primary';
import SenaryHeading from '@/app/component/headings/senaryHeading';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { withAuth } from '@/app/hoc/withAuth';
import { CurrentAssetTable } from './components/assets/CurrentAssetTable';
import { LongTermAssetTable } from './components/assets/LongTermAssets';
import { AccumulatedDepreciationTable } from './components/assets/AccumulatedDepreciation';
import { AssetTotal } from './components/assets/AssetTotal';
import { CurrentLiabilitiesTable } from './components/liabilities/CurrentLiabilities';
import { LongTermLiabilitiesTable } from './components/liabilities/LongTermLiabilities';
import { TotalLiabilities } from './components/liabilities/TotalLiabilities';
import { EquityTable } from './components/equity/EquityTable';
import { TotalEquity } from './components/equity/TotalEquity';
import { OperatingIncomeTable } from './components/income-statement/OperatingIncomeTable';
import { DirectExpenseTable } from './components/income-statement/DirectExpenseTable';
import { TotalExpense } from './components/income-statement/TotalExpense';
import { OverheadExpenseTable } from './components/income-statement/OverheadExpense';
import { TotalIndirectExpense } from './components/income-statement/TotalndirectExpense';

function FinancialStatementPage() {
  return (
    <section className="mt-6  space-y-4 mb-[39px] mx-4 rounded-xl bg-white p-5">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <PrimaryHeading title="Financial Statement" className="text-[20px]" />

          <SenaryHeading
            title="From January 1, 2024 to June 30, 2024"
            className="text-schestiLightBlack"
          />
        </div>

        <CustomButton text="Print Statement" className="!w-fit" />
      </div>

      {/* Assets */}
      <div className="p-4 border space-y-2 rounded-md">
        <TertiaryHeading title="Assets" />
        <CurrentAssetTable />
        <LongTermAssetTable />
        <AccumulatedDepreciationTable />
        <AssetTotal />
      </div>

      {/* LiabILITIES */}

      <div className="p-4 border space-y-2 rounded-md">
        <TertiaryHeading title="Liabilities" />

        <CurrentLiabilitiesTable />
        <LongTermLiabilitiesTable />
        <TotalLiabilities />
      </div>

      <div className="p-4 border space-y-2 rounded-md">
        <TertiaryHeading title="Equity" />

        <EquityTable />
        <TotalEquity />
      </div>

      {/* Current  profit or loss */}

      <div className="p-4 rounded-sm bg-schestiLightGray ">
        <div className="flex space-y-3 flex-col justify-center  ml-20">
          <div className="grid grid-cols-5">
            <TertiaryHeading
              title="Current Profit (Loss)"
              className=" font-medium text-base"
            />
            <TertiaryHeading title="$4000.12" className=" text-base" />
          </div>

          <div className="grid grid-cols-5">
            <TertiaryHeading
              title="Total Equity/Capital"
              className=" font-medium text-base"
            />
            <TertiaryHeading title="$4000.12" className=" text-base" />
          </div>

          <div className="grid grid-cols-5">
            <TertiaryHeading
              title="Total Liabilities & Equity"
              className=" font-medium text-base"
            />
            <TertiaryHeading title="$4000.12" className=" text-base" />
          </div>
        </div>
      </div>

      {/* Income Statement */}
      <div className="p-4 border space-y-2 rounded-md">
        <TertiaryHeading title="Income Statement Jan-Jun 2023" />
        <OperatingIncomeTable />
        <DirectExpenseTable />
        <TotalExpense />

        <OverheadExpenseTable />
        <TotalIndirectExpense />
      </div>

      {/*  NET  Income  */}
      <div className="p-4 rounded-sm bg-schestiLightGray ">
        <div className="flex space-y-3 flex-col justify-center  ml-20">
          <div className="grid grid-cols-5">
            <TertiaryHeading
              title="Net Income  before Tax"
              className=" font-medium text-base"
            />
            <TertiaryHeading title="$4000.12" className=" text-base" />
          </div>

          <div className="grid grid-cols-5">
            <TertiaryHeading
              title="Net Income"
              className=" font-medium text-base"
            />
            <TertiaryHeading title="$4000.12" className=" text-base" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default withAuth(FinancialStatementPage);
