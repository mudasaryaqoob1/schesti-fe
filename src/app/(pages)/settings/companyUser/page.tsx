'use client';
import { useState } from 'react';

import { Tabs } from 'antd';

import VerticleBar from '../verticleBar';
import { CompanyUsers } from './components/CompanyUsers';
import TertiaryHeading from '@/app/component/headings/tertiary';

const USERS_TAB = "Users";
const ROLES_TAB = "Roles";


const Index = () => {

  const [activeTabKey, setActiveTabKey] = useState(USERS_TAB);


  return (
    <VerticleBar>
      <div className="w-full">
        <TertiaryHeading title="User Managements" />


        <div className="bg-snowWhite rounded-2xl mt-4 shadow-instentWhite py-5 px-6">
          <Tabs
            activeKey={activeTabKey}
            items={[USERS_TAB, ROLES_TAB].map(tab => {
              return {
                label: <p className={`text-base font-normal ${activeTabKey === tab ? 'text-schestiPrimary font-semibold ' : 'text-graphiteGray'}`}>{tab}</p>,
                key: tab
              }
            })}
            onChange={(key) => setActiveTabKey(key)}
          />
          {activeTabKey === 'Users' ? <CompanyUsers /> : null}
        </div>
      </div>
    </VerticleBar>
  );
};

export default Index;
