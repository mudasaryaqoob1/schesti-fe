// import React, { useCallback, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { UseQueryResult } from 'react-query';
import { IResponseInterface } from '@/app/interfaces/api-response.interface';
import { IEstimateRequest } from '@/app/interfaces/estimateRequests/estimateRequests.interface';
import { IClientInvoice } from '@/app/interfaces/client-invoice.interface';
import { IMeeting } from '@/app/interfaces/meeting.type';
ChartJS.register(ArcElement, Tooltip, Legend);
const LABELS = [
  'Takeoff',
  'Estimate Project',
  'Invoices ',
  'Scheduled Project',
  'Meeting',
];

const COLORS = ['#001556', '#7F56D9', '#36B37E', '#EF9F28', '#B58905'];
type Props = {
  estimateQuery: UseQueryResult<IResponseInterface<{ generatedEstimates: IEstimateRequest[]; }>>;
  invoiceQuery: UseQueryResult<IResponseInterface<{
    invoices: IClientInvoice[];
  }>, unknown>;
  meetingQuery: UseQueryResult<IResponseInterface<{
    meetings: IMeeting[];
  }>, unknown>;
}
export default function ProjectsReport({ estimateQuery, invoiceQuery, meetingQuery }: Props) {
  const estimateLength = estimateQuery.data ? estimateQuery.data.data!.generatedEstimates.length : 0;
  const invoiceLength = invoiceQuery.data ? invoiceQuery.data.data!.invoices.length : 0;
  const meetingLength = meetingQuery.data ? meetingQuery.data.data!.meetings.length : 0;
  const VALUES = [25, estimateLength, invoiceLength, 16, meetingLength];

  return (
    <Doughnut
      data={{
        labels: LABELS,
        datasets: [{ data: VALUES, backgroundColor: COLORS }],
      }}
      options={{
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
}
