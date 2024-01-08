import TertiaryHeading from '@/app/component/headings/tertiary';
import { bg_style } from '@/globals/tailwindvariables';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useCallback, useEffect, useLayoutEffect } from 'react';
import { AppDispatch } from '@/redux/store';
import {
  deleteCategory,
  fetchCategories,
} from '@/redux/company/settingSlices/companySetup.thunk';
import { HttpService } from '@/app/services/base.service';
import { selectToken } from '@/redux/authSlices/auth.selector';
import {
  companySetupCategoriesData,
  companySetupCategoriesLoading,
} from '@/redux/company/companySelector';
import { setCategoryData } from '@/redux/company/settingSlices/companySetup/category.slice';

export interface DataType {
  categoryId: string;
  companyName: string;
  _id: string;
  action: string;
}

const CategoryTable = () => {
  const token = useSelector(selectToken);
  const dispatch = useDispatch<AppDispatch>();

  const selectCompanySetupData = useSelector(companySetupCategoriesData);
  const companySetupLoading = useSelector(companySetupCategoriesLoading);

  const fetchCategoriesHandler = useCallback(async () => {
    await dispatch(fetchCategories({ page: 1, limit: 10 }));
  }, [dispatch]);

  useEffect(() => {
    fetchCategoriesHandler();
  }, []);

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  const columns: ColumnsType<DataType> = [
    {
      title: 'Category  ID',
      dataIndex: 'categoryId',
    },
    {
      title: 'Category  Name',
      dataIndex: 'name',
    },

    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      key: 'action',
      render: (_, categoryData: DataType) => (
        <div className="flex gap-2 justify-center">
          <Image
            src="/edit.svg"
            className="cursor-pointer"
            width={20}
            height={20}
            alt="edit"
            onClick={() => {
              dispatch(setCategoryData(categoryData));
              console.log({ categoryData }, 'category data in edit');
            }}
          />
          <Image
            src="/trash.svg"
            className="cursor-pointer"
            width={20}
            height={20}
            alt="delete"
            onClick={() => {
              console.log(categoryData, 'category data in edit delete');
              dispatch(deleteCategory(categoryData._id!));
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div
      className={`${bg_style} border border-solid border-silverGray mt-4 p-5`}
    >
      <TertiaryHeading title="Added Categories" className="text-graphiteGray" />
      <Table
        loading={companySetupLoading}
        columns={columns}
        className="mt-4"
        dataSource={selectCompanySetupData}
        pagination={{ position: ['bottomCenter'] }}
      />
    </div>
  );
};

export default CategoryTable;
