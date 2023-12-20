'use client';
import { useEffect, useLayoutEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import { useRouter } from 'next/navigation';

// module imports
import { AppDispatch } from '@/redux/store';
import Button from '@/app/component/customButton/button';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { fetchCompanyEmployee } from '@/redux/userSlice/user.thunk';
import { selectToken } from '@/redux/authSlices/auth.selector';
import { HttpService } from '@/app/services/base.service';
import VerticleBar from '@/app/(pages)//settings/verticleBar';
import { DownOutlined } from '@ant-design/icons';
import moment from 'moment';

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

const Index = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const token = useSelector(selectToken);

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  const [userData, setUserData] = useState([]);

  const fetchCompanyEmployeeHandler = useCallback(async () => {
    let result: any = await dispatch(
      fetchCompanyEmployee({ limit: 9, page: 1 })
    );

    setUserData(
      result.payload.data.employees.map((user: any) => {
        return {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          role: user.role,
          invitationDate: moment(user.createdAt).format('ll'),
        };
      })
    );
  }, [dispatch]);

  useEffect(() => {
    fetchCompanyEmployeeHandler();
  }, [fetchCompanyEmployeeHandler]);

  const handleDropdownItemClick = async (key: string, client: any) => {
    console.log(key, client);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
    },

    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
    },
    {
      title: 'Invitation Date',
      dataIndex: 'invitationDate',
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
    <VerticleBar>
      <div className="w-full">
        <div className="flex justify-between items-center mb-3">
          <TertiaryHeading title="User Managements" />
          <Button
            text="Invite new user"
            className="!w-auto "
            icon="/plus.svg"
            iconwidth={20}
            iconheight={20}
            onClick={() => router.push('/settings/companyUser/addCompanyUser')}
          />
        </div>
        <article className="bg-snowWhite rounded-2xl shadow-instentWhite py-5 px-6">
          <div
            className="rounded-lg border border-Gainsboro
                     bg-silverGray w-[464px] h-[40px] 
                      my-5 flex items-center gap-2 px-3.5 py-2.5"
          >
            <Image
              src={'/search.svg'}
              alt="search icon "
              width={16}
              height={16}
              className="cursor-pointer"
            />
            <input
              type="search"
              name=""
              id=""
              placeholder="Search..."
              className="w-full h-full bg-transparent outline-none"
            />
          </div>
          <Table
            columns={columns}
            dataSource={userData}
            pagination={{ position: ['bottomCenter'] }}
          />
        </article>
      </div>
    </VerticleBar>
  );
};

export default Index;
