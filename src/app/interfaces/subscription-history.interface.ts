export interface ISubscriptionHistory {
    transactionId: string;
    planName: string;
    type: string;
    periodStart: number;
    periodEnd: number;
    amount: number;
}