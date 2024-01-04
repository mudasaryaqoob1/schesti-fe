import React, { useCallback, useEffect, useLayoutEffect } from 'react';
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
import { companySetupSubCategoriesData, companySetupSubcategoriesLoading } from '@/redux/company/companySelector';
import { setSubcategoryData } from '@/redux/company/settingSlices/companySetup/subcategory.slice';
import { companySetupService } from '@/app/services/setting/companySetup';

interface DataType {
    _id: string;
    category: string;
    subCategory: string;
    price: number;
    actions: null,
    children?: DataType[];
}

const SubCategoryTable: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const subcategoriesReduxData = useSelector(companySetupSubCategoriesData);
    const subcategoriesReduxDataLoading = useSelector(companySetupSubcategoriesLoading);

    const { refetch } = useSelector((state: any) => state.companySetupSubcategory);

    const token = useSelector(selectToken);


    const fetchSubcategoriesHandler = useCallback(async () => {
        await dispatch(fetchSubCategories({ page: 1, limit: 10 }));
    }, []);

    useEffect(() => {
        fetchSubcategoriesHandler();
    }, [refetch]);

    useLayoutEffect(() => {
        if (token) {
            HttpService.setToken(token);
        }
    }, [token]);

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
        },
        {
            title: 'Action',
            dataIndex: 'action',
            align: 'center',
            className: 'd-none',
            key: 'action',
            render: (_, subCategoriesData: any) => {
                console.log({ subCategoriesData }, 'in sub')
                return (
                    <div className="flex gap-2 justify-center">
                        <Image
                            src="/edit.svg"
                            className="cursor-pointer"
                            width={20}
                            height={20}
                            alt="edit"
                            onClick={() => {
                                dispatch(setSubcategoryData(subCategoriesData))
                            }}
                        />
                        <Image
                            src="/trash.svg"
                            className="cursor-pointer"
                            width={20}
                            height={20}
                            alt="delete"
                            onClick={
                                async () => {
                                    const { statusCode } = await companySetupService.httpDeleteSubcategory(subCategoriesData._id!);
                                    if (statusCode === 200) {
                                        fetchSubcategoriesHandler()
                                    }
                                }
                            }
                        />
                    </div>
                )
            }
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
                dataSource={subcategoriesReduxData ? subcategoriesReduxData?.map(({ _id, name, subcategories }: any) => ({
                    _id,
                    category: name,
                    subCategory: '',
                    children: subcategories?.map(({ _id, price, name, categoryId, categoryName }: any) => ({
                        _id,
                        price,
                        subCategory: name,
                        categoryId, categoryName
                    }))
                })) : []}
            />
        </div>
    );
};

export default SubCategoryTable;