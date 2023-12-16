'use client';
import NavBar from '@/app/(pages)/(auth)/authNavbar';
import Progessbar from '@/app/component/progressBar';
import { secondaryHeading } from '@/globals/tailwindvariables';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const Payment = () => {
  const router = useRouter();
  return (
    <>
      <NavBar />
      <section className="grid place-items-center mt-10">
        <div className="min-w-[750px]">
          <h2 className={secondaryHeading}>Payments Method</h2>
          <div className="w-full h-1 bg-mistyWhite my-2"></div>
          {/* methods */}
          <div className="flex justify-between items-center">
            <div
              className="h-52
         grid place-items-center
          w-80 border-2 
          my-6 gap-10
          border-doveGray rounded-s
          cursor-pointer
          "
              onClick={() => router.push('/congratulation')}
            >
              <Image
                src={'/stripe.svg'}
                alt={'stripe icon'}
                width={190}
                height={80}
              />
            </div>
            <div
              className="h-52
         grid place-items-center
          w-80 border-2 
          border-doveGray rounded-s"
            >
              <Image
                src={'/paypal.svg'}
                alt={'paypal icon'}
                width={190}
                height={80}
              />
            </div>
          </div>
          <Progessbar progress={'75%'} step={3} className="my-3" />
        </div>
      </section>
    </>
  );
};

export default Payment;
