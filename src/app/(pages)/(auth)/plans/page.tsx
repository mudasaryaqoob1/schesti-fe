'use client';
import TertiaryHeading from '@/app/component/headings/tertiary';
import PaymentPlans from '@/app/component/plans';
// import { useRouter } from 'next/navigation';
import Progessbar from '@/app/component/progressBar';
const Plans = () => {
  return (
    <>
      <div className="flex flex-col mx-4 md:mx-24 justify-center flex-wrap">
        <TertiaryHeading className={'mt-1 mb-2'} title="Select Your Plan" />
        <PaymentPlans />
        <Progessbar progress={'50%'} step={2} />
      </div>
    </>
  );
};

export default Plans;
