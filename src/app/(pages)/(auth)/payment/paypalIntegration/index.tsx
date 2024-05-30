import React from 'react';
import { toast } from 'react-toastify';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

// module imports
import { authService } from '@/app/services/auth.service';
import { IPricingPlan } from '@/app/interfaces/pricing-plan.interface';
import { useRouterHook } from '@/app/hooks/useRouterHook';

interface IInitialOotions {
  clientId: any;
  currency: string;
  intent: string;
}

let initialOptions: IInitialOotions = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  currency: 'USD',
  intent: 'capture',
};
type Props = {
  selectedPlan: IPricingPlan;
};
const PaypalIntegration = ({ selectedPlan }: Props) => {
  const router = useRouterHook();

  const createOrder = async () => {
    const response: any = await authService.httpPaypalCreateOrder({
      autoRenew: false,
      planID: selectedPlan._id,
      name: selectedPlan.planName,
      price: selectedPlan.price,
    });
    return response.data.data.id;
  };

  const onApprove = async (data: any) => {
    const response: any = await authService.httpPaypalCaptureOrder(
      data.orderID
    );

    if (response.data.status === 201) {
      router.push('/congratulation');
    } else {
      toast.error('Something went wrong');
    }
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        createOrder={() => createOrder()}
        onApprove={(data) => onApprove(data)}
        style={{ layout: 'horizontal' }}
      />
    </PayPalScriptProvider>
  );
};

export default PaypalIntegration;
