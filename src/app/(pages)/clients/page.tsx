'use client';
import { useEffect, useLayoutEffect, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dropdown, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

// module imports
import { AppDispatch } from '@/redux/store';
import { selectToken } from '@/redux/authSlices/auth.selector';
import { selectClients } from '@/redux/company/companySelector';
import { selectClientsLoading } from '@/redux/company/companySelector';
import { HttpService } from '@/app/services/base.service';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { bg_style } from '@/globals/tailwindvariables';
import Button from '@/app/component/customButton/button';
import {
  deleteCompanyClient,
  fetchCompanyClients,
} from '@/redux/company/company.thunk';
import Image from 'next/image';
import { SearchOutlined } from '@ant-design/icons';
import { InputComponent } from '@/app/component/customInput/Input';
import { IClient } from '@/app/interfaces/companyInterfaces/companyClient.interface';
import { DeleteContent } from '@/app/component/delete/DeleteContent';
import ModalComponent from '@/app/component/modal';

interface DataType {
  firstName: string;
  companyName: string;
  email: number;
  phone: string;
  address: string;
  status: string;
  action: string;
}

const items: MenuProps['items'] = [
  {
    key: 'createEstimateRequest',
    label: <a href="#">Create estimate request</a>,
  },
  {
    key: 'createNewInvoice',
    label: <a href="#">Create new invoice</a>,
  },
  {
    key: 'createSchedule',
    label: <a href="#">Create Schedule</a>,
  },
  {
    key: 'editClientDetail',
    label: <a href="#">Edit client details</a>,
  },
  {
    key: 'deleteClient',
    label: <p>Delete</p>,
  },
];

const ClientTable = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const clientsData: IClient[] | null = useSelector(selectClients);
  const companyClientsLoading = useSelector(selectClientsLoading);
  const [search, setSearch] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<IClient | null>(null);

  const token = useSelector(selectToken);
  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  const memoizedSetPerson = useCallback(async () => {
    await dispatch(fetchCompanyClients({ page: 1, limit: 10 }));
  }, [dispatch]);

  useEffect(() => {
    memoizedSetPerson();
  }, [memoizedSetPerson]);

  const handleDropdownItemClick = async (key: string, client: any) => {
    if (key == 'deleteClient') {
      setSelectedClient(client);
      setShowDeleteModal(true);

      // await dispatch(deleteCompanyClient(client._id));
    } else if (key == 'editClientDetail') {
      router.push(`/clients/edit/${client._id}`);
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
      render: () => (
        <p className="bg-lime-100 w-max text-[#027A48] bg-[#ECFDF3] px-2 py-1 rounded-full">
          Active
        </p>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      key: 'action',
      render: (text, record) => (
        <Dropdown
          menu={{
            items,
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
      ),
    },
  ];
  const filteredClients = clientsData ? clientsData.filter((client) => {
    if (!search) {
      return client;
    }
    return client.firstName.toLowerCase().includes(search.toLowerCase()) || client.lastName.toLowerCase().includes(search.toLowerCase()) || client.email?.includes(search);
  }) : []
  return (
    <section className="mt-6 mb-[39px] md:ms-[69px] md:me-[59px] mx-4 rounded-xl ">
      {selectedClient && showDeleteModal ? <ModalComponent open={showDeleteModal} setOpen={setShowDeleteModal} width='30%'>
        <DeleteContent
          onClick={async () => {
            if ("_id" in selectedClient) {
              await dispatch(deleteCompanyClient(selectedClient._id as string));
            }
            setShowDeleteModal(false);
          }}
          onClose={() => setShowDeleteModal(false)}
        />
      </ModalComponent> : null}
      <div
        className={`${bg_style} p-5 border border-solid border-silverGray`}
      >
        <div className="flex justify-between items-center mb-4">
          <TertiaryHeading
            title="Client List"
            className="text-graphiteGray"
          />
          <div className=' flex space-x-3'>
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
                  }
                }}
              />
            </div>
            <Button
              text="Add New client"
              className="!w-48 "
              icon="plus.svg"
              iconwidth={20}
              iconheight={20}
              onClick={() => router.push('/clients/create')}
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

export default ClientTable;
