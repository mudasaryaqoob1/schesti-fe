'use client';
import { IInvoice } from "@/app/interfaces/invoices.interface";
import { Document, Page } from "@react-pdf/renderer";
import { Header } from "./Header";
import { PdfFooter } from "./Footer";
import { PdfCompanyDetails } from "./CompanyDetails";
import { IUpdateCompanyDetail } from "@/app/interfaces/companyInterfaces/updateCompany.interface";

type Props = {
    invoice: IInvoice;
    user: IUpdateCompanyDetail;
};
function NewClientPdf({ invoice, user }: Props) {
    return <Document>
        <Page size={'A4'}>
            <Header brandingColor={user?.brandingColor} />
            <PdfCompanyDetails invoice={invoice} user={user} />
            <PdfFooter brandingColor={user?.brandingColor} />
        </Page>
    </Document>
}

export default NewClientPdf;