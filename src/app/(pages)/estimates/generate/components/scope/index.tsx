'use client';
import {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useCallback,
} from 'react';
import * as Yup from 'yup';
import { Table } from 'antd';
import { Formik, Form } from 'formik';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import '../scopeStyle.css';
import { useDispatch, useSelector } from 'react-redux';

import ModalComponent from '@/app/component/modal';
import CustomWhiteButton from '@/app/component/customButton/white';
import CustomButton from '@/app/component/customButton/button';
import TertiaryHeading from '@/app/component/headings/tertiary';
import FormControl from '@/app/component/formControl';
import { categoriesService } from '@/app/services/categories.service';
import { materialService } from '@/app/services/material.service';
import { bg_style } from '@/globals/tailwindvariables';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import { estimateRequestService } from '@/app/services/estimateRequest.service';
import { saveEstimateDetail } from '@/redux/estimate/estimateRequest.slice';
import { selectGeneratedEstimateDetail } from '@/redux/estimate/estimateRequestSelector';
import EstimatesTable from '../estimatesTable';

type InitialValuesType = {
  category: string;
  subCategory: string;
  description: string;
  unit: string;
  qty: string;
  wastage: string;
  unitLabourHour: string;
  perHourLaborRate: string;
  unitMaterialCost: string;
  unitEquipments: string;
};

const validationSchema = Yup.object({
  category: Yup.string().required('category name is required!'),
  subCategory: Yup.string().required('subCategory name is required!'),
  description: Yup.string().required('description name is required!'),
  unit: Yup.string().required('unit name is required!'),
  qty: Yup.string().required('qty name is required!'),
  wastage: Yup.string().required('wastage name is required!'),
  unitLabourHour: Yup.string().required('unitLaborHours name is required!'),
  perHourLaborRate: Yup.string().required('perHourLaborRate name is required!'),
  unitMaterialCost: Yup.string().required('unitMaterialCost name is required!'),
  unitEquipments: Yup.string().required('unitEquipmentCost name is required!'),
});

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
  unitLabourHour: string;
  perHourLaborRate: string;
  unitMaterialCost: string;
  unitEquipments: string;
  tableKey: string;
  tableItemKey: string;
  Action: string;
}

