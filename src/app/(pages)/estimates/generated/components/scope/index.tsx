'use client';
import CustomWhiteButton from '@/app/component/customButton/white';
import CustomButton from '@/app/component/customButton/button';
import TertiaryHeading from '@/app/component/headings/tertiary';
import FormControl from '@/app/component/formControl';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import type { ColumnsType } from 'antd/es/table';
import { Table } from 'antd';


type InitialValuesType = {
  category: string;
  subCategory: string;
  description: string;
  unit: string;
  qty: string;
  wastage: string;
  unitLaborHours: string;
  perHourLaborRate: string;
  unitMaterialCost: string;
  unitEquipmentCost: string;
}

const validationSchema = Yup.object({
  category: Yup.string().required('category name is required!'),
  subCategory: Yup.string().required('subCategory name is required!'),
  description: Yup.string().required('description name is required!'),
  unit: Yup.string().required('unit name is required!'),
  qty: Yup.string().required('qty name is required!'),
  wastage: Yup.string().required('wastage name is required!'),
  unitLaborHours: Yup.string().required('unitLaborHours name is required!'),
  perHourLaborRate: Yup.string().required('perHourLaborRate name is required!'),
  unitMaterialCost: Yup.string().required('unitMaterialCost name is required!'),
  unitEquipmentCost: Yup.string().required('unitEquipmentCost name is required!'),
});
import { Dispatch, SetStateAction, useState } from 'react';
import { bg_style } from '@/globals/tailwindvariables';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import Description from '@/app/component/description';
import { voidFc } from '@/app/utils/types';
import Image from 'next/image';

interface Props {
  setPrevNext: Dispatch<SetStateAction<number>>;
}

interface DataType {
  category?: string;
  subCategory?: string;
  description: string;
  unit: string;
  qty: string;
  wastage: string;
  unitLaborHours: string;
  perHourLaborRate: string;
  unitMaterialCost: string;
  unitEquipmentCost: string;
  tableKey: string;
  tableItemKey: string;
  Action: string;
}

