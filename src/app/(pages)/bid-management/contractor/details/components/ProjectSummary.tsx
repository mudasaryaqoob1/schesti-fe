import SenaryHeading from '@/app/component/headings/senaryHeading';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { USCurrencyFormat } from '@/app/utils/format';

export function ProjectSummary() {
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
                {'Seabreeza Village comercial Developemnst - convenience store'}
              </p>
            </div>
            <div className="space-y-2">
              <SenaryHeading
                title="Address"
                className="text-[14px] leading-6 text-[#98A2B3] font-normal"
              />
              <p className="text-[#344054] text-[14px] leading-6 font-medium ">
                {'Address'}
              </p>
            </div>
            <div className="space-y-2">
              <SenaryHeading
                title="Zip Code"
                className="text-[14px] leading-6 text-[#98A2B3] font-normal"
              />
              <p className="text-[#344054] text-[14px] leading-6 font-medium ">
                {'63100'}
              </p>
            </div>
            <div className="space-y-2">
              <SenaryHeading
                title="City"
                className="text-[14px] leading-6 text-[#98A2B3] font-normal"
              />
              <p className="text-[#344054] text-[14px] leading-6 font-medium ">
                {'City'}
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
                {'12 May 2022, 12:40'}
              </p>
            </div>
            <div className="space-y-2">
              <SenaryHeading
                title="Estimated Start Date: "
                className="text-[14px] leading-6 text-[#98A2B3] font-normal"
              />
              <p className="text-[#344054] text-[14px] leading-6 font-medium ">
                {'12 May 2022, 12:40'}
              </p>
            </div>
            <div className="space-y-2">
              <SenaryHeading
                title="Estimated Completion Date"
                className="text-[14px] leading-6 text-[#98A2B3] font-normal"
              />
              <p className="text-[#344054] text-[14px] leading-6 font-medium ">
                {'12 May 2022, 12:40'}
              </p>
            </div>
            <div className="space-y-2">
              <SenaryHeading
                title="Time Zone"
                className="text-[14px] leading-6 text-[#98A2B3] font-normal"
              />
              <p className="text-[#344054] text-[14px] leading-6 font-medium ">
                {'Eastern Time'}
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
                {'6 months'}
              </p>
            </div>
            <div className="space-y-2">
              <SenaryHeading
                title="Square Footage"
                className="text-[14px] leading-6 text-[#98A2B3] font-normal"
              />
              <p className="text-[#344054] text-[14px] leading-6 font-medium ">
                {'6ft square'}
              </p>
            </div>
            <div className="space-y-2">
              <SenaryHeading
                title="Project Value"
                className="text-[14px] leading-6 text-[#98A2B3] font-normal"
              />
              <p className="text-[#344054] text-[14px] leading-6 font-medium ">
                {USCurrencyFormat.format(1231)}
              </p>
            </div>
            <div className="space-y-2">
              <SenaryHeading
                title="Stage"
                className="text-[14px] leading-6 text-[#98A2B3] font-normal"
              />
              <p className="text-[#344054] text-[14px] leading-6 font-medium ">
                {'GC Awarded/Sub Bidding'}
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
                  {['Open Shop', 'Private', 'Open'].map((pt) => (
                    <p
                      key={pt}
                      className="px-[12px] rounded py-[7px] bg-[#F2F4F7] text-[#475467] text-[14px] leading-4"
                    >
                      {pt}
                    </p>
                  ))}
                </div>
              </div>
              <div className="space-y-[8px]">
                <SenaryHeading
                  title="Project Building Use"
                  className="text-[14px] leading-6 text-[#98A2B3] font-normal"
                />

                <div className="flex items-center space-x-3">
                  {[
                    'Community Center',
                    'Education/School/University',
                    'Fire/Police Station',
                  ].map((building) => (
                    <p
                      key={building}
                      className="px-[12px] rounded py-[7px] bg-[#F2F4F7] text-[#475467] text-[14px] leading-4"
                    >
                      {building}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-[8px]">
              <div className="space-y-[8px]">
                <SenaryHeading
                  title="Sector & Labor Status"
                  className="text-[14px] leading-6 text-[#98A2B3] font-normal"
                />

                <div className="flex items-center space-x-4 flex-wrap space-y-2">
                  <p className="px-[12px] rounded py-[7px] bg-[#F2F4F7] text-[#475467] text-[14px] leading-4">
                    Demolition
                  </p>
                  <p className="px-[12px]  rounded py-[7px] bg-[#F2F4F7] text-[#475467] text-[14px] leading-4">
                    New Construction no Site Work
                  </p>
                  <p className="px-[12px] rounded py-[7px] bg-[#F2F4F7] text-[#475467] text-[14px] leading-4">
                    Renovation/Remodel/Repair
                  </p>
                </div>
              </div>
              <div className="space-y-[8px]">
                <SenaryHeading
                  title="Construction Type"
                  className="text-[14px] leading-6 text-[#98A2B3] font-normal"
                />

                <div className="flex items-center space-x-3">
                  {['Demolition', 'Demolition'].map((ct) => (
                    <p
                      key={ct}
                      className="px-[12px] rounded py-[7px] bg-[#F2F4F7] text-[#475467] text-[14px] leading-4"
                    >
                      {ct}
                    </p>
                  ))}
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
                quidem quod quos quo impedit dicta earum veritatis magni
                officiis! Aperiam harum corporis eius deserunt nemo aliquid
                consequuntur debitis fugit nisi!
              </p>
            </div>
            <div className="space-y-2">
              <SenaryHeading
                title="Special Instructions"
                className="text-[14px] leading-6 text-[#98A2B3] font-normal"
              />
              <p className="text-[#344054] text-[14px] leading-6 font-medium ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
                illum et ipsa, nihil minima distinctio cum voluptates
                reprehenderit iure quo commodi sed recusandae corrupti modi
                perferendis doloribus. Voluptates, laborum ducimus.
              </p>
            </div>
          </div>
        </fieldset>

      </div>
    </div>
  );
}
