'use client';

import PaymentPlans from '@/app/component/plans';
import { HttpService } from '@/app/services/base.service';
import { selectToken } from '@/redux/authSlices/auth.selector';
import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';

const UpgrdePlan = () => {
  const token = useSelector(selectToken);

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);
  return (
    <div className="flex flex-col mx-24 justify-center flex-wrap">
      <PaymentPlans />
    </div>
  );
};

export default UpgrdePlan;
