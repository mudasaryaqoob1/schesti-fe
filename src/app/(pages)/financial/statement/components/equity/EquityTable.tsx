import type { FormikProps } from "formik";
import { IFinancialStatementState } from "../../types";
import { NumberInputComponent } from "@/app/component/customInput/NumberInput";

type Props = {
  formik: FormikProps<IFinancialStatementState>;
}
export function EquityTable({ formik }: Props) {

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
                value: formik.values.equity.capitalStock ? formik.values.equity.capitalStock : undefined,
                onChange: val => {
                  formik.setFieldValue('equity.capitalStock', val as number)
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
                value: formik.values.equity.otherPaidInCapital ? formik.values.equity.otherPaidInCapital : undefined,
                onChange: val => {
                  formik.setFieldValue('equity.otherPaidInCapital', val as number)
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
                value: formik.values.equity.retainedEarnings ? formik.values.equity.retainedEarnings : undefined,
                onChange: val => {
                  formik.setFieldValue('equity.retainedEarnings', val as number)
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
          <td className="p-4 font-bold text-center">$52,358.00</td>
        </tr>
      </tbody>
    </table>
  );
}
