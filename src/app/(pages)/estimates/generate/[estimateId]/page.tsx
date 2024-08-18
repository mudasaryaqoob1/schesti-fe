'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import _ from 'lodash';
import jsPDF from 'jspdf';
import { AxiosError } from 'axios';
import { CSVLink } from 'react-csv';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
// import { RootState } from '@/redux/rootReducer';
import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import html2canvas from 'html2canvas';
import { withAuth } from '@/app/hoc/withAuth';
import AwsS3 from '@/app/utils/S3Intergration';
import ClientPDF from '../components/clientPDF';
import ModalComponent from '@/app/component/modal';
import { formatDataFromAntdColumns } from './utils';
import Description from '@/app/component/description';
import { USCurrencyFormat } from '@/app/utils/format';
import { bg_style } from '@/globals/tailwindvariables';
import MinDesc from '@/app/component/description/minDesc';
import WhiteButton from '@/app/component/customButton/white';
import QuinaryHeading from '@/app/component/headings/quinary';
import CustomButton from '@/app/component/customButton/button';
import EmailTemplate from '@/app/component/customEmailTemplete';
import TertiaryHeading from '@/app/component/headings/tertiary';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import { estimateRequestService } from '@/app/services/estimates.service';
import EstimatesTable, {
  estimateTableColumns,
} from '../components/estimatesTable';
import { IUpdateCompanyDetail } from '@/app/interfaces/companyInterfaces/updateCompany.interface';
// import EstimatePDF from './estimatePDF';

