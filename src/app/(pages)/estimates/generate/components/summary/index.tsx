'use client';
import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';

import CustomButton from '@/app/component/customButton/button';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { bg_style } from '@/globals/tailwindvariables';
// import { useRouter } from 'next/navigation';
// import AddItemTable from '@/app/component/table/table';
// import { headings } from './data';
import Description from '@/app/component/description/index';
import MinDesc from '@/app/component/description/minDesc';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import QuinaryHeading from '@/app/component/headings/quinary';
import { selectGeneratedEstimateDetail } from '@/redux/estimate/estimateRequestSelector';
import EstimatesTable from '../estimatesTable';

interface Props {
  setPrevNext: Dispatch<SetStateAction<number>>;
}

interface basicInformation {
  clientName: string;
  companyName: string;
  phone: string;
  email: string;
  leadSource: string;
  projectName: string;
  projectValue: string;
  projectInformation: string;
  salePerson: {
    firstName: string;
    lastName: string;
  };
  estimator: {
    firstName: string;
    lastName: string;
  };
  drawingsDocuments: [];
  takeOffReports: [];
  otherDocuments: [];
}

const Summary = ({ setPrevNext }: Props) => {
  const { generateEstimateDetail } = useSelector(selectGeneratedEstimateDetail);
  const [estimateDetailsSummary, setEstimateDetailsSummary] = useState<{
    takeOffDetail: basicInformation;
    scopeDetail: Object[];
  }>();
  const [subcostRecord, setSubcostRecord] = useState<Number>(0);

  useEffect(() => {
    setEstimateDetailsSummary(generateEstimateDetail);
    if (generateEstimateDetail?.scopeDetail?.length) {
      let totalCost: any = 0;
      generateEstimateDetail?.scopeDetail?.forEach((entry: any) => {
        Object.values(entry).forEach((items: any) => {
          items.forEach((item: any) => {
            totalCost += parseFloat(item.totalCostRecord);
          });
        });
      });
      setSubcostRecord(totalCost);
    }
  }, [generateEstimateDetail]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <TertiaryHeading
          title="Scope"
          className="text-graphiteGray font-semibold"
        />
        <div className="flex gap-3 items-center lg:w-3/12">
          <CustomButton
            text="Previous"
            className="!text-graphiteGray !bg-snowWhite !shadow-scenarySubdued 
              border-2 border-solid !border-celestialGray"
            onClick={() => setPrevNext((prev) => prev - 1)}
          />

          <CustomButton text="Generate" className="!w-full" />
        </div>
      </div>

      <div className={`${bg_style} p-5 mt-4`}>
        <div className="flex justify-between items-center">
          <QuaternaryHeading title="Client Information" className="font-bold" />
          <div className="bg-silverGray rounded-s border border-solid border-Gainsboro cursor-pointer w-8 h-8 flex justify-center items-center">
            <Image
              src={'/chevron-down.svg'}
              alt="icon"
              width={16}
              height={16}
            />
          </div>
        </div>
        <div className="grid grid-cols-6 mt-4">
          <div>
            <QuinaryHeading title="Client Name" className="text-lightyGray" />
            <Description
              title={estimateDetailsSummary?.takeOffDetail?.clientName!}
              className="text-midnightBlue font-popin"
            />
          </div>
          {/* 1 */}
          <div>
            <QuinaryHeading title="Company Name" className="text-lightyGray" />
            <Description
              title={estimateDetailsSummary?.takeOffDetail?.companyName!}
              className="text-midnightBlue font-popin"
            />
          </div>
          {/* 2 */}
          <div>
            <QuinaryHeading title="Phone Number" className="text-lightyGray" />
            <Description
              title={estimateDetailsSummary?.takeOffDetail?.phone!}
              className="text-midnightBlue font-popin"
            />
          </div>
          {/* 3 */}
          <div>
            <QuinaryHeading title="Email" className="text-lightyGray" />
            <Description
              title={estimateDetailsSummary?.takeOffDetail?.email!}
              className="text-midnightBlue font-popin"
            />
          </div>
        </div>
      </div>
      {/*  */}

      <div className={`${bg_style} p-5 mt-4`}>
        <div className="flex justify-between items-center">
          <QuaternaryHeading
            title={estimateDetailsSummary?.takeOffDetail?.projectName!}
            className="font-bold"
          />
          <div className="bg-silverGray rounded-s border border-solid border-Gainsboro cursor-pointer w-8 h-8 flex justify-center items-center">
            <Image
              src={'/chevron-down.svg'}
              alt="icon"
              width={16}
              height={16}
            />
          </div>
        </div>
        <div className="grid grid-cols-6 grid-rows-2 mt-2 gap-y-2">
          {/* 1 */}
          <div>
            <QuinaryHeading title="Project Name" className="text-lightyGray" />
            <Description
              title={estimateDetailsSummary?.takeOffDetail?.projectName!}
              className="text-midnightBlue font-popin"
            />
          </div>
          {/* 2 */}
          <div>
            <QuinaryHeading title="Lead Source" className="text-lightyGray" />
            <Description
              title={estimateDetailsSummary?.takeOffDetail?.leadSource!}
              className="text-midnightBlue font-popin"
            />
          </div>
          {/* 2 */}
          <div>
            <QuinaryHeading title="Project Value" className="text-lightyGray" />
            <Description
              title={estimateDetailsSummary?.takeOffDetail?.projectValue!}
              className="text-midnightBlue font-popin"
            />
          </div>
          {/* 3 */}
          <div>
            <QuinaryHeading title="Email" className="text-lightyGray" />
            <Description
              title={estimateDetailsSummary?.takeOffDetail?.email!}
              className="text-midnightBlue font-popin"
            />
          </div>
          <div>
            <QuinaryHeading title="Address" className="text-lightyGray" />
            <Description
              title="----"
              className="text-midnightBlue font-popin"
            />
          </div>
          {/* 3 */}
          <div className="col-span-full row-span-2 text-start">
            <QuinaryHeading
              title="Project Information"
              className="text-lightyGray"
            />
            <Description
              title={estimateDetailsSummary?.takeOffDetail?.projectInformation!}
              className="text-midnightBlue font-popin"
            />
          </div>
        </div>
      </div>
      {/* center part */}
      <TertiaryHeading
        title="Estimates"
        className="text-graphiteGray font-semibold my-4"
      />

      <div>
        {estimateDetailsSummary?.scopeDetail.map((estimate: any) => {
          return (
            <>
              <div>
                {Object.entries(estimate).map(([key, value]: any[], i) => {
                  const totalCostRecordTotal = value.reduce(
                    (total: any, obj: any) => {
                      return total + parseFloat(obj.totalCostRecord);
                    },
                    0
                  );

                  if (value?.length > 0) {
                    return (
                      <div key={i} className={`${bg_style} p-5 mt-3`}>
                        <div className="flex items-center justify-between gap-2">
                          <QuaternaryHeading
                            title={key}
                            className="font-semibold"
                          />
                          <Description
                            title={`Trade Cost: $${totalCostRecordTotal}`}
                            className="text-lg font-normal"
                          />
                        </div>
                        <div className="estimateTable_container">
                          {value?.length > 0 && (
                            <EstimatesTable estimates={value} />
                          )}
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </>
          );
        })}
      </div>

      <div className="bg-celestialGray h-px  w-full my-4"></div>
      <div className="flex w-full justify-between flex-col gap-2 my-4">
        <div className="flex items-center justify-between">
          <MinDesc title="Sub Total Cost" className="text-darkgrayish" />
          <Description title={`$${subcostRecord}`} className="font-medium" />
        </div>
        <div className="flex items-center justify-between">
          <MinDesc title="Material Tax %" className="text-darkgrayish" />
          <Description
            title="0.5%"
            className="font-medium text-graphiteGray bg-cloudWhite2 rounded-[4px] p-1"
          />
        </div>
        <div className="flex items-center justify-between">
          <MinDesc title="Overhead & Profit %" className="text-darkgrayish" />
          <Description
            title="0.5%"
            className="font-medium text-graphiteGray bg-cloudWhite2 rounded-[4px] p-1"
          />
        </div>
        <div className="flex items-center justify-between">
          <MinDesc title="Bond Fee %" className="text-darkgrayish" />
          <Description
            title="0.5%"
            className="font-medium text-graphiteGray bg-cloudWhite2 rounded-[4px] p-1"
          />
        </div>
      </div>
      <div className="bg-celestialGray h-px w-full my-4"></div>
      <div className="flex items-center justify-between">
        <QuaternaryHeading title="Total Bid" />
        <Description title={`$${subcostRecord}`} />
      </div>
    </div>
  );
};

export default Summary;
