import { IResponseInterface } from "../interfaces/api-response.interface";
import { IInvoiceType } from "../interfaces/invoices.interface";
import { HttpService } from "./base.service";

type CreateInvoiceData = Omit<IInvoiceType['invoice'], 'id' | "_id" | "createdAt" | "updatedAt" | "__v">;
class InvoiceService extends HttpService {
    private readonly prefix: string = 'api/invoices';

    httpAddNewInvoice = (
        data: CreateInvoiceData
    ): Promise<IResponseInterface<IInvoiceType>> =>
        this.post(`${this.prefix}/createInvoice`, data);
}

export const invoiceService = new InvoiceService();