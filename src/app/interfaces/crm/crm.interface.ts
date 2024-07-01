import { IUserInterface } from "../user.interface"

type ICrmModule = 'clients' | "partners" | "subcontractors" | "vendors" | "architects" | "contractors";

type ICrmBase = {
    firstName: string
    lastName: string
    companyName: string
    email: string
    phone: string
    status: boolean
    address: string;
    module: ICrmModule;
    secondAddress: string
    associatedCompany: string | IUserInterface;
    _id: string
    createdAt: string;
    updatedAt: string;
}

type ICrmSubcontractorModule = {
    companyRep: string;
    trades: string[];
} & ICrmBase;


export type ICrmItem = ICrmBase | ICrmSubcontractorModule