import QuaternaryHeading from "@/app/component/headings/quaternary"
import SenaryHeading from "@/app/component/headings/senaryHeading"
import { IResponseInterface } from "@/app/interfaces/api-response.interface"
import { IClientInvoice } from "@/app/interfaces/client-invoice.interface"
import { ISettingTarget } from "@/app/interfaces/companyInterfaces/setting.interface"
import { USCurrencyFormat } from "@/app/utils/format"
import { Badge, Progress, Skeleton } from "antd"
import moment from "moment"
import { UseQueryResult } from "react-query"

type Props = {
    targetsQuery: UseQueryResult<IResponseInterface<ISettingTarget[]>, unknown>;
    clientInvoiceQuery: UseQueryResult<IResponseInterface<{
        invoices: IClientInvoice[];
    }>, unknown>
}
export function TargetStats({ targetsQuery, clientInvoiceQuery }: Props) {
    if (targetsQuery.isLoading || clientInvoiceQuery.isLoading) {
        return <Skeleton />
    }
    const invoices = clientInvoiceQuery.data ? clientInvoiceQuery.data.data!.invoices : []
    const targets = targetsQuery.data ? targetsQuery.data.data! : [];
    const completed = targets.filter(target => {
        return invoices.find(invoice => {
            return target.month === moment(invoice.applicationDate).format('MMMM') && invoice.amountPaid >= Number(target.price);
        })
    });

    const remaining = targets.filter(target => {
        return invoices.find(invoice => {
            return target.month === moment(invoice.applicationDate).format('MMMM') && invoice.amountPaid < Number(target.price);
        })
    })
    const percentage = (completed.length / targets.length) * 100;

    const completedAmount = completed.reduce(function (accumulator, currentValue) {
        return accumulator + Number(currentValue.price);
    }, 0)
    const remainingAmount = remaining.reduce(function (accumulator, currentValue) {
        return accumulator + Number(currentValue.price);
    }, 0)



    return <div className="col-span-12 md:col-span-4 space-y-4 shadow bg-white p-4 rounded-md">
        <div className="flex justify-between items-center">
            <QuaternaryHeading
                title="Target Stats"
                className="text-[#344054] font-semibold"
            />
        </div>
        <div className="flex justify-center">
            <Progress
                showInfo
                type="dashboard"
                strokeColor={'#7F56D9'}
                strokeWidth={12}
                size={200}
                percent={Number(percentage.toFixed(2))}
            />
        </div>
        <div className="flex justify-between items-center">
            <Badge color="#0074D9" status="default" text="Completed" />
            <SenaryHeading title={USCurrencyFormat.format(completedAmount)} />
        </div>
        <div className="flex justify-between items-center">
            <Badge status="warning" text="Remaining" />
            <SenaryHeading title={USCurrencyFormat.format(remainingAmount)} />
        </div>
    </div>
}