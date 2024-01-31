import { InputComponent } from '@/app/component/customInput/Input';
import { SelectComponent } from '@/app/component/customSelect/Select.component';
import { DateInputComponent } from '@/app/component/cutomDate/CustomDateInput';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import QuinaryHeading from '@/app/component/headings/quinary';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Checkbox,
  Drawer,
  Form,
  type GetRef,
  Input,
  Table,
  DatePicker,
  Tag,
} from 'antd';
import { type ColumnType } from 'antd/es/table';
import dayjs from 'dayjs';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { IWBSType, ScopeItem } from '../../type';

const columns: ColumnType<{}>[] = [
  {
    title: <QuinaryHeading title="Activities" />,
    dataIndex: 'description',
    key: '1',
    width: 150,
  },
  {
    title: <QuinaryHeading title="Original Duration" />,
    dataIndex: 'orignalDuration',
    key: '2',
    width: 150,
  },
  {
    title: <QuinaryHeading title="Status" />,
    dataIndex: 'status',
    key: '2',
    width: 150,
  },
  {
    title: <QuinaryHeading title="Start" />, dataIndex: 'start', key: '3',
    width: 150,
  },
  {
    title: <QuinaryHeading title="Finish" />, dataIndex: 'finish', key: '4',
    width: 150,
  },
  {
    title: <QuinaryHeading title="Actual Start" />,
    dataIndex: 'actualStart',
    key: '5',
    width: 150,

  },
  {
    title: <QuinaryHeading title="Actual Finish" />,
    dataIndex: 'actualFinish',
    key: '6',
    width: 150,
  },
  {
    title: <QuinaryHeading title="Remaining Duration" />,
    dataIndex: 'remainingDuration',
    width: 150,
    key: '7',
  },
  {
    title: <QuinaryHeading title="Schedule % Completed" />,
    dataIndex: 'scheduleCompleted',
    width: 150,
    key: '8',
  },
  {
    title: <QuinaryHeading title="Total Float" />,
    dataIndex: 'totalFloat',
    width: 150,
    key: '9',
  },
  {
    title: <QuinaryHeading title="Activity Type" />,
    dataIndex: 'activityType',
    width: 150,
    key: '10',
  },
  {
    title: <QuinaryHeading title="Predecessors" />,
    dataIndex: 'predecessors',
    width: 150,
    key: '11',
  },
  {
    title: <QuinaryHeading title="Successors" />,
    dataIndex: 'successors',
    width: 150,
    key: '12',
  },
  {
    title: <QuinaryHeading title="Activity Calendar" />,
    dataIndex: 'activityCalendar',
    width: 150,
    key: '13',
  },
];

const defaultCheckedList = columns.map((item) => item.key);

type Props = {
  updateWbsScopeItems(_id: string, _scopeItems: ScopeItem[]): void;
  wbs: IWBSType;
};

