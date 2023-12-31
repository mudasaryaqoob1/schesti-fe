'use client';
import { ChangeEvent, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import ToggleBtn from './components/toggleBtn';
import React from 'react';
import SinglePlan from './components/plan/plan';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '@/redux/authSlices/auth.selector';
import { HttpService } from '@/app/services/base.service';
import { selectPricingPlans, selectPricingPlansError, selectPricingPlansLoading } from '@/redux/pricingPlanSlice/pricingPlan.selector';
import { Skeleton } from 'antd';
import { AppDispatch } from '@/redux/store';
import { IPricingPlan } from '@/app/interfaces/pricing-plan.interface';
import { fetchPricingPlan } from '@/redux/pricingPlanSlice/pricingPlan.thunk';
import SwitchBtn from './components/switchbtn';

const Plans = () => {
  const [planType, setPlanType] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [pricingPlansData, setPricingPlansData] = useState([] as IPricingPlan[]);
  const [isYearly, setIsYearly] = useState(false);

  const token = useSelector(selectToken);

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);
  const plansData = useSelector(selectPricingPlans);
  const isLoading = useSelector(selectPricingPlansLoading);
  const isError = useSelector(selectPricingPlansError);

  const handlePlanType = (event: ChangeEvent<HTMLInputElement>) => {
    const currentPlanType = event.target.checked ? 'Enterprise' : 'Individual';
    const newPlansData = plansData.pricingPlans.filter(({ planType }: IPricingPlan) => planType === currentPlanType);
    setPlanType(event.target.checked);
    setPricingPlansData(newPlansData);
  };

  const pricingPlansHandler = useCallback(async () => {
    const { payload: { statusCode, data: { pricingPlans } } }: any = await dispatch(fetchPricingPlan({ page: 1, limit: 10 }));
    if (statusCode === 200) {
      setPricingPlansData(pricingPlans.filter(({ planType }: IPricingPlan) => planType === 'Individual'));
    }
  }, [dispatch]);

  useEffect(() => {
    pricingPlansHandler();
  }, [pricingPlansHandler]);

  return (
    <>
      <div className="flex justify-between">
        <ToggleBtn isChecked={planType} onChange={handlePlanType} />
        <SwitchBtn isChecked={isYearly} onChange={(event) => setIsYearly(event.target.checked)} />
      </div>
      <div className="mt-6">
        {
          isLoading ? <Skeleton /> : isError ? <p>Something Went Wrong</p> :
            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-5">
              {pricingPlansData?.map(
                (plan: IPricingPlan, index: React.Key | null | undefined) => {
                  return <SinglePlan key={index} {...plan} isYearly={isYearly} />;
                }
              )}
            </div>
        }
      </div>
    </>
  );
};

export default Plans;
