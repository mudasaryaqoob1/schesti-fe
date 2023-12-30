'use client';
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';

// module imports
import { minHeading, secondaryHeading } from '@/globals/tailwindvariables';
import Progessbar from '@/app/component/progressBar';
import NavBar from '@/app/(pages)/(auth)/authNavbar';
import PaypalInteration from './paypalIntegration';
import { authService } from '@/app/services/auth.service';
import { IPaymentProps } from '@/app/interfaces/authInterfaces/payment.interface';
import { toast } from 'react-toastify';
import TertiaryHeading from '@/app/component/headings/tertiary';
import SecondaryHeading from '@/app/component/headings/Secondary';

const Payment = () => {
  const [product] = useState<IPaymentProps>({
    packageName: 'Go FullStack with KnowledgeHut',
    packagePrice: 1000,
  });

  const stripePaymentHandler = async () => {
    const stripe: any = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!
    );
    const response: any = await authService.httpStripeCheckout(product);
    const result = stripe.redirectToCheckout({
      sessionId: response.data.id,
    });

    if (result.error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      <NavBar />
      <section className="px-16 p-9">
        <div className="">
          <h2 className={secondaryHeading}>Payments Summary</h2>
          <div className="w-full h-0.5 bg-mistyWhite mt-4 mb-10"></div>
          <div className="flex gap-10">
            <div className="flex flex-col gap-5 shadow-md rounded-s max-w-lg w-full p-6">
             <div>
             <TertiaryHeading title="Subscribe to" />
              <SecondaryHeading title="Enterprise – Small Firm to 5 Employees" className='!text-[#101828]' />
             </div>
              <div className="flex items-center">
                <span className="tracking-[-0.72px] font-semibold text-[40px] leading-[52px] !text-goldenrodYellow">
                  $20
                </span>
                <p className={`${minHeading} !text-[18px] !text-[#98A2B3]  font-normal`}>
                  /month
                </p>
              </div>
              <div className='flex flex-col' >
                <label className='text-4 text-[#6A6A6A] mb-2' >Promo Code</label>
                <input className='border border-doveGray px-3 py-4 rounded-md'  type='text' placeholder='Enter Promo Code' />
              </div>
              <div className='' >
                <div className='flex align-center justify-between border-b-[1px] py-4' >
                  <p className='text-[#667085] text-[18px]' >Payment method</p>
                  <h6 className='text-[#1D2939] text-[18px]' >$40.00</h6>
                </div>
                <div className='flex align-center justify-between border-b-[1px] py-4' >
                  <p className='text-[#667085] text-[18px]' >Discount</p>
                  <h6 className='text-[#1D2939] text-[18px]' >00.00</h6>
                </div>
                <div className='flex align-center justify-between border-b-[1px] py-4' >
                  <p className='text-[#667085] text-[18px]' >Payment method</p>
                  <h6 className='text-[#1D2939] text-[18px]' >$40.00</h6>
                </div>
                <h5 className='text-[#1D2939] text-[18px] mt-4' >$40.00</h5>
              </div>
            </div>
            <div className='w-full' >
            <SecondaryHeading title="Select Payment Method" className='!text-[#344054]' />
              <div className="flex flex-col">
                <div
                  className="h-52 grid place-items-center w-full shadow-md  my-6 gap-10  rounded-s cursor-pointer"
                  onClick={stripePaymentHandler}
                >
                  <Image
                    src={'/stripe.svg'}
                    alt={'stripe icon'}
                    width={190}
                    height={80}
                  />
                </div>
                <div className="h-52 grid place-items-center w-full shadow-md   rounded-s">
                  <PaypalInteration />

                  {/* <Image
                src={'/paypal.svg'}
                alt={'paypal icon'}
                width={190}
                height={80}
              /> */}
                </div>
              </div>
            </div>
          </div>

          <Progessbar progress={'75%'} step={3} className="mt-12" />
        </div>
      </section>
    </>
  );
};

export default Payment;
