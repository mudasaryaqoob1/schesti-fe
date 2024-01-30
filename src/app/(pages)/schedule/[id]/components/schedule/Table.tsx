import QuinaryHeading from "@/app/component/headings/quinary";
import { PlusOutlined } from "@ant-design/icons";
import { Checkbox, Drawer, Table, type TableColumnsType, } from "antd";
import { useState } from "react";
const columns: TableColumnsType<{}> = [
    { title: <QuinaryHeading title="Activities" />, dataIndex: 'description', key: '1' },
    { title: <QuinaryHeading title='Original Duration' />, dataIndex: 'orignalDuration', key: '2' },
    { title: <QuinaryHeading title='Start' />, dataIndex: 'start', key: '3' },
    { title: <QuinaryHeading title='Finish' />, dataIndex: 'finish', key: '4' },
    { title: <QuinaryHeading title='Actual Start' />, dataIndex: 'actualStart', key: '5' },
    { title: <QuinaryHeading title='Actual Finish' />, dataIndex: 'actualFinish', key: '6' },
    { title: <QuinaryHeading title='Remaining Duration' />, dataIndex: 'remainingDuration', key: '7' },
    { title: <QuinaryHeading title='Schedule % Completed' />, dataIndex: 'scheduleCompleted', key: '8' },
    { title: <QuinaryHeading title='Total Float' />, dataIndex: 'totalFloat', key: '9' },
    { title: <QuinaryHeading title='Activity Type' />, dataIndex: 'activityType', key: '10' },
    { title: <QuinaryHeading title='Predecessors' />, dataIndex: 'predecessors', key: '11' },
    { title: <QuinaryHeading title='Successors' />, dataIndex: 'successors', key: '12' },
    { title: <QuinaryHeading title='Activity Calendar' />, dataIndex: 'activityCalendar', key: '13' },
];
const defaultCheckedList = columns.map(item => item.key);
export function ScheduleTable() {
    const [checkedList, setCheckedList] = useState(defaultCheckedList);
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    let newColumns = columns.map((item) => ({
        ...item,
        hidden: !checkedList.includes(item.key as string),
    }));
    newColumns = [...newColumns, {
        title: <PlusOutlined className="text-lg" onClick={showDrawer} />,
        hidden: false,
        render: () => null,
    }];

    const options = columns.map(({ key, title }) => ({
        label: title,
        value: key,
    }));
    return <div>
        <Drawer title="Customise Table" onClose={onClose} open={open}>
            <Checkbox.Group
                style={{ width: "100%" }}
                value={checkedList as string[]}
                onChange={(value) => {
                    setCheckedList(value as string[]);
                }}
            >
                <div className="grid grid-cols-12">
                    {options.map(({ label, value }, index) => (
                        <div key={index} className="col-span-12">
                            <Checkbox value={value} >{label as string}</Checkbox>
                        </div>
                    ))}
                </div>
            </Checkbox.Group>
        </Drawer>
        <Table
            columns={newColumns}
            dataSource={[]}
        />
    </div>
}