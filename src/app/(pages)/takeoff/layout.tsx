"use client";
import { useState } from "react";
import { UploadFileContext } from "./context";

const TakeOffLayout: React.FC<any> = ({ children }: { children: React.ReactNode }) => {
const [src, setSrc] = useState<string>("")

const handleSrc = (value : string) => setSrc(value)
    
  return  <UploadFileContext.Provider value={{src, handleSrc}} ><div>{children}</div></UploadFileContext.Provider> ;
};

export default TakeOffLayout;
