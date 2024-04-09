import SenaryHeading from '@/app/component/headings/senaryHeading';
import { IResponseInterface } from '@/app/interfaces/api-response.interface';
import { IDashboardStats } from '@/app/interfaces/companyInterfaces/companyClient.interface';
import { UseQueryResult } from 'react-query';

type Props = {
  fetchDashboardState: UseQueryResult<IResponseInterface<IDashboardStats>>;
};

export function ProjectDetails({ fetchDashboardState }: Props) {
  let { data } = fetchDashboardState;
  return (
    <div className="px-5 space-y-5">
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <span className="w-3 h-3 bg-midnightBlue2" />
          <SenaryHeading title="Takeoff Project" />
        </div>
        <SenaryHeading title={`${data?.data?.totalTakeoff}`} className="font-medium" />
      </div>
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <span className="w-3 h-3 bg-lavenderPurple" />

          <SenaryHeading title="Estimate Project" />
        </div>

        <SenaryHeading
          title={`${data?.data?.totalGeneratedEstimates}`}
          className="font-medium"
        />
      </div>
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <span className="w-3 h-3 bg-[#36B37E]" />

          <SenaryHeading title="Invoices " />
        </div>

        <SenaryHeading
          title={`${data?.data?.totalInvoices}`}
          className="font-medium"
        />
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 bg-goldenrodYellow" />

          <SenaryHeading title="Scheduled Project" />
        </div>
        <SenaryHeading title={`${data?.data?.totalSchedules}`} className="font-medium" />
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 bg-[#B58905]" />

          <SenaryHeading title="Meeting" />
        </div>
        <SenaryHeading
          title={`${data?.data?.totalMeetings}`}
          className="font-medium"
        />
      </div>
    </div>
  );
}
