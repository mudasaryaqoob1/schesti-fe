import React from 'react';
import { Document, Page } from '@react-pdf/renderer';
import { PdfHeader } from './Header';
import { PdfFooter } from './Footer';
import { PageContent } from './content';
// import { PdfData } from './type';

const ClientPDF = ({ data, subcostRecord, pdfData }: any) => {
  return (
    <Document>
      <Page size={'A4'}>
        <PdfHeader />
        <PageContent
          data={data}
          subcostRecord={subcostRecord}
          pdfData={pdfData}
        />
        <PdfFooter />
      </Page>
    </Document>
  );
};

export default ClientPDF;
