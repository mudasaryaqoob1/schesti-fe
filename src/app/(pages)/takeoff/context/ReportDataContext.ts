import { createContext } from 'react';
import {
  CountInterface,
  LineInterface,
  PolygonConfigInterface,
} from '../types';

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
  config: LineInterface | PolygonConfigInterface | CountInterface;
}

export interface ReportDataContextProps {
  reportData: ReportDataInterface[];
  handleReportData: (data: ReportDataInterface[]) => void;
  updateProjectNameInReportData: (
    date: Date,
    pageNumber: string,
    newProjectName: any
  ) => void;
  updateProjectColorInReportData:any;
}

const ReportDataContext = createContext<ReportDataContextProps>({
  reportData: [],
  handleReportData: () => undefined,
  updateProjectNameInReportData: () => undefined,
  updateProjectColorInReportData:()=> undefined
});

export default ReportDataContext;
