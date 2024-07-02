import { IUserInterface } from "../user.interface"

export type CrmModuleType = 'clients' | "partners" | "subcontractors" | "vendors" | "architects" | "contractors";


type ICrmBase = {
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

export type CommonCrmType = Omit<ICrmBase, "_id" | "createdAt" | "updatedAt" | "module" | "associatedCompany">

export type ICrmSubcontractorModule = {
    companyRep: string;
    trades: string[];
    module: "subcontractors";
} & ICrmBase;


export type ICrmItem = ICrmBase & {
    firstName: string;
    lastName: string;
    module: "clients" | "partners" | "vendors" | "architects" | "contractors";
};

export type CrmType = ICrmItem | ICrmSubcontractorModule;