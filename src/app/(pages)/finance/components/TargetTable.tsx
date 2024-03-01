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
import { remainingTargets, totalReceivable, totalRemainingAmount } from '../utils';



type Props = {
    targetsQuery: UseQueryResult<IResponseInterface<ISettingTarget[]>, unknown>;
    clientInvoiceQuery: UseQueryResult<IResponseInterface<{
        invoices: IClientInvoice[];
    }>, unknown>
}
export function TargetTable({ clientInvoiceQuery, targetsQuery }: Props) {

    if (clientInvoiceQuery.isLoading || targetsQuery.isLoading) {
        return <Skeleton />
    }

    const invoices = clientInvoiceQuery.data ? clientInvoiceQuery.data.data!.invoices : []
    const targets = targetsQuery.data ? targetsQuery.data.data! : [];

    const remaining = remainingTargets(targets, invoices);

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
                return `$${value}`;
            },
        },
        {
            title: 'Target %',
            render(_value, record) {
                return `${((totalReceivable(record, invoices) / Number(record.price)) * 100).toFixed(2)}%`;
            },
        },
    ];
    return <div className="shadow space-y-4 bg-white p-4 rounded-md my-3">
        <div className="flex items-center">
            <QuaternaryHeading
                title="Target Table"
                className="!text-[#344054] font-semibold"
            />
            <div className="flex flex-1 space-x-5 justify-end items-center">
                <QuinaryHeading title="Back log" className="text-[#868686]" />
                <QuinaryHeading title={USCurrencyFormat.format(totalRemainingAmount(remaining))} className="text-[#7F56D9]" />
                <Select
                    placeholder="Choose Year"
                    options={[
                        { label: 'Year 2024', value: '2024' },
                        { label: 'Year 2023', value: '2023' },
                        { label: 'Year 2022', value: '2022' },
                        { label: 'Year 2021', value: '2021' },
                    ]}
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
}