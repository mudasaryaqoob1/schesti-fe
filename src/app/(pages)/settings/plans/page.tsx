'use client';

import React, { useState } from 'react';
import SettingSidebar from '../verticleBar';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { Tabs } from 'antd';
import MySubscription from './me/page';
import Plans from './oldSubscriptions';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { IUser } from '@/app/interfaces/companyEmployeeInterfaces/user.interface';
import { withAuth } from '@/app/hoc/withAuth';


const My_Subscription_Tab = "My Subscription";
const Plans_Tab = "Plans";
const Transaction_History = "Transaction History";

const SettingPlans = () => {
  const [activeTab, setActiveTab] = useState<string>("My Subscription");
  const user = useSelector(
    (state: RootState) => state.auth.user as { user?: IUser }
  );

  return (
    <SettingSidebar>
      <div className="w-full mx-4 mb-4">
        <TertiaryHeading title="Plans" className="text-graphiteGray" />
        <Tabs
          defaultActiveKey="My Subscriptions"
          destroyInactiveTabPane
          activeKey={activeTab}
          onChange={(value) => {
            setActiveTab(value);
          }}
          items={[My_Subscription_Tab, Plans_Tab, Transaction_History].map((type) => {
            return {
              key: type,
              label: type === activeTab ? <p className="text-schestiPrimary">{type}</p> : <p className="text-schestiPrimaryBlack">{type}</p>,
              tabKey: type,
              children: activeTab === My_Subscription_Tab ? (
                <MySubscription onUpgradeClick={() => {
                  setActiveTab(Plans_Tab);
                }} />
              ) : activeTab === Plans_Tab ? (
                <Plans user={user ? user.user : undefined} />
              ) : null,
            };
          })}
        />
      </div>
    </SettingSidebar>
  );
};

export default withAuth(SettingPlans);
