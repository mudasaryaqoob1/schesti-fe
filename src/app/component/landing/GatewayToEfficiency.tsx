'use client';

import { usePathname, useRouter } from 'next/navigation';
import CustomButton from '../customButton/white';

export function GatewayToEfficiency() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      style={{
        background: 'linear-gradient(180deg, #8449EB 0%, #6A56F6 100%)',
      }}
      className="mt-10 lg:mt-20"
    >
      <div className="px-[20px] lg:px-[200px] py-8">
        <div>
          <div className="mt-4 space-y-7">
            <div>
              <h1 className="text-white text-center text-[28px] leading-[40px] lg:text-[40px] lg:leading-[60px]">
                Schesti: Your Gateway to Unmatched Efficiency
              </h1>
              <p className="text-white pt-[13px] text-[16px] lg:text-[20px] leading-[24px] lg:leading-[38px]  text-center lg:w-[924px] lg:mx-auto">
                Empower Your Projects with Schesti: Your Comprehensive Solution
                for Achieving Exceptional Efficiency in Field Service Excellence
              </p>
            </div>
            <div className="flex flex-col lg:flex-row items-center space-y-3 mt-[42px] lg:justify-center lg:space-x-4">
              <CustomButton
                text="Get start with Schesti"
                className="!rounded-full !w-48 !text-[#8449EB]"
                onClick={() => router.push('/register')}
              />

              {pathname !== '/contact' ? (
                <CustomButton
                  text="Contact Us"
                  className="!rounded-full !w-48 !bg-transparent  !text-white"
                  onClick={() => router.push('/contact')}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
