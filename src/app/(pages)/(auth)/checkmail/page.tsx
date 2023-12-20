'use client';
import Description from '@/app/component/description';
import PrimaryHeading from '@/app/component/headings/primary';
import AuthNavbar from '@/app/(pages)/(auth)/authNavbar';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

const CheckYourEmail = () => {
  const searchParams = useSearchParams();
  const emailQueryParameter = searchParams.get('email');
  return (
    <>
      <AuthNavbar />
      <div className="h-[calc(100vh-100px)] grid place-items-center rounded-s">
        <div
          className="max-w-[497px] min-w-[300px] px-8 py-7 
      shadow-secondaryShadow
      flex flex-col rounded-lg bg-snowWhite"
        >
          <Image
            src={'/mail.svg'}
            alt="mail icon"
            width={80}
            height={80}
            className="self-center"
          />

          <PrimaryHeading
            className="text-center mt-8"
            title="Check your mail"
          />
          <Description
            className="mt-1  text-center text-slateGray"
            title={`We’ve sent a verification email to ${emailQueryParameter}`}
          />

          <Description
            className="font-popin text-midnightBlue font-normal
            mt-8
           leading-[26px] text-center "
            title="Click the link in your email to verify your account."
          />

          <Description
            className="font-popin text-doveGrayer font-normal
           leading-[26px] text-center my-1"
            title={`If you have trouble finding your email, check your spam folder for
                an email from ${emailQueryParameter}`}
          />
          {/* <div
            className={twMerge(`${quinaryHeading} font-popin  font-normal
           leading-[24px] text-doveGrayer text-center mt-8
           `)}
          >
            Didn’t receive an email?{' '}
            <span
              className={twMerge(
                `font-bold text-royalIndigo underline cursor-pointer`
              )}
            >
              Resend
            </span>
          </div> */}
          {/* <Button
            text={'Continue'}
            className="!p-2"
            onClick={() => router.push('/companydetails')}
          /> */}
        </div>
      </div>
    </>
  );
};

export default CheckYourEmail;
