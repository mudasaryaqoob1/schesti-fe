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

const SettingPlans = () => {
  const [mySubscriptionPlan, setMySubscriptionPlan] = useState<string>("My Subscription");
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
          onChange={(value) => {
            setMySubscriptionPlan(value);
          }}
          items={[My_Subscription_Tab, Plans_Tab].map((type) => {
            return {
              key: type,
              label: type === mySubscriptionPlan ? <p className="text-schestiPrimary">{type}</p> : <p className="text-schestiPrimaryBlack">{type}</p>,
              tabKey: type,
              children: mySubscriptionPlan ? (
                <MySubscription />
              ) : (
                <Plans user={user ? user.user : undefined} />
              ),
            };
          })}
        />
      </div>
    </SettingSidebar>
  );
};

export default withAuth(SettingPlans);
