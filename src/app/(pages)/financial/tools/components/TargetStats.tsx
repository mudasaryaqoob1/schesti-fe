import QuaternaryHeading from '@/app/component/headings/quaternary';
import SenaryHeading from '@/app/component/headings/senaryHeading';
import { IResponseInterface } from '@/app/interfaces/api-response.interface';
import { IClientInvoice } from '@/app/interfaces/client-invoice.interface';
import { ISettingTarget } from '@/app/interfaces/companyInterfaces/setting.interface';
import { USCurrencyFormat } from '@/app/utils/format';
import { Badge, Progress, Select, Skeleton } from 'antd';
import _ from 'lodash';
import { useState } from 'react';
import { UseQueryResult } from 'react-query';
// import { completedTargets, remainingTargets, targetPercentage, totalCompletedAmount, totalRemainingAmount } from "../utils"
// import moment from "moment"

type Props = {
  targetsQuery: UseQueryResult<IResponseInterface<ISettingTarget[]>, unknown>;
  clientInvoiceQuery: UseQueryResult<
    IResponseInterface<{
      invoices: IClientInvoice[];
    }>,
    unknown
  >;
};
export function TargetStats({ targetsQuery, clientInvoiceQuery }: Props) {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  if (targetsQuery.isLoading || clientInvoiceQuery.isLoading) {
    return <Skeleton />;
  }
  const invoices = clientInvoiceQuery.data
    ? clientInvoiceQuery.data.data!.invoices
    : [];
  const targets = targetsQuery.data
    ? targetsQuery.data.data!.filter(
        (target) => parseInt(target.year) === selectedYear
      )
    : [];
  // const completed = completedTargets(targets, invoices);

  // const remaining = remainingTargets(targets, invoices);
  // const percentage = targetPercentage(completed.length, targets.length);

  // const completedAmount = totalCompletedAmount(completed)
  // const remainingAmount = totalRemainingAmount(remaining);

  // console.log({ completed, remaining });
  const filteredInvoices = invoices.filter(
    (invoice) =>
      new Date(invoice.applicationDate).getFullYear() === selectedYear
  );

  // Step 2: Calculate total amount of invoices for the desired year
  const totalAmountInvoices = filteredInvoices.reduce(
    (total, invoice) => total + invoice.totalAmount,
    0
  );

  // Step 3: Filter targets for the desired year
  const filteredTargets = targets.filter(
    (target) => parseInt(target.year) === selectedYear
  );

  // Step 4: Calculate total price of targets for the desired year
  const totalPriceTargets = filteredTargets.reduce(
    (total, target) => total + parseFloat(target.price),
    0
  );

  // Step 5: Calculate percentage completed
  const percentageCompleted = (totalAmountInvoices / totalPriceTargets) * 100;

  // Step 6: Calculate remaining targets
  const remainingTargets = totalPriceTargets - totalAmountInvoices;
  const completedTargets = Math.min(totalAmountInvoices, totalPriceTargets);
  let targetsYear = _.uniq(targets.map((target) => target.year)).map(
    (year) => ({ label: `Year ${year}`, value: year })
  );
  return (
    <div className="col-span-12 md:col-span-4 space-y-4 shadow bg-white p-4 rounded-md">
      <div className="flex justify-between items-center">
        <QuaternaryHeading
          title="Target Stats"
          className="text-[#344054] font-semibold"
        />
        <Select
          placeholder="Choose Year"
          options={targetsYear}
          value={selectedYear}
          onChange={(value) => setSelectedYear(value)}
          className="w-40"
        />
      </div>
      <div className="flex justify-center">
        <Progress
          showInfo
          type="dashboard"
          strokeColor={'#007AB6'}
          strokeWidth={12}
          size={200}
          percent={Number(percentageCompleted.toFixed(2))}
        />
      </div>
      <div className="flex justify-between items-center">
        <Badge color="#0074D9" status="default" text="Completed" />
        <SenaryHeading title={USCurrencyFormat.format(completedTargets)} />
      </div>
      <div className="flex justify-between items-center">
        <Badge status="warning" text="Remaining" />
        <SenaryHeading title={USCurrencyFormat.format(remainingTargets)} />
      </div>
    </div>
  );
}
