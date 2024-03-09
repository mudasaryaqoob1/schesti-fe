'use client';
import Button from '@/app/component/customButton/button';
import { IUser } from '@/app/interfaces/companyEmployeeInterfaces/user.interface';
import { IPricingPlan } from '@/app/interfaces/pricing-plan.interface';
import {
  tertiaryHeading,
  quinaryHeading,
  minHeading,
} from '@/globals/tailwindvariables';
import Image from 'next/image';
import { Fragment } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends IPricingPlan {
  setSelectedPlan: any;
  user?: IUser
}
const SinglePlan = (props: Props) => {
  const {
    planName,
    price,
    planDescription,
    features,
    duration,
    setSelectedPlan,
    user,
    _id,
  } = props;

  const BTN = user && user.planId ? (
    <Button
      text={user?.planId === _id ? "Current Plan" : "Upgrade"}
      className="text-white self-stretch w-full"
      onClick={() => setSelectedPlan({ planName, price, duration })}
    />
  ) : (
    <Button
      text={"Buy"}
      className="text-white self-stretch w-full"
      onClick={() => setSelectedPlan({ planName, price, duration })}
    />
  )

  return (
    <div
      className={`p-8 rounded-[20px] items-center flex flex-col justify-between shadow-secondaryShadow gap-5`}
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
                  {benefit}
                </label>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
      <div className="w-full">
        {BTN}
      </div>
    </div>
  );
};

export default SinglePlan;
