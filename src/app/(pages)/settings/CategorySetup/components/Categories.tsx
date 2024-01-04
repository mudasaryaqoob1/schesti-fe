import React from 'react'
import TertiaryHeading from '@/app/component/headings/tertiary';
import CustomButton from '@/app/component/customButton/button';
import { useRouter } from 'next/navigation';
import CategoryTable from './CategoryTable';

export interface DataType {
    categoryId: string;
    companyName: string;
    _id: string;
    action: string;
}

const Categories = () => {

    const router = useRouter();

    return (
        <>
            <div className="flex items-center justify-between">
                <TertiaryHeading title="Category" className="text-graphiteGray" />
                <CustomButton
                    text="Add Category"
                    className="!w-auto "
                    iconwidth={20}
                    iconheight={20}
                    onClick={() => router.push('/settings/CategorySetup/addCategory')}
                />
            </div>
            <CategoryTable />
        </>
    )
}

export default Categories