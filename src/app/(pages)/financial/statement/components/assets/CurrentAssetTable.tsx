import { NumberInputComponent } from "@/app/component/customInput/NumberInput";
import { IFinancialStatementState } from "../../types";
import type { FormikProps } from "formik";

type Props = {
  formik: FormikProps<IFinancialStatementState>;
}
export function CurrentAssetTable({ formik }: Props) {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-schestiPrimaryBG rounded-md">
          <th className=" py-4 rounded-tl-lg ">Current Assets</th>
          <th className="py-4 ">Amount</th>
          <th className="py-4 rounded-tr-lg">Total</th>
        </tr>
      </thead>

      <tbody className="text-sm">
        <tr className="border-b border-border dark:border-border">
          <td className="p-4">First Citizens Bank Payables</td>
          <td className="p-4 text-center max-w-12">
            <NumberInputComponent
              label=""
              name="assets.firstCitizenBankPayables"
              prefix="$"
              placeholder=""
              field={{
                className: "",
                value: formik.values.assets.firstCitizenBankPayables ? formik.values.assets.firstCitizenBankPayables : undefined,
                onChange: val => {
                  formik.setFieldValue('assets.firstCitizenBankPayables', val as number)
                }

              }}
            />
          </td>
          <td className="p-4"></td>
        </tr>

        <tr className="border-b border-border dark:border-border">
          <td className="p-4">First Citizens Bank Revenue</td>
          <td className="p-4 text-center max-w-12">
            <NumberInputComponent
              label=""
              name="assets.firstCitizenBankRevenue"
              prefix="$"
              placeholder=""
              field={{
                className: "",
                value: formik.values.assets.firstCitizenBankRevenue ? formik.values.assets.firstCitizenBankRevenue : undefined,
                onChange: val => {
                  formik.setFieldValue('assets.firstCitizenBankRevenue', val as number)
                }

              }}
            />
          </td>
          <td className="p-4"></td>
        </tr>

        <tr className="border-b border-border dark:border-border">
          <td className="p-4">Cash Clearing</td>
          <td className="p-4 text-center max-w-12">
            <NumberInputComponent
              label=""
              name="assets.cashClearing"
              prefix="$"
              placeholder=""
              field={{
                className: "",
                value: formik.values.assets.cashClearing ? formik.values.assets.cashClearing : undefined,
                onChange: val => {
                  formik.setFieldValue('assets.cashClearing', val as number)
                }
              }}
            />
          </td>
          <td className="p-4"></td>
        </tr>


        <tr className="border-b border-border dark:border-border">
          <td className="p-4">Contract Receivables</td>
          <td className="p-4 text-center max-w-12">
            <NumberInputComponent
              label=""
              name=""
              prefix="$"
              placeholder=""
              field={{
                className: "border-none pointer-events-none",
                value: 0.00
              }}
            />
          </td>
          <td className="p-4"></td>
        </tr>

        <tr className="border-b border-border dark:border-border">
          <td className="p-4">Other Receivables</td>
          <td className="p-4 text-center max-w-12">
            <NumberInputComponent
              label=""
              name=""
              prefix="$"
              placeholder=""
              field={{
                className: "border-none pointer-events-none",
                value: 0.00
              }}
            />
          </td>
          <td className="p-4"></td>
        </tr>

        <tr className="border-b border-border dark:border-border">
          <td className="p-4">Startup Inventory</td>
          <td className="p-4 text-center max-w-12">
            <NumberInputComponent
              label=""
              name="assets.startUpInventory"
              prefix="$"
              placeholder=""
              field={{
                className: "",
                value: formik.values.assets.startUpInventory ? formik.values.assets.startUpInventory : undefined,
                onChange: val => {
                  formik.setFieldValue('assets.startUpInventory', val as number)
                }
              }}
            />
          </td>
          <td className="p-4"></td>
        </tr>
        {/* Footer */}

        <tr className="border-b border-border dark:border-border">
          <td className="p-4 font-bold">Total Current Assets</td>
          <td className="p-4"></td>
          <td className="p-4 font-bold text-center">$52,358.00</td>
        </tr>
      </tbody>
    </table>
  );
}
