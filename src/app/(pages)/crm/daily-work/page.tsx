'use client';
import CustomButton from "@/app/component/customButton/button";
import WhiteButton from "@/app/component/customButton/white";
import { InputComponent } from "@/app/component/customInput/Input";
import { SelectComponent } from "@/app/component/customSelect/Select.component";
import TertiaryHeading from "@/app/component/headings/tertiary";
import { withAuth } from "@/app/hoc/withAuth";
import { SearchOutlined } from "@ant-design/icons";
import { Dropdown, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useRef, useState } from "react";
import { DailyWorkForm } from "./components/DailyWorkForm";
import * as Yup from 'yup';
import { isValidPhoneNumber } from "react-phone-number-input";
import { useFormik } from "formik";
import crmDailyWorkService, { ICrmDailyWorkCreate, ICrmDailyWorkUpdate } from "@/app/services/crm/crm-daily-work.service";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { DailyWorkDatePicker } from "./components/DailyWorkDatePicker";
import { ICrmDailyWork, IDailyWorkPriorty, IDailyWorkStatus } from "@/app/interfaces/crm/crm-daily-work.interface";
import Image from "next/image";
import { InputWithoutBorder } from "@/app/component/customInput/InputWithoutBorder";
import { ManageStatus } from "./components/ManageStatus";
import { ManagePriority } from "./components/ManagePriority";
import { DisplayPriority } from "./components/DisplayPriority";
import { DisplayDailyWorkStatus } from "./components/DisplayStatus";
import ModalComponent from "@/app/component/modal";
import { DeleteContent } from "@/app/component/delete/DeleteContent";

const ValidationSchema = Yup.object().shape({

    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().test({
        test: (value) => {
            if (value) {
                return isValidPhoneNumber(value);
            }
            return true;
        },
        message: 'Invalid phone number',
    }).required('Phone number is required'),
    work: Yup.string().required('Work Needed is required'),
    deadline: Yup.string().required('Deadline is required'),
    note: Yup.string().max(10, 'Note must have max 10 characters').required('Note is required'),

})

