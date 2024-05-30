'use client';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Switch } from 'antd';

// module imports
import { minHeading, secondaryHeading } from '@/globals/tailwindvariables';
import Progessbar from '@/app/component/progressBar';
import NavBar from '@/app/(pages)/(auth)/authNavbar';
// import PaypalInteration from './paypalIntegration';
import { authService } from '@/app/services/auth.service';
import { toast } from 'react-toastify';
import TertiaryHeading from '@/app/component/headings/tertiary';
import SecondaryHeading from '@/app/component/headings/Secondary';
import { IPricingPlan } from '@/app/interfaces/pricing-plan.interface';
import { selectToken } from '@/redux/authSlices/auth.selector';
import { useSelector } from 'react-redux';
import { HttpService } from '@/app/services/base.service';
import { useRouterHook } from '@/app/hooks/useRouterHook';
import PaypalIntegration from './paypalIntegration';

const Payment = () => {
  const router = useRouterHook();

  const token = useSelector(selectToken);

  console.log(token, 'tokentokentoken');

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  const [selectedPLan, setSelectedPLan] = useState<IPricingPlan>();
  const [autoRenew, setAutoRenew] = useState(true);

  useEffect(() => {
    let pricingPlan: any = localStorage.getItem('pricingPlan');
    if (!pricingPlan) {
      router.push('/plans');
    }
    setSelectedPLan(JSON.parse(pricingPlan));
  }, []);

  const stripePaymentHandler = async () => {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
    if (!stripe) {
      return;
    }
    const response: any = await authService.httpStripeCheckout({
      planID: selectedPLan?._id,
      autoRenew: autoRenew,
    });
    const result = await stripe.redirectToCheckout({
      sessionId: response.data.id,
    });
    console.log({ stripeResult: result });
    if (result.error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      <NavBar />
      <section className=" px-16 p-9">
        <div className="">
          <h2 className={secondaryHeading}>Payment Summary</h2>
          <div className="w-full h-0.5 bg-mistyWhite mt-4 mb-10"></div>
          <div className="flex gap-10">
            <div className="flex bg-white rounded-lg flex-col gap-5 shadow-md rounded-s max-w-lg w-full p-6">
              <div>
                <TertiaryHeading title="Subscribe to" />
                <SecondaryHeading
                  title={selectedPLan?.planName!}
                  className="!text-[#101828]"
                />
              </div>
              <div className="flex items-center">
                <span className="tracking-[-0.72px] font-semibold text-[40px] leading-[52px] !text-goldenrodYellow">
                  ${selectedPLan?.price}
                </span>
                <p
                  className={`${minHeading} !text-[18px] !text-[#98A2B3]  font-normal`}
                >
                  /{selectedPLan?.duration}
                </p>
              </div>
              <div className="flex flex-col">
                <label className="text-4 text-[#6A6A6A] mb-2">Promo Code</label>
                <input
                  className="border border-doveGray px-3 py-4 rounded-md"
                  type="text"
                  placeholder="Enter Promo Code"
                />
              </div>
              <div className="">
                <div className="flex align-center justify-between border-b-[1px] py-4">
                  <p className="text-[#667085] text-[18px]">Plan Price</p>
                  <h6 className="text-[#1D2939] text-[18px]">
                    ${selectedPLan?.price}
                  </h6>
                </div>
                <div className="flex align-center justify-between border-b-[1px] py-4">
                  <p className="text-[#667085] text-[18px]">Discount</p>
                  <h6 className="text-[#1D2939] text-[18px]">00.00</h6>
                </div>
                <div className="flex align-center justify-between border-b-[1px] py-4">
                  <p className="text-[#667085] text-[18px]">Total</p>
                  <h6 className="text-[#1D2939] text-[18px]">
                    ${selectedPLan?.price}
                  </h6>
                </div>
                {/* <h5 className="text-[#1D2939] text-[18px] mt-4">$40.00</h5> */}
              </div>
            </div>
            <div className="w-full">
              <div className="flex align-center justify-between">
                <SecondaryHeading
                  title="Select Payment Method"
                  className="!text-[#344054]"
                />
                <div className="flex align-center gap-3">
                  <p className="text-[#667085] text-[16px]">
                    Enable auto-payment to renew subscription
                  </p>

                  <Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    defaultChecked
                    onChange={(checked) => setAutoRenew(checked)}
                  />
                </div>
              </div>
              <div className="flex flex-col ">
                <div
                  className="h-52 grid place-items-center w-full shadow-md  my-6 gap-10  bg-white rounded-lg cursor-pointer"
                  onClick={stripePaymentHandler}
                >
                  <Image
                    src={'/stripe.svg'}
                    alt={'stripe icon'}
                    width={190}
                    height={80}
                  />
                </div>
                <div className="h-52 grid place-items-center bg-white w-full shadow-md   rounded-s">
                  {selectedPLan ? (
                    <PaypalIntegration selectedPlan={selectedPLan} />
                  ) : null}

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
