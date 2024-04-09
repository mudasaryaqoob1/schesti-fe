'use client';

import { InputComponent } from '@/app/component/customInput/Input';
import { SelectComponent } from '@/app/component/customSelect/Select.component';
import Description from '@/app/component/description';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { withAuth } from '@/app/hoc/withAuth';
import { USCurrencyFormat } from '@/app/utils/format';
import { Divider, Skeleton, Spin, Table } from 'antd';
import Image from 'next/image';
import { bidDurationType } from '../../projects/post/components/data';
import { TextAreaComponent } from '@/app/component/textarea';
import Dragger from 'antd/es/upload/Dragger';
import type { ColumnsType } from 'antd/es/table';
import CustomButton from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import { type FormikErrors, useFormik } from 'formik';
import { useTrades } from '@/app/hooks/useTrades';
import { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import type { RcFile } from 'antd/es/upload';
import AwsS3 from '@/app/utils/S3Intergration';
import { useMutation, useQuery } from 'react-query';
import { IResponseInterface } from '@/app/interfaces/api-response.interface';
import { AxiosError } from 'axios';
import { proposalService } from '@/app/services/proposal.service';
import { useParams } from 'next/navigation';
import { bidManagementService } from '@/app/services/bid-management.service';
import { IBidManagement } from '@/app/interfaces/bid-management/bid-management.interface';
import { ProjectIntro } from './components/ProjectInto';

type ProjectScope = {
  description: string;
  quantity: number;
  price: number;
};

type ISubmitBidForm = {
  bidTrades: string[];
  projectId: string;
  price: number;
  projectDuration: number;
  projectDurationType: string;
  additionalDetails: string;
  priceExpiryDuration: number;
  increaseInPercentage: number;
  file: {
    url: string;
    type: string;
    extension: string;
    name: string;
  };
  projectScopes: ProjectScope[];
};

const ValidationSchema = Yup.object().shape({
  bidTrades: Yup.array()
    .of(Yup.string().required('Trade is required'))
    .min(1, 'Atleast 1 trade is required')
    .required('Trade is required'),
  price: Yup.number()
    .min(1, 'Minimum $1 is required')
    .required('Price is required'),
  projectDuration: Yup.number().required('Duration is required'),
  additionalDetails: Yup.string().required('Additional details is required'),
  priceExpiryDuration: Yup.number().required(
    'Price expiry duration is required'
  ),
  increaseInPercentage: Yup.number()
    .min(0, 'Percentage should be between 0 - 100')
    .max(100, 'Percentage should be between 0 - 100')
    .required('Increase in percentage is required'),
  file: Yup.object().shape({
    url: Yup.string(),
    type: Yup.string(),
    extension: Yup.string(),
    name: Yup.string(),
  }),
  projectScopes: Yup.array().of(
    Yup.object().shape({
      description: Yup.string().required('Description is required'),
      quantity: Yup.number().required('Quantity is required'),
      price: Yup.number().required('Unit price is required'),
    })
  ),
});

function ContractorSubmitBidPage() {
  const { tradeCategoryFilters, trades } = useTrades();
  const [showProjectScope, setShowProjectScope] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [project, setProject] = useState<IBidManagement | null>(null);
  const lastInputRef = useRef<HTMLInputElement>(null);
  const params = useParams<{ id: string }>();
  const query = useQuery(
    ['getOwnerProjectById', params.id],
    () => {
      return bidManagementService.httpGetOwnerProjectById(params.id);
    },
    {
      onSuccess(data) {
        if (data.data && data.data.project) {
          setProject(data.data.project);
        }
      },
      onError(error) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data.message);
      },
    }
  );


  const mutation = useMutation<
    IResponseInterface<{ submittedProposal: any }>,
    AxiosError<{ message: string }>,
    ISubmitBidForm
  >(['submitBid', params.id], {
    mutationFn: (data) => {
      return proposalService.httpSubmitProposal({
        ...data,
        projectId: params.id,
      });
    },
    onSuccess(data) {
      toast.success(data.message);
      formik.resetForm();
    },
    onError(error) {
      toast.error(error.response?.data.message || 'Unable to submit proposal');
    },
  });

  const formik = useFormik<ISubmitBidForm>({
    initialValues: {
      projectScopes: [],
      file: {
        extension: '',
        name: '',
        type: '',
        url: '',
      },
      additionalDetails: '',
      increaseInPercentage: 0,
      price: 1,
      priceExpiryDuration: 1,
      projectDuration: 0,
      projectDurationType: 'days',
      projectId: '',
      bidTrades: [],
    },
    onSubmit(values) {
      mutation.mutate(values);
    },
    validationSchema: ValidationSchema,
  });


  useEffect(() => {
    if (lastInputRef.current) {
      if (lastInputRef.current.value === '') {
        lastInputRef.current.focus();
      } else {
        return;
      }
    }
  }, [formik.values.projectScopes]);

  function addNewScope() {
    formik.setFieldValue('projectScopes', [
      ...formik.values.projectScopes,
      {
        description: '',
        quantity: '',
        price: '',
      },
    ]);
  }

  function deleteScope(index: number) {
    const newScopes = formik.values.projectScopes.filter((_, i) => i !== index);
    formik.setFieldValue('projectScopes', newScopes);
  }

  function updateScope(index: number, key: string, value: string | number) {
    const newScopes = formik.values.projectScopes.map((scope, i) => {
      if (i === index) {
        return {
          ...scope,
          [key]: value,
        };
      }
      return scope;
    });

    formik.setFieldValue('projectScopes', newScopes);
  }


  const columns: ColumnsType<ProjectScope> = [
    {
      key: 'description',
      dataIndex: 'description',
      title: 'Description',
      render(value, _record, index) {
        const error = typeof formik.errors.projectScopes !== 'string' && formik.errors.projectScopes && (formik.errors.projectScopes[index] as FormikErrors<ProjectScope>)?.description;
        return (
          <div className='space-y-1'>
            <input
              className={`border ${error ? "border-red-500" : ""}  p-2 rounded-md focus:outline-none w-full h-full bg-transparent`}
              type="text"
              ref={index === formik.values.projectScopes.length - 1 ? lastInputRef : null}
              value={value}
              placeholder='Type Description'
              onChange={(e) => {
                updateScope(index, 'description', e.target.value);
              }}
              onBlur={formik.handleBlur}
              name={`description.${index}`}
            />
            {error ? <p className='text-xs text-red-500'>
              {error}
            </p> : null}
          </div>
        );
      },
    },
    {
      key: 'quantity',
      dataIndex: 'quantity',
      title: 'Quantity',
      render(value, _record, index) {
        const error = typeof formik.errors.projectScopes !== 'string' && formik.errors.projectScopes && (formik.errors.projectScopes[index] as FormikErrors<ProjectScope>)?.quantity;
        return (
          <div className='space-y-1'>
            <input
              className={`border ${error ? "border-red-500" : ""} p-2 rounded-md  focus:outline-none w-full h-full bg-transparent`}
              type="number"
              placeholder='Type Quantity'
              value={value}
              onChange={(e) => {
                updateScope(index, 'quantity', Number(e.target.value));
              }}
              onBlur={formik.handleBlur}
              name={`quantity.${index}`}
            />
            {error ? <p className='text-xs text-red-500'>{error}</p> : null}
          </div>
        );
      },
    },
    {
      key: 'price',
      dataIndex: 'price',
      title: 'Unit Price',
      render: (value, _record, index) => {
        const error = typeof formik.errors.projectScopes !== 'string' && formik.errors.projectScopes && (formik.errors.projectScopes[index] as FormikErrors<ProjectScope>)?.price;
        return (
          <div className="space-y-1">
            <input
              className={`border ${error ? "border-red-500" : ""} p-2 rounded-md focus:outline-none w-full h-full bg-transparent`}
              type="number"
              value={value}
              placeholder='$0.00'
              onChange={(e) => {
                updateScope(index, 'price', Number(e.target.value));
              }}
              onBlur={formik.handleBlur}
              name={`price.${index}`}
            />
            {error ? <p className='text-xs text-red-500'>{error}</p> : null}
          </div>
        );
      },
    },
    {
      key: 'subtotal',
      title: 'Sub Total',
      render(_value, record) {
        return USCurrencyFormat.format(record.quantity * record.price);
      },
    },
    {
      title: '',
      render(_value, _record, index) {
        return (
          <Image
            src={'/x-circle.svg'}
            alt="delete icon"
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={() => deleteScope(index)}
          />
        );
      },
    },
  ];

  const tradesOptions = tradeCategoryFilters.map((parent) => {
    return {
      label: <span>{parent.label}</span>,
      title: parent.label,
      options: trades
        .filter((trade) => trade.tradeCategoryId._id === parent.value)
        .map((child) => {
          return {
            label: <span>{child.name}</span>,
            value: child._id,
          };
        }),
    };
  });

  async function handleFileUpload(file: RcFile) {
    setIsUploading(true);
    try {
      const url = await new AwsS3(file, 'documents/post-project/').getS3URL();
      const fileData = {
        url,
        extension: file.name.split('.').pop() || '',
        type: file.type as string,
        name: file.name,
      };
      formik.setFieldValue('file', fileData);
    } catch (error) {
      toast.error('Unable to upload file');
    } finally {
      setIsUploading(false);
    }
  }

  if (query.isLoading) {
    return <Skeleton />;
  }

  return (
    <section className="mt-6 mb-4 md:ms-[69px] md:me-[59px] mx-4 ">
      <div className="flex gap-4 items-center">
        <Image src={'/home.svg'} alt="home icon" width={20} height={20} />
        <Image
          src={'/chevron-right.svg'}
          alt="chevron-right icon"
          width={16}
          height={16}
        />
        <Description
          title="Bid Management"
          className="font-base text-slateGray"
        />
        <Image
          src={'/chevron-right.svg'}
          alt="chevron-right icon"
          width={16}
          height={16}
        />

        <Description
          title="Find a project"
          className="font-base text-slateGray"
        />
        <Image
          src={'/chevron-right.svg'}
          alt="chevron-right icon"
          width={16}
          height={16}
        />
        <Description
          title="Project Details"
          className="font-base text-slateGray"
        />
        <Image
          src={'/chevron-right.svg'}
          alt="chevron-right icon"
          width={16}
          height={16}
        />

        <Description
          title="Submit Bid"
          className="font-semibold text-lavenderPurple cursor-pointer underline"
        />
      </div>

      <ProjectIntro bid={project} />

      <div className="bg-white py-[27px] px-[28px] mt-5 rounded-lg shadow-lg">
        <TertiaryHeading
          title="Bid On Project"
          className="text-[#344054] text-3xl font-semibold leading-9"
        />

        <div className="mt-3 space-y-3">
          <SelectComponent
            label="Bid Trade"
            name="bidTrades"
            placeholder="Select Trade"
            field={{
              options: tradesOptions,
              mode: 'tags',
              value: formik.values.bidTrades,
              onChange(value) {
                formik.setFieldValue('bidTrades', value);
              },
              onBlur: formik.handleBlur,
            }}
            hasError={Boolean(formik.errors.bidTrades)}
            errorMessage={formik.errors.bidTrades as string}
          />
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <InputComponent
                label="Price"
                name="price"
                type="number"
                field={{
                  prefix: '$',
                  value: formik.values.price,
                  onChange(e) {
                    formik.setFieldValue('price', Number(e.target.value));
                  },
                  onBlur: formik.handleBlur,
                }}
                hasError={Boolean(formik.errors.price)}
                errorMessage={formik.errors.price as string}
              />
            </div>

            <div className="flex-1 mt-1">
              <InputComponent
                label="Duration"
                name="projectDuration"
                placeholder="Type Duration"
                type=""
                field={{
                  type: 'number',
                  styles: {
                    input: {
                      padding: 10,
                    },
                  },
                  value: formik.values.projectDuration,
                  onChange(e) {
                    formik.setFieldValue(
                      'projectDuration',
                      Number(e.target.value)
                    );
                  },
                  onBlur: formik.handleBlur,

                  className: '!py-1.5',
                  addonAfter: (
                    <SelectComponent
                      label=""
                      name="projectDurationType"
                      field={{
                        className: '!w-28 !pb-1',
                        options: bidDurationType,
                        dropdownStyle: {
                          width: 100,
                        },
                        defaultValue: 'days',
                        value: formik.values.projectDurationType,
                        onChange(value) {
                          formik.setFieldValue('projectDurationType', value);
                        },
                        onBlur: formik.handleBlur,
                      }}
                      hasError={Boolean(formik.errors.projectDurationType)}
                      errorMessage={formik.errors.projectDurationType as string}
                    />
                  ),
                }}
                hasError={Boolean(formik.errors.projectDuration)}
                errorMessage={formik.errors.projectDuration as string}
              />
            </div>
          </div>

          <TextAreaComponent
            label="Additional Details"
            name="additionalDetails"
            field={{
              rows: 10,
              value: formik.values.additionalDetails,
              onChange(e) {
                formik.setFieldValue('additionalDetails', e.target.value);
              },
              onBlur: formik.handleBlur,
            }}
            hasError={Boolean(formik.errors.additionalDetails)}
            errorMessage={formik.errors.additionalDetails as string}
          />
        </div>

        <Divider />

        <div className="space-y-3">
          <TertiaryHeading
            title="Price Value change"
            className="text-[#192A3E] text-[18px] leading-8 font-medium"
          />
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <SelectComponent
                label="How long this price will stay?"
                placeholder="Select Period"
                name="priceExpiryDuration"
                field={{
                  options: [
                    { label: 'Less than 1 month', value: 1 },
                    { label: '1 to 3 months', value: 2 },
                    { label: '3 to 6 months', value: 3 },
                    { label: 'More than 6 months', value: 4 },
                  ],
                  value: formik.values.priceExpiryDuration,
                  onChange(value) {
                    formik.setFieldValue('priceExpiryDuration', value);
                  },
                  onBlur: formik.handleBlur,
                }}
                hasError={Boolean(formik.errors.priceExpiryDuration)}
                errorMessage={formik.errors.priceExpiryDuration as string}
              />
            </div>
            <div className="flex-1">
              <InputComponent
                label="How much you want to increase"
                placeholder="Increase in percentage"
                name="increaseInPercentage"
                type="number"
                field={{
                  prefix: '%',
                  value: formik.values.increaseInPercentage,
                  onChange(e) {
                    formik.setFieldValue(
                      'increaseInPercentage',
                      Number(e.target.value)
                    );
                  },
                  onBlur: formik.handleBlur,
                  type: 'number',
                }}
                hasError={Boolean(formik.errors.increaseInPercentage)}
                errorMessage={formik.errors.increaseInPercentage as string}
              />
            </div>
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-5">
              <Dragger
                name={'file'}
                accept="image/*,gif,application/pdf"
                multiple={false}
                style={{
                  borderStyle: 'dashed',
                  borderWidth: 6,
                  borderColor: '#CDD2E1',
                }}
                beforeUpload={(file) => {
                  const isLessThan2MB = file.size < 2 * 1024 * 1024;
                  if (!isLessThan2MB) {
                    toast.error('File size should be less than 2MB');
                    return false;
                  }
                  handleFileUpload(file);
                  return false;
                }}
                itemRender={() => {
                  return null;
                }}
              >
                <p className="ant-upload-drag-icon">
                  <Image
                    src={'/uploadcloud.svg'}
                    width={50}
                    height={50}
                    alt="upload"
                  />
                </p>
                <p className="text-[12px] py-2 leading-3 text-[#98A2B3]">
                  Drop your image here, or browse
                </p>
                <p className="text-[12px] leading-3 text-[#98A2B3]">
                  PNG, GIF, JPG, Max size: 2MB
                </p>
              </Dragger>
            </div>
          </div>
          {formik.values.file.url ? (
            <div className="border my-2 rounded w-fit">
              <div className="bg-[#F4EBFF] flex items-center justify-between px-2 py-1 ">
                <div className="flex items-center space-x-3">
                  <Image
                    src={'/file-05.svg'}
                    width={16}
                    height={16}
                    alt="file"
                  />
                  <p className="text-[#667085] text-[14px] leading-6">
                    {formik.values.file.name}
                  </p>
                </div>
                <Image
                  src={'/trash.svg'}
                  width={16}
                  height={16}
                  alt="close"
                  className="cursor-pointer"
                  onClick={() => {
                    formik.setFieldValue('file', {
                      extension: '',
                      name: '',
                      type: '',
                      url: '',
                    });
                  }}
                />
              </div>
              <div className="p-2 mx-auto w-auto h-[190px] xl:w-[230px] relative">
                {formik.values.file.type.includes('image') ? (
                  <Image alt="image" src={formik.values.file.url} fill />
                ) : (
                  <div className="relative mt-10 w-[100px] h-[100px] mx-auto">
                    <Image
                      alt="pdf"
                      src={'/pdf.svg'}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                )}
              </div>
            </div>
          ) : isUploading ? (
            <Spin />
          ) : null}

          <div
            className="flex w-fit items-center space-x-4 cursor-pointer border-b border-[#7F56D9]"
            onClick={() => setShowProjectScope(!showProjectScope)}
          >
            <p className="text-[#7F56D9] text-[14px] leading-6 font-normal ">
              Add Project Scope
            </p>
            <Image
              src={'/forward-arrow.svg'}
              width={24}
              height={23}
              alt="forward arrow icon"
              className="cursor-pointer"
            />
          </div>

          {showProjectScope ? (
            <div className="py-3">
              <Table
                columns={columns}
                dataSource={formik.values.projectScopes}
                pagination={false}
                footer={() => {
                  return (
                    <div className="bg-white border border-dashed h-full  p-4 rounded-lg">
                      <p
                        className="text-[#98A2B3] text-[14px] leading-5 font-normal cursor-pointer"
                        onClick={() => {
                          // check if the last scope has all the fields filled
                          const lastScope = formik.values.projectScopes[
                            formik.values.projectScopes.length - 1
                          ];
                          if (!lastScope) {
                            addNewScope();
                            return;
                          }
                          if (
                            lastScope.description &&
                            lastScope.price &&
                            lastScope.quantity
                          ) {
                            addNewScope();
                          } else {
                            toast.error('Please fill the current scope');
                          }
                        }}
                      >
                        + Create new scope
                      </p>
                    </div>
                  );
                }}
              />
            </div>
          ) : null}
        </div>
      </div>

      <div className="my-3 flex justify-end space-x-3">
        <WhiteButton text="Cancel" className="!w-36" />
        <CustomButton
          text="Place Bid"
          className="!w-36"
          onClick={() => formik.handleSubmit()}
        />
      </div>
    </section>
  );
}

export default withAuth(ContractorSubmitBidPage);
