'use client';
import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

// module imports
import { IUser } from '@/app/interfaces/companyEmployeeInterfaces/user.interface';
import { userRoles } from '@/app/enums/role.enums';
import CustomButton from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import { bg_style } from '@/globals/tailwindvariables';
import FormControl from '@/app/component/formControl';
import { userService } from '@/app/services/user.service';
import { useRouterHook } from '@/app/hooks/useRouterHook';

const defaultOptions = [
  { value: userRoles.COMPANY, label: userRoles.COMPANY },
  { value: userRoles.ACCOUNTS_MANAGER, label: userRoles.ACCOUNTS_MANAGER },
  { value: userRoles.ESTIMATOR, label: userRoles.ESTIMATOR },
  { value: userRoles.PROJECT_MANAGER, label: userRoles.PROJECT_MANAGER },
  { value: userRoles.SALES_MANAGER, label: userRoles.SALES_MANAGER },
];

type Props = {
  onCancel: () => void;

}

const AddNewUser = ({
  onCancel
}: Props) => {
  const router = useRouterHook();
  const { user } = useSelector((state: any) => state.user);

  const [isLoading, setisLoading] = useState(false);

  const newClientSchema: any = Yup.object({
    firstName: Yup.string().required('First name is required!'),
    lastName: Yup.string().required('Last name is required!'),
    email: Yup.string()
      .required('Email is required!')
      .email('Email should be valid'),
    roles: Yup.string().required('Role required'),
  });

  const [firstName, lastName] = user ? user.name.split(' ') : [];

  const initialValues: IUser = {
    firstName: firstName || '',
    lastName: lastName || '',
    email: user?.email || '',
    roles: user?.roles?.[0] || '',
    brandingColor: user?.brandingColor || '',
  };
  const submitHandler = async (values: IUser, { resetForm }: any) => {
    setisLoading(true);
    if (user) {
      userService
        .httpUpdateEmployee({ ...values, roles: [values.roles] }, user.key)
        .then((response: any) => {
          setisLoading(false);
          if (response.statusCode == 201) {
            resetForm();
            router.push('/settings/companyUser');
          } else {
            toast.error(response.message);
          }
        })
        .catch((error: any) => {
          setisLoading(false);
          toast.error(error.response.data.message);
        });
    } else {
      userService
        .httpAddNewEmployee({ ...values, roles: [values.roles] })
        .then((response: any) => {
          setisLoading(false);
          if (response.statusCode == 201) {
            resetForm();
            router.push('/settings/companyUser');
          } else {
            toast.error(response.message);
          }
        })
        .catch((error: any) => {
          setisLoading(false);
          toast.error(error.response.data.message);
        });
    }
  };
  return (

    <Formik
      initialValues={initialValues}
      validationSchema={newClientSchema}
      onSubmit={submitHandler}
    >
      {({ handleSubmit, errors, values }) => {
        console.log(errors, 'error', values);

        return (
          <Form
            name="basic"
            onSubmit={handleSubmit}
            autoComplete="off"
            className={`${bg_style} p-5`}
          >
            <p className={"text-schestiPrimaryBlack text-[18px] font-medium mb-3"}>Add User</p>
            <div className="grid grid-cols-1 gap-4 ">
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
                name="roles"
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
              <div className="flex items-center space-x-3">
                <WhiteButton
                  text="Cancel"
                  className="mx-w-30"
                  onClick={onCancel}
                />
                <CustomButton
                  isLoading={isLoading}
                  className="mx-w-30"
                  type="submit"
                  text={user ? 'Update' : 'Invite'}
                />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddNewUser;
