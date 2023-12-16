import React, { ReactNode } from 'react';
import VerticalsTabs from './components/verticalsTabs/index';

interface Props {
  children?: ReactNode;
}

import CustomNavbar from '@/app/component/customNavbar';
const SettingSidebar = ({ children }: Props) => {
  return (
    <CustomNavbar>
      <section className="md:px-16 px-8 pt-6 flex gap-4 items-start relative">
        <VerticalsTabs />
        {children}
      </section>
    </CustomNavbar>
  );
};

export default SettingSidebar;
