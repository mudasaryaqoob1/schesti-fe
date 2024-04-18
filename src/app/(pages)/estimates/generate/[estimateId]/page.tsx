'use client';
import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from 'react';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Description from '@/app/component/description';
import { selectToken } from '@/redux/authSlices/auth.selector';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import QuinaryHeading from '@/app/component/headings/quinary';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { bg_style } from '@/globals/tailwindvariables';
import MinDesc from '@/app/component/description/minDesc';
import EstimatesTable from '../components/estimatesTable';
import EstimatePDF from './estimatePDF';
import CustomButton from '@/app/component/customButton/button';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { estimateRequestService } from '@/app/services/estimates.service';
import { IUpdateCompanyDetail } from '@/app/interfaces/companyInterfaces/updateCompany.interface';
import { withAuth } from '@/app/hoc/withAuth';
import { USCurrencyFormat } from '@/app/utils/format';
import { HttpService } from '@/app/services/base.service';

const ViewEstimateDetail = () => {
  const { estimateId } = useParams();

  const token = useSelector(selectToken);

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  const auth = useSelector((state: RootState) => state.auth);
  const user = auth.user?.user as IUpdateCompanyDetail | undefined;

  const [pdfData, setPdfData] = useState<Object[]>([]);
  const [estimateDetailsSummary, setEstimateDetailsSummary] = useState<any>();
  const [estimatesRecord, setEstimatesRecord] = useState([]);

  const fetchEstimateDetail = useCallback(async () => {
    const result =
      await estimateRequestService.httpGetGeneratedEstimateDetail(estimateId);
    if (result.statusCode === 200) {
      setEstimateDetailsSummary({
        estimateRequestIdDetail:
          result.data.generatedEstimates.estimateRequestIdDetail,
        totalBidDetail: result.data.generatedEstimates.totalBidDetail,
        totalCost: result.data.generatedEstimates.totalCost,
      });

      if (result.data?.generatedEstimates?.estimateScope?.length) {
        const updatedDataArray =
          result.data?.generatedEstimates?.estimateScope.map(
            (titleObject: any) => {
              const totalCostForTitle = titleObject.scopeItems.reduce(
                (total: any, dataItem: any) => {
                  return total + parseFloat(dataItem.totalCostRecord);
                },
                0
              );
              return {
                ...titleObject,
                scopeItems: titleObject.scopeItems,
                totalCostForTitle: totalCostForTitle.toFixed(2),
              };
            }
          );

        setEstimatesRecord(updatedDataArray);

        const transformedArray = updatedDataArray.flatMap(
          ({ scopeItems }: any) =>
            scopeItems.map(({ description, qty, totalCostRecord }: any) => ({
              description,
              quantity: qty,
              total: totalCostRecord,
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

  console.log(estimateDetailsSummary, 'estimateDetailsSummary', pdfData);

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
              <EstimatePDF
                estimateDetail={estimateDetailsSummary}
                pdfData={pdfData}
                user={user}
              />
            }
            fileName="estimate-document.pdf"
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

          {/* <PDFViewer>
            <EstimatePDF
              estimateDetail={estimateDetailsSummary}
              pdfData={pdfData}
              user={user}
            />
          </PDFViewer> */}
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
              title={
                estimateDetailsSummary?.estimateRequestIdDetail?.clientName!
              }
              className="text-midnightBlue font-popin"
            />
          </div>
          {/* 1 */}
          <div>
            <QuinaryHeading title="Company Name" className="text-lightyGray" />
            <Description
              title={
                estimateDetailsSummary?.estimateRequestIdDetail?.companyName!
              }
              className="text-midnightBlue font-popin"
            />
          </div>
          {/* 2 */}
          <div>
            <QuinaryHeading title="Phone Number" className="text-lightyGray" />
            <Description
              title={estimateDetailsSummary?.estimateRequestIdDetail?.phone!}
              className="text-midnightBlue font-popin"
            />
          </div>
          {/* 3 */}
          <div>
            <QuinaryHeading title="Email" className="text-lightyGray" />
            <Description
              title={estimateDetailsSummary?.estimateRequestIdDetail?.email!}
              className="text-midnightBlue font-popin"
            />
          </div>
        </div>
      </div>

      <div className={`${bg_style} p-5 mt-4`}>
        <div className="flex justify-between items-center">
          <QuaternaryHeading
            title={
              estimateDetailsSummary?.estimateRequestIdDetail?.projectName!
            }
            className="font-bold"
          />
        </div>
        <div className="grid grid-cols-5 grid-rows-2 mt-2 gap-y-2">
          {/* 1 */}
          <div>
            <QuinaryHeading title="Project Name" className="text-lightyGray" />
            <Description
              title={
                estimateDetailsSummary?.estimateRequestIdDetail?.projectName!
              }
              className="text-midnightBlue font-popin"
            />
          </div>
          {/* 2 */}
          <div>
            <QuinaryHeading title="Lead Source" className="text-lightyGray" />
            <Description
              title={
                estimateDetailsSummary?.estimateRequestIdDetail?.leadSource!
              }
              className="text-midnightBlue font-popin"
            />
          </div>
          {/* 2 */}
          <div>
            <QuinaryHeading title="Project Value" className="text-lightyGray" />
            <Description
              title={
                estimateDetailsSummary?.estimateRequestIdDetail?.projectValue!
              }
              className="text-midnightBlue font-popin"
            />
          </div>
          {/* 3 */}
          <div>
            <QuinaryHeading title="Email" className="text-lightyGray" />
            <Description
              title={estimateDetailsSummary?.estimateRequestIdDetail?.email!}
              className="text-midnightBlue font-popin"
            />
          </div>
          {/* <div>
            <QuinaryHeading title="Address" className="text-lightyGray" />
            <Description
              title="----"
              className="text-midnightBlue font-popin"
            />
          </div> */}
          {/* 3 */}
          <div className=" row-span-2 text-start">
            <QuinaryHeading
              title="Project Information"
              className="text-lightyGray"
            />
            <Description
              title={
                estimateDetailsSummary?.estimateRequestIdDetail
                  ?.projectInformation!
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
                      title={`Total Cost: ${USCurrencyFormat.format(
                        estimate.totalCostForTitle
                      )}`}
                      className="font-semibold"
                    />
                  </div>
                </div>
                <div className="estimateTable_container">
                  <EstimatesTable estimates={estimate.scopeItems} />
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
            title={`${USCurrencyFormat.format(
              estimateDetailsSummary?.totalCost
            )}`}
            className="font-medium"
          />
        </div>
        <div className="flex items-center justify-between">
          <MinDesc title="Material Tax %" className="text-darkgrayish" />
          <Description
            title={`${USCurrencyFormat.format(
              estimateDetailsSummary?.totalBidDetail?.materialTax
            )}`}
            className="font-medium"
          />
        </div>
        <div className="flex items-center justify-between">
          <MinDesc title="Overhead & Profit %" className="text-darkgrayish" />
          <Description
            title={`${USCurrencyFormat.format(
              estimateDetailsSummary?.totalBidDetail?.overheadAndProfit
            )}`}
            className="font-medium"
          />
        </div>
        <div className="flex items-center justify-between">
          <MinDesc title="Bond Fee %" className="text-darkgrayish" />
          <Description
            title={`${USCurrencyFormat.format(
              estimateDetailsSummary?.totalBidDetail?.bondFee
            )}`}
            className="font-medium"
          />
        </div>
      </div>
      <div className="bg-celestialGray h-px w-full my-4"></div>
      <div className="flex items-center justify-between">
        <QuaternaryHeading className="font-semibold" title="Total Cost" />
        <Description
          className="font-semibold"
          title={`${USCurrencyFormat.format(
            estimateDetailsSummary?.totalCost +
              estimateDetailsSummary?.totalBidDetail?.bondFee +
              estimateDetailsSummary?.totalBidDetail?.overheadAndProfit +
              estimateDetailsSummary?.totalBidDetail?.materialTax
          )}`}
        />
      </div>
    </div>
  );
};

export default withAuth(ViewEstimateDetail);
