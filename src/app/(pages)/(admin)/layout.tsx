import React from 'react';
import Navbar from '@/app/(pages)/(admin)/components/navbar';
import Tabs from '@/app/(pages)/(admin)/components/tabs';

type Props = {
  children: React.ReactNode;
};
const Layout = ({ children }: Props) => {
  return (
    <div>
      <Navbar />
      <Tabs />
      {children}
    </div>
  );
};

export default Layout;
