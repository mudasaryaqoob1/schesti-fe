'use client'
import { useState } from 'react';
import ToggleBtn from '@/app/component/customToggleBtn/index'
import SwitchBtn from '@/app/component/customswitchbtn/index'
import React from 'react'
import SinglePlan from './plan/plan';
import { EnterpriseplansMonthly, Enterpriseplansyearly, IndividualplansMonthly, Individualplansyearly } from './data';
interface PlanInfo {
    title: string;
    price: number | string;
    info: string
    benefits: string[];
}
[];
const PaymentPlans = () => {
    const [isEnterprise, setIsEnterprise] = useState(false);
    const [isYearly, setIsYearly] = useState(false);
    const handleToggleChange = (checked: boolean) => {
        setIsEnterprise(checked);
    };

    const handleSwitchChange = (checked: boolean) => {
        setIsYearly(checked);
    };

    const selectedPlans = isEnterprise ? (isYearly ? Enterpriseplansyearly : EnterpriseplansMonthly) : (isYearly ? Individualplansyearly : IndividualplansMonthly)
    return (
        <>
            <div className="w-full h-px bg-mistyWhite mt-4 mb-6"></div>
            <div className='flex w-full align-items-center justify-center '>
                <ToggleBtn onChange={handleToggleChange} />
            </div>
            <div className='flex w-full align-items-center justify-center my-6'>
                <SwitchBtn onChange={handleSwitchChange} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-5">
                {selectedPlans?.map((plan: PlanInfo, index: React.Key | null | undefined) => {
                    return <SinglePlan key={index} {...plan} />;
                })}
            </div>
        </>
    )
}

export default PaymentPlans