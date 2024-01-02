import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

// module imports
import { authService } from '@/app/services/auth.service';
import { IPaymentProps } from '@/app/interfaces/authInterfaces/payment.interface';

interface IInitialOotions {
  clientId: any;
}

let initialOptions: IInitialOotions = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
};

const PaypalIntegration = () => {
  const router = useRouter();

  const [product] = useState<IPaymentProps>({
    planID: 'Go FullStack with KnowledgeHut',
    autoRenew: true,
  });

  const createOrder = async () => {
    const response: any = await authService.httpPaypalCreateOrder(product);
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
