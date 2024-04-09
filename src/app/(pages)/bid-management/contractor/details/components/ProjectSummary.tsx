import SenaryHeading from '@/app/component/headings/senaryHeading';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { IBidManagement } from '@/app/interfaces/bid-management/bid-management.interface';
import { getTimezoneFromCountryAndState } from '@/app/utils/date.utils';
import { USCurrencyFormat } from '@/app/utils/format';
import { Country } from 'country-state-city';
import moment from 'moment';

interface IProps {
  projectData: IBidManagement;
}

export function ProjectSummary(props: IProps) {
  const { projectData } = props;

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
                {projectData.projectName}
              </p>
            </div>
            <div className="space-y-2">
              <SenaryHeading
                title="Address"
                className="text-[14px] leading-6 text-[#98A2B3] font-normal"
              />
              <p className="text-[#344054] text-[14px] leading-6 font-medium ">
                {projectData.address}
              </p>
            </div>
            <div className="space-y-2">
              <SenaryHeading
                title="Zip Code"
                className="text-[14px] leading-6 text-[#98A2B3] font-normal"
              />
              <p className="text-[#344054] text-[14px] leading-6 font-medium ">
                {projectData.zipCode}
              </p>
            </div>
            <div className="space-y-2">
              <SenaryHeading
                title="City"
                className="text-[14px] leading-6 text-[#98A2B3] font-normal"
              />
              <p className="text-[#344054] text-[14px] leading-6 font-medium ">
                {`${projectData?.city}, ${Country.getCountryByCode(projectData.country)?.name}`}
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
                {moment(projectData.bidDueDate).format('DD MMM YYYY, hh:mm')}
              </p>
            </div>
            <div className="space-y-2">
              <SenaryHeading
                title="Estimated Start Date: "
                className="text-[14px] leading-6 text-[#98A2B3] font-normal"
              />
              <p className="text-[#344054] text-[14px] leading-6 font-medium ">
                {moment(projectData.estimatedStartDate).format('DD MMM YYYY, hh:mm')}
              </p>
            </div>
            <div className="space-y-2">
              <SenaryHeading
                title="Estimated Completion Date"
                className="text-[14px] leading-6 text-[#98A2B3] font-normal"
              />
              <p className="text-[#344054] text-[14px] leading-6 font-medium ">
                {moment(projectData.estimatedCompletionDate).format('DD MMM YYYY, hh:mm')}
              </p>
            </div>
            <div className="space-y-2">
              <SenaryHeading
                title="Time Zone"
                className="text-[14px] leading-6 text-[#98A2B3] font-normal"
              />
              <p className="text-[#344054] text-[14px] leading-6 font-medium ">
                {'Eastern Time'}
                {getTimezoneFromCountryAndState(projectData.country, projectData.state)}
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
                {projectData.estimatedDuration + ' ' + projectData.durationType}
              </p>
            </div>
            <div className="space-y-2">
              <SenaryHeading
                title="Square Footage"
                className="text-[14px] leading-6 text-[#98A2B3] font-normal"
              />
              <p className="text-[#344054] text-[14px] leading-6 font-medium ">
                {projectData.squareFootage}
              </p>
            </div>
            <div className="space-y-2">
              <SenaryHeading
                title="Project Value"
                className="text-[14px] leading-6 text-[#98A2B3] font-normal"
              />
              <p className="text-[#344054] text-[14px] leading-6 font-medium ">
                {USCurrencyFormat.format(projectData.projectValue)}
              </p>
            </div>
            <div className="space-y-2">
              <SenaryHeading
                title="Stage"
                className="text-[14px] leading-6 text-[#98A2B3] font-normal"
              />
              <p className="text-[#344054] text-[14px] leading-6 font-medium ">
                {projectData.stage}
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
                  {projectData.projectType?.map((pt) => (
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
                  {projectData.projectBuildingUse.map((building) => (
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
                  title="Construction Type"
                  className="text-[14px] leading-6 text-[#98A2B3] font-normal"
                />

                <div className="flex items-center space-x-3">
                  {projectData.constructionTypes.map((ct) => (
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
                {projectData.description}
              </p>
            </div>
            <div className="space-y-2">
              <SenaryHeading
                title="Special Instructions"
                className="text-[14px] leading-6 text-[#98A2B3] font-normal"
              />
              <p className="text-[#344054] text-[14px] leading-6 font-medium ">
                {projectData.specialInstructions}
              </p>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  );
}
