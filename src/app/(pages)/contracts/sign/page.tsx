'use client';
import Image from 'next/image';
import { ContractInfo } from '../components/info/ContractInfo';
import { ContractPdf } from '../components/ContractPdf';
import { ContractPartyType, ICrmContract } from '@/app/interfaces/crm/crm-contract.interface';
import { useEffect, useRef, useState } from 'react';
import { ToolState } from '../types';
import { useSearchParams } from 'next/navigation';
import crmContractService from '@/app/services/crm/crm-contract.service';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { Routes } from '@/app/utils/plans.utils';
import NoData from '@/app/component/noData';
import { Skeleton } from 'antd';
import CustomButton from '@/app/component/customButton/button';
import { parseEmailFromQuery } from '@/app/utils/utils';

export default function SignPdfContract() {
  const [contract, setContract] = useState<ICrmContract | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  let receiptEmail = searchParams.get('email');
  const [isSaving, setIsSaving] = useState(false);
  const [tools, setTools] = useState<ToolState[]>([]);
  const [receipt, setReceipt] = useState<ContractPartyType | null>(null);
  const contractPdfRef = useRef<{
    handleAction: () => void;
  } | null>(null);

  useEffect(() => {
    // const receiver = searchParams.get('receiver');
    if (id) {
      getContract(id);
    }
  }, [id]);

  async function getContract(id: string) {
    setIsLoading(true);

    try {
      const response = await crmContractService.httpFindContractById(id);
      if (response.data) {
        setContract(response.data);
        receiptEmail = parseEmailFromQuery(receiptEmail);
        const receipt = response.data.receipts.find(r => r.email === receiptEmail);
        if (receipt) {
          setReceipt(receipt);
          setTools(receipt.tools);
        }
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      if (err.response?.data) {
        toast.error('Unable to get the item');
      }
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    );
  }

  if (!contract || !receipt) {
    return (
      <NoData
        title="Contract not found"
        description="The contract you are looking for does not exist"
        btnText="Back"
        link={`${Routes.Contracts}`}
      />
    );
  }


  const isAbleToSend = receipt.tools.every(tool => tool.value == undefined);

  async function signContract(id: string, receipt: ContractPartyType) {
    if (id) {
      setIsSaving(true);
      const canSubmit = receipt.tools.every(tool => tool.value != undefined);
      if (!canSubmit) {
        toast.error('All fields must have a value');
        setIsSaving(false);
        return;
      }
      try {
        const response = await crmContractService.httpSignContract(
          id,
          receipt
        );
        if (response.data) {
          toast.success('Contract signed successfully');
          setContract(response.data);
          const updatedReceipt = response.data.receipts.find(r => r.email === receipt.email);
          if (updatedReceipt) {
            setReceipt(updatedReceipt);
            setTools(updatedReceipt.tools);
          }
        }
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        if (err.response?.data) {
          toast.error(err.response?.data.message);
        }
      } finally {
        setIsSaving(false);
      }
    }
  }




  return (
    <div>
      <div className="bg-white p-4 shadow-secondaryShadow">
        <Image src={'/logo.svg'} alt="logo" height={40} width={100} />
      </div>
      <div className="my-4 flex mx-5 justify-end">

        {isAbleToSend ? <CustomButton
          text="Send Back"
          className="!w-fit"
          onClick={() => signContract(contract._id, { ...receipt, tools })}
          isLoading={isSaving}
        /> : <CustomButton
          text='Download'
          className='!w-fit'
          onClick={() => {
            contractPdfRef.current?.handleAction();
          }}
        />}
      </div>
      <div className="p-4 m-4 bg-white rounded-md ">
        <ContractInfo contract={contract} receiver={receipt} />

        <div className="mt-5 w-fit mx-auto">
          <ContractPdf
            contract={contract}
            mode={'add-values'}
            pdfFile={contract.file.url}
            tools={tools}
            setTools={setTools}
            color={receipt.color}
            ref={contractPdfRef}
          />
        </div>
      </div>
    </div>
  );
}
