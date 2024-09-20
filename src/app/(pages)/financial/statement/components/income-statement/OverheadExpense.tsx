import { NumberInputComponent } from '@/app/component/customInput/NumberInput';
import { IFinancialStatementCalculatedValues } from '../../types';
import costCodeDataWithId from '../../../cost-code';
import { USCurrencyFormat } from '@/app/utils/format';

type Props = {
  calculatedValues: IFinancialStatementCalculatedValues;
}

export function OverheadExpenseTable({ calculatedValues }: Props) {
  return <table className="w-full">
    <thead>
      <tr className="bg-schestiPrimaryBG rounded-md">
        <th className=" py-4 rounded-tl-lg ">Overhead</th>
        <th className="py-4 ">Amount</th>
        <th className="py-4 rounded-tr-lg">Total</th>
      </tr>
    </thead>

    <tbody className="text-sm">



      {calculatedValues.overheadExpense.overheadList.map(expense => {
        return <tr key={expense._id} className="border-b border-border dark:border-border">
          <td className="p-4">{costCodeDataWithId.find(costCode => costCode.id === expense.costCode)?.description}</td>
          <td className="p-4 text-center max-w-12">
            <NumberInputComponent
              label=""
              name=""
              prefix="$"
              placeholder=""
              field={{
                className: "pointer-events-none",
                value: expense.totalPrice,

              }}
            />
          </td>
          <td className="p-4"></td>
        </tr>
      })}


      {/* Footer */}

      <tr className="border-b border-border dark:border-border">
        <td className="p-4 font-bold">Total Overhead Expense</td>
        <td className="p-4"></td>
        <td className="p-4 font-bold text-center">{USCurrencyFormat.format(calculatedValues.overheadExpense.totalOverheadExpense())}</td>
      </tr>
      <tr className="border-b border-border dark:border-border">
        <td className="p-4 font-bold">Total Indirect Expense</td>
        <td className="p-4"></td>
        <td className="p-4 font-bold text-center">{USCurrencyFormat.format(calculatedValues.overheadExpense.totalIndirectExpense())}</td>
      </tr>
      <tr className="border-b border-border dark:border-border">
        <td className="p-4 font-bold">Income from Operations</td>
        <td className="p-4"></td>
        <td className="p-4 font-bold text-center">{USCurrencyFormat.format(calculatedValues.overheadExpense.incomeFromOperations())}</td>
      </tr>
    </tbody>
  </table>
}
