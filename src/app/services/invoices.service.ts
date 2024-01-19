import { IResponseInterface } from "../interfaces/api-response.interface";
import { IInvoiceType } from "../interfaces/invoices.interface";
import { HttpService } from "./base.service";

export type CreateInvoiceData = {
    subContractorFirstName: string
    subContractorLastName: string
    subContractorPhoneNumber: number
    subContractorEmail: string
    subContractorAddress: string
    invoiceNumber: string
    projectName: string
    applicationNumber: string
    invoiceSubject: string
    issueDate: string
    dueDate: string
    discount: number
    taxes: number
    profitAndOverhead: string
    totalPayable: number
    invoiceItems: { [key: string]: any }[]
}
class InvoiceService extends HttpService {
    private readonly prefix: string = 'api/invoices';

    httpAddNewInvoice = (
        data: CreateInvoiceData
    ): Promise<IResponseInterface<IInvoiceType>> =>
        this.post(`${this.prefix}/createInvoice`, data);

    httpGetAllSubcontractorInvoices = (
        page: number,
        limit: number = 9
    ): Promise<IResponseInterface> =>
        this.get(`${this.prefix}/getInvoices?page=${page}&limit=${limit}`);

}

export const invoiceService = new InvoiceService();