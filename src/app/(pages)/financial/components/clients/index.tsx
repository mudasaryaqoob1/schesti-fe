import { Popups } from '@/app/(pages)/bid-management/components/Popups';
import { AddCrmClientForm } from '@/app/(pages)/crm/clients/components/AddCrmClientForm';
import CustomButton from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import { InputComponent } from '@/app/component/customInput/Input';
import TertiaryHeading from '@/app/component/headings/tertiary';
import ModalComponent from '@/app/component/modal';
import { useRouterHook } from '@/app/hooks/useRouterHook';
import { IAIAInvoice } from '@/app/interfaces/client-invoice.interface';
import { clientInvoiceService } from '@/app/services/client-invoices.service';
import { Routes } from '@/app/utils/plans.utils';
import {
  deleteClientInvoiceRequest,
  fetchClientInvoices,
} from '@/redux/client-invoices/client-invoice.thunk';
import { AppDispatch, RootState } from '@/redux/store';
import {
  CloseOutlined,
  ExclamationCircleFilled,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Dropdown, Table, type MenuProps, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const ValidationSchema = Yup.object({
  invoiceName: Yup.string().required('Invoice name is required'),
  clientName: Yup.string().required('Client name is required'),
  architectName: Yup.string().required('Architect name is required'),
});

export function Clients() {
  const router = useRouterHook();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [showClientModal, setShowClientModal] = useState(false);
  const [showArchitectModal, setShowArchitectModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const clientInvoices = useSelector(
    (state: RootState) => state.clientInvoices.data
  );
  const clientInvoicesLoading = useSelector(
    (state: RootState) => state.clientInvoices.loading
  );
  const [search, setSearch] = useState('');
  const formik = useFormik({
    initialValues: {
      invoiceName: '',
      clientName: '',
      architectName: '',
    },
    validationSchema: ValidationSchema,
    async onSubmit(values) {
      setIsLoading(true);
      try {
        const response =
          await clientInvoiceService.httpCreateInitialInvoice(values);
        if (response.data && response.data.invoice) {
          router.push(
            `${Routes.Financial['AIA-Invoicing']}/form?id=${response.data.invoice._id}&mode=edit`
          );
        }
        setIsLoading(false);
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data.message);
        setIsLoading(false);
      }
    },
  });

  const fetchSubcontactorsInvoices = useCallback(async () => {
    await dispatch(fetchClientInvoices({}));
  }, [dispatch]);

  useEffect(() => {
    fetchSubcontactorsInvoices();
  }, [fetchSubcontactorsInvoices]);
  const items: MenuProps['items'] = [
    {
      key: 'createPhase',
      label: <p>Next Payable</p>,
    },
    {
      key: 'view',
      label: <p>View Invoice</p>,
    },
    {
      key: 'collect',
      label: <p>Collect Payment</p>,
    },
    {
      key: 'delete',
      label: <p>Delete</p>,
    },
  ];
  const columns: ColumnsType<IAIAInvoice> = [
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
                router.push(
                  // `${Routes.Financial['AIA-Invoicing']}/invoice/${record._id}`
                  `${Routes.Financial['AIA-Invoicing']}/form?id=${record._id}&mode=phase`
                );

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
              } else if (key === 'view') {
                router.push(
                  // `${Routes.Financial['AIA-Invoicing']}/view/${record._id}`
                  `${Routes.Financial['AIA-Invoicing']}/form?id=${record._id}&mode=view`

                );
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

  const filteredClientInvoices =
    clientInvoices.length > 0
      ? clientInvoices.filter((invoice: any) => {
        if (!search) {
          return invoice;
        }
        return (
          invoice.invoiceName === search ||
          invoice!.toOwner.toLowerCase().includes(search.toLowerCase())
        );
      })
      : [];

  return (
    <div className="w-full mb-4">
      <div className="flex  justify-between flex-wrap items-center md:flex-nowrap mb-2">
        <TertiaryHeading title="AIA Invoicing" className="text-graphiteGray" />
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
            open={showClientModal}
            setOpen={() => setShowClientModal(false)}
            width="60%"
          >
            <Popups
              title="Add Client"
              onClose={() => setShowClientModal(false)}
            >
              <AddCrmClientForm
                onClose={() => setShowClientModal(false)}
                onSuccess={(client) => {
                  if (client.module === 'clients') {
                    formik.setFieldValue(
                      'clientName',
                      `${client.firstName} ${client.lastName}`
                    );
                  }
                }}
              />
            </Popups>
          </ModalComponent>

          <ModalComponent
            open={showArchitectModal}
            setOpen={() => setShowArchitectModal(false)}
            width="60%"
          >
            <Popups
              title="Add Architect"
              onClose={() => setShowArchitectModal(false)}
            >
              <AddCrmClientForm
                onClose={() => setShowArchitectModal(false)}
                onSuccess={(item) => {
                  if (item.module === 'architects') {
                    formik.setFieldValue(
                      'architectName',
                      `${item.firstName} ${item.lastName}`
                    );
                  }
                }}
              />
            </Popups>
          </ModalComponent>

          <ModalComponent
            open={showModal}
            setOpen={() => {
              formik.resetForm();
              setShowModal(false);
            }}
            title="Client Invoice"
            width="40%"
          >
            <div className="bg-white border border-solid border-elboneyGray rounded-[4px] z-50">
              <div className="flex px-6  py-2.5 justify-between bg-schestiLightPrimary">
                <TertiaryHeading
                  title="AIA Invoice"
                  className="text-graphiteGray"
                />
                <CloseOutlined
                  className="cursor-pointer"
                  style={{ fontSize: '24px', height: '24px' }}
                  onClick={() => setShowModal(false)}
                />
              </div>

              <div className="px-6 py-2.5">
                <InputComponent
                  label="Invoice Name"
                  type="text"
                  placeholder="Enter invoice name"
                  name="invoiceName"
                  hasError={
                    formik.touched.invoiceName && !!formik.errors.invoiceName
                  }
                  errorMessage={
                    formik.touched.invoiceName && formik.errors.invoiceName
                      ? formik.errors.invoiceName
                      : ''
                  }
                  field={{
                    type: 'text',
                    onChange: formik.handleChange,
                    onBlur: formik.handleBlur,
                    value: formik.values.invoiceName,
                  }}
                />

                <div className="mt-2">
                  <InputComponent
                    label="Client Name"
                    name="clientName"
                    type="text"
                    placeholder="Enter client name"
                    label2={
                      <div
                        onClick={() => setShowClientModal(true)}
                        className="text-schestiPrimary space-x-1 hover:cursor-pointer hover:underline flex items-center"
                      >
                        <PlusOutlined />
                        <span>Add New</span>
                      </div>
                    }
                    field={{
                      value: formik.values.clientName,
                      onChange: formik.handleChange,
                      onBlur: formik.handleBlur,
                    }}
                    hasError={
                      formik.touched.clientName && !!formik.errors.clientName
                    }
                    errorMessage={
                      formik.touched.clientName && formik.errors.clientName
                        ? formik.errors.clientName
                        : ''
                    }
                  />
                </div>

                <div className="mt-2">
                  <InputComponent
                    label="Architect Name"
                    name="architectName"
                    type="text"
                    placeholder="Enter architect name"
                    label2={
                      <div
                        onClick={() => setShowArchitectModal(true)}
                        className="text-schestiPrimary space-x-1 hover:cursor-pointer hover:underline flex items-center"
                      >
                        <PlusOutlined />
                        <span>Add New</span>
                      </div>
                    }
                    field={{
                      value: formik.values.architectName,
                      onChange: formik.handleChange,
                      onBlur: formik.handleBlur,
                    }}
                    hasError={
                      formik.touched.architectName &&
                      !!formik.errors.architectName
                    }
                    errorMessage={
                      formik.touched.architectName &&
                        formik.errors.architectName
                        ? formik.errors.architectName
                        : ''
                    }
                  />
                </div>
                <div className="flex justify-end py-2 space-x-2">
                  <WhiteButton
                    text="Cancel"
                    className="!w-[100px]"
                    onClick={() => setShowModal(false)}
                  />
                  <CustomButton
                    text="Next"
                    className="!w-[100px]"
                    onClick={() => formik.handleSubmit()}
                    disabled={!formik.isValid}
                    isLoading={isLoading}
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
        expandable={{
          expandedRowRender: () => (
            <div className="py-1">
              <Table
                columns={[
                  { title: 'Pay Application' },
                  { title: 'Amount' },
                  { title: 'Application Date' },
                  { title: 'Payment Due' },
                  { title: 'Period To' },
                  { title: 'Action' },
                ]}
              />
            </div>
          ),
        }}
      />
    </div>
  );
}
