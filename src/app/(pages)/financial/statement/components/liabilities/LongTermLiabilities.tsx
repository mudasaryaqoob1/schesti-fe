import type { FormikProps } from "formik"
import { IFinancialStatementCalculatedValues, IFinancialStatementState } from "../../types"
import { NumberInputComponent } from "@/app/component/customInput/NumberInput"
import { USCurrencyFormat } from "@/app/utils/format";

type Props = {
  formik: FormikProps<IFinancialStatementState>;
  calculatedValues: IFinancialStatementCalculatedValues;
}
export function LongTermLiabilitiesTable({ formik, calculatedValues }: Props) {
  return <table className="w-full">
    <thead>
      <tr className="bg-schestiPrimaryBG rounded-md">
        <th className=" py-4 rounded-tl-lg ">Long Term Liabilities</th>
        <th className="py-4 ">Amount</th>
        <th className="py-4 rounded-tr-lg">Total</th>
      </tr>
    </thead>

    <tbody className="text-sm">
      <tr className="border-b border-border dark:border-border">
        <td className="p-4">Shareholder Payable</td>
        <td className="p-4 text-center max-w-12">
          <NumberInputComponent
            label=""
            name="liabilities.shareHoldersPayable"
            prefix="$"
            placeholder=""
            field={{
              className: "",
              value: formik.values.liabilities.shareHoldersPayable ? formik.values.liabilities.shareHoldersPayable : undefined,
              onChange: val => {
                formik.setFieldValue('liabilities.shareHoldersPayable', Number(val))
              }
            }}
          />
        </td>
        <td className="p-4"></td>
      </tr>

      <tr className="border-b border-border dark:border-border">
        <td className="p-4">Total Long Term Liabilities</td>
        <td className="p-4 text-center max-w-12">
          <NumberInputComponent
            label=""
            name="liabilities.totalLongTermLiabilities"
            prefix="$"
            placeholder=""
            field={{
              className: "",
              value: formik.values.liabilities.totalLongTermLiabilities ? formik.values.liabilities.totalLongTermLiabilities : undefined,
              onChange: val => {
                formik.setFieldValue('liabilities.totalLongTermLiabilities', Number(val))
              }
            }}
          />
        </td>
        <td className="p-4"></td>
      </tr>



      {/* Footer */}

      <tr className="border-b border-border dark:border-border">
        <td className="p-4 font-bold">Total Liabilities</td>
        <td className="p-4"></td>
        <td className="p-4 font-bold text-center">{USCurrencyFormat.format(calculatedValues.liabilities.totalLiabilities())}</td>
      </tr>
    </tbody>
  </table>
}
