import { SelectComponent } from '@/app/component/customSelect/Select.component';
import { IResponseInterface } from '@/app/interfaces/api-response.interface';
import { IClientInvoice } from '@/app/interfaces/client-invoice.interface';
import { Column, type ColumnConfig } from '@ant-design/plots';
import { Skeleton } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { UseQueryResult } from 'react-query';


type Props = {
  invoiceQuery: UseQueryResult<IResponseInterface<{
    invoices: IClientInvoice[];
  }>, unknown>
}

const MONTHS = [
  { label: "Month", value: "", disabled: true },
  { label: "January", value: "January" },
  { label: "February", value: "February" },
  { label: "March", value: "March" },
  { label: "April", value: "April" },
  { label: "May", value: "May" },
  { label: "June", value: "June" },
  { label: "July", value: "July" },
  { label: "August", value: "August" },
  { label: "September", value: "September" },
  { label: "October", value: "October" },
  { label: "November", value: "November" },
  { label: "December", value: "December" },
]

export default function InvoiceReport({ invoiceQuery }: Props) {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [invoices, setInvoices] = useState<{ value: string | number; type: string; }[]>([]);

  useEffect(() => {
    const data = invoiceQuery.data ? invoiceQuery.data.data!.invoices.map(invoice => {
      const month = moment(invoice.applicationDate).format("MMMM");
      // const value = `$${invoice.totalAmount}`;
      return {
        value: invoice.totalAmount,
        type: month,
      };
    }) : [];
    setInvoices(data);
  }, [invoiceQuery.data, selectedMonth])

  if (invoiceQuery.isLoading) {
    return <div className="col-span-7 shadow-lg bg-white rounded-md px-4 border border-t">
      <Skeleton />
    </div>
  }


  const config: ColumnConfig = {
    data: invoices,
    xField: 'type',
    yField: 'value',
    color: (data) => {
      return data.type === selectedMonth ? "#7F56D9" : "#8f7db5"
    },
    maxColumnWidth: 10,
    columnStyle: {
      radius: 50
    },
    xAxis: {
      grid: undefined
    }
  }


  return <div className="col-span-7 shadow-lg bg-white rounded-md px-4 border border-t">
    <div className="flex justify-between items-center my-4">
      <h3 className="text-[18px] text-[#344054] leading-[28px] font-semibold">
        Invoice
      </h3>
      <SelectComponent
        label=''
        name="month"
        placeholder="Month"
        field={{
          options: MONTHS,
          value: selectedMonth,
          onChange: (value: string) => {
            setSelectedMonth(value)
          },
          className: "!w-[150px]",
          allowClear: true
        }}
      />
    </div>
    <Column {...config} />
  </div>
}
