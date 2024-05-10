import * as Yup from 'yup';

export const ContractorSchema: any = Yup.object({
  companyName: Yup.string().required('Company Name is required'),
  industry: Yup.string().required('Industry is required'),
  employee: Yup.number().positive("Must have 1 Employee").required('No Of Employees are required'),
  // phoneNumber: Yup.string().optional(),
  address: Yup.string().optional(),
  country: Yup.string().required('Country is required'),
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
  organizationName: Yup.string().optional(),
});

export const SubContractorSchema: any = Yup.object({
  companyName: Yup.string().required('Company Name is required'),
  employee: Yup.number().positive("Must have 1 Employee").required('No Of Employees are required'),
  // phoneNumber: Yup.string().optional(),
  industry: Yup.string().optional(),
  address: Yup.string().optional(),
  country: Yup.string().required('Country is required'),
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
  organizationName: Yup.string().optional(),
});

export const OwnerSchema: any = Yup.object({
  // phoneNumber: Yup.string().optional(),
  address: Yup.string().required('Address is required'),
  organizationName: Yup.string().required('Organization Name is required'),
  companyName: Yup.string().optional(),
  country: Yup.string().required('Country is required'),
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
  industry: Yup.string().optional(),
  employee: Yup.number().positive("Must have 1 Employee").optional(),
});
