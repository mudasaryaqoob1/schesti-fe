'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '../component/navbar/minnavbar';
import Tabs from '../component/tabs';
import { usePathname } from 'next/navigation';
import SmallTabs from '../component/tabs/SmallTabs';

type Props = {
  children: React.ReactNode;
};
const CustomNavbar = ({ children }: Props) => {
  const pathname = usePathname();

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
  const [ishov, setishov] = useState<boolean>(false)
  useEffect(()=>{console.log(ishov," -- ishove")},[ishov])
  return (
    <div className='flex max-w-[100vw]' >
      {!unProtectedRoutes.includes(pathname.split('/')[1]) && <div className='w-[4.5vw]'>
        <div onMouseEnter={()=>{setishov(true)}} onMouseLeave={()=>{setishov(false)}} className='w-[4.5vw] !h-[100vh] bg-lavenderPurpleReplica hover:w-[15vw] transition-all duration-200 fixed z-20' >
          {!unProtectedRoutes.includes(pathname.split('/')[1]) && (
            <Tabs ishov={ishov} />
            // <>
            //   {/* <Navbar /> */}
            //   {/* <SmallTabs /> */}
            //   <Tabs />
            // </>
          )}
        </div>
      </div>}
      <div className={!unProtectedRoutes.includes(pathname.split('/')[1]) ? 'w-[100vw]' : 'w-[95.5vw]'}>
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
