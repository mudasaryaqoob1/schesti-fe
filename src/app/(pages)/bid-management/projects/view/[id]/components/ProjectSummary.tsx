import SenaryHeading from '@/app/component/headings/senaryHeading';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { useTrades } from '@/app/hooks/useTrades';
import { getTimezoneFromCountryAndState } from '@/app/utils/date.utils';
import { USCurrencyFormat } from '@/app/utils/format';
import { RootState } from '@/redux/store';
import _ from 'lodash';
import moment from 'moment';
import { useSelector } from 'react-redux';

export function ProjectSummary() {
  const bid = useSelector(
    (state: RootState) => state.bidManagementOwner.project
  );
  const { tradesQuery } = useTrades();

  const projectTrades = bid
    ? _.filter(tradesQuery.data?.data?.trades, (trade) =>
      (bid.selectedTrades as unknown as string).includes(trade._id)
    )
    : [];

  return (
    <div className=" mt-6 mb-4 md:ms-[69px] md:me-[59px] mx-4  p-5 bg-white rounded-lg border shadow-lg">
      <div>
        <TertiaryHeading
          title="Overview"
          className="text-[20px] leading-[30px]"
        />
        <fieldset className="border-[2px] mt-[21px] space-y-4 p-4  rounded-lg border-dashed border-[#aeafb8] relative">
          <legend className="text-[#667085] text-[14px] leading-6 absolute -top-4 z-10 bg-white w-fit px-2">
            Basic Information
          </legend>

          <div className="grid grid-cols-4 gap-3">
            <div className="space-y-2">
              <SenaryHeading
                title="Project Name"
                className="text-[14px] leading-6 text-[#98A2B3] font-normal"
              />
              <p className="text-[#344054] text-[14px] leading-6 font-medium ">
                {bid ? bid.projectName : ''}
              </p>
            </div>
            <div className="space-y-2">
              <SenaryHeading
                title="Address"
                className="text-[14px] leading-6 text-[#98A2B3] font-normal"
              />
              <p className="text-[#344054] text-[14px] leading-6 font-medium ">
                {bid ? bid.address : ''}
              </p>
            </div>
            <div className="space-y-2">
              <SenaryHeading
                title="Zip Code"
                className="text-[14px] leading-6 text-[#98A2B3] font-normal"
              />
              <p className="text-[#344054] text-[14px] leading-6 font-medium ">
                {bid ? bid.zipCode : ''}
              </p>
            </div>
            <div className="space-y-2">
              <SenaryHeading
                title="City"
                className="text-[14px] leading-6 text-[#98A2B3] font-normal"
              />
              <p className="text-[#344054] text-[14px] leading-6 font-medium ">
                {bid ? bid.city : ''}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <div className="space-y-2">
              <SenaryHeading
                title="Bid Due"
                className="text-[14px] leading-6 text-[#98A2B3] font-normal"
              />
              <p className="text-[#344054] text-[14px] leading-6 font-medium ">
                {/* 12 March, 2024 format */}
                {bid
                  ? moment(bid.bidDueDate).format('DD MMMM, YYYY hh:mm')
                  : ''}
              </p>
            </div>
            <div className="space-y-2">
              <SenaryHeading
                title="Estimated Start Date: "
                className="text-[14px] leading-6 text-[#98A2B3] font-normal"
              />
              <p className="text-[#344054] text-[14px] leading-6 font-medium ">
                {bid
                  ? moment(bid.estimatedStartDate).format('DD MMMM, YYYY hh:mm')
                  : ''}
              </p>
            </div>
            <div className="space-y-2">
              <SenaryHeading
                title="Estimated Completion Date"
                className="text-[14px] leading-6 text-[#98A2B3] font-normal"
              />
              <p className="text-[#344054] text-[14px] leading-6 font-medium ">
                {bid
                  ? moment(bid.estimatedCompletionDate).format(
                    'DD MMMM, YYYY hh:mm'
                  )
                  : ''}
              </p>
            </div>
            <div className="space-y-2">
              <SenaryHeading
                title="Time Zone"
                className="text-[14px] leading-6 text-[#98A2B3] font-normal"
              />
              <p className="text-[#344054] text-[14px] leading-6 font-medium ">
                {bid
                  ? getTimezoneFromCountryAndState(bid.country, bid.state)
                  : ''}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <div className="space-y-2">
              <SenaryHeading
                title="Duration"
                className="text-[14px] leading-6 text-[#98A2B3] font-normal"
              />
              <p className="text-[#344054] text-[14px] leading-6 font-medium ">
                {bid ? `${bid.estimatedDuration} ${bid.durationType}` : ''}
              </p>
            </div>
            <div className="space-y-2">
              <SenaryHeading
                title="Square Footage"
                className="text-[14px] leading-6 text-[#98A2B3] font-normal"
              />
              <p className="text-[#344054] text-[14px] leading-6 font-medium ">
                {bid ? bid.squareFootage : ''}
              </p>
            </div>
            <div className="space-y-2">
              <SenaryHeading
                title="Project Value"
                className="text-[14px] leading-6 text-[#98A2B3] font-normal"
              />
              <p className="text-[#344054] text-[14px] leading-6 font-medium ">
                {bid ? USCurrencyFormat.format(bid.projectValue) : ''}
              </p>
            </div>
            <div className="space-y-2">
              <SenaryHeading
                title="Stage"
                className="text-[14px] leading-6 text-[#98A2B3] font-normal"
              />
              <p className="text-[#344054] text-[14px] leading-6 font-medium ">
                {bid ? bid.stage : ''}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-[8px]">
              <div className="space-y-[8px]">
                <SenaryHeading
                  title="Project Type"
                  className="text-[14px] leading-6 text-[#98A2B3] font-normal"
                />

                <div className="flex items-center space-x-3">
                  {bid
                    ? bid.projectType.map((pt) => (
                      <p
                        key={pt}
                        className="px-[12px] rounded py-[7px] bg-[#F2F4F7] text-[#475467] text-[14px] leading-4"
                      >
                        {pt}
                      </p>
                    ))
                    : ''}
                </div>
              </div>
              <div className="space-y-[8px]">
                <SenaryHeading
                  title="Project Building Use"
                  className="text-[14px] leading-6 text-[#98A2B3] font-normal"
                />

                <div className="flex items-center space-x-3">
                  {bid
                    ? bid.projectBuildingUse.map((building) => (
                      <p
                        key={building}
                        className="px-[12px] rounded py-[7px] bg-[#F2F4F7] text-[#475467] text-[14px] leading-4"
                      >
                        {building}
                      </p>
                    ))
                    : ''}
                </div>
              </div>
            </div>

            <div className="space-y-[8px] self-center">
              <div className="space-y-[8px]">
                <SenaryHeading
                  title="Construction Type"
                  className="text-[14px] leading-6 text-[#98A2B3] font-normal"
                />

                <div className="flex items-center space-x-3">
                  {bid
                    ? bid.constructionTypes.map((ct) => (
                      <p
                        key={ct}
                        className="px-[12px] rounded py-[7px] bg-[#F2F4F7] text-[#475467] text-[14px] leading-4"
                      >
                        {ct}
                      </p>
                    ))
                    : ''}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <SenaryHeading
                title="Project Description"
                className="text-[14px] leading-6 text-[#98A2B3] font-normal"
              />
              <p className="text-[#344054] text-[14px] leading-6 font-medium ">
                {bid ? bid.description : ''}
              </p>
            </div>
            <div className="space-y-2">
              <SenaryHeading
                title="Special Instructions"
                className="text-[14px] leading-6 text-[#98A2B3] font-normal"
              />
              <p className="text-[#344054] text-[14px] leading-6 font-medium ">
                {bid ? bid.specialInstructions : ''}
              </p>
            </div>
          </div>
        </fieldset>

        <fieldset className="border-[2px] mt-[21px] space-y-4 p-4  rounded-lg border-dashed border-[#aeafb8] relative">
          <legend className="text-[#667085] text-[14px] leading-6 absolute -top-4 z-10 bg-white w-fit px-2">
            Trades
          </legend>

          <div className="grid grid-cols-8 md:grid-cols-3 gap-4 items-center">
            {projectTrades.map((trade) => (
              <p
                key={trade._id}
                className="px-[12px] bg-[#E9EBF8] rounded-full text-center
                         py-[7px]  text-[#7138DF] font-semibold text-xs leading-4 "
              >
                {trade.name}
              </p>
            ))}
          </div>
        </fieldset>
      </div>
    </div>
  );
}
