import CustomButton from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { IAIAInvoice } from '@/app/interfaces/client-invoice.interface';
import { QRCode } from 'antd';
import { useState } from 'react';

type Props = {
  parentInvoice: IAIAInvoice;
  onDownloadInvoice?: () => void;
};
export function AIAInvoiceFormHeader({ parentInvoice, onDownloadInvoice }: Props) {
  const [isDownloading, setIsDownloading] = useState(false);

  function handleDownload() {
    setIsDownloading(true);
    if (onDownloadInvoice) {
      onDownloadInvoice();
    }
    setIsDownloading(false);
  }

  return (
    <div className="p-5 shadow-md flex justify-between items-center rounded-lg border border-silverGray  bg-white">
      <div className="flex space-x-3">
        <TertiaryHeading title="Invoice name:" className="font-medium" />
        <TertiaryHeading title={`${parentInvoice.invoiceName}`} />
      </div>

      <div className="flex items-center space-x-2">
        <QRCode value={parentInvoice._id} size={60} />

        <WhiteButton text="Send SMS" className="!w-fit" />

        <WhiteButton
          text="Email"
          className="!w-fit !bg-schestiLightPrimary !border-schestiLightPrimary"
        />
        <CustomButton text="Download invoice" className="!w-fit" onClick={handleDownload} isLoading={isDownloading} />
      </div>
    </div>
  );
}
