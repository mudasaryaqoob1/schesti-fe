'use client';
import { useEffect, useCallback, useState } from 'react';
import { Dropdown, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

// module imports
import { AppDispatch } from '@/redux/store';
import { selectClients } from '@/redux/company/companySelector';
import { selectClientsLoading } from '@/redux/company/companySelector';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { bg_style } from '@/globals/tailwindvariables';
import Button from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import {
  deleteCompanyClient,
  fetchCompanyClients,
  changeCompanyClientStatus,
} from '@/redux/company/company.thunk';
import Image from 'next/image';
import { SearchOutlined } from '@ant-design/icons';
import { InputComponent } from '@/app/component/customInput/Input';
import { IClient } from '@/app/interfaces/companyInterfaces/companyClient.interface';
import { DeleteContent } from '@/app/component/delete/DeleteContent';
import ModalComponent from '@/app/component/modal';
import { withAuth } from '@/app/hoc/withAuth';
import { Routes } from '@/app/utils/plans.utils';
import { useRouterHook } from '@/app/hooks/useRouterHook';
import { Excel } from 'antd-table-saveas-excel';

interface DataType {
  firstName: string;
  companyName: string;
  email: number;
  phone: string;
  address: string;
  status: string;
  action: string;
}

const activeClientMenuItems: MenuProps['items'] = [
  {
    key: 'createEstimateRequest',
    label: <p>Create Estimate Request</p>,
  },
  {
    key: 'createNewInvoice',
    label: <p>Create Invoice</p>,
  },
  {
    key: 'createSchedule',
    label: <p>Create Schedule</p>,
  },
  {
    key: 'editClientDetail',
    label: <p>Edit Client Details</p>,
  },
  {
    key: 'createContract',
    label: <p>Create Contract</p>,
  },
  {
    key: 'createNewTakeoff',
    label: <p>Create New Takeoff</p>,
  },
  {
    key: 'email',
    label: <p>Email</p>,
  },
  {
    key: 'deleteClient',
    label: <p>Delete</p>,
  },
  {
    key: 'inActiveClient',
    label: <p>In Active</p>,
  },
];

const inActiveClientMenuItems: MenuProps['items'] = [
  {
    key: 'activeClient',
    label: <p>Active</p>,
  },
];

const ClientTable = () => {
  const router = useRouterHook();
  const dispatch = useDispatch<AppDispatch>();

  const clientsData: IClient[] | null = useSelector(selectClients);
  const companyClientsLoading = useSelector(selectClientsLoading);
  const [search, setSearch] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<IClient | null>(null);

  const fetchClientCall = useCallback(async () => {
    await dispatch(fetchCompanyClients({ page: 1, limit: 10 }));
  }, []);

  useEffect(() => {
    fetchClientCall();
  }, []);

  const handleDropdownItemClick = async (key: string, client: any) => {
    if (key === 'createEstimateRequest') {
      router.push(`/estimates/requests/create?clientId=${client._id}`);
    } else if (key === 'createNewInvoice') {
      router.push(`/financial/aia-invoicing`);
    } else if (key === 'createSchedule') {
      router.push(`/schedule`);
    } else if (key == 'deleteClient') {
      setSelectedClient(client);
      setShowDeleteModal(true);
    } else if (key == 'editClientDetail') {
      router.push(`${Routes.CRM.Clients}/edit/${client._id}`);
    } else if (key == 'activeClient') {
      await dispatch(
        changeCompanyClientStatus({ clientId: client._id, status: true })
      );
      fetchClientCall();
    } else if (key === 'inActiveClient') {
      await dispatch(
        changeCompanyClientStatus({ clientId: client._id, status: false })
      );
      fetchClientCall();
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Client Name',
      dataIndex: 'firstName',
    },
    {
      title: 'Company',
      dataIndex: 'companyName',
      ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone number',
      dataIndex: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_, value) => {
        if (value.status) {
          return (
            <Tag className="rounded-full" color="green">
              Active
            </Tag>
          );
        } else {
          return (
            <Tag className="rounded-full" color="red">
              In Active
            </Tag>
          );
        }
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      key: 'action',
      // render: (text, record) => (
      //   <Dropdown
      //     menu={{
      //       items,
      //       onClick: (event) => {
      //         const { key } = event;
      //         handleDropdownItemClick(key, record);
      //       },
      //     }}
      //     placement="bottomRight"
      //   >
      //     <Image
      //       src={'/menuIcon.svg'}
      //       alt="logo white icon"
      //       width={20}
      //       height={20}
      //       className="active:scale-105 cursor-pointer"
      //     />
      //   </Dropdown>
      // ),
      render: (text, record: any) => {
        if (record?.status) {
          return (
            <Dropdown
              menu={{
                items: activeClientMenuItems,
                onClick: (event) => {
                  const { key } = event;
                  handleDropdownItemClick(key, record);
                },
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
        } else {
          return (
            <Dropdown
              menu={{
                items: inActiveClientMenuItems,
                onClick: (event) => {
                  const { key } = event;
                  handleDropdownItemClick(key, record);
                },
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
        }
      },
    },
  ];

  const filteredClients = clientsData
    ? clientsData
      .filter((client) => {
        if (!search) {
          return {
            ...client,
          };
        }
        return (
          client.firstName.toLowerCase().includes(search.toLowerCase()) ||
          client.lastName.toLowerCase().includes(search.toLowerCase()) ||
          client.companyName.toLowerCase().includes(search.toLowerCase()) ||
          client.email?.includes(search) ||
          client.phone?.includes(search) ||
          client.address?.includes(search)
        );
      })
      .map((clientRecord) => {
        return {
          ...clientRecord,
          firstName: `${clientRecord.firstName} ${clientRecord.lastName}`,
        };
      })
    : [];


  function downloadClientsCSV(data: IClient[]) {
    const excel = new Excel();
    excel
      .addSheet('Clients')
      .addColumns([
        {
          dataIndex: "firstName",
          title: "First Name",
        },
        {
          dataIndex: "lastName",
          title: "Last Name",
        },
        {
          dataIndex: "companyName",
          title: "Company Name"
        },
        {
          dataIndex: "phone",
          title: "Phone Number"
        },
        {
          dataIndex: "address",
          title: "Address"
        },
        {
          dataIndex: "secondAddress",
          title: "Second Address"
        }
      ])
      .addDataSource(data)
      .saveAs(`crm-clients-${Date.now()}.xlsx`);
  }

  return (
    <section className="mt-6 mb-[39px] md:ms-[69px] md:me-[59px] mx-4 rounded-xl ">
      {selectedClient && showDeleteModal ? (
        <ModalComponent
          open={showDeleteModal}
          setOpen={setShowDeleteModal}
          width="30%"
        >
          <DeleteContent
            onClick={async () => {
              if ('_id' in selectedClient) {
                await dispatch(
                  deleteCompanyClient(selectedClient._id as string)
                );
              }
              setShowDeleteModal(false);
            }}
            onClose={() => setShowDeleteModal(false)}
          />
        </ModalComponent>
      ) : null}
      <div className={`${bg_style} p-5 border border-solid border-silverGray`}>
        <div className="flex justify-between items-center mb-4">
          <TertiaryHeading title="Client List" className="text-graphiteGray" />
          <div className=" flex space-x-3">
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
                }}
              />
            </div>
            <WhiteButton
              text='Export'
              className='!w-fit'
              icon='/download-icon.svg'
              iconwidth={20}
              iconheight={20}
              onClick={() => {
                if (clientsData) {
                  downloadClientsCSV(clientsData)
                }
              }}
            />
            <WhiteButton
              text='Import'
              className='!w-fit'
              icon='/uploadcloud.svg'
              iconwidth={20}
              iconheight={20}
            />
            <Button
              text="Add New client"
              className="!w-48"
              icon="/plus.svg"
              iconwidth={20}
              iconheight={20}
              onClick={() => router.push(`${Routes.CRM.Clients}/create`)}
            />
          </div>
        </div>
        <Table
          loading={companyClientsLoading}
          columns={columns as ColumnsType<IClient>}
          dataSource={filteredClients}
          pagination={{ position: ['bottomCenter'] }}
        />
      </div>
    </section>
  );
};

export default withAuth(ClientTable);
