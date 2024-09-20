import type { FormikProps } from "formik";
import { IFinancialStatementCalculatedValues, IFinancialStatementState } from "../../types";
import { NumberInputComponent } from "@/app/component/customInput/NumberInput";
import { USCurrencyFormat } from "@/app/utils/format";

type Props = {
  formik: FormikProps<IFinancialStatementState>;
  calculatedValues: IFinancialStatementCalculatedValues;
}
export function CurrentLiabilitiesTable({ formik, calculatedValues }: Props) {

  return (
    <table className="w-full">
      <thead>
        <tr className="bg-schestiPrimaryBG rounded-md">
          <th className=" py-4 rounded-tl-lg ">Current Liabilities</th>
          <th className="py-4 ">Amount</th>
          <th className="py-4 rounded-tr-lg">Total</th>
        </tr>
      </thead>

      <tbody className="text-sm">
        <tr className="border-b border-border dark:border-border">
          <td className="p-4">Trade Accounts Payable</td>
          <td className="p-4 text-center max-w-12">
            <NumberInputComponent
              label=""
              name=""
              prefix="$"
              placeholder=""
              field={{
                className: "pointer-events-none",
                value: calculatedValues.currentLiabilities.totalAccountsPayable,

              }}
            />
          </td>
          <td className="p-4"></td>
        </tr>



        <tr className="border-b border-border dark:border-border">
          <td className="p-4">State Payroll Taxes Payable</td>
          <td className="p-4 text-center max-w-12">
            <NumberInputComponent
              label=""
              name="liabilities.statePayrollTaxesPayable"
              prefix="$"
              placeholder=""
              field={{
                className: "",
                value: formik.values.liabilities.statePayrollTaxesPayable ? formik.values.liabilities.statePayrollTaxesPayable : undefined,
                onChange: val => {
                  formik.setFieldValue('liabilities.statePayrollTaxesPayable', Number(val))
                }

              }}
            />
          </td>
          <td className="p-4"></td>
        </tr>


        <tr className="border-b border-border dark:border-border">
          <td className="p-4">Health Insurance Payable</td>
          <td className="p-4 text-center max-w-12">
            <NumberInputComponent
              label=""
              name="liabilities.healthInsurancePayable"
              prefix="$"
              placeholder=""
              field={{
                className: "",
                value: formik.values.liabilities.healthInsurancePayable ? formik.values.liabilities.healthInsurancePayable : undefined,
                onChange: val => {
                  formik.setFieldValue('liabilities.healthInsurancePayable', Number(val))
                }

              }}
            />
          </td>
          <td className="p-4"></td>
        </tr>

        <tr className="border-b border-border dark:border-border">
          <td className="p-4">Credit Cards</td>
          <td className="p-4 text-center max-w-12">
            <NumberInputComponent
              label=""
              name=""
              prefix="$"
              placeholder=""
              field={{
                className: "pointer-events-none",
                value: calculatedValues.currentLiabilities.creditCards,

              }}
            />
          </td>
          <td className="p-4"></td>
        </tr>
        {/* Footer */}

        <tr className="border-b border-border dark:border-border">
          <td className="p-4 font-bold">Total Current Liabilities</td>
          <td className="p-4"></td>
          <td className="p-4 font-bold text-center">{USCurrencyFormat.format(calculatedValues.currentLiabilities.totalCurrentLiabilities())}</td>
        </tr>
      </tbody>
    </table>
  );
}
