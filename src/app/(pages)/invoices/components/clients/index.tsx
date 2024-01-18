import CustomButton from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import { InputComponent } from '@/app/component/customInput/Input';
import TertiaryHeading from '@/app/component/headings/tertiary';
import ModalComponent from '@/app/component/modal';
import { CloseOutlined, DownOutlined, SearchOutlined } from '@ant-design/icons';
import { Dropdown, Table, type MenuProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function Clients() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [invoiceName, setInvoiceName] = useState('')

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
              label=""
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
            onClick={() => setShowModal(true)}
          />
          <ModalComponent
            open={showModal}
            setOpen={setShowModal}
            title='Invoice Details'
            width='40%'
          >
            <div className="bg-white border border-solid border-elboneyGray rounded-[4px] z-50">
              <div className='flex px-6 py-2.5 justify-between bg-mistyWhite'>
                <TertiaryHeading title="Invoice Details" className="text-graphiteGray" />
                <CloseOutlined className='cursor-pointer'
                  width={24}
                  height={24}
                />
              </div>

              <div className='px-6 py-2.5'>
                <InputComponent
                  label='Invoice Name'
                  placeholder='Enter invoice name'
                  name='invoiceName'
                  field={{
                    type: 'text',
                    onChange: (e) => setInvoiceName(e.target.value),
                    value: invoiceName
                  }}
                />

                <div className='flex justify-end py-2 space-x-2'>
                  <WhiteButton
                    text='Cancel'
                    className='!w-[100px]'
                  />
                  <CustomButton
                    text='Next'
                    className='!w-[100px]'
                    onClick={() => router.push(`/invoices/client/create?invoiceName=${invoiceName}`)}
                    disabled={!invoiceName}
                  />
                </div>
              </div>
            </div>
          </ModalComponent>
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
