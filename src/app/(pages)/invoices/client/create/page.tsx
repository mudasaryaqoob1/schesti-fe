'use client';
import { useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ConfigProvider, Tabs } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';

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

const G703_KEY = 'G703';
const G702_KEY = 'G702';

export default function CreateClientInvoicePage() {
  const router = useRouter();
  const token = useSelector(selectToken);
  const searchParams = useSearchParams();
  const invoiceName = searchParams.get('invoiceName');
  const [tab, setTab] = useState(G703_KEY);
  const [g7State, setG7State] = useState<G7State>({
    applicationNo: '',
    invoiceName: '',
    applicationDate: new Date().toISOString(),
    periodTo: '',
    projectNo: '',
    data: generateData(),
    address: '',
    amountCertified1: '',
    amountCertified2: '',
    by: '',
    country: '',
    date: new Date().toString(),
    distributionTo: 'architect',
    myCommissionExpires: '',
    notaryPublic: '',
    project: '',
    stateOf: '',
    subscribedAndSworn: '',
    phase: 0,
    toOwner: '',
    viaEngineer: '',

    amountCertified3: '',
    totalAdditionPreviousMonth: 0,
    totalAdditionThisMonth: 0,
    totalDeductionPreviousMonth: 0,
    totalDeductionThisMonth: 0,

    p5aPercentage: 10,
    p5bPercentage: 2,
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
    setG7State(prev => {
      if (key === 'data' || key === 'p5aPercentage' || key === 'p5bPercentage') {
        const data = [...prev.data];
        for (let index = 0; index < data.length; index++) {
          updateColumn6(data, index);
          updateColumn7(data, index);
          updateColumn8(data, index);
          updateColumn9(data, index);
        }
        return ({
          ...prev,
          [key]: value,
        });
      }
      return ({ ...prev, [key]: value })
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
      p5aPercentage: value
    })
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
    let result = (g7State.p5aPercentage / 100) * (Number(columnPreviousPeriod) + Number(columnThisPeriod));
    newData[rowIndex][9] = `${isNaN(result) ? 0 : result}`;
    return newData;
  }
  console.log(g7State)
  function handleSubmit(data: G7State) {
    clientInvoiceService
      .httpAddNewInvoice(data)
      .then((response) => {
        if (response.statusCode == 201) {
          router.push('/invoices');
        }
      })
      .catch(({ response }: any) => {
        toast.error(response?.data.message);
      });
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
                inkBarColor: '#8449EB',
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
                    className={`${tab === type ? 'text-RoyalPurple' : 'text-black'}`}
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

                      onCancel={() => {
                        router.back();
                      }}
                      onNext={() => {
                        setTab(G702_KEY);
                      }}
                    />
                  ) : (
                    <G702Component
                      state={g7State}
                      handleState={handleG7State}
                      updateRetainage={updateRetainage}
                      sumColumns={sumColumns}
                      onCancel={() => {
                        setTab(G703_KEY);
                      }}
                      onNext={() => {
                        handleSubmit(g7State);
                      }}
                    />
                  ),
              };
            })}
          />
        </ConfigProvider>
      </div>
    </section>
  );
}
