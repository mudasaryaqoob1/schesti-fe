'use client';
import { useEffect, useLayoutEffect, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dropdown, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

// module imports
import { AppDispatch } from '@/redux/store';
import { selectToken } from '@/redux/authSlices/auth.selector';
import { HttpService } from '@/app/services/base.service';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { bg_style } from '@/globals/tailwindvariables';
import { blockUser, deleteUser, fetchUsers, unBlockUser } from '@/redux/userSlice/user.thunk';

export interface DataType {
  company: string;
  email: string;
  phone: string;
  address: string;
  isActive: string;
  status: string;
  action: string;
}



const CompaniesTable = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [usersData, setUsersData] = useState([]);

  const token = useSelector(selectToken);

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  const fetUsers = useCallback(async () => {
    let result: any = await dispatch(
      fetchUsers({ limit: 9, page: 1 })
    );
    setUsersData(result.payload.data.employees);
  }, [dispatch]);

  useEffect(() => {
    fetUsers();
  }, [fetUsers]);

  const handleDropdownItemClick = async (key: string, user: any) => {
    if (key == 'details') {
      router.push(`/user/${user._id}`);
    }
    else if (key == 'delete') {
      await dispatch(deleteUser(user._id));
    } else if (key == 'block') {
      await dispatch(blockUser(user._id));
    } else if (key === 'unBlock') {
      await dispatch(unBlockUser(user._id));
    }
  };

  const items = (type: string): MenuProps['items'] => [
    {
      key: 'details',
      label: <a href="#">Details</a>,
    },
    {
      key: type === 'block' ? 'unBlock' : 'block',
      label: <a href="#">{type === 'block' ? 'UnBlock' : 'Block'}</a>,
    },
    {
      key: 'delete',
      label: <a href="#">Delete</a>,
    }
  ];

  // const items: MenuProps['items'] = [
  //   {
  //     key: 'details',
  //     label: <a href="#">Details</a>,
  //   },
  //   {
  //     key: 'block',
  //     label: <a href="#">UnBlock</a>,
  //   },
  //   {
  //     key: 'delete',
  //     label: <a href="#">Delete</a>,
  //   }
  // ];

  const columns: ColumnsType<DataType> = [
    {
      title: 'Company Name',
      dataIndex: 'name',
    },
    {
      title: 'Industry',
      dataIndex: 'industry',
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
      title: 'Subscription Type',
      dataIndex: 'activeSubscription',
    },
    {
      title: 'Subscription Level',
      dataIndex: 'isActive',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      key: 'action',
      render: (text, record) => {
        console.log({ record, items: items(record.isActive) });

        return (
          <Dropdown
            menu={{
              items: items(record.isActive),
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
        )
      },
    },
  ];

  return (
    <section className="mt-6 mb-[39px] md:ms-[69px] md:me-[59px] mx-4 rounded-xl ">
      <TertiaryHeading
        title="Manage Companies"
        className="text-graphiteGray"
      />
      <div
        className={`${bg_style} p-5 border border-solid border-silverGray`}
      >
        <Table
          loading={false}
          columns={columns}
          dataSource={usersData}
          pagination={{ position: ['bottomCenter'] }}
        />
      </div>
    </section>
  );
};

export default CompaniesTable;
