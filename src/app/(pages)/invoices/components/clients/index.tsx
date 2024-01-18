import CustomButton from '@/app/component/customButton/button';
import { InputComponent } from '@/app/component/customInput/Input';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { Dropdown, Table, type MenuProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/navigation';

export function Clients() {
  const router = useRouter();
  const items: MenuProps['items'] = [
    {
      key: 'editInvoice',
      label: <a href="#">Edit Invoice</a>,
    },
    {
      key: 'collectPayments',
      label: <a href="#">Collect Payments</a>,
    },
    {
      key: 'markAsClosed',
      label: <a href="#">Mark as closed</a>,
    },
    {
      key: 'delete',
      label: <a href="#">Delete</a>,
    },
  ];
  const columns: ColumnsType<{}> = [
    {
      title: 'Invoice #',
      dataIndex: 'invoice',
    },
    {
      title: 'Invoice Name',
      dataIndex: 'invoiceName',
      ellipsis: true,
    },
    {
      title: 'Client Name',
      dataIndex: 'clientName',
    },
    {
      title: 'Project Name',
      dataIndex: 'projectName',
    },
    {
      title: 'Invoice Date',
      dataIndex: 'issueDate',
    },
    {
      title: 'Payment Due',
      dataIndex: 'dueDate',
    },
    {
      title: 'Total Payable',
      dataIndex: 'total',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      key: 'action',
      render: () => (
        <Dropdown
          menu={{
            items,
            onClick: () => { },
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
    <div className="w-full mb-4">
      <div className="flex justify-between flex-wrap items-center md:flex-nowrap mb-2">
        <TertiaryHeading title="Client invoice" className="text-graphiteGray" />
        <div className="flex items-center space-x-2 flex-1 justify-end">
          <div className="w-96 ">
            <InputComponent
              label=''
              placeholder="Search"
              name="search"
              prefix={<SearchOutlined />}
              field={{
                type: "text"
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
        loading={false}
        columns={columns}
        dataSource={[
          {
            invoice: '123',
            projectName: 'sadasd',
            name: 'ASsad',
            issueDate: '12th Jan',
            dueDate: '17th Jan',
            total: 1000,
          },
        ]}
        pagination={{ position: ['bottomCenter'] }}
      />
    </div>
  );
}