function DailyWorkPage() {
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('All');
    const inputFileRef = useRef<HTMLInputElement | null>(null);
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date().toISOString());
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<ICrmDailyWork[]>([]);
    const [statuses, setStatuses] = useState<IDailyWorkStatus[]>([]);
    const [isStatusLoading, setIsStatusLoading] = useState(false);
    const [priorities, setPriorities] = useState<IDailyWorkPriorty[]>([]);
    const [isPriorityLoading, setIsPriorityLoading] = useState(false);

    const [isPriorityCellEditing, setIsPriorityCellEditing] = useState(false);
    const [isStatusCellEditing, setIsStatusCellEditing] = useState(false);
    const [isNoteCellEditing, setIsNoteCellEditing] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedLead, setSelectedLead] = useState<ICrmDailyWork | null>(null);


    // eslint-disable-next-line no-undef
    const priorityCellRef = useRef<HTMLTableDataCellElement | null>(null);
    // eslint-disable-next-line no-undef
    const statusCellRef = useRef<HTMLTableDataCellElement | null>(null);
    // eslint-disable-next-line no-undef
    const noteCellRef = useRef<HTMLTableDataCellElement | null>(null);

    useEffect(() => {
        getDailyWork(currentDate);
    }, [currentDate])

    useEffect(() => {
        getDailyWorkStatus();
        getDailyWorkPriorities();
    }, [])

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (
                priorityCellRef.current &&
                !priorityCellRef.current.contains(event.target)
            ) {
                setIsPriorityCellEditing(false);
            }
            if (
                statusCellRef.current &&
                !statusCellRef.current.contains(event.target)
            ) {
                setIsStatusCellEditing(false);
            }
            if (
                noteCellRef.current &&
                !noteCellRef.current.contains(event.target)
            ) {
                setIsNoteCellEditing(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isPriorityCellEditing, isStatusCellEditing, isNoteCellEditing]);


    const formik = useFormik<ICrmDailyWorkCreate | ICrmDailyWorkUpdate>({
        initialValues: {
            email: '',
            phone: '',
            work: '',
            deadline: '',
            note: '',
        },
        validationSchema: ValidationSchema,
        onSubmit: (values) => {

            if ("_id" in values) {
                setIsSubmitting(true);
                crmDailyWorkService.httpUpdatedailyLead(values._id, values).then((response) => {
                    if (response.data) {
                        toast.success('Daily work updated successfully');
                        setData(
                            data.map((item) => {
                                if (item._id === response.data!._id) {
                                    return response.data!;
                                }
                                return item;
                            })
                        )
                        onClose();
                    }
                }).catch(error => {
                    const err = error as AxiosError<{ message: string }>;
                    toast.error(err.response?.data.message || 'An error occurred');
                }).finally(() => {
                    setIsSubmitting(false);
                })
            } else {
                createDailyWorkLead(values);
            }
        },
        enableReinitialize: true
    });

    function getDailyWork(date: string) {
        setIsLoading(true);
        crmDailyWorkService
            .httpGetDailyWorkByDate(date)
            .then((response) => {
                if (response.data) {
                    setData(response.data);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }




    async function createDailyWorkLead(values: ICrmDailyWorkCreate) {
        setIsSubmitting(true);
        try {
            const response = await crmDailyWorkService.httpCreateDailyWork(values);
            if (response.data) {
                toast.success('Daily work created successfully');
                setData([response.data, ...data,]);
                setOpen(false);
            }
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            toast.error(err.response?.data.message || 'An error occurred');
        } finally {
            setIsSubmitting(false);
        }

    }

    async function getDailyWorkStatus() {
        setIsStatusLoading(true);
        crmDailyWorkService
            .httpGetAllDailyWorkStatus()
            .then((response) => {
                if (response.data) {
                    setStatuses(response.data);
                }
            })
            .finally(() => {
                setIsStatusLoading(false);
            });
    }

    async function getDailyWorkPriorities() {
        setIsPriorityLoading(true);
        crmDailyWorkService
            .httpGetAllDailyWorkPriority()
            .then((response) => {
                if (response.data) {
                    setPriorities(response.data);
                }
            })
            .finally(() => {
                setIsPriorityLoading(false);
            });
    }

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };


    const handleSave = async (key: string, value: string, record: ICrmDailyWork) => {
        setIsPriorityCellEditing(false);
        setIsStatusCellEditing(false);
        setIsNoteCellEditing(false);
        setIsLoading(true);
        try {
            const response = await crmDailyWorkService.httpUpdatedailyLead(record._id, { ...record, [key]: value });
            if (response.data) {
                toast.success('Daily work updated successfully');

                setData(data.map(item => item._id === record._id ? response.data! : item));
            }
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            toast.error(err.response?.data.message || 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    }


    const columns: ColumnsType<ICrmDailyWork> = [
        {
            title: 'Priority',
            dataIndex: "priority",
            render(_val, record) {
                if (!record.priority || typeof record.priority === "string") {
                    return null;
                }
                return <div className="w-fit">
                    <DisplayPriority item={record.priority} />
                </div>
            },
            onCell: (record, rowIndex) => {
                return {
                    inputType: "priority",
                    onClick: (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setIsPriorityCellEditing(true);
                    },
                    editing: isPriorityCellEditing,
                    priorities: priorities,
                    handleSave,
                    record,
                    rowIndex,
                    cellRef: priorityCellRef
                }
            }
        },
        {
            title: 'Work Needed',
            dataIndex: 'work',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Note',
            dataIndex: 'note',
            render(value: string) {
                return <div className="flex items-center space-x-4 justify-between">
                    {value}

                    <span className="text-schestiPrimaryBlack">
                        {value.length}/10
                    </span>
                </div>;
            },
            width: 200,
            onCell: (record, rowIndex) => {
                return {
                    inputType: "note",
                    onClick: (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setIsNoteCellEditing(true);
                    },
                    editing: isNoteCellEditing,
                    handleSave,
                    record,
                    rowIndex,
                    cellRef: noteCellRef
                }
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render(_val, record) {
                if (!record.status || typeof record.status === "string") {
                    return null;
                }
                return <DisplayDailyWorkStatus item={record.status} />
            },
            onCell: (record, rowIndex) => {
                return {
                    inputType: "status",
                    onClick: (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setIsStatusCellEditing(true);
                    },
                    editing: isStatusCellEditing,
                    statuses: statuses,
                    handleSave,
                    record,
                    rowIndex,
                    cellRef: statusCellRef
                }
            }
        },
        {
            title: 'Action',
            render(_val, record) {
                return <Dropdown
                    menu={{
                        items: [
                            { key: "edit", label: "Edit" },
                            { key: "delete", label: "Delete" },
                        ],
                        onClick: (e) => {
                            if (e.key === "edit") {
                                showDrawer();
                                formik.setValues({
                                    deadline: record.deadline.toString(),
                                    email: record.email,
                                    note: record.note,
                                    phone: record.phone,
                                    work: record.work,
                                    _id: record._id,
                                });
                            } else if (e.key === "delete") {
                                setShowDeleteModal(true);
                                setSelectedLead(record);
                            }
                        },
                    }}
                >
                    <Image
                        src="/menuIcon.svg"
                        alt="logo white icon"
                        width={20}
                        height={20}
                        className="cursor-pointer"
                    />
                </Dropdown>
            },
        },
    ];



    return (
        <section className="mt-6 mb-[39px] bg-white p-5  mx-4 rounded-xl ">
            <DailyWorkForm
                formik={formik}
                onClose={onClose}
                open={open}
                isSubmitting={isSubmitting}
                onSubmit={formik.handleSubmit}
            />

            {selectedLead && showDeleteModal ? <ModalComponent
                open={showDeleteModal}
                setOpen={setShowDeleteModal}
                width="30%"
            >
                <DeleteContent
                    onClick={() => {

                    }}
                    isLoading={false}
                    onClose={() => setShowDeleteModal(false)}
                />
            </ModalComponent> : null}

            <div className="flex justify-between items-center mb-3">
                <TertiaryHeading className={'mt-1 mb-2'} title="Daily Work Needed" />

                <div className=" flex items-center space-x-3">
                    <div className="w-96">
                        <InputComponent
                            label=""
                            type="text"
                            placeholder="Search"
                            name="search"
                            prefix={<SearchOutlined />}
                            field={{
                                type: 'text',
                                value: search,
                                onChange: (e: any) => {
                                    setSearch(e.target.value);
                                },
                                className: '!py-2',
                            }}
                        />
                    </div>

                    <SelectComponent
                        label=""
                        name=""
                        placeholder="Priority"
                        field={{
                            options: []
                        }}
                    />
                    <SelectComponent
                        label=""
                        name=""
                        placeholder="Status"
                        field={{
                            value: status ? status : undefined,
                            options: [
                                { label: 'Active', value: 'active' },
                                { label: 'In Active', value: 'inactive' },
                                { label: 'All', value: 'all' },
                            ],
                            onChange: (value) => {
                                setStatus(value);
                            },
                            allowClear: true,
                            onClear() {
                                setStatus('');
                            },
                        }}
                    />

                    <div>
                        <WhiteButton
                            text="Export"
                            className="!w-fit !py-2.5"
                            icon="/download-icon.svg"
                            iconwidth={20}
                            iconheight={20}
                        />
                    </div>
                    <div>
                        <WhiteButton
                            text="Import"
                            className="!w-fit !py-2.5"
                            icon="/uploadcloud.svg"
                            iconwidth={20}
                            iconheight={20}
                            loadingText="Uploading..."
                        />
                        <input
                            ref={inputFileRef}
                            accept=".csv, .xlsx"
                            type="file"
                            name=""
                            id="importClients"
                            className="hidden"

                        />
                    </div>

                    {/* <div>
                        <WhiteButton
                            text="Invite"
                            className="!border-schestiPrimary !text-schestiPrimary"
                        />
                    </div> */}
                    <CustomButton
                        text="Add New Lead"
                        className="!w-fit !py-2.5"
                        icon="/plus.svg"
                        iconwidth={20}
                        iconheight={20}
                        onClick={showDrawer}
                    />
                </div>
            </div>

            <div className="mt-5 flex items-center justify-between">

                <DailyWorkDatePicker

                    value={currentDate}
                    onChange={setCurrentDate}
                />

                <div className="flex items-center space-x-3">

                    <ManagePriority
                        priorities={priorities}
                        onCreate={priority => {
                            setPriorities([priority, ...priorities,])
                        }}
                        isFetching={isPriorityLoading}
                        onUpdate={priority => {
                            setPriorities(priorities.map(_priority => _priority._id === priority._id ? priority : _priority))
                        }}
                        onDelete={
                            priority => {
                                setPriorities(priorities.filter(_priority => _priority._id !== priority._id))
                            }
                        }
                    />

                    <ManageStatus
                        statuses={statuses}
                        onCreate={status => {
                            setStatuses([status, ...statuses,])
                        }}
                        isFetching={isStatusLoading}
                        onUpdate={status => {
                            setStatuses(statuses.map(_status => _status._id === status._id ? status : _status))
                        }}
                        onDelete={status => {
                            setStatuses(statuses.filter(_status => _status._id !== status._id))
                        }}
                    />
                </div>
            </div>



            <div className="mt-5">
                <Table
                    columns={columns}
                    dataSource={data}
                    loading={isLoading}
                    bordered
                    components={{
                        body: {
                            cell: EditableCell
                        }
                    }}
                />
            </div>
        </section>
    );
}

export default withAuth(DailyWorkPage)

type EditableCellProps = {
    editing: boolean;
    dataIndex: any;
    title: any;
    inputType: 'status' | 'priority' | 'note';
    record: any;
    rowIndex: any;
    statuses: IDailyWorkStatus[];
    priorities: IDailyWorkPriorty[];
    children: React.ReactNode;
    handleSave: (..._args: any) => void;
    // eslint-disable-next-line no-undef
    cellRef: React.RefObject<HTMLTableDataCellElement>;
    [key: string]: any;
}
function EditableCell(props: EditableCellProps) {

    const {
        editing,
        inputType,
        children,
        handleSave,
        record,
        cellRef,
        ...restProps
    } = props;

    const [note, setNote] = useState(record?.note || '');
    useEffect(() => {
        if (editing && inputType === 'note') {
            cellRef.current?.querySelector('input')?.focus();
        }
    }, [editing, inputType, cellRef])





    return (
        <td {...restProps} ref={cellRef}>
            {editing && (inputType === 'priority' || inputType === 'status') ? (
                <div onClick={(e) => e.stopPropagation()} className="relative capitalize">
                    <span className="font-medium">Choose {inputType}</span>
                    <div className="absolute bg-white border rounded-md w-[200px] top-6 p-3 z-10 space-y-2">
                        {inputType === 'priority' ? (
                            props.priorities.map((priority: IDailyWorkPriorty) => (
                                <DisplayPriority onClick={(e) => {
                                    e.stopPropagation();
                                    handleSave("priority", priority._id, record);
                                }} key={priority._id} item={priority} />
                            ))
                        ) : inputType === 'status' ? (
                            props.statuses.map((status: IDailyWorkStatus) => (
                                <DisplayDailyWorkStatus onClick={e => {
                                    e.stopPropagation();
                                    handleSave("status", status._id, record);
                                }} key={status._id} item={status} />
                            ))
                        ) : null}
                    </div>
                </div>
            ) : editing && inputType === 'note' ? (
                <InputWithoutBorder
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    placeholder="Enter note"
                    onBlur={(e) => {
                        e.stopPropagation();
                        handleSave("note", note, record)
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.stopPropagation();
                            handleSave("note", note, record)
                        }
                    }}
                />
            ) : (
                children
            )}
        </td>
    );
}