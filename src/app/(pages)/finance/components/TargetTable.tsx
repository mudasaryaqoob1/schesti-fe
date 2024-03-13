import CustomButton from '@/app/component/customButton/button';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import QuinaryHeading from '@/app/component/headings/quinary';
import { IResponseInterface } from '@/app/interfaces/api-response.interface';
import { IClientInvoice } from '@/app/interfaces/client-invoice.interface';
import { ISettingTarget } from '@/app/interfaces/companyInterfaces/setting.interface';
import { USCurrencyFormat } from '@/app/utils/format';
import { Select, Skeleton } from 'antd';
import Table, { type ColumnsType } from 'antd/es/table';
import { UseQueryResult } from 'react-query';
import _ from 'lodash';
import { useState } from 'react';
import { totalReceivable } from '../utils';

type Props = {
  targetsQuery: UseQueryResult<IResponseInterface<ISettingTarget[]>, unknown>;
  clientInvoiceQuery: UseQueryResult<
    IResponseInterface<{
      invoices: IClientInvoice[];
    }>,
    unknown
  >;
};
type Option = {
  label: string;
  value: string;
};

export function TargetTable({ clientInvoiceQuery, targetsQuery }: Props) {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  if (clientInvoiceQuery.isLoading || targetsQuery.isLoading) {
    return <Skeleton />;
  }

  const invoices = clientInvoiceQuery.data
    ? clientInvoiceQuery.data.data!.invoices
    : [];
  const targets = targetsQuery.data ? targetsQuery.data.data! : [];

  const columns: ColumnsType<ISettingTarget> = [
    {
      title: 'Month',
      dataIndex: 'month',
    },
    {
      title: 'Receivable',
      dataIndex: 'month',
      render(_value, record) {
        return USCurrencyFormat.format(totalReceivable(record, invoices));
      },
    },
    {
      title: 'Target',
      dataIndex: 'price',
      render(value) {
        return USCurrencyFormat.format(value);
      },
    },
    {
      title: 'Target %',
      render(_value, record) {
        return `${((totalReceivable(record, invoices) / Number(record.price)) * 100).toFixed(2)}%`;
      },
    },
  ];

  let targetsYear = _.uniq(targets.map((target) => target.year)).map(
    (year) => ({ label: `Year ${year}`, value: year })
  );
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
    (target) => parseInt(target.year) === 2024
  );

  // Step 4: Calculate total price of targets for the desired year
  const totalPriceTargets = filteredTargets.reduce(
    (total, target) => total + parseFloat(target.price),
    0
  );

  // Step 6: Calculate remaining targets
  const remainingTargets = totalPriceTargets - totalAmountInvoices;

  return (
    <div className="shadow space-y-4 bg-white p-4 rounded-md my-3">
      <div className="flex items-center">
        <QuaternaryHeading
          title="Target Table"
          className="!text-[#344054] font-semibold"
        />
        <div className="flex flex-1 space-x-5 justify-end items-center">
          <QuinaryHeading title="Back log" className="text-[#868686]" />
          <QuinaryHeading
            title={USCurrencyFormat.format(remainingTargets)}
            className="text-[#7F56D9]"
          />
          <Select
            placeholder="Choose Year"
            options={targetsYear as Option[]}
            value={selectedYear}
            onChange={(value) => setSelectedYear(value)}
            className="w-40"
          />
          <CustomButton text="Download" className="!w-44 !py-2" />
        </div>
      </div>
      <Table
        loading={false}
        columns={columns}
        dataSource={targets}
        pagination={false}
      />
    </div>
  );
}
