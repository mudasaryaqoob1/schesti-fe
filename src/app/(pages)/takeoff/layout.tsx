'use client';
import { useState } from 'react';
import { DrawHistoryContext, UploadFileContext } from './context';
import { UploadFileData } from './context/UploadFileContext';
import { DrawHistoryContextInterface } from './context/DrawHistoryContext';
import { DrawInterface } from './types';

const TakeOffLayout: React.FC<any> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [uploadFileData, setUploadFileData] = useState<UploadFileData[]>([]);
  const [drawHistory, setDrawHistory] =
    useState<DrawHistoryContextInterface | null>(null);

  const handleSrc = (value: UploadFileData[]) => setUploadFileData(value);

  const handleDrawHistory = (key: string, value: DrawInterface) => {
    setDrawHistory((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <DrawHistoryContext.Provider value={{ drawHistory, handleDrawHistory }}>
      <UploadFileContext.Provider value={{ uploadFileData, handleSrc }}>
        <div>{children}</div>
      </UploadFileContext.Provider>
    </DrawHistoryContext.Provider>
  );
};

export default TakeOffLayout;
