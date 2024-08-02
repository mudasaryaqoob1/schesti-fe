'use client';
import Image from 'next/image';
import { ContractInfo } from '../components/info/ContractInfo';
import { ContractPdf } from '../components/ContractPdf';
import { ContractPartyType, ICrmContract } from '@/app/interfaces/crm/crm-contract.interface';
import { useEffect, useState } from 'react';
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

  async function signContract() {
    if (id) {

      try {
        const response = await crmContractService.httpSignContract(
          id,
          []
        );
        if (response.data) {
          toast.success('Contract signed successfully');
          setContract(response.data);
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

        <CustomButton
          text="Send Back"
          className="!w-fit"
          onClick={signContract}
          isLoading={isSaving}
        />
      </div>
      <div className="p-4 m-4 bg-white rounded-md ">
        <ContractInfo contract={contract} receiver={receipt} />

        <div className="mt-5 w-fit mx-auto">
          <ContractPdf
            contract={contract}
            mode={'add-values'}
            pdfFile={contract.file.url}
            tools={tools}
            setTools={() => { }}
            color={receipt.color}
          />
        </div>
      </div>
    </div>
  );
}
