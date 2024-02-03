import { InputComponent } from '@/app/component/customInput/Input';
import { SelectComponent } from '@/app/component/customSelect/Select.component';
import { DateInputComponent } from '@/app/component/cutomDate/CustomDateInput';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import QuinaryHeading from '@/app/component/headings/quinary';
import { PlusOutlined } from '@ant-design/icons';
import {
  Checkbox,
  Drawer,
  Form,
  Input,
  Table,
  DatePicker,
  Tag,
  Select,
  ConfigProvider,
  Dropdown,
} from 'antd';
import { type ColumnType } from 'antd/es/table';
import dayjs from 'dayjs';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { IWBSType, ScopeItem } from '../../type';
import CustomButton from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import Image from 'next/image';

const columns: ColumnType<{}>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: '0',
    width: 100,
  },
  {
    title: 'Activities',
    dataIndex: 'description',
    key: '1',
    width: 150,
  },
  {
    title: 'Original Duration',
    dataIndex: 'orignalDuration',
    key: '2',
    width: 150,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: '2',
    width: 150,
  },
  {
    title: 'Start',
    dataIndex: 'start',
    key: '3',
    width: 150,
  },
  {
    title: 'Finish',
    dataIndex: 'finish',
    key: '4',
    width: 150,
  },
  {
    title: 'Actual Start',
    dataIndex: 'actualStart',
    key: '5',
    width: 150,
  },
  {
    title: 'Actual Finish',
    dataIndex: 'actualFinish',
    key: '6',
    width: 150,
  },
  {
    title: 'Remaining Duration',
    dataIndex: 'remainingDuration',
    width: 150,
    key: '7',
  },
  {
    title: 'Schedule % Completed',
    dataIndex: 'scheduleCompleted',
    width: 150,
    key: '8',
  },
  {
    title: 'Total Float',
    dataIndex: 'totalFloat',
    width: 150,
    key: '9',
  },
  {
    title: 'Activity Type',
    dataIndex: 'activityType',
    width: 150,
    key: '10',
  },
  {
    title: 'Predecessors',
    dataIndex: 'predecessors',
    width: 150,
    key: '11',
  },
  {
    title: 'Successors',
    dataIndex: 'successors',
    width: 150,
    key: '12',
  },
  {
    title: 'Activity Calendar',
    dataIndex: 'activityCalendar',
    width: 150,
    key: '13',
  },
];

const defaultCheckedList = columns.map((item, i) => i % 2 === 0 && item.key);

