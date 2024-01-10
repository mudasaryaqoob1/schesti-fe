'use client';

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import FormControl from '@/app/component/formControl';
import TertiaryHeading from '@/app/component/headings/tertiary';
import Description from '@/app/component/description';
import { Skeleton } from 'antd';
import { twMerge } from 'tailwind-merge';
import { btnStyle } from '@/globals/tailwindvariables';
import { byteConverter } from '@/app/utils/byteConverter';
import { useDispatch, useSelector } from 'react-redux';
import {
  reduxMaterialsData,
  reduxMaterialsLoading,
} from '@/redux/company/settingSlices/settingSelector';
import { selectToken } from '@/redux/authSlices/auth.selector';
import { HttpService } from '@/app/services/base.service';
import { AppDispatch } from '@/redux/store';
import { fetchMaterials } from '@/redux/company/settingSlices/setting.thunk';
import { materialService } from '@/app/services/material.service';
import { updateMaterialData } from '@/redux/company/settingSlices/materials.slice';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import { toast } from 'react-toastify';

type InitialValuesTypes = {
  unitLabourHour: string;
  unitMaterialCost: string;
  unitEquipments: string;
  category: string;
  _id?: string;
};
const Materials = () => {
  const [isUploadingMaterials, setIsUploadingMaterials] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState('');
  const [materialUploadingError , setMaterialUploadingError] =
    useState<any>(false);

  const dispatch = useDispatch<AppDispatch>();

  const token = useSelector(selectToken);

  console.log(materialUploadingError , 'materialUploadingErrormaterialUploadingError');
  

  const materialsData = useSelector(reduxMaterialsData);
  const materialsLoading = useSelector(reduxMaterialsLoading);

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  const fetchMaterialsData = useCallback(async () => {
    await dispatch(fetchMaterials({ page: 1, limit: 10 }));
  }, [dispatch]);

  useEffect(() => {
    fetchMaterialsData();
  }, []);

  const initialValues: InitialValuesTypes = {
    unitLabourHour: '',
    unitMaterialCost: '',
    unitEquipments: '',
    category: '',
  };

  const validationSchema = Yup.object({
    unitLabourHour: Yup.string().required('Unit Labor Hour is required!'),
    unitMaterialCost: Yup.string().required('Unit Material Cost is required!'),
    unitEquipments: Yup.string().required('Unit Equipment is required!'),
  });

  const uploadMaterialsHandler = async (
    e: any,
    category: string,
    resetCategory: () => void
  ) => {
    setMaterialUploadingError('');
    const file = e.target.files;
    if (!file[0]) {
      return;
    }
    if (byteConverter(file[0].size, 'MB').size > 10) {
      setMaterialUploadingError(
        'Cannot upload document more then 10 mb of size.'
      );
      return;
    }
    try {
      setIsUploadingMaterials(true);
      const formData = new FormData();
      formData.append('category', category);
      formData.append('file', file[0]);
      const { statusCode } =
        await materialService.httpUploadMaterialsData(formData);

      console.log({ statusCode });
      if (statusCode === 201) {
        toast.success('Material Uploaded Successfully');
        setSelectedRowId('');
        resetCategory();
        fetchMaterialsData();
      }
      setIsUploadingMaterials(false);
    } catch (error) {
      setIsUploadingMaterials(false);
    }
  };

  const handleUpdateMaterial = async ({
    unitEquipments,
    unitLabourHour,
    unitMaterialCost,
  }: InitialValuesTypes) => {
    const { statusCode, data } = await materialService.httpUpdateMaterial(
      selectedRowId,
      { unitEquipments, unitLabourHour, unitMaterialCost }
    );

    if (statusCode === 200) {
      setSelectedRowId('');
      updateMaterialData(data);
    }
  };

  const categoryOptions = [
    { value: 'Category 1', label: 'Category 1' },
    { value: 'Category 2', label: 'Category 2' },
    { value: 'Category 3', label: 'Category 3' },
  ];

  return (
    <>
      {
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleUpdateMaterial}
        >
          {({ handleSubmit, values, setFieldValue }) => {
            return (
              <Form
                name="basic"
                onSubmit={handleSubmit}
                autoComplete="off"
                className="mt-2"
              >
                <div className="flex justify-between items-center gap-4">
                  <TertiaryHeading title="Materials" />
                  <div className="flex gap-4 items-center">
                    <div className="rounded-lg border border-Gainsboro w-[335px] h-[40px]  flex items-center px-3">
                      <input
                        type="search"
                        name=""
                        id=""
                        placeholder="Search..."
                        className="w-full h-full bg-transparent outline-none"
                      />
                      <Image
                        src={'/search.svg'}
                        alt="search icon "
                        width={16}
                        height={16}
                        className="cursor-pointer"
                      />
                    </div>
                    <FormControl
                      control="select"
                      type="text"
                      options={categoryOptions}
                      className="w-48"
                      name="category"
                    />
                    <div>
                      {isUploadingMaterials ? (
                        <p>Uploading...</p>
                      ) : (
                        <div>
                          <label
                            htmlFor="import-estimates"
                            className={twMerge(
                              `${btnStyle} font-semibold cursor-pointer`
                            )}
                          >
                            Import Estimate
                          </label>
                          <input
                            multiple
                            type="file"
                            name="upload-file"
                            id="import-estimates"
                            className="hidden"
                            accept="application/pdf,.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            onClick={(e) => {
                              if (!values.category) {
                                e.preventDefault();
                                toast.error('Category is required!');
                                return;
                              }
                            }}
                            onChange={(e: any) => {
                              uploadMaterialsHandler(e, values.category, () =>
                                setFieldValue('category', '')
                              );
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-8 bg-graphiteGray p-3 rounded-lg mt-7 bg-opacity-10">
                    <Description title="Sub-Category" className="col-span-1" />
                    <Description title="Description" className="col-span-2" />
                    <Description title="Unit" className="col-span-1" />
                    <Description
                      title="Unit Labor Hour"
                      className="col-span-1"
                    />
                    <Description
                      title="Unit material cost"
                      className="col-span-1"
                    />
                    <Description
                      title="Unit equipment's"
                      className="col-span-1"
                    />
                    <Description
                      title="Actions"
                      className="col-span-1 text-center"
                    />
                  </div>
                  <div className="gap-4">
                    {materialsLoading ? (
                      <div className="mt-4">
                        <Skeleton />{' '}
                      </div>
                    ) : materialsData?.length < 1 ? (
                      <TertiaryHeading
                        className="mt-4 text-center"
                        title="No Data Available"
                      />
                    ) : (
                      materialsData?.map(
                        ({ _id: category, subcategories }: any, i: number) => {
                          return (
                            <div key={i}>
                              <div className="flex items-center gap-3 mt-4">
                                <QuaternaryHeading
                                  title={category}
                                  className="font-bold capitalize"
                                />
                                <div className="bg-silverGray rounded-s border border-solid border-Gainsboro cursor-pointer w-5 h-5 flex justify-center items-center">
                                  <Image
                                    src={'/chevron-down.svg'}
                                    alt="icon"
                                    width={16}
                                    height={16}
                                  />
                                </div>
                              </div>
                              {subcategories?.map(
                                ({
                                  _id,
                                  subCategory,
                                  description,
                                  unit,
                                  unitLabourHour,
                                  unitMaterialCost,
                                  unitEquipments,
                                }: any) => (
                                  <div key={_id} className="mt-3">
                                    <div className="grid grid-cols-8 gap-2 border border-b-graphiteGray border-transparent p-3 mt-3 border-opacity-20 bg-opacity-10">
                                      <Description
                                        title={subCategory}
                                        className="col-span-1"
                                      />
                                      <Description
                                        title={description}
                                        className="col-span-2"
                                      />
                                      <Description
                                        title={unit}
                                        className="col-span-1"
                                      />
                                      <div className="col-span-1">
                                        <FormControl
                                          control="simpleInput"
                                          type="text"
                                          value={
                                            _id === selectedRowId
                                              ? values.unitLabourHour
                                              : unitLabourHour
                                          }
                                          disabled={_id !== selectedRowId}
                                          placeholder="Labour Hour"
                                          name="unitLabourHour"
                                        />
                                      </div>
                                      <div className="col-span-1">
                                        <FormControl
                                          control="simpleInput"
                                          type="text"
                                          value={
                                            _id === selectedRowId
                                              ? values.unitMaterialCost
                                              : unitMaterialCost
                                          }
                                          disabled={_id !== selectedRowId}
                                          placeholder="Material Cost"
                                          name="unitMaterialCost"
                                        />
                                      </div>
                                      <div className="col-span-1 flex gap-2">
                                        <FormControl
                                          control="simpleInput"
                                          type="text"
                                          value={
                                            _id === selectedRowId
                                              ? values.unitEquipments
                                              : unitEquipments
                                          }
                                          disabled={_id !== selectedRowId}
                                          placeholder="Unit Equipment"
                                          name="unitEquipments"
                                        />
                                      </div>
                                      <div className="col-span-1 flex justify-center items-center">
                                        {_id === selectedRowId ? (
                                          <button type="submit">
                                            <Image
                                              src={
                                                _id === selectedRowId
                                                  ? '/hand-drawn-tick.svg'
                                                  : '/edit.svg'
                                              }
                                              className="cursor-pointer w-8 h-5"
                                              width={20}
                                              height={20}
                                              alt="edit"
                                            />
                                          </button>
                                        ) : (
                                          <Image
                                            src={
                                              _id === selectedRowId
                                                ? '/hand-drawn-tick.svg'
                                                : '/edit.svg'
                                            }
                                            className="cursor-pointer w-8 h-5"
                                            width={20}
                                            height={20}
                                            alt="edit"
                                            onClick={() => {
                                              if (_id !== selectedRowId) {
                                                setFieldValue(
                                                  'unitMaterialCost',
                                                  unitMaterialCost
                                                );
                                                setFieldValue(
                                                  'unitLabourHour',
                                                  unitLabourHour
                                                );
                                                setFieldValue(
                                                  'unitEquipments',
                                                  unitEquipments
                                                );
                                                setSelectedRowId(_id);
                                              }
                                            }}
                                          />
                                        )}
                                        <Image
                                          src="/trash.svg"
                                          className="cursor-pointer w-8"
                                          width={20}
                                          height={20}
                                          alt="delete"
                                          onClick={async () => {
                                            const { statusCode } =
                                              await materialService.httpDeleteMaterial(
                                                _id
                                              );
                                            if (statusCode === 200) {
                                              fetchMaterialsData();
                                              // dispatch(deleteMaterialData(data));
                                            }
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          );
                        }
                      )
                    )}
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      }
    </>
  );
};

export default Materials;
