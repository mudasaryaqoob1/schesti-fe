'use client'
import SenaryHeading from "@/app/component/headings/senaryHeading"
import { withAuth } from "@/app/hoc/withAuth"
import { useEffect, useState } from "react"
import { ToolState } from "../types";
import { useSearchParams } from "next/navigation";
import { ICrmContract } from "@/app/interfaces/crm/crm-contract.interface";
import crmContractService from "@/app/services/crm/crm-contract.service";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Skeleton } from "antd";
import NoData from "@/app/component/noData";
import { Routes } from "@/app/utils/plans.utils";
import { ContractInfo } from "../components/info/ContractInfo";
import { ContractPdf } from "../components/ContractPdf";

function ViewContract() {
    const [activeTab, setActiveTab] = useState("sender");
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();
    const [tools, setTools] = useState<ToolState[]>([]);
    const id = searchParams.get('id');
    const [contract, setContract] = useState<ICrmContract | null>(null);

    useEffect(() => {
        // const receiver = searchParams.get('receiver');
        if (id) {
            getContract(id);
        }
    }, [id])

    async function getContract(id: string) {
        setIsLoading(true);

        try {
            const response = await crmContractService.httpFindContractById(id);
            if (response.data) {
                setContract(response.data);
                setTools(response.data.tools);
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
            link={`${Routes.CRM.Contractors}`}
        />
    }


    return <div className="mt-4 space-y-3 p-5 !pb-[39px]  mx-4 ">
        <SenaryHeading
            title="Contract Information"
            className="!text-[24px] text-schestiPrimaryBlack leading-6 font-semibold"
        />

        <div className="flex justify-between items-center">

            <div className="px-2 flex py-2 bg-white rounded-md">
                <p className={`py-2 px-3 ${activeTab === 'sender' ? "font-semibold bg-schestiPrimary text-white" : "font-normal"}  cursor-pointer rounded-md `} onClick={() => setActiveTab('sender')}>
                    Sender
                </p>

                <p className={`py-2 px-3 ${activeTab === 'receiver' ? "font-semibold bg-schestiPrimary text-white" : "font-normal"}  cursor-pointer rounded-md `} onClick={() => setActiveTab('receiver')}>
                    Receiver
                </p>
            </div>

        </div>

        <div className="p-4 m-4 bg-white rounded-md ">
            <ContractInfo contract={contract} />

            <div className="mt-5 w-fit mx-auto">
                <ContractPdf
                    contract={contract}
                    mode={activeTab === 'sender' ? "view-fields" : "view-values"}
                    pdfFile={contract.file.url}
                    setTools={setTools}
                    tools={tools}
                />
            </div>
        </div>
    </div>
}

export default withAuth(ViewContract)