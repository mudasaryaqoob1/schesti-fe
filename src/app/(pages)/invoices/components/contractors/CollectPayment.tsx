import CustomButton from "@/app/component/customButton/button";
import { InputComponent } from "@/app/component/customInput/Input";
import { SelectComponent } from "@/app/component/customSelect/Select.component";
import { DateInputComponent } from "@/app/component/cutomDate/CustomDateInput";
import { IInvoice } from "@/app/interfaces/invoices.interface"
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useFormik } from "formik";
import * as Yup from 'yup';

type Props = {
    invoice: IInvoice;
}

const CollectPaymentSchema = Yup.object().shape({
    amount: Yup.number().required('Amount is required'),
    paymentMethod: Yup.string().required('Payment method is required'),
    transactionDate: Yup.string().required('Transaction date is required'),
    additionalDetails: Yup.string()
})

export function CollectPayment({ invoice }: Props) {

    const formik = useFormik({
        initialValues: {
            amount: invoice.amount,
            paymentMethod: invoice.paymentMethod,
            transactionDate: dayjs(new Date()),
            additionalDetails: ""
        },
        validationSchema: CollectPaymentSchema,
        onSubmit: (values) => {
            console.log(values);
        }
    });
    return <div >
        <form onSubmit={formik.handleSubmit} className="space-y-4">
            <InputComponent
                label="Amount"
                type="number"
                placeholder="Amount"
                name="amount"
                field={{
                    onChange: formik.handleChange,
                    value: formik.values.amount,
                    onBlur: formik.handleBlur,
                }}
            />

            <SelectComponent
                label="Payment Method"
                placeholder="Payment Method"
                name="method"
                field={{
                    className: "mt-2",
                    onChange: (value) => formik.setFieldValue("paymentMethod", value),
                    value: formik.values.paymentMethod,
                    onBlur: formik.handleBlur,
                    options: [
                        {
                            label: 'Cash',
                            value: 'cash'
                        },
                        {
                            label: 'Bank Transfer',
                            value: 'bankTransfer'
                        },
                        {
                            label: 'Cheque',
                            value: 'cheque'
                        },
                        {
                            label: 'Card',
                            value: 'card'
                        },
                        {
                            label: 'Other',
                            value: 'other'
                        }
                    ]
                }}
            />

            <DateInputComponent
                label="Transaction date"
                name="transactionDate"
                inputStyle="border-gray-200"
                fieldProps={{
                    onChange: (_, dateString) => formik.setFieldValue('transactionDate', dateString),
                    value: dayjs(formik.values.transactionDate),
                    onBlur: formik.handleBlur,
                    defaultValue: dayjs(new Date())
                }}
            />

            <div className="space-y-1">
                <div>
                    <label
                        className={'text-graphiteGray text-sm font-medium leading-6 capitalize'}>
                        Additional details
                    </label>
                    <p className="text-xs text-[#98A2B3]">Here you can add any additional details related to the payment</p>
                </div>
                <TextArea
                    name="additionalDetails"
                    value={formik.values.additionalDetails}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
            </div>
            <CustomButton
                text="Save"
                type="submit"
            />
        </form>

    </div>
}