import React from 'react';
import Navbar from '../navbar/minnavbar';
import Tabs from '../tabs/index';

const CustomNavbar = ({ children }: any) => {
  return (
    <div>
      <Navbar />
      <Tabs />
      {children}
    </div>
  );
};

export default CustomNavbar;
