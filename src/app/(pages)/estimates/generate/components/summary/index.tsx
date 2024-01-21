'use client';
import { Dispatch, SetStateAction, useState, useEffect } from 'react';
// import Image from 'next/image';
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
import { PDFDownloadLink } from '@react-pdf/renderer';
import ClientPDF from '../clientPDF';
import { InputComponent } from '@/app/component/customInput/Input';

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
  const [pdfData, setPdfData] = useState<Object[]>([]);
  const [subcostRecord, setSubcostRecord] = useState<Number>(0);
  const [totalCostRecord, setTotalCostRecord] = useState<any>(0);
  const [saveChanges, setSaveChanges] = useState(false);
  const [estimatesRecords, setEstimatesRecords] = useState([]);
  const [detail, setDetail] = useState<any>({
    materialTax: 0,
    overheadAndProfit: 0,
    bondFee: 0,
  });

  useEffect(() => {
    setEstimateDetailsSummary(generateEstimateDetail);

    if (generateEstimateDetail?.scopeDetail?.length) {
      const updatedDataArray = generateEstimateDetail?.scopeDetail.map(
        (titleObject: any) => {
          const totalCostForTitle = titleObject.data.reduce(
            (total: any, dataItem: any) => {
              return total + parseFloat(dataItem.totalCostRecord);
            },
            0
          );
          return {
            ...titleObject,
            totalCostForTitle: totalCostForTitle.toFixed(2),
          };
        }
      );
      const totalCostForAllRecords = updatedDataArray.reduce(
        (total: any, titleObject: any) => {
          return total + parseFloat(titleObject.totalCostForTitle);
        },
        0
      );

      setEstimatesRecords(updatedDataArray);
      setSubcostRecord(totalCostForAllRecords);
      setTotalCostRecord(totalCostForAllRecords);

      const transformedArray = updatedDataArray.flatMap(({ data }: any) =>
        data.map(({ description, qty, totalCostRecord }: any) => ({
          description,
          quantity: qty,
          totalPrice: totalCostRecord,
        }))
      );

      setPdfData(transformedArray);
    }
  }, [generateEstimateDetail]);

  useEffect(() => {
    const hasValue = Object.values(detail).some((value) => value !== 0);
    if (hasValue) {
      const materialTaxValue = detail.materialTax;
      const overheadAndProfitValue = detail.overheadAndProfit;
      const bondFeeValue = detail.bondFee;

      const updatedTotalCostRecord =
        totalCostRecord *
        (1 + materialTaxValue / 100) *
        (1 + overheadAndProfitValue / 100) *
        (1 + bondFeeValue / 100);
      setTotalCostRecord(updatedTotalCostRecord);
    }
  }, [detail]);

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

          {saveChanges ? (
            <PDFDownloadLink
              document={
                <ClientPDF
                  data={estimateDetailsSummary}
                  subcostRecord={subcostRecord}
                  pdfData={pdfData}
                />
              }
              fileName="somename.pdf"
            >
              {({ loading }) => (
                <CustomButton
                  isLoading={loading}
                  loadingText="Downloading"
                  text="Generate"
                  className="!w-full"
                />
              )}
            </PDFDownloadLink>
          ) : (
            <CustomButton
              text="Save Changes"
              className="!w-full"
              onClick={() => setSaveChanges(true)}
            />
          )}
        </div>
      </div>
      {/* <PDFViewer className="h-full w-full">
        <ClientPDF
          data={estimateDetailsSummary}
          subcostRecord={subcostRecord}
          pdfData={pdfData}
          
        />
      </PDFViewer> */}
      <div>
        <div className={`${bg_style} p-5 mt-4`}>
          <div className="flex justify-between items-center">
            <QuaternaryHeading
              title="Client Information"
              className="font-bold"
            />
            {/* <div className="bg-silverGray rounded-s border border-solid border-Gainsboro cursor-pointer w-8 h-8 flex justify-center items-center">
            <Image
              src={'/chevron-down.svg'}
              alt="icon"
              width={16}
              height={16}
            />
          </div> */}
          </div>
          <div className="grid grid-cols-4 mt-4">
            <div>
              <QuinaryHeading title="Client Name" className="text-lightyGray" />
              <Description
                title={estimateDetailsSummary?.takeOffDetail?.clientName!}
                className="text-midnightBlue font-popin"
              />
            </div>
            {/* 1 */}
            <div>
              <QuinaryHeading
                title="Company Name"
                className="text-lightyGray"
              />
              <Description
                title={estimateDetailsSummary?.takeOffDetail?.companyName!}
                className="text-midnightBlue font-popin"
              />
            </div>
            {/* 2 */}
            <div>
              <QuinaryHeading
                title="Phone Number"
                className="text-lightyGray"
              />
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

        <div className={`${bg_style} p-5 mt-4`}>
          <div className="flex justify-between items-center">
            <QuaternaryHeading
              title={estimateDetailsSummary?.takeOffDetail?.projectName!}
              className="font-bold"
            />
            {/* <div className="bg-silverGray rounded-s border border-solid border-Gainsboro cursor-pointer w-8 h-8 flex justify-center items-center">
              <Image
                src={'/chevron-down.svg'}
                alt="icon"
                width={16}
                height={16}
              />
            </div> */}
          </div>
          <div className="grid grid-cols-5 grid-rows-2 mt-2 gap-y-2">
            {/* 1 */}
            <div>
              <QuinaryHeading
                title="Project Name"
                className="text-lightyGray"
              />
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
              <QuinaryHeading
                title="Project Value"
                className="text-lightyGray"
              />
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
                title={
                  estimateDetailsSummary?.takeOffDetail?.projectInformation!
                }
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
          {estimatesRecords?.length
            ? estimatesRecords.map((estimate: any) => (
                <div key={estimate.title} className={`${bg_style} p-5 mt-3`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <QuaternaryHeading
                        title={estimate.title}
                        className="font-semibold"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <QuaternaryHeading
                        title={`Total Cost: ${estimate.totalCostForTitle}`}
                        className="font-semibold"
                      />
                    </div>
                  </div>
                  <div className="estimateTable_container">
                    <EstimatesTable estimates={estimate.data} />
                  </div>
                </div>
              ))
            : null}
        </div>

        <div className="bg-celestialGray h-px  w-full my-4"></div>
        <div className="flex w-full justify-between flex-col gap-2 my-4">
          <div className="flex items-center justify-between">
            <MinDesc title="Sub Total Cost" className="text-darkgrayish" />
            <Description title={`$${subcostRecord}`} className="font-medium" />
          </div>
          <div className="flex items-center justify-between">
            <MinDesc title="Material Tax %" className="text-darkgrayish" />
            <InputComponent
              label=""
              type="number"
              name="materialTax"
              placeholder="Enter Material Tax"
              field={{
                value: detail.materialTax,
                onChange: (e) => {
                  setDetail({
                    ...detail,
                    materialTax: e.target.value,
                  });
                },
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <MinDesc title="Overhead & Profit %" className="text-darkgrayish" />
            <InputComponent
              label=""
              type="number"
              name="overheadAndProfit"
              placeholder="Enter Overhead & Profit"
              field={{
                value: detail.overheadAndProfit,
                onChange: (e) => {
                  setDetail({
                    ...detail,
                    overheadAndProfit: e.target.value,
                  });
                },
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <MinDesc title="Bond Fee %" className="text-darkgrayish" />
            <InputComponent
              label=""
              type="number"
              name="bondFee"
              placeholder="Enter Bond Fee"
              field={{
                value: detail.bondFee,
                onChange: (e) => {
                  setDetail({
                    ...detail,
                    bondFee: e.target.value,
                  });
                },
              }}
            />
          </div>
        </div>
        <div className="bg-celestialGray h-px w-full my-4"></div>
        <div className="flex items-center justify-between">
          <QuaternaryHeading title="Total Bid" />
          <Description title={`$${totalCostRecord}`} />
        </div>
      </div>
    </div>
  );
};

export default Summary;
