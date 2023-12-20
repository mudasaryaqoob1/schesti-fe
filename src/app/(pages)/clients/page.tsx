'use client';
import { useEffect, useLayoutEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Dropdown, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

// module imports
import { AppDispatch } from '@/redux/store';
import { selectToken } from '@/redux/authSlices/auth.selector';
import { selectClients } from '@/redux/company/companySelector';
import { selectClientsLoading } from '@/redux/company/companySelector';
import { HttpService } from '@/app/services/base.service';
import CustomNavbar from '@/app/component/customNavbar';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { bg_style } from '@/globals/tailwindvariables';
import Button from '@/app/component/customButton/button';
import {
  deleteCompanyClient,
  fetchCompanyClients,
} from '@/redux/company/company.thunk';

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

  const token = useSelector(selectToken);

  const clientsData = useSelector(selectClients);
  const companyClientsLoading = useSelector(selectClientsLoading);

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
      await dispatch(deleteCompanyClient(client._id));
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
        <a className="bg-lime-100 text-[#027A48] bg-[#ECFDF3] px-2 py-1 rounded-full">
          Active
        </a>
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
          <a>
            <DownOutlined />
          </a>
        </Dropdown>
      ),
    },
  ];

  return (
    <CustomNavbar>
      <section className="mt-6 mb-[39px] md:ms-[69px] md:me-[59px] mx-4 rounded-xl ">
        <div
          className={`${bg_style} p-5 border border-solid border-silverGray`}
        >
          <div className="flex justify-between items-center mb-4">
            <TertiaryHeading
              title="Client List"
              className="text-graphiteGray"
            />
            <Button
              text="Add New client"
              className="!w-auto "
              icon="plus.svg"
              iconwidth={20}
              iconheight={20}
              onClick={() => router.push('/clients/create')}
            />
          </div>
          <Table
            loading={companyClientsLoading}
            columns={columns}
            dataSource={clientsData}
            pagination={{ position: ['bottomCenter'] }}
          />
        </div>
      </section>
    </CustomNavbar>
  );
};

export default ClientTable;
