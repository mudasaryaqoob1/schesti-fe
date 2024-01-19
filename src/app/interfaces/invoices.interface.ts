export interface IInvoiceType {
    invoices: IInvoice[]
}

export interface IInvoice {
    subContractorFirstName: string
    subContractorLastName: string
    subContractorPhoneNumber: string
    subContractorEmail: string
    subContractorAddress: string
    invoiceNumber: string
    projectName: string
    applicationNumber: string
    invoiceSubject: string
    issueDate: string
    dueDate: string
    invoiceItems: InvoiceItem[]
    discount: string
    taxes: string
    profitAndOverhead: string
    totalPayable: number
    associatedComapny: string
    _id: string
    __v: number
}

interface InvoiceItem {
    description: string
    quantity: number
    unitCost: number
    total: number
    _id: string
}
