import { createContext } from 'react';

export interface ReportDataInterface {
  projectName: string;
  pageLabel: string;
  comment: string | number;
  author: string;
  date: Date;
  status: string;
  color: string;
  layer: string;
  space: string;
  type: string;
}

export interface ReportDataContextProps {
  reportData: ReportDataInterface[];
  handleReportData: (data: ReportDataInterface[]) => void;
  updateProjectNameInReportData: (
    date: Date,
    pageNumber: string,
    newProjectName: string
  ) => void;
}

const ReportDataContext = createContext<ReportDataContextProps>({
  reportData: [],
  handleReportData: () => undefined,
  updateProjectNameInReportData: () => undefined,
});

export default ReportDataContext;
