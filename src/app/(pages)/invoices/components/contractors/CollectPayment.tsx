import CustomButton from "@/app/component/customButton/button";
import { InputComponent } from "@/app/component/customInput/Input";
import { SelectComponent } from "@/app/component/customSelect/Select.component";
import { DateInputComponent } from "@/app/component/cutomDate/CustomDateInput";
import { IInvoice } from "@/app/interfaces/invoices.interface"
import TextArea from "antd/es/input/TextArea";

type Props = {
    invoice: IInvoice;
}
export function CollectPayment({ invoice }: Props) {
    console.log(invoice);
    return <div className="space-y-4">
        <InputComponent
            label="Amount"
            type="number"
            placeholder="Amount"
            name="amount"
        />

        <SelectComponent
            label="Payment Method"
            placeholder="Payment Method"
            name="method"
            field={{
                className: "mt-2"
            }}
        />

        <DateInputComponent
            label="Transaction date"
            name="transactionDate"
            inputStyle="border-gray-200"
        />

        <div className="space-y-1">
            <div>
                <label
                    className={'text-graphiteGray text-sm font-medium leading-6 capitalize'}>
                    Addition details
                </label>
                <p className="text-xs text-[#98A2B3]">Here you can add any additional details related to the payment</p>
            </div>
            <TextArea
                name="additionDetails"
            />
        </div>
        <CustomButton
            text="Save"
        />
    </div>
}