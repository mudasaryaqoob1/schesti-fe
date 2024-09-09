import TertiaryHeading from "@/app/component/headings/tertiary";
import Table, { type ColumnsType } from "antd/es/table";

export function LongTermLiabilitiesTable() {
    const columns: ColumnsType<{}> = [
        { title: "Long Term Liabilities", dataIndex: "name" },
        { title: "Amount", dataIndex: "amount" },
    ];
    return <Table
        columns={columns}
        dataSource={[
            {
                "name": "Trade accounts Payable",
                "amount": 45873.12
            },
            {
                "name": "State Payroll Taxes Payable",
                "amount": 697.58
            },
        ]
        }
        footer={
            () => (
                <div className="w-full flex justify-around">
                    <TertiaryHeading
                        title="Total Long Term Liabilities"
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