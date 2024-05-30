'use client';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';

// module imports
import { AppDispatch } from '@/redux/store';
import CustomButton from '../customButton/button';
import { logout } from '@/redux/authSlices/authSlice';
import { useRouterHook } from '@/app/hooks/useRouterHook';

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouterHook();
  const logoutHandler = () => {
    dispatch(logout());
    localStorage.removeItem('schestiToken');
    window.location.pathname = '/login';
  };
  return (
    <nav className="py-3 px-16 md:h-[60px] md:flex flex-col  md:flex-row items-center justify-between w-full bg-white shadow-md">
      <div
        className="cursor-pointer active:scale-105 mb-2 md:mb-0"
        onClick={() => router.refresh()}
      >
        {/* <Image
          src={'/logowhite.svg'}
          alt="logo white icon"
          width={80}
          height={20}
        /> */}
      </div>

      <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
        <div className="flex items-center gap-1">
          <Link href={'/settings/supporttickets'}>
            <Image
              src={'/supportChatIcon1.svg'}
              alt="logo white icon"
              width={40}
              height={40}
              className="active:scale-105 cursor-pointer"
            />
          </Link>
          <Link href={'/settings/general'}>
            <Image
              src={'/setting1.svg'}
              alt="logo white icon"
              width={40}
              height={40}
              className="cursor-pointer"
            />
          </Link>
          <Link href={'/upgradeplans'} className="md:my-0 my-2">
            <CustomButton
              className="!py-2.5 !px-6 h-10 !bg-transparent border !border-lavenderPurpleReplica shadow-scenarySubdued !text-lavenderPurpleReplica"
              icon="/zap2.svg"
              iconwidth={20}
              iconheight={20}
              text="Upgrade Plan"
            />
          </Link>
          <Image
            src={'/divider.svg'}
            alt="logo white icon"
            width={40}
            height={40}
          />
          <p className="text-lavenderPurpleReplica cursor-pointer" onClick={logoutHandler}>
            Logout
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
