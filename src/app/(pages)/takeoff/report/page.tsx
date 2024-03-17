'use client';
import Button from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import Image from 'next/image';
import SenaryHeading from '@/app/component/headings/senaryHeading';
import CaptureComponent from '@/app/component/captureComponent';
import { useContext, useState } from 'react';
import {
  DrawHistoryContext,
  ReportDataContext,
  UploadFileContext,
} from '../context';
import { DrawHistoryContextProps } from '../context/DrawHistoryContext';
import generatePDF from '@/app/component/captureComponent/generatePdf';

const Report = () => {
  const { drawHistory } = useContext(
    DrawHistoryContext
  ) as DrawHistoryContextProps;
  const [name, setName] = useState('');
  const [save, setSave] = useState(0);
  const [saveLoader, setSaveLoader] = useState(false);
  return (
    <>
      <section className="md:px-16 px-8 pb-4">
        <div className="flex gap-4 items-center mt-6">
          <Image src={'/home.svg'} alt="home icon" width={20} height={20} />
          <Image
            src={'/chevron-right.svg'}
            alt="chevron-right icon"
            width={16}
            height={16}
          />
          <SenaryHeading title="Takeoff" className="font-base text-slateGray" />
          <Image
            src={'/chevron-right.svg'}
            alt="chevron-right icon"
            width={16}
            height={16}
          />

          <SenaryHeading
            title="Add new client"
            className="font-semibold text-lavenderPurple cursor-pointer underline"
          />
        </div>

        {/* search project */}
        <div className="bg-white flex justify-between items-center mt-6 ">
          <div className="flex items-end">
            <div
              className="rounded-lg border border-Gainsboro bg-silverGray  h-[51px] 
                        flex 
                        items-center
                            px-3"
            >
              <input
                type="name"
                name=""
                id=""
                placeholder="Enter project name"
                className="w-full h-full
          bg-transparent outline-none"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Button
                text="Generate Report"
                onClick={() => generatePDF('capture')}
              />
            </div>
          </div>
        </div>
        <Button
          text="Save"
          disabled={saveLoader || save > 0}
          isLoading={saveLoader}
          onClick={() => {
            setSaveLoader(true);
            setSave(1);
          }}
          className="disabled:opacity-50"
        />
      </section>
      <CaptureComponent
        name={name}
        save={save}
        onSaveSuccess={() => {
          setSaveLoader(false);
        }}
      />
    </>
  );
};

export default Report;
