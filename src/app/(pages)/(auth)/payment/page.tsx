'use client';
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';

// module imports
import { secondaryHeading } from '@/globals/tailwindvariables';
import Progessbar from '@/app/component/progressBar';
import NavBar from '@/app/(pages)/(auth)/authNavbar';
import PaypalInteration from './paypalIntegration';
import { authService } from '@/app/services/auth.service';
import { IPaymentProps } from '@/app/interfaces/authInterfaces/payment.interface';
import { toast } from 'react-toastify';

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
      <section className="grid place-items-center mt-10">
        <div className="min-w-[750px]">
          <h2 className={secondaryHeading}>Payments Method</h2>
          <div className="w-full h-1 bg-mistyWhite my-2"></div>
          <div className="flex justify-between items-center">
            <div
              className="h-52 grid place-items-center w-80 border-2  my-6 gap-10 border-doveGray rounded-s cursor-pointer"
              onClick={stripePaymentHandler}
            >
              <Image
                src={'/stripe.svg'}
                alt={'stripe icon'}
                width={190}
                height={80}
              />
            </div>
            <div className="h-52 grid place-items-center w-80 border-2  border-doveGray rounded-s">
              <PaypalInteration />

              {/* <Image
                src={'/paypal.svg'}
                alt={'paypal icon'}
                width={190}
                height={80}
              /> */}
            </div>
          </div>
          <Progessbar progress={'75%'} step={3} className="my-3" />
        </div>
      </section>
    </>
  );
};

export default Payment;
