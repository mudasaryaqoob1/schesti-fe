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
import { Divider } from 'antd';
import ModalComponent from '@/app/component/modal';
import ExistingSubContractor from './ExistingSubContractors';
import { useRouter } from 'next/navigation';
import { InputComponent } from '@/app/component/customInput/Input';

const newClientSchema = Yup.object({
  firstName: Yup.string().required('First name is required!'),
  lastName: Yup.string().required('Last name is required!'),
  email: Yup.string()
    .required('Email is required!')
    .email('Email should be valid'),
  phone: Yup.string().required('Phone number is required!'),
  companyName: Yup.string().required('Company name is required!'),
  address: Yup.string().required('Address is required!'),

  invoice: Yup.string().required('Invoice is required!'),
  projectName: Yup.string().required('Project name is required!'),
  applicationNumber: Yup.string().required('Application number is required!'),
  invoiceSubject: Yup.string().required('Invoice subject is required!'),
  issueDate: Yup.string().required('Issue date is required!'),
  dueDate: Yup.string().required('Due date is required!'),

  invoiceDetails: Yup.array().of(
    Yup.object()
      .shape({
        invoiceDetailDescription: Yup.string().required(
          'Description is required!'
        ),
        quantity: Yup.number().required('Quantity is required!'),
        unitCost: Yup.number().required('Unit cost is required!'),
      })
      .required('Invoice detail is required')
  ),
  discount: Yup.number().required('Discount is required!'),
  taxes: Yup.string().required('Taxes is required!'),
  profitAndOverhead: Yup.number().required('Profit and overhead is required!'),
});
const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  companyName: '',
  address: '',

  invoice: '',
  projectName: '',
  applicationNumber: '',
  invoiceSubject: '',
  issueDate: '',
  dueDate: '',

  invoiceDetails: [],

  discount: 0,
  taxes: 0,
  profitAndOverhead: 0,
};

type InvoiceDetail = {
  description: string;
  quantity: number;
  unitCost: number;
  totalPrice: number;
};
const CreateInvoice = () => {
  const router = useRouter();
  const token = useSelector(selectToken);
  const [details, setDetails] = useState<InvoiceDetail[]>([]);
  const [showModal, setShowModal] = useState(false);

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
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
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
          />
        </div>
      ),
    },
  ];

  // write crud operations for details state
  // add detail
  function addDetail(invoice: InvoiceDetail) {
    setDetails([...details, invoice]);
  }
  // remove detail
  function removeDetail(index: number) {
    const newDetails = [...details];
    newDetails.splice(index, 1);
    setDetails(newDetails);
  }
  // update detail
  function updateDetail(index: number, invoice: InvoiceDetail) {
    const newDetails = [...details];
    newDetails[index] = invoice;
    setDetails(newDetails);
  }
  // calculate total
  function calculateTotal(invoice: InvoiceDetail) {
    return invoice.quantity * invoice.unitCost;
  }
  // calculate sub total
  function calculateSubTotal() {
    return details.reduce((total, invoice) => {
      return total + calculateTotal(invoice);
    }, 0);
  }

  function submitHandler(values: any) {
    console.log({ ...values, invoiceDetails: details });
  }

  return (
    <section className="mx-16 my-2">
      <Formik
        initialValues={initialValues}
        validationSchema={newClientSchema}
        onSubmit={submitHandler}

      >
        {({ handleSubmit, setFieldValue, values }) => {
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
                    setFieldValue('address', address);
                    setFieldValue('companyName', companyRep);
                    setFieldValue('firstName', name);

                    setFieldValue('email', email);
                    setFieldValue('phone', phone);
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
                    name="firstName"
                    placeholder="Enter first name"
                  />
                  <FormControl
                    control="input"
                    label="Last Name"
                    type="text"
                    name="lastName"
                    placeholder="Enter last name"
                  />
                  <FormControl
                    control="input"
                    label="Company Name"
                    type="text"
                    name="companyName"
                    placeholder="Enter company name"
                  />

                  <FormControl
                    control="input"
                    label="Phone Number"
                    type="number"
                    name="phone"
                    placeholder="Enter phone number"
                  />

                  <FormControl
                    control="input"
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                  />

                  <FormControl
                    control="input"
                    label="Address"
                    type="text"
                    name="address"
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
                      name="invoice"
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

                    <FormControl
                      control="input"
                      label="Issue Date"
                      type="text"
                      name="issueDate"
                      placeholder="Enter issue date"
                    />
                    <FormControl
                      control="input"
                      label="Due Date"
                      type="text"
                      name="dueDate"
                      placeholder="Enter date here"
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
                          name="invoiceDetailDescription"
                          placeholder="Enter description here"
                        />
                        <div className="flex space-x-3 items-end col-span-2">
                          <div className='flex-1'>
                            <InputComponent
                              label="Quantity"
                              name="quantity"
                              placeholder="Enter quantity here"
                              field={{
                                type: "number"
                              }}
                            />
                          </div>
                          <div className='flex-1'>
                            <InputComponent
                              label="Unit Cost"
                              name="unitCost"
                              placeholder="Enter unit cost here"
                              field={{
                                type: "number"
                              }}
                            />
                          </div>
                          <ColoredButton
                            text="Add"
                            className="!w-auto "
                            onClick={() => {
                              addDetail({
                                // @ts-ignore
                                description: values['invoiceDetailDescription'],
                                // @ts-ignore
                                quantity: parseInt(values['quantity']),
                                // @ts-ignore
                                unitCost: parseInt(values['unitCost']),
                                // @ts-ignore
                                totalPrice: parseInt(values['quantity']) * parseInt(values['unitCost']),
                              });

                              setFieldValue('invoiceDetailDescription', '');
                              setFieldValue('quantity', 0);
                              setFieldValue('unitCost', 0);
                            }}
                          />
                        </div>
                      </div>
                      <Table
                        loading={false}
                        columns={columns}
                        dataSource={details}
                        pagination={{ position: ['bottomCenter'] }}
                      />
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
                          placeholder="Enter discount here"
                        />

                        <FormControl
                          control="input"
                          label="Taxes"
                          type="number"
                          name="taxes"
                          placeholder="Enter taxes here"
                        />

                        <FormControl
                          control="input"
                          label="Profit and Overhead %"
                          type="number"
                          name="profitAndOverhead"
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
                      title={`$${calculateSubTotal() + values['taxes'] - values['discount'] + calculateSubTotal() * (values['profitAndOverhead'] / 100)}`}
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
                    <ColoredButton type="submit" text="Send" />
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
