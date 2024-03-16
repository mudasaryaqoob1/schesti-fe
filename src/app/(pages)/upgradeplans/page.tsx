'use client';

import PaymentPlans from '@/app/component/plans';
import { withAuth } from '@/app/hoc/withAuth';

const UpgrdePlan = () => {
  return (
    <div className="flex flex-col mx-24 justify-center flex-wrap">
      <PaymentPlans />
    </div>
  );
};

export default withAuth(UpgrdePlan);
