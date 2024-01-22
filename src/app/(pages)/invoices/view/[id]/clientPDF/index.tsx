import React from 'react';
import { Document, Page } from '@react-pdf/renderer';
import { PdfHeader } from './Header';
import { PdfFooter } from './Footer';
import { PageContent } from './content';
import { IInvoice } from '@/app/interfaces/invoices.interface';
// import { PdfData } from './type';

type Props = {
  invoice: IInvoice;
}

const ClientPDF = ({ invoice }: Props) => {

  return (
    <Document>
      <Page size={'A4'}>
        <PdfHeader />
        <PageContent
          invoice={invoice}
        />
        <PdfFooter />
      </Page>
    </Document>
  );
};

export default ClientPDF;
