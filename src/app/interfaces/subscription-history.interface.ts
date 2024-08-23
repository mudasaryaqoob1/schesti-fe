import { IPricingPlan } from "./pricing-plan.interface";
import { IUserInterface } from "./user.interface";

type CanceledSubscriptionHistroy = {
  status: 'canceled';
  canceledAt: Date;
};

type ExpiredSubscriptionHistroy = {
  status: 'expired';
  expiredAt: Date;
};

type ActiveSubscriptionHistroy = {
  status: 'active';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
};

export type ISubriptionHistory = (
  | CanceledSubscriptionHistroy
  | ExpiredSubscriptionHistroy
  | ActiveSubscriptionHistroy
) & {
  customerId: string;
  planId: string | IPricingPlan;
  user: string | IUserInterface;
  subscriptionId: string;
  paymentMethod: string;
  amount: number;
  additionalPeriodEnd: Date;
};

