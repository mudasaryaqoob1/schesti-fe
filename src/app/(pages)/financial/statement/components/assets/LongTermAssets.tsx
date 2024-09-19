import { NumberInputComponent } from "@/app/component/customInput/NumberInput";
import { IFinancialStatementCalculatedValues } from "../../types";
import { USCurrencyFormat } from "@/app/utils/format";
import { IFinancialAsset } from "@/app/interfaces/financial/financial-asset.interface";
import _ from "lodash";


type Props = {
  calulatedValues: IFinancialStatementCalculatedValues;
  assets: IFinancialAsset[]
}
export function LongTermAssetTable({ calulatedValues, assets }: Props) {

  return (
    <table className="w-full">
      <thead>
        <tr className="bg-schestiPrimaryBG rounded-md">
          <th className=" py-4 rounded-tl-lg ">Long Term Assets</th>
          <th className="py-4 ">Amount</th>
          <th className="py-4 rounded-tr-lg">Total</th>
        </tr>
      </thead>

      <tbody className="text-sm">
        {
          _(assets).groupBy('assetType')  // Group by 'assetType'
            .map((items, assetType) => ({
              assetType,
              totalPrice: _.sumBy(items, 'totalPrice') // Sum 'totalPrice' for each assetType
            }))
            .value().map(asset => {
              return <tr key={asset.assetType} className="border-b border-border dark:border-border">
                <td className="p-4">{asset.assetType}</td>
                <td className="p-4 text-center max-w-12">
                  <NumberInputComponent
                    label=""
                    name=""
                    prefix="$"
                    placeholder=""
                    field={{
                      className: "pointer-events-none",
                      value: asset.totalPrice,
                    }}
                  />
                </td>
                <td className="p-4"></td>
              </tr>
            })
        }

        {/* Footer */}

        <tr className="border-b border-border dark:border-border">
          <td className="p-4 font-bold">Total Long Term Assets</td>
          <td className="p-4"></td>
          <td className="p-4 font-bold text-center">{USCurrencyFormat.format(calulatedValues.longTermAssets.totalLongTermAssets)}</td>
        </tr>
      </tbody>
    </table>
  );
}
