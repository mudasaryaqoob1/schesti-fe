import type { ColumnsType } from 'antd/es/table';
import { Dropdown, Table, type MenuProps } from 'antd';
import { useRouter } from 'next/navigation';
import { SearchOutlined } from '@ant-design/icons';

import CustomButton from '@/app/component/customButton/button';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { InputComponent } from '@/app/component/customInput/Input';
import { useCallback, useEffect } from 'react';
import {
  deleteContractorInvoiceRequest,
  fetchSubcontractorInvoices,
} from '@/redux/invoice/invoice.thunk';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import {
  selectInvoices,
  selectInvoicesLoading,
} from '@/redux/invoice/invoice.selector';
import type { IInvoice } from '@/app/interfaces/invoices.interface';
import Image from 'next/image';
import moment from 'moment';

export function Contractors() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const subcontractersInvoices = useSelector(selectInvoices);
  const subcontractersInvoicesLoading = useSelector(selectInvoicesLoading);

  const fetchSubcontactorsInvoices = useCallback(async () => {
    await dispatch(fetchSubcontractorInvoices({}));
  }, [dispatch]);

  useEffect(() => {
    fetchSubcontactorsInvoices();
  }, [fetchSubcontactorsInvoices]);

  const items: MenuProps['items'] = [
    {
      key: 'view',
      label: <p>View Invoice</p>,
    },
    {
      key: 'editInvoice',
      label: <p>Edit Invoice</p>,
    },
    {
      key: 'collectPayments',
      label: <p>Collect Payments</p>,
    },
    {
      key: 'markAsClosed',
      label: <p>Mark as closed</p>,
    },
    {
      key: 'delete',
      label: <p>Delete</p>,
    },
  ];

  async function handleDropdownItemClick(key: string, record: IInvoice) {
    if (key === 'editInvoice') {
      router.push(`/invoices/edit/${record._id}`);
    } else if (key === 'delete') {
      await dispatch(deleteContractorInvoiceRequest(record._id));
    } else if (key === 'view') {
      router.push(`/invoices/view/${record._id}`);
    }
  }
  const columns: ColumnsType<IInvoice> = [
    {
      title: 'Invoice #',
      dataIndex: 'invoiceNumber',
    },
    {
      title: 'Subcontractor Name',
      dataIndex: 'subContractorFirstName',
      ellipsis: true,
    },
    {
      title: 'Project Name',
      dataIndex: 'projectName',
    },
    {
      title: 'Invoice Date',
      dataIndex: 'issueDate',
      render(value) {
        return <p>{moment(value).format('DD/MM/YYYY')}</p>;
      },
    },
    {
      title: 'Payment Due',
      dataIndex: 'dueDate',
      render(value) {
        return <p>{moment(value).format('DD/MM/YYYY')}</p>;
      },
    },
    {
      title: 'Total Payable',
      dataIndex: 'totalPayable',
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
  return (
    <div className="w-full mb-4">
      <div className="flex justify-between flex-wrap items-center md:flex-nowrap mb-2">
        <TertiaryHeading
          title="Contractor/ Subcontractor/ Vendor invoice"
          className="text-graphiteGray"
        />
        <div className="flex items-center space-x-2 flex-1 justify-end">
          <div className="w-96 ">
            <InputComponent
              label=""
              type='text'
              placeholder="Search"
              name="search"
              prefix={<SearchOutlined />}
              field={{
                type: 'text',
              }}
            />
          </div>
          <CustomButton
            text="Create Invoice"
            icon="/plus.svg"
            className="!w-auto"
            iconwidth={20}
            iconheight={20}
            onClick={() => router.push('/invoices/create')}
          />
        </div>
      </div>

      <Table
        loading={subcontractersInvoicesLoading}
        columns={columns}
        dataSource={subcontractersInvoices}
        pagination={{ position: ['bottomCenter'] }}
      />
    </div>
  );
}
