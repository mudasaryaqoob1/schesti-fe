import { IUpdateCompanyDetail } from './companyInterfaces/updateCompany.interface';

export type IUserInterface = IUpdateCompanyDetail & {
    _id: string;
    email: string;
    isEmailVerified: boolean;
    isActive: string;
    loginAttempts: number;
    providerId: string;
    providerType: string;
    name: string;
    roles: string[];
    userRole: string;
    brandingColor: string;
    isPaymentConfirm: boolean;
    createdAt: string;
    updatedAt: string;
    address: any;
    companyLogo: string;
    companyName: string;
    employee: string;
    industry: string;
    organizationName: string;
    planId: string;
    stripeCustomerId: string;
    subscriptionId: string;
    verificationsData?: {
        secretaryOfState?: string,
        license?: string,
        preQualification?: string
    };
    phone?: string;
    country?: string;
    state?: string;
    city?: string;
    selectedTrades?: any;
};