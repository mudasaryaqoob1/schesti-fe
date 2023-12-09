'use client';
import Image from 'next/image';
import React from 'react';
import CustomButton from '../customButton/button';
import { useRouter } from 'next/navigation';

const ClientNavbar = () => {
  const router = useRouter();
  return (
    <nav className="py-3 px-14 flex items-center justify-between w-full bg-primaryGradient">
      <div
        onClick={() => router.push('/')}
        className="cursor-pointer active:scale-105"
      >
        <Image
          src={'/logowhite.svg'}
          alt="logo white icon"
          width={80}
          height={20}
        />
      </div>
      <div className="flex gap-3 justify-between items-center">
        <CustomButton
          className={`
        active:scale-105
        !bg-transparent border !border-pearlWhite shadow-scenarySubdued`}
          icon="/zap.svg"
          iconwidth={20}
          iconheight={20}
          text="
        Upgrade Plan    
        "
          onClick={() => router.push('/upgradeplans')}
        />
        <Image
          src={'/setting.svg'}
          alt="logo white icon"
          width={40}
          height={40}
          className="cursor-pointer
        active:scale-105
        "
          onClick={() => router.push('/settings')}
        />
        <Image
          src={'/bell-02.svg'}
          alt="logo white icon"
          width={20}
          height={20}
          className="active:scale-105 cursor-pointer"
          onClick={() => router.push('/notifications')}
        />
        <div className="border-right-1 border-white"></div>
        <div className="relative">
          <Image
            src={'/profile.svg'}
            alt="logo white icon"
            width={32}
            height={32}
            className="active:scale-105 cursor-pointer"
          />
          <Image
            src={'/online.svg'}
            alt="logo white icon"
            width={10}
            height={10}
            className="active:scale-105 absolute top-[62%] 
            right-[-13%]"
          />
        </div>
      </div>
    </nav>
  );
};

export default ClientNavbar;