const initialValues: InitialValuesType = {
  category: '',
  subCategory: '',
  description: '',
  unit: '',
  qty: '',
  wastage: '5',
  unitLabourHour: '',
  perHourLaborRate: '',
  unitMaterialCost: '',
  unitEquipments: '',
};
const Scope = ({ setPrevNext }: Props) => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const { generateEstimateDetail } = useSelector(selectGeneratedEstimateDetail);

  const estimateIdQueryParameter = searchParams.get('estimateId');
  const [estimatesData, setEstimatesData] = useState<any>({});
  const [confirmEstimates, setConfirmEstimates] = useState<InitialValuesType[]>(
    []
  );
  const [SingleEstimateData, setSingleEstimateData] = useState<any>(null);
  const [estimateDetail, setEstimateDetail] = useState<any>({});
  const [viewPlansModel, setViewPlansModel] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState<Object[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [estimateDescriptions, setEstimateDescriptions] = useState([]);
  const [units, setUnits] = useState([]);
  const [unitLabourHours, setUnitLabourHours] = useState([]);
  const [perHourLabourRates, setPerHourLabourRates] = useState([]);
  const [unitMaterialCosts, setUnitMaterialCosts] = useState([]);
  const [unitEquipmentCost, setUnitEquipmentCost] = useState([]);

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
  const fetchEstimateDetail = useCallback(async () => {
    let result = await estimateRequestService.httpGetEstimateDetail(
      estimateIdQueryParameter
    );
    setEstimateDetail(result.data.estimateDetail);
  }, []);
  const fetchMeterialDetail = useCallback(
    async (categoryId: string, subCategory: string) => {
      materialService
        .httpGetMeterialWithCategoryId(categoryId, subCategory)
        .then((result) => {
          let uniqueDescriptionsSet = new Set();

          let fetchedDescriptions = result.data
            .map((material: DataType) => {
              const description = material.description;

              if (!uniqueDescriptionsSet.has(description)) {
                uniqueDescriptionsSet.add(description);
                return {
                  label: description,
                  value: description,
                };
              } else {
                return null;
              }
            })
            .filter((description: any) => description !== null);
          let uniqueUnitsSet = new Set();
          let fetchedUnits = result.data
            .map((material: DataType) => {
              const unit = material.unit;
              if (!uniqueUnitsSet.has(unit)) {
                uniqueUnitsSet.add(unit);
                return {
                  label: unit,
                  value: unit,
                };
              } else {
                return null;
              }
            })
            .filter((unit: any) => unit !== null);

          let uniqueLabourHoursSet = new Set();

          let fetchUnitsLabourHours = result.data
            .map((material: DataType) => {
              const unitLabourHour = material.unitLabourHour;

              if (!uniqueLabourHoursSet.has(unitLabourHour)) {
                uniqueLabourHoursSet.add(unitLabourHour);
                return {
                  label: unitLabourHour,
                  value: unitLabourHour,
                };
              } else {
                return null;
              }
            })
            .filter((unitLabourHour: any) => unitLabourHour !== null);
          let uniquePerHourLaborRatesSet = new Set();

          let fetchPerHourLabourRates = result.data
            .map((material: DataType) => {
              const perHourLaborRate = material.perHourLaborRate;

              if (!uniquePerHourLaborRatesSet.has(perHourLaborRate)) {
                uniquePerHourLaborRatesSet.add(perHourLaborRate);
                return {
                  label: perHourLaborRate,
                  value: perHourLaborRate,
                };
              } else {
                return null;
              }
            })
            .filter((perHourLaborRate: any) => perHourLaborRate !== null);
          let uniqueUnitMaterialCostSet = new Set();

          let fetchUnitMaterialCost = result.data
            .map((material: DataType) => {
              const unitMaterialCost = material.unitMaterialCost;

              if (!uniqueUnitMaterialCostSet.has(unitMaterialCost)) {
                uniqueUnitMaterialCostSet.add(unitMaterialCost);
                return {
                  label: unitMaterialCost,
                  value: unitMaterialCost,
                };
              } else {
                return null;
              }
            })
            .filter((unitMaterialCost: any) => unitMaterialCost !== null);
          let uniqueUnitEquipmentCostSet = new Set();

          let fetchUnitEquipmentCost = result.data
            .map((material: DataType) => {
              const unitEquipments = material.unitEquipments;

              if (!uniqueUnitEquipmentCostSet.has(unitEquipments)) {
                uniqueUnitEquipmentCostSet.add(unitEquipments);
                return {
                  label: unitEquipments,
                  value: unitEquipments,
                };
              } else {
                return null;
              }
            })
            .filter((unitEquipments: any) => unitEquipments !== null);

          setEstimateDescriptions(fetchedDescriptions);
          setUnits(fetchedUnits);
          setUnitLabourHours(fetchUnitsLabourHours);
          setPerHourLabourRates(fetchPerHourLabourRates);
          setUnitMaterialCosts(fetchUnitMaterialCost);
          setUnitEquipmentCost(fetchUnitEquipmentCost);
        })
        .catch((error) => {
          console.log(error, 'error in fetch meterials');
        });
    },
    []
  );

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
    fetchEstimateDetail();
  }, []);

  useEffect(() => {
    if (selectedCategory && selectedSubCategory) {
      fetchMeterialDetail(selectedCategory, selectedSubCategory);
    }
    setEstimateDescriptions([]);
    setUnits([]);
    setUnitLabourHours([]);
    setPerHourLabourRates([]);
    setUnitMaterialCosts([]);
    setUnitEquipmentCost([]);
  }, [selectedCategory, selectedSubCategory]);

  useEffect(() => {
    if (generateEstimateDetail?.scopeDetail?.length) {
      setConfirmEstimates(generateEstimateDetail?.scopeDetail);
    }
  }, [generateEstimateDetail]);

  const submitHandler = (
    estimateTableItemValues: InitialValuesType
    // { resetForm }: { resetForm: voidFc }
  ) => {
    const { category, subCategory } = estimateTableItemValues;

    const selctedCatoryName: any = categories.find(
      (cat: any) => cat.value === category
    );
    const selctedSubCategoryName: any = subCategories.find(
      (cat: any) => cat.value === subCategory
    );
    const oldEstimateKeys = Object.keys(estimatesData);

    if (
      Object.keys(estimatesData).length &&
      !oldEstimateKeys.includes(
        `${selctedCatoryName.label} ${selctedSubCategoryName.label}`
      )
    ) {
      toast.warning('Please add div first then create new');
      return;
    }

    const existEstimateRecord = confirmEstimates.find(
      (obj: any) =>
        Object.keys(obj)[0] ===
        `${selctedCatoryName.label} ${selctedSubCategoryName.label}`
    );
    if (existEstimateRecord) {
      toast.warning('Record already added with these category and subcategory');
      return;
    }

    const estimates = { ...estimatesData };
    const estimateTableKey = `${selctedCatoryName.label} ${selctedSubCategoryName.label}`;

    if (SingleEstimateData) {
      const { tableKey, tableItemKey } = SingleEstimateData;
      estimates[tableKey] = estimates[tableKey].map((tableItem: DataType) => {
        if (tableItem.tableItemKey === tableItemKey) {
          return {
            ...estimateTableItemValues,
            tableKey: tableItem.tableKey,
            tableItemKey: tableItem.tableItemKey,
          };
        } else {
          return tableItem;
        }
      });
      setEstimatesData(estimates);
      setSingleEstimateData(null);
      // resetForm();
      return;
    }

    if (oldEstimateKeys.length > 0) {
      oldEstimateKeys.forEach((key: string) => {
        if (oldEstimateKeys.includes(estimateTableKey)) {
          estimates[key] = [
            ...estimates[key],
            {
              ...estimateTableItemValues,
              tableKey: estimateTableKey,
              tableItemKey: estimates[key].length + 1,
            },
          ];
        } else {
          estimates[estimateTableKey] = [
            {
              ...estimateTableItemValues,
              tableKey: estimateTableKey,
              tableItemKey: 0,
            },
          ];
        }
      });
    } else {
      estimates[estimateTableKey] = [
        {
          ...estimateTableItemValues,
          tableKey: estimateTableKey,
          tableItemKey: 0,
        },
      ];
    }
    setEstimatesData(estimates);
    // resetForm();
  };
  const columns: any = [
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      align: 'center',
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
      align: 'center',
    },
    {
      title: 'Wastage',
      dataIndex: 'wastage',
      align: 'center',
    },
    {
      title: 'Qty with wastage',
      dataIndex: 'qtyWithWastage',
      align: 'center',
      render: (text: string, record: DataType) => {
        let quantity = parseFloat(record.qty);
        let wastagePercentage = parseFloat(record.wastage);
        let result = quantity * (1 + wastagePercentage / 100);
        return result.toFixed(2);
      },
    },
    {
      title: 'Per Hours Labor Rate',
      dataIndex: 'perHourLaborRate',
      align: 'center',
    },
    {
      title: 'Total Labor Cost',
      dataIndex: 'totalLaborCost',
      align: 'center',
      render: (text: string, record: DataType) => {
        let unitLabourHour = parseFloat(record.unitLabourHour);
        let quantity = parseFloat(record.qty);
        let result = quantity * unitLabourHour;
        return result.toFixed(2);
      },
    },
    {
      title: 'Unit Material Cost',
      dataIndex: 'unitMaterialCost',
      align: 'center',
    },
    {
      title: 'Total Material Cost',
      dataIndex: 'totalMaterialCost',
      align: 'center',
      render: (text: string, record: DataType) => {
        let unitMaterialCost = parseFloat(record.unitMaterialCost);
        let quantity = parseFloat(record.qty);
        let wastagePercentage = parseFloat(record.wastage);
        let qtyWithWastage = quantity * (1 + wastagePercentage / 100);
        let result = unitMaterialCost * qtyWithWastage;
        return result.toFixed(2);
      },
    },
    {
      title: 'Total Equipment Cost',
      dataIndex: 'totalEquipmentCost',
      align: 'center',
      render: (text: string, record: DataType) => {
        let unitEquipments = parseFloat(record.unitEquipments);
        let quantity = parseFloat(record.qty);
        let result = unitEquipments * quantity;
        return result.toFixed(2);
      },
    },
    {
      title: 'Total Cost',
      dataIndex: 'totalCost',
      align: 'center',
      render: (text: string, record: DataType) => {
        let unitLabourHour = parseFloat(record.unitLabourHour);
        let quantity = parseFloat(record.qty);
        let totalLabourCost = quantity * unitLabourHour;
        let unitMaterialCost = parseFloat(record.unitMaterialCost);
        let wastagePercentage = parseFloat(record.wastage);
        let qtyWithWastage = quantity * (1 + wastagePercentage / 100);
        let totalMeterialCost = unitMaterialCost * qtyWithWastage;
        let unitEquipments = parseFloat(record.unitEquipments);
        let result = totalLabourCost * totalMeterialCost * unitEquipments;
        return result.toFixed(2);
      },
    },

    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      key: 'action',
      render: (text: string, record: DataType) => (
        <div className="flex gap-2 justify-center">
          <Image
            src="/edit.svg"
            className="cursor-pointer"
            width={20}
            height={20}
            alt="edit"
            onClick={() => setSingleEstimateData(record)}
          />
          <Image
            src="/trash.svg"
            className="cursor-pointer"
            width={20}
            height={20}
            alt="delete"
            onClick={() => {
              const oldEstimatesData = { ...estimatesData };
              const { tableKey, tableItemKey } = record;
              oldEstimatesData[tableKey] = oldEstimatesData[tableKey].filter(
                (tableItem: DataType) => tableItem.tableItemKey !== tableItemKey
              );
              setEstimatesData(oldEstimatesData);
            }}
          />
        </div>
      ),
    },
  ];
  const confirmEstimateHandler = (dataSource: any) => {
    const updatedConfirmEstimates = dataSource.map((record: any) => ({
      ...record,
      totalCostRecord: columns
        .find((col: any) => col?.dataIndex === 'totalCost')
        ?.render(record.dataIndex, record),
    }));

    const updatedEstimatesData = Object.fromEntries(
      Object.entries(estimatesData).map(([key, values]: any) => [
        key,
        values.map((obj: any) => {
          const matchingItem = updatedConfirmEstimates.find(
            (item: any) =>
              item.tableKey === key && item.tableItemKey === obj.tableItemKey
          );
          return matchingItem
            ? { ...obj, totalCostRecord: matchingItem.totalCostRecord }
            : obj;
        }),
      ])
    );

    setConfirmEstimates([...confirmEstimates, updatedEstimatesData]);
    setEstimatesData({});
  };
  const revertConfirmTableHandler = (estimateRecord: any) => {
    setEstimatesData(estimateRecord);
    const tableKey = Object.keys(estimateRecord);
    const newArray = confirmEstimates.filter((obj: any) => {
      const key = Object.keys(obj)[0];
      return !tableKey.includes(key);
    });

    setConfirmEstimates(newArray);
  };
  const nextStepHandler = () => {
    if (Object.keys(estimatesData).length) {
      toast.warning('Please add div first then move forward');
      return;
    } else {
      setPrevNext((prev) => prev + 1);
      dispatch(
        saveEstimateDetail({
          scopeDetail: confirmEstimates,
          takeOffDetail: generateEstimateDetail.takeOffDetail,
        })
      );
    }
  };

  return (
    <div>
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
            onClick={() => setViewPlansModel(true)}
          />
          <CustomButton
            text="Previous"
            className="!text-graphiteGray !bg-snowWhite !shadow-scenarySubdued 
                    border-2 border-solid !border-celestialGray"
            onClick={() => setPrevNext((prev) => prev - 1)}
          />

          <CustomButton
            disabled={confirmEstimates.length == 0}
            text="Next"
            className="!w-full"
            onClick={nextStepHandler}
          />
        </div>
      </div>
      <Formik
        initialValues={SingleEstimateData ? SingleEstimateData : initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {({ handleSubmit, values, resetForm }) => {
          return (
            <>
              <Form
                name="basic"
                onSubmit={handleSubmit}
                autoComplete="off"
                className={`p-5 ${bg_style} mt-4`}
              >
                <div className="grid grid-cols-1 grid-rows-1 md:grid-cols-2 mb-3 gap-2">
                  <FormControl
                    control="inputselect"
                    label="Category"
                    labelStyle="font-normal"
                    type="text"
                    name="category"
                    options={categories}
                    placeholder="Enter or create category"
                    className="w-full h-10"
                    setCustomState={setSelectedCategory}
                  />
                  <FormControl
                    control="inputselect"
                    label="Sub Category"
                    labelStyle="font-normal"
                    name="subCategory"
                    options={subCategories.filter(
                      (cat: any) => cat.categoryId === values.category
                    )}
                    placeholder="Enter or create subcategory"
                    className="w-full h-10"
                    setCustomState={setSelectedSubCategory}
                  />
                </div>
                <div className="bg-graylighty h-px w-full my-5"></div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-x-2 ">
                  <div className="md:col-start-1 md:col-end-3">
                    <FormControl
                      control="inputselect"
                      inputStyle="!py-2"
                      labelStyle="font-normal"
                      label="Description"
                      name="description"
                      options={estimateDescriptions}
                      placeholder="Select Description"
                      mt="mt-0"
                    />
                  </div>
                  <FormControl
                    control="inputselect"
                    inputStyle="!py-2"
                    labelStyle="font-normal"
                    label="Unit"
                    options={units}
                    name="unit"
                    placeholder="Select unit"
                    mt="mt-0"
                  />
                  <FormControl
                    control="input"
                    type="text"
                    inputStyle="!py-2"
                    labelStyle="font-normal"
                    label="Qty"
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
                    inputStyle="!py-2"
                    labelStyle="font-normal"
                    label="Wastage"
                    placeholder="Enter Wastage"
                  />
                  <FormControl
                    control="inputselect"
                    type="text"
                    name="unitLabourHour"
                    options={unitLabourHours}
                    inputStyle="!py-2"
                    labelStyle="font-normal"
                    label="Unit labor hours"
                    placeholder="Enter Labor Hour"
                  />
                  <FormControl
                    control="inputselect"
                    name="perHourLaborRate"
                    options={perHourLabourRates}
                    inputStyle="!py-2"
                    labelStyle="font-normal"
                    label="Per hours labor rate"
                    placeholder="Enter Labor Rate"
                  />
                  <FormControl
                    control="inputselect"
                    inputStyle="!py-2"
                    labelStyle="font-normal"
                    options={unitMaterialCosts}
                    label="Unit material cost"
                    name="unitMaterialCost"
                    placeholder="Enter Material Cost"
                  />
                  <FormControl
                    control="inputselect"
                    inputStyle="!py-2"
                    labelStyle="font-normal"
                    label="Unit equipment cost"
                    name="unitEquipments"
                    options={unitEquipmentCost}
                    placeholder="Enter Equipment Cost"
                  />
                  <CustomWhiteButton
                    type="submit"
                    text={SingleEstimateData ? 'Update Item' : 'Add item'}
                    className="self-end md:w-auto w-full md:my-0 mt-4 !bg-goldenrodYellow !p-2.5 !text-white"
                  />
                </div>
                {SingleEstimateData && (
                  <div className="flex justify-end my-3">
                    <CustomButton
                      className="!w-40"
                      type="button"
                      text="Cancel"
                      onClick={() => setSingleEstimateData(null)}
                      iconwidth={20}
                      iconheight={20}
                    />
                  </div>
                )}
                {Object.entries(estimatesData).map(
                  ([key, value]: any[], i) =>
                    value?.length > 0 && (
                      <div key={i} className={`${bg_style} p-5 mt-3`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <QuaternaryHeading
                              title={key}
                              className="font-semibold"
                            />
                          </div>
                        </div>
                        <div className="estimateTable_container">
                          {value?.length > 0 && (
                            <Table
                              className="mt-2"
                              loading={false}
                              columns={columns}
                              dataSource={value as DataType[]}
                              pagination={false}
                            />
                          )}
                        </div>
                        <div className="flex justify-end mt-5">
                          <CustomButton
                            text="+ Add Div"
                            className="!w-32"
                            onClick={() => {
                              confirmEstimateHandler(value), resetForm();
                            }}
                          />
                        </div>
                      </div>
                    )
                )}
              </Form>
              <div>
                {confirmEstimates.map((estimate: any) => {
                  return (
                    <>
                      <div>
                        {Object.entries(estimate).map(
                          ([key, value]: any[], i) =>
                            value?.length > 0 && (
                              <div key={i} className={`${bg_style} p-5 mt-3`}>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <QuaternaryHeading
                                      title={key}
                                      className="font-semibold"
                                    />
                                  </div>
                                  <div className="flex justify-end mt-5">
                                    <CustomButton
                                      text="Add Item"
                                      className="!text-graphiteGray !bg-snowWhite !shadow-scenarySubdued border-2 border-solid !border-celestialGray "
                                      onClick={() => {
                                        revertConfirmTableHandler(estimate),
                                          resetForm();
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="estimateTable_container">
                                  {value?.length > 0 && (
                                    <EstimatesTable estimates={value} />
                                  )}
                                </div>
                              </div>
                            )
                        )}
                      </div>
                    </>
                  );
                })}
              </div>
            </>
          );
        }}
      </Formik>

      <ModalComponent open={viewPlansModel} setOpen={setViewPlansModel}>
        <div className="bg-white">
          {estimateDetail?.drawingsDocuments?.length &&
          estimateDetail?.drawingsDocuments[0]?.ext === 'image/png' ? (
            <img
              className="object-cover h-auto w-full"
              src={estimateDetail?.drawingsDocuments[0].url}
              alt="url"
            />
          ) : estimateDetail?.drawingsDocuments?.length &&
            estimateDetail?.drawingsDocuments[0]?.ext === 'application/pdf' ? (
            'ok'
          ) : (
            'ds'
          )}
        </div>
      </ModalComponent>
    </div>
  );
};

export default Scope;
