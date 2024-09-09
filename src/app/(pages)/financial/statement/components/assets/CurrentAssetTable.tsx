
import TertiaryHeading from "@/app/component/headings/tertiary";
import { Table } from "antd";
import { type ColumnsType } from "antd/es/table";

export function CurrentAssetTable() {
    const columns: ColumnsType<{}> = [
        { title: "Current Asset", dataIndex: "name" },
        { title: "Amount", dataIndex: "amount" },
    ];
    return <Table
        columns={columns}
        dataSource={[
            { name: "Bank Account Balance 1 - Cash", amount: "$45.873.12" },
            { name: "Bank Account Balance 2 - Cash", amount: "697.58" },
            { name: "Bank Account Balance 3 - Cash", amount: "697.58" },
            { name: "Cash Clearing", amount: "697.58" },
            { name: "Contact Receivables", amount: "697.58" },
            { name: "Other Receivables", amount: "697.58" },
            { name: "Startup Inventory", amount: "697.58" }
        ]}
        footer={
            () => (
                <div className="w-full flex justify-around">
                    <TertiaryHeading
                        title="Total Current Assets"
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