'use client';
import TertiaryHeading from '@/app/component/headings/tertiary';
import PaymentPlans from '@/app/component/plans';
import Progessbar from '@/app/component/progressBar';
import AuthBar from '@/app/(pages)/(auth)/authNavbar';
import { usePricing } from '../usePricing';
import { useEffect, useState } from 'react';
import { useUser } from '@/app/hooks/useUser';
import { useRouterHook } from '@/app/hooks/useRouterHook';
import { Alert, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const Plans = () => {
  const pricingHook = usePricing();
  const [isLoading, setIsLoading] = useState(false);
  const user = useUser();
  const router = useRouterHook();

  useEffect(() => {
    setIsLoading(true);
    if (user && pricingHook.data && pricingHook.data.length > 0) {
      if (user.invitation) {
        const plan = pricingHook.data.find(
          (item) => item._id === user.invitation?.planId
        );
        if (plan) {
          pricingHook.setValueToStorage(plan);
          router.push('/payment');
        }
      }
    }
    setIsLoading(false);
  }, [user, pricingHook.data]);

  return (
    <>
      <AuthBar />
      <div className="flex flex-col mx-4 md:mx-24 justify-center flex-wrap mt-12">
        <div className='w-[500px] mx-auto'>
          {user && user.subscription && user.subscription.status !== 'active' ?
            <Alert
              message="Subscription Expired"
              description="Your subscription has been expired. Please renew your subscription to continue using our services."
              type="error"
              showIcon
            /> : null}
        </div>
        <TertiaryHeading className={'mt-1 mb-2'} title="Select Your Plan" />
        <Spin spinning={isLoading} indicator={<LoadingOutlined spin />}>
          <PaymentPlans />
        </Spin>
        <Progessbar progress={'50%'} step={2} />
      </div>
    </>
  );
};

export default Plans;
