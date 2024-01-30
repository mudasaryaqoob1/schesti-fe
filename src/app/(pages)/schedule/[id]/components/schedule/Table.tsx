import QuinaryHeading from "@/app/component/headings/quinary";
import { PlusOutlined } from "@ant-design/icons";
import { Checkbox, Drawer, Form, type GetRef, Input, Table, } from "antd";
import { type ColumnType } from "antd/es/table";

import { createContext, useContext, useEffect, useRef, useState } from "react";
const columns: ColumnType<{}>[] = [
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
const data = [{
    id: '1',
    description: 'Design',
    orignalDuration: '12',
    start: '12',
    finish: '12',
    actualStart: '12',
    actualFinish: '12',
    remainingDuration: '12',
    scheduleCompleted: '12',
    totalFloat: '12',
    activityType: '12',
    predecessors: '12',
    successors: '12',
    activityCalendar: '12',
},
{
    id: '2',
    description: 'Design',
    orignalDuration: '12',
    start: '12',
    finish: '12',
    actualStart: '12',
    actualFinish: '12',
    remainingDuration: '12',
    scheduleCompleted: '12',
    totalFloat: '12',
    activityType: '12',
    predecessors: '12',
    successors: '12',
    activityCalendar: '12',
},
{
    id: '3',
    description: 'Design',
    orignalDuration: '12',
    start: '12',
    finish: '12',
    actualStart: '12',
    actualFinish: '12',
    remainingDuration: '12',
    scheduleCompleted: '12',
    totalFloat: '12',
    activityType: '12',
    predecessors: '12',
    successors: '12',
    activityCalendar: '12',
},
{
    id: '4',
    description: 'Design',
    orignalDuration: '12',
    start: '12',
    finish: '12',
    actualStart: '12',
    actualFinish: '12',
    remainingDuration: '12',
    scheduleCompleted: '12',
    totalFloat: '12',
    activityType: '12',
    predecessors: '12',
    successors: '12',
    activityCalendar: '12',
},
]
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
        editable: true,
        dataIndex: item.dataIndex,
        hidden: !checkedList.includes(item.key as string),
    })).map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Item) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex as string,
                title: col.title,
                handleSave(record: Item) {
                    console.log("handle save", record)
                }
            })
        }
    });

    newColumns = [...newColumns, {
        title: <PlusOutlined className="text-lg" onClick={showDrawer} />,
        hidden: false,
        render: () => null,
        editable: false,
        dataIndex: ""
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
            columns={newColumns as ColumnType<Item>[]}
            dataSource={data}
            key={'id'}
            components={{
                body: {
                    row: EditableRow,
                    cell: EditableCell
                }
            }}
        />
    </div>
}


type InputRef = GetRef<typeof Input>;
type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = createContext<FormInstance<any> | null>(null);

interface EditableRowProps {
    index: number;
}

function EditableRow({ index, ...props }: EditableRowProps) {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false} key={index}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
}
type Item = typeof data[0];
interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof Item;
    record: Item;
    handleSave: (_record: Item) => void;
}

function EditableCell({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}: EditableCellProps) {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
        if (editing) {
            // @ts-ignore
            inputRef.current!.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();

            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{ margin: 0 }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
}

