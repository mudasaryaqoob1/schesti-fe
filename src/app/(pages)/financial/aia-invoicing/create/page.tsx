'use client';
import { MutableRefObject, useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { ConfigProvider, Tabs } from 'antd';
import { useSearchParams } from 'next/navigation';
import { HttpService } from '@/app/services/base.service';
import { selectToken } from '@/redux/authSlices/auth.selector';
import TertiaryHeading from '@/app/component/headings/tertiary';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import { G703Component } from './components/G703';
import { G702Component } from './components/G702';
import { generateData } from './utils';
import { G7State } from '@/app/interfaces/client-invoice.interface';
import { clientInvoiceService } from '@/app/services/client-invoices.service';
import { toast } from 'react-toastify';
import CustomButton from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import { useScreenshot } from '@breezeos-dev/use-react-screenshot';
import jsPDF from 'jspdf';
import { ClientInvoiceHeader } from '../components/ClientInvoiceHeader';
import { ClientInvoiceFooter } from '../components/ClientInvoiceFooter';
import QuinaryHeading from '@/app/component/headings/quinary';
import { IUpdateCompanyDetail } from '@/app/interfaces/companyInterfaces/updateCompany.interface';
import { withAuth } from '@/app/hoc/withAuth';
import { useRouterHook } from '@/app/hooks/useRouterHook';

const G703_KEY = 'G703';
const G702_KEY = 'G702';
function CreateClientInvoicePage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const router = useRouterHook();

  const auth = useSelector((state: RootState) => state.auth);
  const user = auth.user?.user as IUpdateCompanyDetail | undefined;

  const token = useSelector(selectToken);
  const searchParams = useSearchParams();
  const invoiceName = searchParams.get('invoiceName');
  const [tab, setTab] = useState(G703_KEY);
  const ref = useRef<HTMLDivElement>();
  const [image, takeScreenshot] = useScreenshot();
  const [showDownload, setShowDownload] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const [g7State, setG7State] = useState<G7State>({
    applicationNo: '',
    invoiceName: '',
    applicationDate: new Date().toISOString(),
    periodTo: '',
    projectNo: '',
    data: generateData(),
    address: '',
    distributionTo: 'architect',
    project: '',
    phase: 0,
    toOwner: '',
    viaEngineer: '',

    totalAdditionPreviousMonth: 0,
    totalAdditionThisMonth: 0,
    totalDeductionPreviousMonth: 0,
    totalDeductionThisMonth: 0,

    p5aPercentage: 10,
    p5bPercentage: 2,

    totalAmount: 0,
    amountPaid: 0,
  });

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
      if (invoiceName) {
        handleG7State('invoiceName', invoiceName);
      }
    }
  }, [token, invoiceName]);

  function handleG7State<K extends keyof G7State>(
    key: K,
    value: (typeof g7State)[K]
  ) {
    setG7State((prev) => {
      if (
        key === 'data' ||
        key === 'p5aPercentage' ||
        key === 'p5bPercentage'
      ) {
        const data = [...prev.data];
        for (let index = 0; index < data.length; index++) {
          updateColumn6(data, index);
          updateColumn7(data, index);
          updateColumn8(data, index);
          updateColumn9(data, index);
        }
        return {
          ...prev,
          [key]: value,
        };
      }
      return { ...prev, [key]: value };
    });
  }

  function sumColumns(rows: Array<string[]>, column: number): number {
    let sum = 0;
    rows.forEach((row) => {
      let val = Number(row[column]);
      sum += isNaN(val) ? 0 : val;
    });
    return isNaN(sum) ? 0 : sum;
  }

  function updateRetainage(value: number) {
    let dataCopy = [...g7State.data];
    for (let index = 0; index < dataCopy.length; index++) {
      dataCopy = updateColumn6(dataCopy, index);
      dataCopy = updateColumn7(dataCopy, index);
      dataCopy = updateColumn8(dataCopy, index);
      dataCopy = updateColumn9(dataCopy, index);
    }
    setG7State({
      ...g7State,
      data: dataCopy,
      p5aPercentage: value,
    });
  }

  function updateCellValue(
    row: number,
    column: number,
    value: number | string
  ) {
    let newData = [...g7State.data];
    newData[row][column] = `${value}`;
    newData = updateColumn6(newData, row);
    newData = updateColumn7(newData, row);
    newData = updateColumn8(newData, row);
    newData = updateColumn9(newData, row);
    handleG7State('data', newData);
  }

  function updateColumn6(data: Array<string[]>, rowIndex: number) {
    const newData = [...data];
    const row = newData[rowIndex];
    let columnD = row[3];
    let columnE = row[4];
    let columnF = row[5];
    let sum = Number(columnD) + Number(columnE) + Number(columnF);
    newData[rowIndex][6] = `${sum}`;
    return newData;
  }

  function updateColumn7(data: Array<string[]>, rowIndex: number) {
    const newData = [...data];
    const row = newData[rowIndex];
    let columnC = Number(row[2]);
    let columnG = Number(row[6]);
    // % (G ÷ C)
    let result = (columnG / columnC) * 100;
    newData[rowIndex][7] = `${isNaN(result) ? 0 : result}`;
    return newData;
  }

  function updateColumn8(data: Array<string[]>, rowIndex: number) {
    const newData = [...data];
    const row = newData[rowIndex];
    let columnG = Number(row[6]);
    let columnC = Number(row[2]);
    let result = columnC - columnG;
    newData[rowIndex][8] = `${isNaN(result) ? 0 : result}`;
    return newData;
  }

  function updateColumn9(data: Array<string[]>, rowIndex: number) {
    const newData = [...data];
    const row = newData[rowIndex];
    let columnPreviousPeriod = row[3];
    let columnThisPeriod = row[4];
    // 10% of Column Previous Period and Column This Period
    let result =
      (g7State.p5aPercentage / 100) *
      (Number(columnPreviousPeriod) + Number(columnThisPeriod));
    newData[rowIndex][9] = `${isNaN(result) ? 0 : result}`;
    return newData;
  }

  function handleSubmit(data: G7State) {
    // Get total Amount and Total Amount Paid
    const changeOrderSummaryAdditionSum =
      data.totalAdditionThisMonth + data.totalAdditionPreviousMonth;
    const changeOrderSummaryDeductionSum =
      data.totalDeductionThisMonth + data.totalDeductionPreviousMonth;
    const changeOrderNetChanges =
      changeOrderSummaryAdditionSum - changeOrderSummaryDeductionSum;
    const originalContractSum = sumColumns(data.data, 2);

    const totalAmount = originalContractSum + changeOrderNetChanges;
    const amountPaid = Number(sumColumns(data.data, 6).toFixed(2));
    clientInvoiceService
      .httpAddNewInvoice({
        ...data,
        totalAmount,
        amountPaid,
      })
      .then((response) => {
        if (response.statusCode == 201) {
          toast.success('Invoice created successfully');
          takeScreenshot(ref.current);
          setShowDownload(true);
        }
      })
      .catch(({ response }: any) => {
        if (response?.data.message === 'Validation Failed') {
          toast.error('Please fill the required fields.');
        }
      });
  }

  function downloadPdf() {
    setIsDownloading(true);
    var doc = new jsPDF('portrait', 'in', 'a0');
    if (image) {
      const imgProps = doc.getImageProperties(image);
      const width = doc.internal.pageSize.getWidth();
      const ratio = width / imgProps.width;
      const height = ratio * imgProps.height;
      doc.internal.pageSize.height = height;
      doc.addImage(image, 'JPEG', 0, 0, width, height);
      setTimeout(() => {
        doc.save(`${invoiceName}-invoice.pdf`);
      }, 500);
      setIsDownloading(false);
    }
  }
  return (
    <section className="mx-16 my-2">
      <div className="p-5 shadow-md rounded-lg border border-silverGray  bg-white">
        <div className="flex space-x-3">
          <TertiaryHeading title="Invoice name:" className="font-medium" />
          <TertiaryHeading title={`${invoiceName}`} />
        </div>
      </div>

      <div className="px-4 py-2 my-5 shadow-md rounded-lg border border-silverGray  bg-white">
        <ConfigProvider
          theme={{
            components: {
              Tabs: {
                // inkBarColor: '#8449EB',
              },
              Input: {
                padding: 0,
                borderRadius: 0,
                colorBorder: 'transparent',
                controlHeight: 32,
                colorTextDisabled: 'black',
              },
              InputNumber: {
                borderRadius: 0,
                colorBorder: 'transparent',
                controlHeight: 32,
              },
              Table: {
                cellPaddingBlock: 0,
                cellPaddingInline: 0,
              },
            },
          }}
        >
          <Tabs
            destroyInactiveTabPane
            onChange={(key) => {
              setTab(key);
            }}
            activeKey={tab}
            items={[G703_KEY, G702_KEY].map((type) => {
              return {
                key: type,
                label: (
                  <QuaternaryHeading
                    title={type}
                    className={`${tab === type ? 'text-schestiPrimary' : 'text-black'
                      }`}
                  />
                ),
                tabKey: type,
                children:
                  tab === G703_KEY ? (
                    <G703Component
                      state={g7State}
                      handleState={handleG7State}
                      sumColumns={sumColumns}
                      updateCellValue={updateCellValue}
                    >
                      <CustomButton
                        onClick={() => setTab(G702_KEY)}
                        text="Next"
                        className="!w-40"
                      />
                    </G703Component>
                  ) : (
                    <G702Component
                      state={g7State}
                      handleState={handleG7State}
                      updateRetainage={updateRetainage}
                      sumColumns={sumColumns}
                    >
                      <WhiteButton
                        onClick={() => {
                          setTab(G703_KEY);
                        }}
                        text="Previous"
                        className="!w-40"
                      />
                      {showDownload ? (
                        <CustomButton
                          text={
                            isDownloading ? 'Downloading...' : 'Download PDF'
                          }
                          onClick={() => downloadPdf()}
                          className="!w-48"
                        />
                      ) : (
                        <CustomButton
                          text="Create"
                          className="!w-48"
                          onClick={() => {
                            handleSubmit(g7State);
                          }}
                        />
                      )}
                    </G702Component>
                  ),
              };
            })}
          />
        </ConfigProvider>
      </div>
      <div
        ref={ref as MutableRefObject<HTMLDivElement>}
        className="space-y-5 w-full absolute -left-[2500px] border p-6"
      // className="space-y-5 w-full border p-6"
      >
        <ClientInvoiceHeader />
        <div className="flex justify-end w-full">
          {/* <div>
            <img width={100} height={100}  alt='logo' src={user?.avatar ? user?.avatar : '/logo.svg'} />
          </div> */}
          <div>
            <QuinaryHeading title={user!.name} />
            <QuinaryHeading title={user!.email || ''} className="mt-1" />
          </div>
        </div>
        <ConfigProvider
          theme={{
            components: {
              Tabs: {
                // inkBarColor: '#8449EB',
              },
              Input: {
                padding: 0,
                borderRadius: 0,
                colorBorder: 'transparent',
                controlHeight: 32,
                colorTextDisabled: 'black',
              },
              InputNumber: {
                borderRadius: 0,
                colorBorder: 'transparent',
                controlHeight: 32,
              },
              Table: {
                cellPaddingBlock: 0,
                cellPaddingInline: 0,
              },
            },
          }}
        >
          <G702Component
            state={g7State}
            handleState={handleG7State}
            updateRetainage={updateRetainage}
            sumColumns={sumColumns}
            showValidation={false}
          />
          <ClientInvoiceFooter />
          <G703Component
            state={g7State}
            handleState={handleG7State}
            sumColumns={sumColumns}
            updateCellValue={updateCellValue}
            showAddAndDelete={false}
          />
        </ConfigProvider>
        {/* <div className="flex justify-end mr-8">
          <Image width={100} height={20} alt="logo" src="/powered-by.png" />
        </div> */}
        <ClientInvoiceFooter />
      </div>
    </section>
  );
}

export default withAuth(CreateClientInvoicePage);
