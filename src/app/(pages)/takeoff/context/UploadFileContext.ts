import { createContext } from 'react';

export interface UploadFileData {
  src: string;
  width: number;
  height: number;
  pageNum?:number;
}

export interface UploadFileContextProps {
  uploadFileData: UploadFileData[];
  handleSrc: (data: UploadFileData[]) => void;
}

const UploadFileContext = createContext<UploadFileContextProps>({
  uploadFileData: [],
  handleSrc: () => undefined,
});

export default UploadFileContext;
