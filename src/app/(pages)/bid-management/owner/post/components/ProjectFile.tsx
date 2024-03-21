import CustomButton from "@/app/component/customButton/button";
import TertiaryHeading from "@/app/component/headings/tertiary";
import type { RcFile } from "antd/es/upload";
import Dragger from "antd/es/upload/Dragger";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
    children?: React.ReactNode;
}
export function ProjectUploadFiles({ children }: Props) {
    const [files, setFiles] = useState<RcFile[]>([]);


    function removeFile(file: RcFile) {
        const newFiles = files.filter(f => f.uid !== file.uid);
        setFiles(newFiles);
    }
    return <div className=" bg-white shadow-2xl rounded-xl border p-4">
        <TertiaryHeading
            title="Upload File"
            className="text-[20px] leading-[30px]"
        />
        <div className="mt-4">
            <Dragger
                name={'file'}
                accept="image/*,gif,application/pdf"
                multiple={true}
                fileList={files}
                beforeUpload={(_file, FileList) => {
                    for (const file of FileList) {
                        const isLessThan2MB = file.size < 2 * 1024 * 1024;
                        if (!isLessThan2MB) {
                            toast.error('File size should be less than 2MB');
                            return false;
                        }
                    }
                    setFiles([...FileList]);
                    return false;
                }}
                style={{
                    borderStyle: "dashed",
                    borderWidth: 6
                }}
                itemRender={() => {
                    return null
                }}
            >
                <p className="ant-upload-drag-icon">
                    <Image
                        src={'/uploadcloud.svg'}
                        width={50}
                        height={50}
                        alt="upload"
                    />
                </p>
                <p className="text-[12px] py-2 leading-3 text-[#98A2B3]">Drop your image here, or browse</p>
                <p className="text-[12px] leading-3 text-[#98A2B3]">
                    PNG, GIF, JPG, Max size: 2MB
                </p>
            </Dragger>

            <div className="grid grid-cols-4 gap-4 mt-9">
                {files.map(file => {
                    return <div key={file.uid} className="border rounded">
                        <div className="bg-[#F4EBFF] flex items-center justify-between px-2 py-1 ">
                            <div className="flex items-center space-x-3">
                                <Image
                                    src={'/file-05.svg'}
                                    width={16}
                                    height={16}
                                    alt="file"
                                />
                                <p className="text-[#667085] text-[14px] leading-6">
                                    {file.name.slice(0, 12)}.{file.name.split('.').pop()}
                                </p>
                            </div>
                            <Image
                                src={'/trash.svg'}
                                width={16}
                                height={16}
                                alt="close"
                                className="cursor-pointer"
                                onClick={() => removeFile(file)}
                            />
                        </div>
                        <div className="p-2 h-[190px] w-[220px] relative">
                            {file.type.includes('image') ? <Image
                                alt="image"
                                src={URL.createObjectURL(file)}
                                layout="fill"
                                objectFit="cover"
                            /> :
                                <div className="relative mt-10 w-[100px] h-[100px] mx-auto">
                                    <Image
                                        alt="pdf"
                                        src={"/pdf.svg"}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>}
                        </div>
                    </div>
                })}
                {files.length > 0 ? <div className="place-self-center">
                    <CustomButton
                        text="Upload"
                        className=" !w-28"
                    />
                </div> : null}
            </div>
        </div>
        {children}
    </div>
}