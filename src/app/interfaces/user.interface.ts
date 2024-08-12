import { IUpdateCompanyDetail } from './companyInterfaces/updateCompany.interface';
import { FileInterface } from './file.interface';
import { ISettingCompanyRole } from './settings/comapny-role-settings.interface';

export type IUserInterface = IUpdateCompanyDetail & {
  _id: string;
  email: string;
  isEmailVerified: boolean;
  isActive: string;
  loginAttempts: number;
  providerId: string;
  providerType: string;
  name: string;
  firstName?: string;
  lastName?: string;
  roles?: string[] | ISettingCompanyRole[];
  userRole: 'owner' | 'contractor' | 'subcontractor';
  brandingColor: string;
  isPaymentConfirm: boolean;
  createdAt: string;
  updatedAt: string;
  address: string;
  companyLogo: string;
  companyName: string;
  employee: string;
  industry: string;
  organizationName: string;
  planId: string;
  stripeCustomerId: string;
  subscriptionId: string;
  verificationsData?: {
    secretaryOfState?: string;
    license?: string;
    preQualification?: string;
  };
  phone?: string;
  country?: string;
  state?: string;
  city?: string;
  selectedTrades?: any;
  associatedCompany?: IUserInterface | string;
  university: string;
  educationalDocuments: FileInterface[];
  verification?: {
    date: string
  };
  invitation?: {
    date: string;
  }
};
