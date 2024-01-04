import React, { useLayoutEffect } from 'react'

import { useSelector } from 'react-redux';
import { selectToken } from '@/redux/authSlices/auth.selector';
import TertiaryHeading from '@/app/component/headings/tertiary';
import CustomButton from '@/app/component/customButton/button';
import SubCategoryTable from './SubCategoryTable';
import { HttpService } from '@/app/services/base.service';
import { bg_style } from '@/globals/tailwindvariables'
import { useRouter } from 'next/navigation';

export interface DataType {
    categoryId: string;
    companyName: string;
    _id: string;
    action: string;
}

const SubCategories = () => {

    const router = useRouter();
    const token = useSelector(selectToken);

    useLayoutEffect(() => {
        if (token) {
            HttpService.setToken(token);
        }
    }, [token]);

    return (
        <>
            <div className="flex items-center justify-between">
                <TertiaryHeading title="Sub-category" className="text-graphiteGray" />
                <CustomButton
                    text="Add Sub-category"
                    className="!w-auto "
                    iconwidth={20}
                    iconheight={20}
                    onClick={() => router.push('/settings/CategorySetup/addSubcategory')}
                />
            </div>
            <div
                className={`${bg_style} border border-solid border-silverGray mt-4`}
            >
                <SubCategoryTable />
            </div>
        </>
    )
}

export default SubCategories