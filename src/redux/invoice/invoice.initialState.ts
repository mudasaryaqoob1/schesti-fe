import { IInvoiceType } from "@/app/interfaces/invoices.interface";

interface IInvoiceState {
    loading: boolean;
    error?: string | null;
    message?: string | null;
    statusCode: number | null;
    data: IInvoiceType | null;
}

const initialInvoiceState: IInvoiceState = {
    loading: false,
    error: null,
    message: null,
    data: null,
    statusCode: null,
};

export default initialInvoiceState;
