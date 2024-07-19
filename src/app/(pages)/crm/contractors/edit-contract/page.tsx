/* eslint-disable import/no-unresolved */
'use client';
import NoData from "@/app/component/noData";
import { withAuth } from "@/app/hoc/withAuth"
import { ICrmContract } from "@/app/interfaces/crm/crm-contract.interface";
import crmContractService from "@/app/services/crm/crm-contract.service";
import { Routes } from "@/app/utils/plans.utils";
import { Skeleton } from "antd";
import { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ContractPdf } from "../components/ContractPdf";
import CustomButton from "@/app/component/customButton/button";
import WhiteButton from "@/app/component/customButton/white";



function EditContractDocumentPage() {
    const [contract, setContract] = useState<ICrmContract | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        const id = searchParams.get('contractId');
        if (id) {
            getContract(id);
        }
    }, [searchParams])

    async function getContract(id: string) {
        setIsLoading(true);

        try {
            const response = await crmContractService.httpFindContractById(id);
            if (response.data) {
                setContract(response.data);
            }
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            if (err.response?.data) {
                toast.error("Unable to get the item");
            }
        } finally {
            setIsLoading(false);
        }

    }

    if (isLoading) {
        return <div className="grid grid-cols-2 gap-4">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
        </div>
    }

    if (!contract) {
        return <NoData
            title="Contract not found"
            description="The contract you are looking for does not exist"
            btnText="Back"
            link={`${Routes.CRM.Clients}`}
        />
    }

    return (
        <div className="mt-6 space-y-2 !pb-[39px]  mx-4 ">
            <div className="my-4 flex justify-end space-x-3 items-center">
                <WhiteButton
                    text="Cancel"
                    className="!w-fit"
                />
                <CustomButton
                    text="Send Contract"
                    className="!w-fit"
                />
            </div>
            <ContractPdf
                mode="edit-fields"
                contract={contract}
                pdfFile={contract.file.url}
            />
        </div>
    )
}

export default withAuth(EditContractDocumentPage)
