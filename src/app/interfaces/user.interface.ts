import { Plans } from '../utils/plans.utils';
import { IUpdateCompanyDetail } from './companyInterfaces/updateCompany.interface';

export type IUserPermissionPagePath = typeof Plans[keyof typeof Plans];

export type IUserPermission = {
    path: IUserPermissionPagePath;
    hasAccess: boolean;
}

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
    userRole: "owner" | "contractor" | "subcontractor" | string;
    brandingColor: string;
    isPaymentConfirm: boolean;
    // if this is empty array, it means the user has access to all pages
    permissions: IUserPermission[];
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
