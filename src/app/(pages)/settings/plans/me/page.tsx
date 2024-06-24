'use client';
// import Button from '@/app/component/customButton/button';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { IStripeBaseSubscription } from '@/app/interfaces/stripe.interface';
import { userService } from '@/app/services/user.service';
// import { IPricingPlan } from '@/app/interfaces/pricing-plan.interface';
import {
  tertiaryHeading,
  quinaryHeading,
  minHeading,
} from '@/globals/tailwindvariables';
import moment from 'moment';
import Image from 'next/image';
// import { useRouter } from 'next/navigation';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

// interface Props extends IPricingPlan {
//   isYearly: boolean;
// }

const MySubscription = () => {
  const [userData, setUserData] = useState<any>({});
  const [subscription, setSubscription] =
    useState<IStripeBaseSubscription | null>(null);
  const getUserDetail = useCallback(async () => {
    let { data } = await userService.httpGetCompanyDetail();
    setUserData(data.user.planId);
    setSubscription(data.subscription);
  }, []);

  useEffect(() => {
    getUserDetail();
  }, []);

  let features = 'CRM,Takeoff Module,Construction Estimate Module';

  const remainingDays = subscription
    ? moment.unix(subscription.current_period_end).diff(moment(), 'days')
    : null;
  return (
    <>
      <TertiaryHeading title="My Subscriptions" className="text-graphiteGray" />
      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-5 mt-3">
        <div className="p-8 rounded-[20px] items-center flex flex-col justify-between shadow-secondaryShadow gap-5">
          <div className=" flex flex-col gap-8 items-start w-full">
            <h2 className={`${tertiaryHeading} text-graphiteGray`}>
              {userData?.planName}
            </h2>
            <div className="flex items-center w-full">
              <span className="tracking-[-0.72px] font-semibold text-[42px] leading-[46px] !text-goldenrodYellow">
                ${userData?.price}
              </span>
              <p className={`${minHeading} text-lightdark  font-normal`}>
                /{userData?.duration}
              </p>
            </div>
            <p className={`${quinaryHeading} text-lightdark2`}>
              {userData?.planDescription}
            </p>
            <div className="relative w-full">
              <div className="h-3 w-1/2 absolute rounded-lg z-10 bg-goldenrodYellow" />
              <div className="h-3 w-full absolute rounded-lg bg-slate-200" />
            </div>
            <div className="flex justify-end w-full">
              {remainingDays ? (
                <p className="font-semibold text-[14px]  text-[#EC2224]">{`Expires in ${remainingDays} day${
                  remainingDays !== 1 ? 's' : ''
                }`}</p>
              ) : null}
            </div>

            {/* <p className="text-end text-vividRed font-semibold w-full">
              Expires in 14 days left
            </p> */}
            <div className="w-full h-px bg-mistyWhite"></div>
            <h4 className={`${tertiaryHeading} font-normal text-ebonyGray`}>
              Features
            </h4>
            <div className="flex gap-2 flex-col">
              {features?.split(',').map((benefit: any, index: any) => (
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
          {/* <div className="w-full">
            <Button
              text="Buy"
              className="text-white self-stretch w-full"
              onClick={() => router.push('/payment')}
            />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default MySubscription;
