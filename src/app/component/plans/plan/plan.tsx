'use client';
import Button from '@/app/component/customButton/button';
import { useRouterHook } from '@/app/hooks/useRouterHook';
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
import { Fragment } from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';

type Props = {
  user?: IUser;
} & IPricingPlan;

const SinglePlan = (props: Props) => {
  const router = useRouterHook();
  const dispatch = useDispatch<AppDispatch>();

  const { planName, price, planDescription, features, duration, _id } = props;

  const pricingPackageSelectionHandler = () => {
    localStorage.setItem('pricingPlan', JSON.stringify(props));
    router.push(`/payment`);
  };

  const stripeUpgradeMutation = useMutation(
    ['upgradePlan'],
    async (planId: string) => {
      return authService.httpUpgradeStripeMutation({ planId });
    },
    {
      onSuccess(data) {
        if (data.statusCode >= 400) {
          toast.error(data.message);
          return;
        }
        toast.success('Plan upgraded successfully');
        dispatch(getLoggedInUserDetails({}));
      },
      onError(error) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data?.message || err.message);
      },
    }
  );

  const BTN =
    props.user && props.user.planId ? (
      <Button
        text={props.user.planId === _id ? 'Current Plan' : 'Upgrade'}
        className="text-white self-stretch w-full"
        onClick={() => {
          if (_id && props.user?.planId !== _id) {
            stripeUpgradeMutation.mutate(_id);
          }
        }}
        isLoading={stripeUpgradeMutation.isLoading}
      />
    ) : (
      <Button
        text={'Buy'}
        className="text-white self-stretch w-full"
        onClick={pricingPackageSelectionHandler}
      />
    );

  return (
    <div
      className={`p-8 rounded-[20px] bg-white items-center flex flex-col justify-between shadow-secondaryShadow gap-5`}
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
                  src={'/tickpurle.svg'}
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
