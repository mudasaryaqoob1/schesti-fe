'use client';
import Button from '@/app/component/customButton/button';
import Image from 'next/image';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import * as Yup from 'yup';
import TertiaryHeading from '@/app/component/headings/tertiary';
import FormControl from '@/app/component/formControl';
import { Formik, Form } from 'formik';
import { PhoneNumberInputWithLable } from '@/app/component/phoneNumberInput/PhoneNumberInputWithLable';
import CustomButton from '@/app/component/customButton/button';
import { IClient } from '@/app/interfaces/companyInterfaces/companyClient.interface';
import { PhoneNumberRegex } from '@/app/utils/regex.util';
import { userService } from '@/app/services/user.service';
import { toast } from 'react-toastify';
import { Progress } from 'antd';

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  files?: any,
  pages?: any,
  isLoading?: boolean
  processFiles?:any
  fullData?:any
}

const CreateProgressModal = ({ setModalOpen, pages, files, isLoading, processFiles, fullData }: Props) => {
  const [fLoading, setfLoading] = useState<boolean>(false)
  const getLoading = () => {
    let trueArr = [];
    for(let i = 0; i<fullData?.files;i++){
      const totalPages = fullData?.files[i]?.totalPages;
      const filteredArr = fullData?.pages?.filter((i:any)=>{return i?.file?.name == fullData?.files[i]?.name})
      if(filteredArr?.length == totalPages){
        trueArr.push(true)
      }else{
        trueArr.push(false)
      }
    }
    if(trueArr?.every((i:any)=>{return i == true})){
      return false
    }else{
      return true
    }
  }
  console.log(getLoading(), " ===> Get loading");
  useEffect(()=>{
    setfLoading(getLoading)
  },[fullData])
  
  return (
    <div className="py-2.5 px-6 bg-white border border-solid border-elboneyGray rounded-[4px] z-50">
      <section className="w-full">
        <div className="flex justify-between items-center border-b-Gainsboro ">
          <div>
            <QuaternaryHeading
              title="Create Progress"
              className="text-graphiteGray font-bold"
            />
            {/* <QuinaryHeading
              title="Select any existing client from here."
              className="text-coolGray"
            /> */}
          </div>
          {/* <Image
            src={'/crossblack.svg'}
            alt="close icon"
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={() => setModalOpen(false)}
          /> */}
        </div>
        <div
          className="p-5 flex flex-col rounded-lg border border-silverGray shadow-secondaryShadow2 bg-white"
        >
          <TertiaryHeading
            className="text-graphiteGray mb-4 "
            title="Processing Files"
          />
          <p>This is one time process and might take few minutes. Kindly don't close or reload tabs to continue.</p>
          <div className='flex flex-col gap-y-10 w-full p-5'>
            {
              files && Array.isArray(files) && files?.length > 0 && files?.map((item: any, index: number) => {
                const successProgress = fullData?.pages?.filter((i:any)=>{return (i?.file?.name == item?.name && i?.success == true)})
                const failedProgress = fullData?.pages?.filter((i:any)=>{return (i?.file?.name == item?.name && i?.success == false)})
                const totalProgress = fullData?.pages?.filter((i:any)=>{return i?.file?.name == item?.name})

                return <div className='flex gap-2 flex-col'>
                  <div className='flex gap-2'>
                    <p className='whitespace-nowrap'>{item?.name?.slice(0,12) ?? ''}</p>
                    <Progress percent={(totalProgress && Array.isArray(totalProgress)? totalProgress?.length : 0)} />
                  </div>
                  <div className='flex gap-3'>
                    <Progress size={'small'} type='circle' percent={(successProgress && Array.isArray(successProgress)? successProgress?.length : 0)} />
                    <Progress size={'small'} type='circle' percent={(failedProgress && Array.isArray(failedProgress)? failedProgress?.length : 0)} status='exception' />
                  </div>
                </div>
              })
            }
          </div>
          <div className="self-end flex justify-end items-center gap-5 md:mt-4 my-3">
            {!isLoading && <div>
              <CustomButton
                className=" !border-celestialGray !shadow-scenarySubdued2 !text-graphiteGray !bg-snowWhite"
                text="Cancel"
                onClick={() => { setModalOpen(false) }}//router.back()
                isLoading={isLoading}
              />
            </div>}
            <div>
              <CustomButton
                isLoading={isLoading}
                text="Start Process"
                onClick={()=>{if(processFiles){processFiles()}}}
              />
            </div>
          </div>
        </div>
      </section>
      {/* <div className="flex justify-end gap-4 mt-5 mb-2">
        <div>
          <Button
            text="Cancel"
            className="!bg-snowWhite !text-abyssalBlack !py-1.5 "
            onClick={() => setModalOpen(false)}
          />
        </div>
        <div>
          <Button
            text="Calibrate"
            onClick={handleCalibrate}
            className="!py-1.5"
          />
        </div>
      </div> */}
    </div>
  );
};

export default CreateProgressModal;
