import QuaternaryHeading from "@/app/component/headings/quaternary";
import { IResponseInterface } from "@/app/interfaces/api-response.interface";
import { IClientInvoice } from "@/app/interfaces/client-invoice.interface";
import { Badge, Skeleton } from "antd";
import moment from "moment";
import { UseQueryResult } from "react-query";
import { Column } from '@ant-design/plots';

type Props = {
    clientInvoiceQuery: UseQueryResult<IResponseInterface<{
        invoices: IClientInvoice[];
    }>, unknown>
}
export function FinancialStatus({ clientInvoiceQuery }: Props) {
    if (clientInvoiceQuery.isLoading) {
        return <Skeleton />
    }

    if (!clientInvoiceQuery.data) {
        return null;
    }

    const invoices = clientInvoiceQuery.data.data!.invoices.map(invoice => {
        const completed = invoice.amountPaid === invoice.totalAmount;
        const receivable = invoice.amountPaid < invoice.totalAmount;
        if (completed && !receivable) {
            return {
                name: "Completed",
                value: invoice.totalAmount,
                month: moment(invoice.applicationDate).format("MMMM")
            }
        }
        return {
            name: "Receivable",
            value: invoice.totalAmount,
            month: moment(invoice.applicationDate).format("MMMM")
        }
    });


    return <div className="col-span-12 md:col-span-8 h-96 shadow bg-white p-4 rounded-md">
        <div className="flex justify-between items-center">
            <QuaternaryHeading
                title="Financial Status"
                className="text-[#344054] font-semibold"
            />
            <div className="flex items-center space-x-2">
                <Badge status="warning" text="Total Completed" />
                <Badge color="#7F56D9" status="success" text="Total Receivable" />
                <Badge color="green" status="success" text="Total Expences" />
            </div>
            <div></div>
        </div>

        <Column
            data={invoices}
            xField="month"
            yField="value"
            isGroup
            seriesField="name"
            maxColumnWidth={10}
            columnStyle={
                { radius: 50 }
            }
            style={{
                height: 300
            }}
        />
    </div>
}