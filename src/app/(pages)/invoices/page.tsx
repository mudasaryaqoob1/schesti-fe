'use client';
import { HttpService } from '@/app/services/base.service';
import { selectToken } from '@/redux/authSlices/auth.selector';
import { useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Tabs } from 'antd';
import { Contractors } from './components/contractors';
import { Clients } from './components/clients';

const CONTRACTOR_KEY = 'Contractor';
const CLIENT_KEY = 'Client';

const InvoicePage = () => {
  const token = useSelector(selectToken);
  const [tab, setTab] = useState(CONTRACTOR_KEY);

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  return (
    <section className="mt-6 mb-[39px] md:ms-[69px] md:me-[59px] mx-4 rounded-xl ">
      <div className="w-full mb-4">
        <Tabs
          defaultActiveKey={CONTRACTOR_KEY}
          destroyInactiveTabPane
          onChange={(type) => {
            setTab(type);
          }}
          items={[CONTRACTOR_KEY, CLIENT_KEY].map((type) => {
            return {
              key: type,
              label: type,
              tabKey: type,
              children: tab === CONTRACTOR_KEY ? <Contractors /> : <Clients />,
            };
          })}
        />
      </div>
    </section>
  );
};

export default InvoicePage;
