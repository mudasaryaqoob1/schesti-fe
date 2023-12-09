import { quinaryHeading } from '../../../../globals/tailwindvariables';
import Button from '@/app/component/customButton/button';
import NavBar from '@/app/component/navbar';
import Footer from './index';
import { twMerge } from 'tailwind-merge';
const ConfirmEmail = () => {
  return (
    <>
      <NavBar socialicons={true} />
      <section className="h-[calc(100vh-77px)] grid place-items-center bg-alabasterWhite">
        <div
          className="w-[537px] h-[520px] p-10 rounded-s bg-snowWhite   
      "
        >
          <h3
            className={twMerge(
              `${quinaryHeading} mb-3  text-midnightBlue font-semibold self-start`
            )}
          >
            Confirm your email address
          </h3>
          <p className=" quinaryHeading">Hi,</p>
          <p className="my-3 quinaryHeading">
            Thank you for signing up with us. We need one more quick step to
            complete the process: Please confirm your email address by clicking
            the button below.
          </p>
          <p className="my-2 quinaryHeading">
            Regards,
            <br />
            Schesti
          </p>
          <div className="pt-[47px] ">
            <Button text="Okay!" className="!p-2" />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ConfirmEmail;
