'use client';
import { useState, useCallback, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { ConfigProvider, Divider } from 'antd';
import Table, { type ColumnType } from 'antd/es/table';
import { useSearchParams } from 'next/navigation';
import { AppDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';

// module imports
import TertiaryHeading from '@/app/component/headings/tertiary';
import Button from '@/app/component/customButton/white';
import ColoredButton from '@/app/component/customButton/button';
import FormControl from '@/app/component/formControl';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import QuinaryHeading from '@/app/component/headings/quinary';
import ModalComponent from '@/app/component/modal';
import ExistingSubContractor from '../../components/ExistingSubContractors';
import { InputComponent } from '@/app/component/customInput/Input';
import { PhoneNumberInputWithLable } from '@/app/component/phoneNumberInput/PhoneNumberInputWithLable';
import {
  CreateInvoiceData,
  invoiceService,
} from '@/app/services/invoices.service';
import { DateInputComponent } from '@/app/component/cutomDate/CustomDateInput';
import { Routes } from '@/app/utils/plans.utils';
import { withAuth } from '@/app/hoc/withAuth';
import { USCurrencyFormat } from '@/app/utils/format';
import { fetchCompanySubcontractors } from '@/redux/company/company.thunk';
import { ISubcontract } from '@/app/interfaces/companyEmployeeInterfaces/subcontractor.interface';
import { useRouterHook } from '@/app/hooks/useRouterHook';

const subcontractorSchema = Yup.object({
  companyRep: Yup.string().required('Company Rep is required!'),
  subContractorEmail: Yup.string()
    .required('Email is required!')
    .email('Email should be valid'),
  subContractorPhoneNumber: Yup.string()
    .min(7, 'Phone number must be at least 7 characters')
    .max(12, 'Phone number must be at most 12 characters')
    .required('Phone number is required'),
  subContractorCompanyName: Yup.string().required('Company name is required!'),
  subContractorAddress: Yup.string().required('Address is required!'),

  projectName: Yup.string().required('Project name is required!'),
  applicationNumber: Yup.string().required('Application number is required!'),
  invoiceSubject: Yup.string().required('Invoice subject is required!'),
  issueDate: Yup.string().required('Issue date is required!'),
  dueDate: Yup.string().required('Due date is required!'),

  invoiceItems: Yup.array()
    .of(
      Yup.object()
        .shape({
          description: Yup.string().required('Description is required!'),
          quantity: Yup.number().required('Quantity is required!'),
          unitCost: Yup.number().required('Unit cost is required!'),
        })
        .required('Invoice detail is required')
    )
    .required('Invoice detail is required'),
  // discount: Yup.number().required('Discount is required!'),
  // taxes: Yup.number().required('Taxes is required!'),
  // profitAndOverhead: Yup.number().required('Profit and overhead is required!'),
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
  invoiceNumber: new Date().getTime().toString(),
  subContractorAddress: '',
  subContractorEmail: '',
  companyRep: '',
  subContractorPhoneNumber: '',
  taxes: 0,
};

type InvoiceDetail = {
  id: string;
  description: string;
  quantity: number;
  unitCost: number;
  totalPrice?: string;
  action?: string;
};

const CreateInvoice = () => {
  const router = useRouterHook();
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  const paramsSubContractId = searchParams.get('subcontractorId');

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
  const [selectedSubcontractorDetail, setSelectedSubcontractorDetail] =
    useState({});

  const fetchSubcontactors = useCallback(async () => {
    let { payload }: any = await dispatch(
      fetchCompanySubcontractors({ page: 1, limit: 10 })
    );
    if (paramsSubContractId) {
      const extractSubcontractorDetail = payload?.data?.subcontractors;
      let selectedSubcontractor = extractSubcontractorDetail.find(
        (subcontractor: ISubcontract) =>
          subcontractor._id === paramsSubContractId
      );

      setSelectedSubcontractorDetail({
        subContractorAddress: selectedSubcontractor.address,
        subContractorCompanyName: selectedSubcontractor.name,
        subContractorEmail: selectedSubcontractor.email,
        subContractorPhoneNumber: selectedSubcontractor.phone,
        companyRep: selectedSubcontractor.companyRep,
      });
    }
  }, []);

  useEffect(() => {
    fetchSubcontactors();
  }, [fetchSubcontactors]);

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
    console.log(taxes, profitAndOverhead, discount);

    return (
      calculateSubTotal() + taxes - discount + profitAndOverhead

      // discount + profitAndOverhead - taxes
    );
  }

  const calculatePercentqge = (
    value: number | string,
    percentage: number | string
  ) => {
    value = Number(value);
    percentage = Number(percentage);
    return (percentage * value) / 100;
  };

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
        calculatePercentqge(calculateSubTotal(), values['taxes']),
        calculatePercentqge(calculateSubTotal(), values['profitAndOverhead']),
        calculatePercentqge(calculateSubTotal(), values['discount'])
      ),
    };

    invoiceService
      .httpAddNewInvoice(data)
      .then((response) => {
        if (response.statusCode == 201) {
          setIsLoading(false);
          router.push(Routes.Financial['Standard-Invoicing']);
        }
      })
      .catch(({ response }: any) => {
        setIsLoading(false);
        toast.error(response.data.message);
      });
  }

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
        return `${USCurrencyFormat.format(record.quantity * record.unitCost)}`;
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

  return (
    <section className="mx-16 my-2">
      <Formik
        initialValues={
          selectedSubcontractorDetail
            ? { ...initialValues, ...selectedSubcontractorDetail }
            : initialValues
        }
        validationSchema={subcontractorSchema}
        onSubmit={submitHandler}
        enableReinitialize={true}
      >
        {({
          handleSubmit,
          setFieldValue,
          values,
          handleBlur,
          errors,
          touched,
          setFieldTouched,
        }) => {
          return (
            <Form name="basic" onSubmit={handleSubmit} autoComplete="off">
              {/* Modal */}
              <ModalComponent open={showModal} setOpen={setShowModal}>
                <ExistingSubContractor
                  setModalOpen={setShowModal}
                  onSelectSubcontract={({
                    address,
                    email,
                    name,
                    phone,
                    companyRep,
                  }) => {
                    setFieldValue('subContractorAddress', address);
                    setFieldValue('subContractorCompanyName', name);
                    setFieldValue('subContractorEmail', email);
                    setFieldValue('subContractorPhoneNumber', phone);
                    setFieldValue('companyRep', companyRep);
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
                    label="Company Rep"
                    type="text"
                    name="companyRep"
                    placeholder="Enter Company Rep"
                  />
                  <FormControl
                    control="input"
                    label="Company Name"
                    type="text"
                    name="subContractorCompanyName"
                    placeholder="Enter company name"
                  />

                  <PhoneNumberInputWithLable
                    label="Phone Number"
                    //@ts-ignore
                    onChange={(val: string) =>
                      setFieldValue('subContractorPhoneNumber', val)
                    }
                    //@ts-ignore
                    value={values.subContractorPhoneNumber}
                    onBlur={() =>
                      setFieldTouched('subContractorPhoneNumber', true)
                    }
                    hasError={
                      touched.subContractorPhoneNumber &&
                      Boolean(errors.subContractorPhoneNumber)
                    }
                    errorMessage={
                      touched.subContractorPhoneNumber &&
                      errors.subContractorPhoneNumber
                        ? errors.subContractorPhoneNumber
                        : ''
                    }
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
                      errorMessage={errors.issueDate}
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
                      errorMessage={errors.dueDate}
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
                          label="Discount %"
                          type="number"
                          name="discount"
                          // suffix="%"
                          placeholder="Enter discount here"
                          min={0}
                          step="0.001"
                        />

                        <FormControl
                          control="input"
                          label="Taxes %"
                          type="number"
                          name="taxes"
                          // suffix="%"
                          min={0}
                          step="0.001"
                          placeholder="Enter taxes here"
                        />

                        <FormControl
                          control="input"
                          label="Profit and Overhead %"
                          type="number"
                          name="profitAndOverhead"
                          min={0}
                          step="0.001"
                          // suffix="%"
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
                      title={`${USCurrencyFormat.format(calculateSubTotal())}`}
                      className="font-bold"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <QuaternaryHeading title="Discount:" />
                    <QuinaryHeading
                      title={`%${calculatePercentqge(
                        calculateSubTotal(),
                        values['discount']
                      )}`}
                      className="font-bold"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <QuaternaryHeading title="Taxes:" />
                    <QuinaryHeading
                      title={`%${calculatePercentqge(
                        calculateSubTotal(),
                        values['taxes']
                      )}`}
                      className="font-bold"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <QuaternaryHeading title="Profit And Overhead:" />
                    <QuinaryHeading
                      title={`%${calculatePercentqge(
                        calculateSubTotal(),
                        values['profitAndOverhead']
                      )}`}
                      className="font-bold"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <QuaternaryHeading title="Total:" />
                    <QuinaryHeading
                      title={`${USCurrencyFormat.format(
                        calculateTotalPayable(
                          calculatePercentqge(
                            calculateSubTotal(),
                            values['taxes']
                          ),
                          calculatePercentqge(
                            calculateSubTotal(),
                            values['profitAndOverhead']
                          ),
                          calculatePercentqge(
                            calculateSubTotal(),
                            values['discount']
                          )
                        )
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

export default withAuth(CreateInvoice);
