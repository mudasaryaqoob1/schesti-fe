import { ShowFileComponent } from '@/app/(pages)/bid-management/components/ShowFile.component';
import CustomButton from '@/app/component/customButton/button';
import PrimaryHeading from '@/app/component/headings/primary';
import SenaryHeading from '@/app/component/headings/senaryHeading';
import { IAIAInvoice } from '@/app/interfaces/client-invoice.interface';
import { clientInvoiceService } from '@/app/services/client-invoices.service';
import { fileSizeValidator, uploadFilesToS3 } from '@/app/utils/utils';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const ValidationSchema = Yup.object().shape({
  lienWaiverFiles: Yup.array().of(Yup.mixed()),
  salesFiles: Yup.array().of(Yup.mixed()),
  federalPaperFiles: Yup.array().of(Yup.mixed()),
  materialsFiles: Yup.array().of(Yup.mixed()),
  otherFiles: Yup.array().of(Yup.mixed()),
});

type Props = {
  parentInvoice: IAIAInvoice;
  onParentInvoiceUpdate: (_data: IAIAInvoice) => void;
};
export function AIAForms({ onParentInvoiceUpdate, parentInvoice }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadig, setIsUploading] = useState({
    lienWaiver: false,
    sales: false,
    federalPaper: false,
    materials: false,
    others: false,
  });

  const formik = useFormik({
    initialValues: {
      lienWaiverFiles: parentInvoice.lienWaiverFiles,
      salesFiles: parentInvoice.salesFiles,
      federalPaperFiles: parentInvoice.federalPaperFiles,
      materialsFiles: parentInvoice.materialsFiles,
      otherFiles: parentInvoice.otherFiles,
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values) => {
      const isValid = Object.values(values).some((val) => val.length > 0);
      if (isValid) {
        setIsSubmitting(true);
        try {
          const response =
            await clientInvoiceService.httpUploadInvoiceDocuments(
              parentInvoice._id,
              values
            );
          if (response.data) {
            toast.success('Files uploaded successfully');
            onParentInvoiceUpdate(response.data);
          }
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;
          toast.error(err.response?.data.message);
        } finally {
          setIsSubmitting(false);
        }
      } else {
        toast.error('Please upload files');
      }
    },
  });

  return (
    <div className="pb-4">
      <SenaryHeading title="AIA DOCUMENT G702 - 1992" />

      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded-md p-2">
          <PrimaryHeading title="Lien Waiver" className="!text-[18px]" />

          {!formik.values.lienWaiverFiles.length ? (
            <Spin
              spinning={isUploadig.lienWaiver}
              indicator={<LoadingOutlined spin />}
            >
              <Dragger
                name={'file'}
                accept="image/*,gif,application/pdf"
                multiple={true}
                style={{
                  borderStyle: 'dashed',
                  borderWidth: 1,
                  borderColor: '#CDD2E1',
                }}
                beforeUpload={async (file, fileList) => {
                  const [isValidSize, allowedSize] =
                    fileSizeValidator(fileList);

                  if (!isValidSize) {
                    toast.error(
                      `File size should be less than ${allowedSize}MB`
                    );
                    return false;
                  }
                  setIsUploading((prev) => ({ ...prev, lienWaiver: true }));
                  try {
                    const files = await uploadFilesToS3(
                      fileList,
                      '/aia-invoice'
                    );

                    formik.setFieldValue('lienWaiverFiles', files);
                  } catch (error) {
                    console.log(error);
                    toast.error('Unable to upload file');
                  } finally {
                    setIsUploading((prev) => ({ ...prev, lienWaiver: false }));
                  }

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
            </Spin>
          ) : (
            <div className="flex space-x-2 items-center">
              {formik.values.lienWaiverFiles.map((file, index) => (
                <ShowFileComponent
                  file={file}
                  onDelete={() =>
                    formik.setFieldValue(
                      'lienWaiverFiles',
                      formik.values.lienWaiverFiles.filter(
                        (_, i) => i !== index
                      )
                    )
                  }
                  key={file.url}
                  shouldFit
                />
              ))}
            </div>
          )}
        </div>
        <div className="border rounded-md p-2">
          <PrimaryHeading title="Sales Tax" className="!text-[18px]" />

          {!formik.values.salesFiles.length ? (
            <Spin
              spinning={isUploadig.sales}
              indicator={<LoadingOutlined spin />}
            >
              {' '}
              <Dragger
                name={'file'}
                accept="image/*,gif,application/pdf"
                multiple={true}
                style={{
                  borderStyle: 'dashed',
                  borderWidth: 1,
                  borderColor: '#CDD2E1',
                }}
                beforeUpload={async (file, fileList) => {
                  const [isValidSize, allowedSize] =
                    fileSizeValidator(fileList);

                  if (!isValidSize) {
                    toast.error(
                      `File size should be less than ${allowedSize}MB`
                    );
                    return false;
                  }

                  setIsUploading((prev) => ({ ...prev, sales: true }));
                  try {
                    const files = await uploadFilesToS3(
                      fileList,
                      '/aia-invoice'
                    );

                    formik.setFieldValue('salesFiles', files);
                  } catch (error) {
                    console.log(error);
                    toast.error('Unable to upload file');
                  } finally {
                    setIsUploading((prev) => ({ ...prev, sales: false }));
                  }

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
            </Spin>
          ) : (
            <div className="flex space-x-2 items-center">
              {formik.values.salesFiles.map((file, index) => (
                <ShowFileComponent
                  file={file}
                  onDelete={() =>
                    formik.setFieldValue(
                      'salesFiles',
                      formik.values.salesFiles.filter((_, i) => i !== index)
                    )
                  }
                  shouldFit
                  key={file.url}
                />
              ))}
            </div>
          )}
        </div>
        <div className="border rounded-md p-2">
          <PrimaryHeading title="Federal Papers" className="!text-[18px]" />

          {!formik.values.federalPaperFiles.length ? (
            <Spin
              spinning={isUploadig.federalPaper}
              indicator={<LoadingOutlined spin />}
            >
              {' '}
              <Dragger
                name={'file'}
                accept="image/*,gif,application/pdf"
                multiple={true}
                style={{
                  borderStyle: 'dashed',
                  borderWidth: 1,
                  borderColor: '#CDD2E1',
                }}
                beforeUpload={async (file, fileList) => {
                  const [isValidSize, allowedSize] =
                    fileSizeValidator(fileList);

                  if (!isValidSize) {
                    toast.error(
                      `File size should be less than ${allowedSize}MB`
                    );
                    return false;
                  }

                  setIsUploading((prev) => ({ ...prev, federalPaper: true }));
                  try {
                    const files = await uploadFilesToS3(
                      fileList,
                      '/aia-invoice'
                    );

                    formik.setFieldValue('federalPaperFiles', files);
                  } catch (error) {
                    console.log(error);
                    toast.error('Unable to upload file');
                  } finally {
                    setIsUploading((prev) => ({
                      ...prev,
                      federalPaper: false,
                    }));
                  }

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
            </Spin>
          ) : (
            <div className="flex space-x-2 items-center">
              {formik.values.federalPaperFiles.map((file, index) => (
                <ShowFileComponent
                  file={file}
                  onDelete={() =>
                    formik.setFieldValue(
                      'federalPaperFiles',
                      formik.values.federalPaperFiles.filter(
                        (_, i) => i !== index
                      )
                    )
                  }
                  shouldFit
                  key={file.url}
                />
              ))}
            </div>
          )}
        </div>
        <div className="border rounded-md p-2">
          <PrimaryHeading title="Materials" className="!text-[18px]" />

          {!formik.values.materialsFiles.length ? (
            <Spin
              spinning={isUploadig.materials}
              indicator={<LoadingOutlined spin />}
            >
              {' '}
              <Dragger
                name={'file'}
                accept="image/*,gif,application/pdf"
                multiple={true}
                style={{
                  borderStyle: 'dashed',
                  borderWidth: 1,
                  borderColor: '#CDD2E1',
                }}
                beforeUpload={async (file, fileList) => {
                  const [isValidSize, allowedSize] =
                    fileSizeValidator(fileList);

                  if (!isValidSize) {
                    toast.error(
                      `File size should be less than ${allowedSize}MB`
                    );
                    return false;
                  }

                  setIsUploading((prev) => ({ ...prev, materials: true }));
                  try {
                    const files = await uploadFilesToS3(
                      fileList,
                      '/aia-invoice'
                    );

                    formik.setFieldValue('materialsFiles', files);
                  } catch (error) {
                    console.log(error);
                    toast.error('Unable to upload file');
                  } finally {
                    setIsUploading((prev) => ({ ...prev, materials: false }));
                  }

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
            </Spin>
          ) : (
            <div className="flex space-x-2 items-center">
              {formik.values.materialsFiles.map((file, index) => (
                <ShowFileComponent
                  file={file}
                  onDelete={() =>
                    formik.setFieldValue(
                      'materialsFiles',
                      formik.values.materialsFiles.filter((_, i) => i !== index)
                    )
                  }
                  shouldFit
                  key={file.url}
                />
              ))}
            </div>
          )}
        </div>
        <div className="col-span-2 border rounded-md p-2">
          <PrimaryHeading title="Others" className="!text-[18px]" />

          {!formik.values.otherFiles.length ? (
            <Spin
              spinning={isUploadig.others}
              indicator={<LoadingOutlined spin />}
            >
              {' '}
              <Dragger
                name={'file'}
                accept="image/*,gif,application/pdf"
                multiple={true}
                style={{
                  borderStyle: 'dashed',
                  borderWidth: 1,
                  borderColor: '#CDD2E1',
                }}
                beforeUpload={async (file, fileList) => {
                  const [isValidSize, allowedSize] =
                    fileSizeValidator(fileList);

                  if (!isValidSize) {
                    toast.error(
                      `File size should be less than ${allowedSize}MB`
                    );
                    return false;
                  }

                  setIsUploading((prev) => ({ ...prev, others: true }));
                  try {
                    const files = await uploadFilesToS3(
                      fileList,
                      '/aia-invoice'
                    );

                    formik.setFieldValue('otherFiles', files);
                  } catch (error) {
                    console.log(error);
                    toast.error('Unable to upload file');
                  } finally {
                    setIsUploading((prev) => ({ ...prev, others: false }));
                  }

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
            </Spin>
          ) : (
            <div className="flex space-x-2 items-center">
              {formik.values.otherFiles.map((file, index) => (
                <ShowFileComponent
                  file={file}
                  onDelete={() =>
                    formik.setFieldValue(
                      'otherFiles',
                      formik.values.otherFiles.filter((_, i) => i !== index)
                    )
                  }
                  shouldFit
                  key={file.url}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex mt-4 justify-end">
        <CustomButton
          text="Create"
          className="!w-fit"
          onClick={() => formik.handleSubmit()}
          isLoading={isSubmitting}
        />
      </div>
    </div>
  );
}
