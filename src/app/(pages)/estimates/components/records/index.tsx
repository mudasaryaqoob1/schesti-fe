'use client';
import Button from '@/app/component/customButton/button';
import { useRouter } from 'next/navigation';
import Table from '@/app/component/table/estimate/requests';
import Pagination from '@/app/component/pagination';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { bg_style } from '@/globals/tailwindvariables';

const Records = () => {
  const router = useRouter();

  return (
    <>
      <section className="my-5   px-16">
        <div className={`${bg_style} p-5`}>
          <div className="flex justify-between items-center mb-3">
            <TertiaryHeading title="My Estimate request" />
            <Button
              text="Start New Esstimate"
              className="!w-auto"
              icon="/plus.svg"
              iconwidth={20}
              iconheight={20}
              onClick={() => router.push('/estimates/requests/takeoff')}
            />
          </div>
          <Table />
          <Pagination />
        </div>
      </section>
    </>
  );
};

export default Records;
