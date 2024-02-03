'use client';
import Button from '@/app/component/customButton/button';
// import { useRouter } from 'next/navigation';
import Pagination from '../../../../component/pagination';
// import { takeoffRecords, takeoffRecordsHeadings } from '../../data';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { bg_style } from '@/globals/tailwindvariables';

const Records = () => {
  // const router = useRouter();

  return (
    <div className={`${bg_style} p-5`}>
      <div className="flex justify-between items-center mb-3">
        <TertiaryHeading title="Recent Measurements" />
        <Button
          text="Start Measurements"
          className="!w-auto"
          icon="plus.svg"
          iconwidth={20}
          iconheight={20}
        />
      </div>
      <Pagination />
    </div>
  );
};

export default Records;
