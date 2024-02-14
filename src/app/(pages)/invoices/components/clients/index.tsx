import CustomButton from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import { InputComponent } from '@/app/component/customInput/Input';
import TertiaryHeading from '@/app/component/headings/tertiary';
import ModalComponent from '@/app/component/modal';
import { IClientInvoice } from '@/app/interfaces/client-invoice.interface';
import {
  deleteClientInvoiceRequest,
  fetchClientInvoices,
} from '@/redux/client-invoices/client-invoice.thunk';
import { AppDispatch, RootState } from '@/redux/store';
import { CloseOutlined, ExclamationCircleFilled, SearchOutlined } from '@ant-design/icons';
import { Dropdown, Table, type MenuProps, Modal } from 'antd';
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
  const clientInvoices = useSelector((state: RootState) => state.clientInvoices.data);
  const clientInvoicesLoading = useSelector((state: RootState) => state.clientInvoices.loading);
  const [search, setSearch] = useState('');

  const fetchSubcontactorsInvoices = useCallback(async () => {
    await dispatch(fetchClientInvoices({}));
  }, [dispatch]);

  useEffect(() => {
    fetchSubcontactorsInvoices();
  }, [fetchSubcontactorsInvoices]);
  const items: MenuProps['items'] = [
    {
      key: 'createPhase',
      label: <p>New Payable</p>,
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
      width: 300,
    },
    {
      title: 'Owner',
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
      dataIndex: 'distributionTo',
      render: (value) => value?.toUpperCase(),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      key: 'action',
      render: (_, record) => (
        <Dropdown
          menu={{
            items,
            onClick: ({ key }) => {
              if (key === 'createPhase') {
                router.push(`/invoices/client/invoice/${record._id}`);
              } else if (key === 'delete') {
                Modal.confirm({
                  title: 'Are you sure delete this invoice?',
                  icon: <ExclamationCircleFilled />,
                  okText: 'Yes',
                  okType: 'danger',
                  style: { backgroundColor: 'white' },
                  cancelText: 'No',
                  onOk() {
                    dispatch(deleteClientInvoiceRequest(record._id));
                  },
                  onCancel() { },
                });
              }
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

  const filteredClientInvoices = clientInvoices.length > 0 ? clientInvoices.filter(invoice => {
    if (!search) {
      return invoice;
    }
    return invoice.invoiceName === (search) || invoice.toOwner.toLowerCase().includes(search.toLowerCase())
  }) : [];

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
                value: search,
                onChange: (e) => setSearch(e.target.value),
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
        dataSource={filteredClientInvoices}
        pagination={{ position: ['bottomCenter'] }}
        bordered
      />
    </div>
  );
}
