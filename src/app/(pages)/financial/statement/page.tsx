'use client';

import CustomButton from '@/app/component/customButton/button';
import PrimaryHeading from '@/app/component/headings/primary';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { withAuth } from '@/app/hoc/withAuth';
import { CurrentAssetTable } from './components/assets/CurrentAssetTable';
import { LongTermAssetTable } from './components/assets/LongTermAssets';
import { AccumulatedDepreciationTable } from './components/assets/AccumulatedDepreciation';
import { AssetTotal } from './components/assets/AssetTotal';
import { CurrentLiabilitiesTable } from './components/liabilities/CurrentLiabilities';
import { LongTermLiabilitiesTable } from './components/liabilities/LongTermLiabilities';
import { EquityTable } from './components/equity/EquityTable';
import { OperatingIncomeTable } from './components/income-statement/OperatingIncomeTable';
import { DirectExpenseTable } from './components/income-statement/DirectExpenseTable';
import { OverheadExpenseTable } from './components/income-statement/OverheadExpense';
import { DatePicker, Skeleton } from 'antd';
import { IFinancialStatementState } from './types';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import financialStatement from '@/app/services/financial/financial-statement';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

function FinancialStatementPage() {
  const [dates, setDates] = useState({
    start: new Date(),
    end: new Date(),
  })

  const [data, setData] = useState({});

  const [loading, setLoading] = useState(false);


  useEffect(() => {
    getFinancialStatement();
  }, [dates]);

  async function getFinancialStatement() {
    setLoading(true);
    try {
      const response = await financialStatement.httpGetAllFinancialStatements(
        dates.start,
        dates.end
      );
      if (response.data) {
        setData(response.data);
      }
    }
    catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message);
    }
    finally {
      setLoading(false);
    }
  }



  const formik = useFormik<IFinancialStatementState>({
    initialValues: {
      assets: {
        cashClearing: 50.0,
        startUpInventory: 0.0,

        accumulatedDepreciationVehicle: 0.0,
        totalAccumulatedDepreciation: 0.0,
      },
      liabilities: {
        healthInsurancePayable: 0.0,
        shareHoldersPayable: 0.0,
        totalLongTermLiabilities: 0.0,
        statePayrollTaxesPayable: 0.0,
      },

      equity: {
        capitalStock: 0.0,
        otherPaidInCapital: 0.0,
        retainedEarnings: 0.0,
      }
    },
    onSubmit() {

    },
  })

  if (loading) {
    return <div className='grid grid-cols-2 gap-3'>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  }

  return (
    <section className="mt-6  space-y-4 mb-[39px] mx-4 rounded-xl bg-white p-5">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <PrimaryHeading title="Financial Statement" className="text-[20px]" />

          <DatePicker.RangePicker
            className='border-none'
          />
        </div>

        <CustomButton text="Print Statement" className="!w-fit" />
      </div>

      {/* Assets */}
      <div className="p-4 border space-y-2 rounded-md">
        <TertiaryHeading title="Assets" />
        <CurrentAssetTable
          formik={formik}
        />
        <LongTermAssetTable />
        <AccumulatedDepreciationTable
          formik={formik}
        />
        <AssetTotal />
      </div>

      {/* LiabILITIES */}

      <div className="p-4 border space-y-2 rounded-md">
        <TertiaryHeading title="Liabilities" />

        <CurrentLiabilitiesTable
          formik={formik}
        />
        <LongTermLiabilitiesTable formik={formik} />
      </div>

      <div className="p-4 border space-y-2 rounded-md">
        <TertiaryHeading title="Equity" />

        <EquityTable formik={formik} />

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


        <OverheadExpenseTable />

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