const Scope = ({ setPrevNext }: Props) => {
  const [estimatesData, setEstimatesData] = useState<any>({});
  const [SingleEstimateData, setSingleEstimateData] = useState<null | DataType>(null);

  const initialValues: InitialValuesType = {
    category: SingleEstimateData?.category || '',
    subCategory: SingleEstimateData?.subCategory || '',
    description: SingleEstimateData?.description || '',
    unit: SingleEstimateData?.unit || '',
    qty: SingleEstimateData?.qty || '',
    wastage: SingleEstimateData?.wastage || '',
    unitLaborHours: SingleEstimateData?.unitLaborHours || '',
    perHourLaborRate: SingleEstimateData?.perHourLaborRate || '',
    unitMaterialCost: SingleEstimateData?.unitMaterialCost || '',
    unitEquipmentCost: SingleEstimateData?.unitEquipmentCost || '',
  };

  const submitHandler = (estimateTableItemValues: InitialValuesType, { resetForm }: { resetForm: voidFc }) => {

    // destructing values for estimate table item
    const { category, subCategory } = estimateTableItemValues;

    // changing reference for old estimates
    const estimates = { ...estimatesData };
    // key for table
    const estimateTableKey = `${category} ${subCategory}`

    const oldEstimateKeys = Object.keys(estimatesData);

    if (SingleEstimateData) {
      const { tableKey, tableItemKey } = SingleEstimateData;
      estimates[tableKey] = estimates[tableKey].map((tableItem: DataType) => {
        if (tableItem.tableItemKey === tableItemKey) {
          return { ...estimateTableItemValues, tableKey: tableItem.tableKey, tableItemKey: tableItem.tableItemKey }
        } else {
          return tableItem
        }
      });
      setEstimatesData(estimates);
      setSingleEstimateData(null);
      resetForm();
      return;
    }

    if (oldEstimateKeys.length > 0) {
      oldEstimateKeys.forEach((key: string) => {
        if (oldEstimateKeys.includes(estimateTableKey)) {
          estimates[key] = [...estimates[key], { ...estimateTableItemValues, tableKey: estimateTableKey, tableItemKey: estimates[key].length + 1 }];
        } else {
          estimates[estimateTableKey] = [{ ...estimateTableItemValues, tableKey: estimateTableKey, tableItemKey: 0 }];
        }
      })
    } else {
      estimates[estimateTableKey] = [{ ...estimateTableItemValues, tableKey: estimateTableKey, tableItemKey: 0 }];
    }
    setEstimatesData(estimates);
    resetForm();
  };
  const columns: ColumnsType<DataType> = [
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
    },
    {
      title: 'Wastage',
      dataIndex: 'wastage',
    },
    {
      title: 'Qty with wastage',
      dataIndex: 'qty',
    },
    {
      title: 'Labor Cost (per hour)',
      dataIndex: 'wastage',
    },
    {
      title: 'Total Labor Hour',
      dataIndex: 'unitLaborHours',
    },
    {
      title: 'Unit Material Cost',
      dataIndex: 'perHourLaborRate',
    },
    {
      title: 'Total Material Cost',
      dataIndex: 'unitMaterialCost',
    },
    {
      title: 'Total Equipment Cost',
      dataIndex: 'unitEquipmentCost',
    },
    {
      title: 'Total Cost',
      dataIndex: 'qty',
    },

    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      key: 'action',
      render: (text, record) => (
        <div className="flex gap-2 justify-center">
          <Image
            src="/edit.svg"
            className="cursor-pointer"
            width={20}
            height={20}
            alt="edit"
            onClick={
              () => setSingleEstimateData(record)
            }
          />
          <Image
            src="/trash.svg"
            className="cursor-pointer"
            width={20}
            height={20}
            alt="delete"
            onClick={
              () => {
                const oldEstimatesData = { ...estimatesData };
                const { tableKey, tableItemKey } = record;
                oldEstimatesData[tableKey] = oldEstimatesData[tableKey].filter((tableItem: DataType) => tableItem.tableItemKey !== tableItemKey);
                setEstimatesData(oldEstimatesData);
              }
            }
          />
        </div>
      ),
    },
  ];


  return (
    <div>
      {/*  */}
      <div className="flex justify-between items-center mb-3">
        <TertiaryHeading
          title="Scope"
          className="text-graphiteGray font-semibold"
        />
        <div className="grid grid-rows-1 md:grid-cols-3 gap-x-2">
          <CustomButton
            text="View Plans"
            className="!text-graphiteGray !bg-snowWhite !shadow-scenarySubdued 
                    border-2 border-solid !border-celestialGray "
          />
          <CustomButton
            text="Previous"
            className="!text-graphiteGray !bg-snowWhite !shadow-scenarySubdued 
                    border-2 border-solid !border-celestialGray"
            onClick={() => setPrevNext((prev) => prev - 1)}
          />

          <CustomButton
            text="Next"
            className="!w-full"
            onClick={() => setPrevNext((prev) => prev + 1)}
          />
        </div>
      </div>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {({ handleSubmit }) => {
          return (
            <Form
              name="basic"
              onSubmit={handleSubmit}
              autoComplete="off"
              className={`p-5 ${bg_style} mt-4`}
            >
              <div className="grid grid-cols-1 grid-rows-1 md:grid-cols-2 mb-3 gap-2">
                <FormControl
                  control="select"
                  label="Category"
                  labelStyle='font-normal'
                  type="text"
                  name="category"
                  disabled={SingleEstimateData}
                  placeholder="Enter Category"
                  className="w-full h-10"
                />
                <FormControl
                  control="select"
                  label="Sub Category"
                  labelStyle='font-normal'
                  type="text"
                  disabled={SingleEstimateData}
                  name="subCategory"
                  placeholder="Enter Subcategory"
                  className="w-full h-10"
                />
              </div>
              <div className="bg-graylighty h-px w-full my-5"></div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-x-2 ">
                <div className="md:col-start-1 md:col-end-3">
                  <FormControl
                    control="input"
                    type="text"
                    inputStyle='!py-2'
                    labelStyle='font-normal'
                    label='Description'
                    name="description"
                    placeholder="Enter Description"
                    mt="mt-0"
                  />
                </div>
                <FormControl
                  control="input"
                  type="text"
                  inputStyle='!py-2'
                  labelStyle='font-normal'
                  label='Unit'
                  name="unit"
                  placeholder="Select unit"
                  mt="mt-0"
                />
                <FormControl
                  control="input"
                  type="text"
                  inputStyle='!py-2'
                  labelStyle='font-normal'
                  label='Qty'
                  name="qty"
                  placeholder="Enter Qtyr"
                  mt="mt-0"
                />
              </div>
              <div className="grid grid-cols-1  grid-rows-1 md:grid-cols-6 gap-x-2 grid-y-5 mt-5">
                {/* div close */}
                <FormControl
                  control="input"
                  type="text"
                  name="wastage"
                  inputStyle='!py-2'
                  labelStyle='font-normal'
                  label='Wastage'
                  placeholder="Enter Wastage"
                />
                <FormControl
                  control="input"
                  type="text"
                  name="unitLaborHours"
                  inputStyle='!py-2'
                  labelStyle='font-normal'
                  label='Unit labor hours'
                  placeholder="Enter Labor Hour"
                />
                <FormControl
                  control="input"
                  type="text"
                  name="perHourLaborRate"
                  inputStyle='!py-2'
                  labelStyle='font-normal'
                  label='Per hours labor rate'
                  placeholder="Enter Labor Rate"
                />
                <FormControl
                  control="input"
                  type="text"
                  inputStyle='!py-2'
                  labelStyle='font-normal'
                  label='Unit material cost'
                  name="unitMaterialCost"
                  placeholder="Enter Material Cost"
                />
                <FormControl
                  control="input"
                  type="text"
                  inputStyle='!py-2'
                  labelStyle='font-normal'
                  label='Unit equipment cost'
                  name="unitEquipmentCost"
                  placeholder="Enter Equipment Cost"
                />
                <CustomWhiteButton
                  type="submit"
                  text={SingleEstimateData ? 'Update Item' : "Add item"}
                  className="self-end md:w-auto w-full md:my-0 mt-4 !bg-goldenrodYellow !p-2.5 !text-white"
                />
              </div>
              {
                SingleEstimateData && (
                  <div className="flex justify-end my-3">
                    <CustomButton
                      className="!w-40"
                      type="button"
                      text="Reset"
                      onClick={() => setSingleEstimateData(null)}
                      iconwidth={20}
                      iconheight={20}
                    />
                  </div>
                )
              }
              {
                Object.entries(estimatesData).map(([key, value]: any[], i) => (
                  value?.length > 0 && (
                    <div key={i} className={`${bg_style} p-5 mt-3`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <QuaternaryHeading
                            title={key}
                            className="font-semibold"
                          />
                        </div>
                        <Description
                          title=" Trade Cost: $42"
                          className="text-lg font-normal"
                        />
                      </div>

                      {value?.length > 0 && (
                        <Table
                          className='mt-2'
                          loading={false}
                          columns={columns}
                          dataSource={value as DataType[]}
                          pagination={{ position: ['bottomCenter'] }}
                        />
                      )}

                    </div>
                  )
                )
                )
              }


            </Form>
          );
        }}
      </Formik>
      {/* <AddItemTable headings={headings} /> */}
    </div>
  );
};

export default Scope;
