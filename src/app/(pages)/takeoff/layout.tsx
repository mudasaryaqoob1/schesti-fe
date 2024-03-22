'use client';
import { useState } from 'react';
import {
  DrawHistoryContext,
  ReportDataContext,
  ScaleContext,
  UploadFileContext,
} from './context';
import { UploadFileData } from './context/UploadFileContext';
import { DrawHistoryContextInterface } from './context/DrawHistoryContext';
import { DrawInterface } from './types';
import { ScaleDataContextInterface } from './context/ScaleContext';
import { ReportDataInterface } from './context/ReportDataContext';

const TakeOffLayout: React.FC<any> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [reportData, setReportData] = useState<ReportDataInterface[]>([]);
  const [uploadFileData, setUploadFileData] = useState<UploadFileData[]>([]);
  const [drawHistory, setDrawHistory] =
    useState<DrawHistoryContextInterface | null>(null);
  const [scaleData, setScaleData] = useState<ScaleDataContextInterface | null>(
    null
  );

  const handleSrc = (value: UploadFileData[]) => setUploadFileData(value);

  const handleScaleData = (value: ScaleDataContextInterface) => {
    setScaleData(value);
  };

  const deleteDrawHistory = (pageNumber: string, value: DrawInterface) => {
    setDrawHistory((prev) => ({ ...prev, [pageNumber]: value }));
  };

  const updateDrawHistory = (pageNumber: string, shape: string, value: any) => {
    setDrawHistory((prev) => {
      if (prev && !!(prev as any)?.[pageNumber]?.[shape]) {
        return {
          ...prev,
          [pageNumber]: {
            ...prev[pageNumber],
            [shape]: [...(prev as any)[pageNumber][shape], value],
          },
        };
      } else {
        return {
          ...prev,
          [pageNumber]: {
            ...prev?.[pageNumber],
            [shape]: [value],
          },
        } as any;
      }
    });
  };

  const handleReportData = (data: ReportDataInterface[]) => setReportData(data);

  const updateProjectNameInReportData = (
    date: Date,
    pageNumber: string,
    newProjectName: string
  ) => {
    setReportData((prev) => {
      return prev.map((item) => {
        if (
          new Date(item.date).valueOf() === new Date(date).valueOf() &&
          item.pageLabel === pageNumber
        ) {
          return {
            ...item,
            projectName: newProjectName,
          };
        } else return item;
      });
    });
  };

  return (
    <ReportDataContext.Provider
      value={{ reportData, handleReportData, updateProjectNameInReportData }}
    >
      <DrawHistoryContext.Provider
        value={{
          drawHistory,
          deleteDrawHistory,
          updateDrawHistory,
        }}
      >
        <UploadFileContext.Provider value={{ uploadFileData, handleSrc }}>
          <ScaleContext.Provider value={{ scaleData, handleScaleData }}>
            {children}
          </ScaleContext.Provider>
        </UploadFileContext.Provider>
      </DrawHistoryContext.Provider>
    </ReportDataContext.Provider>
  );
};

export default TakeOffLayout;
