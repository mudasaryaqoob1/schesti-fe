import { ShowFileComponent } from '@/app/(pages)/bid-management/components/ShowFile.component';
import CustomButton from '@/app/component/customButton/button';
import { InputComponent } from '@/app/component/customInput/Input';
import { SelectComponent } from '@/app/component/customSelect/Select.component';
import { DateInputComponent } from '@/app/component/cutomDate/CustomDateInput';
import { TextAreaComponent } from '@/app/component/textarea';
import { FileInterface } from '@/app/interfaces/file.interface';
import AwsS3 from '@/app/utils/S3Intergration';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';
import *  as  Yup from 'yup';
import costCodeData from '../../cost-code';
import dayjs from 'dayjs';
import financialAssetService, { ICreateFinancialAsset } from '@/app/services/financial/financial-asset.service';
import { AxiosError } from 'axios';
import { IFinancialAsset } from '@/app/interfaces/financial/financial-asset.interface';


const ValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  costCode: Yup.string().required('Cost code is required'),
  assetType: Yup.string().required('Asset type is required'),
  assetDate: Yup.string().required('Asset date is required'),
  invoiceNo: Yup.string().required('Invoice number is required'),
  totalPrice: Yup.number().required('Total price is required'),
  project: Yup.string(),
  note: Yup.string(),
  salesTax: Yup.number(),
  countryTax: Yup.number(),
  paymentMethod: Yup.string(),
  reference: Yup.string(),
  repeat: Yup.string(),
  file: Yup.mixed()
})


type Props = {
  item?: IFinancialAsset;
  onSuccess: (_item: IFinancialAsset) => void;
}

