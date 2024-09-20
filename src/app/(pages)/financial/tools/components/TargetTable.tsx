import CustomButton from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import QuinaryHeading from '@/app/component/headings/quinary';
import { IResponseInterface } from '@/app/interfaces/api-response.interface';
import { IAIAInvoice } from '@/app/interfaces/client-invoice.interface';
import { ISettingTarget } from '@/app/interfaces/companyInterfaces/setting.interface';
import { Select, Skeleton } from 'antd';
import Table, { type ColumnsType } from 'antd/es/table';
import { UseQueryResult } from 'react-query';
import _ from 'lodash';
import { useState } from 'react';
import { totalReceivable } from '../utils';
import { Excel } from 'antd-table-saveas-excel';
import moment from 'moment';
import { useCurrencyFormatter } from '@/app/hooks/useCurrencyFormatter';
import { useRouterHook } from '@/app/hooks/useRouterHook';
import { Routes } from '@/app/utils/plans.utils';

type Props = {
  targetsQuery: UseQueryResult<IResponseInterface<ISettingTarget[]>, unknown>;
  clientInvoiceQuery: UseQueryResult<
    IResponseInterface<{
      invoices: IAIAInvoice[];
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
  const router = useRouterHook();
  const currency = useCurrencyFormatter();
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
      key: 'month',
    },
    {
      title: 'Receivable',
      dataIndex: 'month',
      key: 'receivable',
      render(_value, record) {
        return currency.format(totalReceivable(record, invoices));
      },
    },
    {
      title: 'Target',
      key: 'target',
      dataIndex: 'price',
      render(value) {
        return currency.format(value);
      },
    },
    {
      title: 'Target %',
      key: 'targetPercent',
      dataIndex: 'price',
      render(_value, record) {
        return `${(
          (totalReceivable(record, invoices) / Number(record.price)) *
          100
        ).toFixed(2)}%`;
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

  const handleClick = () => {
    const excel = new Excel();
    excel
      .addSheet('Financial Tools')
      .addColumns(columns as any)
      .addDataSource(targets, {
        str2Percent: true,
      })
      .saveAs(
        `${'financial-tools' +
        '-' +
        moment().month() +
        '-' +
        new Date().getTime()
        }.xlsx`
      );
  };

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
            title={currency.format(remainingTargets)}
            className="text-schestiPrimary"
          />
          <Select
            placeholder="Choose Year"
            options={targetsYear as Option[]}
            value={selectedYear}
            onChange={(value) => setSelectedYear(value)}
            className="w-40"
          />
          <WhiteButton
            text="Download"
            className="!w-fit !py-2"
            onClick={handleClick}
          />
          <CustomButton
            text="Financial Statement"
            className="!w-fit !py-2"
            onClick={() => {
              router.push(
                `${Routes.Financial.Statement}`
              )
            }}
          />
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
