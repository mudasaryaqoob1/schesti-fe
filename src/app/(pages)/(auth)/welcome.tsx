import React from 'react';
import { primaryHeading, quaternaryHeading } from '@/globals/tailwindvariables';
import Paragraph from '@/app/component/customParagraph/paragraph';
import Heading from '@/app/component/customHeading/heading';

const Welcome = () => {
  return (
    <>
      <div className="flex-1 text-center m-5 mb-0">
        <Heading
          title="Welcome to the system"
          styledVars={primaryHeading}
          classes="
        text-4xl leading-[46px]
        text-midnightBlue2 text-start"
        />
        <Paragraph
          classes="text-start px-[30px] m-2 ms-4 text-slateGray"
          styledVars={quaternaryHeading}
          title="  Lorem ipsum dolor sit amet consectetur. Suspendisse integer non
        praesent mi ornare leo tincidunt elementum sem. Dui mattis vulputate
          mauris at amet.
"
        />
      </div>
    </>
  );
};

export default Welcome;
