'use client';
import React from 'react';
import Records from './components/records';
import NoData from './components/noData';
import { estimateRequests } from './data';
import CustomButton from '@/app/component/customButton/button';
import Link from 'next/link';

const Page = () => {
  return (
    <div>
      <Link
        href={'/estimates/generated/estimates'}
        className="flex justify-end  me-3 my-2"
      >
        <CustomButton text="Estimates Requests" className="!w-auto" />
      </Link>
      {estimateRequests.length > 0 ? <Records /> : <NoData />}
    </div>
  );
};

export default Page;
