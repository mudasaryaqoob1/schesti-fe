'use client';

import { HttpService } from '@/app/services/base.service';
import { selectToken } from '@/redux/authSlices/auth.selector';
import { useParams } from 'next/navigation';
import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { NoInvoiceFound } from './components/NoInvoiceFound';
import { selectClientInvoices } from '@/redux/client-invoices/client-invoice.selector';
import { PhaseComponent } from './components';

export default function CreateClientInvoicePage() {
  const token = useSelector(selectToken);
  const params = useParams<{ id: string }>();
  // all parent invoices
  const allInvoices = useSelector(selectClientInvoices);

  const parentInvoice = allInvoices?.find(
    (invoice) => invoice._id === params.id
  );

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  if (!parentInvoice) {
    return <NoInvoiceFound />;
  }

  return <PhaseComponent parentInvoice={parentInvoice} />;
}
