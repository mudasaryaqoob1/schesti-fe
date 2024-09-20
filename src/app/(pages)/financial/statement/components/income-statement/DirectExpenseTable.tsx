import { NumberInputComponent } from '@/app/component/customInput/NumberInput';
import { IFinancialStatementCalculatedValues } from '../../types';
import { USCurrencyFormat } from '@/app/utils/format';


type Props = {
  calculatedValues: IFinancialStatementCalculatedValues;
}

export function DirectExpenseTable({ calculatedValues }: Props) {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-schestiPrimaryBG rounded-md">
          <th className=" py-4 rounded-tl-lg ">Direct Expense</th>
          <th className="py-4 ">Amount</th>
          <th className="py-4 rounded-tr-lg">Total</th>
        </tr>
      </thead>

      <tbody className="text-sm">

        <tr className="border-b border-border dark:border-border">
          <td className="p-4">Material</td>
          <td className="p-4 text-center max-w-12">
            <NumberInputComponent
              label=""
              name=""
              prefix="$"
              placeholder=""
              field={{
                className: "pointer-events-none",
                value: calculatedValues.directExpense.materials,
              }}
            />
          </td>
          <td className="p-4"></td>
        </tr>

        <tr className="border-b border-border dark:border-border">
          <td className="p-4">Equipment Expense</td>
          <td className="p-4 text-center max-w-12">
            <NumberInputComponent
              label=""
              name=""
              prefix="$"
              placeholder=""
              field={{
                className: "pointer-events-none",
                value: calculatedValues.directExpense.labourExpenses,

              }}
            />
          </td>
          <td className="p-4"></td>
        </tr>

        <tr className="border-b border-border dark:border-border">
          <td className="p-4">Subcontracted</td>
          <td className="p-4 text-center max-w-12">
            <NumberInputComponent
              label=""
              name=""
              prefix="$"
              placeholder=""
              field={{
                className: "pointer-events-none",
                value: calculatedValues.directExpense.subcontractedExpense,

              }}
            />
          </td>
          <td className="p-4"></td>
        </tr>
        <tr className="border-b border-border dark:border-border">
          <td className="p-4">Other Job Expense</td>
          <td className="p-4 text-center max-w-12">
            <NumberInputComponent
              label=""
              name=""
              prefix="$"
              placeholder=""
              field={{
                className: "pointer-events-none",
                value: calculatedValues.directExpense.otherJobExpense,

              }}
            />
          </td>
          <td className="p-4"></td>
        </tr>


        {/* Footer */}

        <tr className="border-b border-border dark:border-border">
          <td className="p-4 font-bold">Total Direct Expense</td>
          <td className="p-4"></td>
          <td className="p-4 font-bold text-center">{USCurrencyFormat.format(calculatedValues.directExpense.totalDirectExpense())}</td>
        </tr>
        <tr className="border-b border-border dark:border-border">
          <td className="p-4 font-bold">Total Direct and Equipment/Shop Expense</td>
          <td className="p-4"></td>
          <td className="p-4 font-bold text-center">{USCurrencyFormat.format(calculatedValues.directExpense.totalDirectExpense())}</td>
        </tr>
        <tr className="border-b border-border dark:border-border">
          <td className="p-4 font-bold">Gross Profit</td>
          <td className="p-4"></td>
          <td className="p-4 font-bold text-center">{USCurrencyFormat.format(0)}</td>
        </tr>
      </tbody>
    </table>
  );
}
