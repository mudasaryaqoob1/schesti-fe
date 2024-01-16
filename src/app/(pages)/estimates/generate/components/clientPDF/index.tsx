import React from 'react';
import { Document, Page } from '@react-pdf/renderer';
import { PdfHeader } from './Header';
import { PdfFooter } from './Footer';
import { PageContent } from './content';
import { PdfData } from './type';

type Props = {
  data: PdfData;
};

const ClientPDF = ({ data }: Props) => {
  return (
    <Document>
      <Page size={'A4'}>
        <PdfHeader />
        <PageContent data={data} />
        <PdfFooter />
      </Page>
    </Document>
  );
};

export default ClientPDF;
