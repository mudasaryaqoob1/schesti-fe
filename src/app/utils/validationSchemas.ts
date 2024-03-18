import * as Yup from 'yup';

export const ContractorSchema: any = Yup.object({
  companyName: Yup.string().required('company name is required'),
  industry: Yup.string().required('industry is required'),
  employee: Yup.number().required('no of employees are reuqired'),
  phoneNumber: Yup.string().required('phone number is required'),
  address: Yup.string().optional(),
  organizationName: Yup.string().optional(),
});

export const SubContractorSchema: any = Yup.object({
  companyName: Yup.string().required('company name is required'),
  employee: Yup.number().required('no of employees are required'),
  phoneNumber: Yup.string().required('phone number is required'),
  industry: Yup.string().optional(),
  address: Yup.string().optional(),
  organizationName: Yup.string().optional(),
});

export const OwnerSchema: any = Yup.object({
  phoneNumber: Yup.string().required('phone number is required'),
  address: Yup.string().required('address is required'),
  organizationName: Yup.string().required('organization name is required'),
  companyName: Yup.string().optional(),
  industry: Yup.string().optional(),
  employee: Yup.number().optional(),
});
