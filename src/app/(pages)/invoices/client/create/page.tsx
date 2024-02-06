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
    applicationDate: new Date().toString(),
    periodTo: new Date().toString(),
    projectNo: '',
    data: generateData(),
    address: '',
    amountCertified1: '',
    amountCertified2: '',
    by: '',
    country: '',
    date: new Date().toString(),
    distributionTo: 'Architect',
    myCommissionExpires: '',
    notaryPublic: '',
    lessPreviousCertificatesForPayment: '0.00',
    orignalContractSum: 0,
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
    setG7State({ ...g7State, [key]: value });
  }
  function sumColumns(rows: Array<string[]>, column: number): number {
    let sum = 0;
    rows.forEach((row) => {
      let val = Number(row[column]);
      sum += isNaN(val) ? 0 : val;
    });
    return isNaN(sum) ? 0 : sum;
  }

  function handleSubmit(data: G7State) {
    clientInvoiceService
      .httpAddNewInvoice(data)
      .then((response) => {
        if (response.statusCode == 201) {
          router.push('/invoices');
        }
      })
      .catch(({ response }: any) => {
        toast.error(response.data.message);
      });
  }
  console.log(g7State)

  return (
    <section className="mx-16 my-2">
      <div className="p-5 shadow-md rounded-lg border border-silverGray  bg-white">
        <div className="flex space-x-3">
          <TertiaryHeading title="Involve name:" className="font-medium" />
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
              }
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
                    className={`${tab === type ? "text-RoyalPurple" : 'text-black'}`}
                  />
                ),
                tabKey: type,
                children:
                  tab === G703_KEY ? (
                    <G703Component
                      state={g7State}
                      handleState={handleG7State}
                      sumColumns={sumColumns}
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
