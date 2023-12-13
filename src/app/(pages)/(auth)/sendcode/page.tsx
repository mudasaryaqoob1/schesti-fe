'use client';
import Button from '@/app/component/customButton/button';
import SecondaryHeading from '@/app/component/headings/Secondary';
import NavBar from '@/app/component/navbar/authBar';
import WelcomeWrapper from '@/app/component/welcomeLayout';
import { quaternaryHeading } from '@/globals/tailwindvariables';
import { useRouter } from 'next/navigation';

const Resendcode = () => {
  const router = useRouter();
  return (
    <WelcomeWrapper>
      <NavBar />
      <section className="grid place-items-center h-[100vh]">
        <div className="flex flex-col w-[500px]">
          <SecondaryHeading title={'Thanks!'} />

          <SecondaryHeading
            title={`If arslan.anjum951@gmail.com matches an email we have on file, then we've sent you an
              email containing further instructions for resetting your password.   
          !`}
            className="my-3"
          />
          <p
            className={`${quaternaryHeading}
         
        `}
          >
            If you haven't received an email in 5 minutes, check your spam.
            check your spam,
            <span className={`text-goldenrodYellow font-bold my-3`}>
              Resend
            </span>
          </p>
          <Button
            text="Reset"
            className="!p-2 mt-11"
            onClick={() => router.push('/setnewpassword')}
          />
          <p
            className="text-goldenrodYellow font-semibold text-center mt-3 underline cursor-pointer"
            onClick={() => router.push('/forgetpassword')}
          >
            Use a different email
          </p>
        </div>
      </section>
    </WelcomeWrapper>
  );
};

export default Resendcode;
