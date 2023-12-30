import React from 'react';
import Image from 'next/image';
// import CustomButton from '@/app/component/customButton/button';
import { useRouter } from 'next/navigation';
const AuthNavbar = () => {
  const router = useRouter();
  return (
    <div className="flex items-center shadow-[0px_0px_16px_0px_#e3e3e3] px-12 py-7">
      <div className="w-full">
        <Image
          onClick={() => router.push('/')}
          className="cursor-pointer"
          src={'/logo.svg'}
          alt="logo website"
          width={100}
          height={30}
        />
      </div>

      {/* <div className="w-full w-max">
        <CustomButton
          onClick={() => router.push('/login')}
          text="Login"
          className="!px-10 !py-3"
          type="submit"
        />
      </div> */}
    </div>
  );
};

export default AuthNavbar;
