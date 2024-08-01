'use client';
import CustomButton from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import { InputComponent } from '@/app/component/customInput/Input';
import { DateInputComponent } from '@/app/component/cutomDate/CustomDateInput';
import SenaryHeading from '@/app/component/headings/senaryHeading';
import { TextAreaComponent } from '@/app/component/textarea';
import { withAuth } from '@/app/hoc/withAuth';
import { CrmType } from '@/app/interfaces/crm/crm.interface';
import { IUserInterface } from '@/app/interfaces/user.interface';
import { RootState } from '@/redux/store';
import { Spin, Upload } from 'antd';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import crmService from '@/app/services/crm/crm.service';
import { AxiosError } from 'axios';
import { LoadingOutlined } from '@ant-design/icons';
import ModalComponent from '@/app/component/modal';
import { ListCrmItems } from '../components/ListCrmItems';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import { ShowFileComponent } from '@/app/(pages)/bid-management/components/ShowFile.component';
import * as Yup from 'yup';
import { useRouterHook } from '@/app/hooks/useRouterHook';
import { Routes } from '@/app/utils/plans.utils';
import crmContractService, { CreateContractData, UpdateContractData } from '@/app/services/crm/crm-contract.service';
import AwsS3 from '@/app/utils/S3Intergration';
import type { RcFile } from 'antd/es/upload';
import { ICrmContract } from '@/app/interfaces/crm/crm-contract.interface';
import { FileInterface } from '@/app/interfaces/file.interface';

const ValidationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  startDate: Yup.date().required('Start Date is required'),
  endDate: Yup.date().required('End Date is required'),
  description: Yup.string().required('Description is required'),
  projectName: Yup.string().required('Project Name is required'),
  projectNo: Yup.string().required('Project Number is required'),
  file: Yup.mixed().required('File is required'),
  receiver: Yup.string().required('Receiver is required'),
});

