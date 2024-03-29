import { IUpdateCompanyDetail } from "./companyInterfaces/updateCompany.interface"

export type IUserInterface = IUpdateCompanyDetail & {
    _id: string
    email: string
    isEmailVerified: boolean
    isActive: string
    loginAttempts: number
    providerId: string
    providerType: string
    name: string
    roles: string[]
    userRole: string
    brandingColor: string
    isPaymentConfirm: boolean
    createdAt: string
    updatedAt: string
    address: any
    companyLogo: string
    companyName: string
    employee: string
    industry: string
    organizationName: any
    planId: string
    stripeCustomerId: string
    subscriptionId: string
}