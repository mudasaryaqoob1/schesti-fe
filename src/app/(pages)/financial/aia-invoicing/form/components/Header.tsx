import CustomButton from "@/app/component/customButton/button";
import WhiteButton from "@/app/component/customButton/white";
import TertiaryHeading from "@/app/component/headings/tertiary";
import { IAIAInvoice } from "@/app/interfaces/client-invoice.interface"
import { QRCode } from "antd"

type Props = {
    parentInvoice: IAIAInvoice;
}
export function AIAInvoiceFormHeader({ parentInvoice }: Props) {

    return <div className="p-5 shadow-md flex justify-between items-center rounded-lg border border-silverGray  bg-white">
        <div className="flex space-x-3">
            <TertiaryHeading title="Invoice name:" className="font-medium" />
            <TertiaryHeading title={`${parentInvoice.invoiceName}`} />
        </div>

        <div className="flex items-center space-x-2">
            <QRCode
                value={parentInvoice._id}
                size={60}
            />

            <WhiteButton
                text='Send SMS'
                className='!w-fit'
            />

            <WhiteButton
                text='Email'
                className='!w-fit !bg-schestiLightPrimary !border-schestiLightPrimary'
            />
            <CustomButton
                text='Download invoice'
                className='!w-fit'
            />
        </div>
    </div>
}