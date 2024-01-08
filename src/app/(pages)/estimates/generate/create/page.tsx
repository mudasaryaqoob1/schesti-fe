'use client';
import React, { useState } from 'react';
import { Steps } from 'antd';
import Scope from '../components/scope';
import Summary from '../components/summary';
import TakeOff from '../components/takeoff';
import { bg_style } from '@/globals/tailwindvariables';

const steps = [
  {
    title: 'Takeoff',
    description: 'Measurements',
  },
  {
    title: 'Scope',
    description: 'Add all of your scope',
  },
  {
    title: 'Summary',
    description: 'Confirm all the details',
  },
];

const Generated = () => {
  const [pevNext, setPrevNext] = useState(0);

  const Estimates = [TakeOff, Scope, Summary];
  const EstimateComponent = Estimates[pevNext];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    description: item.description,
  }));

  return (
    <div className="md:px-16 px-5 pb-8">
      <div className={`${bg_style} p-9 my-4`}>
        <Steps current={pevNext} items={items} labelPlacement="vertical" />
      </div>

      <EstimateComponent setPrevNext={setPrevNext} pevNext={pevNext} />
    </div>
  );
};

export default Generated;
