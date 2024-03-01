import CustomButton from '@/app/component/customButton/button';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import QuinaryHeading from '@/app/component/headings/quinary';
import { Select } from 'antd';
import Table, { type ColumnsType } from 'antd/es/table';

export function TargetTable() {
    const columns: ColumnsType<{}> = [
        {
            title: 'Month',
            dataIndex: 'month',
        },
        {
            title: 'Receivable',
            dataIndex: 'receivable',
            render(value) {
                return `$${value}`;
            },
        },
        {
            title: 'Target',
            dataIndex: 'amount',
            render(value) {
                return `$${value}`;
            },
        },
        {
            title: 'Target %',
            dataIndex: 'percentage',
            render(value) {
                return `${value}%`;
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
                <QuinaryHeading title="$53674" className="text-[#7F56D9]" />
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
            dataSource={Array.from({ length: 10 }, (_, index) => ({
                month: `Month ${index + 1}`,
                receivable: Math.random() * 1000, // You can replace this with your own logic for 'receivable'
                amount: Math.random() * 1000, // You can replace this with your own logic for 'amount'
                percentage: Math.random() * 100, // You can replace this with your own logic for 'percentage'
            }))}
            pagination={false}
        />
    </div>
}