export function AssetForm({ item, onSuccess }: Props) {
  const [showAdditional, setShowAdditional] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const formik = useFormik({
    initialValues: item ? { ...item } : {
      file: undefined,
      name: '',
      costCode: '',
      assetType: '',
      assetDate: new Date().toISOString(),
      invoiceNo: '',
      totalPrice: 0,
      project: '',
      note: '',
      salesTax: 0,
      countryTax: 0,
      paymentMethod: '',
      reference: "",
      repeat: ""
    },
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        if (item) {
          const response = await financialAssetService.httpUpdateAsset(values as unknown as ICreateFinancialAsset, item._id);
          if (response.data) {
            toast.success('Asset updated successfully');
            onSuccess(response.data);
          }
        } else {
          const response = await financialAssetService.httpCreateAsset(values as unknown as ICreateFinancialAsset);
          if (response.data) {
            toast.success('Asset created successfully');
            onSuccess(response.data);
          }
        }
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data.message || 'Unable to create asset');
      } finally {
        setIsSubmitting(false);
      }
    },
    validationSchema: ValidationSchema,
    enableReinitialize: item ? true : false
  })

  return (
    <div className="space-y-2">
      <Spin spinning={isUploading} indicator={<LoadingOutlined spin />}>
        <Dragger
          name={'file'}
          accept="image/*,gif,application/pdf,.doc,.docx,.csv, .xls, .xlsx, .ppt, .pptx, .txt, .pdf, .zip, .rar"
          multiple={true}
          beforeUpload={async (_file, FileList) => {
            for (const file of FileList) {
              const isLessThan500MB = file.size < 500 * 1024 * 1024; // 500MB in bytes
              if (!isLessThan500MB) {
                toast.error('File size should be less than 500MB');
                return false;
              }
            }
            setIsUploading(true);
            try {
              const url = await new AwsS3(_file, 'documents/financial/').getS3URL();
              const file: FileInterface = {
                extension: _file.name.split('.').pop() || '',
                name: _file.name,
                type: _file.type,
                url
              };

              formik.setFieldValue('file', file);
            } catch (error) {
              toast.error('Error uploading file');
            } finally {
              setIsUploading(false);
            }
            return false;
          }}
          style={{
            borderStyle: 'dashed',
            borderWidth: 6,
          }}
          itemRender={() => {
            return null;
          }}
          onChange={() => { }}
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
            PNG, GIF, JPG, PDF, TXT, XLS, XLSX, PPT, PPTX
          </p>
        </Dragger>
      </Spin>
      {formik.values.file ? <ShowFileComponent
        file={formik.values.file}
        onDelete={() => {
          formik.setFieldValue('file', undefined);
        }}
      /> : null}

      <InputComponent
        label="New Asset"
        name="name"
        type="text"
        placeholder="Enter item name"
        field={{
          value: formik.values.name ? formik.values.name : undefined,
          onChange: formik.handleChange,
          onBlur: formik.handleBlur
        }}
        hasError={Boolean(formik.touched.name && formik.errors.name)}
        errorMessage={formik.touched.name && formik.errors.name ? formik.errors.name : ''}
      />

      <div className='grid grid-cols-2 gap-4'>
        <SelectComponent
          label="Cost Code"
          name='costCode'
          placeholder="Select cost code"
          field={{
            options: costCodeData.map(item => {
              return { label: item.code, value: item.id };
            }),
            onChange: (val) => {
              formik.setFieldValue('costCode', val);
            },
            value: formik.values.costCode ? formik.values.costCode : undefined,
            onBlur: formik.handleBlur
          }}
          hasError={Boolean(formik.touched.costCode && formik.errors.costCode)}
          errorMessage={formik.touched.costCode && formik.errors.costCode ? "Cost code is required" : ''}
        />

        <SelectComponent
          label="Trade/Division"
          name='costCode'
          placeholder="Select Trade/Division"
          field={{
            options: costCodeData.map(item => {
              return { label: item.division, value: item.id };
            }),
            value: formik.values.costCode ? formik.values.costCode : undefined,
            onChange: (val) => {
              formik.setFieldValue('costCode', val);
            },
            onBlur: formik.handleBlur
          }}
          hasError={Boolean(formik.touched.costCode && formik.errors.costCode)}
          errorMessage={formik.touched.costCode && formik.errors.costCode ? "Division is required" : ''}

        />

        <div className='col-span-2'>
          <SelectComponent
            label='Description of Asset'
            name='costCode'
            placeholder='Select description'
            field={{
              options: costCodeData.map(item => {
                return { label: item.description, value: item.id };
              }),
              onChange: (val) => {
                formik.setFieldValue('costCode', val);
              },
              value: formik.values.costCode ? formik.values.costCode : undefined,
              onBlur: formik.handleBlur
            }}
            hasError={Boolean(formik.touched.costCode && formik.errors.costCode)}
            errorMessage={formik.touched.costCode && formik.errors.costCode ? "Description is required" : ''}

          />
        </div>

        <SelectComponent
          label='Asset Type'
          name='assetType'
          placeholder='Select asset type'
          field={{
            options: [
              {
                label: "Current Assets", title: "Current Assets", options: [
                  { label: "Current Assets", value: "Current Assets" },
                  { label: "Cash on Bank", value: "Cash on Bank" },
                  { label: "Contract Receivable", value: "Contract Receivable" },
                  { label: "Startup Inventory", value: "Startup Inventory" },
                ]
              },

              {
                label: "Long Term Assets", title: "Long Term Assets", options: [
                  { label: "Vehicles", value: "Vehicles" },
                  { label: "Lands", value: "Lands" },
                  { label: "Equipments", value: "Equipments" },
                  { label: "Buildings", value: "Buildings" },

                ]
              },
              {
                label: "Depreciation", title: "Depreciation", options: [
                  { label: "Vehicles  Accumulated Depreciation", value: "Vehicles  Accumulated Depreciation" },
                ]
              },

            ],
            onChange: (val) => {
              formik.setFieldValue('assetType', val);
            },
            value: formik.values.assetType ? formik.values.assetType : undefined,
            onBlur: formik.handleBlur
          }}
          hasError={Boolean(formik.touched.assetType && formik.errors.assetType)}
          errorMessage={formik.touched.assetType && formik.errors.assetType ? formik.errors.assetType : ''}
        />

        <DateInputComponent
          label='Date'
          name='assetDate'
          placeholder='Enter date'
          fieldProps={{
            onChange: (date) => {
              formik.setFieldValue('assetDate', date.format('YYYY-MM-DD'));
            },
            value: formik.values.assetDate
              ? dayjs(formik.values.assetDate) : undefined,
            format: 'YYYY-MM-DD',
            onBlur: formik.handleBlur,
          }}
          hasError={Boolean(formik.touched.assetDate && formik.errors.assetDate)}
          errorMessage={formik.touched.assetDate && formik.errors.assetDate ? formik.errors.assetDate : ''}
        />

        <InputComponent
          label='Invoice #'
          name='invoiceNo'
          type='text'
          placeholder='Enter invoice number'
          field={{
            onChange: formik.handleChange,
            onBlur: formik.handleBlur,
            value: formik.values.invoiceNo ? formik.values.invoiceNo : undefined
          }}
          hasError={Boolean(formik.touched.invoiceNo && formik.errors.invoiceNo)}
          errorMessage={formik.touched.invoiceNo && formik.errors.invoiceNo ? formik.errors.invoiceNo : ''}
        />

        <InputComponent
          label='Total Price'
          name='totalPrice'
          type='number'
          placeholder='Enter total price'
          field={{
            onChange: e => {
              formik.setFieldValue('totalPrice', parseInt(e.target.value));
            },
            onBlur: formik.handleBlur,
            value: formik.values.totalPrice ? formik.values.totalPrice : undefined
          }}
          hasError={Boolean(formik.touched.totalPrice && formik.errors.totalPrice)}
          errorMessage={formik.touched.totalPrice && formik.errors.totalPrice ? formik.errors.totalPrice : ''}
        />

      </div>

      <SelectComponent
        label="Project"
        name="project"
        placeholder="Select project"
        field={{
          options: [
            { label: 'Project 1', value: '1' },
            { label: 'Project 2', value: '2' },
            { label: 'Project 3', value: '3' },
            { label: 'Project 4', value: '4' },
          ],
          onChange: (val) => {
            formik.setFieldValue('project', val);
          },
          value: formik.values.project ? formik.values.project : undefined,
          onBlur: formik.handleBlur
        }}
        hasError={Boolean(formik.touched.project && formik.errors.project)}
        errorMessage={formik.touched.project && formik.errors.project ? formik.errors.project : ''}
      />
      <TextAreaComponent
        label="Note"
        name="note"
        placeholder="Enter note"
        field={{
          onChange: formik.handleChange,
          onBlur: formik.handleBlur,
          value: formik.values.note ? formik.values.note : undefined
        }}
        hasError={Boolean(formik.touched.note && formik.errors.note)}
        errorMessage={formik.touched.note && formik.errors.note ? formik.errors.note : ''}
      />
      <div>
        <div onClick={() => setShowAdditional(!showAdditional)} className="flex w-fit items-center space-x-2 cursor-pointer ">
          <p className="text-schestiPrimary text-[18px] leading-8 font-medium underline underline-offset-2 ">
            Advance Details
          </p>
          <div className="rounded-full px-2 py-1 bg-schestiLightSuccess">
            <Image
              src={'/chevron-right-cyan.svg'}
              width={24}
              height={23}
              alt="forward arrow icon"
            />
          </div>
        </div>

        {showAdditional ? <>
          <div className="grid grid-cols-2 gap-4">
            <InputComponent
              label='Sales Tax'
              name='salesTax'
              type='number'
              placeholder='Enter sales tax'
              field={{
                onChange: e => {
                  formik.setFieldValue('salesTax', parseInt(e.target.value));
                },
                onBlur: formik.handleBlur,
                value: formik.values.salesTax ? formik.values.salesTax : undefined
              }}
              hasError={Boolean(formik.touched.salesTax && formik.errors.salesTax)}
              errorMessage={formik.touched.salesTax && formik.errors.salesTax ? formik.errors.salesTax : ''}
            />

            <InputComponent
              label='Country/Government Tax'
              name='countryTax'
              type='number'
              placeholder='Enter country/government tax'
              field={{
                onChange: e => {
                  formik.setFieldValue('countryTax', parseInt(e.target.value));
                },
                onBlur: formik.handleBlur,
                value: formik.values.countryTax ? formik.values.countryTax : undefined
              }}
              hasError={Boolean(formik.touched.countryTax && formik.errors.countryTax)}
              errorMessage={formik.touched.countryTax && formik.errors.countryTax ? formik.errors.countryTax : ''}
            />

            <SelectComponent
              label="Payment Method"
              name="paymentMethod"
              placeholder="Select payment method"
              field={{
                options: [
                  { label: 'Cash', value: 'Cash' },
                  { label: 'Cheque', value: 'Cheque' },
                  { label: 'Credit Card', value: 'Credit Card' },
                  { label: 'Bank Transfer', value: 'Bank Transfer' },
                  { label: 'Other', value: 'Other' },
                ],
                onChange: (val) => {
                  formik.setFieldValue('paymentMethod', val);
                },
                value: formik.values.paymentMethod ? formik.values.paymentMethod : undefined,
                onBlur: formik.handleBlur
              }}
              hasError={Boolean(formik.touched.paymentMethod && formik.errors.paymentMethod)}
              errorMessage={formik.touched.paymentMethod && formik.errors.paymentMethod ? formik.errors.paymentMethod : ''}
            />

            <InputComponent
              label="Reference#"
              name="reference"
              type="text"
              placeholder="Enter reference"
              field={{
                onChange: formik.handleChange,
                onBlur: formik.handleBlur,
                value: formik.values.reference ? formik.values.reference : undefined
              }}
              hasError={Boolean(formik.touched.reference && formik.errors.reference)}
              errorMessage={formik.touched.reference && formik.errors.reference ? formik.errors.reference : ''}
            />
          </div>

          <SelectComponent
            label="Repeat Every"
            name="repeat"
            placeholder="Select repeat"
            field={{
              options: [
                { label: "Weekly", value: "Weekly" },
                { label: "By Weekly", value: "By Weekly" },
                { label: "Monthly", value: "Monthly" },
                { label: "By Month", value: "By Month" },
                { label: "Yearly", value: "Yearly" },
                { label: "By Year", value: "By Year" },
              ],
              onChange: (val) => {
                formik.setFieldValue('repeat', val);
              },
              value: formik.values.repeat ? formik.values.repeat : undefined,
              onBlur: formik.handleBlur
            }}
            hasError={Boolean(formik.touched.repeat && formik.errors.repeat)}
            errorMessage={formik.touched.repeat && formik.errors.repeat ? formik.errors.repeat : ''}
          />
        </> : null}

      </div>
      <CustomButton text={item ? 'Update Asset' : "Add New Asset"} onClick={() => formik.handleSubmit()} isLoading={isSubmitting} />
    </div>
  );
}
