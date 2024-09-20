import type { FormikProps } from "formik";
import { IFinancialStatementCalculatedValues, IFinancialStatementState } from "../../types";
import { NumberInputComponent } from "@/app/component/customInput/NumberInput";
import { USCurrencyFormat } from "@/app/utils/format";

type Props = {
  formik: FormikProps<IFinancialStatementState>;
  calculatedValues: IFinancialStatementCalculatedValues;
}
export function EquityTable({ formik, calculatedValues }: Props) {

  return (
    <table className="w-full">
      <thead>
        <tr className="bg-schestiPrimaryBG rounded-md">
          <th className=" py-4 rounded-tl-lg ">Equity/Capital</th>
          <th className="py-4 ">Amount</th>
          <th className="py-4 rounded-tr-lg">Total</th>
        </tr>
      </thead>

      <tbody className="text-sm">
        <tr className="border-b border-border dark:border-border">
          <td className="p-4">Capital Stock</td>
          <td className="p-4 text-center max-w-12">
            <NumberInputComponent
              label=""
              name="equity.capitalStock"
              prefix="$"
              placeholder=""
              field={{
                className: "",
                value: formik.values.equity.capitalStock,
                onChange: val => {
                  formik.setFieldValue('equity.capitalStock', Number(val))
                }
              }}
            />
          </td>
          <td className="p-4"></td>
        </tr>

        <tr className="border-b border-border dark:border-border">
          <td className="p-4">Other Paid In Capital</td>
          <td className="p-4 text-center max-w-12">
            <NumberInputComponent
              label=""
              name="equity.otherPaidInCapital"
              prefix="$"
              placeholder=""
              field={{
                className: "",
                value: formik.values.equity.otherPaidInCapital,
                onChange: val => {
                  formik.setFieldValue('equity.otherPaidInCapital', Number(val))
                }
              }}
            />
          </td>
          <td className="p-4"></td>
        </tr>

        <tr className="border-b border-border dark:border-border">
          <td className="p-4">Retained Earnings</td>
          <td className="p-4 text-center max-w-12">
            <NumberInputComponent
              label=""
              name="equity.retainedEarnings"
              prefix="$"
              placeholder=""
              field={{
                className: "",
                value: formik.values.equity.retainedEarnings,
                onChange: val => {
                  formik.setFieldValue('equity.retainedEarnings', Number(val))
                }
              }}
            />
          </td>
          <td className="p-4"></td>
        </tr>

        {/* Footer */}

        <tr className="border-b border-border dark:border-border">
          <td className="p-4 font-bold">Subtotal Equity/Capital</td>
          <td className="p-4"></td>
          <td className="p-4 font-bold text-center">{USCurrencyFormat.format(calculatedValues.equity.subTotalEquity())}</td>
        </tr>
      </tbody>
    </table>
  );
}
