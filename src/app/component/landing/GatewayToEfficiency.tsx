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
      className="mt-20"
    >
      <div className="px-[200px] py-8">
        <div>
          <div className="mt-4 space-y-7">
            <div>
              <h1 className="text-white text-center text-[40px] leading-[60px]">
                Schesti: Your Gateway to Unmatched Efficiency
              </h1>
              <p className="text-white pt-[13px] text-[20px] leading-[38px]  text-center w-[924px] mx-auto">
                Empower Your Projects with Schesti: Your Comprehensive Solution
                for Achieving Exceptional Efficiency in Field Service Excellence
              </p>
            </div>
            <div className="flex mt-[42px] justify-center space-x-4">
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