function CreateContractPage() {
  const [crmItem, setCrmItem] = useState<CrmType | null>(null);
  const [isFetchingItem, setIsFetchingItem] = useState(false);
  const searchParams = useSearchParams();
  const authUser = useSelector(
    (state: RootState) => state.auth.user as { user?: IUserInterface }
  );
  const [showList, setShowList] = useState(false);
  const router = useRouterHook();
  const [isLoading, setIsLoading] = useState(false);
  const [contract, setContract] = useState<ICrmContract | null>(null);

  const contractId = searchParams.get('id');
  const isEdit = searchParams.get('edit');

  const formik = useFormik<Omit<CreateContractData, "status"> | Omit<UpdateContractData, "status">>({
    initialValues: contract ? {
      title: contract.title,
      startDate: contract.startDate,
      endDate: contract.endDate,
      description: contract.description,
      projectName: contract.projectName,
      projectNo: contract.projectNo,
      file: contract.file,
      receiver: typeof contract.receiver === 'string' ? contract.receiver : contract.receiver._id,
    } : {
      title: '',
      startDate: new Date().toISOString(),
      endDate: '',
      description: '',
      projectName: '',
      projectNo: '',
      file: undefined as any,
      receiver: '' as string,
    },
    async onSubmit(values) {
      const isEdit = searchParams.get('edit');
      if (isEdit && isEdit === 'true' && contract) {
        setIsLoading(true);
        try {
          let data: UpdateContractData = {
            ...values,
            status: contract.status,
            receiver: values.receiver as string,
          };
          // if contract.file is same as data.file then not need to upload file otherwise upload
          if (values.file !== contract.file) {
            const url = await new AwsS3(values.file, 'documents/crm/').getS3URL();
            data = {
              ...data,
              file: {
                extension: values.file!.name.split('.').pop() || '',
                name: values.file!.name,
                type: values.file!.type,
                url,
              },
            };
          }
          const response = await crmContractService.httpUpdateContract(contract._id, data);
          if (response.data) {
            toast.success('Contract updated successfully');
            router.push(
              `${Routes.CRM.Contractors}`
            );
          }
        } catch (error) {
          toast.error('Unable to update contract');
        } finally {
          setIsLoading(false);
        }
      }
      else if (crmItem) {
        setIsLoading(true);
        try {
          const url = await new AwsS3(values.file, 'documents/crm/').getS3URL();
          const valFile = values.file as unknown as RcFile;
          const response = await crmContractService.httpCreateContract({
            ...values,
            receiver: crmItem._id,
            status: 'draft',
            projectNo: `${values.projectNo}`,
            file: {
              extension: valFile.name.split('.').pop() || '',
              name: valFile.name,
              type: valFile.type,
              url,
            } as FileInterface,
          });
          if (response.data) {
            toast.success('Contract created successfully');
            router.push(
              `${Routes.CRM.Contractors}/edit-contract?contractId=${response.data._id}`
            );
          }
        } catch (error) {
          toast.error('Unable to create contract');
        } finally {
          setIsLoading(false);
        }
      }
    },
    validationSchema: ValidationSchema,
    enableReinitialize: contract ? true : false,
  });

  useEffect(() => {
    const receiverId = searchParams.get('receiver');
    if (receiverId) {
      getCrmItemById(receiverId);
    }
  }, [searchParams,]);

  useEffect(() => {

    if (contractId && isEdit && isEdit === 'true') {
      getContractById(contractId);
    }

  }, [contractId, isEdit]);

  async function getCrmItemById(id: string) {
    setIsFetchingItem(true);
    try {
      const response = await crmService.httpGetItemById(id);
      if (response.data) {
        setCrmItem(response.data);
        formik.setFieldValue('receiver', response.data._id);
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      if (err.response?.data) {
        toast.error('Unable to get the item');
      }
    } finally {
      setIsFetchingItem(false);
    }
  }

  async function getContractById(id: string) {
    setIsFetchingItem(true);
    try {
      const response = await crmContractService.httpFindContractById(id);
      if (response.data) {
        setContract(response.data);
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      if (err.response?.data) {
        toast.error('Unable to get the item');
      }
    } finally {
      setIsFetchingItem(false);
    }
  }

  return (
    <section className="mt-6 !pb-[39px]  mx-4 ">
      <div className="flex items-center justify-between">
        <SenaryHeading
          title={contract ? "Edit Contract" : "Create New Contract"}
          className="text-schestiPrimaryBlack text-xl leading-7 font-semibold"
        />

        <div className="flex items-center space-x-3">
          <WhiteButton onClick={() => router.push(Routes.CRM.Contractors)} text="Cancel" className="!w-fit" />
          <CustomButton
            text="Save"
            className="!w-fit"
            onClick={() => {
              formik.setFieldTouched('file', true);
              formik.submitForm();
            }}
            isLoading={isLoading}
            loadingText="Saving..."
          />
        </div>
      </div>

      <ModalComponent open={showList} setOpen={setShowList}>
        <ListCrmItems
          onClose={() => setShowList(false)}
          title="Select Item"
          onItemClick={(item) => {
            setCrmItem(item);
            formik.setFieldValue('receiver', item._id);
            setShowList(false);
          }}
        />
      </ModalComponent>

      <div className="p-5 bg-white rounded-md mt-5 space-y-3">
        <div>
          <p className="text-graphiteGray text-sm font-medium leading-6 capitalize">
            Contract Information
          </p>
          <Upload.Dragger
            name={'file'}
            // accept=".csv, .xls, .xlsx"
            beforeUpload={(_file, FileList) => {
              for (const file of FileList) {
                const isLessThan500MB = file.size < 500 * 1024 * 1024; // 500MB in bytes
                if (!isLessThan500MB) {
                  toast.error('File size should be less than 500MB');
                  return false;
                }
              }
              formik.setFieldValue('file', _file);
              return false;
            }}
            style={{
              borderStyle: 'dashed',
              borderWidth: 2,
              marginTop: 12,
              backgroundColor: 'transparent',
              borderColor: formik.errors.file ? 'red' : '#E2E8F0',
            }}
            itemRender={() => {
              return null;
            }}
          >
            <p className="ant-upload-drag-icon">
              <Image
                src={'/uploadcloudcyan.svg'}
                width={50}
                height={50}
                alt="upload"
              />
            </p>
            <p className="text-[18px] font-semibold py-2 leading-5 text-[#2C3641]">
              Drop your files here, or browse
            </p>

            <p className="text-sm font-normal text-center py-2 leading-5 text-[#2C3641]">
              or
            </p>

            <CustomButton
              text="Select File"
              className="!w-fit !px-6 !bg-schestiLightPrimary !text-schestiPrimary !py-2 !border-schestiLightPrimary"
            />
          </Upload.Dragger>
          {formik.values.file && formik.values.file.url ? (
            <ShowFileComponent
              file={{
                extension: (formik.values.file as any)?.type,
                name: (formik.values.file as any)?.name,
                type: (formik.values.file as any)?.type,
                url: formik.values.file.url,
              }}
              onDelete={() => formik.setFieldValue('file', undefined)}
              shouldFit
            />
          ) : formik.values.file ? <ShowFileComponent
            file={{
              extension: (formik.values.file as any)?.type,
              name: (formik.values.file as any)?.name,
              type: (formik.values.file as any)?.type,
              url: URL.createObjectURL(formik.values.file as any),
            }}
            onDelete={() => formik.setFieldValue('file', undefined)}
            shouldFit
          /> : null}
        </div>

        <InputComponent
          label="Contract Title"
          placeholder="Contract Title"
          name="title"
          type="text"
          field={{
            value: formik.values.title,
            onChange: formik.handleChange,
            onBlur: formik.handleBlur,
          }}
          hasError={formik.touched.title && Boolean(formik.errors.title)}
          errorMessage={
            formik.touched.title && formik.errors.title
              ? formik.errors.title
              : ''
          }
        />

        <div className="grid grid-cols-2 gap-3">
          <DateInputComponent
            label="Start Date"
            name="startDate"
            fieldProps={{
              value: formik.values.startDate
                ? dayjs(formik.values.startDate)
                : undefined,
              onChange: (_, dateString) => {
                formik.setFieldValue('startDate', dateString);
              },
              onBlur: formik.handleBlur,
              name: 'startDate',
            }}
            hasError={
              formik.touched.startDate && Boolean(formik.errors.startDate)
            }
            errorMessage={
              formik.touched.startDate && formik.errors.startDate
                ? formik.errors.startDate
                : ''
            }
          />

          <DateInputComponent
            label="End Date"
            name="endDate"
            fieldProps={{
              value: formik.values.endDate
                ? dayjs(formik.values.endDate)
                : undefined,
              onChange: (_, dateString) => {
                formik.setFieldValue('endDate', dateString);
              },
              onBlur: formik.handleBlur,
              name: 'endDate',
            }}
            hasError={formik.touched.endDate && Boolean(formik.errors.endDate)}
            errorMessage={
              formik.touched.endDate && formik.errors.endDate
                ? formik.errors.endDate
                : ''
            }
          />
        </div>

        <TextAreaComponent
          label="Description"
          name="description"
          placeholder="Enter description"
          field={{
            value: formik.values.description,
            onChange: formik.handleChange,
            onBlur: formik.handleBlur,
          }}
          hasError={
            formik.touched.description && Boolean(formik.errors.description)
          }
          errorMessage={
            formik.touched.description && formik.errors.description
              ? formik.errors.description
              : ''
          }
        />

        <div className="grid grid-cols-2 gap-3">
          <div className="border p-3 rounded-md">
            <p className="text-graphiteGray text-sm font-medium leading-6 capitalize">
              Company Information
            </p>

            <div className="mt-1 grid grid-cols-2 gap-2">
              <InputComponent
                label="Sender Name"
                name="senderName"
                placeholder="Sender Name"
                type="text"
                field={{
                  value: authUser?.user?.name,
                }}
              />
              <InputComponent
                label="Company Name"
                name="companyName"
                placeholder="Company Name"
                type="text"
                field={{
                  value:
                    authUser?.user?.companyName ||
                    authUser?.user?.organizationName,
                }}
              />

              <InputComponent
                label="Phone Number"
                name="phone"
                type="text"
                field={{
                  value: authUser?.user?.phone,
                }}
              />
              <InputComponent
                label="Email"
                name="email"
                placeholder="Email"
                type="email"
                field={{
                  value: authUser?.user?.email,
                }}
              />

              <div className="col-span-2">
                <InputComponent
                  label="Address"
                  name="address"
                  placeholder="Address"
                  type="text"
                  field={{
                    value: authUser?.user?.address,
                  }}
                />
              </div>
            </div>
          </div>

          <div
            className={`border flex flex-col p-3 rounded-md ${formik.errors.receiver ? 'border-red-500' : ''}`}
          >
            <div className="flex items-center justify-between">
              <p className="text-graphiteGray text-sm font-medium leading-6 capitalize">
                Receiver Information
              </p>
              {crmItem ? (
                <CustomButton
                  text="Select"
                  className="!bg-schestiLightPrimary !text-schestiPrimary !py-2 !w-fit !border-schestiLightPrimary"
                  onClick={() => {
                    setShowList(true);
                  }}
                />
              ) : null}
            </div>
            {!crmItem ? (
              <div className="h-full flex items-center justify-center">
                <CustomButton
                  text="Select"
                  className="!bg-schestiLightPrimary !text-schestiPrimary !py-2 !w-fit !border-schestiLightPrimary"
                  onClick={() => {
                    setShowList(true);
                  }}
                />
              </div>
            ) : null}
            <Spin
              spinning={isFetchingItem}
              indicator={<LoadingOutlined spin />}
            >
              {crmItem ? (
                <div className="mt-1 grid grid-cols-2 gap-2">
                  <InputComponent
                    label="Receiver Name"
                    placeholder="Receiver Name"
                    name="receiverName"
                    type="text"
                    field={{
                      value: crmItem
                        ? crmItem?.module === 'partners' ||
                          crmItem?.module === 'subcontractors'
                          ? crmItem?.companyRep
                          : crmItem?.firstName + ' ' + crmItem?.lastName
                        : undefined,
                    }}
                  />
                  <InputComponent
                    label="Company Name"
                    name="companyName"
                    placeholder="Company Name"
                    type="text"
                    field={{
                      value:
                        crmItem?.module === 'subcontractors' ||
                          crmItem?.module === 'partners'
                          ? crmItem?.name
                          : crmItem?.companyName,
                    }}
                  />

                  <InputComponent
                    label="Phone Number"
                    placeholder="Phone Number"
                    name="phone"
                    type="text"
                    field={{
                      value: crmItem?.phone,
                    }}
                  />
                  <InputComponent
                    label="Email"
                    placeholder="Email"
                    name="email"
                    type="email"
                    field={{
                      value: crmItem?.email,
                    }}
                  />

                  <div className="col-span-2">
                    <InputComponent
                      label="Address"
                      placeholder="Address"
                      name="address"
                      type="text"
                      field={{
                        value: crmItem?.address,
                      }}
                    />
                  </div>
                </div>
              ) : null}
            </Spin>
          </div>
        </div>
      </div>

      <div className="my-5 grid grid-cols-2 gap-4 p-5 bg-white rounded-md">
        <InputComponent
          label="Project Name"
          placeholder="Project Name"
          name="projectName"
          type="text"
          field={{
            value: formik.values.projectName,
            onChange: formik.handleChange,
            onBlur: formik.handleBlur,
          }}
          hasError={
            formik.touched.projectName && Boolean(formik.errors.projectName)
          }
          errorMessage={
            formik.touched.projectName && formik.errors.projectName
              ? formik.errors.projectName
              : ''
          }
        />

        <InputComponent
          label="Project Number"
          placeholder="Project Number"
          name="projectNo"
          type="text"
          field={{
            value: formik.values.projectNo,
            onChange: formik.handleChange,
            onBlur: formik.handleBlur,
          }}
          hasError={
            formik.touched.projectNo && Boolean(formik.errors.projectNo)
          }
          errorMessage={
            formik.touched.projectNo && formik.errors.projectNo
              ? formik.errors.projectNo
              : ''
          }
        />
      </div>
    </section>
  );
}

export default withAuth(CreateContractPage);
