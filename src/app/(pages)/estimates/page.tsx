'use client';
import React from 'react';
import CustomButton from '@/app/component/customButton/button';
import Link from 'next/link';
import Records from './requests/records';
import CustomNavbar from '@/app/component/customNavbar';
import { bg_style } from '@/globals/tailwindvariables';

const Page = () => {
  return (
    <CustomNavbar>
      <section className="mt-6 mb-[39px] md:ms-[69px] md:me-[59px] mx-4 rounded-xl ">
        <Link href="/estimates/requests" className="flex justify-end me-3 my-2">
          <CustomButton text="+ Start New Estimate " className="!w-auto" />
        </Link>
        <div
          className={`${bg_style} p-5 border border-solid border-silverGray`}
        >
          <Records />
        </div>
      </section>
    </CustomNavbar>
  );
};

export default Page;
