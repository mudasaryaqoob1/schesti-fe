'use client';
import Button from '@/app/component/customButton/button';
import { tertiaryHeading, quinaryHeading, minHeading } from '@/globals/tailwindvariables';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';
import { twMerge } from 'tailwind-merge';

interface PropSinglePlan {
  title: string;
  price: number | string;
  info: string
  benefits: string[];
}
const SinglePlan = ({ title, price, benefits, info }: PropSinglePlan) => {
  const router = useRouter();
  return (
    <div
      className={`p-8  rounded-[20px] items-center flex flex-col  justify-between shadow-secondaryShadow gap-5`}
    >
      <div className=" flex flex-col gap-8 items-start">
        <h2 className={`${tertiaryHeading} text-graphiteGray`}>
          {title}
        </h2>
        <div className='flex items-center'>
          <span
            className="
            tracking-[-0.72px] font-semibold
            text-[42px] leading-[46px] !text-goldenrodYellow"
          >
            ${price}
          </span>
          <p
            className={
              `${minHeading} text-lightdark  font-normal`}
          >
            /month
          </p>
        </div>
        <p className={`${quinaryHeading} text-lightdark2`}>{info}</p>
        <div className="w-full h-px bg-mistyWhite"></div>
        <h4 className={`${tertiaryHeading} font-normal text-ebonyGray`}>Features</h4>
        <div className='flex gap-2 flex-col'>
          {benefits?.map((benefit, index) => (
            <Fragment key={index}>
              <div className="self-start flex gap-2 items-center">
                <Image src={"/tickpurle.svg"} width={20} height={20} className='rounded-md' alt='tick icon' />
                <label htmlFor={benefit} className={twMerge(`${quinaryHeading} text-ebonyGray leading-normal`)}>
                  {benefit}
                </label>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
      <div className="w-full">
        <Button
          text="Buy"
          className="text-white self-stretch w-full"
          onClick={() => router.push('/payment')}
        />
      </div>
    </div>
  );
};

export default SinglePlan;
