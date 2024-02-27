import React, { useState, useCallback, useEffect, useRef } from 'react';
import * as Yup from 'yup';
import { Form, Formik, type FormikProps } from 'formik';
import { message, Upload } from 'antd';
import { toast } from 'react-toastify';
import Image from 'next/image';

import FormControl from '@/app/component/formControl';
import CustomModal from '@/app/component/modal';
import { categoriesService } from '@/app/services/categories.service';
import CustomButton from '@/app/component/customButton/button';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import { byteConverter } from '@/app/utils/byteConverter';
import { materialService } from '@/app/services/material.service';

interface Iprops {
  materialModal: boolean;
  setMaterialModal: React.Dispatch<React.SetStateAction<boolean>>;
  fetchMaterialsData: () => void;
}

const initialValues: InitialValuesTypes = {
  category: '',
  subCategory: '',
  file: {},
};

type InitialValuesTypes = {
  category: string;
  subCategory: string;
  file: Object;
};
const validationSchema = Yup.object({
  category: Yup.string().required('!'),
  subCategory: Yup.string().required('!'),
  file: Yup.object().required('!'),
});

const ImportMaterialModal = ({
  materialModal,
  setMaterialModal,
  fetchMaterialsData,
}: Iprops) => {
  const { Dragger } = Upload;
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState<Object[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const formikRef = useRef<FormikProps<InitialValuesTypes> | null>(null);
  const fetchCategories = useCallback(async () => {
    const result = await categoriesService.httpGetAllCategories(1, 9);
    let modifyCategories = result.data.map(
      (cat: { name: string; _id: string }) => {
        return {
          label: cat.name,
          value: cat._id,
        };
      }
    );
    setCategories(modifyCategories);
  }, []);

  const fetchSubCategories = useCallback(async () => {
    const result = await categoriesService.httpGetAllSubcategories(1, 9);
    const flattenedSubcategories: Object[] = [];

    result.data.forEach((category: any) => {
      category.subcategories.forEach((subcategory: any) => {
        const flattenedSubcategory = {
          label: subcategory.name,
          value: subcategory._id,
          categoryId: subcategory.categoryId,
        };
        flattenedSubcategories.push(flattenedSubcategory);
      });
    });
    setSubCategories(flattenedSubcategories);
  }, []);

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  const importMaterialHandler = async (values: InitialValuesTypes) => {
    setIsLoading(true);

    let file: any = values.file;

    if (byteConverter(file.size, 'MB').size > 10) {
      setIsLoading(false);
      toast.warning('Cannot upload document more then 10 mb of size.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('category', values.category);
      formData.append('subCategory', values.subCategory);
      formData.append('file', file.originFileObj);
      const { statusCode } =
        await materialService.httpUploadMaterialsData(formData);
      if (statusCode === 201) {
        setMaterialModal(false);
        fetchMaterialsData();
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <CustomModal setOpen={() => {
      if (formikRef.current) {
        formikRef.current.resetForm();
      }
      setMaterialModal(false)
    }}
      open={materialModal}>
      <div className="py-6 px-6 bg-white border border-solid border-elboneyGray rounded-[20px] z-50">
        <div className="flex justify-between items-center border-b-Gainsboro ">
          <div>
            <QuaternaryHeading
              title="Materials"
              className="text-graphiteGray font-bold"
            />
          </div>
          <Image
            src={'/crossblack.svg'}
            alt="close icon"
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={() => setMaterialModal(false)}
          />
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={importMaterialHandler}
          innerRef={formikRef}
        >
          {({ handleSubmit, values, setFieldValue, errors }) => {
            console.log(errors, 'errorserrorserrors');

            return (
              <Form
                name="basic"
                onSubmit={handleSubmit}
                autoComplete="off"
                className="mt-2"
              >
                <FormControl
                  control="select"
                  type="text"
                  label="Category"
                  options={categories}
                  className="w-full mb-3"
                  name="category"
                  placeholder="Select Category"
                />
                <FormControl
                  control="select"
                  type="text"
                  label="Sub-category"
                  options={subCategories.filter(
                    (cat: any) => cat.categoryId === values.category
                  )}
                  className="w-full mb-3"
                  name="subCategory"
                  placeholder="Select Subcategory"
                />
                <Dragger
                  accept="application/csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  name="file"
                  onChange={(info) => {
                    console.log(info, 'infoinfoinfoinfo');

                    if (status === 'done') {
                      message.success(
                        `${info.file.name} file uploaded successfully.`
                      );
                    } else if (status === 'error') {
                      message.error(`${info.file.name} file upload failed.`);
                    }
                    setFieldValue('file', info.file);
                  }}
                >
                  <Image
                    src="/uploadIcon.svg"
                    alt="uploadIcon.svg"
                    width={27}
                    height={26}
                  />
                  <p className="ant-upload-text !mt-3">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Browse to upload or drag it here
                  </p>
                </Dragger>
                <CustomButton
                  text="Import"
                  type="submit"
                  isLoading={isLoading}
                  className="!px-5 !py-3 w-full mt-3"
                />
              </Form>
            );
          }}
        </Formik>
      </div>
    </CustomModal>
  );
};

export default ImportMaterialModal;
