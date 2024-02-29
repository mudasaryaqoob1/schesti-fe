import SenaryHeading from "@/app/component/headings/senaryHeading";
import { IResponseInterface } from "@/app/interfaces/api-response.interface";
import { IClientInvoice } from "@/app/interfaces/client-invoice.interface";
import { IEstimateRequest } from "@/app/interfaces/estimateRequests/estimateRequests.interface";
import { IMeeting } from "@/app/interfaces/meeting.type";
import { UseQueryResult } from "react-query";

type Props = {
    estimateQuery: UseQueryResult<IResponseInterface<{ generatedEstimates: IEstimateRequest[]; }>>;
    invoiceQuery: UseQueryResult<IResponseInterface<{
        invoices: IClientInvoice[];
    }>, unknown>;
    meetingQuery: UseQueryResult<IResponseInterface<{
        meetings: IMeeting[];
    }>, unknown>;
}
export function ProjectDetails({ estimateQuery, invoiceQuery, meetingQuery }: Props) {
    return <div className="px-5 space-y-5">
        <div className="flex justify-between">
            <div className="flex gap-3 items-center">
                <span className="w-3 h-3 bg-midnightBlue2" />
                <SenaryHeading title="Takeoff Project" />
            </div>
            <SenaryHeading title="20" className="font-medium" />
        </div>
        <div className="flex justify-between">
            <div className="flex gap-3 items-center">
                <span className="w-3 h-3 bg-lavenderPurple" />

                <SenaryHeading title="Estimate Project" />
            </div>

            <SenaryHeading title={`${estimateQuery.isLoading
                ? 'Loading...'
                : estimateQuery.data && estimateQuery.data.data
                    ? estimateQuery.data.data.generatedEstimates.length
                    : 0}`} className="font-medium" />
        </div>
        <div className="flex justify-between">
            <div className="flex gap-3 items-center">
                <span className="w-3 h-3 bg-[#36B37E]" />

                <SenaryHeading title="Invoices " />
            </div>

            <SenaryHeading title={`${invoiceQuery.isLoading
                ? 'Loading...'
                : invoiceQuery.data && invoiceQuery.data.data
                    ? invoiceQuery.data.data.invoices.length
                    : 0}`} className="font-medium" />
        </div>
        <div className="flex justify-between">
            <div className="flex items-center gap-3">
                <span className="w-3 h-3 bg-goldenrodYellow" />

                <SenaryHeading title="Scheduled Project" />
            </div>
            <SenaryHeading title="65" className="font-medium" />
        </div>
        <div className="flex justify-between">
            <div className="flex items-center gap-3">
                <span className="w-3 h-3 bg-[#B58905]" />

                <SenaryHeading title="Meeting" />
            </div>
            <SenaryHeading title={`${meetingQuery.isLoading
                ? 'Loading...'
                : meetingQuery.data && meetingQuery.data.data
                    ? meetingQuery.data.data.meetings.length
                    : 0}`} className="font-medium" />
        </div>
    </div>
}