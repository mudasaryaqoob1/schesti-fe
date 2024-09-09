
import TertiaryHeading from "@/app/component/headings/tertiary";
import { Table } from "antd";
import { type ColumnsType } from "antd/es/table";

export function LongTermAssetTable() {
    const columns: ColumnsType<{}> = [
        { title: "Long Term Asset", dataIndex: "name" },
        { title: "Amount", dataIndex: "amount" },
    ];
    return <Table
        columns={columns}
        dataSource={[
            { name: "Vehicle Loan", amount: 45873.12 },
            { name: "Land", amount: 4213 }
        ]}
        footer={
            () => (
                <div className="w-full flex justify-around">
                    <TertiaryHeading
                        title="Total Long Term Assets"
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