import { SelectComponent } from '@/app/component/customSelect/Select.component';
import { IResponseInterface } from '@/app/interfaces/api-response.interface';
import { IClientInvoice } from '@/app/interfaces/client-invoice.interface';
import { Column, type ColumnConfig } from '@ant-design/plots';
import moment from 'moment';
import { useState } from 'react';
import { UseQueryResult } from 'react-query';


type Props = {
  invoiceQuery: UseQueryResult<IResponseInterface<{
    invoices: IClientInvoice[];
  }>, unknown>
}

const MONTHS = [
  { label: "Month", value: "", disabled: true },
  { label: "January", value: "Jan" },
  { label: "February", value: "Feb" },
  { label: "March", value: "Mar" },
  { label: "April", value: "Apr" },
  { label: "May", value: "May" },
  { label: "June", value: "Jun" },
  { label: "July", value: "Jul" },
  { label: "August", value: "Aug" },
  { label: "September", value: "Sep" },
  { label: "October", value: "Oct" },
  { label: "November", value: "Nov" },
  { label: "December", value: "Dec" },
]

export default function InvoiceReport({ invoiceQuery }: Props) {
  const [selectedMonth, setSelectedMonth] = useState("");

  let data = invoiceQuery.data ? invoiceQuery.data.data!.invoices.map(invoice => {
    const month = moment(invoice.applicationDate).format("MMM");
    return {
      value: `$${invoice.totalAmount}`,
      type: month
    }
  }).filter(invoice => {
    if (selectedMonth) {
      return invoice.type === selectedMonth;
    }
    return invoice;
  }) : []
  const config: ColumnConfig = {
    data,
    xField: 'type',
    yField: 'value',
    colorField: '#7138DF',
    style: {
      radius: 50,
      width: 10,
    },
  };
  return <div className="col-span-7 shadow-md bg-white rounded-md px-4 border border-t">
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
