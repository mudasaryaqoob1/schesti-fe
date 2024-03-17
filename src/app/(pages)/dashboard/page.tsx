'use client';
import ProjectsReport from './components/ProjectReport';
import SenaryHeading from '@/app/component/headings/senaryHeading';
const InvoiceReport = dynamic(() => import('./components/InvoiceReport'), {
  ssr: false,
});
const StatisticsReport = dynamic(
  () => import('./components/StatisticsReport'),
  {
    ssr: false,
  }
);
import { AdsManagement } from './components/AdsManagement';
import { HttpService } from '@/app/services/base.service';
import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectToken } from '@/redux/authSlices/auth.selector';
import { TotalCost } from './components/TotalCost';
import dynamic from 'next/dynamic';
import { useQuery } from 'react-query';
import { userService } from '@/app/services/user.service';
import { estimateRequestService } from '@/app/services/estimates.service';
import { ProjectDetails } from './components/ProjectDetails';
import { clientInvoiceService } from '@/app/services/client-invoices.service';
import { meetingService } from '@/app/services/meeting.service';
import { withAuth } from '@/app/hoc/withAuth';
const Dashboard = () => {
  const token = useSelector(selectToken);

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);
  const clientQuery = useQuery('clients', () => {
    return userService.httpGetAllCompanyClients();
  });

  const estimateQuery = useQuery('estimates', () => {
    return estimateRequestService.httpGetAllGeneratedEstimatesWithoutLimit();
  });

  const invoiceQuery = useQuery(['client-invoices'], () =>
    clientInvoiceService.httpGetAllInvoices()
  );
  const meetingQuery = useQuery(['meetings'], () =>
    meetingService.httpGetMeetings()
  );

  return (
    <section className="my-4  mx-8 px-4">
      <TotalCost clientQuery={clientQuery} estimateQuery={estimateQuery} />

      <div className="grid grid-cols-12 gap-3">
        <InvoiceReport invoiceQuery={invoiceQuery} />
        <div className="col-span-5 flex flex-col space-y-8 p-3 shadow-lg border border-t bg-white rounded-md px-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[18px] text-[#344054] leading-[28px] font-semibold">
              Projects
            </h3>
          </div>
          <div className="mx-auto w-48">
            <ProjectsReport
              estimateQuery={estimateQuery}
              invoiceQuery={invoiceQuery}
              meetingQuery={meetingQuery}
            />
          </div>
          <ProjectDetails
            estimateQuery={estimateQuery}
            invoiceQuery={invoiceQuery}
            meetingQuery={meetingQuery}
          />
        </div>
      </div>

      <div className="my-4 shadow-lg bg-white rounded-md p-4 border border-t">
        <div className="flex justify-between items-center">
          <h3 className="text-[18px] text-[#344054] leading-[28px] font-semibold">
            Statistics
          </h3>
          <div className="p-5 flex items-center space-x-4">
            <div className="flex justify-between">
              <div className="flex gap-3 items-center">
                <span className="w-3 h-3 bg-[#7F56D9]" />
                <SenaryHeading title="Takeoff" />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-3 items-center">
                <span className="w-3 h-3 bg-[#EF9F28]" />

                <SenaryHeading title="Estimate" />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-3 items-center">
                <span className="w-3 h-3 bg-[#27AE60]" />

                <SenaryHeading title="Scheduled " />
              </div>
            </div>
          </div>
        </div>
        <StatisticsReport />
      </div>

      <AdsManagement />
    </section>
  );
};

export default withAuth(Dashboard);
