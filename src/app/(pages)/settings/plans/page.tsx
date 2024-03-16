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

const SettingPlans = () => {
  const [mySubscriptionPlan, setMySubscriptionPlan] = useState(true);
  const user = useSelector(
    (state: RootState) => state.auth.user as { user?: IUser }
  );


  return (
    <SettingSidebar>
      <div className="w-full mb-4">
        <TertiaryHeading title="Plans" className="text-graphiteGray" />
        <Tabs
          defaultActiveKey="My Subscriptions"
          destroyInactiveTabPane
          onChange={(value) => {
            setMySubscriptionPlan(value === 'My Subscription' ? true : false);
          }}
          items={['My Subscription', 'Plans'].map((type) => {
            return {
              key: type,
              label: type,
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
