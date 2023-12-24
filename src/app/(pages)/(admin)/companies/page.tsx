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
import {
  selectSubcontracters,
  selectSubcontractLoading,
} from '@/redux/company/companySelector';
import { HttpService } from '@/app/services/base.service';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { bg_style } from '@/globals/tailwindvariables';
import {
  deleteSubcontractor,
  fetchCompanySubcontractors,
} from '@/redux/company/company.thunk';

export interface DataType {
  company: string;
  companyRep: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  action: string;
}

const items: MenuProps['items'] = [
  {
    key: 'details',
    label: <a href="#">Details</a>,
  },
  {
    key: 'block',
    label: <a href="#">Block</a>,
  },
  {
    key: 'delete',
    label: <a href="#">Delete</a>,
  }
];

const CompaniesTable = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const token = useSelector(selectToken);

  const subcontractersData = useSelector(selectSubcontracters);
  const subcontractersLoading = useSelector(selectSubcontractLoading);

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  const fetchSubcontactors = useCallback(async () => {
    await dispatch(fetchCompanySubcontractors({ page: 1, limit: 10 }));
  }, [dispatch]);

  useEffect(() => {
    fetchSubcontactors();
  }, [fetchSubcontactors]);

  const handleDropdownItemClick = async (key: string, subcontractor: any) => {
    if (key == 'details') {
      router.push(`/subcontractor/edit/${subcontractor._id}`);
    }
    else if (key == 'delete') {
      await dispatch(deleteSubcontractor(subcontractor._id));
    } else if (key == 'block') {
      router.push(`/subcontractor/edit/${subcontractor._id}`);
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Company Name',
      dataIndex: 'compmanyName',
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
    <section className="mt-6 mb-[39px] md:ms-[69px] md:me-[59px] mx-4 rounded-xl ">
      <TertiaryHeading
        title="Manage Companies"
        className="text-graphiteGray"
      />
      <div
        className={`${bg_style} p-5 border border-solid border-silverGray`}
      >
        <Table
          loading={subcontractersLoading}
          columns={columns}
          dataSource={subcontractersData}
          pagination={{ position: ['bottomCenter'] }}
        />
      </div>
    </section>
  );
};

export default CompaniesTable;
