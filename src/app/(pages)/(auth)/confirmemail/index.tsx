import Paragraph from '@/app/component/customparagraph/paragraph';
import { minHeading } from '@/globals/tailwindvariables';
import React from 'react';

const Footer = () => {
  minHeading;
  return (
    <div
      className="flex justify-evenly items-center flex-col h-20 p-2
    
    bg-cloudWhite
    "
    >
      <div className="flex gap-4 items-center">
        <Paragraph
          styledVars={minHeading}
          classes="hover:underline cursor-pointer"
          title="Cookies policy"
        />
        <Paragraph
          styledVars={minHeading}
          classes="hover:underline cursor-pointer"
          title="Privacy policy"
        />
        <Paragraph
          styledVars={minHeading}
          classes="hover:underline cursor-pointer"
          title="Terms & conditions"
        />
      </div>
      <Paragraph
        styledVars={minHeading}
        classes="hover:underline cursor-pointer"
        title="© 2023 Schesti . All rights reserved."
      />
    </div>
  );
};

export default Footer;
