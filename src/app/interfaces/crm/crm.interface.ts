import { IUserInterface } from "../user.interface"

export type CrmModuleType = 'clients' | "partners" | "subcontractors" | "vendors" | "architects" | "contractors";

type ICrmBase = {
    firstName: string
    lastName: string
    companyName: string
    email: string
    phone: string
    status: boolean
    address: string;
    module: CrmModuleType;
    secondAddress: string
    associatedCompany: string | IUserInterface;
    _id: string
    createdAt: string;
    updatedAt: string;
}

export type ICrmSubcontractorModule = {
    companyRep: string;
    trades: string[];
    type: "subcontractors";
} & Omit<ICrmBase, "firstName" | "lastName">;


export type ICrmItem = ICrmBase;