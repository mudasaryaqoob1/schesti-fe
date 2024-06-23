'use client';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';

// module imports
import { AppDispatch } from '@/redux/store';
import CustomButton from '../customButton/button';
import { logout } from '@/redux/authSlices/authSlice';

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();

  const logoutHandler = () => {
    dispatch(logout());
    localStorage.removeItem('schestiToken');
    window.location.pathname = '/login';
  };
  return (
    <nav className="py-3 px-16 md:h-[60px] md:flex flex-col shadow-lg  md:flex-row items-center justify-end w-full bg-white">
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
        <div className="flex items-center gap-1">
          <Link href={'/upgradeplans'} className="md:my-0 my-2">
            <CustomButton
              className="!py-2.5 !px-6 h-10 !bg-transparent border !border-schestiWarning !text-schestiWarning shadow-scenarySubdued"
              icon="/zap-yellow.svg"
              iconwidth={20}
              iconheight={20}
              text="Upgrade Plan"
            />
          </Link>
          <Link href={'/settings/supporttickets'}>
            <Image
              src={'/supportChatIcon.svg'}
              alt="logo white icon"
              width={40}
              height={40}
              className="active:scale-105 cursor-pointer"
            />
          </Link>

          <Link href={'/settings/supporttickets'}>
            <Image
              src={'/bell.svg'}
              alt="logo white icon"
              width={20}
              height={20}
              className="active:scale-105 cursor-pointer"
            />
          </Link>

          <Image
            src={'/divider.svg'}
            alt="logo white icon"
            width={40}
            height={40}
          />
          <p
            className="text-schestiPrimary cursor-pointer"
            onClick={logoutHandler}
          >
            Logout
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
