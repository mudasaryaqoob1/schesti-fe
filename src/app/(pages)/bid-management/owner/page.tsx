'use client';
import CustomButton from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import { InputComponent } from '@/app/component/customInput/Input';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { withAuth } from '@/app/hoc/withAuth';
import { SearchOutlined } from '@ant-design/icons';
import { Dropdown, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/navigation';
import { Routes } from '@/app/utils/plans.utils';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { postProjectActions, resetPostProjectAction, setFormStepAction, setPostProjectAction } from '@/redux/post-project/post-project.slice';
import { IBidManagement } from '@/app/interfaces/bid-management/bid-management.interface';
import { useQuery } from 'react-query';
import { bidManagementService } from '@/app/services/bid-management.service';
import { Country } from 'country-state-city';
import moment from 'moment';
import Image from 'next/image';
import { useState } from 'react';
import { DeletePopup } from './post/components/DeletePopup';

function Page() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const [selectedProject, setSelectedProject] = useState<IBidManagement | null>(null);
    const [showProjectDeleteModal, setShowProjectDeleteModal] = useState<boolean>(false);

    const projectsQuery = useQuery(['projects'], () => {
        return bidManagementService.httpGetOwnerProjects();
    });


    const columns: ColumnsType<IBidManagement> = [
        {
            key: 'projectName',
            dataIndex: 'projectName',
            title: 'Project',
        },
        {
            key: 'estimatedStartDate',
            dataIndex: 'estimatedStartDate',
            title: 'Estimated Start Date',
            render(value) {
                // write the format pattern
                return moment(value).format('YYYY-MM-DD');
            },
        },
        {
            key: 'country',
            dataIndex: 'country',
            title: 'Location',
            render(_value, record) {
                return `${record.city}, ${Country.getCountryByCode(record.country)?.name}`;
            },
        },
        {
            key: 'stage',
            dataIndex: 'stage',
            title: 'Stage',
        },
        {
            key: 'status',
            dataIndex: 'status',
            title: 'Status',
            render(value) {
                if (value === 'active') {
                    return (
                        <Tag className="rounded-full" color="green">
                            Active
                        </Tag>
                    );
                }
                if (value === 'draft') {
                    return (
                        <Tag
                            className="rounded-full"
                            color="#F8F9FC"
                            style={{ color: '#363F72' }}
                        >
                            Draft
                        </Tag>
                    );
                }
                return (
                    <Tag
                        className="rounded-full"
                        color="#ECF2FF"
                        style={{ color: '#026AA2' }}
                    >
                        Expired
                    </Tag>
                );
            },
            filters: [
                {
                    text: 'Active',
                    value: 'active',
                },
                {
                    text: 'Draft',
                    value: 'draft',
                },
                {
                    text: 'Expired',
                    value: 'expired',
                },
                {
                    text: 'Archived',
                    value: 'archived',
                },
            ],
            // @ts-ignore
            onFilter: (value: string, record) => record.status.startsWith(value),
            filterSearch: true,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            align: 'center',
            key: 'action',
            render: (value, record) => (
                <Dropdown
                    menu={{
                        items: [
                            {
                                key: 'edit',
                                label: <p>Edit</p>,
                            },
                            {
                                key: 'view',
                                label: <p>View</p>,
                            },
                            {
                                key: 'delete',
                                label: <p>Delete</p>,
                            },
                        ],
                        onClick: ({ key }) => {
                            if (key === 'edit') {
                                dispatch(setPostProjectAction(record));
                                dispatch(setFormStepAction(0));
                                dispatch(postProjectActions.setTeamMemers(record.teamMembers));
                                console.log('Edit Team Members', record.teamMembers);
                                router.push(`${Routes['Bid Management'].Owner}/post`);
                            }
                            if (key === 'delete') {
                                setSelectedProject(record);
                                setShowProjectDeleteModal(true);
                            }

                        },
                    }}
                    placement="bottomRight"
                    trigger={['click']}
                >
                    <Image
                        src={'/menuIcon.svg'}
                        alt="logo white icon"
                        width={20}
                        height={20}
                        className="active:scale-105 cursor-pointer"
                    />
                </Dropdown>
            ),
        },
    ];

    const projects = projectsQuery.data ? projectsQuery.data.data?.projects : [];

    return (
        <section className="mt-6 mb-[39px] md:ms-[69px] md:me-[59px] mx-4 rounded-xl bg-white shadow-xl px-8 py-9">
            <div className="flex justify-between items-center">
                <TertiaryHeading
                    title="My posted project"
                    className="text-xl leading-7"
                />
                {selectedProject ? <DeletePopup
                    closeModal={() => setShowProjectDeleteModal(false)}
                    message='Are you sure you want to delete this project?'
                    onConfirm={() => { }}
                    open={showProjectDeleteModal}
                    title='Delete Project'
                    isLoading={false}
                /> : null}
                <div className="flex-1 flex items-center space-x-4 justify-end ">
                    <div className="!w-96">
                        <InputComponent
                            label=""
                            type="text"
                            placeholder="Search"
                            name="search"
                            prefix={<SearchOutlined />}
                            field={{
                                type: 'text',
                            }}
                        />
                    </div>
                    <WhiteButton
                        text="Export"
                        icon="/uploadcloud.svg"
                        iconheight={20}
                        className="!w-32"
                        iconwidth={20}
                    />
                    <CustomButton
                        icon="/plus.svg"
                        className="!w-48"
                        iconheight={20}
                        iconwidth={20}
                        text="Post New Project"
                        onClick={() => {
                            dispatch(resetPostProjectAction());
                            router.push(`${Routes['Bid Management'].Owner}/post`);
                        }}
                    />
                </div>
            </div>

            <div className="mt-10">
                <Table
                    columns={columns}
                    dataSource={projects}
                    loading={projectsQuery.isLoading}
                />
            </div>
        </section>
    );
}

export default withAuth(Page);
