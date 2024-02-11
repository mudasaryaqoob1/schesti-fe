'use client';
import { useLayoutEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';

// module imports
import TertiaryHeading from '@/app/component/headings/tertiary';
import Button from '@/app/component/customButton/white';
import ColoredButton from '@/app/component/customButton/button';
import FormControl from '@/app/component/formControl';
// redux module
import { selectToken } from '@/redux/authSlices/auth.selector';
import { HttpService } from '@/app/services/base.service';
import Table, { type ColumnType } from 'antd/es/table';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import QuinaryHeading from '@/app/component/headings/quinary';
import { ConfigProvider, Divider } from 'antd';
import ModalComponent from '@/app/component/modal';
import ExistingSubContractor from './ExistingSubContractors';
import { useRouter } from 'next/navigation';
import { InputComponent } from '@/app/component/customInput/Input';
import {
  CreateInvoiceData,
  invoiceService,
} from '@/app/services/invoices.service';
import { toast } from 'react-toastify';
import { DateInputComponent } from '@/app/component/cutomDate/CustomDateInput';

const newClientSchema = Yup.object({
  subContractorFirstName: Yup.string().required('First name is required!'),
  subContractorLastName: Yup.string().required('Last name is required!'),
  subContractorEmail: Yup.string()
    .required('Email is required!')
    .email('Email should be valid'),
  subContractorPhoneNumber: Yup.string()
    .min(11, 'Phone number must be at least 11 characters')
    .max(14, 'Phone number must be at most 14 characters')
    .required('Phone number is required'),
  subContractorCompanyName: Yup.string().required('Company name is required!'),
  subContractorAddress: Yup.string().required('Address is required!'),

  invoiceNumber: Yup.string().required('Invoice is required!'),
  projectName: Yup.string().required('Project name is required!'),
  applicationNumber: Yup.string().required('Application number is required!'),
  invoiceSubject: Yup.string().required('Invoice subject is required!'),
  issueDate: Yup.string().required('Issue date is required!'),
  dueDate: Yup.string().required('Due date is required!'),

  invoiceItems: Yup.array().of(
    Yup.object()
      .shape({
        description: Yup.string().required('Description is required!'),
        quantity: Yup.number().required('Quantity is required!'),
        unitCost: Yup.number().required('Unit cost is required!'),
      })
      .required('Invoice detail is required')
  ),
  discount: Yup.number().required('Discount is required!'),
  taxes: Yup.number().required('Taxes is required!'),
  profitAndOverhead: Yup.number().required('Profit and overhead is required!'),
});
const initialValues = {
  applicationNumber: '',
  projectName: '',
  invoiceSubject: '',
  subContractorCompanyName: '',
  issueDate: '',
  dueDate: '',
  invoiceItems: [],
  profitAndOverhead: 0,
  totalPayable: 0,
  discount: 0,
  invoiceNumber: '',
  subContractorAddress: '',
  subContractorEmail: '',
  subContractorFirstName: '',
  subContractorLastName: '',
  subContractorPhoneNumber: 0,
  taxes: 0,
};

type InvoiceDetail = {
  id: string;
  description: string;
  quantity: number;
  unitCost: number;
};
const CreateInvoice = () => {
  const router = useRouter();
  const token = useSelector(selectToken);
  const [details, setDetails] = useState<InvoiceDetail[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditDetail, setIsEditDetail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [detail, setDetail] = useState<InvoiceDetail>({
    id: '',
    description: '',
    quantity: 0,
    unitCost: 0,
  });

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);
  const columns: ColumnType<InvoiceDetail>[] = [
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Unit Cost',
      dataIndex: 'unitCost',
      render(value) {
        return `$${value}`;
      },
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      render(_value, record) {
        return `$${record.quantity * record.unitCost}`;
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      key: 'action',
      render: (v, r, i) => (
        <div className="flex justify-center space-x-3">
          <Button
            text=""
            className="!w-auto"
            icon="/trash.svg"
            iconwidth={13}
            iconheight={13}
            onClick={() => removeDetail(i)}
          />
          <Button
            text=""
            className="!w-auto "
            icon="/edit.svg"
            iconwidth={13}
            iconheight={13}
            onClick={() => {
              setIsEditDetail(true);
              setDetail(r);
            }}
          />
        </div>
      ),
    },
  ];

  // write crud operations for details state
  // add detail
  function addDetail(invoice: InvoiceDetail) {
    if (!invoice.description || !invoice.quantity || !invoice.unitCost) {
      return;
    }
    setDetails([...details, invoice]);
  }
  // remove detail
  function removeDetail(index: number) {
    const newDetails = [...details];
    newDetails.splice(index, 1);
    setDetails(newDetails);
  }
  // update detail
  function updateDetail(id: string, invoice: InvoiceDetail) {
    const newDetails = [...details];
    const index = newDetails.findIndex((detail) => detail.id === id);
    if (index !== -1) {
      newDetails[index] = invoice;
      setDetails(newDetails);
    }
    setIsEditDetail(false);
  }
  // calculate total
  function calculateInvoiceItemTotal(invoice: InvoiceDetail) {
    return invoice.quantity * invoice.unitCost;
  }
  // calculate sub total
  function calculateSubTotal() {
    return details.reduce((total, invoice) => {
      return total + calculateInvoiceItemTotal(invoice);
    }, 0);
  }

  function calculateTotalPayable(
    taxes: number,
    profitAndOverhead: number,
    discount: number
  ) {
    return (
      calculateSubTotal() +
      taxes -
      discount +
      calculateSubTotal() * (profitAndOverhead / 100)
    );
  }

  function submitHandler(values: any) {
    setIsLoading(true);
    const updatedDetails = details.map((detail) => {
      return {
        description: detail.description,
        quantity: detail.quantity,
        unitCost: detail.unitCost,
        total: detail.quantity * detail.unitCost,
      };
    });
    const data: CreateInvoiceData = {
      ...values,
      invoiceItems: updatedDetails,
      totalPayable: calculateTotalPayable(
        Number(values.taxes),
        Number(values.profitAndOverhead),
        Number(values.discount)
      ),
    };

    invoiceService
      .httpAddNewInvoice(data)
      .then((response) => {
        if (response.statusCode == 201) {
          setIsLoading(false);
          router.push('/invoices');
        }
      })
      .catch(({ response }: any) => {
        setIsLoading(false);
        toast.error(response.data.message);
      });
  }

  return (
    <section className="mx-16 my-2">
      <Formik
        initialValues={initialValues}
        validationSchema={newClientSchema}
        onSubmit={submitHandler}
      >
        {({
          handleSubmit,
          setFieldValue,
          values,
          handleBlur,
          errors,
          touched,
        }) => {
          console.log(errors);
          return (
            <Form name="basic" onSubmit={handleSubmit} autoComplete="off">
              {/* Modal */}
              <ModalComponent open={showModal} setOpen={setShowModal}>
                <ExistingSubContractor
                  setModalOpen={setShowModal}
                  onSelectSubcontract={({
                    address,
                    companyRep,
                    email,
                    name,
                    phone,
                  }) => {
                    setFieldValue('subContractorAddress', address);
                    setFieldValue('subContractorCompanyName', companyRep);
                    setFieldValue('subContractorFirstName', name);
                    console.log(phone);
                    setFieldValue('subContractorEmail', email);
                    setFieldValue('subContractorPhoneNumber', Number(phone));
                  }}
                />
              </ModalComponent>
              {/* END  Modal */}

              {/* Sub Contractors */}
              <div
                className="p-5 flex flex-col rounded-lg border
            border-silverGray shadow-secondaryShadow2 bg-white"
              >
                <div className="flex justify-between items-center mb-4">
                  <TertiaryHeading
                    title="Subcontractor"
                    className="text-graphiteGray"
                  />
                  <Button
                    text="Add Existing Subcontractor"
                    className="!w-auto "
                    icon="/plusblack.svg"
                    iconwidth={20}
                    iconheight={20}
                    onClick={() => setShowModal(true)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-4">
                  <FormControl
                    control="input"
                    label="First Name"
                    type="text"
                    name="subContractorFirstName"
                    placeholder="Enter first name"
                  />
                  <FormControl
                    control="input"
                    label="Last Name"
                    type="text"
                    name="subContractorLastName"
                    placeholder="Enter last name"
                  />
                  <FormControl
                    control="input"
                    label="Company Name"
                    type="text"
                    name="subContractorCompanyName"
                    placeholder="Enter company name"
                  />

                  <FormControl
                    control="input"
                    label="Phone Number"
                    type="number"
                    name="subContractorPhoneNumber"
                    placeholder="Enter phone number"
                  />

                  <FormControl
                    control="input"
                    label="Email"
                    type="email"
                    name="subContractorEmail"
                    placeholder="Enter email address"
                  />

                  <FormControl
                    control="input"
                    label="Address"
                    type="text"
                    name="subContractorAddress"
                    placeholder="Enter address"
                  />
                </div>
              </div>
              {/* END Sub Contractors */}

              {/* Invoice Info */}
              <div className="mt-2">
                <div
                  className="p-5 flex flex-col rounded-lg border
                  border-silverGray shadow-secondaryShadow2 bg-white"
                >
                  <TertiaryHeading
                    title="Invoice info"
                    className="text-graphiteGray"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-4 mt-3">
                    <FormControl
                      control="input"
                      label="Invoice #"
                      type="text"
                      name="invoiceNumber"
                      placeholder="Enter invoice number"
                    />

                    <FormControl
                      control="input"
                      label="Project Name"
                      type="text"
                      name="projectName"
                      placeholder="Enter project name"
                    />

                    <FormControl
                      control="input"
                      label="Application Number"
                      type="text"
                      name="applicationNumber"
                      placeholder="Enter the application number"
                    />

                    <FormControl
                      control="input"
                      label="Invoice Subject"
                      type="text"
                      name="invoiceSubject"
                      placeholder="Enter invoice subject"
                    />
                    <DateInputComponent
                      label="Issue Date"
                      name="issueDate"
                      placeholder="Enter issue date"
                      fieldProps={{
                        onChange: (_date, dateString) => {
                          setFieldValue('issueDate', dateString);
                        },
                        onBlur: handleBlur,
                      }}
                      hasError={touched.issueDate && !!errors.issueDate}
                    />
                    <DateInputComponent
                      label="Due Date"
                      name="dueDate"
                      placeholder="Enter due date"
                      fieldProps={{
                        onChange: (_date, dateString) => {
                          setFieldValue('dueDate', dateString);
                        },
                        onBlur: handleBlur,
                      }}
                      hasError={touched.dueDate && !!errors.dueDate}
                    />
                  </div>
                </div>
              </div>
              {/* END Invoice Info */}

              {/* Invoice Details */}
              <div className="mt-2">
                <div
                  className="p-5 flex flex-col rounded-lg border
                  border-silverGray shadow-secondaryShadow2 bg-white"
                >
                  <TertiaryHeading
                    title="Invoice details"
                    className="text-graphiteGray"
                  />
                  <div className="mt-3">
                    <div className="mt-2 space-y-2">
                      <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-1 gap-4 mt-3">
                        <InputComponent
                          label="Description"
                          type="string"
                          name="invoiceDetailDescription"
                          placeholder="Enter description here"
                          field={{
                            value: detail.description,
                            onChange: (e) => {
                              setDetail({
                                ...detail,
                                description: e.target.value,
                              });
                            },
                          }}
                        />
                        <div className="flex space-x-3 items-end col-span-2">
                          <div className="flex-1">
                            <InputComponent
                              label="Quantity"
                              name="quantity"
                              type="string"
                              placeholder="Enter quantity here"
                              field={{
                                type: 'number',
                                value: detail.quantity,
                                onChange: (e) => {
                                  setDetail({
                                    ...detail,
                                    quantity: Number(e.target.value),
                                  });
                                },
                              }}
                            />
                          </div>
                          <div className="flex-1">
                            <InputComponent
                              label="Unit Cost"
                              name="unitCost"
                              type="string"
                              prefix="$"
                              placeholder="Enter unit cost here"
                              field={{
                                type: 'number',
                                value: detail.unitCost,
                                onChange: (e) => {
                                  setDetail({
                                    ...detail,
                                    unitCost: Number(e.target.value),
                                  });
                                },
                              }}
                            />
                          </div>
                          <ColoredButton
                            text={isEditDetail ? 'Update' : 'Add'}
                            className="!w-auto "
                            onClick={() => {
                              if (isEditDetail) {
                                updateDetail(detail.id, detail);
                              } else {
                                addDetail({
                                  id: new Date().getTime().toString(),
                                  description: detail.description,
                                  quantity: detail.quantity,
                                  unitCost: detail.unitCost,
                                });
                              }
                              setDetail({
                                id: '',
                                description: '',
                                quantity: 0,
                                unitCost: 0,
                              });
                            }}
                          />
                        </div>
                      </div>
                      <ConfigProvider
                        theme={{
                          components: {
                            Table: {
                              headerBg: '#F9F5FF',
                            },
                          },
                        }}
                      >
                        <Table
                          loading={false}
                          bordered
                          columns={columns}
                          dataSource={details}
                          pagination={{ position: ['bottomCenter'] }}
                        />
                      </ConfigProvider>
                    </div>
                  </div>
                </div>
              </div>
              {/* END Invoice Details */}

              {/* Discount & Tax */}
              <div className="mt-2">
                <div
                  className="p-5 flex flex-col rounded-lg border
                  border-silverGray shadow-secondaryShadow2 bg-white"
                >
                  <TertiaryHeading
                    title="Discount & Tax"
                    className="text-graphiteGray"
                  />
                  <div className="mt-3">
                    <div className="mt-2 space-y-2">
                      <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-1 gap-4 mt-3">
                        <FormControl
                          control="input"
                          label="Discount"
                          type="number"
                          name="discount"
                          prefix="$"
                          placeholder="Enter discount here"
                        />

                        <FormControl
                          control="input"
                          label="Taxes"
                          type="number"
                          name="taxes"
                          prefix="$"
                          placeholder="Enter taxes here"
                        />

                        <FormControl
                          control="input"
                          label="Profit and Overhead %"
                          type="number"
                          name="profitAndOverhead"
                          prefix="%"
                          placeholder="Enter profit and overhead here"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Discount & Tax */}

              {/* Calculation */}
              <div className="mt-2">
                <div className="flex justify-between items-center flex-wrap">
                  <div className="flex items-center space-x-2">
                    <QuaternaryHeading title="Sub total:" />
                    <QuinaryHeading
                      title={`$${calculateSubTotal()}`}
                      className="font-bold"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <QuaternaryHeading title="Discount:" />
                    <QuinaryHeading
                      title={`$${values['discount']}`}
                      className="font-bold"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <QuaternaryHeading title="Taxes:" />
                    <QuinaryHeading
                      title={`$${values['taxes']}`}
                      className="font-bold"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <QuaternaryHeading title="Profit And Overhead:" />
                    <QuinaryHeading
                      title={`${values['profitAndOverhead']}%`}
                      className="font-bold"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <QuaternaryHeading title="Total:" />
                    <QuinaryHeading
                      title={`$${calculateTotalPayable(
                        values['taxes'],
                        Number(values['profitAndOverhead']),
                        values['discount']
                      )}`}
                      className="font-bold"
                    />
                  </div>
                </div>
              </div>
              {/* END Calculation */}

              <Divider />

              {/* SEND */}
              <div className="mt-2">
                <div className="flex justify-between">
                  <div></div>
                  <div className="flex space-x-3">
                    <Button text="Cancel" onClick={() => router.back()} />
                    <ColoredButton
                      isLoading={isLoading}
                      type="submit"
                      text="Send"
                    />
                  </div>
                </div>
              </div>
              {/* END SEND */}
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};

export default CreateInvoice;
