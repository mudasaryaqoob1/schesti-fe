'use client';

import { withAuth } from '@/app/hoc/withAuth';
import { AiaInvoicingForm } from './components';
import { NoInvoiceFound } from '../invoice/[id]/components/NoInvoiceFound';
import { Skeleton } from 'antd';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { clientInvoiceService } from '@/app/services/client-invoices.service';
import { useEffect, useRef, useState } from 'react';
import { IAIAInvoice } from '@/app/interfaces/client-invoice.interface';
import { useSearchParams } from 'next/navigation';
import { AIAInvoiceFormMode, AIATabsType } from '../types';
import { AIAInvoiceFormHeader } from './components/Header';
import { AIATabs } from './components/AIATabs';
import { AIAHistory } from './components/History';

function AiaInvoicingFormPage() {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const [parentInvoice, setParentInvoice] = useState<IAIAInvoice | null>(null);
  const mode = searchParams.get('mode') as AIAInvoiceFormMode;

  const [tab, setTab] = useState<AIATabsType>('current');

  const downloadRef = useRef<{
    handleDownloadPdf: () => void;
  }>(null);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      getParentInvoice(id);
    }
  }, [searchParams]);

  async function getParentInvoice(id: string) {
    if (id) {
      setLoading(true);
      try {
        const response =
          await clientInvoiceService.httpGetParentInvoiceById(id);
        if (response.data) {
          setParentInvoice(response.data.invoice);
        }
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data.message);
      } finally {
        setLoading(false);
      }
    }
  }
  if (loading) {
    return <Skeleton />;
  }
  if (!parentInvoice) {
    return <NoInvoiceFound />;
  }

  if (mode !== 'edit' && mode !== 'view' && mode !== 'phase') {
    return <NoInvoiceFound />;
  }

  return (
    <section className="mx-6 my-2 space-y-2 relative">
      <AIAInvoiceFormHeader
        parentInvoice={parentInvoice}
        onDownloadInvoice={() => downloadRef.current?.handleDownloadPdf()}
      />
      <AIATabs tab={tab} setTab={setTab} />
      {tab === 'current' ? (
        <AiaInvoicingForm
          ref={downloadRef}
          parentInvoice={parentInvoice}
          setParentInvoice={setParentInvoice}
          mode={mode}
        />
      ) : (
        <AIAHistory parentInvoice={parentInvoice} />
      )}
    </section>
  );
}

export default withAuth(AiaInvoicingFormPage);
