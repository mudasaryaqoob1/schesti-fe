import { IPricingPlan } from './pricing-plan.interface';
import { IUserInterface } from './user.interface';

export type ISubriptionHistory = {
  customerId: string;
  status: 'cancelled' | 'expired' | 'active';
  planId: string | IPricingPlan;
  user: string | IUserInterface;
  subscriptionId: string;
  paymentMethod: string;
  amount: number;
  additionalPeriodEnd: Date;
  expiredAt: Date;
  canceledAt: Date;
  currentPeriodStart: number;
  currentPeriodEnd: number;
};
