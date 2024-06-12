'use client';

import React, { useRef } from 'react';
import Navbar from '../component/navbar/minnavbar';
// import Tabs from '../component/tabs';
import { usePathname } from 'next/navigation';
import { AppSidebar } from '../component/sidebar';
import { useHover } from 'ahooks';
type Props = {
  children: React.ReactNode;
};

const HOVERED_MARGIN_LEFT = "ml-[240px]";
const UNHOVERED_MARGIN_LEFT = "ml-[80px]";

const CustomNavbar = ({ children }: Props) => {
  const pathname = usePathname();

  const ref = useRef<HTMLDivElement>(null);
  const isHovering = useHover(ref);


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
    'verification'
  ];
  return (
    <div className='flex h-screen'>
      <AppSidebar
        ref={ref}
        isHovering={isHovering}
      />
      <div className={`flex-1 ${isHovering ? HOVERED_MARGIN_LEFT : UNHOVERED_MARGIN_LEFT}`}>
        {!unProtectedRoutes.includes(pathname.split('/')[1]) && (
          <>
            <Navbar />
            {/* <Tabs /> */}
          </>
        )}
        {children}
      </div>
    </div>
  );
};

export default CustomNavbar;
