'use client';
import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { ConfigProvider, Tabs } from 'antd';

import { HttpService } from '@/app/services/base.service';
import { selectToken } from '@/redux/authSlices/auth.selector';
import { Contractors } from './components/contractors';
import { Clients } from './components/clients';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import { useLocalStorageState } from 'ahooks';

const CONTRACTOR_KEY = 'Contractor';
const CLIENT_KEY = 'Client';

export default function InvoicePage() {
  const token = useSelector(selectToken);
  const [tab, setTab] = useLocalStorageState('use-local-storage-state-demo2', {
    defaultValue: CLIENT_KEY,
  });

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  return (
    <section className="mt-6 mb-[39px] md:ms-[69px] md:me-[59px] mx-4 rounded-xl ">
      <div className="w-full mb-4">
        <ConfigProvider
          theme={{
            components: {
              Tabs: {
                inkBarColor: '#8449EB',
              },
              Table: {
                headerBg: '#F9F5FF',
              },
            },
          }}
        >
          <Tabs
            defaultActiveKey={tab}
            onChange={(type) => {
              setTab(type);
            }}
            items={[CONTRACTOR_KEY, CLIENT_KEY].map((type) => {
              return {
                key: type,
                label: (
                  <QuaternaryHeading
                    title={type}
                    className={`${
                      type === tab ? 'text-RoyalPurple' : 'text-black'
                    }`}
                  />
                ),
                tabKey: type,
                children:
                  tab === CONTRACTOR_KEY ? <Contractors /> : <Clients />,
                style: {},
              };
            })}
          />
        </ConfigProvider>
      </div>
    </section>
  );
}
