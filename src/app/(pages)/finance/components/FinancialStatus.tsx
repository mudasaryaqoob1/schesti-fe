import QuaternaryHeading from "@/app/component/headings/quaternary";
import { Badge } from "antd";

export function FinancialStatus() {
    return <div className="col-span-12 md:col-span-8  shadow bg-white p-4 rounded-md">
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

        {/* <Column
      {...config1} /> */}
    </div>
}