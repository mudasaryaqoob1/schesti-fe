import { IUserInterface } from "../user.interface"

export interface ICrmVendor {
    firstName: string
    lastName: string
    companyName: string
    email: string
    phone: string
    status: boolean
    address: string
    secondAddress: string
    associatedCompany: string | IUserInterface;
    _id: string
    createdAt: string;
    updatedAt: string;
}