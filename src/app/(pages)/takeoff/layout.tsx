'use client';
import { useState } from 'react';
import { DrawHistoryContext, ScaleContext, UploadFileContext } from './context';
import { UploadFileData } from './context/UploadFileContext';
import { DrawHistoryContextInterface } from './context/DrawHistoryContext';
import { DrawInterface } from './types';
import { ScaleDataContextInterface } from './context/ScaleContext';

const TakeOffLayout: React.FC<any> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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

  const handleDrawHistory = (key: string, value: DrawInterface) => {
    setDrawHistory((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <DrawHistoryContext.Provider value={{ drawHistory, handleDrawHistory }}>
      <UploadFileContext.Provider value={{ uploadFileData, handleSrc }}>
        <ScaleContext.Provider value={{ scaleData, handleScaleData }}>
          <div>{children}</div>
        </ScaleContext.Provider>
      </UploadFileContext.Provider>
    </DrawHistoryContext.Provider>
  );
};

export default TakeOffLayout;
