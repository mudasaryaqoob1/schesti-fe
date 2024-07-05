export interface ISubscriptionHistory {
    transactionId: string;
    planName: string;
    type: string;
    paymentDate: number;
    paymentExpire: number;
    amount: number;
}