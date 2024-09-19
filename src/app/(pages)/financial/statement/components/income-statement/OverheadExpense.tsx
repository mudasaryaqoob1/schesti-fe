import { NumberInputComponent } from '@/app/component/customInput/NumberInput';

export function OverheadExpenseTable() {
  return <table className="w-full">
    <thead>
      <tr className="bg-schestiPrimaryBG rounded-md">
        <th className=" py-4 rounded-tl-lg ">Overhead</th>
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
              value: 0.00,

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
              value: 0.00,

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
              value: 0.00,

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
              value: 0.00,

            }}
          />
        </td>
        <td className="p-4"></td>
      </tr>


      {/* Footer */}

      <tr className="border-b border-border dark:border-border">
        <td className="p-4 font-bold">Total Overhead Expense</td>
        <td className="p-4"></td>
        <td className="p-4 font-bold text-center">$52,358.00</td>
      </tr>
      <tr className="border-b border-border dark:border-border">
        <td className="p-4 font-bold">Total Indirect Expense</td>
        <td className="p-4"></td>
        <td className="p-4 font-bold text-center">$52,358.00</td>
      </tr>
      <tr className="border-b border-border dark:border-border">
        <td className="p-4 font-bold">Income from Operations</td>
        <td className="p-4"></td>
        <td className="p-4 font-bold text-center">$52,358.00</td>
      </tr>
    </tbody>
  </table>
}