const ViewEstimateDetail = () => {
  const { estimateId } = useParams();
  const pdfContainerRef = useRef<HTMLDivElement>(null);

  const auth = useSelector((state: any) => state.auth);
  const user = auth.user?.user as IUpdateCompanyDetail | undefined;

  const [emailModal, setEmailModal] = useState(false);
  const [pdfData, setPdfData] = useState<Object[]>([]);
  const [csvData, setCsvData] = useState<string[][]>([]);
  const [estimatesRecord, setEstimatesRecord] = useState([]);
  const [estimateDetailsSummary, setEstimateDetailsSummary] = useState<any>();

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

  function downloadCSV() {
    //  if no estimate details || estimates record return
    if (!estimateDetailsSummary || !estimatesRecord.length) {
      toast.error('No data to download');
      return;
    }
    // Client Information Row

    const clientInformationHeader = [
      'Client Name',
      'Company Name',
      'Phone Number',
      'Email',
    ];
    const clientInformationData = [
      estimateDetailsSummary?.estimateRequestIdDetail?.clientName!,
      estimateDetailsSummary?.estimateRequestIdDetail?.companyName!,
      estimateDetailsSummary?.estimateRequestIdDetail?.phone!,
      estimateDetailsSummary?.estimateRequestIdDetail?.email!,
    ];

    // Project Information Row
    const projectHeader = [
      'Project Name',
      'Lead Source',
      'Project Value',
      'Email',
      'Project Information',
    ];
    const projectData = [
      estimateDetailsSummary?.estimateRequestIdDetail?.projectName!,
      estimateDetailsSummary?.estimateRequestIdDetail?.leadSource!,
      estimateDetailsSummary?.estimateRequestIdDetail?.projectValue!,
      estimateDetailsSummary?.estimateRequestIdDetail?.email!,
      estimateDetailsSummary?.estimateRequestIdDetail?.projectInformation!,
    ];

    // Estimate Row
    const estimateHeader = [
      'Title',
      'Description',
      'Qty',
      'Wastage',
      'Qty with wastage',
      'Total Labour Hours',
      'Per Hours Labor Rate',
      'Total Labor Cost',
      'Unit Material Cost',
      'Total Material Cost',
      'Total Equipment Cost',
      'Total Cost',
    ];

    const scopeItems = _.flatMap(estimatesRecord, (estimate: any) => {
      return estimate?.scopeItems.map((item: any) => ({
        ...item,
        category: estimate.title,
      }));
    });

    let estimateData = formatDataFromAntdColumns(
      estimateTableColumns,
      scopeItems
    ).map((row: any) => {
      return [
        row.category,
        row.description,
        row.qty,
        row.wastage,
        row.qtyWithWastage,
        row.totalLabourHours,
        row.perHourLaborRate,
        row.totalLaborCost,
        row.unitMaterialCost,
        row.totalMaterialCost,
        row.totalEquipmentCost,
        row.totalCost,
      ];
    });

    // Summary Row
    const summaryHeader = [
      'Sub Total Cost',
      'Material Tax %',
      'Overhead & Profit %',
      'Bond Fee %',
      'Total Cost',
    ];
    const summaryData = [
      estimateDetailsSummary?.totalCost,
      estimateDetailsSummary?.totalBidDetail?.materialTax,
      estimateDetailsSummary?.totalBidDetail?.overheadAndProfit,
      estimateDetailsSummary?.totalBidDetail?.bondFee,
      estimateDetailsSummary?.totalCost +
        estimateDetailsSummary?.totalBidDetail?.bondFee +
        estimateDetailsSummary?.totalBidDetail?.overheadAndProfit +
        estimateDetailsSummary?.totalBidDetail?.materialTax,
    ];

    setCsvData([
      clientInformationHeader,
      clientInformationData,
      [],
      [],
      projectHeader,
      projectData,
      [],
      [],
      estimateHeader,
      ...estimateData,
      [],
      [],
      summaryHeader,
      summaryData,
    ]);
  }

  const generatePdfBlob = async () => {
    const blob = await pdf(
      <ClientPDF
        estimateDetail={estimateDetailsSummary}
        subcostRecord={estimateDetailsSummary?.totalCost}
        pdfData={pdfData}
        user={user}
      />
    ).toBlob();
    return blob;
  };

  const estimateEmailSendHandler = async (bodyObject: FormData) => {
    let generatedBlobl = await generatePdfBlob();

    const url = await new AwsS3(
      generatedBlobl,
      'documents/estimates/'
    ).getS3URL();

    bodyObject.set('estimateUrl', url);

    try {
      const response =
        await estimateRequestService.httpEstimateEmailSender(bodyObject);

      if (response.statusCode == 200) {
        setEmailModal(false);
        toast.success('Email sent successfully');
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message || 'An error occurred');
    }
  };

  function handleDownload() {
    const container = pdfContainerRef.current!;
    container.style.height = 'auto'; // Temporarily expand the container

    html2canvas(container, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let positionY = 0;
      const pageHeight = pdf.internal.pageSize.height;

      while (positionY < imgHeight) {
        pdf.addImage(imgData, 'PNG', 0, -positionY, imgWidth, imgHeight);
        positionY += pageHeight;
        if (positionY < imgHeight) {
          pdf.addPage();
        }
      }
      pdf.save('company-estimate.pdf');

      // Restore the original height
      container.style.height = ''; // Remove inline style to revert to original
    });
  }
  return (
    <div className="">
      <div className="flex justify-between items-center pt-12 px-12">
        <TertiaryHeading
          title="Scope"
          className="text-graphiteGray font-semibold"
        />
        <div className="flex gap-3 items-center">
          <WhiteButton
            text="Send Email"
            className="w-full"
            onClick={() => setEmailModal(true)}
          />
          <CSVLink
            data={csvData}
            className="!w-full"
            asyncOnClick={true}
            filename={`estimate-${Date.now()}.csv`}
            onClick={(_e, done) => {
              downloadCSV();
              done();
            }}
          >
            <WhiteButton text="Download CSV" className="w-full" />
          </CSVLink>

          <WhiteButton
            text="Comapny PDF"
            className="w-full"
            onClick={handleDownload}
          />
          {/* <PDFDownloadLink
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
          </PDFDownloadLink> */}

          <PDFDownloadLink
            document={
              <ClientPDF
                estimateDetail={estimateDetailsSummary}
                subcostRecord={estimateDetailsSummary?.totalCost}
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
                className="!w-40"
              />
            )}
          </PDFDownloadLink>

          {/* <PDFViewer>
            <ClientPDF
               estimateDetail={estimateDetailsSummary}
               subcostRecord={estimateDetailsSummary?.totalCost}
               pdfData={pdfData}
               user={user}
            />
          </PDFViewer> */}
        </div>
      </div>

      <div className="px-12" ref={pdfContainerRef}>
        <div className={`${bg_style} p-5 mt-4`}>
          <div className="flex justify-between items-center">
            <QuaternaryHeading
              title="Client Information"
              className="font-bold"
            />
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
              <QuinaryHeading
                title="Company Name"
                className="text-lightyGray"
              />
              <Description
                title={
                  estimateDetailsSummary?.estimateRequestIdDetail?.companyName!
                }
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
          <div className="grid grid-cols-5 grid-rows-1 mt-2 gap-y-2">
            {/* 1 */}
            <div>
              <QuinaryHeading
                title="Project Name"
                className="text-lightyGray"
              />
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
              <QuinaryHeading
                title="Project Value"
                className="text-lightyGray"
              />
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
              title={`$${USCurrencyFormat.format(
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
      <ModalComponent setOpen={setEmailModal} open={emailModal}>
        <EmailTemplate
          to={estimateDetailsSummary?.estimateRequestIdDetail?.email}
          setEmailModal={setEmailModal}
          submitHandler={estimateEmailSendHandler}
          isFileUploadShow={false}
          cc={true}
        />
      </ModalComponent>
    </div>
  );
};

export default withAuth(ViewEstimateDetail);