export function ScheduleTable({ updateWbsScopeItems, wbs }: Props) {
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [open, setOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ScopeItem | null>(null);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // add item in data
  function addItem() {
    const item: ScopeItem = {
      activityCalendar: '_',
      activityType: '_',
      actualFinish: new Date().toDateString(),
      actualStart: new Date().toDateString(),
      description: '_',
      finish: new Date().toDateString(),
      id: new Date().getMilliseconds().toString(),
      orignalDuration: '_',
      predecessors: '_',
      remainingDuration: '_',
      start: new Date().toDateString(),
      scheduleCompleted: '_',
      status: "New",
      successors: '_',
      totalFloat: '_',
    };
    const newData = [...wbs.scopeItems, item];
    updateWbsScopeItems(wbs.id, newData);
  }

  function updateRow(record: ScopeItem) {
    const newData = [...wbs.scopeItems];
    const index = newData.findIndex((item) => item.id === record.id);
    newData[index] = record;
    updateWbsScopeItems(wbs.id, newData);
  }

  function deleteRow(record: ScopeItem) {
    const newData = wbs.scopeItems.filter((item) => item.id !== record.id);
    updateWbsScopeItems(wbs.id, newData);
  }

  let newColumns = columns
    .map((item) => ({
      ...item,
      editable: true,
      dataIndex: item.dataIndex,
      hidden: !checkedList.includes(item.key as string),
    }))
    .map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: ScopeItem) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex as string,
          title: col.title,
          handleSave(record: ScopeItem) {
            updateRow(record);
          },
        }),
      };
    });

  const extras: (ColumnType<ScopeItem> & { editable: boolean })[] = [
    {
      title: <QuinaryHeading title="Actions" />,
      dataIndex: 'actions',
      key: 'actions',
      editable: false,
      hidden: false,
      render(_: any, record: ScopeItem) {
        return (
          <DeleteOutlined
            onClick={(e) => {
              e.stopPropagation();
              deleteRow(record);
            }}
            className="text-lg border p-2 rounded-lg text-gray-500"
          />
        );
      },
      fixed: 'right',
      width: 150,
    },
    {
      title: <PlusOutlined className="text-lg" onClick={showDrawer} />,
      hidden: false,
      render: () => null,
      editable: false,
      dataIndex: 'plus',
      fixed: 'right',
      width: 150,
    },

  ];

  const options = columns.map(({ key, title }) => ({
    label: title,
    value: key,
  }));
  return (
    <div>
      <Drawer title="Customise Table" onClose={onClose} open={open}>
        <Checkbox.Group
          style={{ width: '100%' }}
          value={checkedList as string[]}
          onChange={(value) => {
            setCheckedList(value as string[]);
          }}
        >
          <div className="grid grid-cols-12">
            {options.map(({ label, value }, index) => (
              <div key={index} className="col-span-12">
                <Checkbox value={value}>{label as string}</Checkbox>
              </div>
            ))}
          </div>
        </Checkbox.Group>
      </Drawer>

      <Drawer
        title={
          <Tag
            color="#F9F5FF"
            className="rounded-full py-1"
            style={{ color: '#6941C6' }}
          >
            Inprogress
          </Tag>
        }
        open={openDetails}
        onClose={() => setOpenDetails(false)}
      >
        {selectedItem ? (
          <>
            <div>
              <QuaternaryHeading title={selectedItem.description} />
              <div className="flex items-center justify-between">
                <QuinaryHeading title="Activity" />
                <QuinaryHeading title={'A102'} />
              </div>

              <div className="flex items-center justify-between">
                <QuinaryHeading title="Original Duration" />
                <QuinaryHeading title={selectedItem.orignalDuration} />
              </div>

              <div className="flex items-center justify-between">
                <QuinaryHeading title="Start" />
                <QuinaryHeading
                  title={dayjs(selectedItem.start).format('DD/MM/YYYY')}
                />
              </div>

              <div className="flex items-center justify-between">
                <QuinaryHeading title="Finish" />
                <QuinaryHeading
                  title={dayjs(selectedItem.finish).format('DD/MM/YYYY')}
                />
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <QuinaryHeading title="Assign" />
                  <PlusOutlined className="border cursor-pointer text-base rounded-full bg-[#b1b3b6] text-[#667085] p-2" />
                </div>
                <div>
                  <QuinaryHeading title="Status" />
                  <Tag
                    color="#F9F5FF"
                    className="rounded-full py-1"
                    style={{ color: '#6941C6' }}
                  >
                    Inprogress
                  </Tag>
                </div>
              </div>

              <div className="flex items-center space-x-4 justify-between">
                <DateInputComponent
                  label="Actual Start"
                  name="actualStart"
                  inputStyle="border-gray-200"
                />
                <DateInputComponent
                  label="Actual Finish"
                  name="actualFinish"
                  inputStyle="border-gray-200"
                />
              </div>

              <div className="flex items-center space-x-4 justify-between">
                <InputComponent
                  label="Activity Type"
                  name="activityType"
                  type="text"
                  placeholder="Activity Type"
                />
                <InputComponent
                  label="Activity Calender"
                  name="activityCode"
                  type="text"
                  placeholder="Activity Calender"
                />
              </div>
            </div>

            <div className="mt-4">
              <QuinaryHeading title="Predecessors" />

              <div className="flex items-center space-x-4 justify-between">
                <SelectComponent
                  label="Relation"
                  name="relation"
                  placeholder="Relation"
                  field={{
                    options: [
                      { label: 'SS', value: 'SS' },
                      { label: 'FF', value: 'FF' },
                      { label: 'SF', value: 'SF' },
                      { label: 'FS', value: 'FS' },
                    ],
                    className: 'mt-1',
                  }}
                />
                <InputComponent
                  label="Lags"
                  name="lags"
                  type="text"
                  placeholder="Lags"
                />
              </div>
            </div>

            <div className="mt-4">
              <QuinaryHeading title="Constraints" />

              <div className="flex items-center space-x-4 justify-between">
                <InputComponent
                  label="Primary"
                  name="primary"
                  placeholder="Primary"
                  type="text"
                />
                <DateInputComponent
                  label="Date"
                  name="date"
                  placeholder="Date"
                  inputStyle="border-gray-200"
                />
              </div>
            </div>
          </>
        ) : null}
      </Drawer>
      <Table
        columns={[...newColumns, ...extras] as ColumnType<ScopeItem>[]}
        dataSource={wbs.scopeItems}
        key={'id'}
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
        scroll={{ x: 1500, y: 300 }}
        footer={() => {
          return (
            <div
              onClick={() => addItem()}
              className="border border-dashed rounded cursor-pointer py-3 px-2 border-[#EAECF0] bg-white"
            >
              <h4 className="space-x-2 tracking-wide">
                <PlusOutlined />
                <span>Create your activity</span>
              </h4>
            </div>
          );
        }}
        onRow={(data) => ({
          onClick: () => {
            setOpenDetails(true);
            setSelectedItem(data);
          },
        })}
      />
    </div>
  );
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
interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof ScopeItem;
  record: ScopeItem;
  handleSave: (_record: ScopeItem) => void;
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
  const dateDataIndexes = ['start', 'finish', 'actualStart', 'actualFinish'];
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
        getValueProps={(i) => {
          return { value: dateDataIndexes.includes(dataIndex) ? dayjs(i) : i };
        }}
      >
        {dateDataIndexes.includes(dataIndex) ? (
          <DatePicker
            ref={inputRef}
            onChange={save}
            value={dayjs(record[dataIndex])}
            onBlur={save}
          />
        ) : (
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        )}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={(e) => {
          e.stopPropagation();
          toggleEdit();
        }}
      >
        {dateDataIndexes.includes(dataIndex)
          ? dayjs(record[dataIndex]).format('DD/MM/YYYY')
          : children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
}
