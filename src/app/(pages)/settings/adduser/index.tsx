'use client';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

// module imports
import { AppDispatch } from '@/redux/store';
import { IUser } from '@/app/interfaces/companyEmployeeInterfaces/user.interface';
import { userRoles } from '@/app/enums/role.enums';
import TertiaryHeading from '@/app/component/headings/tertiary';
import Description from '@/app/component/description';
import CustomButton from '@/app/component/customButton/button';
import { bg_style } from '@/globals/tailwindvariables';
import FormControl from '@/app/component/formControl';
import { selectToken } from '@/redux/authSlices/auth.selector';
import { useLayoutEffect } from 'react';
import { HttpService } from '@/app/services/base.service';
import { addNewUser } from '@/redux/userSlice/user.thunk';
import { toast } from 'react-toastify';

const defaultOptions = [
  { value: userRoles.COMPANY, label: 'Option 1' },
  { value: userRoles.ACCOUNTS_MANAGER, label: 'Option 2' },
  { value: userRoles.ESTIMATOR, label: 'Option 3' },
  { value: userRoles.PROJECT_MANAGER, label: 'Option 3' },
  { value: userRoles.SALES_MANAGER, label: 'Option 3' },
];

const AddNewUser = ({ setShowAddUser }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(selectToken);

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  const newClientSchema: any = Yup.object({
    firstName: Yup.string().required('First name is required!'),
    lastName: Yup.string().required('Last name is required!'),
    email: Yup.string()
      .required('Email is required!')
      .email('Email should be valid'),
    role: Yup.string().required('Role is required'),
  });

  const initialValues: IUser = {
    firstName: '',
    lastName: '',
    email: '',
    role: '',
  };
  const submitHandler = async (values: IUser, { resetForm }: any) => {
    let result: any = await dispatch(addNewUser(values));

    if (result.payload.statusCode == 201) {
      resetForm();
      toast.success('User Added');
      setShowAddUser(false);
    } else {
      toast.error(result.payload.message);
    }
  };
  return (
    <div className="w-full">
      <div className="flex gap-4 items-center">
        <Image src={'/home.svg'} alt="home icon" width={20} height={20} />
        <Image
          src={'/chevron-right.svg'}
          alt="chevron-right icon"
          width={16}
          height={16}
        />
        <Description title="Setting" className="font-base text-slateGray" />
        <Image
          src={'/chevron-right.svg'}
          alt="chevron-right icon"
          width={16}
          height={16}
        />

        <Description
          title="Add New"
          className="font-semibold text-lavenderPurple cursor-pointer underline"
        />
      </div>
      <TertiaryHeading title="Client List" className="my-5" />
      <Formik
        initialValues={initialValues}
        validationSchema={newClientSchema}
        onSubmit={submitHandler}
      >
        {({ handleSubmit }) => {
          return (
            <Form
              name="basic"
              onSubmit={handleSubmit}
              autoComplete="off"
              className={`${bg_style} p-5`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-4 ">
                <FormControl
                  control="input"
                  label="First Name"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                />
                <FormControl
                  control="input"
                  label="Last Name"
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                />
                <FormControl
                  control="select"
                  label="Role"
                  name="role"
                  options={defaultOptions}
                  placeholder="Select User Role"
                />
                <FormControl
                  control="input"
                  label="email"
                  type="email"
                  name="email"
                  placeholder="Email Address"
                />
              </div>
              <div className="self-end flex justify-end items-center gap-5 md:mt-5 my-3">
                <div>
                  <CustomButton
                    className="mx-w-30"
                    type="submit"
                    text="Save and Continue"
                  />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddNewUser;
