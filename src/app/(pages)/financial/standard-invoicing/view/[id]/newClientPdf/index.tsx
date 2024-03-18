'use client';

import { Document, Page, } from '@react-pdf/renderer';
import { Header } from './Header';
import { PdfFooter } from './Footer';
import { PdfCompanyDetails } from './CompanyDetails';
import { ItemsTable } from './Table';
import { IInvoice } from '@/app/interfaces/invoices.interface';
import { IUpdateCompanyDetail } from '@/app/interfaces/companyInterfaces/updateCompany.interface';

type Props = {
  invoice: IInvoice;
  user: IUpdateCompanyDetail;
};

function NewClientPdf({ invoice, user }: Props) {
  return (
    <Document>
      <Page size={'A4'}>
        <Header brandingColor={user?.brandingColor} />
        <PdfCompanyDetails invoice={invoice} user={user} />
        <ItemsTable invoice={invoice} />
        <PdfFooter brandingColor={user?.brandingColor} />
      </Page>
    </Document>
  );
}

export default NewClientPdf;
