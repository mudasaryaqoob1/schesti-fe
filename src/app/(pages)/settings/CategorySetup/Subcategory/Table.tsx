import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Image from 'next/image';
import { bg_style } from '@/globals/tailwindvariables';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '@/redux/authSlices/auth.selector';
import { AppDispatch } from '@/redux/store';
import { fetchSubCategories } from '@/redux/company/settingSlices/companySetup.thunk';
import { HttpService } from '@/app/services/base.service';
import {
  companySetupSubCategoriesData,
  companySetupSubcategoriesLoading,
} from '@/redux/company/companySelector';
import { setSubcategoryData } from '@/redux/company/settingSlices/categories/subcategory.slice';
import { categoriesService } from '@/app/services/categories.service';

interface DataType {
  _id: string;
  category: string;
  subCategory: string;
  price: number;
  actions: null;
  children?: DataType[];
}

const SubCategoryTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(selectToken);

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  const subcategoriesReduxData = useSelector(companySetupSubCategoriesData);
  const subcategoriesReduxDataLoading = useSelector(
    companySetupSubcategoriesLoading
  );
  const { refetch } = useSelector(
    (state: any) => state.companySetupSubcategory
  );

  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    if (subcategoriesReduxData?.length) {
      const subCetegoriesChanges = subcategoriesReduxData.map(
        (cat: { _id: string; name: string; subcategories: Object[] }) => {
          return {
            key: cat._id,
            category: cat.name,
            mainRow: true,
            children: cat.subcategories.map(
              ({ _id, price, name, categoryId, categoryName }: any) => {
                return {
                  _id,
                  price,
                  subCategory: name,
                  categoryId,
                  categoryName,
                };
              }
            ),
          };
        }
      );
      setSubCategories(subCetegoriesChanges);
    }
  }, [subcategoriesReduxData]);

  const fetchSubcategoriesHandler = useCallback(async () => {
    await dispatch(fetchSubCategories({ page: 1, limit: 10 }));
  }, []);

  useEffect(() => {
    fetchSubcategoriesHandler();
  }, [refetch]);
  console.log({ subCategories });
  const columns: ColumnsType<DataType> = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'name',
    },
    {
      title: 'Sub Category',
      dataIndex: 'subCategory',
      key: 'subCategory',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render(value) {
        if (value) {
          return `$${value}`;
        }
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      className: 'd-none',
      key: 'action',
      render: (_, subCategoriesData: any) => {
        if (!subCategoriesData.mainRow) {
          return (
            <div className="flex gap-2 justify-center">
              <Image
                src="/edit.svg"
                className="cursor-pointer"
                width={20}
                height={20}
                alt="edit"
                onClick={() => {
                  dispatch(setSubcategoryData(subCategoriesData));
                }}
              />
              <Image
                src="/trash.svg"
                className="cursor-pointer"
                width={20}
                height={20}
                alt="delete"
                onClick={async () => {
                  const { statusCode } =
                    await categoriesService.httpDeleteSubcategory(
                      subCategoriesData._id!
                    );
                  if (statusCode === 200) {
                    fetchSubcategoriesHandler();
                  }
                }}
              />
            </div>
          );
        }
      },
    },
  ];

  return (
    <div
      className={`${bg_style} border border-solid border-silverGray mt-4 p-5`}
    >
      <TertiaryHeading title="Sub Categories" className="text-graphiteGray" />
      <Table
        loading={subcategoriesReduxDataLoading}
        columns={columns}
        dataSource={subCategories}
        expandable={{ defaultExpandAllRows: true }}
      />
    </div>
  );
};

export default SubCategoryTable;
