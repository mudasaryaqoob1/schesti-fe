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
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import '../scopeStyle.css';
import { useSelector, useDispatch } from 'react-redux';

import ModalComponent from '@/app/component/modal';
import CustomWhiteButton from '@/app/component/customButton/white';
import CustomButton from '@/app/component/customButton/button';
import TertiaryHeading from '@/app/component/headings/tertiary';
import FormControl from '@/app/component/formControl';
import { categoriesService } from '@/app/services/categories.service';
import { materialService } from '@/app/services/material.service';
import { bg_style, btnStyle } from '@/globals/tailwindvariables';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import { estimateRequestService } from '@/app/services/estimateRequest.service';
import { saveEstimateDetail } from '@/redux/estimate/estimateRequest.slice';
import { selectGeneratedEstimateDetail } from '@/redux/estimate/estimateRequestSelector';

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
  index?: string;
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

  const [estimateDetail, setEstimateDetail] = useState<any>({});
  const [viewPlansModel, setViewPlansModel] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState<Object[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [estimateDescriptions, setEstimateDescriptions] = useState([]);
  const [selecteddescription, setsSelecteddescription] = useState('');
  const [editItem, setEditItem] = useState(false);
  const [editConfirmItem, setEditConfirmItem] = useState(false);
  const [confirmEstimates, setConfirmEstimates] = useState<
    {
      title: string;
      data: Object[];
    }[]
  >([]);
  const [estimateData, setEstimateData] = useState<{
    title: string;
    data: Object[];
  }>({ title: '', data: [] });
  const [SingleEstimateData, setSingleEstimateData] = useState<any>({
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
  });
  const calculateTotalCost = (record: DataType) => {
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
  };
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
    result.data.forEach((subCategory: any) => {
      subCategory.subcategories.forEach((subcategory: any) => {
        const flattenedSubcategory = {
          label: subcategory.name,
          value: subcategory._id,
          perHourLaborRate: subcategory.price,
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
                  ...material,
                  label: description,
                  value: description,
                };
              } else {
                return null;
              }
            })
            .filter((description: any) => description !== null);

          // let uniqueUnitsSet = new Set();
          // let fetchedUnits = result.data
          //   .map((material: DataType) => {
          //     const unit = material.unit;
          //     if (!uniqueUnitsSet.has(unit)) {
          //       uniqueUnitsSet.add(unit);
          //       return {
          //         label: unit,
          //         value: unit,
          //       };
          //     } else {
          //       return null;
          //     }
          //   })
          //   .filter((unit: any) => unit !== null);

          // let uniqueLabourHoursSet = new Set();

          // let fetchUnitsLabourHours = result.data
          //   .map((material: DataType) => {
          //     const unitLabourHour = material.unitLabourHour;

          //     if (!uniqueLabourHoursSet.has(unitLabourHour)) {
          //       uniqueLabourHoursSet.add(unitLabourHour);
          //       return {
          //         label: unitLabourHour,
          //         value: unitLabourHour,
          //       };
          //     } else {
          //       return null;
          //     }
          //   })
          //   .filter((unitLabourHour: any) => unitLabourHour !== null);
          // let uniquePerHourLaborRatesSet = new Set();

          // let fetchPerHourLabourRates = result.data
          //   .map((material: DataType) => {
          //     const perHourLaborRate = material.perHourLaborRate;

          //     if (!uniquePerHourLaborRatesSet.has(perHourLaborRate)) {
          //       uniquePerHourLaborRatesSet.add(perHourLaborRate);
          //       return {
          //         label: perHourLaborRate,
          //         value: perHourLaborRate,
          //       };
          //     } else {
          //       return null;
          //     }
          //   })
          //   .filter((perHourLaborRate: any) => perHourLaborRate !== null);
          // let uniqueUnitMaterialCostSet = new Set();

          // let fetchUnitMaterialCost = result.data
          //   .map((material: DataType) => {
          //     const unitMaterialCost = material.unitMaterialCost;

          //     if (!uniqueUnitMaterialCostSet.has(unitMaterialCost)) {
          //       uniqueUnitMaterialCostSet.add(unitMaterialCost);
          //       return {
          //         label: unitMaterialCost,
          //         value: unitMaterialCost,
          //       };
          //     } else {
          //       return null;
          //     }
          //   })
          //   .filter((unitMaterialCost: any) => unitMaterialCost !== null);
          // let uniqueUnitEquipmentCostSet = new Set();

          // let fetchUnitEquipmentCost = result.data
          //   .map((material: DataType) => {
          //     const unitEquipments = material.unitEquipments;

          //     if (!uniqueUnitEquipmentCostSet.has(unitEquipments)) {
          //       uniqueUnitEquipmentCostSet.add(unitEquipments);
          //       return {
          //         label: unitEquipments,
          //         value: unitEquipments,
          //       };
          //     } else {
          //       return null;
          //     }
          //   })
          //   .filter((unitEquipments: any) => unitEquipments !== null);

          setEstimateDescriptions(fetchedDescriptions);
          // setUnits(fetchedUnits);
          // setUnitLabourHours(fetchUnitsLabourHours);
          // setPerHourLabourRates(fetchPerHourLabourRates);
          // setUnitMaterialCosts(fetchUnitMaterialCost);
          // setUnitEquipmentCost(fetchUnitEquipmentCost);
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
      const subCategoryPrice: any = subCategories.find(
        (cat: any) => cat.value === selectedSubCategory
      );
      setSingleEstimateData({
        ...SingleEstimateData,
        perHourLaborRate: subCategoryPrice.perHourLaborRate,
        category: selectedCategory,
        subCategory: selectedSubCategory,
      });

      setSingleEstimateData((prev: any) => ({
        ...prev,
        perHourLaborRate: subCategoryPrice.perHourLaborRate,
      }));
    }
    setEstimateDescriptions([]);
  }, [selectedCategory, selectedSubCategory]);
  useEffect(() => {
    if (selecteddescription) {
      const findDescriptionDetail: any = estimateDescriptions.find(
        (desc: any) => desc.description === selecteddescription
      );

      setSingleEstimateData({
        ...SingleEstimateData,
        category: selectedCategory,
        subCategory: selectedSubCategory,
        description: selecteddescription,
        unit: findDescriptionDetail.unit,
        unitLabourHour: findDescriptionDetail?.unitLabourHour,
        unitMaterialCost: findDescriptionDetail?.unitMaterialCost,
        unitEquipments: findDescriptionDetail?.unitEquipments,
      });
    }
  }, [selecteddescription]);

  useEffect(() => {
    if (generateEstimateDetail?.scopeDetail?.length) {
      setConfirmEstimates(generateEstimateDetail?.scopeDetail);
    }
  }, [generateEstimateDetail]);

  const submitHandler = (
    estimateTableItemValues: InitialValuesType,
    actions: any
  ) => {
    let generateRandomNumber = Math.floor(Math.random() * 103440 + 1);
    const selctedCatoryName: any = categories.find(
      (cat: any) => cat.value === estimateTableItemValues.category
    );
    const selctedSubCategoryName: any = subCategories.find(
      (cat: any) => cat.value === estimateTableItemValues.subCategory
    );

    let selectedCategory = `${selctedCatoryName.label} ${selctedSubCategoryName.label}`;

    if (estimateData.data.length && estimateData.title !== selectedCategory) {
      toast.warn('Please add first to create new one');
    } else {
      if (editItem && !editConfirmItem) {
        const updateEstimateArray: any = estimateData.data.map(
          (dataItem: any) =>
            dataItem.index === estimateTableItemValues.index
              ? estimateTableItemValues
              : dataItem
        );

        setEstimateData({ ...estimateData, data: updateEstimateArray });
        setEditItem(false);
        actions.resetForm({ values: initialValues });
      } else if (!editItem && editConfirmItem) {
        const updateConfirmEstimateArray: any = confirmEstimates.map(
          (item: any) => {
            return {
              ...item,
              totalCostRecord: calculateTotalCost(item),
              data: item.data.map((dataItem: any) =>
                dataItem.index === estimateTableItemValues.index
                  ? estimateTableItemValues
                  : dataItem
              ),
            };
          }
        );

        setConfirmEstimates(updateConfirmEstimateArray);
        setEditConfirmItem(false);
        actions.resetForm({ values: initialValues });
      } else {
        setEstimateData((prevData) => ({
          ...prevData,
          title: selectedCategory,
          data: [
            ...prevData.data,
            { ...estimateTableItemValues, index: generateRandomNumber },
          ],
        }));
        actions.resetForm({ values: initialValues });
      }
    }
  };

  const deleteEstimateRecordHandler = (record: any) => {
    if (
      estimateData.data.some(
        (dataItem: any) => dataItem.description === record.description
      )
    ) {
      setEstimateData({
        ...estimateData,
        data: estimateData.data.filter(
          (dataItem) => JSON.stringify(dataItem) !== JSON.stringify(record)
        ),
      });
    }
  };
  const deleteConfirmEstimateRecordHandler = (record: any) => {
    const selctedCatoryName: any = categories.find(
      (cat: any) => cat.value === record.category
    );
    const selctedSubCategoryName: any = subCategories.find(
      (cat: any) => cat.value === record.subCategory
    );

    let selectedCategory = `${selctedCatoryName.label} ${selctedSubCategoryName.label}`;
    const newArray: any = confirmEstimates.map((item) => {
      if (item && item.title === selectedCategory) {
        return {
          ...item,
          data: item.data.filter(
            (dataItem: any) => dataItem.index !== record.index
          ),
        };
      } else {
        return item;
      }
    });
    setConfirmEstimates(
      newArray.filter((item: any) => item && item.data.length > 0)
    );
  };
  const editEstimateRecordHandler = (record: any) => {
    setSingleEstimateData(record);
    setEditItem(true);
  };
  const editConfirmEstimateRecordHandler = (record: any) => {
    setSingleEstimateData(record);
    setEditItem(false);
    setEditConfirmItem(true);
  };

  const columns: any = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      fixed: 'left',
      width: 300,
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      align: 'center',
      width: 100,
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
      align: 'center',
      width: 100,
    },
    {
      title: 'Wastage',
      dataIndex: 'wastage',
      align: 'center',
      width: 100,
    },
    {
      title: 'Qty with wastage',
      dataIndex: 'qtyWithWastage',
      align: 'center',
      width: 150,
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
      width: 150,
    },
    {
      title: 'Total Labor Cost',
      dataIndex: 'totalLaborCost',
      align: 'center',
      width: 150,
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
      width: 150,
    },
    {
      title: 'Total Material Cost',
      dataIndex: 'totalMaterialCost',
      align: 'center',
      width: 150,
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
      width: 150,
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
      width: 150,
      render: (text: string, record: DataType) => {
        let result = calculateTotalCost(record);
        return result;
      },
    },

    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      key: 'action',
      fixed: 'right',
      width: 100,
      render: (text: string, record: DataType) => (
        <div className="flex gap-2 justify-center">
          <Image
            src="/edit.svg"
            className="cursor-pointer"
            width={20}
            height={20}
            alt="edit"
            onClick={() => editEstimateRecordHandler(record)}
          />
          <Image
            src="/trash.svg"
            className="cursor-pointer"
            width={20}
            height={20}
            alt="delete"
            onClick={() => deleteEstimateRecordHandler(record)}
          />
        </div>
      ),
    },
  ];
  const confirmColumns: any = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      fixed: 'left',
      width: 300,
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      align: 'center',
      width: 100,
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
      align: 'center',
      width: 100,
    },
    {
      title: 'Wastage',
      dataIndex: 'wastage',
      align: 'center',
      width: 100,
    },
    {
      title: 'Qty with wastage',
      dataIndex: 'qtyWithWastage',
      align: 'center',
      width: 150,
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
      width: 150,
    },
    {
      title: 'Total Labor Cost',
      dataIndex: 'totalLaborCost',
      align: 'center',
      width: 150,
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
      width: 150,
    },
    {
      title: 'Total Material Cost',
      dataIndex: 'totalMaterialCost',
      align: 'center',
      width: 150,
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
      width: 150,
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
      width: 150,
      render: (text: string, record: DataType) => {
        let result = calculateTotalCost(record);
        return result;
      },
    },

    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      key: 'action',
      fixed: 'right',
      width: 100,
      render: (text: string, record: DataType) => (
        <div className="flex gap-2 justify-center">
          <Image
            src="/edit.svg"
            className="cursor-pointer"
            width={20}
            height={20}
            alt="edit"
            onClick={() => editConfirmEstimateRecordHandler(record)}
          />
          <Image
            src="/trash.svg"
            className="cursor-pointer"
            width={20}
            height={20}
            alt="delete"
            onClick={() => deleteConfirmEstimateRecordHandler(record)}
          />
        </div>
      ),
    },
  ];
  const confirmEstimateHandler = (dataSource: {
    title: string;
    data: Object[];
  }) => {
    setEstimateData({ title: '', data: [] });
    const index = confirmEstimates.findIndex(
      (item) => item.title === dataSource.title
    );


    dataSource.data.forEach((record: any) => {
      record.totalCostRecord = calculateTotalCost(record);
    });

    if (index !== -1) {
      let modifyArray = confirmEstimates.map((item, i) =>
        i === index
          ? { ...item, data: [...item.data, ...dataSource.data] }
          : item
      );
      setConfirmEstimates(modifyArray);
    } else {
      let modifyArray = [...confirmEstimates, dataSource];
      setConfirmEstimates(modifyArray);
    }
  };

  const nextStepHandler = () => {
    console.log(confirmEstimates, 'confirmEstimatesconfirmEstimates');

    if (!confirmEstimates.length) {
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
        {estimateDetail?.drawingsDocuments?.length && (
          <div className="grid grid-rows-1 md:grid-cols-3 gap-x-2">
            {estimateDetail?.drawingsDocuments?.length &&
            estimateDetail?.drawingsDocuments[0]?.ext === 'image/png' ? (
              <CustomButton
                text="View Plans"
                className="!text-graphiteGray !bg-snowWhite !shadow-scenarySubdued 
                      border-2 border-solid !border-celestialGray "
                onClick={() => setViewPlansModel(true)}
              />
            ) : (
              <Link
                href={
                  estimateDetail?.drawingsDocuments?.length &&
                  estimateDetail?.drawingsDocuments[0]?.url
                }
                className={`!text-graphiteGray ${btnStyle} !bg-snowWhite !border-celestialGray`}
                target="_blank"
              >
                View Plans
              </Link>
            )}

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
        )}
      </div>
      <Formik
        initialValues={SingleEstimateData ? SingleEstimateData : initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {({ handleSubmit, values }) => {
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
                      setCustomState={setsSelecteddescription}
                    />
                  </div>
                  <FormControl
                    control="input"
                    inputStyle="!py-2"
                    labelStyle="font-normal"
                    label="Unit"
                    name="unit"
                    placeholder="Write Unit"
                    mt="mt-0"
                  />
                  <FormControl
                    control="input"
                    type="number"
                    inputStyle="!py-2"
                    labelStyle="font-normal"
                    label="Quantity"
                    name="qty"
                    placeholder="Write Quantity"
                    mt="mt-0"
                  />
                </div>
                <div className="grid grid-cols-1  grid-rows-1 md:grid-cols-6 gap-x-2 grid-y-5 mt-5">
                  {/* div close */}
                  <FormControl
                    control="input"
                    type="number"
                    name="wastage"
                    inputStyle="!py-2"
                    labelStyle="font-normal"
                    label="Wastage"
                    placeholder="Enter Wastage"
                  />
                  <FormControl
                    control="input"
                    type="number"
                    name="unitLabourHour"
                    inputStyle="!py-2"
                    labelStyle="font-normal"
                    label="Unit labor hours"
                    placeholder="Write Unite Labor Hour"
                  />
                  <FormControl
                    control="input"
                    name="perHourLaborRate"
                    type="number"
                    inputStyle="!py-2"
                    labelStyle="font-normal"
                    label="Per hours labor rate"
                    placeholder="Enter Labor Rate"
                  />
                  <FormControl
                    control="input"
                    inputStyle="!py-2"
                    type="number"
                    labelStyle="font-normal"
                    label="Unit material cost"
                    name="unitMaterialCost"
                    placeholder="Write Unit Material Cost"
                  />
                  <FormControl
                    control="input"
                    type="number"
                    inputStyle="!py-2"
                    labelStyle="font-normal"
                    label="Unit equipment cost"
                    name="unitEquipments"
                    placeholder="Write Unit Equipment Cost"
                  />
                  {editItem || editConfirmItem ? (
                    <CustomWhiteButton
                      type="submit"
                      text="Update Item"
                      className="self-end md:w-auto w-full md:my-0 mt-4 !bg-goldenrodYellow !p-2.5 !text-white"
                    />
                  ) : (
                    <CustomWhiteButton
                      type="submit"
                      text="Add Item"
                      className="self-end md:w-auto w-full md:my-0 mt-4 !bg-goldenrodYellow !p-2.5 !text-white"
                    />
                  )}
                </div>
                {estimateData?.data.length ? (
                  <>
                    <div className="estimateTable_container">
                      <Table
                        className="mt-2"
                        loading={false}
                        columns={columns}
                        dataSource={estimateData.data as DataType[]}
                        pagination={false}
                        scroll={{ x: 1000 }}
                      />
                    </div>

                    <div className="flex justify-end mt-5">
                      <CustomButton
                        text="+ Add Div"
                        className="!w-32"
                        type="button"
                        disabled={estimateData.data.length === 0}
                        onClick={() => {
                          confirmEstimateHandler(estimateData);
                        }}
                      />
                    </div>
                  </>
                ) : null}
              </Form>
              <div>
                {confirmEstimates.length
                  ? confirmEstimates.map((estimate) => (
                      <div
                        key={estimate.title}
                        className={`${bg_style} p-5 mt-3`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <QuaternaryHeading
                              title={estimate.title}
                              className="font-semibold"
                            />
                          </div>
                          {/* <div className="flex justify-end mt-5">
                        <CustomButton
                          text="Add Item"
                          className="!text-graphiteGray !bg-snowWhite !shadow-scenarySubdued border-2 border-solid !border-celestialGray "
                           onClick={() => {
                             revertConfirmTableHandler(item), resetForm();
                           }}
                        />
                      </div> */}
                        </div>
                        <div className="estimateTable_container">
                          <Table
                            className="mt-2"
                            loading={false}
                            columns={confirmColumns}
                            dataSource={estimate.data as DataType[]}
                            pagination={false}
                            scroll={{ x: 1000 }}
                          />
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            </>
          );
        }}
      </Formik>

      <ModalComponent open={viewPlansModel} setOpen={setViewPlansModel}>
        <div className="bg-white">
          <img
            className="object-cover h-auto w-full"
            src={
              estimateDetail?.drawingsDocuments?.length &&
              estimateDetail?.drawingsDocuments[0].url
            }
            alt="url"
          />
        </div>
      </ModalComponent>
    </div>
  );
};

export default Scope;
