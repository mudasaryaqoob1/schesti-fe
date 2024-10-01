'use client';

import React, { useState } from 'react';
import Navbar from '../component/navbar/minnavbar';
// import Tabs from '../component/tabs';
import { usePathname } from 'next/navigation';
import { AppSidebar } from '../component/sidebar';
type Props = {
  children: React.ReactNode;
};

const HOVERED_MARGIN_LEFT = 'ml-[240px]';
const UNHOVERED_MARGIN_LEFT = 'ml-[80px]';

const CustomNavbar = ({ children }: Props) => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const unProtectedRoutes = [
    'checkmail',
    'checkmail',
    'companydetails',
    'congratulation',
    'forgetpassword',
    'login',
    'payment',
    'plans',
    'register',
    'sendcode',
    'setnewpassword',
    'settings',
    'trades',
    'verification',
    'pending'
  ];

  const isUnProtectedRoute =
    pathname === '/contracts/sign' ||
    pathname.includes('/meeting/Schesti') ||
    unProtectedRoutes.includes(pathname.split('/')[1]);

  return (
    <div className="flex h-screen relative">
      {!isUnProtectedRoute && (
        <>
          <AppSidebar isOpened={collapsed} toggleCollapsed={toggleCollapsed} />
          {/* <Tabs /> */}
        </>
      )}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${isUnProtectedRoute ? 'ml-0' : collapsed ? HOVERED_MARGIN_LEFT : UNHOVERED_MARGIN_LEFT}`}
      >
        {!isUnProtectedRoute ? <Navbar /> : null}
        {children}
      </div>
    </div>
  );
};

export default CustomNavbar;
