export interface ISubcontract {
  companyRep: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  secondAddress?: string;
}

export interface ISubcontractor {
  _id: string;
  email: string;
  isEmailVerified: boolean;
  isActive: string;
  loginAttempts: number;
  providerId: string;
  providerType: string;
  name: string;
  companyRep: string;
  address: string;
  secondAddress: string;
  phone: string;
  roles: string[];
  brandingColor: string;
  isPaymentConfirm: boolean;
  associatedComapny: string;
  createdAt: Date;
  updatedAt: Date;
}