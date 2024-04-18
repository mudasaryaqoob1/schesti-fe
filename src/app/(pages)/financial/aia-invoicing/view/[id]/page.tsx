'use client';

import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { NoInvoiceFound } from './components/NoInvoiceFound';
import { selectClientInvoices } from '@/redux/client-invoices/client-invoice.selector';
import { PhaseComponent } from './components';
import { withAuth } from '@/app/hoc/withAuth';

function ClientInvoicePage() {
  const params = useParams<{ id: string }>();
  // all parent invoices
  const allInvoices = useSelector(selectClientInvoices);

  const parentInvoice = allInvoices?.find(
    (invoice) => invoice._id === params.id
  );

  if (!parentInvoice) {
    return <NoInvoiceFound />;
  }

  return <PhaseComponent parentInvoice={parentInvoice} />;
}

export default withAuth(ClientInvoicePage);