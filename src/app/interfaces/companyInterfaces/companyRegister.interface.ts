export interface IRegisterCompany {
  companyName: string;
  industry: string;
  employee?: number;
  phoneNumber: number | null;
  userId?: string | string[];
  companyLogo?: string | null;
  country: string,
  city: string,
  state: string,
}
