'use client';
import { useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ConfigProvider, Tabs } from 'antd';
import { useSearchParams } from 'next/navigation';

import { HttpService } from '@/app/services/base.service';
import { selectToken } from '@/redux/authSlices/auth.selector';
import TertiaryHeading from '@/app/component/headings/tertiary';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import { G703Component } from './components/G703';
import { G702Component } from './components/G702';
import { rowTemplate, type G703State } from './utils';

const G703_KEY = 'G703';
const G702_KEY = 'G702';

export default function CreateClientInvoicePage() {
  const token = useSelector(selectToken);
  const searchParams = useSearchParams();
  const invoiceName = searchParams.get('invoiceName');
  const [tab, setTab] = useState(G703_KEY);
  const [g703State, setG703State] = useState<G703State>({
    applicationNo: '',
    applicationDate: '',
    periodTo: '',
    projectNo: '',
    data: [
      rowTemplate(1),
      rowTemplate(2),
      rowTemplate(3),
      rowTemplate(4),
      rowTemplate(5),
      rowTemplate(6),
      rowTemplate(7),
      rowTemplate(8),
      rowTemplate(9),
      rowTemplate(10),
    ],
  });

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

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
            },
          }}
        >
          <Tabs
            defaultActiveKey={G703_KEY}
            destroyInactiveTabPane
            onChange={(type) => {
              setTab(type);
            }}
            items={[G703_KEY, G702_KEY].map((type) => {
              return {
                key: type,
                label: (
                  <QuaternaryHeading
                    title={type}
                    className="text-RoyalPurple"
                  />
                ),
                tabKey: type,
                children:
                  tab === G703_KEY ? (
                    <G703Component state={g703State} setState={setG703State} />
                  ) : (
                    <G702Component />
                  ),
              };
            })}
          />
        </ConfigProvider>
      </div>
    </section>
  );
}
