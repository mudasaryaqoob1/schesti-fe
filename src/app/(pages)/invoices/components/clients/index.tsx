import CustomButton from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import { InputComponent } from '@/app/component/customInput/Input';
import TertiaryHeading from '@/app/component/headings/tertiary';
import ModalComponent from '@/app/component/modal';
import { IClientInvoice } from '@/app/interfaces/client-invoice.interface';
import {
  selectClientInvoices,
  selectClientInvoicesLoading,
} from '@/redux/client-invoices/client-invoice.selector';
import { fetchClientInvoices } from '@/redux/client-invoices/client-invoice.thunk';
import { AppDispatch } from '@/redux/store';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { Dropdown, Table, type MenuProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function Clients() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [invoiceName, setInvoiceName] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const clientInvoices = useSelector(selectClientInvoices);
  const clientInvoicesLoading = useSelector(selectClientInvoicesLoading);

  const fetchSubcontactorsInvoices = useCallback(async () => {
    await dispatch(fetchClientInvoices({}));
  }, [dispatch]);

  useEffect(() => {
    fetchSubcontactorsInvoices();
  }, [fetchSubcontactorsInvoices]);
  const items: MenuProps['items'] = [
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
  const columns: ColumnsType<IClientInvoice> = [
    {
      title: 'Invoice #',
      dataIndex: 'applicationNo',
    },
    {
      title: 'Invoice Name',
      dataIndex: 'invoiceName',
      ellipsis: true,
    },
    {
      title: 'Client Name',
      dataIndex: 'toOwner',
    },
    {
      title: 'Project Name',
      dataIndex: 'project',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Distributed To',
      dataIndex: 'distributedTo',
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
        <TertiaryHeading title="Client invoice" className="text-graphiteGray" />
        <div className="flex items-center space-x-2 flex-1 justify-end">
          <div className="w-96 ">
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
            title="Invoice Details"
            width="40%"
          >
            <div className="bg-white border border-solid border-elboneyGray rounded-[4px] z-50">
              <div className="flex px-6 py-2.5 justify-between bg-mistyWhite">
                <TertiaryHeading
                  title="Invoice Details"
                  className="text-graphiteGray"
                />
                <CloseOutlined
                  className="cursor-pointer"
                  width={24}
                  height={24}
                />
              </div>

              <div className="px-6 py-2.5">
                <InputComponent
                  label="Invoice Name"
                  type="text"
                  placeholder="Enter invoice name"
                  name="invoiceName"
                  field={{
                    type: 'text',
                    onChange: (e) => setInvoiceName(e.target.value),
                    value: invoiceName,
                  }}
                />

                <div className="flex justify-end py-2 space-x-2">
                  <WhiteButton text="Cancel" className="!w-[100px]" />
                  <CustomButton
                    text="Next"
                    className="!w-[100px]"
                    onClick={() =>
                      router.push(
                        `/invoices/client/create?invoiceName=${invoiceName}`
                      )
                    }
                    disabled={!invoiceName}
                  />
                </div>
              </div>
            </div>
          </ModalComponent>
        </div>
      </div>

      <Table
        loading={clientInvoicesLoading}
        columns={columns}
        dataSource={clientInvoices}
        pagination={{ position: ['bottomCenter'] }}
        bordered
      />
    </div>
  );
}
