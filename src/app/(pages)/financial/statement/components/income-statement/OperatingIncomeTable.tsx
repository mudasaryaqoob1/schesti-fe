import { NumberInputComponent } from "@/app/component/customInput/NumberInput";

export function OperatingIncomeTable() {

  return (
    <table className="w-full">
      <thead>
        <tr className="bg-schestiPrimaryBG rounded-md">
          <th className=" py-4 rounded-tl-lg ">Operating Income</th>
          <th className="py-4 ">Amount</th>
          <th className="py-4 rounded-tr-lg">Total</th>
        </tr>
      </thead>

      <tbody className="text-sm">

        <tr className="border-b border-border dark:border-border">
          <td className="p-4">Contract Income</td>
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
          <td className="p-4 font-bold">Total Operating Income</td>
          <td className="p-4"></td>
          <td className="p-4 font-bold text-center">$52,358.00</td>
        </tr>
      </tbody>
    </table>
  );
}
