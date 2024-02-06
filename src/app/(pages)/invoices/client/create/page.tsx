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
  const [state, setState] = useState<G7State>({
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
    netChangeByOrders: '',
    notaryPublic: '',
    lessPreviousCertificatesForPayment: '0.00',
    orignalContractSum: '',
    project: '',
    stateOf: '',
    subscribedAndSworn: '',
    phase: 0,
    toOwner: '',
    viaEngineer: '',
  });

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
      if (invoiceName) {
        handleState('invoiceName', invoiceName);
      }
    }
  }, [token, invoiceName]);

  function handleState<K extends keyof G7State>(
    key: K,
    value: (typeof state)[K]
  ) {
    setState({ ...state, [key]: value });
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
                      state={state}
                      handleState={handleState}
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
                      state={state}
                      handleState={handleState}
                      sumColumns={sumColumns}
                      onCancel={() => {
                        router.back();
                      }}
                      onNext={() => {
                        handleSubmit(state);
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
