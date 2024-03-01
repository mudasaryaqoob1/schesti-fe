'use client';
import React, { useLayoutEffect } from 'react';
import { FinancialStatus } from './components/FinancialStatus';
import { useQuery } from 'react-query';
import { clientInvoiceService } from '@/app/services/client-invoices.service';
import { useSelector } from 'react-redux';
import { selectToken } from '@/redux/authSlices/auth.selector';
import { HttpService } from '@/app/services/base.service';
import { settingTargetService } from '@/app/services/targets.service';
import { TargetStats } from './components/TargetStats';
import { TargetTable } from './components/TargetTable';

const Fiance = () => {
  const token = useSelector(selectToken);


  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  const clientInvoiceQuery = useQuery(['client-invoices-with-children'], () => {
    return clientInvoiceService.httpGetAllInvoicesWithChildren();
  })

  const targetsQuery = useQuery(['targets'], () => {
    return settingTargetService.httpGetAllSettingTargets(1, 20);
  });




  return (
    <section className="my-4  mx-8 px-4">
      <div className="grid grid-cols-12 gap-8">
        <FinancialStatus clientInvoiceQuery={clientInvoiceQuery} />
        <TargetStats targetsQuery={targetsQuery} clientInvoiceQuery={clientInvoiceQuery} />
      </div>

      <TargetTable />
    </section>
  );
};

export default Fiance;
