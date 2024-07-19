import { ToolState } from "@/app/(pages)/crm/contractors/types";
import { FileInterface } from "../file.interface";
import { IUserInterface } from "../user.interface";
import { CrmType } from "./crm.interface";

export type CrmContractStatusType = 'pending' | 'signed' | 'draft' | "archive";

export interface ICrmContract{
    _id:string;
    createdAt:string;
    updatedAt:string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    status: CrmContractStatusType;
    file:FileInterface,

    companyPdf: string[]; // arrray of urls
    userPdf: string[]; // arrray of urls
    user: string | IUserInterface;
    receiver: string | CrmType;
    projectName: string;
    projectNo: string;
    tools: ToolState[]
}