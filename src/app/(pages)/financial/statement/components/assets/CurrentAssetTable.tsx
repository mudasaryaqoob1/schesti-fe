import { NumberInputComponent } from '@/app/component/customInput/NumberInput';
import {
  IFinancialStatementCalculatedValues,
  IFinancialStatementState,
} from '../../types';
import type { FormikProps } from 'formik';
import { USCurrencyFormat } from '@/app/utils/format';

type Props = {
  formik: FormikProps<IFinancialStatementState>;
  calculatedValues: IFinancialStatementCalculatedValues;
};
export function CurrentAssetTable({ formik, calculatedValues }: Props) {
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
          <td className="p-4">Cash on Bank</td>
          <td className="p-4 text-center max-w-12">
            <NumberInputComponent
              label=""
              name=""
              prefix="$"
              placeholder=""
              field={{
                className: 'pointer-events-none',
                value: calculatedValues.assets.cashOnBank,
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
                className: '',
                value: formik.values.assets.cashClearing,
                onChange: (val) => {
                  formik.setFieldValue(
                    'assets.cashClearing',
                    Number(val) as number
                  );
                },
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
                className: 'pointer-events-none',
                value: calculatedValues.assets.contractReceivable,
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
                className: 'pointer-events-none',
                value: calculatedValues.assets.totalStandardInvoices,
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
                className: '',
                value: formik.values.assets.startUpInventory,
                onChange: (val) => {
                  formik.setFieldValue(
                    'assets.startUpInventory',
                    Number(val) as number
                  );
                },
              }}
            />
          </td>
          <td className="p-4"></td>
        </tr>
        {/* Footer */}

        <tr className="border-b border-border dark:border-border">
          <td className="p-4 font-bold">Total Current Assets</td>
          <td className="p-4"></td>
          <td className="p-4 font-bold text-center">
            {USCurrencyFormat.format(
              calculatedValues.assets.totalCurrentAssets()
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
