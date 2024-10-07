'use client';

import React from 'react';
import { Collapse } from 'antd';

interface Propss {
  faqs: any;
}

const CollapseComponent: React.FC<Propss> = ({ faqs }) => {
  let items = faqs.map((faq: any, i: number) => {
    return {
      key: i,
      label: (
        <div className="flex items-center gap-6 font-bold font-Gilroy text-[12px] md:text-[18px] text-[#161C2D] md:leading-[32px]">
          <img src='/images/simple-line-icons_question.svg' alt='tick' />
          {faq.title}
        </div>
      ),
      children: (
        <p className="w-full font-normal font-Gilroy text-[12px] md:text-[19px] text-[#161C2D] leading-[32px] md:px-[64px]">
          {faq.paragraph}
        </p>
      ),
    };
  });

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <div>
      <Collapse
        expandIconPosition="end"
        expandIcon={({ isActive }) =>
          isActive ? (
            <img src="/icons/collapse-up-icon.svg" />
          ) : (
            <img className="rotate-180" src="/icons/collapse-up-icon.svg" />
          )
        }
        items={items}
        defaultActiveKey={['1']}
        onChange={onChange}
      />
    </div>
  );
};

export default CollapseComponent;
