import CustomButton from "@/app/component/customButton/button";
import TertiaryHeading from "@/app/component/headings/tertiary";
import { Table, type TableProps } from "antd";

type Props = {
    children?: React.ReactNode;
}

const columns: TableProps['columns'] = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Role",
        dataIndex: "role",
        key: "role",
    },
    {
        title: "Company Name",
        dataIndex: "companyName",
        key: "companyName",

    },
    {
        title: "Location",
        dataIndex: "location",
        key: "location",
    },
    {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
    },
    {
        title: "Action",
        key: 'action'
    }
]

export function PostDesignTeam({ children }: Props) {
    return <div className="shadow-2xl rounded-xl border p-4">
        <div className="flex items-center justify-between">
            <TertiaryHeading
                title="Design Team"
                className="text-[20px] leading-[30px]"
            />
            <CustomButton
                text="Add New Member"
                className="!w-48"
            />
        </div>

        <div className="mt-5">
            <Table
                columns={columns}
                bordered
            />
        </div>

        {children}
    </div>
}