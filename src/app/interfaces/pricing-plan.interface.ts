export interface IPricingPlan {
    _id?: string;
    planType: string;
    planName: string;
    monthlyPrice: number;
    yearlyPrice: number;
    freeTrailDays: number;
    planDescription: string;
    features: string;
    isActive?: boolean;
}