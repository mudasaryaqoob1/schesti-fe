'use client';
import Button from '@/app/component/customButton/button';
import Heading from '@/app/component/customHeading/heading';
import Paragraph from '@/app/component/customParagraph/paragraph';
import NavBar from '@/app/component/navbar/authBar';
import { quinaryHeading, primaryHeading } from '@/globals/tailwindvariables';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

const CheckYourEmail = () => {
  const router = useRouter();
  return (
    <>
      <NavBar login={true} />
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

          <Heading
            classes="text-center mt-8"
            styledVars={primaryHeading}
            title="Check your mail"
          />
          <Paragraph
            classes="mt-1  text-center text-slateGray"
            styledVars={quinaryHeading}
            title="We’ve sent a verification email to abc@example.com"
          />

          <Paragraph
            classes="font-popin text-midnightBlue font-normal
            mt-8
           leading-[26px] text-center "
            styledVars={quinaryHeading}
            title="Click the link in your email to verify your account."
          />

          <Paragraph
            classes="font-popin text-doveGrayer font-normal
           leading-[26px] text-center my-1"
            styledVars={quinaryHeading}
            title="    If you have trouble finding your email, check your spam folder for
                an email from noreply@example.com"
          />
          <div
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
          </div>
          <span className="my-2"></span>
          <Button
            text={'Continue'}
            className="!p-2"
            onClick={() => router.push('/companydetails')}
          />
        </div>
      </div>
    </>
  );
};

export default CheckYourEmail;
