'use client';
import { Skeleton } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

import SwitchBtn from './switchbtn';
import SinglePlan from './plan/plan';
import ToggleBtn from './toggleBtn/index';
import { AppDispatch, RootState } from '@/redux/store';
import { HttpService } from '@/app/services/base.service';
import { selectToken } from '@/redux/authSlices/auth.selector';
import { IPricingPlan } from '@/app/interfaces/pricing-plan.interface';
import { fetchPricingPlan } from '@/redux/pricingPlanSlice/pricingPlan.thunk';
import {
  selectPricingPlans,
  selectPricingPlansError,
  selectPricingPlansLoading,
} from '@/redux/pricingPlanSlice/pricingPlan.selector';
import { IUser } from '@/app/interfaces/companyEmployeeInterfaces/user.interface';

const PaymentPlans = () => {
  const dispatch = useDispatch<AppDispatch>();

  const token = useSelector(selectToken);

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);
  const plansData = useSelector(selectPricingPlans);
  const isLoading = useSelector(selectPricingPlansLoading);
  const isError = useSelector(selectPricingPlansError);

  const [planType, setPlanType] = useState(false);
  const [pricingPlansData, setPricingPlansData] = useState(
    [] as IPricingPlan[]
  );
  const [isDuration, setIsDuration] = useState('monthly');
  const user = useSelector((state: RootState) => state.auth.user as { user?: IUser });

  useEffect(() => {
    pricingPlansHandler();
  }, []);

  const handlePlanType = (event: ChangeEvent<HTMLInputElement>) => {
    const currentPlanType = event.target.checked ? 'Enterprise' : 'Individual';
    const newPlansData = plansData.pricingPlans.filter(
      ({ type }: IPricingPlan) => type === currentPlanType
    );

    setPlanType(event.target.checked);
    setPricingPlansData(newPlansData);
  };

  const pricingPlansHandler = useCallback(async () => {
    const {
      payload: {
        statusCode,
        data: { pricingPlans },
      },
    }: any = await dispatch(fetchPricingPlan({ page: 1, limit: 10 }));
    if (statusCode === 200) {
      setPricingPlansData(
        pricingPlans.filter(
          ({ type, duration }: IPricingPlan) =>
            type === 'Individual' && duration === isDuration
        )
      );
    }
  }, []);

  return (
    <>
      <div className="w-full h-px bg-mistyWhite mt-4 mb-6"></div>
      <div className="flex w-full align-items-center justify-center">
        <ToggleBtn isChecked={planType} onChange={handlePlanType} />
      </div>
      <div className="flex w-full align-items-center justify-center my-6">
        <SwitchBtn
          isChecked={isDuration}
          onChange={(event) =>
            setIsDuration(event.target.checked ? 'yearly' : 'monthly')
          }
        />
      </div>
      {isLoading ? (
        <Skeleton />
      ) : isError ? (
        <p>Something Went Wrong</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-5">
          {pricingPlansData
            .filter((plan) => plan.duration === isDuration)
            ?.map((plan: IPricingPlan, index: React.Key | null | undefined) => {
              return <SinglePlan key={index} {...plan} user={user.user} />;
            })}
        </div>
      )}
    </>
  );
};

export default PaymentPlans;
