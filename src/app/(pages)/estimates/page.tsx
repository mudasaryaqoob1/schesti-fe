'use client';
import React from 'react';
import Records from './requests/records';
import CustomNavbar from '@/app/component/customNavbar';

const EstimateRequests = () => {
  return (
    <CustomNavbar>
      <Records />
    </CustomNavbar>
  );
};

export default EstimateRequests;
