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
    <nav className="py-3 px-16 md:h-[60px] md:flex flex-col  md:flex-row items-center justify-between w-full bg-primaryGradient">
      <Link href={'/'} className="cursor-pointer active:scale-105 mb-2 md:mb-0">
        <Image
          src={'/logowhite.svg'}
          alt="logo white icon"
          width={80}
          height={20}
        />
      </Link>

      <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
        <Link href={'/upgradeplans'} className="md:my-0 my-2">
          <CustomButton
            className="!py-2.5 !px-6 h-10
          
          !bg-transparent border !border-pearlWhite shadow-scenarySubdued
          "
            icon="/zap.svg"
            iconwidth={20}
            iconheight={20}
            text="
        Upgrade Plan    
        "
          />
        </Link>
        <div className="flex items-center gap-4">
          <Link href={'/settings/general'}>
            <Image
              src={'/setting.svg'}
              alt="logo white icon"
              width={40}
              height={40}
              className="cursor-pointer
            
            "
            />
          </Link>
          <Link href={'/notifications'}>
            <Image
              src={'/bell-02.svg'}
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
          <Link href={'#'} onClick={logoutHandler} className="relative">
            <Image
              src={'/profile.svg'}
              alt="logo white icon"
              width={36}
              height={32}
              className="active:scale-105 cursor-pointer"
            />
            <Image
              src={'/online.svg'}
              alt="logo white icon"
              width={10}
              height={10}
              className="active:scale-105 absolute top-[65%] 
            right-[5%]"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
