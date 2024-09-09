import TertiaryHeading from "@/app/component/headings/tertiary";
import Table, { type ColumnsType } from "antd/es/table";

export function DirectExpenseTable() {
    const columns: ColumnsType<{}> = [
        { title: "Direct Expense", dataIndex: "name" },
        { title: "Amount", dataIndex: "amount" },
    ];
    return <Table
        columns={columns}
        dataSource={[
            { name: 'Material', value: '$45,873.12' },
            { name: 'Other Direct Expense', value: '$45,873.12' },
            { name: 'Equipment Cost', value: '$45,873.12' },
            { name: 'Subcontractor', value: '$45,873.12' },

        ]
        }
        footer={
            () => (
                <div className="w-full flex justify-around">
                    <TertiaryHeading
                        title="Total Direct Expense"
                        className="text-schestiPrimaryBlack"
                    />
                    <TertiaryHeading
                        title="$45,873.12"
                        className="text-schestiPrimaryBlack"
                    />
                </div>
            )
        }
        bordered
        pagination={false}
    />
}