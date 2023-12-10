'use client';
import Button from '@/app/component/customButton/button';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';

// module imports
import FormControl from '@/app/component/formControl';
import WelcomeWrapper from '@/app/component/welcomeLayout';
import NavBar from '@/app/component/navbar/authBar';
import PrimaryHeading from '@/app/component/headings/primary';
import Description from '@/app/component/description';

const initialValues = {
  password: '',
  confirmPassword: '',
};

const SetPasswordSchema: any = Yup.object({
  password: Yup.string().required('Password is required!'),
  confirmPassword: Yup.string()
    .required('Please retype your password.')
    .oneOf([Yup.ref('password')], 'Your passwords do not match.'),
});
const SetNewPassword = () => {
  const router = useRouter();

  const submitHandler = () => {
    router.push('/login');
  };

  return (
    <WelcomeWrapper>
      <NavBar />
      <div className="h-[100vh] grid place-items-center w-full">
        <div className="w-full px-10">
          <PrimaryHeading
            className="text-center"
            title="
            Set New Password 
            "
          />
          <Description
            className="mt-2 mb-10 font-normal leading-[24px] text-center"
            title="Please enter your new password"
          />
          <Formik
            initialValues={initialValues}
            validationSchema={SetPasswordSchema}
            onSubmit={submitHandler}
          >
            {({ handleSubmit }) => {
              return (
                <Form
                  name="basic"
                  onSubmit={handleSubmit}
                  autoComplete="off"
                >
                  {/* <div className="mt-10"> */}
                  <FormControl
                    control="password"
                    label="set new password"
                    type="password"
                    name="password"
                    placeholder="New password"
                  />
                  <FormControl
                    control="password"
                    label="Confirm password"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                  />
                  {/* </div> */}
                  <Button text="Set Password" className="!p-[12px] mt-8" />
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </WelcomeWrapper>
  );
};

export default SetNewPassword;
