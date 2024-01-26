import CustomButton from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import QuinaryHeading from '@/app/component/headings/quinary';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { G7State } from '@/app/interfaces/client-invoice.interface';
import { Checkbox, Divider } from 'antd';

type Props = {
  state: G7State;
  // eslint-disable-next-line no-unused-vars
  handleState<K extends keyof G7State>(k: K, v: G7State[K]): void;
  // eslint-disable-next-line no-unused-vars
  sumColumns(rows: string[][], column: number): number;
  onCancel: () => void;
  onNext(): void;
}

export function G702Component({ state, handleState, sumColumns, onCancel, onNext }: Props) {

  const p5b = Number(sumColumns(state.data, 6));
  const twoPercentOfP5b = p5b * 0.02;
  const p5Total = (Number(sumColumns(state.data, 9)) + twoPercentOfP5b);
  const p6Total = (Number(sumColumns(state.data, 6)) - p5Total);
  const p3Total = (parseFloat(state.orignalContractSum) + parseFloat(state.netChangeByOrders));
  const p8Total = (p6Total - Number(state.lessPreviousCertificatesForPayment));
  const p9Total = p3Total - Number(state.lessPreviousCertificatesForPayment) - p8Total;
  return (
    <div>
      <div>
        <QuinaryHeading title="AIA DOCUMENT G702- 1992" />
      </div>

      <div>
        <TertiaryHeading title="APPLICATION AND CERTIFICATION FOR PAYMENT " />
        <Divider className="m-0 mt-3" />
        <div className="flex space-x-2 justify-between">
          <div className="flex space-x-2">
            <label
              className="text-right text-graphiteGray font-normal"
            >
              To Owner:
            </label>
            <div className="flex flex-col">
              <input
                className="px-2 py-2 border border-gray-300 outline-none"
                type="text"
                value={state.toOwner}
                onChange={(e) => handleState('toOwner', e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 space-x-1">
              <label
                className="text-right text-graphiteGray font-normal"
              >
                PROJECT:
              </label>
              <input
                className="px-2 py-2  border border-gray-300 outline-none"
                type="text"
                value={state.project}
                onChange={(e) => handleState('project', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 space-x-1">
              <label
                className="text-right text-graphiteGray font-normal"
              >
                Address:
              </label>
              <input
                className="px-2 py-1 border border-gray-300 outline-none"
                type="text"
                value={state.address}
                onChange={(e) => handleState('address', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 space-x-1">
              <label
                className="text-right text-graphiteGray font-normal"
              >
                Via Engineer:
              </label>
              <input
                className="px-2 py-1 border border-gray-300 outline-none"
                type="text"
                value={state.viaEngineer}
                onChange={(e) => handleState('viaEngineer', e.target.value)}
              />
            </div>
          </div>
          <div className="">
            <div className="grid grid-cols-2 space-x-1 ">
              <label
                className="text-right text-graphiteGray font-normal"
              >
                APPLICATION NO:
              </label>
              <input
                className="px-2 py-2  border border-gray-300 outline-none"
                type="text"
                value={state.applicationNo}
              />
            </div>
            <div className="grid grid-cols-2 space-x-1">
              <label
                className="text-right text-graphiteGray font-normal"
              >
                APPLICATION DATE:
              </label>
              <input
                className="px-2 py-1 border border-gray-300 outline-none"
                type="text"
                value={state.applicationDate}
              />
            </div>
            <div className="grid grid-cols-2 space-x-1">
              <label
                className="text-right text-graphiteGray font-normal"
              >
                PERIOD TO:
              </label>
              <input
                className="px-2 py-1 border border-gray-300 outline-none"
                type="text"
                value={state.periodTo}
              />
            </div>
            <div className="grid grid-cols-2 space-x-1">
              <label
                className="text-right text-graphiteGray font-normal"
              >
                PROJECT NO:
              </label>
              <input
                className="px-2 py-1 border border-gray-300 outline-none"
                type="text"
                value={state.projectNo}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <QuinaryHeading title="Distribution to" className="font-medium" />
            <Checkbox>
              <QuinaryHeading title="Distribution to" />
            </Checkbox>
            <Checkbox>
              <QuinaryHeading title="ARCHITECT" />
            </Checkbox>
            <Checkbox>
              <QuinaryHeading title="CONTRACTOR" />
            </Checkbox>
          </div>
        </div>
      </div>

      <div>
        <div>
          <QuinaryHeading title="CONTRACT FOR:" />
          <Divider className="m-0 my-1" />
          <TertiaryHeading title="CONTRACTOR'S APPLICATION FOR PAYMENT" />
        </div>

        <div className="grid grid-cols-2">
          <div>
            <QuinaryHeading title="Application is made for payment, as shown below, in connection with the Contract. Continuation Sheet, AIA Document G703, is attached." />
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-1">
                <QuinaryHeading
                  className="col-span-2"
                  title="1. ORIGINAL CONTRACT SUM  ................................"
                />
                <input
                  className="px-2 py-1 border border-gray-300 outline-none"
                  type="number"
                  value={state.orignalContractSum}
                  defaultValue={0.00}
                  onChange={(e) =>
                    handleState('orignalContractSum', e.target.value)
                  }
                />
              </div>
              <div className="grid grid-cols-3 gap-1">
                <QuinaryHeading
                  className="col-span-2"
                  title="2. Net change by Change Orders  ................................"
                />
                <input
                  className="px-2 py-1 border border-gray-300 outline-none"
                  type="text"
                  value={state.netChangeByOrders}
                  defaultValue={0.00}
                  onChange={(e) =>
                    handleState('netChangeByOrders', e.target.value)
                  }
                />
              </div>
              <div className="grid grid-cols-3 gap-1">
                <QuinaryHeading
                  className="col-span-2"
                  title="3. CONTRACT SUM TO DATE (Line 1 ± 2) $  ................................"
                />
                <input
                  className="px-2 py-1 border border-gray-300 outline-none"
                  type="number"
                  value={p3Total.toFixed(2)}
                />
              </div>
              <div className="grid grid-cols-3 gap-1">
                <QuinaryHeading
                  className="col-span-2"
                  title="4. TOTAL COMPLETED & STORED TO DATE (Column G on G703)   .............."
                />
                <input
                  className="px-2 py-1 border border-gray-300 outline-none"
                  type="number"
                  value={sumColumns(state.data, 6).toFixed(2)}
                />
              </div>

              <div>
                <QuinaryHeading title="5. RETAINAGE: " />
                <div className="pl-3">
                  <div className="grid grid-cols-3 ">
                    <div className="flex items-center col-span-2 space-x-2">
                      <QuinaryHeading title="a." />
                      <input
                        className="px-2 py-1 w-16 border border-gray-300 outline-none"
                        type="text"
                        value={10}
                        disabled
                      />
                      <QuinaryHeading title="% of Completed Work $" />
                    </div>
                    <input
                      className="px-2 py-1 border border-gray-300 outline-none"
                      type="number"
                      value={sumColumns(state.data, 9).toFixed(2)}
                    />
                  </div>
                  <QuinaryHeading
                    title="(Column D + E on G703)"
                    className="pl-4"
                  />
                </div>
                <div className="pl-3">
                  <div className="grid grid-cols-3 ">
                    <div className="flex items-center col-span-2 space-x-2">
                      <QuinaryHeading title="b." />
                      <input
                        className="px-2 py-1 w-16 border border-gray-300 outline-none"
                        type="text"
                        value={2}
                        disabled
                      />
                      <QuinaryHeading title="% of Stored Material " />
                    </div>
                    <input
                      className="px-2 py-1 border border-gray-300 outline-none"
                      type="number"
                      value={twoPercentOfP5b.toFixed(2)}
                    />
                  </div>
                  <div>
                    <QuinaryHeading title="(Column F on G703)" />

                    <div className="grid grid-cols-3">
                      <QuinaryHeading
                        className="col-span-2 pl-4"
                        title="Total Retainage ( Lines 5a + 5b or Total in Colum I of G703"
                      />
                      <input
                        className="px-2 py-1 border border-gray-300 outline-none"
                        type="number"
                        value={p5Total.toFixed(2)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1">
                <QuinaryHeading
                  className="col-span-2"
                  title="6. TOTAL EARNED LESS RETAINAGE Total in Column I of G703)"
                />
                <input
                  className="px-2 py-1 border border-gray-300 outline-none"
                  type="number"
                  value={p6Total.toFixed(2)}
                />
              </div>

              <div className="grid grid-cols-3 gap-1 items-start">
                <QuinaryHeading
                  className="col-span-2"
                  title="7. LESS PREVIOUS CERTIFICATES FOR PAYMENT (Line 6 from prior Certificate)"
                />
                <input
                  className="px-2 py-1 border border-gray-300 outline-none"
                  type="number"
                  value={state.lessPreviousCertificatesForPayment}
                  onChange={e => handleState('lessPreviousCertificatesForPayment', e.target.value)}
                  defaultValue={0.00}
                />
              </div>

              <div className="grid grid-cols-3 gap-1">
                <QuinaryHeading
                  className="col-span-2"
                  title="8. CURRENT PAYMENT DUE"
                />
                <input
                  className="px-2 py-1 border border-gray-300 outline-none"
                  type="number"
                  value={p8Total.toFixed(2)}
                />
              </div>
              <div className="grid grid-cols-3 gap-1">
                <QuinaryHeading
                  className="col-span-2"
                  title="9. BALANCE TO FINISH, INCLUDING RETAINAGE $ (Line 3 less Line 6)"
                />
                <input
                  className="px-2 py-1 border border-gray-300 outline-none"
                  type="number"
                  value={p9Total.toFixed(2)}
                  defaultValue={0.00}
                />
              </div>
            </div>

            <table className="w-full my-1 caption-bottom text-sm border border-gray-300 divide-x divide-gray-300">
              <thead className="[&amp;_tr]:border-b">
                <tr className="border-b">
                  <th className="h-12 px-4 align-middle text-left border-r border-gray-300 text-slateGray text-base font-normal leading-5">
                    CHANGE ORDER SUMMARY
                  </th>
                  <th className="h-12 px-4 align-middle text-left border-r border-gray-300 text-slateGray text-base font-normal leading-5">
                    ADDITIONS
                  </th>
                  <th className="h-12 px-4 align-middle text-left border-r border-gray-300 text-slateGray text-base font-normal leading-5">
                    DEDUCTIONS
                  </th>
                </tr>
              </thead>
              <tbody className="[&amp;_tr:last-child]:border-0">
                <tr className="border-b">
                  <td className="p-4 text-gray-700 align-middle  border-r border-gray-300">
                    Total changes approved in previous months by Owner
                  </td>
                  <td className="p-4 align-middle text-gray-700 text-center border-r border-gray-300">
                    7,000
                  </td>
                  <td className="p-4 align-middle text-gray-700  text-center">
                    1,500,000
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 align-middle text-gray-700 border-r border-gray-300">
                    Total approved this Month
                  </td>
                  <td className="p-4 align-middle  text-gray-700 text-center border-r border-gray-300">
                    7,000
                  </td>
                  <td className="p-4 align-middle text-gray-700 text-center">
                    1,500,000
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 align-middle text-gray-700 border-r border-gray-300">
                    TOTALS
                  </td>
                  <td className="p-4 align-middle text-gray-700 text-center border-r border-gray-300">
                    7,000
                  </td>
                  <td className="p-4 align-middle text-center">1,500,000</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 align-middle text-gray-700 border-r border-gray-300">
                    NET CHANGES by Change Order
                  </td>
                  <td className="p-4 align-middle text-gray-700 text-center border-r border-gray-300">
                    7,000
                  </td>
                  <td className="p-4 align-middle text-gray-700 text-center">
                    1,500,000
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="px-3">
            <div>
              <QuinaryHeading title="The undersigned Contractor certifies that to the best of the Contractor's knowledge, information and belief the Work covered by this Application for Payment has been completed in accordance with the Contract Documents, that all amounts have been paid by the Contractor for Work for which previous Certificates for Payment were issued and payments received from the Owner, and that current payment shown herein is now due." />
            </div>

            <div className="grid gap-2 grid-cols-2 justify-between my-3">
              <div className="grid grid-cols-12 items-center gap-1">
                <QuinaryHeading className="col-span-2" title="By:" />
                <input
                  className="px-2 col-span-6 py-1 border border-gray-300 outline-none"
                  type="text"
                  value={state.by}
                  onChange={e => handleState('by', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-12 items-center gap-1">
                <QuinaryHeading className="col-span-2" title="Date:" />
                <input
                  className="col-span-6 px-2 py-1 border border-gray-300 outline-none"
                  type="text"
                  value={state.date}
                  onChange={e => handleState('date', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-12 gap-1 items-center">
                <QuinaryHeading className="col-span-2" title="State of:" />
                <input
                  className="col-span-6 px-2 py-1 border border-gray-300 outline-none"
                  type="text"
                  value={state.stateOf}
                  onChange={e => handleState('stateOf', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-12 gap-1 items-center">
                <QuinaryHeading className="col-span-2" title="Country of:" />
                <input
                  className="px-2 col-span-6 py-1 border border-gray-300 outline-none"
                  type="text"
                  value={state.country}
                  onChange={e => handleState('country', e.target.value)}
                />
              </div>
              <div className="col-span-2 flex items-center space-x-2">
                <QuinaryHeading title="Subscribed and sworn to before me this:" />
                <input
                  className="px-2 py-1 border border-gray-300 outline-none"
                  type="text"
                  value={state.subscribedAndSworn}
                  onChange={e => handleState('subscribedAndSworn', e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <QuinaryHeading title="Notary Public:" />
                <input
                  className="px-2 py-1 border border-gray-300 outline-none"
                  type="text"
                  value={state.notaryPublic}
                  onChange={e => handleState('notaryPublic', e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <QuinaryHeading title="My Commission expires:" />
                <input
                  className="px-2 py-1 border border-gray-300 outline-none"
                  type="text"
                  value={state.myCommissionExpires}
                  onChange={e => handleState('myCommissionExpires', e.target.value)}
                />
              </div>
            </div>
            <Divider className="m-0 my-1" />

            <div>
              <TertiaryHeading title="ARCHITECT'S CERTIFICATE FOR PAYMENT" />
              <QuinaryHeading title="In accordance with the Contract Documents, based on on-site observations and the data comprising the application, the Architect certifies to the Owner that to the best of the Architect's knowledge, information and belief the Work has progressed as indicated, the quality of the Work is in accordance with the Contract Documents, and the Contractor is entitled to payment of the AMOUNT CERTIFIED." />

              <div className="py-2">
                <div className="flex items-center space-x-2">
                  <QuinaryHeading title="AMOUNT CERTIFIED:" />
                  <input
                    className="px-2 py-1 border border-gray-300 outline-none"
                    type="number"
                    value={state.amountCertified1}
                    onChange={e => handleState('amountCertified1', e.target.value)}
                  />
                </div>
                <QuinaryHeading title="(Attach explanation if amount certified differs from the amount applied. Initial all figures on this Application and onthe Continuation Sheet that are changed to conform with the amount certified.)" />
              </div>

              <div className="space-y-2">
                <TertiaryHeading title="ARCHITECT:" className="text-sm" />
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    <QuinaryHeading title="AMOUNT CERTIFIED:" />
                    <input
                      className="px-2 py-1 border border-gray-300 outline-none"
                      type="number"
                      value={state.amountCertified2}
                      onChange={e => handleState('amountCertified2', e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <QuinaryHeading title="AMOUNT CERTIFIED:" />
                    <input
                      className="px-2 py-1 border border-gray-300 outline-none"
                      type="text"
                    />
                  </div>
                </div>
                <QuinaryHeading title="This Certificate is not negotiable. The AMOUNT CERTIFIED is payable only to the Contractor named herein. Issuance, payment and acceptance of payment are without prejudice to any rights of the Owner or Contractor under this Contract." />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <WhiteButton onClick={onCancel} text="Cancel" className="!w-40" />
        <CustomButton text="Create" className="!w-48"
          onClick={onNext}
        />
      </div>
    </div>
  );
}