type Props = {
  updateWbsScopeItems(_id: string, _scopeItems: ScopeItem[]): void;
  wbs: IWBSType;
};
export function ScheduleTable({ updateWbsScopeItems, wbs }: Props) {
  
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [filters, setFilters] = useState(defaultCheckedList);
  const [open, setOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ScopeItem | null>(null);
  const [ID, setID] = useState(0);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // add item in data
  function addItem() {
    const item: ScopeItem = {
      activityCalendar: '',
      activityType: '',
      actualFinish: new Date().toDateString(),
      actualStart: new Date().toDateString(),
      description: '',
      finish: new Date().toDateString(),
      id: `ID${ID}`,
      orignalDuration: '',
      predecessors: '',
      remainingDuration: '_',
      start: new Date().toDateString(),
      scheduleCompleted: '',
      status: 'New',
      successors: '',
      totalFloat: '',
    };
    const newData = [...wbs.scopeItems, item];
    updateWbsScopeItems(wbs.id, newData);
    setID(ID + 1);
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
      title: (
        <QuaternaryHeading
          title={item.title as string}
          className="text-sm font-medium tracking-wide"
        />
      ),
      editable: item.dataIndex === 'id' ? false : true,
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

  const extras: any = [
    {
      title: <QuinaryHeading title="Actions" />,
      dataIndex: 'actions',
      key: 'actions',
      editable: false,
      hidden: false,
      render(_: any, record: ScopeItem) {
        return (
          <Dropdown
            menu={{
              items: [
                {
                  key: 'view',
                  label: <p>View Details</p>,
                  onClick: () => {
                    setOpenDetails(true);
                    setSelectedItem(record);
                  },
                },
                {
                  key: 'predecessors',
                  label: <p>Predecessors</p>,
                },
                {
                  key: 'successors',
                  label: <p>Successors</p>,
                },
                {
                  key: 'delete',
                  label: <p>Delete</p>,
                  onClick: () => {
                    deleteRow(record);
                  },
                },
              ],
            }}
            placement="bottomRight"
          >
            <Image
              src={'/menuIcon.svg'}
              alt="logo white icon"
              width={20}
              height={20}
              className="active:scale-105 cursor-pointer"
            />
          </Dropdown>
        );
      },
      fixed: 'right',
      align:'center',
      width: 100,
    },
    {
      title: <PlusOutlined className="text-lg" onClick={showDrawer} />,
      hidden: false,
      render: () => null,
      editable: false,
      dataIndex: 'plus',
      fixed: 'right',
      width: 50,
    },
  ];

  const options = columns.map(({ key, title }) => ({
    label: title,
    value: key,
  }));
  return (
    <div>
      <Drawer
        title="Customise Table"
        onClose={onClose}
        open={open}
        footer={
          <div className="flex justify-between py-2 space-x-2">
            <WhiteButton text="Cancel" />
            <CustomButton
              text="Apply Filters"
              onClick={() => {
                setCheckedList(filters);
                onClose();
              }}
            />
          </div>
        }
      >
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#6941C6',
              fontSize: 20,
            },
          }}
        >
          <Checkbox.Group
            style={{ width: '100%' }}
            value={filters as string[]}
            onChange={(value) => {
              setFilters(value as string[]);
            }}
          >
            <div className="grid grid-cols-12 gap-4">
              {options.map(({ label, value }, index) => (
                <div key={index} className="col-span-12">
                  <Checkbox
                    value={value}
                    className="text-gray-500 text-base font-light"
                  >
                    {label as string}
                  </Checkbox>
                </div>
              ))}
            </div>
          </Checkbox.Group>
        </ConfigProvider>
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
              className="max-w-max border border-dashed rounded cursor-pointer py-3 px-2 border-[#EAECF0] bg-white"
            >
              <h4 className="space-x-2 tracking-wide">
                <PlusOutlined />
                <span>Create New Activity</span>
              </h4>
            </div>
          );
        }}
      />
    </div>
  );
}

const EditableContext = createContext<any>(null);

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
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}: EditableCellProps) {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<any>(null);
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
  const status = record ? record.status : '';
  let statusColor: string = '';
  if (status === 'New') {
    statusColor = '#2db7f5';
  } else if (status === 'Planned') {
    statusColor = '#108ee9';
  } else if (status === 'In Progress') {
    statusColor = '#3BC8D0';
  } else if (status === 'Completed') {
    statusColor = '#87d068';
  } else if (status === 'Review') {
    statusColor = 'yellow';
  }

  if (editable) {
    childNode = editing ? (
      <ConfigProvider
        theme={{
          components: {
            Input: {
              colorPrimary: 'darkgrey',
            },
            Select: {
              colorPrimary: 'grey',
              colorPrimaryHover: 'grey',
              colorPrimaryActive: 'lightgrey',
            },
            DatePicker: {
              colorPrimary: 'darkgrey',
            },
          },
        }}
      >
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${dataIndex} is required.`,
            },
          ]}
          getValueProps={(i) => {
            return {
              value: dateDataIndexes.includes(dataIndex) ? dayjs(i) : i,
            };
          }}
        >
          {dataIndex === 'status' ? (
            <Select
              ref={inputRef}
              onBlur={save}
              value={record[dataIndex]}
              options={[
                { label: 'New', value: 'New' },
                { label: 'Planned', value: 'Planned' },
                { label: 'In Progress', value: 'In Progress' },
                { label: 'Completed', value: 'Completed' },
                { label: 'Review', value: 'Review' },
              ]}
              dropdownRender={(menu) => {
                return menu;
              }}
            />
          ) : dateDataIndexes.includes(dataIndex) ? (
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
      </ConfigProvider>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={(e) => {
          e.stopPropagation();
          toggleEdit();
        }}
      >
        {dataIndex === 'status' ? (
          <Tag className="w-full text-center p-[2px]" color={statusColor}>
            {record[dataIndex]}
          </Tag>
        ) : dateDataIndexes.includes(dataIndex) ? (
          dayjs(record[dataIndex]).format('DD/MM/YYYY')
        ) : (
          children
        )}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
}
