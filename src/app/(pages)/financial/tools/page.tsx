'use client';
import React from 'react';
import { FinancialStatus } from './components/FinancialStatus';
import { useQuery } from 'react-query';
import { clientInvoiceService } from '@/app/services/client-invoices.service';
import { settingTargetService } from '@/app/services/targets.service';
import { TargetStats } from './components/TargetStats';
import { TargetTable } from './components/TargetTable';
import { withAuth } from '@/app/hoc/withAuth';

const Finance = () => {
  const clientInvoiceQuery = useQuery(['client-invoices-with-children'], () => {
    return clientInvoiceService.httpGetAllInvoicesWithChildren();
  }, {
    refetchOnWindowFocus: false,
  });

  const targetsQuery = useQuery(['targets'], () => {
    return settingTargetService.httpGetAllSettingTargets(1, 20);
  }, {
    refetchOnWindowFocus: false,
  });

  return (
    <section className="my-4  mx-8 px-4">
      <div className="grid grid-cols-12 gap-8">
        <FinancialStatus clientInvoiceQuery={clientInvoiceQuery} />
        <TargetStats
          targetsQuery={targetsQuery}
          clientInvoiceQuery={clientInvoiceQuery}
        />
      </div>

      <TargetTable
        clientInvoiceQuery={clientInvoiceQuery}
        targetsQuery={targetsQuery}
      />
    </section>
  );
};

export default withAuth(Finance);
