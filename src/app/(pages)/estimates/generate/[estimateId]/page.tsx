'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Description from '@/app/component/description';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import QuinaryHeading from '@/app/component/headings/quinary';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { bg_style } from '@/globals/tailwindvariables';
import MinDesc from '@/app/component/description/minDesc';
import { useSelector } from 'react-redux';
import { selectGeneratedEstimateDetail } from '@/redux/estimate/estimateRequestSelector';
import EstimatesTable from '../components/estimatesTable';
import ClientPDF from '../components/clientPDF';
import CustomButton from '@/app/component/customButton/button';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { estimateRequestService } from '@/app/services/estimates.service';

const ViewEstimateDetail = () => {
  const { estimateId } = useParams();

  const { estimateSummary } = useSelector(selectGeneratedEstimateDetail);

  const [pdfData, setPdfData] = useState<Object[]>([]);
  const [estimateDetailsSummary, setEstimateDetailsSummary] = useState<any>();
  const [estimatesRecord, setEstimatesRecord] = useState([]);

  useEffect(() => {
    setEstimateDetailsSummary(estimateSummary);

    if (estimateSummary?.estimateItems?.length) {
      const updatedDataArray = estimateSummary?.estimateItems.map(
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
      setEstimatesRecord(updatedDataArray);

      const transformedArray = updatedDataArray.flatMap(({ data }: any) =>
        data.map(({ description, qty, totalCostRecord }: any) => ({
          description,
          quantity: qty,
          totalPrice: totalCostRecord,
        }))
      );

      setPdfData(transformedArray);
    }
  }, [estimateSummary]);

  const fetchEstimateDetail = useCallback(async () => {
    const result =
      await estimateRequestService.httpGetGeneratedEstimateDetail(estimateId);
    if (result.statusCode === 200) {
      setEstimateDetailsSummary({
        ...result.data,
        ...result.data.estimateRequestID,
      });

      if (result.data?.estimateItems?.length) {
        const updatedDataArray = result.data?.estimateItems.map(
          (titleObject: any) => {
            const totalCostForTitle = titleObject.estimateItems.reduce(
              (total: any, dataItem: any) => {
                return total + parseFloat(dataItem.totalCostRecord);
              },
              0
            );
            return {
              ...titleObject,
              data: titleObject.estimateItems,
              totalCostForTitle: totalCostForTitle.toFixed(2),
            };
          }
        );

        setEstimatesRecord(updatedDataArray);

        const transformedArray = updatedDataArray.flatMap(({ data }: any) =>
          data.map(({ description, qty, totalCostRecord }: any) => ({
            description,
            quantity: qty,
            totalPrice: totalCostRecord,
          }))
        );

        setPdfData(transformedArray);
      }
    }
  }, []);

  useEffect(() => {
    if (estimateId) {
      fetchEstimateDetail();
    }
  }, [estimateId]);

  console.log(estimateDetailsSummary, 'estimatesRecordestimatesRecord');

  return (
    <div className="p-12">
      <div className="flex justify-between items-center">
        <TertiaryHeading
          title="Scope"
          className="text-graphiteGray font-semibold"
        />
        <div className="flex gap-3 items-center">
          <PDFDownloadLink
            document={
              <ClientPDF
                data={{
                  ...estimateDetailsSummary,
                  takeOffDetail: estimateDetailsSummary?.totalBidDetail,
                }}
                subcostRecord={estimateDetailsSummary?.totalCost}
                pdfData={pdfData}
              />
            }
            fileName="somename.pdf"
          >
            {({ loading }) => (
              <CustomButton
                isLoading={loading}
                loadingText="Downloading"
                text="Download PDF"
                className="!w-full"
              />
            )}
          </PDFDownloadLink>
        </div>
      </div>

      <div className={`${bg_style} p-5 mt-4`}>
        <div className="flex justify-between items-center">
          <QuaternaryHeading title="Client Information" className="font-bold" />
        </div>
        <div className="grid grid-cols-4 mt-4">
          <div>
            <QuinaryHeading title="Client Name" className="text-lightyGray" />
            <Description
              title={estimateDetailsSummary?.estimateRequestID?.clientName!}
              className="text-midnightBlue font-popin"
            />
          </div>
          {/* 1 */}
          <div>
            <QuinaryHeading title="Company Name" className="text-lightyGray" />
            <Description
              title={estimateDetailsSummary?.estimateRequestID?.companyName!}
              className="text-midnightBlue font-popin"
            />
          </div>
          {/* 2 */}
          <div>
            <QuinaryHeading title="Phone Number" className="text-lightyGray" />
            <Description
              title={estimateDetailsSummary?.estimateRequestID?.phone!}
              className="text-midnightBlue font-popin"
            />
          </div>
          {/* 3 */}
          <div>
            <QuinaryHeading title="Email" className="text-lightyGray" />
            <Description
              title={estimateDetailsSummary?.estimateRequestID?.email!}
              className="text-midnightBlue font-popin"
            />
          </div>
        </div>
      </div>

      <div className={`${bg_style} p-5 mt-4`}>
        <div className="flex justify-between items-center">
          <QuaternaryHeading
            title={estimateDetailsSummary?.estimateRequestID?.projectName!}
            className="font-bold"
          />
        </div>
        <div className="grid grid-cols-5 grid-rows-2 mt-2 gap-y-2">
          {/* 1 */}
          <div>
            <QuinaryHeading title="Project Name" className="text-lightyGray" />
            <Description
              title={estimateDetailsSummary?.estimateRequestID?.projectName!}
              className="text-midnightBlue font-popin"
            />
          </div>
          {/* 2 */}
          <div>
            <QuinaryHeading title="Lead Source" className="text-lightyGray" />
            <Description
              title={estimateDetailsSummary?.estimateRequestID?.leadSource!}
              className="text-midnightBlue font-popin"
            />
          </div>
          {/* 2 */}
          <div>
            <QuinaryHeading title="Project Value" className="text-lightyGray" />
            <Description
              title={estimateDetailsSummary?.estimateRequestID?.projectValue!}
              className="text-midnightBlue font-popin"
            />
          </div>
          {/* 3 */}
          <div>
            <QuinaryHeading title="Email" className="text-lightyGray" />
            <Description
              title={estimateDetailsSummary?.estimateRequestID?.email!}
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
                estimateDetailsSummary?.estimateRequestID?.projectInformation!
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
        {estimatesRecord?.length
          ? estimatesRecord.map((estimate: any) => (
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
          <Description
            title={`$${estimateDetailsSummary?.totalCost}`}
            className="font-medium"
          />
        </div>
        <div className="flex items-center justify-between">
          <MinDesc title="Material Tax %" className="text-darkgrayish" />
          <Description
            title={`$${estimateDetailsSummary?.totalBidDetail?.materialTax}`}
            className="font-medium"
          />
        </div>
        <div className="flex items-center justify-between">
          <MinDesc title="Overhead & Profit %" className="text-darkgrayish" />
          <Description
            title={`$${estimateDetailsSummary?.totalBidDetail?.overheadAndProfit}`}
            className="font-medium"
          />
        </div>
        <div className="flex items-center justify-between">
          <MinDesc title="Bond Fee %" className="text-darkgrayish" />
          <Description
            title={`$${estimateDetailsSummary?.totalBidDetail?.bondFee}`}
            className="font-medium"
          />
        </div>
      </div>
      <div className="bg-celestialGray h-px w-full my-4"></div>
      <div className="flex items-center justify-between">
        <QuaternaryHeading title="Total Bid" />
        <Description title={`$${estimateDetailsSummary?.totalCost}`} />
      </div>
    </div>
  );
};

export default ViewEstimateDetail;
