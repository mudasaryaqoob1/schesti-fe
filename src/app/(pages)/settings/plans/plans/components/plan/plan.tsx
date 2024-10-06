'use client';
import { usePricing } from '@/app/(pages)/(auth)/usePricing';
import Button from '@/app/component/customButton/button';
import { useRouterHook } from '@/app/hooks/useRouterHook';
import { useUser } from '@/app/hooks/useUser';
import { IUser } from '@/app/interfaces/companyEmployeeInterfaces/user.interface';
import { IPricingPlan } from '@/app/interfaces/pricing-plan.interface';
import { authService } from '@/app/services/auth.service';
import { getPlanFeatureKeyByValue } from '@/app/utils/plans.utils';
import {
  tertiaryHeading,
  quinaryHeading,
  minHeading,
} from '@/globals/tailwindvariables';
import { getLoggedInUserDetails } from '@/redux/authSlices/auth.thunk';
import { AppDispatch } from '@/redux/store';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { Fragment, useState } from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';

interface Props extends IPricingPlan {
  setSelectedPlan: any;
  user?: IUser;
}
const SinglePlan = (props: Props) => {
  const {
    planName,
    price,
    planDescription,
    features,
    duration,
    setSelectedPlan,
    _id,
    isInternal,
  } = props;
  const dispatch = useDispatch<AppDispatch>();

  const user = useUser();
  const pricingHook = usePricing();
  const router = useRouterHook();
  const [isLoading, setIsLoading] = useState(false);

  const stripeUpgradeMutation = useMutation(
    ['upgradePlan'],
    async (data: IPricingPlan) => {
      return authService.httpUpgradeStripeMutation({ planId: data._id });
    },
    {
      onSuccess() {
        toast.success('Plan upgraded successfully');
        dispatch(getLoggedInUserDetails({}));
      },
      onError(error) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data?.message || err.message);
      },
    }
  );

  async function upgradeToFreePlan(planId: string) {
    if (isInternal) {
      setIsLoading(true);
      try {
        const response = await authService.httpSubscribeToFreePlan(planId);
        if (response.data) {
          toast.success('Plan subscribed successfully');
          dispatch(getLoggedInUserDetails({}));
        }
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data?.message || err.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error('Cannot upgrade from free plan.');
    }
  }

  const userPlanId =
    (user?.subscription &&
      user.subscription.planId &&
      (user.subscription.planId as IPricingPlan)._id) ||
    '';
  const BTN =
    user && user.subscription ? (
      <Button
        text={userPlanId === _id ? 'Subscribed' : 'Upgrade'}
        className={`text-white disabled:cursor-not-allowed ${userPlanId === _id ? '!bg-schestiLightPrimary !text-schestiPrimaryBlack !border-schestiLightPrimary' : ''} self-stretch w-full`}
        disabled={userPlanId === _id}
        onClick={() => {
          if (_id && userPlanId !== _id) {
            if (!user.subscription!.subscriptionId && !isInternal) {
              pricingHook.setValueToStorage(props);
              router.push('/payment');
            } else if (isInternal) {
              upgradeToFreePlan(_id);
            } else {
              stripeUpgradeMutation.mutate(props);
            }
          } else {
            toast.success('You are already on this plan');
          }
        }}
        isLoading={stripeUpgradeMutation.isLoading || isLoading}
      />
    ) : (
      <Button
        text={'Buy'}
        className="text-white self-stretch w-full"
        onClick={() => {
          setSelectedPlan({ planName, price, duration });
          pricingHook.setValueToStorage(props);
          router.push('/payment');
        }}
      />
    );

  return (
    <div
      className={`p-8 rounded-[20px] items-center flex flex-col justify-between bg-white shadow-secondaryShadow gap-5`}
    >
      <div className=" flex flex-col gap-8 items-start w-full">
        <h2 className={`${tertiaryHeading} text-graphiteGray`}>{planName}</h2>
        <div className="flex items-center w-full">
          <span
            className="
            tracking-[-0.72px] font-semibold
            text-[42px] leading-[46px] !text-goldenrodYellow"
          >
            ${price}
          </span>
          <p className={`${minHeading} text-lightdark  font-normal`}>
            /{duration}
          </p>
        </div>
        <p className={`${quinaryHeading} text-lightdark2`}>{planDescription}</p>
        <div className="w-full h-px bg-mistyWhite"></div>
        <h4 className={`${tertiaryHeading} font-normal text-ebonyGray`}>
          Features
        </h4>
        <div className="flex gap-2 flex-col">
          {features.split(',')?.map((benefit, index) => (
            <Fragment key={index}>
              <div className="self-start flex gap-2 items-center">
                <Image
                  src={'/tickcyan.svg'}
                  width={20}
                  height={20}
                  className="rounded-md"
                  alt="tick icon"
                />
                <label
                  htmlFor={benefit}
                  className={twMerge(
                    `${quinaryHeading} text-ebonyGray leading-normal`
                  )}
                >
                  {getPlanFeatureKeyByValue(benefit)}
                </label>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
      <div className="w-full">{BTN}</div>
    </div>
  );
};

export default SinglePlan;
