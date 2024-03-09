export interface IPaymentProps {
  planID: string | undefined;
  autoRenew: boolean;
}

export type IPaypalPaymentProps = {
  price: number;
  planID: string | undefined;
  autoRenew: boolean;
  name: string;
}