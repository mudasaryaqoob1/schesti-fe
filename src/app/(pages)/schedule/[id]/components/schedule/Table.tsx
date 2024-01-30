import CustomButton from "@/app/component/customButton/white";
import QuinaryHeading from "@/app/component/headings/quinary";
import { PlusOutlined } from "@ant-design/icons";
import { Checkbox, Drawer, Form, type GetRef, Input, Table, DatePicker, } from "antd";
import { type ColumnType } from "antd/es/table";
import dayjs from "dayjs";

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
const _data = [{
    id: '1',
    description: 'Design',
    orignalDuration: '12',
    start: new Date().toDateString(),
    finish: new Date().toDateString(),
    actualStart: new Date().toDateString(),
    actualFinish: new Date().toDateString(),
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
    start: new Date().toDateString(),
    finish: new Date().toDateString(),
    actualStart: new Date().toDateString(),
    actualFinish: new Date().toDateString(),
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
    start: new Date().toDateString(),
    finish: new Date().toDateString(),
    actualStart: new Date().toDateString(),
    actualFinish: new Date().toDateString(),
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
    start: new Date().toDateString(),
    finish: new Date().toDateString(),
    actualStart: new Date().toDateString(),
    actualFinish: new Date().toDateString(),
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
    const [data, setData] = useState(_data);
    const [checkedList, setCheckedList] = useState(defaultCheckedList);
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    // add item in data
    function addItem() {
        const item: Item = {
            activityCalendar: "_",
            activityType: "_",
            actualFinish: new Date().toDateString(),
            actualStart: new Date().toDateString(),
            description: "_",
            finish: new Date().toDateString(),
            id: new Date().getMilliseconds().toString(),
            orignalDuration: "_",
            predecessors: "_",
            remainingDuration: "_",
            start: new Date().toDateString(),
            scheduleCompleted: "_",
            successors: "_",
            totalFloat: "_"
        };
        setData([...data, item])
    }

    function updateRow(record: Item) {
        const newData = [...data];
        const index = newData.findIndex(item => item.id === record.id);
        newData[index] = record;
        setData(newData);
    }

    function deleteRow(record: Item) {
        const newData = data.filter(item => item.id !== record.id);
        setData(newData);
    }

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
                    updateRow(record);
                }
            })
        }
    });

    const extras: (ColumnType<Item> & { editable: boolean })[] = [
        {
            title: <QuinaryHeading title="Actions" />,
            dataIndex: "actions",
            key: "actions",
            editable: false,
            hidden: false,
            render(_: any, record: Item) {
                return <CustomButton
                    text=""
                    className="!w-auto"
                    icon="/trash.svg"
                    iconwidth={13}
                    iconheight={13}
                    onClick={() => deleteRow(record)}
                />
            }
        },
        {
            title: <PlusOutlined className="text-lg" onClick={showDrawer} />,
            hidden: false,
            render: () => null,
            editable: false,
            dataIndex: "plus"
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
            columns={[...newColumns, ...extras] as ColumnType<Item>[]}
            dataSource={data}
            key={'id'}
            components={{
                body: {
                    row: EditableRow,
                    cell: EditableCell
                }
            }}
            footer={() => {
                return <div
                    onClick={() => addItem()}
                    className="border border-dashed rounded cursor-pointer py-3 px-2 border-[#EAECF0] bg-white"
                >
                    <h4 className="space-x-2 tracking-wide">
                        <PlusOutlined />
                        <span>Create your activity</span>
                    </h4>
                </div>
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
type Item = typeof _data[0];
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
    const dateDataIndexes = [
        "start",
        "finish",
        "actualStart",
        "actualFinish"
    ]
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
                getValueProps={i => {
                    return ({ value: dateDataIndexes.includes(dataIndex) ? dayjs(i) : i })
                }}
            >
                {
                    dateDataIndexes.includes(dataIndex) ?
                        <DatePicker ref={inputRef}
                            onChange={save}
                            value={dayjs(record[dataIndex])}
                            onBlur={save} /> :
                        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
                }
            </Form.Item>
        ) : (
            <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
                {dateDataIndexes.includes(dataIndex) ? dayjs(record[dataIndex]).format("DD/MM/YYYY") : children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
}

