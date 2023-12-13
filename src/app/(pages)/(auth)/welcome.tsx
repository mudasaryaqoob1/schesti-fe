import React from 'react';
import PrimaryHeading from '@/app/component/headings/primary';
import QuaternaryHeading from '@/app/component/headings/quaternary';

const Welcome = () => {
  return (
    <>
      <div className="flex-1 text-center m-5 mb-0">
        <PrimaryHeading
          title="Welcome to the system"
          className="
        text-4xl leading-[46px]
        text-midnightBlue2 text-center"
        />
        <QuaternaryHeading
          className="text-start px-[30px] m-2 ms-4 text-slateGray"
          title="Lorem ipsum dolor sit amet consectetur. Suspendisse integer non
        praesent mi ornare leo tincidunt elementum sem. Dui mattis vulputate
          mauris at amet.
"
        />
      </div>
    </>
  );
};

export default Welcome;
